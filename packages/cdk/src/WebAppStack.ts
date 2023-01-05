import {
  S3Backend,
  TerraformOutput,
  TerraformStack,
  TerraformVariable,
} from 'cdktf'
import { Construct } from 'constructs'
import { ScalewayProvider } from '../.gen/providers/scaleway/provider'
import { ObjectBucket } from '../.gen/providers/scaleway/object-bucket'
import { RdbDatabase } from '../.gen/providers/scaleway/rdb-database'
import { DataScalewayRdbInstance } from '../.gen/providers/scaleway/data-scaleway-rdb-instance'
import { RdbUser } from '../.gen/providers/scaleway/rdb-user'
import { RdbPrivilege } from '../.gen/providers/scaleway/rdb-privilege'
import { generateDatabasePassword } from './databasePassword'
import { DataScalewayContainerNamespace } from '../.gen/providers/scaleway/data-scaleway-container-namespace'
import { Container } from '../.gen/providers/scaleway/container'
import { CdkOutput } from './getCdkOutput'
import { DataScalewayDomainZone } from '../.gen/providers/scaleway/data-scaleway-domain-zone'
import { DomainRecord } from '../.gen/providers/scaleway/domain-record'
import { ContainerDomain } from '../.gen/providers/scaleway/container-domain'

const databaseInstanceId = '7bd3aa2e-fdf4-4e5e-b6af-2ec2ec37cd75'
const containerNamespaceId = '99eb3592-9355-476f-ad0c-6db7b80bff87'
const region = 'fr-par'
const domain = 'mec.gouv.kime.tech'

export class WebAppStack extends TerraformStack {
  constructor(scope: Construct, id: string, namespace: string) {
    super(scope, id)
    const namespaced = (name: string) => `${name}-${namespace}`

    const isMain = namespace === 'main'

    const subDomain = namespace
    const hostname = `${subDomain}.${domain}`

    // Output helper function
    // ⚠️ When calling this function, do not forget to update typings in src/getCdkOutput.ts
    const output = <T extends keyof CdkOutput>(
      name: T,
      value: CdkOutput[T],
      sensitive?: 'sensitive',
    ) =>
      new TerraformOutput(this, `output_${name}`, {
        value,
        sensitive: sensitive === 'sensitive',
      })

    // See https://developer.hashicorp.com/terraform/cdktf/create-and-deploy/best-practices
    const sensitiveEnvVariable = (name: string) =>
      new TerraformVariable(this, name, {
        type: 'string',
        sensitive: true,
      })
    const envVariable = (name: string) =>
      new TerraformVariable(this, name, {
        type: 'string',
        sensitive: false,
      })

    // Configuring env variables
    const webContainerImage = envVariable('webContainerImage')
    // Configuring env secrets
    const accessKey = sensitiveEnvVariable('accessKey')
    const secretKey = sensitiveEnvVariable('secretKey')
    const organizationId = sensitiveEnvVariable('organizationId')
    const projectId = sensitiveEnvVariable('projectId')
    const databasePasswordSalt = sensitiveEnvVariable('databasePasswordSalt')

    // Configuring provider that will be used for the rest of the stack
    new ScalewayProvider(this, 'provider', {
      region: region,
      accessKey: accessKey.value,
      secretKey: secretKey.value,
      organizationId: organizationId.value,
      projectId: projectId.value,
    })

    // State of deployed infrastructure for each branch will be stored in the
    // same 'mec-terraform' bucket
    new S3Backend(this, {
      bucket: 'mec-terraform',
      key: `${namespaced('state')}.tfstate`,
      // Credentials are provided with AWS_*** env variables
      endpoint: 'https://s3.fr-par.scw.cloud',
      skipCredentialsValidation: true,
      skipRegionValidation: true,
    })

    // The database instance is shared for each namespace/branch we refer to it (DataScaleway)
    // but do not manage it through this stack
    const dbInstance = new DataScalewayRdbInstance(this, 'dbInstance', {
      instanceId: databaseInstanceId,
      // name: 'mec-production',
    })

    output('databaseHost', dbInstance.endpointIp)
    output('databasePort', dbInstance.endpointPort)

    const dbConfig = {
      name: namespaced('mec'),
      user: namespaced('mec'),
      password: generateDatabasePassword(
        databasePasswordSalt.value,
        namespaced('mec'),
      ),
    }

    const databaseUser = new RdbUser(this, 'databaseUser', {
      name: dbConfig.name,
      instanceId: dbInstance.instanceId,
      password: dbConfig.password,
    })

    const database = new RdbDatabase(this, 'database', {
      name: dbConfig.name,
      instanceId: dbInstance.instanceId,
    })

    output('databaseUser', dbConfig.user)
    output('databaseName', dbConfig.name)

    new RdbPrivilege(this, 'databasePrivilege', {
      instanceId: dbInstance.instanceId,
      databaseName: dbConfig.name,
      userName: dbConfig.user,
      permission: 'all',
      dependsOn: [database, databaseUser],
    })

    const uploadsBucket = new ObjectBucket(this, 'uploads', {
      name: namespaced('mec-uploads'),
    })

    output('uploadsBucketName', uploadsBucket.name)
    output('uploadsBucketEndpoint', uploadsBucket.endpoint)

    const containerNamespace = new DataScalewayContainerNamespace(
      this,
      'containerNamespace',
      { namespaceId: containerNamespaceId },
    )

    const emailFromAddress = isMain
      ? `bot@${domain}`
      : `bot+${namespace}@${domain}`

    const emailFromName = isMain
      ? 'Mon espace collectivité'
      : `[${namespace}] Mon espace collectivité`

    const databaseUrl = `postgres://${dbConfig.user}:${encodeURIComponent(
      dbConfig.password,
    )}@${dbInstance.endpointIp}:${dbInstance.endpointPort}/${dbConfig.name}`

    // Changing the name will recreate a new container
    // The names failes with max length so we shorten it
    const containerName = namespace

    const container = new Container(this, 'webContainer', {
      namespaceId: containerNamespace.namespaceId,
      registryImage: webContainerImage.value,
      environmentVariables: {
        EMAIL_FROM_ADDRESS: emailFromAddress,
        EMAIL_FROM_NAME: emailFromName,
        MEC_WEB_IMAGE: webContainerImage.value,
        BASE_URL: hostname,
      },
      secretEnvironmentVariables: {
        DATABASE_URL: databaseUrl,
        TEST_SECRET: 'hello',
      },
      name: containerName,
      minScale: isMain ? 2 : 0,
      maxScale: isMain ? 5 : 1,
      cpuLimit: 1120, //mVPCU
      memoryLimit: 2048, //mB
      deploy: true,
    })

    const rootZone = new DataScalewayDomainZone(this, 'dnsZone', {
      domain: 'mec.gouv.kime.tech',
    })

    const webDnsRecord = new DomainRecord(this, 'webDnsRecord', {
      type: 'CNAME',
      dnsZone: rootZone.domain,
      name: namespace,
      data: `${container.domainName}.`,
      ttl: 60 * 5,
    })

    new ContainerDomain(this, 'webContainerDomain', {
      containerId: container.id,
      hostname,
      dependsOn: [webDnsRecord, container],
    })

    output('webBaseUrl', hostname)
    output('containerDomainName', container.domainName)
    output('databaseUrl', databaseUrl, 'sensitive')
    output(
      'webContainerStatus',
      container.status as CdkOutput['webContainerStatus'],
    )
    output('webContainerId', container.id)
    output('webContainerImage', webContainerImage.value)
  }
}

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

const databaseInstanceId = '7bd3aa2e-fdf4-4e5e-b6af-2ec2ec37cd75'
const region = 'fr-par'

export class WebAppStack extends TerraformStack {
  constructor(scope: Construct, id: string, namespace: string) {
    super(scope, id)
    const namespaced = (name: string) => `${name}--${namespace}`

    // Output helper function
    const output = (name: string, value: string | number | boolean) =>
      new TerraformOutput(this, `output_${name}`, {
        value,
      })

    // See https://developer.hashicorp.com/terraform/cdktf/create-and-deploy/best-practices
    const sensitiveEnvVariable = (name: string) =>
      new TerraformVariable(this, name, {
        type: 'string',
        sensitive: true,
      })

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

    output('outputDatabaseHost', dbInstance.endpointIp)
    output('outputDatabasePort', dbInstance.endpointPort)

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
    // TODO Remove this
    output('databasePassword', dbConfig.password)

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
  }
}

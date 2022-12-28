import {
  S3Backend,
  TerraformOutput,
  TerraformStack,
  TerraformVariable,
} from 'cdktf'
import { Construct } from 'constructs'
import { ScalewayProvider } from '../.gen/providers/scaleway/provider'
import { ObjectBucket } from '../.gen/providers/scaleway/object-bucket'

export class WebAppStack extends TerraformStack {
  constructor(scope: Construct, id: string, namespace: string) {
    super(scope, id)
    const namespaced = (name: string) => `${name}--${namespace}`

    // See https://developer.hashicorp.com/terraform/cdktf/create-and-deploy/best-practices
    const accessKey = new TerraformVariable(this, 'accessKey', {
      type: 'string',
      sensitive: true,
    })
    const secretKey = new TerraformVariable(this, 'secretKey', {
      type: 'string',
      sensitive: true,
    })
    const organizationId = new TerraformVariable(this, 'organizationId', {
      type: 'string',
      sensitive: true,
    })
    const projectId = new TerraformVariable(this, 'projectId', {
      type: 'string',
      sensitive: true,
    })
    const region = new TerraformVariable(this, 'region', {
      type: 'string',
      sensitive: false,
    })

    new ScalewayProvider(this, 'provider', {
      region: region.value,
      accessKey: accessKey.value,
      secretKey: secretKey.value,
      organizationId: organizationId.value,
      projectId: projectId.value,
    })

    new S3Backend(this, {
      bucket: 'mec-terraform',
      key: `${namespaced('state')}.tfstate`,
      // Credentials are provided with AWS_*** env variables
      endpoint: 'https://s3.fr-par.scw.cloud',
      skipCredentialsValidation: true,
      skipRegionValidation: true,
    })

    new ObjectBucket(this, 'hello-deploy', {
      name: namespaced('deploy-test'),
    })

    new TerraformOutput(this, 'hello', {
      value: 'world',
    })
    //
    // new ContainerNamespace(this, 'web', {
    //   name: namespaced('web'),
    // })
  }
}

#!/usr/bin/env node
import 'source-map-support/register'
import { App } from 'cdktf'
import { WebAppStack } from '@mec/cdk/WebAppStack'
import { branch } from 'git-rev-sync'

const app = new App()

const namespace = branch()
  .replace(/\/|_|\.|@/g, '-')
  .toLowerCase()

new WebAppStack(app, `web`, namespace)

app.synth()

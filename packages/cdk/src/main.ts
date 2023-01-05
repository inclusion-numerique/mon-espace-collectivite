#!/usr/bin/env node
import 'source-map-support/register'
import { App } from 'cdktf'
import { WebAppStack } from '@mec/cdk/WebAppStack'
import { branch } from 'git-rev-sync'

const app = new App()

const branchScope = process.env.CDK_FORCE_BRANCH || branch()

const namespace = branchScope.replace(/\/|_|\.|@/g, '-').toLowerCase()

new WebAppStack(app, `web`, namespace)

app.synth()

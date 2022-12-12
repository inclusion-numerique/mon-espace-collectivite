const { parse } = require('dotenv')
const { resolve } = require('path')
const { readFileSync, existsSync } = require('fs')
const dotenvVars = () => {
  const dotenvFile = resolve(__dirname, '../../../.env')
  if (!existsSync(dotenvFile)) {
    return null
  }
  return parse(readFileSync(dotenvFile))
}
module.exports = {
  stories: [
    '../../web/src/**/*.stories.mdx',
    '../../web/src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    {
      name: 'storybook-addon-next',
      options: {
        nextConfigPath: resolve(__dirname, '../../web/next.config.js'),
      },
    },
  ],
  staticDirs: ['../../web/public'],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  // https://darekkay.com/blog/storybook-separate-folder/
  webpackFinal: async (config, { configType }) => {
    const babelLoaderRule = config.module.rules.find(
      (rule) => rule.test.toString() === /\.(mjs|tsx?|jsx?)$/.toString(),
    )
    // set correct project root
    babelLoaderRule.include = [resolve(__dirname, '../../..')]
    return config
  },
  env: (config) => ({
    ...config,
    ...dotenvVars(),
  }),
  docs: {
    docsPage: 'automatic',
  },
}

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
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    {
      name: 'storybook-addon-next',
      options: {},
    },
  ],
  staticDirs: ['../public'],
  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
  },
  env: (config) => ({
    ...config,
    ...dotenvVars(),
  }),
}

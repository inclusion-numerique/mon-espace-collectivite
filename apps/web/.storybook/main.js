const { resolve } = require('path')

module.exports = {
  stories: [
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    {
      name: 'storybook-addon-next',
      options: {
        nextConfigPath: resolve(__dirname, '../next.config.js'),
      },
    },
  ],
  staticDirs: ['../public'],
  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
  },
}
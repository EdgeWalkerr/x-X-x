module.exports = {
  stories: ['../src/**/*.stories.[tj]sx'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/preset-typescript',
  ],
  webpackFinal: async (config) => {
    // do mutation to the config

    return config;
  },
};

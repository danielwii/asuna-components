module.exports = {
  stories: ['../stories/**/*.stories.tsx'],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve('babel-loader'),
      options: {
        presets: [['react-app', { flow: false, typescript: true }]],
      },
    });
    config.resolve.extensions.push('.ts', '.tsx');

    // remove CaseSensitivePathsPlugin
    // config.plugins = config.plugins.filter((plugin) => plugin.constructor.name !== 'CaseSensitivePathsPlugin');
    // console.log(config.plugins);

    return config;
  },
};

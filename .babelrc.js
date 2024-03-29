module.exports = {
  presets: ['@babel/env', '@babel/typescript'],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-react-jsx',
    '@babel/proposal-object-rest-spread',
    ['@babel/plugin-transform-runtime', { absoluteRuntime: false, corejs: false, helpers: true, regenerator: true }],
    ['import', { libraryName: 'antd' }, 'antd'],
  ],
  env: {
    production: {
      plugins: [
        ['babel-plugin-transform-remove-imports', { test: '\\.(less|css)$' }],
        ['transform-remove-console'],
        ['minify-dead-code-elimination', { optimizeRawSize: true }],
      ],
    },
  },
};

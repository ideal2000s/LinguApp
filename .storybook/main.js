const path = require('path');

module.exports = {
  stories: [
    '../frontend/students/**/*.stories.js',
    '../frontend/students/**/*.stories.ts',
    '../frontend/students/**/*.stories.tsx'
  ],
  addons: [
    '@storybook/addon-viewport/register',
    '@storybook/addon-actions',
    '@storybook/addon-links'
  ],
  webpackFinal: async (config, { configType }) => {
    config.resolve.modules.push(path.resolve('./frontend'));

    config.module.rules.push(
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: require.resolve('babel-loader'),
        options: {
          presets: ['@babel/preset-typescript', '@babel/preset-react']
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    );

    config.resolve.extensions.push('.ts', '.tsx');

    return config;
  }
};

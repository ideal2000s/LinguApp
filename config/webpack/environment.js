const { environment } = require('@rails/webpacker');
const webpack = require('webpack');
const dotenv = require('dotenv');

const dotenvFiles = [
  `.env.${process.env.NODE_ENV}.local`,
  '.env.local',
  `.env.${process.env.NODE_ENV}`,
  '.env'
];
dotenvFiles.forEach((dotenvFile) => {
  dotenv.config({ path: dotenvFile, silent: true });
});

environment.plugins.insert('Environment', new webpack.EnvironmentPlugin(process.env));

environment.plugins.append(
  'Provide',
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    Popper: ['popper.js', 'default']
  })
);

environment.loaders.append('exposejQuery', {
  test: require.resolve('jquery'),
  use: {
    loader: 'expose-loader',
    options: {
      exposes: ['$', 'jQuery']
    }
  }
});

module.exports = environment;

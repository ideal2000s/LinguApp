process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const environment = require('./environment');
environment.config.merge({ devtool: 'nosources-source-map' });
environment.splitChunks();

module.exports = environment.toWebpackConfig();

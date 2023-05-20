module.exports = {
  test: /\.tsx?$/,
  use: {
    loader: 'babel-loader'
  },
  exclude: [/node_modules/]
};

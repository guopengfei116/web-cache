const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config.js');

const app = express();
const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false,
  },
}));

app.use(webpackHotMiddleware(compiler));

app.use(express.static(__dirname));

const port = process.env.PORT || 8080;
let server = (function createServer(port) {
  return new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      resolve(server);
    });
    server.on('error', (err) => {
      if (err.code == 'EADDRINUSE') {
        createServer(port + 1);
      } else {
        reject(err);
      }
    });
  });
})(port);

server.then((server) => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`);
});

module.exports = server;
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function expressMiddleware(router) {
  router.use('/api', createProxyMiddleware({ target: 'http://localhost:5000', changeOrigin: true }));
  router.use('/uploads', createProxyMiddleware({ target: 'http://localhost:5000', changeOrigin: true }));
};

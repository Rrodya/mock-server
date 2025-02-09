const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const getCurrentBaseUrl = require('../../utils/get-current-base-url.js');

const router = express.Router();
  
router.post('/', async (req, res, next) => {
  createProxyMiddleware({
    target: getCurrentBaseUrl(),
    changeOrigin: true,
    logLevel: 'debug',
  })(req, res, next)
})


module.exports = router;

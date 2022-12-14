const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "https://c-2022yh.space",
      changeOrigin: true,
    })
  );
};

// just keeping here for proxy setting.
// You probably never need this if you are using ng-universal
const PROXY_CONFIG = [
  {
    context: ['/api'],
    target: `http://localhost:3000`,
    secure: false,
    // ,"pathRewrite": {
    //   "^/api": ""
    /*}*/
    //  ,"changeOrigin": true
    // ,"logLevel": "debug"
    // ,bypass: function(req, res, proxyOptions) {
    //   if (req.headers.accept.indexOf("html") !== -1) {
    //     console.log("Skipping proxy for browser request.");
    //     return "/index.html";
    //   }
    //   req.headers["X-Custom-Header"] = "yes";
    // }
  },
  {
    context: ['/ws'],
    target: `ws://localhost:3000`,
    secure: false,
    ws: true,
  },
];

module.exports = PROXY_CONFIG;

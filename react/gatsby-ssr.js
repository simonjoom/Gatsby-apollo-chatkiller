require('isomorphic-fetch')
const provider = require("./src/inject-provider-ssr");
exports.wrapPageElement = provider.wrapPageElement;
exports.wrapRootElement = provider.wrapRootElement;

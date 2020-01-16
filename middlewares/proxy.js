const rp = require('request-promise-native');

function proxy(url) {
  return async (ctx) => {
    try {
      ctx.body = await rp({
        method: ctx.method,
        uri: `${url}${ctx.url}`,
        headers: ctx.headers,
        body: ctx.request.body,
        json: true,
      });
    } catch (err) {
      if (!err.response) {
        ctx.status = 500;
        ctx.body = 'Internal destination server error';
        return;
      }
      ctx.status = err.response.statusCode;
      ctx.body = err.response.body;
    }
  };
}

module.exports = proxy;



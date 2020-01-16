const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
const cors = require('@koa/cors');

const proxy = require('./middlewares/proxy');
const {
  API_URL,
  PUBLIC_PATH,
} = require('./constants');

const PORT = process.env.PORT || 3000;
const app = new Koa();

app.use(cors());
app.use(bodyParser());
app.use(serve(PUBLIC_PATH));
app.use(proxy(API_URL));
app.listen(PORT, () => {
  console.log(`Server has been started. http://localhost:${PORT}`);
});

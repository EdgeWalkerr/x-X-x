import Koa from 'koa';

const app = new Koa();

app.use(async (ctx) => {
  ctx.body = 'Hello World';
});

function Module() {
  this.exports = {};
  this.filename = null;
  this.loaded = false;
  this.children = [];
}

// module.exports = Module;

// var module = new Module();

// app.listen(3000);

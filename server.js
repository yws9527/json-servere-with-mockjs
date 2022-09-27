const port = 9000;
const jsonServer = require('json-server');
// 创建json-server实例
const server = jsonServer.create();
const {dbFunc, dbJson} = require('./modules');
// 将路由配置表传入，生成路由表
const router = jsonServer.router(dbJson);
const middlewares = jsonServer.defaults();

// 这里比较重要。
// 目的是：重新定义路由返回的数据。就是说：每访问一个路由，返回response的时候，都可以经过router.render重新定义response数据
// 因为我们在db.js里将mock函数收集到了dbFunc对象里。
router.render = (req, res) => {
  // 根据请求的url，截取路径。
  // 例如：一般情况，res.url是/user_info?id=1234这样的格式。
  const end = req.url.indexOf('?');
  const apiName = end === -1 ? req.url.slice(1) : req.url.slice(1, end + 1);
  // 根据apiName拿到对应的mock函数，然后返回mock函数生产的mock数据
  // 因为每次返回response的时候，都会执行一次该函数，所以得到的都是新的mock数据
  const response = dbFunc[apiName] && dbFunc[apiName]();
  res.send(response || {});
};

server.use(middlewares);
// 导入路由
server.use(router);
// 在port端口开服务
server.listen(port, () => {
  console.log(`JSON Server is running at http://localhost:${port}`);
});
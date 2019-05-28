'use strict'

const express = require('express'),
  // 获取全局配置
  globalConfig = require('./config/globalConfig')(),

  // mock服务
  mockServer = require('./config/mockServer'),

  // 获取express对象
  app = express(),

  // 获取cookie 对象
  cookieParser = require('cookie-parser'),

  bodyParser = require('body-parser'),
  router = express.Router();

// 设置cookie
app.use(cookieParser())

// 设置post下接收参数
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

// 设置跨域访问 
var allowCrossDomain = function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Ayuthorization, X-Requested-With')
  res.setHeader('Access-Control-Max-Age', '3600')
  res.setHeader('Access-Control-Allow-Credentials', true)
  if (req.method == 'OPTIONS')
    res.sendStatus(200); // 让options请求快速返回
  else next()
}
app.all('/api/*', allowCrossDomain)

app.get('/', function (req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  })
  res.write('Hello World!')
  res.end()
})

router.get('/*', function (req, res) {
  let data = mockServer(req.path);
  if (data) {
    res.setHeader("Content-Type","application/json; charset=UTF-8");
    res.status(200).json(data);
  } else {
    res.setHeader("Content-Type","application/json; charset=UTF-8");
    res.status(500).json({message:'mockserver未获取到数据!'});
  }
  res.end();
})

router.post('/*', function (req, res) {
  let data = mockServer(req.path);
  if (data) {
    res.setHeader("Content-Type","application/json; charset=UTF-8");
    res.status(200).json(data);
  } else {
    res.setHeader("Content-Type","application/json; charset=UTF-8");
    res.status(500).json({message:'mockserver未获取到数据!'});
  }
  res.end();
})

app.use("/api",router)

// 启动监听服务
app.listen(SERVER.port, function () {
  console.log(
    `-----监听:${SERVER.port}端口服务已经启动
     -----node版本:${process.versions.node}
     -----node进程id:${process.pid}
     -----node进程名称:${process.title}
     -----当前node进程的执行路径:${process.execPath}
     -----环境变量:${NODE_ENV}
     -----是否开启MockServer:${new Boolean(process.env.DEBUG_WITH_MOCK)}
     -----启动时间:${(new Date().toLocaleString())}
     -----访问地址:${SERVER.url}`
  )
})

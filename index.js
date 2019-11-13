const express = require('express');
const app = express();
const router = require('./db/router');
const bodyParser = require('body-parser');
// 引入 cors 跨域
const cors = require('cors');
// 跨域中间件
app.use(cors())

app.use(bodyParser.json());
app.use(router);
global.app = app;
app.listen(8888, () => console.log("**********【服务器8888启动成功】**********"));
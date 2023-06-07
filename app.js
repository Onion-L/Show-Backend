const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const {db} = require('./config/db');
const userRouter = require('./Controller/userController');
const cookieParser = require('cookie-parser');

// 解析 application/json
app.use(bodyParser.json());
//解析 cookie
app.use(cookieParser());
// 解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
//使用express router
app.use(userRouter);
//跨域问题
app.use(cors());
//数据库连接
db.connected();

const port = 3000;
app.listen(port, () => {
    console.log(`示例应用正在监听 端口 ${port}!`);
})

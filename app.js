const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const {db} = require('./config/db');
const userRouter = require('./Controller/userController');

// 解析 application/json
app.use(bodyParser.json());

// 解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
//跨域问题
app.use(cors());

db.connected();
const port = 3000;
app.use(userRouter);

app.listen(port, () => {
    console.log('示例应用正在监听 3000 端口 !');
    console.log(' ______       ___\n' +
        '/\\__  _\\     /\\_ \\\n' +
        '\\/_/\\ \\/     \\//\\ \\     ___   __  __     __       __  __    ___   __  __\n' +
        '   \\ \\ \\       \\ \\ \\   / __`\\/\\ \\/\\ \\  /\'__`\\    /\\ \\/\\ \\  / __`\\/\\ \\/\\ \\\n' +
        '    \\_\\ \\__     \\_\\ \\_/\\ \\\\ \\ \\ \\_/ |/\\  __/    \\ \\ \\_\\ \\/\\ \\\\ \\ \\ \\_\\ \\ \\\n' +
        '    /\\_____\\    /\\____\\ \\____/\\ \\___/ \\ \\____\\    \\/`____ \\ \\____/\\ \\____/\n' +
        '    \\/_____/    \\/____/\\/___/  \\/__/   \\/____/     `/___/> \\/___/  \\/___/\n' +
        '                                                      /\\___/\n' +
        '                                                      \\/__/')
});

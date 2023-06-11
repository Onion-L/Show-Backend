const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const {User} = require('../models/user');
const {nanoid} = require('nanoid');
const secretKey = "WELCOME_TO_THE_SHOW";
const SALT = bcrypt.genSaltSync(10);
const session = require('express-session')
const MS_OF_DAY = 1000 * 60 * 60 * 24;

//设置sessionID
router.use(session({
    secret:secretKey,
    name:'sessionId',
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge:7 * MS_OF_DAY,
        httpOnly:false
    }
    })
);

//登录操作
router.post('/login', async (req,res) => {
    const {username,password} = req.body;

    console.log('username',username)
    const user = await User.findOne({
        where: {username}
    });


    console.log('password',user.username);
    const isMatch = user !== null &&  bcrypt.compareSync(password,user.userPassword);

    if(isMatch){
        req.session.sessionName = username;
        console.log(req.session)
        res.send('success');
    }else {
        console.log('error',user.userPassword);
        throw new Error('User Not Found!');
    }
})

//退出，cookie覆盖
router.get('/logout', (req,res)=> {
    res.cookie('sessionId',1,{
        maxAge:-1
    });
    req.session.destroy();
    res.send('退出登录~');
})

//注册用户
router.post('/register',(req,res) => {
    const {username,password,area} = req.body;
    const cryptPwd = bcrypt.hashSync(password,SALT);

    User.create({
        username:username,
        userAccount:nanoid(10),
        userPassword:cryptPwd,
        userArea:area,
    }).then(()=>{
        res.send('success');
    }).catch(error=>{
        throw new Error(error.message);
    })
})

//获取用户信息
router.get('/user', async (req, res)=>{
    const sessionName = req.session.sessionName;
    console.log('/user',req.session);

    const user = await User.findOne({
        where:{username:sessionName},
    });

        console.log(user.dataValues);
        const {username,userAccount,avatarUrl} = user.dataValues;
        const value = {username,userAccount,avatarUrl};
        res.send(value);
})

module.exports = router;

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const {User} = require('../models/user');
const {nanoid} = require('nanoid');
const session = require('express-session');
const multer = require('multer');
const upload = multer({dest:'uploads/'});
const secretKey = "WELCOME_TO_THE_SHOW";
const SALT = bcrypt.genSaltSync(10);
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
    const user = await User.findOne({
        where: {username:username}
    });

    const {userAccount,id,userPassword,avatarUrl,gender,phone,email,createdAt,userArea} = user;
    const isMatch = user &&  bcrypt.compareSync(password,userPassword);
    const userData = {
        userAccount,id,
        avatarUrl:avatarUrl.toString(),gender,phone,email,createdAt,userArea,username
    };

    if(isMatch){
        req.session.sessionID = username;
        console.log(req.session)
        console.log(avatarUrl.toString());
        res.send(userData);
    }else {
        console.log('error',user.userPassword);
        throw new Error('User Not Found!');
    }
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

//退出，cookie覆盖
router.get('/logout', (req,res)=> {
    res.cookie('sessionId',1,{
        maxAge:-1
    });
    req.session.destroy();
    res.send('退出登录~');
})

router.post('/updateUser',upload.single('avatar'),async (req,res) => {
    console.log(req.file);
    /*console.log(req.body);
    const {userAccount,id,avatarUrl,gender,phone,email,updatedAt,userArea,username} = req.body;

    await User.update({
        userAccount,avatarUrl,gender,phone,email,updatedAt,userArea,username
    },{where:{id}}).then(_=>{
        res.send('success');
    })*/
})

//获取用户信息
/*
router.get('/user', async (req, res)=>{
    const sessionName = req.session.sessionID;
    console.log('/user',req.session);

    const user = await User.findOne({
        where:{username:sessionName},
    });

        console.log(user.dataValues);
        const {username,userAccount,avatarUrl,id,createdAt,gender} = user.dataValues;
        const value = {username,userAccount,avatarUrl,id,createdAt,gender};
        res.send(value);
})
*/

module.exports = router;

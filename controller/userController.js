const express = require('express');
const router = express.Router();
const {expressjwt:expressJwt} = require('express-jwt');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {User} = require('../models/user');
const {nanoid} = require('nanoid');

const salt = bcrypt.genSaltSync(10);
const secret = "WELCOME_TO_THE_SHOW";
const MS_OF_DAY = 1000 * 60 * 60 * 24;

    /*
    router.use(expressJwt({
        secret:'WELCOME_TO_THE_SHOW',
        algorithms:['HS256']
    }))
    */

router.post('/login', async (req,res) => {
    const {username,password} = req.body;
    const user = await User.findOne({
        where:{
            username:username
        }
    });

    const isMatch = user === null ||  bcrypt.compareSync(password,user.userPassword);

    if(isMatch){
        console.log('isMatch',isMatch);
        res.cookie("login_username",username,{
            maxAge:7 * MS_OF_DAY
        });
        res.send('success');
    }else {
        console.log('error',user.userPassword);
        throw new Error('User Not Found!');
    }
})

router.post('/register',(req,res) => {
    const {username,password,area} = req.body;
    const cryptPwd = bcrypt.hashSync(password,salt);

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

router.get('/home',(req, res) => {
})

router.get('/logout',
    (req,res)=> {
    res.cookie('login_username',1,{
        maxAge:-1
    });

    res.send('退出登录~');
})

router.get('/user', async (req, res)=>{
    const {login_username} = req.cookies;
    console.log('/user',req.cookies.username);
    const user = await User.findOne({
        where:{username:login_username},
    });

        console.log(user.dataValues);
        const {username,userAccount,avatarUrl} = user.dataValues;
        const value = {username,userAccount,avatarUrl};
        res.send(value);
})


module.exports = router;

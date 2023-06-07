const express = require('express');
const router = express.Router();
const {expressjwt:expressJwt} = require('express-jwt');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {User} = require('../models/user');
const {nanoid} = require('nanoid');

const salt = bcrypt.genSaltSync(10);
const secret = "WELCOME_TO_THE_SHOW";

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
        const token = jwt.sign({username:username},secret);
        res.cookie("username",username,{
            maxAge:1000 * 24 * 60 * 60 * 7
        });
        res.send(token);
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

router.get('/home',expressJwt({secret,algorithms:["HS256"]}),(req, res) => {
    console.log('/home');
})

router.get('/logout',(req,res)=> {
    res.cookie('username',1,{
        maxAge:-1
    })
})

router.get('/user',(req, res)=>{
    res.send('Hello world');
})


module.exports = router;

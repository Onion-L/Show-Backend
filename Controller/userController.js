const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const {User} = require('../models/user');
const {nanoid} = require('nanoid');

const salt = bcrypt.genSaltSync(10);

router.post('/login', async (req,res) => {
    const {username,password} = req.body;
    const user = await User.findOne({
        where:{
            username:username
        }
    });

    const isMatch = bcrypt.compareSync(password,user.userPassword);

    if (user === null) {
        throw new Error('User Not Found!');
    }
    else if(isMatch){
        console.log(JSON.stringify(user,null,2));
        console.log('isMatch',isMatch);
        console.log(user.userPassword);
        res.send('Hello world');
    }else {
        console.log('error',user.userPassword);

        // throw new Error('User Not Found!');
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


module.exports = router;

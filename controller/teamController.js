/*
*author:Onion-L
* 队伍表查询，添加
* params:teams,name,des description,maxNum,status,expireTime,username
* */

const express = require('express');
const router = express.Router();
const {Team} = require('../models/team');

//查询队伍数据
router.get('/team',async (req, res) => {
    const teams = await Team.findAll();
    res.send(teams);
    }
)

//添加队伍
router.post('/addTeam',async (req, res) => {
    const {name,status,maxNum,expireTime,description,userId} = req.body;
    await Team.create({
        name,
        description,
        maxNum,
        status,
        expireTime,
        userId
    }).then(()=>{
        console.log('队伍创建成功~~');
        res.send('success');
    }).catch(error=>{
        throw new Error(error.message);
    })
})

module.exports = router;
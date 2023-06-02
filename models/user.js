const {Sequelize, DataTypes} = require('sequelize');
const sequelize = new Sequelize('show-db', 'root', 'root', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',/* 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */
    logging: console.log
});
/*
*     id            bigint auto_increment
        primary key,
    username      varchar(256)                       null comment '用户名',
    user_account  varchar(256)                       null comment '账号',
    avartar_url   varchar(1024)                      null comment '用户头像',
    gender        tinyint                            null comment '性别',
    user_password varchar(512)                       not null comment '密码',
    phone         varchar(128)                       null comment '电话',
    email         varchar(512)                       null comment '邮箱',
    user_state    int                                null comment '用户状态 0 - 正常',
    create_time   datetime default CURRENT_TIMESTAMP null comment '创建时间
',
    update_time   datetime default CURRENT_TIMESTAMP null comment '更新时间',
    is_delete     tinyint  default 0                 not null comment '是否删除',
    role          int      default 0                 null comment '用户角色',
    tags          varchar(1024)                      null comment '标签'
* */

const User = sequelize.define('users',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userAccount: {
        type: DataTypes.STRING
    },
    avartarUrl:{
        type:DataTypes.STRING
    },
    gender:{
        type:DataTypes.TINYINT
    },
    userPassword:{
        type:DataTypes.STRING
    },
    phone:{
        type:DataTypes.STRING
    },
    email:{
        type:DataTypes.STRING
    },
    userState:{
        type:DataTypes.INTEGER
    },
    isDelete:{
        type:DataTypes.TINYINT,
        defaultValue:0
    },
    role:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    userArea:{
        type: DataTypes.STRING
    }
},{
    tableName:'users'
})

User.sync().then(()=>{
    console.log('database creates success');
})


module.exports = {User};

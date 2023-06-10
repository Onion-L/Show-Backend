const {Sequelize, DataTypes} = require('sequelize');
const sequelize = new Sequelize('show-db', 'root', 'root', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',/* 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */
    logging: console.log
});

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
    avatarUrl:{
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

module.exports = {User};

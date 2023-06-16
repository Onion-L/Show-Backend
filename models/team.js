const {Sequelize, DataTypes} = require('sequelize');
const sequelize = new Sequelize('show-db', 'root', '123456', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',/* 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */
    logging: console.log
});

const Team = sequelize.define('teams',{
    id:{
        type:DataTypes.BIGINT,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    name:{
        type:DataTypes.STRING,
        allowNull: false
    },
    description:{
        type:DataTypes.STRING
    },
    maxNum:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:1
    },
    expireTime:{
        type:DataTypes.DATE
    },
    userId:{
        type:DataTypes.INTEGER
    },
    status:{
        type:DataTypes.INTEGER,
        defaultValue: 0,
        allowNull:false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    isDelete:{
        type:DataTypes.TINYINT,
        defaultValue:0
    }
},{
    charset:'utf8'
})

module.exports = {Team};

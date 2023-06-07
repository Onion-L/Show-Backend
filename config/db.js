const db = {
    connected:async function () {
        const {Sequelize} = require('sequelize');
        const sequelize = new Sequelize('show-db', 'root', '123456', {
            host: 'localhost',
            port: 3306,
            dialect: 'mysql',/* 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */
            logging: console.log
        });


        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
}

module.exports = {db};
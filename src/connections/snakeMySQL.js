const { MySql, DataTypes, Model } = require('../../database/mysql/mysql');

const dbSnake = {
    database: 'snake',
    username: '',
    password: '',
    dbConfig: {
        host: 'localhost'
    }
}

module.exports = { MySql, dbSnake, DataTypes, Model };
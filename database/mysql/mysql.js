//ORM
const { Sequelize, DataTypes, Model } = require('sequelize');

//configuracion de la BD
const dbConfig = {
    host: '',
    dialect: 'mysql'
}

class MySql extends Sequelize {
    //creamos el constructor
    constructor(config) {
        super(config.database, config.username, config.password, Object.assign(dbConfig, config.dbConfig));
        this.config = {
            database: '',
            username: '',
            password: '',
            dbConfig: dbConfig
        };
        this.config = Object.assign(this.config, config);
    }

}
module.exports={MySql,DataTypes,Model};




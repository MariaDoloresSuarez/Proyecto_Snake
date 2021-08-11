const { MySql, DataTypes, Model } = require('../../database/mysql/mysql');

const dbSnake = {
    database: 'snake',
    username: '',
    password: '',
    dbConfig: {
        host: 'localhost'
    }
}

const sqlRawQueries ={
    getScores:'SELECT * FROM scores, users WHERE id=id_user order by puntos desc',
    getScoreById:'SELECT * FROM scores WHERE id_score = $id_score',
    createScore: 'INSERT INTO scores (id_score,id_user,puntos,fecha) VALUES($id_score,$id_user,$puntos,$fecha)'
}



module.exports = { MySql, dbSnake, DataTypes, Model,sqlRawQueries};
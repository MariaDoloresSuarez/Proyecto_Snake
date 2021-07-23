const { Model, DataTypes, QueryTypes} = require('sequelize');
const {sqlRawQueries} = require('../connections/snakeMySQL');
class Score extends Model {
    static init(sequelize) {
        return super.init({
            // Model attributes are defined here
            id_score: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            id_user: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            puntos: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            fecha: {
                type: DataTypes.DATE,
                allowNull: false
            }
        }, {
            // Other model options go here
            modelName: 'scores',
            sequelize,
            timestamps: false,
            createdAt: false,
            updatedAt: false
        })
    }
    static getScores() {
         return this.sequelize.query(sqlRawQueries.getScores, { type: QueryTypes.SELECT });
       
    }
    static getScore(where) {
        return this.sequelize.query(sqlRawQueries.getScoreById,
            { bind: { id_score: where }, type: QueryTypes.SELECT }
        );
    }
    static createScore(id_score, id_user, puntos, fecha) {
        return this.sequelize.query(sqlRawQueries.createScore,
            {
                bind: {
                    //id_score:id_score,
                    id_score: Math.floor(Math.random() * 1000),
                    id_user: id_user,
                    puntos: puntos,
                    fecha: fecha
                }, type: QueryTypes.INSERT
            }
        );
    }
}

module.exports= {Score};
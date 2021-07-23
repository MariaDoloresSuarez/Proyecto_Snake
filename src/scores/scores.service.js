const {Score} = require('./scores.entity.raw')

const getScores = async() => {
    
    return await Score.getScores();
}

const getScore = async(id_score) => {
    return await Score.getScore(id_score);
}
const createScore= async(id_score,id_user,puntos,fecha) => {
    return await Score.createScore(id_score,id_user,puntos,fecha);
}
module.exports =  {getScores,getScore,createScore};
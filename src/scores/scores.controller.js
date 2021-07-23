const scoreService=require('./scores.service');

const getScores = async()=>{
return await scoreService.getScores();
}

const getScore = async (id_score)=>{
    return await scoreService.getScore(id_score);
}


const createScore= async (id_score, id_user, puntos, fecha)=>{
   return await scoreService.createScore(id_score, id_user, puntos, fecha);

}
module.exports={getScores,getScore,createScore};
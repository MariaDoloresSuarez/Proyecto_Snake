const express = require('express');
const router = express.Router();
const {getScores, getScore,createScore} = require('./scores.controller');

router.get('/', (req, res) => {
   
  try {
    getScores().then((scores)=>{
    // let users = getUsers();
      res.status(200);
      res.send(scores);
    }).catch((error)=>{
      console.error(error);
      res.sendStatus(500);
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.get('/:id_score', (req, res) => {
  const id_score=req.params.id_score;
  try {
    getScore(id_score).then((scores)=>{
    // let users = getUsers();
      res.status(200);
      res.send(scores);
    }).catch((error)=>{
      res.sendStatus(500);
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.post('/create', (req, res) => {
  const{id_score, id_user, puntos, fecha} = req.body;
  //console.log("1");
  try {
    //console.log("2.1");
    createScore(id_score, id_user, puntos, fecha).then((scores)=>{

      res.status(200);
      res.send(scores);
    }).catch((error)=>{
      //console.log("3");
      console.log(error);

      res.status(500);

      res.send(); //json format error
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

module.exports = router;
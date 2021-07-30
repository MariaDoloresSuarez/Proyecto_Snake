const express=require ('express');
const{User}=require('./users/users.entity');
const{Score}=require('./scores/scores.entity.raw');
const cors = require('cors');


const userRoutes= require('./users/users.routes');
const scoreRoutes= require('./scores/scores.routes');


const app=express();

app.use(express.json());
app.use(cors());


app.use('/v1/users', userRoutes);
app.use('/v1/scores', scoreRoutes);


module.exports={app, User, Score};
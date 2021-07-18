const express=require ('express');
const{User}=require('./users/users.entity');

const userRoutes= require('./users/users.routes');

const app=express();

app.use(express.json());


app.use('/v1/users', userRoutes);

module.exports={app, User};
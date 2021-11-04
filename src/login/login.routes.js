const express = require('express');
const router = express.Router();
const {login} = require('./login.controller')


router.post("/", (req, res) => {
    login(req.body).then((token) => {
        res.status(200);
        res.send(token);
    }).catch(error => {
        console.error(error);
        res.sendStatus(500);
    });
});


module.exports = router;
//ver asincronia
const express = require('express');
const router = express.Router();
const { getUsers, getUserById, createUser, deleteUser, updateUser } = require('./users.controller');

router.get('/', (req, res) => {
  try {
    getUsers().then((users) => {
      // let users = getUsers();
      res.status(200);
      res.send(users);

    }).catch((error) => {
      res.sendStatus(500);
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  try {
    getUserById(id).then((users) => {
      // let users = getUsers();
      res.status(200);
      res.send(users);
    }).catch((error) => {
      res.sendStatus(500);
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.post('/create', (req, res) => {
  const { id, username, fullname, email, password } = req.body;
  //console.log("1");
  try {
    //console.log("2.1");
    createUser(id, username, fullname, email, password).then((users) => {
      //console.log("2.2");

      res.status(200);
      res.send(users);
    }).catch((error) => {
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

router.delete('/:id', (req, res) => {
  try {
    deleteUser(req.params.id).then((users) => {
      console.log(users);
      res.status(200);
      res.send(users);
    }).catch((error) => {
      res.send();
      res.sendStatus(500);
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.put('/:id', (req, res) => {
  const { username, fullname, email, password } = req.body;
  const id = req.params.id;

  try {
    updateUser(id, username, fullname, email, password).then((users) => {
      //console.log('pasa3');

      res.status(200);
      res.send(users);
    }).catch((error) => {
      res.sendStatus(500);
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

module.exports = router;
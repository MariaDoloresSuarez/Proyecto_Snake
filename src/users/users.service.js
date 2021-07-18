const { User } = require('./users.entity');


const getUsers = async () => {
  return await User.findAll();
  // return users;

}

const getUserById = async (id) => {
  const usuario = await User.findByPk(id);
  if (usuario) {
    return usuario;
} else {
    return `El usuario id: ${id} no existe`;
}
 
}

const createUser = async (id, username, fullname, email, password) => {
  //console.log("1.s");
  const user = await User.create({
    id:Math.floor(Math.random() * 1000),
    username,
    fullname,
    email,
    password
  });
  //console.log("2.s");

  return user;
  
}

const deleteUser = async (id) => {
  return await User.destroy({
    where: {
      id: id
    }
  });

}

const updateUser = async (id, username, fullname, email, password) => {

  const user = await User.update({
    username:username,
    fullname:fullname,
    email:email,
    password:password
  }, {
    where: {
      id: id
    }
  });
  return user;

}

module.exports = { getUsers, getUserById, createUser, deleteUser, updateUser };
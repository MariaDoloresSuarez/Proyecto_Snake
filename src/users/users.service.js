const { User } = require('./users.entity');


const getUsers = async () => {
  return await User.findAll();
  // return users;

}

const getUserById = async (id) => {
  const usuario = await User.findByPk(id);
  // if (usuario) {
    console.log (usuario.dataValues);
    return usuario.dataValues;
    //return usuario[0];  
// } else {
//   return `El usuario id: ${id} no existe`;
// }
 
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

 // return  `El usuario id: ${user.id} se creó exitosamente`;
  
}

const deleteUser = async (id) => {
      const user= await User.destroy({
        where: {
          id: id
        }
      });
    return user
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

  // users.splice(pos,1, userNew);
  // console.log(users);
  // return userNew;
}

module.exports = { getUsers, getUserById, createUser, deleteUser, updateUser };
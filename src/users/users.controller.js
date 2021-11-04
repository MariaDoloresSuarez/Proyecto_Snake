const userService = require('./users.service');
const {encriptUser}=require('../login/login.service');

const getUsers = async () => {
   return await userService.getUsers();
}

const getUserById = async (id) => {
   return await userService.getUserById(id);
}


const createUser = async (id, username, fullname, email, password) => {
   const user=({id:id,
      username:username,
      fullname:fullname,
      email:email,
      password:password
   })

   //console.log('creacion'+ user.username);
   const _user= await encriptUser(user);
   //console.log("encriptar"+ _user.username);
   return await userService.createUser(_user.id, _user.username, _user.fullname, _user.email, _user.password);

}

const deleteUser = async (id) => {
   const result = await userService.deleteUser(id);
   try {
      if (result === 1) {
         return id;
      }
   } catch (err) {
      return err;
   }

}

const updateUser = async (id, username, fullname, email, password) => {
   return await userService.updateUser(id, username, fullname, email, password);

}



module.exports = { getUsers, getUserById, createUser, deleteUser, updateUser };
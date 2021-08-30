const userService = require('./users.service');

const getUsers = async () => {
   return await userService.getUsers();
}

const getUserById = async (id) => {
   return await userService.getUserById(id);
}


const createUser = async (id, username, fullname, email, password) => {
   return await userService.createUser(id, username, fullname, email, password);

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
const userService=require('./users.service');

const getUsers = async()=>{
return await userService.getUsers();
}

const getUserById = async (id)=>{
    return await userService.getUserById(id);
}


const createUser= async (id, username, fullname, email, password)=>{
   return await userService.createUser(id,username, fullname, email, password);

}

const deleteUser= async (id)=>{
    return await userService.deleteUser(id);
 
 }

 const updateUser= async(id, username, fullname, email, password)=>{
    return await userService.updateUser(id, username, fullname, email, password);
 
 }



module.exports={getUsers,getUserById,createUser,deleteUser,updateUser};
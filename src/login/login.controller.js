const { getUserById } = require('../users/users.controller');
const { validateUser ,loginUser} = require('./login.service');

const login = async(login) => {
    try {
        console.log('login'+login);

        //let id= JSON.stringify(login);
        //console.log('id'+id);
        const user = await getUserById(login.id);

        // console.log('user login'+ user.password);
        // console.log(login);

        const validate = await validateUser(login, user);
        if (validate) {
            return loginUser(user);
        }
    } catch (error) {
        console.error('error de login' + error);
    }


}

module.exports = {login};
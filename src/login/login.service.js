const bcrypt = require('bcrypt');
const { generateToken, verifyToken, extractToken } = require('../../authServer/authJWT');
const { getSecret } = require('../../authServer/authSecret');

const validateUser = async (login, user) => {
    try {
        //    let pass= login.password;
        //    console.log(pass.toString());
        //    console.log(pass);
        //pass.toString();
        //mejorar poniendo:
        // $ node
        // Welcome to Node.js v14.16.0.
        //     Type ".help" for more information.
        //     > let a = 'casa';
        // undefined
        //     > a
        // 'casa'
        //     > typeof a
        // 'string'
        //     > typeof a === 'string'
        // true
        return await bcrypt.compare(login.password.toString(), user.password.toString());
    } catch (error) {
        console.error(`${error.name} : ${error.message}`);
    }
}

const encriptUser = async (user) => {
    try {
        //console.log('entra encriptar'+user.username);
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        user = Object.assign(user, { password: hash });
        //console.log('user encript'+ user);
        return user;

    } catch (error) {

        console.error(`${error.name}: ${error.message}`);
    }
}

const loginUser = (user) => {

    try {
        const secret = getSecret();
        if (secret.valid) {
            return token = generateToken(user, secret.secret, { expiresIn: secret.expire });
        }
        else throw 'Secret is not valid';

    } catch (error) {
        console.error(`${error.name} : ${error.message}`);
    }
}


const authenticateUser = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader === undefined) {
        res.sendStatus(401);
    } else {
        const secret = getSecret();
        const token = extractToken(authHeader);
        const verify = verifyToken(token, secret);
        if (verify === 403) return res.sendStatus(403);
        req.user = verify;
        next();
    }
    return;
};

module.exports = { loginUser, encriptUser, validateUser, authenticateUser };
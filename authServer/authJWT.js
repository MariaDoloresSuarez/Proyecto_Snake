const jwt = require('jsonwebtoken');


const generateToken = (data, secret, properties) => {
    return jwt.sign(data, secret, properties);
}

const verifyToken = (token, secret) => {
    try {
        jwt.verify(token, secret, (error, data) => {
            return (error) ? 403 : data;
        });
    } catch (error) {
        console.error(error);
    }
}

const extractToken = (auth) => {
    return auth.split(' ')[1];
};

module.exports = {generateToken,verifyToken,extractToken};

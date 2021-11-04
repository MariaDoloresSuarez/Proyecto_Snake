let _secret = {
    secret : '',
    expire : '',
    valid: false
}


const getSecret = ()=>{
    return _secret;
}

const setSecret = (secret)=>{
    _secret = Object.assign(_secret,secret);
    _secret.valid = true;
}

module.exports = {setSecret,getSecret};
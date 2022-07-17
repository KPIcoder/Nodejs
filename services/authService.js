const jwt = require('jsonwebtoken');
const {configs} = require("../constants");
const {passwordEnum} = require("../enums")
const CustomError = require("../custom errors/generalCustomError");


const {forgotPass} = passwordEnum;

const generateAuthTokens = (payload= {}) => {
    const access_token = jwt.sign(payload, configs.ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
    const refresh_token = jwt.sign(payload, configs.REFRESH_TOKEN_SECRET, {expiresIn: '15d'});
    return {access_token, refresh_token};
}

const generateActionToken = (actionType, payload = {}) => {
    let secret = '', expiresIn = '7d';

    switch(actionType) {
        case forgotPass: {
            secret = configs.FORGOT_PASS_ACTION_TOKEN_SECRET;
            break;
        }

        default: {
            throw new CustomError('Wrong action type', 500);
        }
    }
    return jwt.sign(payload, secret,{expiresIn});
}


const checkToken = (token, secret) => {
    try {
        return jwt.verify(token, secret);
    } catch (e) {
        console.log(e.message);
    }
}

module.exports = {
    checkToken,
    generateActionToken,
    generateAuthTokens,
}

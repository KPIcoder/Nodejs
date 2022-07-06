const jwt = require('jsonwebtoken');
const {configs} = require("../constants");


const generateAuthTokens = (payload= {}) => {
    const access_token = jwt.sign(payload, configs.ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
    const refresh_token = jwt.sign(payload, configs.REFRESH_TOKEN_SECRET, {expiresIn: '15d'});
    return {access_token, refresh_token};
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
    generateAuthTokens,
}

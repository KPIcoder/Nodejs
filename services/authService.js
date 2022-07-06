const jwt = require('jsonwebtoken');

const ACCESS_TOKEN_SECRET = 'asd';
const REFRESH_TOKEN_SECRET = 'qwe';

const generateAuthTokens = (payload= {}) => {
    const access_token = jwt.sign(payload, ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
    const refresh_token = jwt.sign(payload, REFRESH_TOKEN_SECRET, {expiresIn: '15d'});
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
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
    checkToken,
    generateAuthTokens,
}

const {authService} = require("../services");
const {OAuth} = require("../database");
const {configs} = require("../constants");
module.exports = {
    checkAccessToken: async (req, res, next) => {
        try {
            const access_token = req.headers.authorization.split(' ')[1];

            if (!access_token)
                return res.status(401).json('Invalid token');

            await authService.checkToken(access_token, configs.ACCESS_TOKEN_SECRET);

            const tokenInfo = await OAuth.findOne({access_token}).populate('userId');

            if (!tokenInfo)
                return res.status(401).json('Token not valid');
            req.user = tokenInfo.userId;
            next();
        } catch (e) {
            next(e);
        }
    },
    checkRefreshToken: async (req, res, next) => {
        try {
            const refresh_token = req.headers.authorization.split(' ')[1];

            if (!refresh_token)
                return res.status(401).json('Invalid token');

            await authService.checkToken(refresh_token, configs.REFRESH_TOKEN_SECRET);

            const tokenInfo = await OAuth.findOne({refresh_token});

            if(!tokenInfo)
                return res.status(401).json('Token not valid');

            req.tokenInfo = tokenInfo;
            next();
        } catch (e) {

        }
    }
}

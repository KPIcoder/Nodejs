const {OAuth} = require("../database");
const {passwordService, authService} = require("../services");

class authController {
    async login (req, res, next) {
        try {
            const {password} = req.body;
            const {password: hashedPassword, _id} = req.user;
            const isPasswordCorrect = await passwordService.compareHashed(hashedPassword, password);
            if (!isPasswordCorrect) {
                res.status(401).json('Incorrect email or password');
            }
            const tokens = authService.generateAuthTokens();

            await OAuth.create({
                userId: _id,
                ...tokens
            });

            res.json({user: req.user, ...tokens});

        } catch (e) {
            next(e);
        }
    }
    async refresh (req, res, next) {
        try {
            const {refresh_token, userId} = req.tokenInfo;

            await OAuth.deleteOne({refresh_token});

            const tokens = authService.generateAuthTokens();

            await OAuth.create({userId, ...tokens})

            res.json(tokens);

            next();
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new authController();

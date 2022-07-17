const {OAuth, ActionTokens, User} = require("../database");
const {emailEnums, passwordEnum} = require("../enums");
const {passwordService, authService, emailService} = require("../services");

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
    async forgotPassword (req, res, next) {
        try {
            const {email, name, _id} = req.user;
            const token = authService.generateActionToken(passwordEnum.forgotPass,{name, _id});

            await ActionTokens.create({
                userId: _id,
                token,
                actionType: passwordEnum.forgotPass
            });
            await emailService.send(email, emailEnums.ForgotPass, {name});

            res.json(token)
        } catch (e) {
            next(e);
        }
    }
    async setForgottenPassword(req, res, next) {
        try {
            const {_id} = req.user;
            const {password} = req.body;

            const hashed = await passwordService.hash(password);
            const updatedUser = await User.findByIdAndUpdate(_id, {password: hashed}, {new: true});

            await ActionTokens.deleteOne({actionType: passwordEnum.forgotPass, userId: _id})
            res.json(updatedUser)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new authController();

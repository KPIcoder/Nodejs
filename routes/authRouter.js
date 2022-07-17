const authRouter = require('express').Router();

const {authController} = require("../controllers");
const {passwordEnum} = require("../enums");
const {userMiddleware, authMiddleware} = require("../middlewares");

authRouter.post('/login', userMiddleware.doesUserExist, authController.login);
authRouter.post('/refresh', authMiddleware.checkRefreshToken, authController.refresh);
authRouter.post('/password/forgot', userMiddleware.doesUserExist, authController.forgotPassword);
authRouter.post('/password/set', authMiddleware.checkActionToken(passwordEnum.forgotPass), authController.setForgottenPassword);

module.exports = authRouter;

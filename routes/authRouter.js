const authRouter = require('express').Router();

const {authController} = require("../controllers");
const {userMiddleware, authMiddleware} = require("../middlewares");

authRouter.post('/login', userMiddleware.doesUserExist, authController.login);
authRouter.post('/refresh', authMiddleware.checkRefreshToken, authController.refresh);

module.exports = authRouter;

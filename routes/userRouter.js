const userRouter = require('express').Router();

const {userController} = require('../controllers');
const {userMiddleware, authMiddleware} = require("../middlewares");

userRouter.get('/', userController.getUsers);
userRouter.post('/', userMiddleware.checkOnCreate, userMiddleware.checkUniqueEmail, userController.createUser);
userRouter.get('/:userId', authMiddleware.checkAccessToken, userMiddleware.checkUserId, userController.getUser);
userRouter.delete('/:userId', userMiddleware.checkUserId, userController.deleteUser);
userRouter.put('/:userId', authMiddleware.checkAccessToken, userMiddleware.checkUserId, userMiddleware.checkOnUpdate, userMiddleware.checkUniqueEmail, userController.updateUser);

module.exports = userRouter;

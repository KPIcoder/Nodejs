const {User} = require("../database");
const {passwordService} = require("../services");

class userController {
    async getUsers (req, res, next) {
        try {
            const users = await User.find();
            if (!users) {
                return res.status(400).json('Error in getting users');
            }
            res.json(users);
        }
        catch (e) {
            next(e);
        }
    }
    async getUser (req, res, next) {
        try {
            const {userId} = req.params;
            const user = await User.findOne({_id: userId});
            if (!user) {
                return res.status(400).json('Error in getting user');
            }
            res.json(user);
        }
        catch (e) {
            next(e);
        }
    }
    async createUser (req, res, next) {
        try {
            const hashedPassword = await passwordService.hash(req.body.password);
            const newUser = await User.create({...req.body, password: hashedPassword});
            if (!newUser) {
                return res.status(400).json('Error in creating user');
            }
            res.status(201).json(newUser);
        }
        catch (e) {
            next(e);
        }
    }
    async deleteUser (req, res, next) {
        try {
            const {userId} = req.params;
            const deletedUser = await User.deleteOne({_id: userId});
            if (!deletedUser)
                return res.status(400).json('Error in deleting user');
            res.json(deletedUser);
        }
        catch (e) {
            next(e);
        }
    }
    async updateUser (req, res, next) {
        try {
            const {userId} = req.params;
            const hashedPassword = await passwordService.hash(req.body.password);
            const updatedUser = await User.findOneAndUpdate({_id: userId}, {...req.body, password: hashedPassword});
            if (!updatedUser)
                return res.status(400).json('Error in updating user');
            res.status(201).json('User updated successfully');
        }
        catch (e) {
            next(e);
        }
    }
}

module.exports = new userController();

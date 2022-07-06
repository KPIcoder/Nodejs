const {userValidator} = require("../validators");
const {User} = require("../database");

module.exports = {
    checkOnCreate: async (req, res, next) => {
        try {
            const {error, value} = userValidator.newUserValidator.validate(req.body);
            if (error)
                return next(res.status(400).json(error.details[0].message));

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    },
    checkOnUpdate: async (req, res, next) => {
        try {
            const {error, value} = userValidator.updatedUserValidator.validate(req.body);
            if (error)
                return next(res.status(400).json(error.details[0].message));
            req.body = value;
            next();
        } catch (e) {
            next(e)
        }
    },
    checkUniqueEmail: async (req, res, next) => {
        try {
            const {email} = req.body;
            const existedUser = await User.findOne({email});
            if(existedUser)
                return next(res.status(409).json('User with such email already exists'));
            next()
        } catch (e) {
            next(e);
        }
    },
    checkUserId: async (req, res, next) => {
        try {
            const {userId} = req.params;
            const {error} = userValidator.userIdValidator.validate(userId);
            if(error)
                res.status(400).json('Invalid id');
            next()
        } catch (e) {
            next(e);
        }
    },
    doesUserExist: async (req, res, next) => {
        try {
            const {email} = req.body;
            const user = await User.findOne({email});
            if(!user)
                return res.status(404).json('User not found');
            req.user = user;
            next()
        } catch (e) {
            next(e);
        }
    }
}

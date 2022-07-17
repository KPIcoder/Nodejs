const {Schema, model} = require('mongoose');

const {passwordEnum} = require('../enums')

const actionTokensScheme = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },

    token: {
        type: String,
        required: true
    },

    actionType: {
        type: String,
        enum: Object.values(passwordEnum),
        required: true
    },
}, { timestamps: true });

module.exports = model('actionTokens', actionTokensScheme);

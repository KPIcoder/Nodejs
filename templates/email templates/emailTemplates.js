const {emailEnums} = require("../../enums");
module.exports = {
    [emailEnums.Welcome]: {
        subject: 'Welcome',
        template: 'welcome'
    },
    [emailEnums.ForgotPass]: {
        subject: 'Security issue notification',
        template: 'forgotpass'
    }
}

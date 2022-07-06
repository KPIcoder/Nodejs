const {emailEnums} = require("../../enums");
module.exports = {
    [emailEnums.Welcome]: {
        subject: 'Welcome',
        template: 'welcome'
    },
    [emailEnums.ForgotPass]: {
        subject: 'Security issue notification',
        template: '<div style="color: aqua">Looks like you have forgotten your password or someone is trying to access your account</div>'
    }
}

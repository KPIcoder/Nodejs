const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars')
const path = require("path");

const {configs} = require("../constants");
const {emailTemplates} = require("../templates");

module.exports = {
    send: async (email = '', emailActions = '', context = {}) => {
        const transporter = nodemailer.createTransport({
            auth: {
                user: configs.NO_REPLY_EMAIL,
                pass: configs.NO_REPLY_EMAIL_PASSWORD
            },
            service: 'gmail'
        });

        const hbsOptions = {
            viewEngine: {
                extname: '.hbs',
                defaultLayout: 'main',
                layoutsDir: path.join(process.cwd(), 'templates', 'email templates', 'layouts'),
                partialsDir: path.join(process.cwd(), 'templates', 'email templates', 'partials')
            },
            viewPath: path.join(process.cwd(), 'templates', 'email templates', 'views'),
            extName: '.hbs'
        }

        transporter.use('compile', hbs(hbsOptions))

        const template = emailTemplates[emailActions]

        if (!template)
            throw new Error('Wrong email action')

        context.frontendUrl = configs.FRONTEND_URL;

        return transporter.sendMail({
            from: 'No reply',
            to: email,
            subject: template.subject,
            template: template.template,
            context,
        })
    }
}

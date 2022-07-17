module.exports = {
    PORT: process.env.PORT || 5000,
    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/test',
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'asd',
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'qwe',
    FORGOT_PASS_ACTION_TOKEN_SECRET: process.env.FORGOT_PASS_ACTION_TOKEN_SECRET || 'iop',
    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL || 'email@example.com',
    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD || '12345',
    FRONTEND_URL: process.env.FRONTEND_URL || 'google.com',
}

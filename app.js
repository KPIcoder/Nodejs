require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');

const {userRouter, authRouter} = require("./routes");
const {configs} = require("./constants");

const app = express();

mongoose.connect(configs.MONGO_URL, () => {
    console.log(`database connected on ${configs.MONGO_URL}`);
});

app.use(express.json());

app.use('/users', userRouter);
app.use('/auth', authRouter);

app.use('*', (req, res) => {
    res.status(404).json('Page not found');
    res.status(404).json('Route not found');
})

app.listen(configs.PORT, ()=> {
    console.log(`Server started on port ${configs.PORT}`);
})


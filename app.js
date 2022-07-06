const express = require('express');
const mongoose = require('mongoose');

const {userRouter, authRouter} = require("./routes");

const app = express();

mongoose.connect('mongodb://localhost:27017/test', () => {
    console.log("database connected");
});

app.use(express.json());

app.use('/users', userRouter);
app.use('/auth', authRouter);

app.use('*', (req, res) => {
    res.status(404).json('Page not found');
    res.status(404).json('Route not found');
})

app.listen(3001, ()=> {
    console.log('Server started');
})


const express = require('express');
const cors = require('cors');
const authRouter = require('./app/routes/auth.route');
const userRouter = require('./app/routes/user.route');
const config = require('./app/config/index');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(config.app.base_api + '/auth', authRouter);
app.use(config.app.base_api + '/user', userRouter);

module.exports = app;

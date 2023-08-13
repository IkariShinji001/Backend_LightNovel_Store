const express = require('express');
const cors = require('cors');
const authRouter = require('./app/routes/auth.route');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/auth', authRouter);

module.exports = app;

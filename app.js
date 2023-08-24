const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const config = require('./app/config/index');

const app = express();

app.use(cors({ credentials: true })); 
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const authRouter = require('./app/routes/auth.route');
const userRouter = require('./app/routes/user.route');
const staffRouter = require('./app/routes/staff.route');
const bookRouter = require('./app/routes/book.route')

app.use(config.app.base_api + '/auth', authRouter);
app.use(config.app.base_api + '/users', userRouter);
app.use(config.app.base_api + '/staffs', staffRouter);
app.use(config.app.base_api + '/books', bookRouter);

module.exports = app;

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
const bookRouter = require('./app/routes/book.route');
const seriesRouter = require('./app/routes/series.route');

app.use(config.app.base_api + '/auth', authRouter);
app.use(config.app.base_api + '/users', userRouter);
app.use(config.app.base_api + '/staffs', staffRouter);
app.use(config.app.base_api + '/books', bookRouter);
app.use(config.app.base_api + '/series', seriesRouter);



// middleware xử lí lỗi
app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).json({ message: 'Đã xảy ra lỗi khi xử lí ở server' });
});

module.exports = app;

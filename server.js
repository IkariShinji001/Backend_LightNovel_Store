const app = require('./app');
const mongoose = require('mongoose');
const config = require('./app/config');

const startServer = async () => {
  try {
    mongoose.connect(config.db.uri);
    console.log('Connected DB');

    const PORT = config.app.port;

    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  } catch (error) {
    console.log('Cannot connect to DB :', error);
    process.exit();
  }
};

startServer();

const mongoose = require('mongoose');

function dbConnection() {
  try {
    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.MONGO_URL_PROD, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Database Connected');
  } catch (err) {
    console.log(err);
    throw new Error('Error connecting to Database');
  }
}

module.exports = dbConnection;

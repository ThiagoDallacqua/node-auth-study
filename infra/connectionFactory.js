const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

function createDBConnection() {
  if (!process.env.NODE_ENV) {
    mongoose.connect("mongodb://localhost/auth_study2", {useMongoClient: true})
  }

  if (process.env.NODE_ENV == 'production') {
    mongoose.connect(process.env.MONGODB_URI)
  }

  return mongoose
}

module.exports = () => {
  return createDBConnection;
}

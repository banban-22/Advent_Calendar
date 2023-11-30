const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  const conn = await mongoose.connect(MONGO_URI);

  mongoose.connection
    .once('open', () =>
      console.log(`MongoDB Connected: ${conn.connectionl.host}`)
    )
    .on('error', (error) =>
      console.log('Error connecting to Mongo Atlas: ', error)
    );
};

module.exports = connectDB;

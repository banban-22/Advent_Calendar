const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');

const port = 8080;
const app = express();

// app.use(cors());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
// const MONGO_URI = process.env.MONGO_URI;
const MONGO_URI =
  'mongodb+srv://ayakabando22:TOMpU1Mjy1ZDeWDR@cluster0.agbwv3o.mongodb.net/?retryWrites=true&w=majority';

if (!MONGO_URI) {
  console.error('MONGO_URI is not defined. Check your environment variables.');
  process.exit(1); // Exit the process with an error code
}
mongoose.Promise = global.Promise;

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}
connectDB();

app.use(
  session({
    resave: false,
    secret: 'aaabbbccc',
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: MONGO_URI,
      collection: 'sessions',
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
    // graphiql: process.env.NODE_ENV === 'development',
  })
);

app.listen(port, () => console.log(`Server running on port ${port}.`));

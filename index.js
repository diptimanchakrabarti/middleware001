import mongoose from 'mongoose';
import app from './config/express';
import config from './config/env';
import dotenv from 'dotenv';
dotenv.config()

// const mongoose = require('mongoose');
// const app = require('./config/express').app;
// const config = require('./config/env').default.default;

// console.log(config);

// mongoose.connect(config.default.db, {useNewUrlParser: true, dbName: config.default.dbnm});
mongoose.connect(`${process.env.DB}`, {useNewUrlParser: true, dbName: `${process.env.DB_NM}`});
//mongoose.connect('mongodb://localhost:27017/app-metadata', {useNewUrlParser: true});

mongoose.connection.on('error', () => {
    // throw new Error(`unable to connect to database: ${config.default.db}`);
    throw new Error(`unable to connect to database: ${process.env.DB}`);
  });
  mongoose.connection.on('connected', () => {
    // console.log(`Connected to database: ${config.default.db}`);
    console.log(`Connected to database: ${process.env.DB}`);
  });

  if (config.default.env === 'development') {
    mongoose.set('debug', true);
  }

app.listen(3000, () => {
    console.log(`Server Started and listening on port
    ${config.default.port} (${process.env.DB})`);
    // ${config.default.port} (${config.default.env})`);
});

export default app;

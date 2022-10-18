/* eslint-disable import/first */
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import path from 'path';
import Router from './src/routes/Router';
import Mongoose from './src/config/Mongoose';

const app = express();
const port = process.env.PORT ?? 3000;
const mongoose = new Mongoose();

const start = (): void => {
  app.set('views', path.join(__dirname, 'src', 'views'));
  app.set('view engine', 'hbs');
  console.log(path.join(__dirname, 'public'));
  app.use(express.static(path.join(__dirname, 'public')));

  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use('/', new Router().getRouter());

  app.listen(port, () => {
    console.log(`Running on ${port}`);
  });

  mongoose.connect().then(() => console.log('Database online'))
    .catch((err) => console.error(err));
};

start();

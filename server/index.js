import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import exphbs from 'express-handlebars';
import path from 'node:path';
import * as dotenv from 'dotenv';
import authRouter from './authModule/authRouter.js';
import collectionRouter from './collectionModule/collectionRouter.js';
import deckRouter from './deckModule/deckRouter.js';

dotenv.config();
const __dirname = path.resolve();
const PORT = process.env.PORT || 5000;

const app = express();

const corsOptions = {
  origin: process.env.ORIGIN || 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('/', (req, res) => {
  try {
    res.render('index', {
      title: 'Pokemons',
    });
  } catch (error) {
    console.log(error);
  }
});
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from server, my Pokemon friend!' });
});
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
// });

app.use('/auth', authRouter);
app.use('/collection', collectionRouter);
app.use('/deck', deckRouter);

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

const start = async () => {
  try {
    await mongoose.connect('mongodb+srv://Chebok:202Seldon@cluster0.h58165t.mongodb.net/mongo-node-app', {
      useNewUrlParser: true,
    });
    app.listen(PORT, () => {
      console.log(`Server has been started... on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();

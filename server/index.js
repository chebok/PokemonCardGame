const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const path = require('node:path');
const authRouter = require('./authRouter');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', authRouter);

app.get('/', (req, res) => {
  try {
    res.render('index', {
      title: 'Pokemons',
    });
  } catch (error) {

  }
});

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

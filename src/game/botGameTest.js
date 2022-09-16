const Game = require('./Game');
const statsRandomizer = require('../cards/randomizer');

const cards = [
  {
    name: 'squirtle',
    element: 'water',
    ...statsRandomizer(),
  },
  {
    name: 'bulbasaur',
    element: 'earth',
    ...statsRandomizer(),
  },
  {
    name: 'charmander',
    element: 'earth',
    ...statsRandomizer(),
  },
];
console.log(cards);
const gameInstance = new Game(cards, cards);

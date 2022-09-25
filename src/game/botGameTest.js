import Game from './Game.js';
import statsRandomizer from '../cards/randomizer.js';

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

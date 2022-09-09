/* eslint-disable no-undef */
const Game = require('../src/game/Game');

const cards = [
  {
    name: 'squirtle',
    element: 'water',
    health: 20,
    damage: 10,
  },
  {
    name: 'charmander',
    element: 'fire',
    health: 20,
    damage: 10,
  },
  {
    name: 'bulbasaur',
    element: 'earth',
    health: 20,
    damage: 10,
  },
];

let gameInstance;

beforeEach(() => {
  gameInstance = new Game(cards, cards);
});

test('playerturn', () => {
  const pokemon1 = gameInstance.state.playerPokemons[0];
  const pokemon2 = gameInstance.state.botPokemons[1];
  gameInstance.turn(pokemon1, pokemon2);
  gameInstance.turn(pokemon1, pokemon2);
  console.log(gameInstance.log.join('\n'));
  expect(pokemon2.status).toEqual('dead');
});

test('botturn', () => {
  const pokemon1 = gameInstance.state.playerPokemons[0];
  const pokemon2 = gameInstance.state.playerPokemons[1];
  gameInstance.botTurn();
  gameInstance.botTurn();
  gameInstance.botTurn();
  gameInstance.botTurn();
  gameInstance.botTurn();
  gameInstance.botTurn();
  gameInstance.botTurn();
  gameInstance.botTurn();
  console.log(gameInstance.log.join('\n'));
  expect(pokemon1.status).toEqual('dead');
  expect(pokemon2.status).toEqual('dead');
  expect(gameInstance.state.phase).toEqual('finish');
});

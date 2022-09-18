/* eslint-disable no-undef */
const Game = require('../src/game/Game');

const cards1 = [
  {
    name: 'squirtle',
    element: 'water',
    health: 20,
    damage: 10,
  },
];

const cards2 = [
  {
    name: 'bulbasaur',
    element: 'earth',
    health: 20,
    damage: 10,
  },
];

beforeEach(() => {
  jest.setTimeout(60000);
});
// beforeEach(() => {
//   gameInstance = new Game(cards1, cards2);
// });

// test('playerturn', () => {
//   const pokemon1 = gameInstance.state.playerPokemons[0];
//   const pokemon2 = gameInstance.state.botPokemons[1];
//   gameInstance.turn(pokemon1, pokemon2);
//   gameInstance.turn(pokemon1, pokemon2);
//   console.log(gameInstance.log.join('\n'));
//   expect(pokemon2.status).toEqual('dead');
// });

test('botturn', async () => {
  const gameInstance = new Game(cards1, cards2);
  const result = await new Promise((resolve) => {
    setTimeout(() => resolve(gameInstance.state.phase), 20000);
  });
  expect(result).toEqual('finish');
  // expect(pokemon1.status).toEqual('dead');
  // expect(pokemon2.status).toEqual('dead');
});

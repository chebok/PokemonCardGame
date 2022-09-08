/* eslint-disable no-undef */
const Pokemon = require('../src/game/Pokemon');

let pokemon1;
let pokemon2;

beforeAll(() => {
  pokemon1 = new Pokemon('squirtle', 'water', 20, 10);
  pokemon2 = new Pokemon('charmander', 'fire', 20, 10);
});

test('testDamage', () => {
  const action = 'attack';
  expect(pokemon1[action](pokemon2)).toEqual(15);
  expect(pokemon2.attack(pokemon1)).toEqual(5);
});

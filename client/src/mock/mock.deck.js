import a001 from './images/a001.png';
import b1 from './images/b1.gif';
import b1back from './images/b1back.gif';

const mockDeck = [
  {
    id: '001',
    name: 'Bulbasaur',
    element: 'Grass',
    legend: 'While it is young, it uses the nutrients that are stored in the seed on its back in order to grow.',
    image: a001,
    sprite: b1,
    spriteBack: b1back,
    health: 40,
    speed: 7,
    damage: 6,
  },
  {
    id: '013',
    name: 'Weedle',
    element: 'Bug',
    legend: 'Beware of the sharp stinger on its head. It hides in grass and bushes where it eats leaves.',
    image: a001,
    sprite: b1,
    spriteBack: b1back,
    health: 36,
    speed: 9,
    damage: 8,
  },
  {
    id: '151',
    name: 'Mew',
    element: 'Psychic',
    legend: 'When viewed through a microscope, this Pokémon’s short, fine, delicate hair can be seen.',
    image: a001,
    sprite: b1,
    spriteBack: b1back,
    health: 34,
    speed: 9,
    damage: 9,
  }
]

export default mockDeck;

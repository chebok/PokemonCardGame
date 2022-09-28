import questionMark from './images/questionMark.jpeg';
import result from './result.json';

const cardsDeckId = [1, 13, 151];
const cardsCollectionId = [1, 2, 3, 13, 56, 151];

const mockPokemons = [
  {
    id: '001',
    name: 'Bulbasaur',
    element: 'Grass',
    legend: 'While it is young, it uses the nutrients that are stored in the seed on its back in order to grow.',
    image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/1.gif',
    spriteBack: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/1.gif'
  },
  {
    id: '002',
    name: 'Ivysaur',
    element: 'Grass',
    legend: 'Exposure to sunlight adds to its strength. Sunlight also makes the bud on its back grow larger.',
    image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/002.png',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/2.gif',
    spriteBack: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/2.gif'
  },
  {
    id: '003',
    name: 'Venusaur',
    element: 'Grass',
    legend: 'A bewitching aroma wafts from its flower. The fragrance becalms those engaged in a battle.',
    image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/003.png',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/3.gif',
    spriteBack: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/3.gif'
  },
  {
    id: '013',
    name: 'Weedle',
    element: 'Bug',
    legend: 'Beware of the sharp stinger on its head. It hides in grass and bushes where it eats leaves.',
    image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/013.png',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/13.gif',
    spriteBack: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/13.gif'
  },
  {
    id: '151',
    name: 'Mew',
    element: 'Psychic',
    legend: 'When viewed through a microscope, this Pokémon’s short, fine, delicate hair can be seen.',
    image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/151.png',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/151.gif',
    spriteBack: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/151.gif'
  },
  {
    id: '011',
    name: 'Bulbasaur',
    element: 'Grass',
    legend: 'While it is young, it uses the nutrients that are stored in the seed on its back in order to grow.',
    image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/1.gif',
    spriteBack: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/1.gif'
  },
  {
    id: '021',
    name: 'Locked',
    element: 'Grass',
    legend: 'While it is young, it uses the nutrients that are stored in the seed on its back in order to grow.',
    image: questionMark,
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/1.gif',
    spriteBack: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/1.gif'
  },
  {
    id: '022',
    name: 'Locked',
    element: 'Grass',
    legend: 'Exposure to sunlight adds to its strength. Sunlight also makes the bud on its back grow larger.',
    image: questionMark,
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/2.gif',
    spriteBack: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/2.gif'
  },
  {
    id: '023',
    name: 'Locked',
    element: 'Grass',
    legend: 'A bewitching aroma wafts from its flower. The fragrance becalms those engaged in a battle.',
    image: questionMark,
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/3.gif',
    spriteBack: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/3.gif'
  },
  {
    id: '033',
    name: 'Locked',
    element: 'Bug',
    legend: 'Beware of the sharp stinger on its head. It hides in grass and bushes where it eats leaves.',
    image: questionMark,
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/13.gif',
    spriteBack: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/13.gif'
  },
  {
    id: '051',
    name: 'Locked',
    element: 'Psychic',
    legend: 'When viewed through a microscope, this Pokémon’s short, fine, delicate hair can be seen.',
    image: questionMark,
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/151.gif',
    spriteBack: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/151.gif'
  },
  {
    id: '061',
    name: 'Locked',
    element: 'Grass',
    legend: 'While it is young, it uses the nutrients that are stored in the seed on its back in order to grow.',
    image: questionMark,
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/1.gif',
    spriteBack: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/1.gif'
  }
]

export default mockPokemons;

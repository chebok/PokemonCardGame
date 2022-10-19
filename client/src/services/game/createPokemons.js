import Pokemon from './Pokemon.js';

const createPokemons = (cards) => {
  const result = cards.map((card) => new Pokemon(card.name, card.element, card.health, card.damage, card.speed));
    console.log('result in createPokemons', result);
  return result;
};

export default createPokemons;

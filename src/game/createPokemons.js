import Pokemon from './Pokemon.js';

const createPokemons = (cards) => {
  const result = cards
    .map((card) => new Pokemon(card.name, card.element, card.health, card.damage, card.speed));
  return result;
};

export default createPokemons;

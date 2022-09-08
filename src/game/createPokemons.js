const Pokemon = require('./Pokemon');

const createPokemons = (cards) => {
  const result = cards
    .map((card) => new Pokemon(card.name, card.element, card.health, card.damage));
  return result;
};

module.exports = createPokemons;

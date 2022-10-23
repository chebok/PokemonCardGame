import Pokemon from './Pokemon.js';

const createPokemons = (cards) => {
  const result = cards.map((card) => new Pokemon(card.id, card.name, card.element, card.health, card.damage, card.speed, card.sprite, card.spriteBack));
  return result;
};

export default createPokemons;

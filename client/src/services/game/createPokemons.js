import Pokemon from './Pokemon.js';

const createPokemons = (cards) => {
  const result = cards.map((card) => new Pokemon(card.id, card.name, card.element, card.health, card.damage, card.speed, card.sprite, card.spriteBack));
    console.log('result in createPokemons', result);
  return result;
};

export default createPokemons;

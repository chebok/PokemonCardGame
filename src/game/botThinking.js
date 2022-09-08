const botThinking = (game) => {
  const pokemon1 = game.state.botPokemons
    .find((pokemon) => pokemon.status === 'alive');
  const pokemon2 = game.state.playerPokemons
    .find((pokemon) => pokemon.status === 'alive');
  return [pokemon1, pokemon2, 'attack'];
};

module.exports = botThinking;

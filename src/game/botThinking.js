const botThinking = (pokemon1, game) => {
  const pokemon2 = game.state.playerPokemons
    .find((pokemon) => pokemon.status === 'alive');
  if (!pokemon2) {
    throw new Error(`Статус игры ${game.state.phase}`);
  }
  return [pokemon2, 'attack'];
};

module.exports = botThinking;

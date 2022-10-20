const botThinking = (pokemon1, game) => {
  const pokemon2 = game.state.playerPokemons
    .find((pokemon) => pokemon.isAlive);
  if (!pokemon2) {
    throw new Error(`Статус игры ${game.state.isGameActive}`);
  }
  return [pokemon2, 'attack'];
};

export default botThinking;

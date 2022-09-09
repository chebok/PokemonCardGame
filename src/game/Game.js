const createPokemons = require('./createPokemons');
const botThinking = require('./botThinking');

class Game {
  constructor(cards1, cards2, difficult = 'easy') {
    this.state = {
      playerPokemons: createPokemons(cards1),
      botPokemons: createPokemons(cards2),
      phase: 'game',
    };
    this.log = [];
    this.difficult = difficult;
  }

  turn(pokemon1, pokemon2, action = 'attack') {
    const resultDamage = pokemon1[action](pokemon2);
    pokemon2.takeDamage(resultDamage);

    const resultMessage = `${pokemon1.name} deals damage ${resultDamage} ${pokemon2.name}.\n${pokemon2.name} ${pokemon2.status}`;
    this.log.push(resultMessage);
    this.isEnd();
  }

  botTurn() {
    const [pokemon1, pokemon2, action] = botThinking(this);
    this.turn(pokemon1, pokemon2, action);
  }

  isEnd() {
    const pokemon1 = this.state.botPokemons
      .find((pokemon) => pokemon.status === 'alive');
    if (!pokemon1) {
      this.state.end = 'finish';
      this.log.push('You win');
    }
    const pokemon2 = this.state.playerPokemons
      .find((pokemon) => pokemon.status === 'alive');
    if (!pokemon2) {
      this.state.phase = 'finish';
      this.log.push('You lose');
    }
  }
}

module.exports = Game;

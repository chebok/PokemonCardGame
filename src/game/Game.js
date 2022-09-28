import debug from 'debug';
import createPokemons from './createPokemons.js';
import botThinking from './botThinking.js';
import waitTimer from './waitTimer.js';

const log = debug('game');

class Game {
  constructor(cards1, cards2, difficulty = 'easy') {
    this.state = {
      playerPokemons: createPokemons(cards1).map((pok) => {
        waitTimer(pok);
        return pok;
      }),
      botPokemons: createPokemons(cards2).map((pok) => {
        waitTimer(pok, this.botTurn.bind(this));
        return pok;
      }),
      isGameActive: true,
    };
    this.log = [];
    this.difficulty = difficulty;
    log('game created');
  }

  turn(pokemon1, pokemon2, action = 'attack', cb1 = () => {}, cb2 = () => {}) {
    const resultDamage = pokemon1[action](pokemon2);
    pokemon2.takeDamage(resultDamage);
    waitTimer(pokemon1, cb1, cb2);
    const resultMessage = `${pokemon1.name} deals ${resultDamage} damage to ${pokemon2.name}.\n${pokemon2.name} ${pokemon2.isAlive}`;
    log(resultMessage);
    this.log.push(resultMessage);
    this.isEnd();
  }

  botTurn(pokemon1) {
    const [pokemon2, action] = botThinking(pokemon1, this);
    this.turn(pokemon1, pokemon2, action, () => this.botTurn(pokemon1));
  }

  isEnd() {
    const pokemon1 = this.state.botPokemons
      .find((pokemon) => pokemon.isAlive);
    if (!pokemon1) {
      this.state.isGameActive = false;
      log('You win');
      this.log.push('You win');
    }
    const pokemon2 = this.state.playerPokemons
      .find((pokemon) => pokemon.isAlive);
    if (!pokemon2) {
      this.state.isGameActive = false;
      log('You lose');
      this.log.push('You lose');
    }
  }
}

export default Game;

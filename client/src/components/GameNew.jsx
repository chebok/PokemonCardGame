import { useState, useEffect, Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RivalCard from './RivalCard';
import PlayerCard from './PlayerCard';
import styled from 'styled-components';
import { getDeck, getRandomDeck } from '../redux/actions/deck';
import waitTimer from '../services/game/waitTimer';
import botThinking from '../services/game/botThinking';
import createPokemons from '../services/game/createPokemons';

const cards1 = Array(3).fill({
  "id": "077",
  "name": "Ponyta",
  "element": "Fire",
  "legend": "If you’ve been accepted by Ponyta, its burning mane is mysteriously no longer hot to the touch.",
  "image": "https://assets.pokemon.com/assets/cms2/img/pokedex/full/077.png",
  "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/77.gif",
  "spriteBack": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/77.gif",
  "health": 34,
  "speed": 8,
  "damage": 10
});

const cards2 = Array(3).fill({
  "id": "039",
  "name": "Jigglypuff",
  "element": "Fire",
  "legend": "If you’ve been accepted by Ponyta, its burning mane is mysteriously no longer hot to the touch.",
  "image": "https://assets.pokemon.com/assets/cms2/img/pokedex/full/077.png",
  "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/39.gif",
  "spriteBack": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/39.gif",
  "health": 38,
  "speed": 9,
  "damage": 7,
});

export default class GameNew extends Component {
  constructor(props) {
    super(props);
    // const { cards1, cards2, difficulty } = this.props;
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
    this.difficulty = props.difficulty;
    console.log('game created');
  }

  turn(pokemon1, pokemon2, action = 'attack', cb1 = () => { }, cb2 = () => { }) {
    const resultDamage = pokemon1[action](pokemon2);
    pokemon2.takeDamage(resultDamage);
    waitTimer(pokemon1, cb1, cb2);
    const resultMessage = `Player's ${pokemon1.name} deals ${resultDamage} damage to ${pokemon2.name}.\n${pokemon2.name} ${pokemon2.isAlive}`;
    console.log(resultMessage);
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
      this.setState({
        isGameActive: false,
      })
      // this.state.isGameActive = false;
      console.log('You win');
      this.log.push('You win');
    }
    const pokemon2 = this.state.playerPokemons
      .find((pokemon) => pokemon.isAlive);
    if (!pokemon2) {
      // this.state.isGameActive = false;
      this.setState({
        isGameActive: false,
      })
      console.log('You lose');
      this.log.push('You lose');
    }
  }

  renderLog() {
    const gameLog = this.log ? this.log : [];
    return (
      <>
        {gameLog?.map((logItem) =>
          <li>{logItem}</li>
        )}
      </>
    )
  }

  renderPlayerPokemons() {
    const playerPoks = this.state.playerPokemons;
    const isCardReadyToMove = () => {
      console.log('isCardReadyToMove');
    }
    console.log('playerPoks[0]', playerPoks[0]);

    return (
      <>
        <PlayerCardsBlock>
          {playerPoks?.map((playerPokemon) =>
            <PlayerCard
              pokemon={playerPokemon}
              key={playerPokemon.id}
              // onClick={(e) => handlePlayerCardClick(playerPokemon.id, e)}
              // isPlayerActiveCard={isPlayerActiveCard(playerPokemon.id)}
              isCardReadyToMove={isCardReadyToMove}
              // isCurrentAttackInProgress={isCurrentAttackInProgress(playerPokemon.id)}
              onClick={(e) => console.log('Player clicked on', playerPokemon.name, e)}
              isPlayerActiveCard={false}
              // isCardReadyToMove={false}
              isCurrentAttackInProgress={false}
            />
          )}
        </PlayerCardsBlock>
      </>
    )
  }
  renderBotPokemons() {
    const botPoks = this.state.botPokemons;
    const isCardReadyToMove = () => {
      console.log('isCardReadyToMove');
    }
    console.log('botPoks[0]', botPoks[0]);

    return (
      <>
        <RivalCardsBlock>
          {botPoks?.map((playerPokemon) =>
            <RivalCard
              pokemon={playerPokemon}
              key={playerPokemon.id}
              // onClick={(e) => handlePlayerCardClick(playerPokemon.id, e)}
              // isPlayerActiveCard={isPlayerActiveCard(playerPokemon.id)}
              isCardReadyToMove={isCardReadyToMove}
              // isCurrentAttackInProgress={isCurrentAttackInProgress(playerPokemon.id)}
              onClick={(e) => console.log('Player clicked on', playerPokemon.name, e)}
              isPlayerActiveCard={false}
              // isCardReadyToMove={false}
              isCurrentAttackInProgress={false}
            />
          )}
        </RivalCardsBlock>
      </>
    )
  }

  render() {
    return (
      <>
      <Container>
        <div>GameNew</div>
        {this.renderBotPokemons()}
        {this.renderPlayerPokemons()}
        {this.renderLog()}
      </Container>
      </>
    )
  }
}

const Container = styled.div`
height: 100vh;
padding: 30px;
background-color: pink;
`;

const RivalCardsBlock = styled.div`
display: flex;
justify-content: flex-end;
align-items: center;
height: 300px;
border-color: blue;
`;

const PlayerCardsBlock = styled.div`
display: flex;
justify-content: flex-start;
align-items: center;
height: 300px;
border-color: blue;
`;

import { useState, useEffect, Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RivalCardNew from './RivalCardNew';
import PlayerCardNew from './PlayerCardNew';
import styled from 'styled-components';
import { getDeck, getRandomDeck } from '../redux/actions/deck';
import waitTimer from '../services/game/waitTimer';
import botThinking from '../services/game/botThinking';
import createPokemons from '../services/game/createPokemons';

const userDeck = [{
  "id": "077",
  "name": "Ponyta1",
  "element": "Fire",
  "legend": "If you’ve been accepted by Ponyta, its burning mane is mysteriously no longer hot to the touch.",
  "image": "https://assets.pokemon.com/assets/cms2/img/pokedex/full/077.png",
  "sprite": "../static/b1.gif",
  "spriteBack": "../static/b1back.gif",
  "health": 34,
  "speed": 8,
  "damage": 10
},
{
  "id": "078",
  "name": "Ponyta2",
  "element": "Fire",
  "legend": "If you’ve been accepted by Ponyta, its burning mane is mysteriously no longer hot to the touch.",
  "image": "https://assets.pokemon.com/assets/cms2/img/pokedex/full/077.png",
  "sprite": "../static/b1.gif",
  "spriteBack": "../static/b1back.gif",
  "health": 34,
  "speed": 8,
  "damage": 10
},
{
  "id": "079",
  "name": "Ponyt3",
  "element": "Fire",
  "legend": "If you’ve been accepted by Ponyta, its burning mane is mysteriously no longer hot to the touch.",
  "image": "https://assets.pokemon.com/assets/cms2/img/pokedex/full/077.png",
  "sprite": "../static/b1.gif",
  "spriteBack": "../static/b1back.gif",
  "health": 34,
  "speed": 8,
  "damage": 10
}];

const randomDeck = [{
  "id": "037",
  "name": "JIDD1",
  "element": "Fire",
  "legend": "If you’ve been accepted by Ponyta, its burning mane is mysteriously no longer hot to the touch.",
  "image": "https://assets.pokemon.com/assets/cms2/img/pokedex/full/077.png",
  "sprite": "../static/b1.gif",
  "spriteBack": "../static/b1back.gif",
  "health": 34,
  "speed": 8,
  "damage": 10
},
{
  "id": "038",
  "name": "JUDD2",
  "element": "Fire",
  "legend": "If you’ve been accepted by Ponyta, its burning mane is mysteriously no longer hot to the touch.",
  "image": "https://assets.pokemon.com/assets/cms2/img/pokedex/full/077.png",
  "sprite": "../static/b1.gif",
  "spriteBack": "../static/b1back.gif",
  "health": 34,
  "speed": 8,
  "damage": 10
},
{
  "id": "039",
  "name": "JODD3",
  "element": "Fire",
  "legend": "If you’ve been accepted by Ponyta, its burning mane is mysteriously no longer hot to the touch.",
  "image": "https://assets.pokemon.com/assets/cms2/img/pokedex/full/077.png",
  "sprite": "../static/b1.gif",
  "spriteBack": "../static/b1back.gif",
  "health": 34,
  "speed": 8,
  "damage": 10
}];

const findPokById = (deck, cardId) => {
  const foundCard = deck.find((card) => card.id === cardId);
  return foundCard;
};

export default class GameNew extends Component {
  constructor(props) {
    super(props);
    // const { cards1, cards2, difficulty } = this.props;
    this.state = {
      playerPokemons: createPokemons(userDeck).map((pok) => {
        waitTimer(pok);
        return pok;
      }),
      botPokemons: createPokemons(randomDeck).map((pok) => {
        waitTimer(pok, this.botTurn.bind(this));
        return pok;
      }),
      isGameActive: true,
    };
    this.log = [];
    this.difficulty = props.difficulty;
    console.log('game created');
  }

  turn(playerPokemon, rivalPokemon, action = 'attack', cb1 = () => { }, cb2 = () => { }) {
    console.log('playerPokemon in turn is:', playerPokemon);
    // const resultDamage = playerPokemon[action](rivalPokemon);
    // rivalPokemon.takeDamage(resultDamage);
    // waitTimer(playerPokemon, cb1, cb2);
    // const resultMessage = `Player's ${playerPokemon.name} deals ${resultDamage} damage to ${rivalPokemon.name}.\n RivalPokemon ${rivalPokemon.name} is alive: ${rivalPokemon.isAlive}`;
    // console.log(resultMessage);
    // this.log.push(resultMessage);
    // this.isEnd();
  }

  botTurn(botTargePlayerPokemon) {
    console.log('botTargePlayerPokemon in botTurn is:', botTargePlayerPokemon);

    // const [ botPokemon, action ] = botThinking(botTargePlayerPokemon, this);
    // this.turn(botTargePlayerPokemon, botPokemon, action, () => this.botTurn(botTargePlayerPokemon));
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
    // const isCardReadyToMove = () => {
    //   console.log('isCardReadyToMove');
    // }
    console.log('playerPoks', playerPoks);
    console.log('playerPoks[0]', playerPoks[0]);

    const isPlayerActiveCard = (cardId) => {
      const foundPlayerPok = findPokById(playerPoks, cardId);
      return cardId === foundPlayerPok?.id ? true : false;
    };

    const handlePlayerCardClick = (cardId, e) => {
      e.preventDefault();
      const foundPlayerPok = findPokById(playerPoks, cardId);

      if (foundPlayerPok.isAlive && foundPlayerPok.isReadytoMove) {
        isPlayerActiveCard(cardId);

      }
      // const playerPokemon = this.state.botPokemons.find((pokemon) => pokemon.isAlive);

      // const foundPlayerPok = findPokById(playerPoks, cardId);

    };

    return (
      <>
        <PlayerCardsBlock>
          {playerPoks?.map((playerPokemon) =>
            <PlayerCardNew
              pokemon={playerPokemon}
              key={playerPokemon.id}
              // onClick={(e) => handlePlayerCardClick(playerPokemon.id, e)}
              // isPlayerActiveCard={isPlayerActiveCard(playerPokemon.id)}
              // isCardReadyToMove={isCardReadyToMove}
              // isCurrentAttackInProgress={isCurrentAttackInProgress(playerPokemon.id)}
              onClick={(e) => handlePlayerCardClick(playerPokemon.id, e)}
              // isPlayerActiveCard={isPlayerActivePok(playerPokemon.id)}
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
    // const isCardReadyToMove = () => {
    //   console.log('isCardReadyToMove');
    // }
    console.log('botPoks[0]', botPoks[0]);

    const isTargetRivalCard = (cardId) => {
      const foundPlayerPok = findPokById(botPoks, cardId);
      return cardId === foundPlayerPok?.id ? true : false;
    };

    const handleRivalCardClick = (cardId, e) => {
      e.preventDefault();
      const foundPlayerPok = findPokById(botPoks, cardId);

      if (foundPlayerPok.isAlive && foundPlayerPok.isReadytoMove) {
        isTargetRivalCard(cardId);

      }
    };

    return (
      <>
        <RivalCardsBlock>
          {botPoks?.map((pokemon) =>
            <RivalCardNew
              pokemon={pokemon}
              key={pokemon.id}
              onClick={(e) => handleRivalCardClick(pokemon.id, e)}
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

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RivalCard from './RivalCard';
import PlayerCard from './PlayerCard';
// import PlayerCardsBlock from './PlayerCardsBlock';
// import RivalCardsBlock from './RivalCardsBlock';
import styled from 'styled-components';
import Game from '../services/game/Game.js';
import { getDeck } from '../redux/actions/deck';
import { getRandomDeck } from '../redux/actions/deck';


export default function GamePage() {
  const [chosenPlayerCardId, setChosenPlayerCardId] = useState(0);
  const [chosenRivalCardId, setChosenRivalCardId] = useState(0);
  const [canPlayerMove, setCanPlayerMove] = useState(false);

  const user = useSelector((store) => store.auth.user);
  const { userDeck, randomDeck } = useSelector((store) => store.deck);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDeck(user.id));
    dispatch(getRandomDeck());
  }, []);

  useEffect(() => {
    // const newGameInstance = new Game(userDeck, randomDeck);
    // console.log('randomDeck, ', randomDeck);

  }, [userDeck, randomDeck]);

  const handlePlayerCardClick = (cardId, e) => {
    if (canPlayerMove) {
      e.preventDefault();
      console.log('clicked on ', cardId);

      userDeck.filter((pokemon) => {
        if (pokemon.id === cardId) {
          setChosenPlayerCardId(cardId);
          setCanPlayerMove(true);

          return true;
        }

        return false;
      })
    }
  };

  const isChosenPlayerCard = (cardId) => {
    return cardId === chosenPlayerCardId ? true : false;
  };

  const handleRivalCardClick = (rivalCardId, e) => {
    if (canPlayerMove) {
      e.preventDefault();
      console.log('clicked on ', rivalCardId);

      randomDeck.filter((pokemon) => {
        if (pokemon.id === rivalCardId) {
          setChosenRivalCardId(rivalCardId);

          return true;
        }

        return false;
      })
    }
  };

  const isChosenRivalCard = (rivalCardId) => {
    return rivalCardId === chosenRivalCardId ? true : false;
  };

  const activatePlayerMove = (canMove) => {
    if (canMove) {
      setCanPlayerMove(true);
    }
  };

  return (
    <Container>
      <RivalCardsBlock>
        {randomDeck && randomDeck.map((rivalPokemon) =>
          <RivalCard
            pokemon={rivalPokemon}
            key={rivalPokemon.id}
            onClick={(e) => handleRivalCardClick(rivalPokemon.id, e)}
            isChosenRivalCard={isChosenRivalCard(rivalPokemon.id)}
          />
        )}
      </RivalCardsBlock>
      <h1>Fight!</h1>
      <PlayerCardsBlock>
        {userDeck && userDeck.map((playerPokemon) =>
          <PlayerCard
            pokemon={playerPokemon}
            key={playerPokemon.id}
            onClick={(e) => handlePlayerCardClick(playerPokemon.id, e)}
            isChosenPlayerCard={isChosenPlayerCard(playerPokemon.id)}
            activatePlayerMove={activatePlayerMove}
          />
        )}
      </PlayerCardsBlock>
    </Container>
  );
};

const Container = styled.div`
height: 100vh;
padding: 30px;
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


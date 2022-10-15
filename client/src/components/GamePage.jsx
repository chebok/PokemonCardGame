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
  const [chosenUserCardId, setChosenUserCardId] = useState(null);
  const [isChosenCard, setIsChosenCard] = useState(false);
  // const [currentRandomDeck, setCurrentRandomDeck] = useState([]);

  const user = useSelector((store) => store.auth.user);
  const { userDeck, randomDeck } = useSelector((store) => store.deck);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDeck(user.id));
    dispatch(getRandomDeck());
  }, []);

  // useEffect(() => {
  // //   const newGameInstance = new Game(userDeck, randomDeck);
  // console.log('randomDeck', randomDeck);

  // }, [userDeck, randomDeck]);

  const handlePlayerCardClick = (cardId, e) => {
    e.preventDefault();
    console.log('clicked on ', cardId);
    // console.log('chosenUserCardId: ', chosenUserCardId);

    userDeck.filter((pokemon) => {
      if (pokemon.id === cardId) {
        setChosenUserCardId(cardId);
        console.log('chosenUserCardId: ', chosenUserCardId);

        return true;
      }

      return false;
    })
  };

  return (
    <Container>
      <RivalCardsBlock>
        {randomDeck && randomDeck.map((pokemon) =>
          <RivalCard
            pokemon={pokemon}
            key={pokemon.id}
          />
        )}
      </RivalCardsBlock>
      <h1>Fight!</h1>
      <PlayerCardsBlock>
        {userDeck && userDeck.map((pokemon) =>
          <PlayerCard
            pokemon={pokemon}
            key={pokemon.id}
            onClick={(e) => handlePlayerCardClick(pokemon.id, e)}
            isChosenCard={pokemon.id === chosenUserCardId ? true : false}
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


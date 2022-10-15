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
  const user = useSelector((store) => store.auth.user);
  const { userDeck, randomDeck } = useSelector((store) => store.deck);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDeck(user.id));
    dispatch(getRandomDeck());
  }, []);

  useEffect(() => {
    // const newGameInstance = new Game(userDeck, randomDeck);
  }, [userDeck, randomDeck]);

  return (
    <Container>
      {/* <RivalCardsBlock randomDeck={randomDeck}/> */}
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


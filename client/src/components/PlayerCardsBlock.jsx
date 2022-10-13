import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PlayerCard from './PlayerCard';
import styled from 'styled-components';
import { getDeck } from '../redux/actions/deck';

export default function PlayerCardsBlock() {
  const auth = useSelector((store) => store.auth);
  const deck = useSelector((store) => store.deck);
  const { user } = auth;
  const { userDeck } = deck;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDeck(user.id));
  }, []);

  return (
    <Container>
      {userDeck && userDeck.map((pokemon) =>
        <PlayerCard
          pokemon={pokemon}
          key={pokemon.id}
        />
      )}
    </Container>
  )
};

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 300px;
  border-color: blue;
`;

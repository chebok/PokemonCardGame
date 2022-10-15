import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RivalCard from './RivalCard';
import styled from 'styled-components';
// import { getRandomDeck } from '../redux/actions/deck';

export default function RivalCardsBlock({ randomDeck }) {
  // const deck = useSelector((store) => store.deck);
  // const { randomDeck } = deck;

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getRandomDeck());
  // }, []);

  return (
    <Container>
      {randomDeck && randomDeck.map((pokemon) =>
        <RivalCard
          pokemon={pokemon}
          key={pokemon.id}
        />
      )}
    </Container>
  )
};

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 300px;
  border-color: blue;
`;

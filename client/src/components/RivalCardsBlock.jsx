import { useSelector } from 'react-redux';
import RivalCard from './RivalCard';
import styled from 'styled-components';

export default function RivalCardsBlock() {
  const deck = useSelector((store) => store.deck);

  return (
    <Container>
      {deck.map((pokemon) =>
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

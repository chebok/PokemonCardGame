import RivalCard from './RivalCard';
import mockDeck from '../mock/mock.deck';
import styled from 'styled-components';

export default function RivalCardsBlock() {
  return (
    <Container>
      {mockDeck.map((card) =>
        <RivalCard
        sprite={card.sprite}
        name={card.name}
        health={card.health}
        speed={card.speed}
        damage={card.damage}
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

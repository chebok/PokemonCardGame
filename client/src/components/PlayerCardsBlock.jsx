import PlayerCard from './PlayerCard';
import mockDeck from '../mock/mock.deck';
import styled from 'styled-components';

export default function PlayerCardsBlock() {
  return (
    <Container>
      {mockDeck.map((card) =>
        <PlayerCard
        spriteBack={card.spriteBack}
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
  justify-content: flex-start;
  align-items: center;
  height: 300px;
  border-color: blue;
`;

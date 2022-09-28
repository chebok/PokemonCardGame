import PlayerCardsBlock from "./PlayerCardsBlock";
import RivalCardsBlock from "./RivalCardsBlock";
import styled from 'styled-components';

export default function GamePage() {
  return (
    <Container>
      <RivalCardsBlock />
      <h1>Fight!</h1>
      <PlayerCardsBlock />
    </Container>
  )
};

const Container = styled.div`
  height: 100vh;
  padding: 30px;
`;

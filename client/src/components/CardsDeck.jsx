import { Space } from 'antd';
import PokeCard from './PokeCard';
import styled from 'styled-components';

const CardsDeck = ({ mockDeck }) => (
  <CardsDeckWrapper>
    <Space size={[8, 16]} wrap>
      {mockDeck.map(pokemon =>
        <PokeCard
          image={pokemon.image}
          name={pokemon.name}
          legend={pokemon.legend}
          key={pokemon.id}
          isDeck={true}
        />
      )}
    </Space>
  </CardsDeckWrapper>
);

export default CardsDeck;

const CardsDeckWrapper = styled.div`
  padding: 15px 30px;
  background-color: #ECECEC;
`;

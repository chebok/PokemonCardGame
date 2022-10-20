import { useState, useEffect } from 'react';
import { Space } from 'antd';
import PokeCard from './PokeCard';
import PokeCardUnknown from './PokeCardUnknown';
import styled from 'styled-components';

export default function CardsCollection({ currentCollection }) {
  const [unknownPokemons, setUnknownPokemons] = useState(151);

  useEffect(() => {
    setUnknownPokemons(151 - currentCollection.length);
  }, [currentCollection]);

  return (
  <CollectionContainer>
    <h2>My collection</h2>
    <CollectionWrapper>
      <Space
        size={[8, 16]}
        wrap
        style={{
          justifyContent: 'center',
        }}>
        {currentCollection && currentCollection.map((pokemon) => (
          <PokeCard pokemon={pokemon} key={pokemon.id} />
        ))}
        {Array(unknownPokemons).fill().map(() => (
          <PokeCardUnknown />
        ))}
      </Space>
    </CollectionWrapper>
  </CollectionContainer>
 )};

const CollectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 20px;
  align-self: center;
`;

const CollectionWrapper = styled.div`
  padding: 15px 30px;
  background-color: #ECECEC;
`;

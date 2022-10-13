import { useState, useEffect } from 'react';
import { Progress } from 'antd';
import styled, { css } from 'styled-components';

export default function PlayerCard({ pokemon }) {
  const { spriteBack, name, health, speed, damage } = pokemon;
  const [percent, setPercent] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [currentHealth, setCurrentHealth] = useState(health);

  useEffect(() => {
    const increase = () => {
      let newPercent = percent;

      setTimeout(() => {
        newPercent = percent + 10;

        if (newPercent >= 100) {
          newPercent = 100;
          setIsReady(true);
        }

        setPercent(newPercent);
      }, 2000);
    };
    increase();
  }, [percent]);

  return (
    <Container>
      {isReady && (
        <PlayerCardContainer>
          <PlayerCardPokemonContainer isActive>
            <PlayerCardPokemonImgContainer>
              <img src={spriteBack} alt='pokemon' />
            </PlayerCardPokemonImgContainer>
            <p>name: {name}</p>
            <p>health: {currentHealth}</p>
            <p>speed: {speed}</p>
            <p>damage: {damage}</p>
          </PlayerCardPokemonContainer>
          <Progress percent={percent} />
        </PlayerCardContainer>
      )}
      {!isReady && (
        <PlayerCardContainer>
          <PlayerCardPokemonContainer>
            <PlayerCardPokemonImgContainer>
              <img src={spriteBack} alt='pokemon' />
            </PlayerCardPokemonImgContainer>
            <p>name: {name}</p>
            <p>health: {currentHealth}</p>
            <p>speed: {speed}</p>
            <p>damage: {damage}</p>
          </PlayerCardPokemonContainer>
          <Progress percent={percent} />
        </PlayerCardContainer>
      )}
    </Container>
  )
};

const Container = styled.div`
display: flex;
flex-direction: column;
width: 150px;
`;

const PlayerCardContainer = styled.div`
display: flex;
flex-direction: column;
padding: 5px;
`;

const PlayerCardPokemonImgContainer = styled.div`
display: flex;
justify-content: center;
`;

const PlayerCardPokemonContainer = styled.div`
display: flex;
flex-direction: column;
border: 2px solid #ccc;
background-color: #e6e6e6;

  ${props => props.isActive && css`
  background: #e8fdde;
  border: 2px solid #52c41a;
  cursor: pointer;
  `}
`;

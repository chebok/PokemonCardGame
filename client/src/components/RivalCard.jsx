import { useState, useEffect } from 'react';
import { Progress } from 'antd';
import styled, { css } from 'styled-components';

export default function RivalCard({ sprite, name, health, speed, damage }) {
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
        <RivalCardContainer>
        <RivalCardPokemonContainer isActive>
          <RivalCardPokemonImgContainer>
            <img src={sprite} alt='pokemon' />
          </RivalCardPokemonImgContainer>
          <p>name: {name}</p>
          <p>health: {currentHealth}</p>
          <p>speed: {speed}</p>
          <p>damage: {damage}</p>
        </RivalCardPokemonContainer>
        <Progress percent={percent} />
      </RivalCardContainer>
      )}
      {!isReady && (
        <RivalCardContainer>
        <RivalCardPokemonContainer>
          <RivalCardPokemonImgContainer>
            <img src={sprite} alt='pokemon' />
          </RivalCardPokemonImgContainer>
          <p>name: {name}</p>
          <p>health: {currentHealth}</p>
          <p>speed: {speed}</p>
          <p>damage: {damage}</p>
        </RivalCardPokemonContainer>
        <Progress percent={percent} />
      </RivalCardContainer>
      )}
    </Container>
  )
};

const Container = styled.div`
display: flex;
flex-direction: column;
width: 150px;
`;

const RivalCardContainer = styled.div`
display: flex;
flex-direction: column;
padding: 5px;
`;

const RivalCardPokemonImgContainer = styled.div`
display: flex;
justify-content: center;
`;

const RivalCardPokemonContainer = styled.div`
display: flex;
flex-direction: column;
border: 2px solid #1a2dc4;
background-color: #def0fd;

  ${props => props.isActive && css`
  border: 2px solid #52c41a;
  `}
`;

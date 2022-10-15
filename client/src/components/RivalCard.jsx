import { useState, useEffect } from 'react';
import { Progress } from 'antd';
import styled, { css } from 'styled-components';

export default function RivalCard({ pokemon, isChosenRivalCard, onClick }) {
  const { sprite, name, health, speed, damage, id } = pokemon;
  const [percent, setPercent] = useState(0);
  const [isReadyToMove, setIsReadyToMove] = useState(false);
  const [currentHealth, setCurrentHealth] = useState(health);

  useEffect(() => {
    const increase = () => {
      let newPercent = percent;

      setTimeout(() => {
        newPercent = percent + 10;
        if (newPercent >= 100) {
          newPercent = 100;
          setIsReadyToMove(true);
        }

        setPercent(newPercent);
      }, 2000);
    };
    increase();
  }, [percent]);

  return (
    <Container>
      <RivalCardContainer>
        <RivalCardPokemonContainer
          pokemonId={id}
          isReadyToMove={isReadyToMove}
          isChosenCard={isChosenRivalCard}
          onClick={onClick}
        >
          <RivalCardPokemonImgContainer>
            <img src={sprite} alt='rivalPokemonSprite' />
          </RivalCardPokemonImgContainer>
          <RivalCardPokemonStatsContainer>
            <p>name: {name}</p>
            <p>health: {currentHealth}</p>
            <p>speed: {speed}</p>
            <p>damage: {damage}</p>
          </RivalCardPokemonStatsContainer>
        </RivalCardPokemonContainer>
        <Progress percent={percent} />
      </RivalCardContainer>
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

const RivalCardPokemonStatsContainer = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0 10px;
`;

const RivalCardPokemonContainer = styled.div`
display: flex;
flex-direction: column;
border: 2px solid #ccc;
background-color: #e6e6e6;
min-height: 230px;
justify-content: flex-end;

  ${props => props.isReadyToMove && css`
  border: 2px solid #1a2dc4;
  background-color: #def0fd;
  `}
  ${props => props.isChosenCard && css`
  border: 2px solid red;
  background-color: #ffd6d6;
  `}
`;

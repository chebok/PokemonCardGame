import { useState, useEffect } from 'react';
import { Progress } from 'antd';
import styled, { css } from 'styled-components';

export default function PlayerCard(props) {
  const { pokemon, isChosenPlayerCard, onClick, isCardReadyToMove, hasCurrentAttackFinished, hasAttackFinished } = props;
  const { spriteBack, name, health, speed, damage, id } = pokemon;
  const [percent, setPercent] = useState(0);
  const [isReadyToMove, setIsReadyToMove] = useState(false);
  // const [isCurrentlyChosenCard, setIsCurrentlyChosenCard] = useState(isChosenPlayerCard);
  const [currentHealth, setCurrentHealth] = useState(health);
  const [isAlive, setIsAlive] = useState(true);

  useEffect(() => {
    if (isReadyToMove) {
      isCardReadyToMove(true);
    }
    else {
      isCardReadyToMove(false);
    }
  }, [isReadyToMove, isCardReadyToMove]);

  // useEffect(() => {
  //   if (!isReadyToMove) {
  //     hasCurrentAttackFinished(true);
  //     setPercent(0);
  //   }
  // }, [isReadyToMove, hasCurrentAttackFinished]);

  useEffect(() => {
    console.log('hasAttackFinished in PlayerCard', hasAttackFinished);
    if (hasAttackFinished) {
      console.log('percent', percent);
      setPercent(0);
      setIsReadyToMove(false);
    }
  }, [hasAttackFinished])

  // useEffect(() => {
  //   if (!isReadyToMove) {
  //     hasCurrentAttackFinished(true);
  //     setPercent(0);
  //     console.log('percent in PlayerCard', percent);
  //   }
  //   // else {
  //   //   hasCurrentAttackFinished(false);
  //   // }
  // }, [isReadyToMove, hasCurrentAttackFinished]);

  useEffect(() => {
    const increase = () => {
      let newPercent = percent;

      setTimeout(() => {
        newPercent = percent + 50;

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
      <PlayerCardContainer>
        <PlayerCardPokemonContainer
          pokemonId={id}
          isReadyToMove={isReadyToMove}
          isChosenCard={isChosenPlayerCard}
          onClick={onClick}
        >
          <PlayerCardPokemonImgContainer>
            <img src={spriteBack} alt='pokemonSpriteBack' />
          </PlayerCardPokemonImgContainer>
          <PlayerCardPokemonStatsContainer>
            <p>name: {name}</p>
            <p>health: {currentHealth}</p>
            <p>speed: {speed}</p>
            <p>damage: {damage}</p>
          </PlayerCardPokemonStatsContainer>
        </PlayerCardPokemonContainer>
        <Progress percent={percent} />
      </PlayerCardContainer>
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

const PlayerCardPokemonStatsContainer = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0 10px;
`;

const PlayerCardPokemonContainer = styled.div`
display: flex;
flex-direction: column;
border: 2px solid #ccc;
border-radius: 12px;
background-color: #e6e6e6;
min-height: 230px;
justify-content: flex-end;

  ${props => props.isReadyToMove && css`
  background: #e8fdde;
  border: 2px solid #52c41a;
  cursor: pointer;
  `}

  ${props => props.isChosenCard && css`
  background: #f0e4f9;
  border: 2px solid #9a14f3;
  cursor: pointer;
  `}
`;

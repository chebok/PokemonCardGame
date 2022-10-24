import { useState, useEffect } from 'react';
import { Progress } from 'antd';
import styled, { css } from 'styled-components';

export default function RivalCard({
  pokemon: { sprite, name, health, speed, damage, id },
  isTargetRivalCard,
  onClick,
  currentDamage,
  // isRivalCardAlive,
}) {
  const [percent, setPercent] = useState(0);
  const [isReadyToMove, setIsReadyToMove] = useState(false);
  const [isTargetCard, setIsTargetCard] = useState(false);
  const [currentHealth, setCurrentHealth] = useState(health);
  const [isAlive, setIsAlive] = useState(true);

  useEffect(() => {
    setIsTargetCard(isTargetRivalCard);
    console.log('isTargetRivalCard in RivalCardNew', isTargetRivalCard);
    // console.log('currentHealth in Rival', currentHealth);
  }, [isTargetRivalCard]);

  // useEffect(() => {
  //   setCurrentHealth(currentHealth - currentDamage);
  //   // console.log('currentDamage in Rival', currentDamage);
  //   // console.log('currentHealth in Rival', currentHealth);
  // }, [currentDamage]);

  useEffect(() => {
    if (currentHealth <= 0) {
      setCurrentHealth(0);
      // isRivalCardAlive(false, id);
      setIsAlive(false);
    }
    setCurrentHealth(currentHealth - currentDamage);
    
    // console.log(`${name} isAlive in Rival`, isAlive);
    // console.log(`${name} currentHealth in Rival`, currentHealth);
    // console.log('isCardAlive in Rival', isCardAlive(false));
  }, [currentHealth, currentDamage]);

  useEffect(() => {
    const increase = () => {
      // setIsReadyToMove(false);
      let newPercent = percent;

      setTimeout(() => {
        newPercent = percent + 10;
        if (newPercent >= 100) {
          newPercent = 100;
          setIsReadyToMove(true);
        }
        // if (newPercent < 100) {
        //   setIsReadyToMove(false);
        // }
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
          isTargetCard={isTargetCard}
          onClick={onClick}
          isAlive={isAlive}
          isDead={!isAlive}
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
border-radius: 12px;
border: 2px solid #ccc;
background-color: #e6e6e6;
min-height: 230px;
justify-content: flex-end;
cursor: default;

  // &:active {
  // border: 2px solid red;
  // background-color: pink;
  // cursor: default;
  // }

  ${props => props.isTargetCard && css`
  border: 2px solid red;
  background-color: #ffd6d6;
  cursor: default;
  &:active {
    border: 2px solid red;
    background-color: pink;
    cursor: default;
  }
  `}

  ${props => props.isReadyToMove && css`
  border: 2px solid #1a2dc4;
  background-color: #def0fd;
  `}


  ${props => props.isDead && css`
  border: 2px solid black;
  background-color: red;
  cursor: default;
  `}
`;

import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Progress } from 'antd';
import styled, { css } from 'styled-components';

const PlayerCard = forwardRef((props, _ref) => {
  const {
    pokemon : { spriteBack, name, health, speed, damage, id },
    isPlayerActiveCard,
    onClick,
    isCardReadyToMove,
    // hasAttackFinished,
    isCurrentAttackInProgress,
  } = props;
  const [percent, setPercent] = useState(0);
  const [isReadyToMove, setIsReadyToMove] = useState(false);
  const [currentHealth, setCurrentHealth] = useState(health);
  const [isAlive, setIsAlive] = useState(true);
  // const [isCurrentlyChosenCard, setIsCurrentlyChosenCard] = useState(isChosenPlayerCard);

  useEffect(() => {
    if (isReadyToMove) {
      isCardReadyToMove(true, id);
    }
    else {
      isCardReadyToMove(false, id);
    }
  }, [isReadyToMove, isCardReadyToMove]);

  useImperativeHandle(_ref, () => ({
    getName: () => {
      return name;
    },
    getIsReadyToMove: () => {
      return isReadyToMove;
    },
  }));
  // useEffect(() => {
  //   if (!isReadyToMove) {
  //     hasCurrentAttackFinished(true);
  //     setPercent(0);
  //   }
  // }, [isReadyToMove, hasCurrentAttackFinished]);

  useEffect(() => {
    console.log('isCurrentAttackInProgress in PlayerCard', isCurrentAttackInProgress);
    if (!isCurrentAttackInProgress) {
      console.log('percent', percent);
      setPercent(0);
      setIsReadyToMove(false);
    }
  }, [isCurrentAttackInProgress]);

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
    if (!isReadyToMove) {
      const increase = () => {
        let newPercent = percent;
  
        setTimeout(() => {
          // if (newPercent < 100) setIsReadyToMove(false);
  
          newPercent = percent + 50;
  
          if (newPercent >= 100) {
            newPercent = 100;
            setIsReadyToMove(true);
          }
  
          setPercent(newPercent);
        }, (10000 * 10) / speed);
      };
      increase();
    }
  }, [percent, isReadyToMove]);

  return (
    <Container>
      <PlayerCardContainer>
        <PlayerCardPokemonContainer
          pokemonId={id}
          isReadyToMove={isReadyToMove}
          isPlayerActiveCard={isPlayerActiveCard}
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
});

export default PlayerCard;

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

  ${props => props.isPlayerActiveCard && css`
  background: #f0e4f9;
  border: 2px solid #9a14f3;
  cursor: pointer;
  `}
`;

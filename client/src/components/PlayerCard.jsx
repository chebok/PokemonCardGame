import { useState, useEffect } from 'react';
import { Progress } from 'antd';
import styled, { css } from 'styled-components';

export default function PlayerCard(props) {
  const { pokemon, isChosenPlayerCard, onClick, activatePlayerMove } = props;
  const { spriteBack, name, health, speed, damage, id } = pokemon;
  const [percent, setPercent] = useState(0);
  const [isReadyToMove, setIsReadyToMove] = useState(false);
  const [currentHealth, setCurrentHealth] = useState(health);

  useEffect(() => {
    if (isReadyToMove) {
      activatePlayerMove(true);
    }
  }, [isReadyToMove, activatePlayerMove]);

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

  // const handleClickToChooseCard = (id) => {
  //   // if (setIsChosenCard) {
  //   //   setIsChosenCard(false);
  //   // }
  //   //     setIsChosenCard(true);
  //       // console.log('chosenUserCardId: ', chosenUserCardId);
  // };

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
            <img src={spriteBack} alt='pokemonSprite' />
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

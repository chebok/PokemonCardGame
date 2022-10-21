import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RivalCard from './RivalCard';
import PlayerCard from './PlayerCard';
import styled from 'styled-components';
import { getDeck, getRandomDeck } from '../redux/actions/deck';
import ratio from '../services/game/ratio';

const findCardById = (deck, cardId) => {
  const foundCard = deck.find((card) => card.id === cardId);
  return foundCard;
};

export default function GamePage() {
  const {
    auth: { user },
    deck: { userDeck, randomDeck }
  } = useSelector((store) => store);

  const dispatch = useDispatch();

  const [playerActiveCard, setPlayerActiveCard] = useState(null);
  const [targetRivalCard, setTargetRivalCard] = useState(null);
  const [battleMessage, setBattleMessage] = useState('Wait untill your pokemons are ready to move');
  const [isPlayerReadyToMove, setIsPlayerReadyToMove] = useState(false); // ??? что проверяет этот стейт?
  const [currentDamage, setCurrentDamage] = useState(0);
  const [isTargetRivalCardAlive, setIsTargetRivalCardAlive] = useState(true);
  const [playerPreviousActiveCard, setPlayerPreviousActiveCard] = useState(null);
  // const [hasAttackFinished, setHasAttackFinished] = useState(null);

  useEffect(() => {
    dispatch(getDeck(user.id));
    dispatch(getRandomDeck());
  }, []);

  // useEffect(() => {
  //   console.log('battleMessage', battleMessage);
  // }, [battleMessage])

  // useEffect(() => {
  //   if (hasAttackFinished) {
  //     setTargetRivalCard(null);
  //   }
  // }, [hasAttackFinished]);

  // useEffect(() => {
  //   if (hasAttackStarted) {
  //     setHasAttackFinished(true);
  //   }
  // }, [hasAttackStarted]);

  const handlePlayerCardClick = (cardId, e) => {
    e.preventDefault();
    const foundPlayerCard = findCardById(userDeck, cardId);
    console.log(`clicked on ${foundPlayerCard.name}`);
    // console.log(`isPlayerCardReadyToMove clicked on ${foundPlayerCard.name}`, isPlayerCardReadyToMove);

    if (playerActiveCard) {
      setBattleMessage('Choose one of rival pokemons to attack');
    }

    if (isPlayerReadyToMove) {
      console.log('HEREEEEEeeeeeeeeeeeeeeeeeee in Game in handlePlayerCardClick');

      setBattleMessage('Choose one of rival pokemons to attack');

      setPlayerActiveCard(foundPlayerCard);

      // console.log('hasAttackStarted in Game in handlePlayerCardClick', hasAttackStarted);
      // console.log('hasAttackFinished in Game in handlePlayerCardClick', hasAttackFinished);

    }
    // else {
    //   return null;
    //   // console.log('in else in GAME in PlayerCardClick');
    //   // setHasAttackStarted(false);
    //   // console.log('hasAttackFinished in Game in else in PlayerCardClick', hasAttackFinished);
    //   // console.log('hasAttackStarted in Game in else in PlayerCardClick', hasAttackStarted);
    // }
  };

  const isPlayerActiveCard = (cardId) => {
    // console.log(`PlayerActiveCard.name in isPlayerActiveCard is ${playerActiveCard?.name}`);
    // console.log(`PlayerActiveCard.id in isPlayerActiveCard is ${playerActiveCard?.id}`);
    // console.log(`return in isPlayerActiveCard is`, cardId === playerActiveCard?.id);
    return cardId === playerActiveCard?.id ? true : false;
  };

  // const 

  const handleRivalCardClick = (rivalCardId, e) => {
    e.preventDefault();
    if (playerActiveCard && isTargetRivalCardAlive) {
      console.log('AAAAAAA HEre in handleRivalCardClick');

      const foundRivalCard = findCardById(randomDeck, rivalCardId);

      setTargetRivalCard(foundRivalCard);
      const currentAttackDamage = attack(playerActiveCard, foundRivalCard);
      console.log('currentAttackDamage', currentAttackDamage);
      setCurrentDamage(currentAttackDamage);
      // setIsPlayerCardReadyToMove(false);
      setPlayerPreviousActiveCard(playerActiveCard);
      // setPlayerActiveCard(null);
      setTargetRivalCard(null);
      
      console.log('AAAAAAA playerActiveCard in handleRivalCardClick', playerActiveCard);
      console.log('AAAAAAA targetRivalCard in handleRivalCardClick', targetRivalCard);
      // console.log('AAAAAAA isPlayerCardReadyToMove in handleRivalCardClick', isPlayerCardReadyToMove);

      // console.log('hasAttackStarted in Game in handleRivalCardClick', hasAttackStarted);
      // console.log('hasAttackFinished in Game in handleRivalCardClick', hasAttackFinished);
      // setHasCurrentAttackFinished(true);
      // setTargetRivalCard(null);
    }
    // else {
    //   // console.log('in else in RivalCardClick in Game in handleRivalCardClick');
    //   setHasAttackStarted(false);
    //   console.log('hasAttackFinished in Game in else in handleRivalCardClick', hasAttackFinished);
    //   console.log('hasAttackStarted in Game in else in handleRivalCardClick', hasAttackStarted);
    // }
  };

  const isTargetRivalCard = (rivalCardId) => {
    return rivalCardId === targetRivalCard?.id ? true : false;
  };

  // const isTargetRivalCardDead = (rivalCardId) => {
  //   if (!isTargetRivalCardAlive) {
  //     return rivalCardId === targetRivalCard?.id ? true : false;
  //   }
  //   return false;
  // }


  // дописать логику проверки какая карта может ходить
  const isThisCardReadyToMove = (isReadyToMove, cardId) => {
    const foundPlayerCard = findCardById(userDeck, cardId);
    if (isReadyToMove) {
      return foundPlayerCard.id;
    }
  };

  const isCardReadyToMove = (isReadyToMove, cardId) => {

    const foundPlayerCard = findCardById(userDeck, cardId);
    // console.log('foundPlayerCard in GAME in isPlayerCardReadyToMove', foundPlayerCard.name);
    // console.log('isReadyToMove in GAME isPlayerCardReadyToMove', isReadyToMove);
    // console.log('isPlayerCardReadyToMove in GAME isPlayerCardReadyToMove', isPlayerCardReadyToMove);
    console.log('IsPlayerReadyToMove in checker', isPlayerReadyToMove);
    
    if (isReadyToMove) {
      setIsPlayerReadyToMove(true);
      setBattleMessage('Choose one of your pokemons to move');

      // console.log('foundPlayerCard in GAME in isPlayerCardReadyToMove', foundPlayerCard.name);
      // console.log('isPlayerCardReadyToMove in GAME isPlayerCardReadyToMove', isPlayerCardReadyToMove);
    }
    // else {
    //   setIsPlayerCardReadyToMove(false);
    // }
  };

  const isCurrentAttackInProgress = (cardId) => {
    return cardId === playerPreviousActiveCard?.id ? false : true;
  };

  const isRivalCardAlive = (isRivalCardAlive, rivalCardId) => {
    const foundRivalCard = findCardById(randomDeck, rivalCardId);
    if (isRivalCardAlive) {
      setIsTargetRivalCardAlive(true);
    }
    console.log('isTargetRivalCardAlive in ISCArDALIVE', isTargetRivalCardAlive);
  };

  const attack = (activeCard, targetCard) => {
    const resultDamage = activeCard.damage * ratio(activeCard.element, targetCard.element);
    console.log(`ATTACK success! Player's ${activeCard.name} dealt ${resultDamage} damage to ${targetCard.name}`);
    setPlayerActiveCard(null);
    return resultDamage;
  }

  // const takeDamage = (attackingCard, targetCard, damage) => {
  //   const resultDamage = attackingCard.damage * ratio(attackingCard.element, targetCard.element);
  //   console.log(`${attackingCard.name} dealt ${resultDamage} to ${targetCard.name}`);
  //   return resultDamage;
  // }
  // const takeDamage = (currentHealth) => {
  //   const newHealth = currentHealth - currentDamage;
  //   return newHealth;
  //   // this.isAlive = this.health <= 0 ? false : this.isAlive;
  // };

  return (
    <Container>
      <RivalCardsBlock>
        {randomDeck && randomDeck.map((rivalPokemon) =>
          <RivalCard
            pokemon={rivalPokemon}
            key={rivalPokemon.id}
            onClick={(e) => handleRivalCardClick(rivalPokemon.id, e)}
            isTargetRivalCard={isTargetRivalCard(rivalPokemon.id)}
            currentDamage={isTargetRivalCard(rivalPokemon.id) ? currentDamage : 0}
            isRivalCardAlive={isRivalCardAlive}
          // isDead={isTargetRivalCardDead(rivalPokemon.id)}
          />
        )}
      </RivalCardsBlock>
      <h1>{battleMessage}</h1>
      <PlayerCardsBlock>
        {userDeck && userDeck.map((playerPokemon) =>
          <PlayerCard
            pokemon={playerPokemon}
            key={playerPokemon.id}
            onClick={(e) => handlePlayerCardClick(playerPokemon.id, e)}
            isPlayerActiveCard={isPlayerActiveCard(playerPokemon.id)}
            isCardReadyToMove={isCardReadyToMove}
            isCurrentAttackInProgress={isCurrentAttackInProgress(playerPokemon.id)}
            // hasAttackFinished={hasAttackFinished}
          />
        )}
      </PlayerCardsBlock>
    </Container>
  );
};

const Container = styled.div`
height: 100vh;
padding: 30px;
`;

const RivalCardsBlock = styled.div`
display: flex;
justify-content: flex-end;
align-items: center;
height: 300px;
border-color: blue;
`;

const PlayerCardsBlock = styled.div`
display: flex;
justify-content: flex-start;
align-items: center;
height: 300px;
border-color: blue;
`;

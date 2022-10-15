import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RivalCard from './RivalCard';
import PlayerCard from './PlayerCard';
// import PlayerCardsBlock from './PlayerCardsBlock';
// import RivalCardsBlock from './RivalCardsBlock';
import styled from 'styled-components';
import { getDeck } from '../redux/actions/deck';
import { getRandomDeck } from '../redux/actions/deck';
import ratio from '../services/game/ratio';


export default function GamePage() {
  const [chosenPlayerCard, setChosenPlayerCard] = useState(null);
  const [targetRivalCard, setTargetRivalCard] = useState(null);
  const [hasPlayerChosenCard, setHasPlayerChosenCard] = useState(false);
  const [canPlayerCardMove, setCanPlayerCardMove] = useState(false);
  const [currentDamage, setCurrentDamage] = useState(0);
  const [isTargetRivalCardAlive, setIsTargetRivalCardAlive] = useState(true);
  const [hasAttackStarted, setHasAttackStarted] = useState(false);
  const [hasAttackFinished, setHasAttackFinished] = useState(true);
  const [battleMessage, setBattleMessage] = useState('Wait untill your pokemons are ready to move');

  const user = useSelector((store) => store.auth.user);
  const { userDeck, randomDeck } = useSelector((store) => store.deck);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDeck(user.id));
    dispatch(getRandomDeck());
  }, []);

  // useEffect(() => {
  //   console.log('battleMessage', battleMessage);
  // }, [battleMessage])

  useEffect(() => {
    if (hasAttackFinished) {
      setTargetRivalCard(null);
    }
  }, [hasAttackFinished]);

  useEffect(() => {
    if (hasAttackStarted) {
      setHasAttackFinished(true);
    }
  }, [hasAttackStarted]);

  const findCardById = (deck, cardId) => {
    const foundCard = deck.find((card) => card.id === cardId);
    return foundCard;
  };

  const handlePlayerCardClick = (cardId, e) => {
    e.preventDefault();
    if (canPlayerCardMove && hasAttackFinished) {
      console.log('HEREEEEEeeeeeeeeeeeeeeeeeee in Game in handlePlayerCardClick');

      setBattleMessage('Choose one of rival pokemons to attack');

      const foundPlayerCard = findCardById(userDeck, cardId);
      setHasPlayerChosenCard(true);
      setChosenPlayerCard(foundPlayerCard);
      setHasAttackStarted(true);
      // setHasAttackFinished(false);
      // setChosenPlayerCardId(foundPlayerCard.id);
      console.log('hasAttackStarted in Game in handlePlayerCardClick', hasAttackStarted);
      console.log('hasAttackFinished in Game in handlePlayerCardClick', hasAttackFinished);

    }
    // else {
    //   // console.log('in else in GAME in PlayerCardClick');
    //   setHasAttackStarted(false);
    //   console.log('hasAttackFinished in Game in else in PlayerCardClick', hasAttackFinished);
    //   console.log('hasAttackStarted in Game in else in PlayerCardClick', hasAttackStarted);
    // }
  };

  const isChosenPlayerCard = (cardId) => {
    return cardId === chosenPlayerCard?.id ? true : false;
  };

  const handleRivalCardClick = (rivalCardId, e) => {
    e.preventDefault();
    if (hasPlayerChosenCard && isTargetRivalCardAlive) {

      const foundRivalCard = findCardById(randomDeck, rivalCardId);

      setTargetRivalCard(foundRivalCard);
      const currentAttackDamage = attack(chosenPlayerCard, foundRivalCard);
      console.log('currentAttackDamage', currentAttackDamage);
      setCurrentDamage(currentAttackDamage);
      setCanPlayerCardMove(false);
      setChosenPlayerCard(null);
      setHasPlayerChosenCard(false);
      // setHasAttackStarted(false);

      // setTargetRivalCard(null);
      setHasAttackFinished(true);
      console.log('hasAttackStarted in Game in handleRivalCardClick', hasAttackStarted);
      console.log('hasAttackFinished in Game in handleRivalCardClick', hasAttackFinished);

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

  const isCardReadyToMove = (isReadyToMove) => {
    if (isReadyToMove) {
      setCanPlayerCardMove(true);
      setBattleMessage('Choose one of your pokemons to move');
      console.log('canPlayerCardMove in GAME isCardReadyToMove', canPlayerCardMove);
    }
  };

  // const hasCurrentAttackFinished = (isFinished) => {
  //   if (isFinished) {
  //     console.log('canPlayerCardMove in GAME hasCurrentAttackFinished', canPlayerCardMove);
  //     // console.log('hasCurrentAttackFinished in GAME hasCurrentAttackFinished', hasCurrentAttackFinished);
  //     setCanPlayerCardMove(false);
  //     console.log('canPlayerCardMove in GAME hasCurrentAttackFinished', canPlayerCardMove);
  //   } else {
  //     setCanPlayerCardMove(true);
  //   }
  // };

  const isCardAlive = (isAlive) => {
    if (isAlive) {
      setIsTargetRivalCardAlive(true);
    }
    console.log('isTargetRivalCardAlive in ISCArDALIVE', isTargetRivalCardAlive);
  };

  const attack = (attackingCard, targetCard) => {
    const resultDamage = attackingCard.damage * ratio(attackingCard.element, targetCard.element);
    console.log(`${attackingCard.name} dealt ${resultDamage} to ${targetCard.name}`);
    setChosenPlayerCard(null);
    return resultDamage;
  }

  // const takeDamage = (attackingCard, targetCard, damage) => {
  //   const resultDamage = attackingCard.damage * ratio(attackingCard.element, targetCard.element);
  //   console.log(`${attackingCard.name} dealt ${resultDamage} to ${targetCard.name}`);
  //   setChosenPlayerCard(null);
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
            isTargetRivalCard={isTargetRivalCard(rivalPokemon.id) ? isTargetRivalCard(rivalPokemon.id) : false}
            currentDamage={isTargetRivalCard(rivalPokemon.id) ? currentDamage : 0}
            isCardAlive={isCardAlive}
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
            isChosenPlayerCard={isChosenPlayerCard(playerPokemon.id) ? isChosenPlayerCard(playerPokemon.id) : false}
            isCardReadyToMove={isCardReadyToMove}
            // hasCurrentAttackFinished={hasCurrentAttackFinished}
            hasAttackFinished={isChosenPlayerCard(playerPokemon.id) ? hasAttackFinished : false}
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


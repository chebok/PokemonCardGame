import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Modal, Space } from 'antd';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import styled from 'styled-components';

import { getCollection } from '../redux/actions/collection';
import { getDeck } from '../redux/actions/deck';

import PokeCard from './PokeCard';
import CardsCollection from './CardsCollection';

export default function ProfilePage() {
  const auth = useSelector((store) => store.auth);
  const collection = useSelector((store) => store.collection);
  const deck = useSelector((store) => store.deck);
  const { user } = auth;
  const { userDeck } = deck;

  const [currentCollection, setCurrentCollection] = useState(collection);
  const [currentDeck, setCurrentDeck] = useState(userDeck);
  const [isDeckBeingEdited, setIsDeckBeingEdited] = useState(false);
  // const parentRef = useRef();
  // const [parent] = useAutoAnimate();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth.isLoggedIn) {
      navigate('/login');
    }
  }, [auth, navigate]);

  useEffect(() => {
    dispatch(getCollection(user.id));
    dispatch(getDeck(user.id));
  }, [user, dispatch]);

  useEffect(() => {
    setCurrentCollection(collection);
    setCurrentDeck(userDeck);
  }, [userDeck, collection, dispatch, navigate]);

  // useEffect(() => {
  //   if (parentRef.current) {
  //     autoAnimate(parentRef.current);
  //   }
  // }, [parentRef]);

  const removeFromDeck = (item) => {
    currentDeck.filter((pokemon) => {
      if (pokemon === item) {
        console.log(currentDeck);
        return false;
      }
      console.log(currentDeck);
      return true;
    })
  }

  const handleDeckEditing = () => {
    setIsDeckBeingEdited(true);
  };

  const handleNewGameClick = () => {
    navigate('/game');
  };

  return (
    <ProfilePageContainer>
      <header className='profileHeader'>
        <h3>
          <strong>Welcome, {user?.username}!</strong>
        </h3>
      </header>
      <Button type="primary" onClick={handleNewGameClick}>New game</Button>
      <DeckContainer>
        <h2>My deck</h2>
        <DeckWrapper>
          <Space
            size={[8, 16]}
            wrap
          // ref={parent}
          >
            {currentDeck && currentDeck.map((pokemon) => (
              <PokeCard pokemon={pokemon} key={pokemon.id} onClick={removeFromDeck} />
            ))}
          </Space>
        </DeckWrapper>
        {/* <Button onClick={handleDeckEditing}>Edit deck</Button> */}
      </DeckContainer>
      <CardsCollection
        currentCollection={currentCollection}
      />
    </ProfilePageContainer>
  )
};

const ProfilePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 20px;
`;

const DeckContainer = styled.div`
  padding: 10px 20px;
  align-self: center;
`;

const DeckWrapper = styled.div`
  padding: 15px 30px;
  background-color: #ECECEC;
  margin-bottom: 20px;
`;

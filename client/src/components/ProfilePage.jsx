import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Modal, Space } from 'antd';
import styled from 'styled-components';
import { useAutoAnimate } from '@formkit/auto-animate/react';

import CardsCollection from './CardsCollection';
import CardsDeck from './CardsDeck';
import PokeCard from './PokeCard';

import mockPokemons from '../mock/mock.pokemons';
import mockDeck from '../mock/mock.deck';
import { getCollection } from '../redux/actions/collection';

export default function ProfilePage() {
  const auth = useSelector((store) => store.auth);
  const collection = useSelector((store) => store.collection);
  
  const [currentDeck, setCurrentDeck] = useState({});
  const [currentCollection, setCurrentCollection] = useState(collection);
  const [isDeckBeingEdited, setIsDeckBeingEdited] = useState(false);
  // const parentRef = useRef();
  const [parent] = useAutoAnimate();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = auth;

  // let currentDeck = mockDeck;
  // let currentCollection = mockPokemons;

  useEffect(() => {
    dispatch(getCollection(user.id))
    setCurrentCollection(collection);
  }, []);

  useEffect(() => {
    if (!auth.isLoggedIn) {
      navigate('/login');
    }
    dispatch(getCollection(user.id));
    setCurrentCollection(collection);
  }, [auth, user, collection, navigate, dispatch]);

  // useEffect(() => {
  //   dispatch(getCollection(user.id));
  //   // console.log(collection);
  //   // setCurrentCollection(collection);
  //   // setCurrentDeck(collection);
  // }, [user, dispatch]);

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
  }

  return (
    <ProfilePageContainer>
      <header className='profileHeader'>
        <h3>
          <strong>Welcome, {user?.username}!</strong>
        </h3>
      </header>
      <СardsDeckContainer>
        <h2>My deck</h2>
        <CardsDeckWrapper>
          <Space size={[8, 16]} wrap ref={parent}>
            {currentCollection.map((pokemon) => (
              <PokeCard pokemon={pokemon} key={pokemon.id} onClick={removeFromDeck} />
            )
            )}
          </Space>
        </CardsDeckWrapper>
        {/* <CardsDeck ref={parent}
          mockDeck={currentDeck}
        /> */}
        <Button onClick={handleDeckEditing}>Edit deck</Button>
      </СardsDeckContainer>
      <div className='cardsCollection'>
        <h2>My collection</h2>
        <Space size={[8, 16]} wrap>
          {currentCollection.map(pokemon =>
            <PokeCard pokemon={pokemon} key={pokemon.id} />
          )}
        </Space>
        {/* <CardsCollection
          mockPokemons={currentCollection}
        /> */}
      </div>
    </ProfilePageContainer>
  )
};

const ProfilePageContainer = styled.div`
  display: flex,
  flexDirection: column,
  alignItems: flex-start,
  padding: 10px 20px,
`;

const СardsDeckContainer = styled.div`
  display: flex,
  flexDirection: column,
  alignItems: center,
  padding: 10px 20px,
  align-self: center,
`;

const CardsDeckWrapper = styled.div`
  padding: 15px 30px;
  background-color: #ECECEC;
`;

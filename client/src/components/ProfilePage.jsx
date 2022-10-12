import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from 'antd';
import styled from 'styled-components';

import CardsCollection from './CardsCollection';
import CardsDeck from './CardsDeck';

import mockPokemons from '../mock/mock.pokemons';
import mockDeck from '../mock/mock.deck';

export default function ProfilePage() {
  const [isDeckBeingEdited, setIsDeckBeingEdited] = useState(false);
  const navigate = useNavigate();
  const auth = useSelector((store) => store.auth);
  const { user } = auth;

  let currentDeck = mockDeck;
  let currentColletion = mockPokemons;

  useEffect(() => {
    if (!auth.isLoggedIn) {
      navigate('/login');
    }
  }, [auth, navigate]);

  const removeFromDeck = (item) => {
    currentDeck = currentDeck.filter((pokemon) => {
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
    <ProfileContainer>
      <header className='profileHeader'>
        <h3>
          <strong>Welcome, {user?.username}!</strong>
        </h3>
      </header>
      <div className='cardsDeck'
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '10px 20px',
          alignSelf: 'center',
        }}
      >
        <h2>My deck</h2>
        <CardsDeck
          mockDeck={mockDeck}
        />
        <Button onClick={handleDeckEditing}>Edit deck</Button>
      </div>
      <div className='cardsCollection'>
        <h2>My collection</h2>
        <CardsCollection
          mockPokemons={mockPokemons}
        />
      </div>
    </ProfileContainer>
  )
};

const ProfileContainer = styled.div`
  display: flex,
  flexDirection: column,
  alignItems: flex-start,
  padding: 10px 20px,
`;

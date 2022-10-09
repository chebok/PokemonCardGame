import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from 'antd';

import CardsCollection from './CardsCollection';
import CardsDeck from './CardsDeck';

import mockPokemons from '../mock/mock.pokemons';
import mockDeck from '../mock/mock.deck';

export default function ProfilePage() {
  const navigate = useNavigate();
  const auth = useSelector((store) => store.auth);
  const { user } = auth;

  useEffect(() => {
    if (!auth.isLoggedIn) {
      navigate('/login');
    }
  }, [auth, navigate]);

  return (
    <div
      className='profileContainer'
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '10px 20px',
      }}
    >
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
        <Button>Edit deck</Button>
      </div>
      <div className='cardsCollection'>
        <h2>My collection</h2>
        <CardsCollection
          mockPokemons={mockPokemons}
        />
      </div>
    </div>
  )
};

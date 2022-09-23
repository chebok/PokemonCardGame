import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardsCollection from './CardsCollection';

export default function Profile() {
  const auth = useSelector((store) => store.auth);

  const navigate = useNavigate();

  const { user } = auth;
  console.log('auth in profile', auth);
  console.log('user in profile', user);

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
          <strong>{user?.username}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Token:</strong> {user?.accessToken.substring(0, 20)} ...{' '}
        {user?.accessToken.substr(user?.accessToken.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {user?.id}
      </p>
      <strong>Roles:</strong>
      <ul>
        {user?.roles &&
          user?.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>
      <CardsCollection />
    </div>
  )
};

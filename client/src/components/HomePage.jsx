import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import styled from 'styled-components';

import UserService from '../services/user.service';

export default function HomePage() {
  const [content, setContent] = useState('');
  const auth = useSelector((store) => store.auth);
  const { user } = auth;
  const navigate = useNavigate();

  useEffect(() => {
    UserService.getPublicContent().then(
      response => {
        setContent(response.data)
      },
      error => {
        setContent(
          (error.response && error.response.data) ||
          error.message ||
          error.toString()
        )
      });
  }, []);

  const handleNewGameClick = () => {
    navigate('/game');
  };

  return (
    <HomePageContainer>
      <header className="homeHeader">
        <h3>{content.message}</h3>
      </header>
      {user &&
        <>
          <p>Want a challenge, {user.username}?</p>
          <Button type="primary" onClick={handleNewGameClick}>New game</Button>
        </>
      }
    </HomePageContainer>
  );
};

const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 20px;
`;

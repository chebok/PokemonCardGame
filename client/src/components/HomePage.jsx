import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

import UserService from "../services/user.service";

export default function HomePage() {
  const [content, setContent] = useState('');
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
    <div className="homeContainer">
        <header className="homeHeader">
          <h3>{content.message}</h3>
        </header>
        <Button type="primary" onClick={handleNewGameClick}>New game</Button>
      </div>
  );
};

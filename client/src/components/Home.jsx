import React, { useState, useEffect } from 'react';
import UserService from "../services/user.service";

export default function Home() {
  const [content, setContent] = useState('');

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

  return (
    <div className="homeContainer">
        <header className="homeHeader">
          <h3>{content.message}</h3>
        </header>
      </div>
  );
};

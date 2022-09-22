import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import Home from './components/Home';
import Profile from './components/Profile';
import Login from './components/Login';
import Register from './components/Register';

import './App.css';

function App() {
  return (
    <div className="App">
      {/* <Routes>
        <Route path='/' element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route>
            <Route path='profile' element={<Profile />} />
            <Route path='register' element={<Register />} />
            <Route path='login' element={<Login />} />
          </Route>
        </Route>
      </Routes> */}
      <Routes>
        <Route path='/' element={<AppLayout />}>
          <Route index element={<Home />} />

          {/* Private Route */}
          <Route>
            <Route path='profile' element={<Profile />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
          </Route>
        </Route>
        <Route path='register' element={<Register />} />
        <Route path='login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;

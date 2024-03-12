import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import List from './pages/list';
import Notes from './pages/notes';
import Login from './pages/login';
import Register from './pages/register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={List}></Route>
        <Route path='/notes/:id' Component={Notes}></Route>
        <Route path='/login' Component={Login}></Route>
        <Route path='/register' Component={Register}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

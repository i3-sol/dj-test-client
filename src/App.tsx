import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import List from './components/list';
import Notes from './components/notes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={List}></Route>
        <Route path='/notes/:id' Component={Notes}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

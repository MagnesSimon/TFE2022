import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Famille from './pages/Famille';
import Home from './pages/Home';
import ListePieces from './pages/ListePieces';

const App = () => {
  return (
    /*
    Browser router va permettre le routage des différentes pages du site.
    En fonction du path indiqué dans l'url, l'application nous affichera une certaine page.
    Si le path est inexistant, l'application renvoie vers Home.
    */
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/listepieces' element={<ListePieces />} />
        <Route path='/familles' element={<Famille />} />
        <Route path='*' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
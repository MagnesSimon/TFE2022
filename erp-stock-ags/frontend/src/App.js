import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Famille from './pages/Famille';
import Home from './pages/Home';
import ListePieces from './pages/ListePieces';
import TestPage from './pages/TestPage';

const App = () => {
  return (
    /*
    Browser router va permettre le routage des différentes pages du site.
    En fonction du path indiqué dans l'url, l'application nous affichera une certaine page.
    Si le path est inexistant, l'application renvoie vers Home.
    */
    <BrowserRouter>
      <Routes>
        {/* Les routes permettent de définir la page que l'on affiche en fonction de son url */}
        <Route path='/' element={<Home />} />
        <Route path='/listepieces' element={<ListePieces />} />
        <Route path='/familles' element={<Famille />} />
        <Route path='/testzone' element={<TestPage />} />
        <Route path='*' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
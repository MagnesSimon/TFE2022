import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Famille from './pages/Famille.pages';
import Home from './pages/Home.pages';
import ListePieces from './pages/ListePieces.pages';
import TestPage from './pages/TestPage.pages';
import Penuire from './pages/Penurie.pages';
import NouvellePiece from './pages/NouvellePiece.pages';
import Finition from './pages/Finition.pages';
import FicheTechnique from './pages/FicheTechnique.pages';
import Categorie from './pages/Categorie.pages';
import Fournisseur from './pages/Fournisseur.pages';

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
        <Route path='/penurie' element={<Penuire />} />
        <Route path='/testzone' element={<TestPage />} />
        <Route path='/nouvellePiece' element={<NouvellePiece />} />
        <Route path='/finitions' element={<Finition />} />
        <Route path='/ficheTechnique' element={<FicheTechnique />} />
        <Route path='/categorie' element={<Categorie />} />
        <Route path='/fournisseur' element={<Fournisseur />} />
        <Route path='*' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
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
import NouvelleFinition from './pages/NouvelleFinition.pages';
import NouvelleCategorie from './pages/NouvelleCategorie.pages';
import NouveauFournisseur from './pages/NouveauFournisseur.pages';
import NouvelleFamille from './pages/NouvelleFamille.pages';
import Connexion from './components/connexion.components';

const App = () => {
  if (localStorage.getItem('utilisateur') == 0) {
    return
  }
  return (
    // Condition pour voir si on est connecté
    // if (localStorage.getItem('utilisateur') == 0){

    // }
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
        <Route path='/nouvelleFinition' element={<NouvelleFinition />} />
        <Route path='/nouvelleCategorie' element={<NouvelleCategorie />} />
        <Route path='/nouveauFournisseur' element={<NouveauFournisseur />} />
        <Route path='/nouvelleFamille' element={<NouvelleFamille />} />
        <Route path='/connexion' element={<Connexion />} />
        <Route path='*' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
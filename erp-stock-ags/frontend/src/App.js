import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Famille from './pages/Famille.pages';
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
import Profil from './pages/Profil.pages';
import Utilisateur from './pages/Utilisateur.pages';
import Historique from './pages/Historique.pages';
import NouvelUtilisateur from './pages/NouvelUtilisateur.pages';

const App = () => {
  if (localStorage.getItem('profil') == '1') {
    return (
      // Si le profil connecté est ADMIN
      // Browser router va permettre le routage des différentes pages du site.
      // En fonction du path indiqué dans l'url, l'application nous affichera une certaine page.
      // Si le path est inexistant, l'application renvoie vers Home.
      <BrowserRouter>
        <Routes>
          {/* Les routes permettent de définir la page que l'on affiche en fonction de son url */}
          <Route path='/' element={<ListePieces />} />
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
          <Route path='/utilisateur' element={<Utilisateur />} />
          <Route path='/nouvelUtilisateur' element={<NouvelUtilisateur />} />
          <Route path='/profil' element={<Profil />} />
          <Route path='/historique' element={<Historique />} />
          <Route path='/connexion' element={<Connexion />} />
          <Route path='*' element={<ListePieces />} />
        </Routes>
      </BrowserRouter>
    );
  }
  if (localStorage.getItem('profil') == '2') {
    return (
      // Si le profil connecté est EMPLOYE
      // Browser router va permettre le routage des différentes pages du site.
      // En fonction du path indiqué dans l'url, l'application nous affichera une certaine page.
      // Si le path est inexistant, l'application renvoie vers Home.
      <BrowserRouter>
        <Routes>
          {/* Les routes permettent de définir la page que l'on affiche en fonction de son url */}
          <Route path='/' element={<ListePieces />} />
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
          <Route path='/historique' element={<Historique />} />
          <Route path='/connexion' element={<Connexion />} />
          <Route path='*' element={<ListePieces />} />
        </Routes>
      </BrowserRouter>
    );
  }
  if (localStorage.getItem('profil') == '3') {
    return (
      // Si le profil connecté est ETUDIANT
      // Browser router va permettre le routage des différentes pages du site.
      // En fonction du path indiqué dans l'url, l'application nous affichera une certaine page.
      // Si le path est inexistant, l'application renvoie vers Home.
      <BrowserRouter>
        <Routes>
          {/* Les routes permettent de définir la page que l'on affiche en fonction de son url */}
          <Route path='/' element={<ListePieces />} />
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
          <Route path='/historique' element={<Historique />} />
          <Route path='/connexion' element={<Connexion />} />
          <Route path='*' element={<ListePieces />} />
        </Routes>
      </BrowserRouter>
    );
  }
  if (localStorage.getItem('profil') == '4') {
    return (
      // Si le profil connecté est OUVRIER
      // Browser router va permettre le routage des différentes pages du site.
      // En fonction du path indiqué dans l'url, l'application nous affichera une certaine page.
      // Si le path est inexistant, l'application renvoie vers Home.
      <BrowserRouter>
        <Routes>
          {/* Les routes permettent de définir la page que l'on affiche en fonction de son url */}
          <Route path='/' element={<ListePieces />} />
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
          <Route path='*' element={<ListePieces />} />
        </Routes>
      </BrowserRouter>
    );
  }
  else {
    return (
      // Si le profil connecté est NULL
      // Browser router va permettre le routage des différentes pages du site.
      // En fonction du path indiqué dans l'url, l'application nous affichera une certaine page.
      // Si le path est inexistant, l'application renvoie vers Home.
      <BrowserRouter>
        <Routes>
          {/* Les routes permettent de définir la page que l'on affiche en fonction de son url */}
          <Route path='/' element={<Connexion />} />
          <Route path='/listepieces' element={<Connexion />} />
          <Route path='/familles' element={<Connexion />} />
          <Route path='/penurie' element={<Connexion />} />
          <Route path='/testzone' element={<Connexion />} />
          <Route path='/nouvellePiece' element={<Connexion />} />
          <Route path='/finitions' element={<Connexion />} />
          <Route path='/ficheTechnique' element={<Connexion />} />
          <Route path='/categorie' element={<Connexion />} />
          <Route path='/fournisseur' element={<Connexion />} />
          <Route path='/nouvelleFinition' element={<Connexion />} />
          <Route path='/nouvelleCategorie' element={<Connexion />} />
          <Route path='/nouveauFournisseur' element={<Connexion />} />
          <Route path='/nouvelleFamille' element={<Connexion />} />
          <Route path='/utilisateur' element={<Connexion />} />
          <Route path='/nouvelUtilisateur' element={<Connexion />} />
          <Route path='/profil' element={<Connexion />} />
          <Route path='/historique' element={<Connexion />} />
          <Route path='/connexion' element={<Connexion />} />
          <Route path='*' element={<Connexion />} />
        </Routes>
      </BrowserRouter>
    );
  };
}

export default App;
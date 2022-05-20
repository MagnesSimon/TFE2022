import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

/*
Cette fonction permet de créer une barre de navigation qui permet de naviguer entre les différentes pages
*/
const Navigation = () => {

    const [utilisateur, setUtilisateur] = useState([localStorage.getItem("utilisateur")])
    const [profil, setProfil] = useState(localStorage.getItem("profil"))

    // Déconnexion
    const resetLocalStorage = () => {
        localStorage.clear()
        window.location.reload(false);

    }

    // Si le profil est ADMIN 
    console.log("profil Co", profil)
    if (profil == '1') {
        console.log("Profil Admin");
        return (
            < div >
                {/* avec minuscule car dans le scss défini comme tel */}
                < div className="navigation" >
                    <ul>
                        {/* Page de connexion  */}
                        {/* <NavLink to="/" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                            <li>Connexion</li>
                        </NavLink> */}
                        {/* Page de la liste des pièces */}
                        <NavLink to="/listePieces" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                            <li>Pièces</li>
                        </NavLink>
                        {/* Page de la liste des pièces en pénurie */}
                        <NavLink to="/penurie" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                            <li>Pénurie</li>
                        </NavLink>
                        {/* Page de la liste des familles */}
                        <NavLink to="/familles" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                            <li>Familles</li>
                        </NavLink>
                        {/* Page de la liste des finition */}
                        <NavLink to="/finitions" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                            <li>Finitions</li>
                        </NavLink>
                        {/* Page de la liste des catégorie */}
                        <NavLink to="/categorie" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                            <li>Catégorie</li>
                        </NavLink>
                        {/* Page de la liste des fournisseurs */}
                        <NavLink to="/fournisseur" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                            <li>Fournisseur</li>
                        </NavLink>
                        {/* Page de test  */}
                        <NavLink to="/testzone" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                            <li>Zone test</li>
                        </NavLink>
                        <NavLink
                            to="/listePieces" className={(nav) => (nav.isActive ? "nav-active" : "")}
                            onClick={() => { localStorage.removeItem('profil'); window.location.reload(false); }}>
                            <li>Déconnexion</li>
                        </NavLink>
                    </ul>
                </div >
            </div >
        );
    }
    // Si le profil est EMPLOYE 
    else if (profil == '2') {
        console.log("Profil Employe");
        return (
            < div >
                {/* avec minuscule car dans le scss défini comme tel */}
                < div className="navigation" >
                    <ul>
                        {/* Page de connexion  */}
                        {/* <NavLink to="/" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                                <li>Connexion</li>
                            </NavLink> */}
                        {/* Page de la liste des pièces */}
                        <NavLink to="/listePieces" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                            <li>Pièces</li>
                        </NavLink>
                        {/* Page de la liste des pièces en pénurie */}
                        <NavLink to="/penurie" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                            <li>Pénurie</li>
                        </NavLink>
                        {/* Page de la liste des familles */}
                        <NavLink to="/familles" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                            <li>Familles</li>
                        </NavLink>
                        {/* Page de la liste des finition */}
                        <NavLink to="/finitions" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                            <li>Finitions</li>
                        </NavLink>
                        {/* Page de la liste des catégorie */}
                        <NavLink to="/categorie" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                            <li>Catégorie</li>
                        </NavLink>
                        {/* Page de la liste des fournisseurs */}
                        <NavLink to="/fournisseur" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                            <li>Fournisseur</li>
                        </NavLink>
                        <NavLink
                            to="/listePieces" className={(nav) => (nav.isActive ? "nav-active" : "")}
                            onClick={() => { localStorage.removeItem('profil'); window.location.reload(false); }}>
                            <li>Déconnexion</li>
                        </NavLink>
                    </ul>
                </div >
            </div >
        );
    }
    // Si le profil est ETUDIANT 
    else if (profil == '3') {
        console.log("Profil Etudiant");
        return (
            < div >
                {/* avec minuscule car dans le scss défini comme tel */}
                < div className="navigation" >
                    <ul>
                        {/* Page de connexion  */}
                        {/* <NavLink to="/" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                                <li>Connexion</li>
                            </NavLink> */}
                        {/* Page de la liste des pièces */}
                        <NavLink to="/listePieces" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                            <li>Pièces</li>
                        </NavLink>
                        {/* Page de la liste des pièces en pénurie */}
                        <NavLink to="/penurie" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                            <li>Pénurie</li>
                        </NavLink>
                        {/* Page de la liste des familles */}
                        <NavLink to="/familles" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                            <li>Familles</li>
                        </NavLink>
                        {/* Page de la liste des finition */}
                        <NavLink to="/finitions" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                            <li>Finitions</li>
                        </NavLink>
                        {/* Page de la liste des catégorie */}
                        <NavLink to="/categorie" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                            <li>Catégorie</li>
                        </NavLink>
                        {/* Page de la liste des fournisseurs */}
                        <NavLink to="/fournisseur" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                            <li>Fournisseur</li>
                        </NavLink>
                        <NavLink
                            to="/listePieces" className={(nav) => (nav.isActive ? "nav-active" : "")}
                            onClick={() => { localStorage.removeItem('profil'); window.location.reload(false); }}>
                            <li>Déconnexion</li>
                        </NavLink>
                    </ul>
                </div >
            </div >
        );
    }
    // Si le profil est OUVRIER 
    else if (profil == '4') {
        console.log("Profil Ouvrier");
        return (
            < div >
                {/* avec minuscule car dans le scss défini comme tel */}
                < div className="navigation" >
                    <ul>
                        {/* Page de connexion  */}
                        {/* <NavLink to="/" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                                <li>Connexion</li>
                            </NavLink> */}
                        {/* Page de la liste des pièces */}
                        <NavLink to="/listePieces" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                            <li>Pièces</li>
                        </NavLink>
                        {/* Page de la liste des pièces en pénurie */}
                        {/* <NavLink to="/penurie" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                            <li>Pénurie</li>
                        </NavLink> */}
                        {/* Page de la liste des familles */}
                        <NavLink to="/familles" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                            <li>Familles</li>
                        </NavLink>
                        {/* Page de la liste des finition */}
                        <NavLink to="/finitions" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                            <li>Finitions</li>
                        </NavLink>
                        {/* Page de la liste des catégorie */}
                        <NavLink to="/categorie" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                            <li>Catégorie</li>
                        </NavLink>
                        <NavLink
                            to="/listePieces" className={(nav) => (nav.isActive ? "nav-active" : "")}
                            onClick={() => { localStorage.removeItem('profil'); window.location.reload(false); }}>
                            <li>Déconnexion</li>
                        </NavLink>
                    </ul>
                </div >
            </div >
        );
    }
    // Si pas de profil connecté
    else if (profil === null) {
        console.log("Pas de profil connecté")
        return (
            < div >
                {/* avec minuscule car dans le scss défini comme tel */}
                < div className="navigation" >
                    <ul>
                        {/* Page de connexion TEMP  */}
                        <NavLink to="/" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                            <li>Connexion</li>
                        </NavLink>
                    </ul>
                </div>
            </div>
        )
    }
};

export default Navigation;
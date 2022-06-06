import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

/*
Cette fonction permet de créer une barre de navigation qui permet de naviguer entre les différentes pages
*/
const Navigation = () => {

    // Profil connecté
    const [profil, setProfil] = useState(localStorage.getItem("profil"))

    // Si le profil est ADMIN 
    if (profil === '1') {
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
                            <li>Catégories</li>
                        </NavLink>
                        {/* Page de la liste des fournisseurs */}
                        <NavLink to="/fournisseur" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                            <li>Fournisseurs</li>
                        </NavLink>
                        {/* Page de la liste des utilisateurs  */}
                        <NavLink to="/utilisateur" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                            <li>Utilisateurs</li>
                        </NavLink>                        {
                        /* Page de la liste des profil  */}
                        <NavLink to="/profil" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                            <li>Profils</li>
                        </NavLink>
                        {/* Page de la liste des profils  */}
                        <NavLink to="/historique" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                            <li>Historique</li>
                        </NavLink>
                        {/* Déconnexion */}
                        <NavLink
                            to="/listePieces" className={(nav) => (nav.isActive ? "" : "")}
                            onClick={() => { localStorage.removeItem('profil'); window.reload(false) }}>
                            <li>Déconnexion</li>
                        </NavLink>
                        {/* Page de test  */}
                        {/* <NavLink to="/testzone" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                            <li>Zone test</li>
                        </NavLink> */}
                    </ul>
                </div >
            </div >
        );
    }
    // Si le profil est EMPLOYE 
    else if (profil === '2') {
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
                        {/* Page de la liste des profils  */}
                        <NavLink to="/historique" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                            <li>Historique</li>
                        </NavLink>
                        <NavLink
                            to="/listePieces" className={(nav) => (nav.isActive ? "" : "")}
                            onClick={() => { localStorage.removeItem('profil'); window.reload(false) }}>
                            <li>Déconnexion</li>
                        </NavLink>
                    </ul>
                </div >
            </div >
        );
    }
    // Si le profil est ETUDIANT 
    else if (profil === '3') {
        console.log("Profil Etudiant");
        return (
            < div >
                {/* avec minuscule car dans le scss défini comme tel */}
                < div className="navigation" >
                    <ul>
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
                        {/* Page de la liste des profils  */}
                        <NavLink to="/historique" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                            <li>Historique</li>
                        </NavLink>
                        <NavLink
                            to="/listePieces" className={(nav) => (nav.isActive ? "" : "")}
                            onClick={() => { localStorage.removeItem('profil'); window.reload(false) }}>
                            <li>Déconnexion</li>
                        </NavLink>
                    </ul>
                </div >
            </div >
        );
    }
    // Si le profil est OUVRIER 
    else if (profil === '4') {
        console.log("Profil Ouvrier");
        return (
            < div >
                {/* avec minuscule car dans le scss défini comme tel */}
                < div className="navigation" >
                    <ul>
                        <NavLink to="/listePieces" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                            <li>Pièces</li>
                        </NavLink>
                        <NavLink
                            to="/listePieces" className={(nav) => (nav.isActive ? "" : "")}
                            onClick={() => { localStorage.removeItem('profil'); window.reload(false) }}>
                            <li>Déconnexion</li>
                        </NavLink>
                    </ul>
                </div >
            </div >
        );
    }
    // Si pas de profil connecté
    else {
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
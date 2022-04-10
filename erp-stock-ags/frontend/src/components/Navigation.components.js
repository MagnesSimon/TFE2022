import React from 'react';
import { NavLink } from 'react-router-dom';

/*
Cette fonction permet de créer une barre de navigation qui permet de naviguer entre les différentes pages
*/
const Navigation = () => {
    return (
        <div>
            {/* avec minuscule car dans le scss défini comme tel */}
            <div className="navigation">
                <ul>
                    {/* Page Home */}
                    <NavLink to="/" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                        <li>Home</li>
                    </NavLink>
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
                    {/* Page de test  */}
                    <NavLink to="/testzone" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                        <li>Zone test</li>
                    </NavLink>
                </ul>
            </div>
        </div>
    );
};

export default Navigation;
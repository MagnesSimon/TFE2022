import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
    return (
        <div>
            {/* avec minuscule car dans le scss défini comme tel */}
            <div className="navigation">
                <ul>
                    <NavLink to="/" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                        <li>Home</li>
                    </NavLink>
                    <NavLink to="/listePieces" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                        <li>Pièces</li>
                    </NavLink>
                    <NavLink to="/familles" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                        <li>Familles</li>
                    </NavLink>
                </ul>
            </div>
        </div>
    );
};

export default Navigation;
import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
    return (
        <div>
            <div className="Navigation">
                <ul>
                    <NavLink to="/">
                        <li>Home</li>
                    </NavLink>
                    <NavLink to="/listePieces">
                        <li>Pièces</li>
                    </NavLink>
                    <NavLink to="/familles">
                        <li>Familles</li>
                    </NavLink>
                </ul>
            </div>
        </div>
    );
};

export default Navigation;
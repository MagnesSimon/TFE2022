import React from 'react';
import Navigation from '../components/Navigation.components';
import ListeFinition from '../components/Finition.components';
import { NavLink } from 'react-router-dom';

const Finition = () => {

    return (
        <div>
            <Navigation />
            <h1>Liste des finitions existante</h1>
            <div>
                <NavLink to='/nouvelleFinition' className={(nav) => (nav.isActive ? "nav-active" : "")}>
                    <li>Ajouter une finition</li>
                </NavLink>
            </div>
            <ListeFinition />
        </div>
    );
};

export default Finition;
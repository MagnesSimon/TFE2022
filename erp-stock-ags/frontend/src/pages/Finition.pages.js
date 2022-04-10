import React from 'react';
import Navigation from '../components/Navigation.components';
import ListeFinition from '../components/Finition.components';

const Finition = () => {

    return (
        <div>
            <Navigation />
            <h1>Liste des finitions existante</h1>
            <ListeFinition />
        </div>
    );
};

export default Finition;
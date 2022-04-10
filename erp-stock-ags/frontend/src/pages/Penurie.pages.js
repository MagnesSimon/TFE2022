import React from 'react';
import Navigation from '../components/Navigation.components';
import ListePenurie from '../components/Penurie.components';

const Penurie = () => {
    return (
        <div>
            <Navigation />
            <h1>Liste des pièces en pénurie</h1>
            <ListePenurie />
        </div>
    );
};

export default Penurie;
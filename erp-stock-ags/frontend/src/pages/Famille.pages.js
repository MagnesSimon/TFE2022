import axios from 'axios';
import React from 'react';
import Navigation from '../components/Navigation.components';

const Famille = () => {

    const [famille, setFamilles] = ([])

    useEffect(() => {
        axios.get(window.url + "/listeFamilles/")
            .then((res) => setFamilles(res.data))
    }, [])

    return (
        <div>
            <Navigation />
            <h1>Futur tableau avec les familles</h1>
        </div>
    );
};

export default Famille;
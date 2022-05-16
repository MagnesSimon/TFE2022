import React from 'react';
import Navigation from '../components/Navigation.components';



const TestPage = () => {

    const resetLocalStorage = () => {
        localStorage.clear()
    }

    return (

        <div>
            <Navigation />
            <button onClick={resetLocalStorage}>RESET LOCALSTORAGE</button>
        </div>
    );
};


export default TestPage
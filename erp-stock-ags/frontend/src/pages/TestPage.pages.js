import React, { useState } from 'react';
import Navigation from '../components/Navigation.components';
import { useNavigate } from 'react-router-dom';

const TestPage = () => {
    const navigate = useNavigate();

    const [data, setData] = useState([]);

    const handleChange = (e) => {
        this.setData({ selectedValue: e.target.value })
    }

    return (

        <div>
            <Navigation />
            <div>
                <p>Choose the size of the t-shirt</p>
                <select onChange={(e) => handleChange(e)}>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                </select>
            </div>
        </div>
    );
};


export default TestPage
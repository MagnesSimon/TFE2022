import React, { useState } from 'react';
import Navigation from '../components/Navigation';

// class TestPage extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             value: ''
//         }

//     }

//     handleChange(evt) {
//         const value = (evt.target.validity.valid) ? evt.target.value : this.state.value;

//         this.setState({ value });
//     }

//     render() {
//         function Ajouter() {
//             const v = this.state.value
//             console.log(v);
//         }

//         return (
//             <div>
//                 <input type="text"
//                     pattern="[0-9]*"
//                     onInput={this.handleChange.bind(this)}
//                     value={this.state.value} />
//                 <button onClick={Ajouter}>
//                     Add
//                 </button>
//             </div>
//         )
//     }
// }

const TestPage = () => {

    const [value, setValue] = useState([])
    const Ajouter = () => {
        console.log(value);
    }

    return (

        <div>
            <Navigation />
            <input
                onChange={event => setValue(event.target.value)}
            ></input>
            <button onClick={Ajouter}>Add</button>
        </div>
    );
};

export default TestPage;
import axios from "axios";
import React from "react";
import '../../global.js'
import { Form, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavigationBarCO, NavigationBarNOCO } from "../navbar/NavigationBar";

class Connexion extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            mail: '',
            mdp: '',
            connecté: false
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        const name = e.target.name
        this.setState({
            [name]: e.target.value
        })
    }


    seConnecter = () => {
        axios.get(window.url + '/user')
            .then(res => {
                const posts = res.data.map(obj => ({ id: obj.id, nom: obj.nom, prenom: obj.prenom, mail: obj.mail, tel: obj.tel, mdp: obj.mdp, admin: obj.admin }))
                console.log(posts)
                posts.find((post) => {
                    if (this.state.mail == post.mail && this.state.mdp == post.mdp) {
                        this.state.connecté = true
                        localStorage.setItem("user", JSON.stringify(post));
                        localStorage.setItem("admin", JSON.stringify(post.admin));

                        toast("Vous êtes maintenant connecté");
                        this.props.history.push('/home')
                        window.location.reload(false);

                        console.log('user: ', localStorage.getItem('user'))
                        console.log('admin: ', localStorage.getItem('admin'))
                    }
                })
                if (this.state.connecté === false) {
                    alert("Mauvaise adresse Email/mauvais mot de passe.")
                }
            })
            .catch(error => {
                console.log(error)
            })
    }


    render() {
        return <div className={'row-wrapper'}>
            <div className="column-wrapper connexion">

                <ToastContainer />
                <h2>Se connecter</h2>
                <div id="contact-form">
                    <label htmlFor="Mail">E-mail :</label>
                    <input type="texte" id="mail" name="mail" value={this.state.mail} onChange={this.handleChange} required />
                </div>
                <div>
                    <label htmlFor="Mdp">Mot de passe :</label>
                    <input type="password" id="mdp" name="mdp" value={this.state.mdp} onChange={this.handleChange} required />
                </div>
                <div>
                    <button className='btn btn-primary' id="connection" name="connection" onClick={this.seConnecter}>Se connecter</button>
                </div>
            </div>
        </div>
    }
}

export default Connexion
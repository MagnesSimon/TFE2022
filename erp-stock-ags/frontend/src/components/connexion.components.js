import axios from "axios";
import React from "react";
import '../../global.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Connexion extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            username: '',
            mdp: '',
            connecte: false
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
        axios.get(window.url + '/listeUtilisateur')
            .then(res => {
                const posts = res.data.map(obj => ({
                    id_utilisateur: obj.id_utilisateur,
                    nom_utilisateur: obj.nom_utilisateur,
                    mot_de_passe: obj.mot_de_passe,
                    prenom_utilisateur: obj.prenom_utilisateur,
                    nom_famille_utilisateur: obj.nom_famille_utilisateur,
                    telephone_utilisateur: obj.telephone_utilisateur,
                    id_profil: obj.id_profil
                }))
                console.log(posts)
                posts.find((post) => {
                    if (this.state.username == post.username && this.state.mot_de_passe == post.mot_de_passe) {
                        this.state.connecte = true
                        localStorage.setItem("utilisateur", JSON.stringify(post));
                        //localStorage.setItem("admin", JSON.stringify(post.admin));

                        toast("Vous êtes maintenant connecté");
                        this.props.history.push('/listePieces')
                        window.location.reload(false);

                        console.log('utilisateur: ', localStorage.getItem('utilisateur'))
                        //console.log('admin: ', localStorage.getItem('admin'))
                    }
                })
                if (this.state.connecte === false) {
                    alert("Mauvaise username/mauvais mot de passe.")
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
                    <label htmlFor="username">username :</label>
                    <input type="texte" id="username" name="username" value={this.state.username} onChange={this.handleChange} required />
                </div>
                <div>
                    <label htmlFor="mot_de_passe">Mot de passe :</label>
                    <input type="password" id="mot_de_passe" name="mot_de_passe" value={this.state.mot_de_passe} onChange={this.handleChange} required />
                </div>
                <div>
                    <button className='btn btn-primary' id="connection" name="connection" onClick={this.seConnecter}>Se connecter</button>
                </div>
            </div>
        </div>
    }
}

export default Connexion
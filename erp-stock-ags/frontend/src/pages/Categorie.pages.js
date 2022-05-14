import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navigation from '../components/Navigation.components';
import { NavLink } from 'react-router-dom';


const Categorie = () => {

    const [categorie, setCategorie] = useState([])

    useEffect(() => {
        axios.get(window.url + "/listeCategories/")
            .then((res) => setCategorie(res.data))
    }, [])

    return (
        <div>
            <Navigation />
            <div>
                <NavLink to='/nouvelleCategorie' className={(nav) => (nav.isActive ? "nav-active" : "")}>
                    <li>Ajouter une catégorie</li>
                </NavLink>
            </div>
            <div>
                {/* Création du tableau des pièces */}
                <table className='tableau'>
                    <thead>
                        {/* Colonne faisant office de titre */}
                        <tr>
                            <th>Id catégorie</th>
                            <th>Nom catégorie</th>
                            <th>Pôle</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Les datas sont traitées. 
                    Chaque élément de l'objet pièce mis dans une case de la ligne
                    Une fois que l'on a traité toutes les données d'une pièce,
                    on créer une ligne pour la pièce suivante
                    */}
                        {categorie.map(({ id_categorie, nom_categorie, pole }) => (
                            <tr key={id_categorie}>
                                <td>{id_categorie}</td>
                                <td>{nom_categorie}</td>
                                <td>{pole}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <Dialog className='dialog' open={open} onClose={handleClose}>
                    <DialogTitle>
                        Fiche famille
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {ficheFinition.map(({
                                id_finition,
                                nom_finition,
                                effet_finition,
                            }) => (
                                < div >
                                    <table className='tableauFT' id={"id_finition"}>
                                        <thead>
                                            <tr>
                                                <th>                </th>
                                                <th>Valeure actuelle</th>
                                                <th>Modification</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr key={id_finitionToSend}>
                                                <td>ID</td>
                                                <td>{id_finition}</td>
                                                <td></td>
                                            </tr>
                                            <tr key={nom_finition}>
                                                <td>NOM</td>
                                                <td>{nom_finition}</td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name='nom_finition'
                                                        value={nom_finitionToSend}
                                                        onChange={(e) =>
                                                            setNom_finitionToSend((v) => (e.target.validity.valid ? e.target.value : v))
                                                        }
                                                    />
                                                </td>
                                            </tr>
                                            <tr key={effet_finition}>
                                                <td>EFFET</td>
                                                <td>{effet_finition}</td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name='effet_finition'
                                                        value={effet_finitionToSend}
                                                        onChange={(e) =>
                                                            setEffet_finitionToSend((v) => (e.target.validity.valid ? e.target.value : v))
                                                        }
                                                    />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            ))}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Fermer
                        </Button>
                        <Button onClick={sendToAPI} color="primary" autoFocus>
                            Valider
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
};

export default Categorie;
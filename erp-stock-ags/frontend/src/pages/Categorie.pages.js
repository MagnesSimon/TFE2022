import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navigation from '../components/Navigation.components';
import { NavLink } from 'react-router-dom';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';


const Categorie = () => {

    function refreshPage() {
        window.location.reload();
    }

    // Contient la liste des catégories
    const [categorie, setCategorie] = useState([])
    // Va définir l'état visible de la boite de dialogue
    const [open, setOpen] = React.useState(false);
    // Id de la famille à transmettre à la fiche famille
    const [ficheCategorie, setFicheCategorie] = useState([]);

    // Variable à envoyer vers la DB pour modification
    const [id_categorieToSend, setId_categorieToSend] = useState("")
    const [nom_categorieToSend, setNom_categorieToSend] = useState("")
    const [poleToSend, setPoleToSend] = useState("")

    // Vérification du profil
    const [peutAjouter, setPeutAjouter] = useState(localStorage.getItem("isEmploye"))

    // Fiche categorie modifiée à envoyée
    const aEnvoyer = {
        id_categorieToSend,
        nom_categorieToSend,
        poleToSend,
    }

    // Le useEffect se joue quand le composant est monté 
    // Requete pour récupérer la liste des catégorie
    useEffect(() => {
        axios.get(window.url + "/listeCategories/")
            .then((res) => setCategorie(res.data))
    }, [])

    // Fonction pour ouvrir la boîte de dialogue
    const handleClickOpen = (v) => {
        setOpen(true);
        axios.get(window.url + "/listeCategories/" + v)
            .then((res) => setFicheCategorie(res.data))
    }

    // Fonction pour fermer la boîte de dialogue
    const handleClose = () => {
        // Remise à vide des valeurs ToSend à la fermeture
        resetToSend()
        setOpen(false);
    };
    // Permet de reset les valeur des ToSend
    const resetToSend = () => {
        // Remise à vide des ToSend
        setId_categorieToSend("")
        setNom_categorieToSend("")
        setPoleToSend("")
    }

    // Pour envoyer vers la DB
    const sendToAPI = () => {
        console.log("aEnvoyer", aEnvoyer)
        // Remplir les champ laissé vide
        if (id_categorieToSend == "") {
            aEnvoyer.id_categorieToSend = ficheCategorie[0].id_categorie;
        }
        if (nom_categorieToSend == "") {
            aEnvoyer.nom_categorieToSend = ficheCategorie[0].nom_categorie;
        }
        if (poleToSend == "") {
            aEnvoyer.poleToSend = ficheCategorie[0].pole;
        }

        axios.post(window.url + "/listeCategories/updateById", aEnvoyer)
            .then(function (res) {
                console.log('Succes Modification Fiche Catégorie')
                console.log(res.data)
            })
            .catch(function (err) {
                console.log("Error: ")
                console.log(err)
            });

        refreshPage();
    }

    const suppression = (id) => {
        axios.delete(window.url + "/listeCategories/delete/" + id)
            .then(function (res) {
                console.log('Succes suppression de categorie')
                console.log(res.data)
            })
            .catch(function (err) {
                console.log("Error: ")
                console.log(err)
            });
        window.location.reload();
    }

    if (localStorage.getItem('profil') == '1') {
        return (
            <div>
                <Navigation />
                <NavLink to='/nouvelleCategorie' className={(nav) => (nav.isActive ? "nav-active" : "")}>
                    <li>Ajouter une catégorie</li>
                </NavLink>
                {/* Création du tableau des pièces */}
                <table className='tableau'>
                    <thead>
                        {/* Colonne faisant office de titre */}
                        <tr>
                            <th>Id catégorie</th>
                            <th>Nom catégorie</th>
                            <th>Pôle</th>
                            <th>Suppression</th>
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
                                <td onClick={() => handleClickOpen(id_categorie)}>{id_categorie}</td>
                                <td>{nom_categorie}</td>
                                <td>{pole}</td>
                                <td onClick={() => suppression(id_categorie)}>X</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div>
                    <Dialog className='dialog' open={open} onClose={handleClose}>
                        <DialogTitle>
                            Fiche famille
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                {ficheCategorie.map(({
                                    id_categorie,
                                    nom_categorie,
                                    pole,
                                }) => (

                                    <table className='tableauFT' id={"id_categorie"}>
                                        <thead>
                                            <tr>
                                                <th>                </th>
                                                <th>Valeure actuelle</th>
                                                <th>Modification</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>ID</td>
                                                <td>{id_categorie}</td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>NOM</td>
                                                <td>{nom_categorie}</td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name='nom_categorie'
                                                        value={nom_categorieToSend}
                                                        onChange={(e) =>
                                                            setNom_categorieToSend((v) => (e.target.validity.valid ? e.target.value : v))
                                                        }
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>POLE</td>
                                                <td>{pole}</td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name='pole'
                                                        value={poleToSend}
                                                        onChange={(e) =>
                                                            setPoleToSend((v) => (e.target.validity.valid ? e.target.value : v))
                                                        }
                                                    />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

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
    }
    else if (peutAjouter == 'true') {
        return (
            <div>
                <Navigation />
                <NavLink to='/nouvelleCategorie' className={(nav) => (nav.isActive ? "nav-active" : "")}>
                    <li>Ajouter une catégorie</li>
                </NavLink>
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
                                <td onClick={() => handleClickOpen(id_categorie)}>{id_categorie}</td>
                                <td>{nom_categorie}</td>
                                <td>{pole}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div>
                    <Dialog className='dialog' open={open} onClose={handleClose}>
                        <DialogTitle>
                            Fiche famille
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                {ficheCategorie.map(({
                                    id_categorie,
                                    nom_categorie,
                                    pole,
                                }) => (

                                    <table className='tableauFT' id={"id_categorie"}>
                                        <thead>
                                            <tr>
                                                <th>                </th>
                                                <th>Valeure actuelle</th>
                                                <th>Modification</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>ID</td>
                                                <td>{id_categorie}</td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>NOM</td>
                                                <td>{nom_categorie}</td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name='nom_categorie'
                                                        value={nom_categorieToSend}
                                                        onChange={(e) =>
                                                            setNom_categorieToSend((v) => (e.target.validity.valid ? e.target.value : v))
                                                        }
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>POLE</td>
                                                <td>{pole}</td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name='pole'
                                                        value={poleToSend}
                                                        onChange={(e) =>
                                                            setPoleToSend((v) => (e.target.validity.valid ? e.target.value : v))
                                                        }
                                                    />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

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
    } else {
        return (
            <div>
                <Navigation />
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
                                <td onClick={() => handleClickOpen(id_categorie)}>{id_categorie}</td>
                                <td>{nom_categorie}</td>
                                <td>{pole}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div>
                    <Dialog className='dialog' open={open} onClose={handleClose}>
                        <DialogTitle>
                            Fiche famille
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                {ficheCategorie.map(({
                                    id_categorie,
                                    nom_categorie,
                                    pole,
                                }) => (

                                    <table className='tableauFT' id={"id_categorie"}>
                                        <thead>
                                            <tr>
                                                <th>                </th>
                                                <th>Valeure actuelle</th>
                                                <th>Modification</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>ID</td>
                                                <td>{id_categorie}</td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>NOM</td>
                                                <td>{nom_categorie}</td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name='nom_categorie'
                                                        value={nom_categorieToSend}
                                                        onChange={(e) =>
                                                            setNom_categorieToSend((v) => (e.target.validity.valid ? e.target.value : v))
                                                        }
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>POLE</td>
                                                <td>{pole}</td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name='pole'
                                                        value={poleToSend}
                                                        onChange={(e) =>
                                                            setPoleToSend((v) => (e.target.validity.valid ? e.target.value : v))
                                                        }
                                                    />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

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
    }
};

export default Categorie;
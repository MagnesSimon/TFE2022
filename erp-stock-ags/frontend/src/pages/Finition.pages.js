import React, { useEffect, useState } from 'react';
import axios from "axios"
import '../GlobalData'
import Navigation from '../components/Navigation.components';
import { NavLink } from 'react-router-dom';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

const Finition = () => {

    function refreshPage() {
        window.location.reload();
    }

    // data contient la liste des pièces récupérée depuis la db
    const [finitions, setFinitions] = useState([])
    // Va définir l'état visible de la boite de dialogue
    const [open, setOpen] = React.useState(false);
    // Id de la famille à transmettre à la fiche famille
    const [ficheFinition, setFicheFinition] = useState([]);

    // Variable à envoyer vers la DB pour modification
    const [id_finitionToSend, setId_finitionToSend] = useState("")
    const [nom_finitionToSend, setNom_finitionToSend] = useState("")
    const [effet_finitionToSend, setEffet_finitionToSend] = useState("")

    // Vérification du profil
    const [peutAjouter, setPeutAjouter] = useState(localStorage.getItem("isEmploye"))

    // Fiche finition modifiée à envoyée
    const aEnvoyer = {
        id_finitionToSend,
        nom_finitionToSend,
        effet_finitionToSend,
    }

    // Le useEffect se joue quand le composant est monté 
    // Requete pour récupérer la liste des finitions
    useEffect(() => {
        axios.get(window.url + "/listeFinitions")
            .then((res) => setFinitions(res.data))
    }, [])

    // Fonction pour ouvrir la boîte de dialogue
    const handleClickOpen = (v) => {
        setOpen(true);
        axios.get(window.url + "/listeFinitions/" + v)
            .then((res) => setFicheFinition(res.data))
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
        setId_finitionToSend("")
        setNom_finitionToSend("")
        setEffet_finitionToSend("")
    }

    // Pour envoyer vers la DB
    const sendToAPI = () => {
        console.log("aEnvoyer", aEnvoyer)
        // Remplir les champ laissé vide
        if (id_finitionToSend == "") {
            aEnvoyer.id_finitionToSend = ficheFinition[0].id_finition;
        }
        if (nom_finitionToSend == "") {
            aEnvoyer.nom_finitionToSend = ficheFinition[0].nom_finition;
        }
        if (effet_finitionToSend == "") {
            aEnvoyer.effet_finitionToSend = ficheFinition[0].effet_finition;
        }

        axios.post(window.url + "/listeFinitions/updateById", aEnvoyer)
            .then(function (res) {
                console.log('Succes Modification Fiche Finition')
                console.log(res.data)
            })
            .catch(function (err) {
                console.log("Error: ")
                console.log(err)
            });

        refreshPage();
    }

    // Défini l'état d'ouverture de la boite de dialogue de suppression
    const [openSupp, setOpenSupp] = useState(false)
    // Variable qui stocke l'objet à supprimer
    const [toSupp, setToSupp] = useState([])
    // Ouvre la boite de dialogue de suppression
    const handleSuppOpen = (id) => {
        setOpenSupp(true);
        // Requête pour aller chercher la fiche technique
        axios.get(window.url + "/listeFinitions/" + id)
            .then((res) => setToSupp(res.data))
    }
    // Fonction pour fermer la boîte de dialogue
    const handleSuppClose = () => {
        // Remise à vide des valeurs ToSupp à la fermeture
        setOpenSupp(false);
    };
    // Fonction qui effectue la requete de suppression 
    const suppression = (id) => {
        axios.delete(window.url + "/listeFinitions/delete/" + id)
            .then(function (res) {
                console.log('Succes suppression de finition')
                console.log(res.data)
            })
            .catch(function (err) {
                console.log("Error: ")
                console.log(err)
            });
        refreshPage();
    }

    if (localStorage.getItem('profil') === '1') {
        return (
            <div>
                <Navigation />
                <h1>Liste des finitions</h1>
                <div>
                    <NavLink to='/nouvelleFinition' className={(nav) => (nav.isActive ? "nav-active" : "")}>
                        <li>Ajouter une finition</li>
                    </NavLink>
                </div>
                {/* Création du tableau des finition */}
                <table className='tableau'>
                    <thead>
                        {/* Colonne faisant office de titre */}
                        <tr>
                            <th>Id finition</th>
                            <th>Nom finition</th>
                            <th>Effet finition</th>
                            <th>Suppression</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Les datas sont traitées. 
                            Chaque élément de l'objet pièce mis dans une case de la ligne
                            Une fois que l'on a traité toutes les données d'une pièce,
                            on créer une ligne pour la pièce suivante
                            */}
                        {finitions.map(({ id_finition, nom_finition, effet_finition }) => (
                            <tr key={id_finition}>
                                <td onClick={() => handleClickOpen(id_finition)}>{id_finition}</td>
                                <td>{nom_finition}</td>
                                <td>{effet_finition}</td>
                                <td onClick={() => handleSuppOpen(id_finition)}>X</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <Dialog className='dialog' open={openSupp} onClose={handleSuppClose}>
                    <DialogTitle>
                        Fiche technique
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <p>Voulez-vous vraiment supprimer cette finition ?</p>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleSuppClose} color="primary">
                            Annuler
                        </Button>
                        <Button onClick={() => suppression(toSupp[0].id_finition)} color="primary" autoFocus>
                            Valider
                        </Button>
                    </DialogActions>
                </Dialog>

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
                                <table className='tableauFT' id={"id_finition"}>
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
                                            <td>{id_finition}</td>
                                            <td></td>
                                        </tr>
                                        <tr>
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
                                        <tr>
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

        );
    }
    if (localStorage.getItem('profil') === '2') {
        return (
            <div>
                <Navigation />
                <div>
                    <h1>Liste des finitions</h1>
                    <NavLink to='/nouvelleFinition' className={(nav) => (nav.isActive ? "nav-active" : "")}>
                        <li>Ajouter une finition</li>
                    </NavLink>
                </div>
                {/* Création du tableau des finition */}
                <table className='tableau'>
                    <thead>
                        {/* Colonne faisant office de titre */}
                        <tr>
                            <th>Id finition</th>
                            <th>Nom finition</th>
                            <th>Effet finition</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Les datas sont traitées. 
                        Chaque élément de l'objet pièce mis dans une case de la ligne
                        Une fois que l'on a traité toutes les données d'une pièce,
                        on créer une ligne pour la pièce suivante
                        */}
                        {finitions.map(({ id_finition, nom_finition, effet_finition }) => (
                            <tr key={id_finition}>
                                <td onClick={() => handleClickOpen(id_finition)}>{id_finition}</td>
                                <td>{nom_finition}</td>
                                <td>{effet_finition}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
                                <table className='tableauFT' id={"id_finition"}>
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
                                            <td>{id_finition}</td>
                                            <td></td>
                                        </tr>
                                        <tr>
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
                                        <tr>
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

        );
    } else {
        return (
            <div>
                <Navigation />
                <h1>Liste des finitions</h1>
                {/* Création du tableau des finition */}
                <table className='tableau'>
                    <thead>
                        {/* Colonne faisant office de titre */}
                        <tr>
                            <th>Id finition</th>
                            <th>Nom finition</th>
                            <th>Effet finition</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Les datas sont traitées. 
                        Chaque élément de l'objet pièce mis dans une case de la ligne
                        Une fois que l'on a traité toutes les données d'une pièce,
                        on créer une ligne pour la pièce suivante
                        */}
                        {finitions.map(({ id_finition, nom_finition, effet_finition }) => (
                            <tr key={id_finition}>
                                <td onClick={() => handleClickOpen(id_finition)}>{id_finition}</td>
                                <td>{nom_finition}</td>
                                <td>{effet_finition}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
                                <table className='tableauFT' id={"id_finition"}>
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
                                            <td>{id_finition}</td>
                                            <td></td>
                                        </tr>
                                        <tr>
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
                                        <tr>
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

        );
    }
};

export default Finition;
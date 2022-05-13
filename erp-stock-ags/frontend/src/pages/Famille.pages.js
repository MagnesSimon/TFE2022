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



const Famille = () => {

    // Va définir l'état visible de la boite de dialogue
    const [open, setOpen] = React.useState(false);
    // Variable qui reprend la liste des familles
    const [famille, setFamilles] = useState([])
    // Id de la famille à transmettre à la fiche famille
    const [id_famille, setId_famille] = useState([])

    // Fonction pour fermer la boîte de dialogue
    const handleClose = () => {
        // Remise à vide des valeurs ToSend à la fermeture
        // resetToSend()
        setOpen(false);
    };

    useEffect(() => {
        axios.get(window.url + "/listeFamilles/")
            .then((res) => setFamilles(res.data))
    }, [])

    const handleClickOpen = (id) => {
        setOpen(true);
        setId_famille(id)
    }
    const sendToAPI = () => {
        console.log("aEnvoyer")
    }
    return (
        <div>
            <Navigation />
            <div>
                <div>
                    <NavLink to='/nouvelleFamille' className={(nav) => (nav.isActive ? "nav-active" : "")}>
                        <li>Ajouter une famille</li>
                    </NavLink>
                </div>
                {/* Création du tableau des pièces */}
                <table className='tableau'>
                    <thead>
                        {/* Colonne faisant office de titre */}
                        <tr>
                            <th>Id famille</th>
                            <th>Nom famille</th>
                            <th>Matériaux</th>
                            <th>Fournisseur</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Les datas sont traitées. 
                    Chaque élément de l'objet pièce mis dans une case de la ligne
                    Une fois que l'on a traité toutes les données d'une pièce,
                    on créer une ligne pour la pièce suivante
                    */}
                        {famille.map(({ id_famille, nom_famille, materiaux, nom_fournisseur }) => (
                            <tr key={id_famille}>
                                <td onClick={() => handleClickOpen(id_famille)}>{id_famille}</td>
                                <td>{nom_famille}</td>
                                <td>{materiaux}</td>
                                <td>{nom_fournisseur}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <Dialog className='dialog' open={open} onClose={handleClose}>
                    <DialogTitle>
                        Fiche technique
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            < div >
                                <table className='tableauFT' id={"id_famille"}>
                                    <thead>
                                        <tr>
                                            <th>                </th>
                                            <th>Valeure actuelle</th>
                                            <th>Modification</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
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

export default Famille;
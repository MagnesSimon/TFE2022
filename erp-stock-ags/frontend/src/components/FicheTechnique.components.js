import React, { useEffect, useState } from 'react';
import axios from "axios"
import '../GlobalData'
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';



const FicheTechnique = (ref) => {

    // Va définir l'état visible de la boite de dialogue
    const [open, setOpen] = React.useState(false);
    // data contient la liste des pièces récupérée depuis la db
    const [data, setData] = useState([])
    // fiche technique contient la liste des fiches techniques des pièces
    const [ficheTechniques, setFicheTechnique] = useState([])
    // Variable qui vont pouvoir être envoyée pour 
    // L'adaptation de la fiche technique
    // const [referenceToSend, setReferenceToSend] = useState([])
    const [id_familleToSend, setId_familleToSend] = useState([])
    const [id_categorieToSend, setId_categorieToSend] = useState([])
    const [id_finitionToSend, setId_finitionToSend] = useState([])
    const [id_fournisseurToSend, setId_fournisseurToSend] = useState([])
    const [longueurToSend, setLongueurToSend] = useState([])
    const [largeurToSend, setLargeurToSend] = useState([])
    const [hauteurToSend, setHauteurToSend] = useState([])
    const [rayonToSend, setRayonToSend] = useState([])
    const [poidsToSend, setPoids] = useState([])

    // Variable qui vont contenir les différentes possibilité de la fiche technique
    const [choixFamille, setChoixFamille] = useState([])
    const [choixFinition, setChoixFinition] = useState([])

    // Fonctions pour récupérer la valeur des choix déroulants sélectionnés
    // et les appliquer au attributs de la pièces
    const familleHandleChange = (e) => {
        setId_familleToSend((v) => (e.target.validity.valid ? e.target.value : v))
    }
    const finitionHandleChange = (e) => {
        setId_finitionToSend((v) => (e.target.validity.valid ? e.target.value : v))
    }

    // Le useEffect se joue quand le composant est monté 
    // Requete pour récupérer la liste des pièces
    useEffect(() => {
        axios.get(window.url + "/listePieces")
            .then((res) => setData(res.data))
    }, [])

    // Requête pour récupérer la liste des familles
    useEffect(() => {
        axios.get(window.url + "/listeFamilles")
            .then((res) => setChoixFamille(res.data))
    }, [])
    // Requête pour récupérer la liste des finitions
    useEffect(() => {
        axios.get(window.url + "/listeFinitions")
            .then((res) => setChoixFinition(res.data))
    }, [])

    // Fonction pour fermer la boîte de dialogue
    const handleClose = () => {
        setOpen(false);
    };
    const handleClickOpen = (v) => {
        setOpen(true);
        // Requête pour aller chercher la fiche technique
        axios.get(window.url + "/listePieces/" + v)
            .then((res) => setFicheTechnique(res.data))
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    Fiche technique
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {ficheTechniques.map(({
                            reference,
                            id_famille,
                            nom_famille,
                            materiaux,
                            id_categorie,
                            nom_categorie,
                            pole,
                            id_fournisseur,
                            nom_fournisseur,
                            id_finition,
                            nom_finition,
                            effet_finition,
                            longueur,
                            largeur,
                            hauteur,
                            profondeur,
                            rayon }) => (
                            < div >
                                <div>
                                    <label>
                                        Référence  : {reference}
                                        {/* <input type="text"
                                            name="reference"
                                            value={reference}
                                            onChange={(e) =>
                                                setReferenceToSend((v) => (e.target.validity.valid ? e.target.value : v))
                                            } /> */}
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        Famille :
                                        <select name="choixFamille"
                                            id="selectChoixFamille"
                                            value={id_familleToSend}
                                            onChange={familleHandleChange}>
                                            {choixFamille.map(({ id_famille, nom_famille, materiaux }) => (
                                                <option value={id_famille}>{nom_famille + " - " + materiaux}</option>
                                            ))}
                                        </select>
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        Catégorie : {nom_categorie + " - " + pole}
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        Fournisseur : {nom_fournisseur}
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        Finition :
                                        <select name="choixFinition"
                                            id="selectChoixFinition"
                                            value={id_finitionToSend}
                                            onChange={familleHandleChange}>
                                            {choixFinition.map(({ id_finition, nom_finition, effet_finition }) => (
                                                <option value={id_finition}>{nom_finition + " - " + effet_finition}</option>
                                            ))}
                                        </select>
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        Longueur :
                                        <input
                                            type="text"
                                            name='longueur'
                                            pattern="[0-9]*"
                                            value={longueurToSend}
                                            onChange={(e) =>
                                                setLongueurToSend((v) => (e.target.validity.valid ? e.target.value : v))
                                            }
                                        />
                                    </label>
                                </div>
                            </div>

                        ))}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default FicheTechnique;
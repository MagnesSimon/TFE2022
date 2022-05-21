import React, { useEffect, useState } from 'react';
import Navigation from '../components/Navigation.components';
import axios from "axios"
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

const Profil = () => {

    function refreshPage() {
        window.location.reload();
    }

    // variables qui contiennent la liste des utilisateurs récupérés depuis la DB
    const [profil, setProfil] = useState([])
    // Va définir l'état visible de la boite de dialogue
    const [open, setOpen] = React.useState(false);
    // Id de la famille à transmettre à la fiche famille
    const [ficheProfil, setFicheProfil] = useState([]);

    // Variable à envoyer vers la DB pour modification
    const [id_profilToSend, setId_profilToSend] = useState("")
    const [libelle_profilToSend, setLibelle_profilToSend] = useState("")

    // Fiche finition modifiée à envoyée
    const aEnvoyer = {
        id_profilToSend,
        libelle_profilToSend,
    }

    // Le useEffect se joue quand le composant est monté 
    // Requete pour récupérer la liste des finitions
    useEffect(() => {
        axios.get(window.url + "/listeProfil")
            .then((res) => setProfil(res.data))
    }, [])

    // Fonction pour ouvrir la boîte de dialogue
    const handleClickOpen = (v) => {
        setOpen(true);
        axios.get(window.url + "/listeProfil/" + v)
            .then((res) => setFicheProfil(res.data))
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
        setLibelle_profilToSend("")
    }


    // Pour envoyer vers la DB
    const sendToAPI = () => {
        console.log("aEnvoyer", aEnvoyer)
        // Remplir les champ laissé vide
        if (id_profilToSend == "") {
            aEnvoyer.id_profilToSend = ficheProfil[0].id_profil;
        }
        if (libelle_profilToSend == "") {
            aEnvoyer.libelle_profilToSend = ficheProfil[0].libelle_profil;
        }

        axios.post(window.url + "/listeProfil/update/", aEnvoyer)
            .then(function (res) {
                console.log('Succes Modification Fiche profil')
                console.log(res.data)
            })
            .catch(function (err) {
                console.log("Error: ")
                console.log(err)
            });

        refreshPage();
    }
    return (
        <div>
            <Navigation />
            <h1>Liste des profils</h1>
            <div>
                <table className='tableau'>
                    <thead>
                        {/* Colonne faisant office de titre */}
                        <tr>
                            <th>Id profil</th>
                            <th>Libellé</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Les datas sont traitées. 
                    Chaque élément de l'objet pièce mis dans une case de la ligne
                    Une fois que l'on a traité toutes les données d'une pièce,
                    on créer une ligne pour la pièce suivante
                    */}
                        {profil.map(({ id_profil, libelle_profil }) => (
                            <tr key={id_profil}>
                                <td onClick={() => handleClickOpen(id_profil)}>{id_profil}</td>
                                <td>{libelle_profil}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Dialog className='dialog' open={open} onClose={handleClose}>
                <DialogTitle>
                    Fiche Utilisateur
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {ficheProfil.map(({
                            id_profil,
                            libelle_profil,
                        }) => (
                            <table className='tableauFT' id={"id_profil"}>
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
                                        <td>{id_profil}</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Libelle</td>
                                        <td>{libelle_profil}</td>
                                        <td>
                                            <input
                                                type="text"
                                                name='libelle '
                                                value={libelle_profilToSend}
                                                onChange={(e) =>
                                                    setLibelle_profilToSend((v) => (e.target.validity.valid ? e.target.value : v))
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
};

export default Profil;
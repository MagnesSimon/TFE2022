import React, { useEffect, useState } from 'react';
import Navigation from '../components/Navigation.components';
import axios from "axios"
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';


const Utilisateur = () => {

    function refreshPage() {
        window.location.reload();
    }

    // variables qui contiennent la liste des utilisateurs récupérés depuis la DB
    const [utilisateurs, setUtilisateurs] = useState([])
    // Va définir l'état visible de la boite de dialogue
    const [open, setOpen] = React.useState(false);
    // Id de la famille à transmettre à la fiche famille
    const [ficheUtilisateur, setFicheUtilisateur] = useState([]);

    // Variable à envoyer vers la DB pour modification
    const [id_utilisateurToSend, setId_utilisateurToSend] = useState("")
    const [prenom_utilisateurToSend, setPrenom_utilisateurToSend] = useState("")
    const [nom_famille_utilisateurToSend, setNom_famille_utilisateurToSend] = useState("")
    const [telephone_utilisateurToSend, setTelephone_utilisateurToSend] = useState("")
    const [id_profilToSend, setId_profilToSend] = useState("")

    // Contient les possibilite pour les profils
    const [choixProfil, setChoixProfil] = useState([])

    // Fiche finition modifiée à envoyée
    const aEnvoyer = {
        id_utilisateurToSend,
        prenom_utilisateurToSend,
        nom_famille_utilisateurToSend,
        telephone_utilisateurToSend,
        id_profilToSend
    }

    // Le useEffect se joue quand le composant est monté 
    // Requete pour récupérer la liste des finitions
    useEffect(() => {
        axios.get(window.url + "/listeUtilisateur")
            .then((res) => setUtilisateurs(res.data))
    }, [])

    // Fonction pour ouvrir la boîte de dialogue
    const handleClickOpen = (v) => {
        setOpen(true);
        axios.get(window.url + "/listeUtilisateur/" + v)
            .then((res) => setFicheUtilisateur(res.data))
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
        setId_utilisateurToSend("")
        setPrenom_utilisateurToSend("")
        setNom_famille_utilisateurToSend("")
        setTelephone_utilisateurToSend("")
    }

    // Récupération de la liste des profils
    useEffect(() => {
        axios.get(window.url + "/listeProfil")
            .then((res) => setChoixProfil(res.data))
    }, [])
    const profilHandleChange = (e) => {
        setId_profilToSend((v) => (e.target.validity.valid ? e.target.value : v))
    }

    // Pour envoyer vers la DB
    const sendToAPI = () => {
        console.log("aEnvoyer", aEnvoyer)
        // Remplir les champ laissé vide
        if (id_utilisateurToSend == "") {
            aEnvoyer.id_utilisateurToSend = ficheUtilisateur[0].id_utilisateur;
        }
        if (prenom_utilisateurToSend == "") {
            aEnvoyer.prenom_utilisateurToSend = ficheUtilisateur[0].prenom_utilisateur;
        }
        if (nom_famille_utilisateurToSend == "") {
            aEnvoyer.nom_famille_utilisateurToSend = ficheUtilisateur[0].nom_famille_utilisateur;
        }
        if (telephone_utilisateurToSend == "") {
            aEnvoyer.telephone_utilisateurToSend = ficheUtilisateur[0].telephone_utilisateur;
        }
        if (id_profilToSend == "") {
            aEnvoyer.id_profilToSend = ficheUtilisateur[0].id_profil;
        }

        axios.post(window.url + "/utilisateur/update/", aEnvoyer)
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
        console.log("ToSupp", toSupp)
        // Requête pour aller chercher la fiche technique
        axios.get(window.url + "/fournisseur/" + id)
            .then((res) => setToSupp(res.data))
    }
    // Fonction pour fermer la boîte de dialogue
    const handleSuppClose = () => {
        // Remise à vide des valeurs ToSupp à la fermeture
        setOpenSupp(false);
    };
    // Fonction qui effectue la requete de suppression 
    const suppression = (id) => {
        axios.delete(window.url + "/fournisseur/delete/" + id)
            .then(function (res) {
                console.log('Succes suppression de fournisseur')
                console.log(res.data)
            })
            .catch(function (err) {
                console.log("Error: ")
                console.log(err)
            });
        refreshPage();
    }

    // Variable pour faire la recharche
    const [recherche, setRecherche] = useState("")
    // Fonction pour récupérer les éléments de la recherche
    const search = () => {
        if (recherche === "") {
            axios.get(window.url + "/listeUtilisateur/")
                .then((res) => setUtilisateurs(res.data))
        } else {
            axios.get(window.url + "/utilisateur/search/" + recherche)
                .then((res) => setUtilisateurs(res.data))
        }
    }

    return (
        <div>
            <Navigation />
            <h1>Liste des utilisateurs</h1>
            {/* Module de recherche */}
            <input type="text"
                value={recherche}
                placeholder='Recherche'
                onChange={(e) => setRecherche((v) => e.target.validity.valid ? e.target.value : v)}
            />
            <button onClick={search}>Rechercher</button>
            <div>
                <table className='tableau'>
                    <thead>
                        {/* Colonne faisant office de titre */}
                        <tr>
                            <th>Id Utilisateur</th>
                            <th>Prénom</th>
                            <th>Nom de famille</th>
                            <th>Numéro de téléphone</th>
                            <th>Profil</th>
                            {/* <th>Suppression</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {/* Les datas sont traitées. 
                    Chaque élément de l'objet pièce mis dans une case de la ligne
                    Une fois que l'on a traité toutes les données d'une pièce,
                    on créer une ligne pour la pièce suivante
                    */}
                        {utilisateurs.map(({ id_utilisateur,
                            prenom_utilisateur,
                            nom_famille_utilisateur,
                            telephone_utilisateur,
                            libelle_profil
                        }) => (
                            <tr key={id_utilisateur}>
                                <td onClick={() => handleClickOpen(id_utilisateur)}>{id_utilisateur}</td>
                                <td>{prenom_utilisateur}</td>
                                <td>{nom_famille_utilisateur}</td>
                                <td>{telephone_utilisateur}</td>
                                <td>{libelle_profil}</td>
                                {/* <td onClick={() => handleSuppOpen(id_utilisateur)}>X</td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Boite de dialogue de suppression */}
            <Dialog className='dialog' open={openSupp} onClose={handleSuppClose}>
                <DialogTitle>
                    Fiche technique
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <p>Voulez-vous vraiment supprimer cet utilisateur ?</p>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSuppClose} color="primary">
                        Annuler
                    </Button>
                    <Button onClick={() => suppression(toSupp[0].id_fournisseur)} color="primary" autoFocus>
                        Valider
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog className='dialog' open={open} onClose={handleClose}>
                <DialogTitle>
                    Fiche Utilisateur
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {ficheUtilisateur.map(({
                            id_utilisateur,
                            nom_utilisateur,
                            prenom_utilisateur,
                            nom_famille_utilisateur,
                            telephone_utilisateur,
                            libelle_profil,
                        }) => (
                            <table className='tableauFT' id={"id_utilisateur"}>
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
                                        <td>{id_utilisateur}</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>USERNAME</td>
                                        <td>{nom_utilisateur}</td>
                                        <td>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>PRENOM</td>
                                        <td>{prenom_utilisateur}</td>
                                        <td>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>NOM DE FAMILLE</td>
                                        <td>{nom_famille_utilisateur}</td>
                                        <td>
                                        </td>
                                    </tr>
                                    <tr >
                                        <td>TELEPHONE</td>
                                        <td>{telephone_utilisateur}</td>
                                        <td>
                                            <input
                                                type="text"
                                                name='telephone utilisateur'
                                                pattern="[0-9]*"
                                                value={telephone_utilisateurToSend}
                                                onChange={(e) =>
                                                    setTelephone_utilisateurToSend((v) => (e.target.validity.valid ? e.target.value : v))
                                                }
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Profil</td>
                                        <td>{libelle_profil}</td>
                                        <td>
                                            <select name="choixProfil"
                                                id="selectChoixProfil"
                                                value={id_profilToSend}
                                                onChange={profilHandleChange}>
                                                {choixProfil.map(({ id_profil, libelle_profil }) => (
                                                    <option value={id_profil}>{libelle_profil}</option>
                                                ))}
                                            </select>
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

export default Utilisateur;
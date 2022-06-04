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

const Fournisseur = () => {

    function refreshPage() {
        window.location.reload();
    }
    // Variable qui reprend la liste des fournisseurs
    const [fournisseur, setFournisseur] = useState([])
    // Va définir l'état visible de la boite de dialogue
    const [open, setOpen] = React.useState(false);
    // Id de la famille à transmettre à la fiche famille
    const [ficheFournisseur, setFicheFournisseur] = useState([]);

    // Variable à envoyer vers la DB pour modification
    const [id_fournisseurToSend, setId_fournisseurToSend] = useState("")
    const [nom_fournisseurToSend, setNom_fournisseurToSend] = useState("")
    const [mail_fournisseurToSend, setMail_fournisseurToSend] = useState("")
    const [tel_fournisseurToSend, setTel_fournisseurToSend] = useState("")
    const [adresse_fournisseurToSend, setAddresse_fournisseurToSend] = useState("")
    const [id_localiteToSend, setId_localiteToSend] = useState("")

    // Contient le possibilité de localite pour la liste déroulante
    const [choixLocalite, setChoixLocalite] = useState([])

    // Vérification du profil
    const [peutAjouter, setPeutAjouter] = useState(localStorage.getItem("isEmploye"))


    // Fiche famille modifiée à envoyée
    const aEnvoyer = {
        id_fournisseurToSend,
        nom_fournisseurToSend,
        mail_fournisseurToSend,
        tel_fournisseurToSend,
        adresse_fournisseurToSend,
        id_localiteToSend
    }

    // Permet de récupérer la liste des fournisseur depuis l'API
    useEffect(() => {
        axios.get(window.url + "/fournisseur/")
            .then((res) => setFournisseur(res.data))
    }, [])

    // Fonction pour ouvrir la boîte de dialogue
    const handleClickOpen = (v) => {
        setOpen(true);
        axios.get(window.url + "/fournisseur/" + v)
            .then((res) => setFicheFournisseur(res.data))
    }
    // Fonction pour fermer la boîte de dialogue
    const handleClose = () => {
        // Remise à vide des valeurs ToSend à la fermeture
        resetToSend()
        setOpen(false);
    };

    // Récupération de la liste des localite
    useEffect(() => {
        axios.get(window.url + "/localite/")
            .then((res) => setChoixLocalite(res.data))
    }, [])
    const localiteHandleChange = (e) => {
        setId_localiteToSend((v) => (e.target.validity.valid ? e.target.value : v))
    }

    // Pour envoyer vers la DB
    const sendToAPI = () => {
        console.log("aEnvoyer", aEnvoyer)
        // Remplir les champ laissé vide
        if (id_fournisseurToSend == "") {
            aEnvoyer.id_fournisseurToSend = ficheFournisseur[0].id_fournisseur;
        }
        if (nom_fournisseurToSend == "") {
            aEnvoyer.nom_fournisseurToSend = ficheFournisseur[0].nom_fournisseur;
        }
        if (mail_fournisseurToSend == "") {
            aEnvoyer.mail_fournisseurToSend = ficheFournisseur[0].mail_fournisseur;
        }
        if (tel_fournisseurToSend == "") {
            aEnvoyer.tel_fournisseurToSend = ficheFournisseur[0].tel_fournisseur;
        }
        if (adresse_fournisseurToSend == "") {
            aEnvoyer.adresse_fournisseurToSend = ficheFournisseur[0].adresse_fournisseur;
        }
        if (id_localiteToSend == "") {
            aEnvoyer.id_localiteToSend = ficheFournisseur[0].id_localite;
        }

        axios.post(window.url + "/fournisseur/updateById", aEnvoyer)
            .then(function (res) {
                console.log('Succes Modification Fiche fournisseur')
                console.log(res.data)
            })
            .catch(function (err) {
                console.log("Error: ")
                console.log(err)
            });
        refreshPage();
    }

    // Permet de reset les valeur des ToSend
    const resetToSend = () => {
        // Remise à vide des ToSend
        setId_fournisseurToSend("")
        setNom_fournisseurToSend("")
        setMail_fournisseurToSend("")
        setTel_fournisseurToSend("")
        setAddresse_fournisseurToSend("")
        setId_localiteToSend("")
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

    // Variable pour faire la recherche
    const [recherche, setRecherche] = useState("")
    // Fonction pour récupérer les éléments de la recherche
    const search = () => {
        if (recherche === "") {
            axios.get(window.url + "/fournisseur/")
                .then((res) => setFournisseur(res.data))
        } else {
            axios.get(window.url + "/fournisseur/search/" + recherche)
                .then((res) => setFournisseur(res.data))
        }
    }

    if (localStorage.getItem('profil') == '1') {
        return (
            <div>
                <Navigation />
                <h1>Liste des fournisseurs</h1>
                <div>
                    <NavLink to='/nouveauFournisseur' className={(nav) => (nav.isActive ? "nav-active" : "")}>
                        <li>Ajouter un fournisseur</li>
                    </NavLink>
                </div>
                {/* Module de recherche */}
                <input type="text"
                    value={recherche}
                    placeholder='Recherche'
                    onChange={(e) => setRecherche((v) => e.target.validity.valid ? e.target.value : v)}
                />
                <button onClick={search}>Rechercher</button>
                {/* Création du tableau des pièces */}
                <table className='tableau'>
                    <thead>
                        {/* Colonne faisant office de titre */}
                        <tr>
                            <th>Id fournisseur</th>
                            <th>Nom fournisseur</th>
                            <th>mail </th>
                            <th>telephone</th>
                            <th>adresse</th>
                            <th>Localite</th>
                            <th>Suppression</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fournisseur.map(({ id_fournisseur,
                            nom_fournisseur,
                            mail_fournisseur,
                            tel_fournisseur,
                            adresse_fournisseur,
                            code_postal,
                            nom_localite }) => (
                            <tr key={id_fournisseur}>
                                <td onClick={() => handleClickOpen(id_fournisseur)}>{id_fournisseur}</td>
                                <td>{nom_fournisseur}</td>
                                <td>{mail_fournisseur}</td>
                                <td>{tel_fournisseur}</td>
                                <td>{adresse_fournisseur}</td>
                                <td>{code_postal + ' - ' + nom_localite}</td>
                                <td onClick={() => handleSuppOpen(id_fournisseur)}>X</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div>
                    <Dialog className='dialog' open={openSupp} onClose={handleSuppClose}>
                        <DialogTitle>
                            Fiche technique
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                <p>Voulez-vous vraiment supprimer ce fournisseur ?</p>
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
                            Fiche fournisseur
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                {ficheFournisseur.map(({
                                    id_fournisseur,
                                    nom_fournisseur,
                                    mail_fournisseur,
                                    tel_fournisseur,
                                    adresse_fournisseur,
                                    id_localite,
                                    code_postal,
                                    nom_localite
                                }) => (
                                    <table className='tableauFT' id={"id_fournisseur"}>
                                        <thead>
                                            <tr>
                                                <th>                </th>
                                                <th>Valeure actuelle</th>
                                                <th>Modification</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr >
                                                <td>ID</td>
                                                <td>{id_fournisseur}</td>
                                                <td></td>
                                            </tr>
                                            <tr >
                                                <td>NOM</td>
                                                <td>{nom_fournisseur}</td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name='nom_fournisseur'
                                                        value={nom_fournisseurToSend}
                                                        onChange={(e) =>
                                                            setNom_fournisseurToSend((v) => (e.target.validity.valid ? e.target.value : v))
                                                        }
                                                    />
                                                </td>
                                            </tr>
                                            <tr >
                                                <td>MAIL</td>
                                                <td>{mail_fournisseur}</td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name='materiaux'
                                                        value={mail_fournisseurToSend}
                                                        onChange={(e) =>
                                                            setMail_fournisseurToSend((v) => (e.target.validity.valid ? e.target.value : v))
                                                        }
                                                    />
                                                </td>
                                            </tr>
                                            <tr >
                                                <td>TELEPHONE</td>
                                                <td>{tel_fournisseur}</td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name='tel_fournisseur'
                                                        pattern="[0-9]*"
                                                        value={tel_fournisseurToSend}
                                                        onChange={(e) =>
                                                            setTel_fournisseurToSend((v) => (e.target.validity.valid ? e.target.value : v))
                                                        }
                                                    />
                                                </td>
                                            </tr>
                                            <tr >
                                                <td>ADRESSE</td>
                                                <td>{adresse_fournisseur}</td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name='adresse_fournisseur'
                                                        value={adresse_fournisseurToSend}
                                                        onChange={(e) =>
                                                            setAddresse_fournisseurToSend((v) => (e.target.validity.valid ? e.target.value : v))
                                                        }
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Localité</td>
                                                <td>{code_postal + ": " + nom_localite}</td>
                                                <td>
                                                    <select name="choixLocalite"
                                                        id="selectChoixLocalite"
                                                        multiple={false}
                                                        value={id_localiteToSend}
                                                        onChange={localiteHandleChange}>
                                                        {choixLocalite.map(({ id_localite, code_postal, nom_localite }) => (
                                                            <option value={id_localite}>{code_postal + ": " + nom_localite}</option>
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

            </div>
        )
    }
    else if (localStorage.getItem('profil') == '2') {
        return (
            <div>
                <Navigation />
                <div>
                    <h1>Liste des fournisseurs</h1>
                    <NavLink to='/nouveauFournisseur' className={(nav) => (nav.isActive ? "nav-active" : "")}>
                        <li>Ajouter un fournisseur</li>
                    </NavLink>
                </div>
                {/* Module de recherche */}
                <input type="text"
                    value={recherche}
                    placeholder='Recherche'
                    onChange={(e) => setRecherche((v) => e.target.validity.valid ? e.target.value : v)}
                />
                <button onClick={search}>Rechercher</button>
                {/* Création du tableau des pièces */}
                <table className='tableau'>
                    <thead>
                        {/* Colonne faisant office de titre */}
                        <tr>
                            <th>Id fournisseur</th>
                            <th>Nom fournisseur</th>
                            <th>mail </th>
                            <th>telephone</th>
                            <th>adresse</th>
                            <th>Localite</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fournisseur.map(({ id_fournisseur,
                            nom_fournisseur,
                            mail_fournisseur,
                            tel_fournisseur,
                            adresse_fournisseur,
                            code_postal,
                            nom_localite }) => (
                            <tr key={id_fournisseur}>
                                <td onClick={() => handleClickOpen(id_fournisseur)}>{id_fournisseur}</td>
                                <td>{nom_fournisseur}</td>
                                <td>{mail_fournisseur}</td>
                                <td>{tel_fournisseur}</td>
                                <td>{adresse_fournisseur}</td>
                                <td>{code_postal + ' - ' + nom_localite}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div>
                    <Dialog className='dialog' open={open} onClose={handleClose}>
                        <DialogTitle>
                            Fiche fournisseur
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                {ficheFournisseur.map(({
                                    id_fournisseur,
                                    nom_fournisseur,
                                    mail_fournisseur,
                                    tel_fournisseur,
                                    adresse_fournisseur,
                                    id_localite,
                                    code_postal,
                                    nom_localite
                                }) => (
                                    <table className='tableauFT' id={"id_fournisseur"}>
                                        <thead>
                                            <tr>
                                                <th>                </th>
                                                <th>Valeure actuelle</th>
                                                <th>Modification</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr >
                                                <td>ID</td>
                                                <td>{id_fournisseur}</td>
                                                <td></td>
                                            </tr>
                                            <tr >
                                                <td>NOM</td>
                                                <td>{nom_fournisseur}</td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name='nom_fournisseur'
                                                        value={nom_fournisseurToSend}
                                                        onChange={(e) =>
                                                            setNom_fournisseurToSend((v) => (e.target.validity.valid ? e.target.value : v))
                                                        }
                                                    />
                                                </td>
                                            </tr>
                                            <tr >
                                                <td>MAIL</td>
                                                <td>{mail_fournisseur}</td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name='materiaux'
                                                        value={mail_fournisseurToSend}
                                                        onChange={(e) =>
                                                            setMail_fournisseurToSend((v) => (e.target.validity.valid ? e.target.value : v))
                                                        }
                                                    />
                                                </td>
                                            </tr>
                                            <tr >
                                                <td>TELEPHONE</td>
                                                <td>{tel_fournisseur}</td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name='tel_fournisseur'
                                                        pattern="[0-9]*"
                                                        value={tel_fournisseurToSend}
                                                        onChange={(e) =>
                                                            setTel_fournisseurToSend((v) => (e.target.validity.valid ? e.target.value : v))
                                                        }
                                                    />
                                                </td>
                                            </tr>
                                            <tr >
                                                <td>ADRESSE</td>
                                                <td>{adresse_fournisseur}</td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name='adresse_fournisseur'
                                                        value={adresse_fournisseurToSend}
                                                        onChange={(e) =>
                                                            setAddresse_fournisseurToSend((v) => (e.target.validity.valid ? e.target.value : v))
                                                        }
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Localité</td>
                                                <td>{code_postal + ": " + nom_localite}</td>
                                                <td>
                                                    <select name="choixLocalite"
                                                        id="selectChoixLocalite"
                                                        multiple={false}
                                                        value={id_localiteToSend}
                                                        onChange={localiteHandleChange}>
                                                        {choixLocalite.map(({ id_localite, code_postal, nom_localite }) => (
                                                            <option value={id_localite}>{code_postal + ": " + nom_localite}</option>
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

            </div>
        )
    } else {
        return (
            <div>
                <Navigation />
                <h1>Liste des fournisseurs</h1>
                {/* Module de recherche */}
                <input type="text"
                    value={recherche}
                    placeholder='Recherche'
                    onChange={(e) => setRecherche((v) => e.target.validity.valid ? e.target.value : v)}
                />
                <button onClick={search}>Rechercher</button>
                {/* Création du tableau des pièces */}
                <table className='tableau'>
                    <thead>
                        {/* Colonne faisant office de titre */}
                        <tr>
                            <th>Id fournisseur</th>
                            <th>Nom fournisseur</th>
                            <th>mail </th>
                            <th>telephone</th>
                            <th>adresse</th>
                            <th>Localite</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fournisseur.map(({ id_fournisseur,
                            nom_fournisseur,
                            mail_fournisseur,
                            tel_fournisseur,
                            adresse_fournisseur,
                            code_postal,
                            nom_localite }) => (
                            <tr key={id_fournisseur}>
                                <td onClick={() => handleClickOpen(id_fournisseur)}>{id_fournisseur}</td>
                                <td>{nom_fournisseur}</td>
                                <td>{mail_fournisseur}</td>
                                <td>{tel_fournisseur}</td>
                                <td>{adresse_fournisseur}</td>
                                <td>{code_postal + ' - ' + nom_localite}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div>
                    <Dialog className='dialog' open={open} onClose={handleClose}>
                        <DialogTitle>
                            Fiche fournisseur
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                {ficheFournisseur.map(({
                                    id_fournisseur,
                                    nom_fournisseur,
                                    mail_fournisseur,
                                    tel_fournisseur,
                                    adresse_fournisseur,
                                    id_localite,
                                    code_postal,
                                    nom_localite
                                }) => (
                                    <table className='tableauFT' id={"id_fournisseur"}>
                                        <thead>
                                            <tr>
                                                <th>                </th>
                                                <th>Valeure actuelle</th>
                                                <th>Modification</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr >
                                                <td>ID</td>
                                                <td>{id_fournisseur}</td>
                                                <td></td>
                                            </tr>
                                            <tr >
                                                <td>NOM</td>
                                                <td>{nom_fournisseur}</td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name='nom_fournisseur'
                                                        value={nom_fournisseurToSend}
                                                        onChange={(e) =>
                                                            setNom_fournisseurToSend((v) => (e.target.validity.valid ? e.target.value : v))
                                                        }
                                                    />
                                                </td>
                                            </tr>
                                            <tr >
                                                <td>MAIL</td>
                                                <td>{mail_fournisseur}</td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name='materiaux'
                                                        value={mail_fournisseurToSend}
                                                        onChange={(e) =>
                                                            setMail_fournisseurToSend((v) => (e.target.validity.valid ? e.target.value : v))
                                                        }
                                                    />
                                                </td>
                                            </tr>
                                            <tr >
                                                <td>TELEPHONE</td>
                                                <td>{tel_fournisseur}</td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name='tel_fournisseur'
                                                        pattern="[0-9]*"
                                                        value={tel_fournisseurToSend}
                                                        onChange={(e) =>
                                                            setTel_fournisseurToSend((v) => (e.target.validity.valid ? e.target.value : v))
                                                        }
                                                    />
                                                </td>
                                            </tr>
                                            <tr >
                                                <td>ADRESSE</td>
                                                <td>{adresse_fournisseur}</td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        name='adresse_fournisseur'
                                                        value={adresse_fournisseurToSend}
                                                        onChange={(e) =>
                                                            setAddresse_fournisseurToSend((v) => (e.target.validity.valid ? e.target.value : v))
                                                        }
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Localité</td>
                                                <td>{code_postal + ": " + nom_localite}</td>
                                                <td>
                                                    <select name="choixLocalite"
                                                        id="selectChoixLocalite"
                                                        multiple={false}
                                                        value={id_localiteToSend}
                                                        onChange={localiteHandleChange}>
                                                        {choixLocalite.map(({ id_localite, code_postal, nom_localite }) => (
                                                            <option value={id_localite}>{code_postal + ": " + nom_localite}</option>
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

            </div>
        );
    }
};

export default Fournisseur;
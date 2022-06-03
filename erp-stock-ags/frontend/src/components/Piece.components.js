import React, { useEffect, useState } from 'react';
import axios from "axios"
import AjoutPieces from './AjoutPieces.components';
import '../GlobalData'
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

const Piece = () => {

    function refreshPage() {
        window.location.reload();
    }

    // data contient la liste des pièces récupérée depuis la db
    const [data, setData] = useState([])
    // fiche technique contient la liste des fiches techniques des pièces
    const [ficheTechniques, setFicheTechnique] = useState([])
    // Va définir l'état visible de la boite de dialogue
    const [openFT, setOpenFT] = React.useState(false);

    // Variable qui vont pouvoir être envoyée pour 
    // L'adaptation de la fiche technique
    // const [referenceToSend, setReferenceToSend] = useState([])
    const [referenceToSend, setReferenceToSend] = useState("")
    const [valeur_seuilToSend, setValeur_seuilToSend] = useState("")
    const [id_familleToSend, setId_familleToSend] = useState("")
    const [id_finitionToSend, setId_finitionToSend] = useState("")
    const [longueurToSend, setLongueurToSend] = useState("")
    const [largeurToSend, setLargeurToSend] = useState("")
    const [hauteurToSend, setHauteurToSend] = useState("")
    const [rayonToSend, setRayonToSend] = useState("")
    const [poidsToSend, setPoidsToSend] = useState("")

    // Variable qui vont contenir les différentes possibilité de la fiche technique
    const [choixFamille, setChoixFamille] = useState([])
    const [choixFinition, setChoixFinition] = useState([])

    //Fiche technique modifiée à envoyé
    const aEnvoyer = {
        referenceToSend,
        valeur_seuilToSend,
        id_familleToSend,
        id_finitionToSend,
        longueurToSend,
        largeurToSend,
        hauteurToSend,
        rayonToSend,
        poidsToSend
    }

    // Fonction qui permet d'afficher une boite de dialogue
    // Lors du click sur la case référence du tableau
    const handleClickOpen = (v) => {
        setOpenFT(true);
        // Requête pour aller chercher la fiche technique
        axios.get(window.url + "/listePieces/" + v)
            .then((res) => setFicheTechnique(res.data))
    };

    // Fonction pour fermer la boîte de dialogue
    const handleClose = () => {
        // Remise à vide des valeurs ToSend à la fermeture
        resetToSend()
        setOpenFT(false);
    };
    const sendToAPI = () => {
        console.log("aEnvoyer", aEnvoyer)
        // Remplir les champ laissé vide
        if (referenceToSend === "") {
            aEnvoyer.referenceToSend = ficheTechniques[0].reference;
        }
        if (valeur_seuilToSend === "") {
            aEnvoyer.valeur_seuilToSend = ficheTechniques[0].valeur_seuil;
        }
        if (id_familleToSend === "") {
            aEnvoyer.id_familleToSend = ficheTechniques[0].id_famille;
        }
        if (id_finitionToSend === "") {
            aEnvoyer.id_finitionToSend = ficheTechniques[0].id_finition;
        }
        if (longueurToSend === "") {
            aEnvoyer.longueurToSend = ficheTechniques[0].longueur;
        }
        if (largeurToSend === "") {
            aEnvoyer.largeurToSend = ficheTechniques[0].largeur;
        }
        if (hauteurToSend === "") {
            aEnvoyer.hauteurToSend = ficheTechniques[0].hauteur;
        }
        if (rayonToSend === "") {
            aEnvoyer.rayonToSend = ficheTechniques[0].rayon;
        }
        if (poidsToSend === "") {
            aEnvoyer.poidsToSend = ficheTechniques[0].poids;
        }
        //refreshPage()
        axios.post(window.url + "/listePieces/updateFT", aEnvoyer)
            .then(function (res) {
                console.log('Succes Modification Fiche Technique')
                console.log(res.data)
            })
            .catch(function (err) {
                console.log("Error: ")
                console.log(err)
            });
        window.alert("La pièce " + aEnvoyer.referenceToSend + " A bien été mise à jour")
        refreshPage();
    }

    // Permet de remettre à 0 les valeur des ToSend
    const resetToSend = () => {
        // Remise à vide des ToSend
        setReferenceToSend("")
        setValeur_seuilToSend("")
        setId_familleToSend("")
        setId_finitionToSend("")
        setLongueurToSend("")
        setLargeurToSend("")
        setHauteurToSend("")
        setRayonToSend("")
        setPoidsToSend("")
    }

    // Le useEffect se joue quand le composant est monté 
    // Requete pour récupérer la liste des pièces
    useEffect(() => {
        axios.get(window.url + "/listePieces")
            .then((res) => setData(res.data))
        console.log(data);
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

    // Fonctions pour récupérer la valeur des choix déroulants sélectionnés
    // et les appliquer au attributs de la pièces
    const familleHandleChange = (e) => {
        setId_familleToSend((v) => (e.target.validity.valid ? e.target.value : v))
    }
    const finitionHandleChange = (e) => {
        setId_finitionToSend((v) => (e.target.validity.valid ? e.target.value : v))
    }

    // Défini l'état d'ouverture de la boite de dialogue de suppression
    const [openSupp, setOpenSupp] = useState(false)
    // Variable qui stocke l'objet à supprimer
    const [toSupp, setToSupp] = useState([])
    // Ouvre la boite de dialogue de suppression
    const handleSuppOpen = (id) => {
        setOpenSupp(true);
        // Requête pour aller chercher la fiche technique
        axios.get(window.url + "/listePieces/" + id)
            .then((res) => setToSupp(res.data))
    }
    // Fonction pour fermer la boîte de dialogue
    const handleSuppClose = () => {
        // Remise à vide des valeurs ToSupp à la fermeture
        setOpenSupp(false);
    };
    // Fonction qui effectue la requete de suppression 
    const suppression = (id) => {
        axios.delete(window.url + "/listePieces/delete/" + id)
            .then(function (res) {
                console.log('Succes suppression de pièce')
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
            axios.get(window.url + "/listePieces")
                .then((res) => setData(res.data))
        } else {
            axios.get(window.url + "/listePieces/search/" + recherche)
                .then((res) => setData(res.data))
        }
    }

    // si le profil est ouvrier, pas de modification possible
    if (localStorage.getItem('profil') === '4') {
        return (
            <div>
                <input type="text"
                    value={recherche}
                    placeholder='Recherche'
                    onChange={(e) => setRecherche((v) => e.target.validity.valid ? e.target.value : v)}
                />
                <button onClick={search}>Rechercher</button>
                {/* Création du tableau des pièces */}
                {/* {tableVisible && <table className='tableau'> */}
                <table className='tableau'>
                    <thead>
                        {/* Colonne faisant office de titre */}
                        <tr>
                            <th>Référence</th>
                            <th>Famille</th>
                            <th>Valeur seuil</th>
                            <th>Quantité en stock</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Les datas sont traitées. 
                    Chaque élément de l'objet pièce mis dans une case de la ligne
                    Une fois que l'on a traité toutes les données d'une pièce,
                    on créer une ligne pour la pièce suivante
                    */}
                        {data.map(({ reference, nom_famille, valeur_seuil, quantite_en_stock, materiaux }) => (
                            <tr key={reference} >
                                <td onClick={() => handleClickOpen(reference)}>
                                    {reference}</td>
                                <td>{nom_famille + " en " + materiaux}</td>
                                <td>{valeur_seuil}</td>
                                <td>{quantite_en_stock}</td>
                                <td>
                                    <AjoutPieces key={reference}
                                        reference={reference}
                                        qte={quantite_en_stock} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Dialog className='dialog' open={openFT} onClose={handleClose}>
                    <DialogTitle>
                        Fiche technique
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {ficheTechniques.map(({
                                reference,
                                valeur_seuil,
                                nom_famille,
                                materiaux,
                                nom_categorie,
                                pole,
                                nom_fournisseur,
                                nom_finition,
                                effet_finition,
                                longueur,
                                largeur,
                                hauteur,
                                rayon,
                                poids }) => (
                                <table className='tableauFT' id={reference}>
                                    <thead>
                                        <tr>
                                            <th>                </th>
                                            <th>Valeure actuelle</th>
                                            <th>Modification</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr key={reference} id={reference}>
                                            <td>Référence</td>
                                            <td>{reference}
                                            </td>
                                            <td>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Valeur Seuil</td>
                                            <td>{valeur_seuil}</td>
                                            <td>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Famille : Nom</td>
                                            <td>{nom_famille}</td>
                                            <td>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Matériaux</td>
                                            <td>{materiaux}</td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>Finition : Nom</td>
                                            <td>
                                                {nom_finition}
                                            </td>
                                            <td>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Finition : Effet </td>
                                            <td>{effet_finition}</td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>Longueur</td>
                                            <td>{longueur}</td>
                                            <td>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Largeur</td>
                                            <td>{largeur}</td>
                                            <td>
                                            </td>
                                        </tr>

                                        <tr><td>Hauteur</td>
                                            <td>{hauteur}</td>
                                            <td>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Rayon</td>
                                            <td>{rayon}</td>
                                            <td>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Poids</td>
                                            <td>{poids}</td>
                                            <td>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Catégorie</td>
                                            <td>{nom_categorie}</td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>Pôle</td>
                                            <td>{pole}</td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>Fournisseur </td>
                                            <td>{nom_fournisseur}</td>
                                            <td></td>
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
            </div >
        );
    } else if (localStorage.getItem('profil') === '1') {
        return (
            <div>
                <input type="text"
                    value={recherche}
                    placeholder="Recherche"
                    onChange={(e) => setRecherche((v) => e.target.validity.valid ? e.target.value : v)}
                />
                <button onClick={search}>Rechercher</button>
                {/* Création du tableau des pièces */}
                {/* {tableVisible && <table className='tableau'> */}
                <table className='tableau'>
                    <thead>
                        {/* Colonne faisant office de titre */}
                        <tr>
                            <th>Référence</th>
                            <th>Famille</th>
                            <th>Valeur seuil</th>
                            <th>Quantité en stock</th>
                            <th></th>
                            <th>Suppression</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Les datas sont traitées. 
                    Chaque élément de l'objet pièce mis dans une case de la ligne
                    Une fois que l'on a traité toutes les données d'une pièce,
                    on créer une ligne pour la pièce suivante
                    */}
                        {data.map(({ reference, nom_famille, valeur_seuil, quantite_en_stock, materiaux }) => (
                            <tr key={reference} >
                                <td onClick={() => handleClickOpen(reference)}>
                                    {reference}</td>
                                <td>{nom_famille + " en " + materiaux}</td>
                                <td>{valeur_seuil}</td>
                                <td>{quantite_en_stock}</td>
                                <td>
                                    <AjoutPieces key={reference}
                                        reference={reference}
                                        qte={quantite_en_stock} />
                                </td>
                                <td onClick={() => handleSuppOpen(reference)}>X</td>
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
                            <p>Voulez-vous vraiment supprimer cette pièce ?</p>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleSuppClose} color="primary">
                            Annuler
                        </Button>
                        <Button onClick={() => suppression(toSupp[0].reference)} color="primary" autoFocus>
                            Valider
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog className='dialog' open={openFT} onClose={handleClose}>
                    <DialogTitle>
                        Fiche technique
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {ficheTechniques.map(({
                                reference,
                                valeur_seuil,
                                nom_famille,
                                materiaux,
                                nom_categorie,
                                pole,
                                nom_finition,
                                effet_finition,
                                longueur,
                                largeur,
                                hauteur,
                                rayon,
                                poids }) => (
                                <table className='tableauFT' id={reference}>
                                    <thead>
                                        <tr>
                                            <th>                </th>
                                            <th>Valeure actuelle</th>
                                            <th>Modification</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr key={reference} id={reference}>
                                            <td>Référence</td>
                                            <td>{reference}
                                            </td>
                                            <td>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Valeur Seuil</td>
                                            <td>{valeur_seuil}</td>
                                            <td>
                                                <input
                                                    type="text"
                                                    name='longueur'
                                                    pattern="[0-9]*"
                                                    value={valeur_seuilToSend}
                                                    onChange={(e) =>
                                                        setValeur_seuilToSend((v) => (e.target.validity.valid ? e.target.value : v))
                                                    }
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Famille : Nom</td>
                                            <td>{nom_famille}</td>
                                            <td>
                                                <select name="choixFamille"
                                                    id="selectChoixFamille"
                                                    value={id_familleToSend}
                                                    onChange={familleHandleChange}>
                                                    {choixFamille.map(({ id_famille, nom_famille, materiaux }) => (
                                                        <option value={id_famille}>{nom_famille + " - " + materiaux}</option>
                                                    ))}
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Matériaux</td>
                                            <td>{materiaux}</td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>Finition : Nom</td>
                                            <td>
                                                {nom_finition}
                                            </td>
                                            <td>
                                                <select name="choixFinition"
                                                    id="selectChoixFinition"
                                                    value={id_finitionToSend}
                                                    onChange={finitionHandleChange}>
                                                    {choixFinition.map(({ id_finition, nom_finition, effet_finition }) => (
                                                        <option value={id_finition}>{nom_finition + " - " + effet_finition}</option>
                                                    ))}
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Finition : Effet </td>
                                            <td>{effet_finition}</td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>Longueur</td>
                                            <td>{longueur}</td>
                                            <td>
                                                <input
                                                    type="text"
                                                    name='longueur'
                                                    pattern="[0-9]*"
                                                    value={longueurToSend}
                                                    onChange={(e) =>
                                                        setLongueurToSend((v) => (e.target.validity.valid ? e.target.value : v))
                                                    }
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Largeur</td>
                                            <td>{largeur}</td>
                                            <td>
                                                <input
                                                    type="text"
                                                    name='largeur'
                                                    pattern="[0-9]*"
                                                    value={largeurToSend}
                                                    onChange={(e) =>
                                                        setLargeurToSend((v) => (e.target.validity.valid ? e.target.value : v))
                                                    }
                                                />
                                            </td>
                                        </tr>

                                        <tr><td>Hauteur</td>
                                            <td>{hauteur}</td>
                                            <td>
                                                <input
                                                    type="text"
                                                    name='hauteur'
                                                    pattern="[0-9]*"
                                                    value={hauteurToSend}
                                                    onChange={(e) =>
                                                        setHauteurToSend((v) => (e.target.validity.valid ? e.target.value : v))
                                                    }
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Rayon</td>
                                            <td>{rayon}</td>
                                            <td>
                                                <input
                                                    type="text"
                                                    name='longueur'
                                                    pattern="[0-9]*"
                                                    value={rayonToSend}
                                                    onChange={(e) =>
                                                        setRayonToSend((v) => (e.target.validity.valid ? e.target.value : v))
                                                    }
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Poids</td>
                                            <td>{poids}</td>
                                            <td>
                                                <input
                                                    type="text"
                                                    name='poids'
                                                    pattern="[0-9]*"
                                                    value={poidsToSend}
                                                    onChange={(e) =>
                                                        setPoidsToSend((v) => (e.target.validity.valid ? e.target.value : v))
                                                    }
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Catégorie</td>
                                            <td>{nom_categorie}</td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>Pôle</td>
                                            <td>{pole}</td>
                                            <td></td>
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
            </div >
        );
    } else {
        return (
            <div>
                <input type="text"
                    value={recherche}
                    placeholder='Recherche'
                    onChange={(e) => setRecherche((v) => e.target.validity.valid ? e.target.value : v)}
                />
                <button onClick={search}>Rechercher</button>
                {/* Création du tableau des pièces */}
                {/* {tableVisible && <table className='tableau'> */}
                <table className='tableau'>
                    <thead>
                        {/* Colonne faisant office de titre */}
                        <tr>
                            <th>Référence</th>
                            <th>Famille</th>
                            <th>Valeur seuil</th>
                            <th>Quantité en stock</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Les datas sont traitées. 
                    Chaque élément de l'objet pièce mis dans une case de la ligne
                    Une fois que l'on a traité toutes les données d'une pièce,
                    on créer une ligne pour la pièce suivante
                    */}
                        {data.map(({ reference, nom_famille, valeur_seuil, quantite_en_stock, materiaux }) => (
                            <tr key={reference} >
                                <td onClick={() => handleClickOpen(reference)}>
                                    {reference}</td>
                                <td>{nom_famille + " en " + materiaux}</td>
                                <td>{valeur_seuil}</td>
                                <td>{quantite_en_stock}</td>
                                <td>
                                    <AjoutPieces key={reference}
                                        reference={reference}
                                        qte={quantite_en_stock} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Dialog className='dialog' open={openFT} onClose={handleClose}>
                    <DialogTitle>
                        Fiche technique
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {ficheTechniques.map(({
                                reference,
                                valeur_seuil,
                                nom_famille,
                                materiaux,
                                nom_categorie,
                                pole,
                                nom_fournisseur,
                                nom_finition,
                                effet_finition,
                                longueur,
                                largeur,
                                hauteur,
                                rayon,
                                poids }) => (
                                <table className='tableauFT' id={reference}>
                                    <thead>
                                        <tr>
                                            <th>                </th>
                                            <th>Valeure actuelle</th>
                                            <th>Modification</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr key={reference} id={reference}>
                                            <td>Référence</td>
                                            <td>{reference}
                                            </td>
                                            <td>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Valeur Seuil</td>
                                            <td>{valeur_seuil}</td>
                                            <td>
                                                <input
                                                    type="text"
                                                    name='longueur'
                                                    pattern="[0-9]*"
                                                    value={valeur_seuilToSend}
                                                    onChange={(e) =>
                                                        setValeur_seuilToSend((v) => (e.target.validity.valid ? e.target.value : v))
                                                    }
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Famille : Nom</td>
                                            <td>{nom_famille}</td>
                                            <td>
                                                <select name="choixFamille"
                                                    id="selectChoixFamille"
                                                    value={id_familleToSend}
                                                    onChange={familleHandleChange}>
                                                    {choixFamille.map(({ id_famille, nom_famille, materiaux }) => (
                                                        <option value={id_famille}>{nom_famille + " - " + materiaux}</option>
                                                    ))}
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Matériaux</td>
                                            <td>{materiaux}</td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>Finition : Nom</td>
                                            <td>
                                                {nom_finition}
                                            </td>
                                            <td>
                                                <select name="choixFinition"
                                                    id="selectChoixFinition"
                                                    value={id_finitionToSend}
                                                    onChange={finitionHandleChange}>
                                                    {choixFinition.map(({ id_finition, nom_finition, effet_finition }) => (
                                                        <option value={id_finition}>{nom_finition + " - " + effet_finition}</option>
                                                    ))}
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Finition : Effet </td>
                                            <td>{effet_finition}</td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>Longueur</td>
                                            <td>{longueur}</td>
                                            <td>
                                                <input
                                                    type="text"
                                                    name='longueur'
                                                    pattern="[0-9]*"
                                                    value={longueurToSend}
                                                    onChange={(e) =>
                                                        setLongueurToSend((v) => (e.target.validity.valid ? e.target.value : v))
                                                    }
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Largeur</td>
                                            <td>{largeur}</td>
                                            <td>
                                                <input
                                                    type="text"
                                                    name='largeur'
                                                    pattern="[0-9]*"
                                                    value={largeurToSend}
                                                    onChange={(e) =>
                                                        setLargeurToSend((v) => (e.target.validity.valid ? e.target.value : v))
                                                    }
                                                />
                                            </td>
                                        </tr>

                                        <tr><td>Hauteur</td>
                                            <td>{hauteur}</td>
                                            <td>
                                                <input
                                                    type="text"
                                                    name='hauteur'
                                                    pattern="[0-9]*"
                                                    value={hauteurToSend}
                                                    onChange={(e) =>
                                                        setHauteurToSend((v) => (e.target.validity.valid ? e.target.value : v))
                                                    }
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Rayon</td>
                                            <td>{rayon}</td>
                                            <td>
                                                <input
                                                    type="text"
                                                    name='longueur'
                                                    pattern="[0-9]*"
                                                    value={rayonToSend}
                                                    onChange={(e) =>
                                                        setRayonToSend((v) => (e.target.validity.valid ? e.target.value : v))
                                                    }
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Poids</td>
                                            <td>{poids}</td>
                                            <td>
                                                <input
                                                    type="text"
                                                    name='poids'
                                                    pattern="[0-9]*"
                                                    value={poidsToSend}
                                                    onChange={(e) =>
                                                        setPoidsToSend((v) => (e.target.validity.valid ? e.target.value : v))
                                                    }
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Catégorie</td>
                                            <td>{nom_categorie}</td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>Pôle</td>
                                            <td>{pole}</td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>Fournisseur </td>
                                            <td>{nom_fournisseur}</td>
                                            <td></td>
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
            </div >
        );
    };
}

export default Piece;
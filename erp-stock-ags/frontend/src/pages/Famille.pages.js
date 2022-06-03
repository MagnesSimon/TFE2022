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

    function refreshPage() {
        window.location.reload();
    }

    // Va définir l'état visible de la boite de dialogue
    const [open, setOpen] = React.useState(false);
    // Variable qui reprend la liste des familles
    const [famille, setFamilles] = useState([])
    // Id de la famille à transmettre à la fiche famille
    const [ficheFamille, setFicheFamille] = useState([]);

    // Variable à envoyer vers la DB pour modification
    const [id_familleToSend, setId_familleToSend] = useState("")
    const [nom_familleToSend, setNom_familleToSend] = useState("")
    const [materiauxToSend, setMateriauxToSend] = useState("")
    const [id_fournisseurToSend, setId_fournisseurToSend] = useState("")
    const [id_categorieToSend, setId_categorieToSend] = useState("")

    // Contient le possibilité de fournisseurs pour la liste déroulante
    const [choixFournisseur, setChoixFournisseur] = useState([])
    const [choixCategorie, setChoixCategorie] = useState([])

    // Vérification du profil
    const [peutAjouter, setPeutAjouter] = useState(localStorage.getItem("isEmploye"))

    // Fiche famille modifiée à envoyée
    const aEnvoyer = {
        id_familleToSend,
        nom_familleToSend,
        materiauxToSend,
        id_fournisseurToSend,
        id_categorieToSend
    }

    // Permet de récupérer la liste des familles depuis l'API
    useEffect(() => {
        axios.get(window.url + "/listeFamilles/")
            .then((res) => setFamilles(res.data))
    }, [])

    // Fonction pour ouvrir la boîte de dialogue
    const handleClickOpen = (v) => {
        setOpen(true);
        axios.get(window.url + "/listeFamilles/" + v)
            .then((res) => setFicheFamille(res.data))
    }
    // Fonction pour fermer la boîte de dialogue
    const handleClose = () => {
        // Remise à vide des valeurs ToSend à la fermeture
        resetToSend()
        setOpen(false);
    };

    // Permet de récupérer les fournisseurs pour la liste déroulante
    useEffect(() => {
        axios.get(window.url + "/fournisseur/")
            .then((res) => setChoixFournisseur(res.data))
    }, [])
    const fournisseurHandleChange = (e) => {
        setId_fournisseurToSend((v) => (e.target.validity.valid ? e.target.value : v))
    }

    // Permet de récupérer les catégories pour la liste déroulante
    useEffect(() => {
        axios.get(window.url + "/listeCategories/")
            .then((res) => setChoixCategorie(res.data))
    }, [])

    const categorieHandleChange = (e) => {
        setId_categorieToSend((v) => (e.target.validity.valid ? e.target.value : v))
    }

    // Pour envoyer vers la DB
    const sendToAPI = () => {
        console.log("aEnvoyer", aEnvoyer)
        // Remplir les champ laissé vide
        if (id_familleToSend == "") {
            aEnvoyer.id_familleToSend = ficheFamille[0].id_famille;
        }
        if (nom_familleToSend == "") {
            aEnvoyer.nom_familleToSend = ficheFamille[0].nom_famille;
        }
        if (materiauxToSend == "") {
            aEnvoyer.materiauxToSend = ficheFamille[0].materiaux;
        }
        if (id_fournisseurToSend == "") {
            aEnvoyer.id_fournisseurToSend = ficheFamille[0].id_fournisseur;
        }
        if (id_categorieToSend == "") {
            aEnvoyer.id_categorieToSend = ficheFamille[0].id_categorie;
        }

        axios.post(window.url + "/listeFamilles/updateById", aEnvoyer)
            .then(function (res) {
                console.log('Succes Modification Fiche Technique')
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
        setId_familleToSend("")
        setNom_familleToSend("")
        setMateriauxToSend("")
        setId_fournisseurToSend("")
        setId_categorieToSend("")
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
        axios.get(window.url + "/listeFamilles/" + id)
            .then((res) => setToSupp(res.data))
    }
    // Fonction pour fermer la boîte de dialogue
    const handleSuppClose = () => {
        // Remise à vide des valeurs ToSupp à la fermeture
        setOpenSupp(false);
    };
    // Fonction qui effectue la requete de suppression 
    const suppression = (id) => {
        axios.delete(window.url + "/listeFamilles/delete/" + id)
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
            axios.get(window.url + "/listeFamilles")
                .then((res) => setFamilles(res.data))
        } else {
            axios.get(window.url + "/listeFamilles/search/" + recherche)
                .then((res) => setFamilles(res.data))
        }
    }


    if (localStorage.getItem('profil') === '1') {
        return (
            <div>
                <Navigation />
                <h1>Liste des familles</h1>
                <div>
                    <NavLink to='/nouvelleFamille' className={(nav) => (nav.isActive ? "nav-active" : "")}>
                        <li>Ajouter une famille</li>
                    </NavLink>
                    {/* Module de recherche */}
                    <input type="text"
                        value={recherche}
                        placeholder='Recherche'
                        onChange={(e) => setRecherche((v) => e.target.validity.valid ? e.target.value : v)}
                    />
                    <button onClick={search}>Rechercher</button>
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
                            <th>Suppression</th>
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
                                <td onClick={() => handleSuppOpen(id_famille)}>X</td>
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
                            <p>Voulez-vous vraiment supprimer cette famille ?</p>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleSuppClose} color="primary">
                            Annuler
                        </Button>
                        <Button onClick={() => suppression(toSupp[0].id_famille)} color="primary" autoFocus>
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
                            {ficheFamille.map(({
                                id_famille,
                                nom_famille,
                                materiaux,
                                id_fournisseur,
                                id_categorie,
                                nom_fournisseur,
                                nom_categorie,
                                pole
                            }) => (
                                <table className='tableauFT' id={"id_famille"}>
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
                                            <td>{id_famille}</td>
                                            <td></td>
                                        </tr>
                                        <tr >
                                            <td>NOM</td>
                                            <td>{nom_famille}</td>
                                            <td>
                                                <input
                                                    type="text"
                                                    name='nom_famille'
                                                    value={nom_familleToSend}
                                                    onChange={(e) =>
                                                        setNom_familleToSend((v) => (e.target.validity.valid ? e.target.value : v))
                                                    }
                                                />
                                            </td>
                                        </tr>
                                        <tr >
                                            <td>MATERIAUX</td>
                                            <td>{materiaux}</td>
                                            <td>
                                                <input
                                                    type="text"
                                                    name='materiaux'
                                                    value={materiauxToSend}
                                                    onChange={(e) =>
                                                        setMateriauxToSend((v) => (e.target.validity.valid ? e.target.value : v))
                                                    }
                                                />
                                            </td>
                                        </tr>
                                        <tr >
                                            <td>FOURNISSEUR</td>
                                            <td>{nom_fournisseur}</td>
                                            <td>
                                                <select name="choixFournisseur"
                                                    id="selectChoixFournisseur"
                                                    multiple={false}
                                                    value={id_fournisseurToSend}
                                                    onChange={fournisseurHandleChange}>
                                                    {choixFournisseur.map(({ id_fournisseur, nom_fournisseur }) => (
                                                        <option value={id_fournisseur}>{nom_fournisseur}</option>
                                                    ))}
                                                </select>
                                            </td>
                                        </tr>
                                        <tr >
                                            <td>CATEGORIE</td>
                                            <td>{nom_categorie}</td>
                                            <td>
                                                <select name="choixCategorie"
                                                    id="selectChoixCategorie"
                                                    multiple={false}
                                                    value={id_categorieToSend}
                                                    onChange={categorieHandleChange}>
                                                    {choixCategorie.map(({ id_categorie, nom_categorie, pole }) => (
                                                        <option value={id_categorie}>{nom_categorie + " - " + pole}</option>
                                                    ))}
                                                </select>
                                            </td>
                                        </tr>
                                        <tr key={pole}>
                                            <td>POLE</td>
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

            </div>
        );
    }
    else if (localStorage.getItem('profil') === '2') {
        return (
            <div>
                <Navigation />
                <h1>Liste des familles</h1>
                <div>
                    <NavLink to='/nouvelleFamille' className={(nav) => (nav.isActive ? "nav-active" : "")}>
                        <li>Ajouter une famille</li>
                    </NavLink>
                    {/* Module de recherche */}
                    <input type="text"
                        value={recherche}
                        placeholder='Recherche'
                        onChange={(e) => setRecherche((v) => e.target.validity.valid ? e.target.value : v)}
                    />
                    <button onClick={search}>Rechercher</button>
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

                <Dialog className='dialog' open={open} onClose={handleClose}>
                    <DialogTitle>
                        Fiche famille
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {ficheFamille.map(({
                                id_famille,
                                nom_famille,
                                materiaux,
                                id_fournisseur,
                                id_categorie,
                                nom_fournisseur,
                                nom_categorie,
                                pole
                            }) => (
                                <table className='tableauFT' id={"id_famille"}>
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
                                            <td>{id_famille}</td>
                                            <td></td>
                                        </tr>
                                        <tr >
                                            <td>NOM</td>
                                            <td>{nom_famille}</td>
                                            <td>
                                                <input
                                                    type="text"
                                                    name='nom_famille'
                                                    value={nom_familleToSend}
                                                    onChange={(e) =>
                                                        setNom_familleToSend((v) => (e.target.validity.valid ? e.target.value : v))
                                                    }
                                                />
                                            </td>
                                        </tr>
                                        <tr >
                                            <td>MATERIAUX</td>
                                            <td>{materiaux}</td>
                                            <td>
                                                <input
                                                    type="text"
                                                    name='materiaux'
                                                    value={materiauxToSend}
                                                    onChange={(e) =>
                                                        setMateriauxToSend((v) => (e.target.validity.valid ? e.target.value : v))
                                                    }
                                                />
                                            </td>
                                        </tr>
                                        <tr >
                                            <td>FOURNISSEUR</td>
                                            <td>{nom_fournisseur}</td>
                                            <td>
                                                <select name="choixFournisseur"
                                                    id="selectChoixFournisseur"
                                                    multiple={false}
                                                    value={id_fournisseurToSend}
                                                    onChange={fournisseurHandleChange}>
                                                    {choixFournisseur.map(({ id_fournisseur, nom_fournisseur }) => (
                                                        <option value={id_fournisseur}>{nom_fournisseur}</option>
                                                    ))}
                                                </select>
                                            </td>
                                        </tr>
                                        <tr >
                                            <td>CATEGORIE</td>
                                            <td>{nom_categorie}</td>
                                            <td>
                                                <select name="choixCategorie"
                                                    id="selectChoixCategorie"
                                                    multiple={false}
                                                    value={id_categorieToSend}
                                                    onChange={categorieHandleChange}>
                                                    {choixCategorie.map(({ id_categorie, nom_categorie, pole }) => (
                                                        <option value={id_categorie}>{nom_categorie + " - " + pole}</option>
                                                    ))}
                                                </select>
                                            </td>
                                        </tr>
                                        <tr key={pole}>
                                            <td>POLE</td>
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

            </div>
        );
    } else {
        return (
            <div>
                <Navigation />
                <h1>Liste des familles</h1>
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

                <Dialog className='dialog' open={open} onClose={handleClose}>
                    <DialogTitle>
                        Fiche famille
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {ficheFamille.map(({
                                id_famille,
                                nom_famille,
                                materiaux,
                                id_fournisseur,
                                id_categorie,
                                nom_fournisseur,
                                nom_categorie,
                                pole
                            }) => (
                                <table className='tableauFT' id={"id_famille"}>
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
                                            <td>{id_famille}</td>
                                            <td></td>
                                        </tr>
                                        <tr >
                                            <td>NOM</td>
                                            <td>{nom_famille}</td>
                                            <td>
                                                <input
                                                    type="text"
                                                    name='nom_famille'
                                                    value={nom_familleToSend}
                                                    onChange={(e) =>
                                                        setNom_familleToSend((v) => (e.target.validity.valid ? e.target.value : v))
                                                    }
                                                />
                                            </td>
                                        </tr>
                                        <tr >
                                            <td>MATERIAUX</td>
                                            <td>{materiaux}</td>
                                            <td>
                                                <input
                                                    type="text"
                                                    name='materiaux'
                                                    value={materiauxToSend}
                                                    onChange={(e) =>
                                                        setMateriauxToSend((v) => (e.target.validity.valid ? e.target.value : v))
                                                    }
                                                />
                                            </td>
                                        </tr>
                                        <tr >
                                            <td>FOURNISSEUR</td>
                                            <td>{nom_fournisseur}</td>
                                            <td>
                                                <select name="choixFournisseur"
                                                    id="selectChoixFournisseur"
                                                    multiple={false}
                                                    value={id_fournisseurToSend}
                                                    onChange={fournisseurHandleChange}>
                                                    {choixFournisseur.map(({ id_fournisseur, nom_fournisseur }) => (
                                                        <option value={id_fournisseur}>{nom_fournisseur}</option>
                                                    ))}
                                                </select>
                                            </td>
                                        </tr>
                                        <tr >
                                            <td>CATEGORIE</td>
                                            <td>{nom_categorie}</td>
                                            <td>
                                                <select name="choixCategorie"
                                                    id="selectChoixCategorie"
                                                    multiple={false}
                                                    value={id_categorieToSend}
                                                    onChange={categorieHandleChange}>
                                                    {choixCategorie.map(({ id_categorie, nom_categorie, pole }) => (
                                                        <option value={id_categorie}>{nom_categorie + " - " + pole}</option>
                                                    ))}
                                                </select>
                                            </td>
                                        </tr>
                                        <tr key={pole}>
                                            <td>POLE</td>
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

            </div>
        );
    }
};




export default Famille;
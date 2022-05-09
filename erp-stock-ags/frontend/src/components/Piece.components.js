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
    const [open, setOpen] = React.useState(false);

    // Variable qui vont pouvoir être envoyée pour 
    // L'adaptation de la fiche technique
    // const [referenceToSend, setReferenceToSend] = useState([])
    const [referenceToSend, setReferenceToSend] = useState([])
    const [id_familleToSend, setId_familleToSend] = useState([])
    const [id_finitionToSend, setId_finitionToSend] = useState([])
    const [longueurToSend, setLongueurToSend] = useState([])
    const [largeurToSend, setLargeurToSend] = useState([])
    const [hauteurToSend, setHauteurToSend] = useState([])
    const [rayonToSend, setRayonToSend] = useState([])
    const [poidsToSend, setPoidsToSend] = useState([])


    // // Dimension à afficher dans la fiche technique
    // const [longueurFT, setLongueurFT] = useState([])
    // const [largeurFT, setLargeurFT] = useState([])
    // const [hauteurFT, setHauteurFT] = useState([])
    // const [profondeurFT, setProfondeurFT] = useState([])
    // const [rayonFT, setRayonFT] = useState([])

    // Variable qui vont contenir les différentes possibilité de la fiche technique
    const [choixFamille, setChoixFamille] = useState([])
    const [choixFinition, setChoixFinition] = useState([])

    //Fiche technique modifiée à envoyé
    const aEnvoyer = {
        referenceToSend,
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
        setOpen(true);
        // Requête pour aller chercher la fiche technique
        axios.get(window.url + "/listePieces/" + v)
            .then((res) => setFicheTechnique(res.data))
    };
    // Fonction pour fermer la boîte de dialogue
    const handleClose = () => {
        setOpen(false);
    };
    const sendToAPI = () => {
        console.log("Modif", aEnvoyer)

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

    // Fonctions pour récupérer la valeur des choix déroulants sélectionnés
    // et les appliquer au attributs de la pièces
    const familleHandleChange = (e) => {
        setId_familleToSend((v) => (e.target.validity.valid ? e.target.value : v))
    }
    const finitionHandleChange = (e) => {
        setId_finitionToSend((v) => (e.target.validity.valid ? e.target.value : v))
    }



    return (
        <div>
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
                    {data.map(({ reference, nom_famille, valeur_seuil, quantite_en_stock }) => (
                        <tr key={reference} >
                            <td onClick={() => handleClickOpen(reference)}>
                                {reference}</td>
                            <td>{nom_famille}</td>
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
            {/* {ficheTecnhiqueVisible && <div>
                <FicheTechnique />
                <button onClick={ShowTable}>Retour</button>
            </div>} */}
            <div>
                <Dialog className='dialog' open={open} onClose={handleClose}>
                    <DialogTitle>
                        Fiche technique
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {ficheTechniques.map(({
                                reference,
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
                                < div >
                                    <table className='tableauFT'>
                                        <thead>
                                            <tr>
                                                <th>                </th>
                                                <th>Valeure actuelle</th>
                                                <th>Modification</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr key={reference}>
                                                <td>Référence</td>
                                                <td>{reference}</td>
                                                <td>
                                                    <input
                                                        className='hidden'
                                                        type="text"
                                                        name='Reference'
                                                        pattern="[0-9]*"
                                                        value={reference}
                                                        onChange={(e) =>
                                                            setReferenceToSend((v) => (e.target.validity.valid ? e.target.value : v))
                                                        }
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Famille</td>
                                                <td>{nom_famille} - {materiaux}</td>
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
                                                <td>Catégorie</td>
                                                <td>{nom_categorie + " - " + pole}</td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Fournisseur </td>
                                                <td>{nom_fournisseur}</td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Finition</td>
                                                <td>
                                                    {nom_finition + " - " + effet_finition}
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
                                        </tbody>
                                    </table>
                                </div>

                            ))}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Close
                        </Button>
                        <Button onClick={sendToAPI} color="primary" autoFocus>
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div >
    );
};

export default Piece;
import React, { useEffect, useState } from 'react';
import axios from "axios"
import AjoutPieces from './AjoutPieces.components';
import '../GlobalData'
import FicheTechnique from '../components/FicheTechnique.components';
import { useNavigate } from 'react-router-dom';

const Piece = () => {

    function refreshPage() {
        window.location.reload();
    }

    // data contient la liste des pièces récupérée depuis la db
    const [data, setData] = useState([])
    // fiche technique contient la liste des fiches techniques des pièces
    const [ficheTechniques, setFicheTechnique] = useState([])

    // const [tableVisible, setTableVisible] = useState(true)
    // const [ficheTecnhiqueVisible, setFicheTechniqueVisible] = useState(false);

    // Le useEffect se joue quand le composant est monté 
    // Requete pour récupérer la liste des pièces
    useEffect(() => {
        axios.get(window.url + "/listePieces")
            .then((res) => setData(res.data))
    }, [])

    useEffect(() => {
        axios.get(window.url + "/ficheTechnique")
            .then((res) => setFicheTechnique(res.data))
    }, [])

    // const navigate = useNavigate();
    // const GoToFicheTechnique = (ref) => {
    //     navigate('/ficheTechnique/');
    //     //console.log(ref)

    // }

    // const HideTable = () => {
    //     setFicheTechniqueVisible = true;
    //     setTableVisible = false;
    //     refreshPage();
    // }

    // const ShowTable = () => {
    //     setFicheTechniqueVisible = false;
    //     setTableVisible = true;
    //     refreshPage();
    // }

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
                            {/* <td onClick={(e) => (HideTable)}>{reference}</td> */}
                            <td>{reference}</td>
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
        </div>
    );
};

export default Piece;
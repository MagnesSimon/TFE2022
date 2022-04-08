import React, { useState } from 'react';
import Navigation from '../components/Navigation';

const TestPage = () => {

    const [ref, setRef] = useState([])
    const [seuil, setSeuil] = useState([])
    const [quantite, setQuantite] = useState([])
    const [finition, setFinition] = useState([])
    const [categorie, setCategorie] = useState([])
    const [famille, setFamille] = useState([])
    // const Ajouter = () => {
    //     console.log(value);
    // }

    const Envoyer = () => {
        console.log("ref: " + ref +
            " seuil " + seuil +
            " quantite " + quantite +
            " finition " + finition +
            " categorie " + categorie +
            " famille " + famille);
    }

    return (

        <div>
            <Navigation />
            <form>
                <label>
                    Ref (ADD100) :
                    <input type="text"
                        name="ref"
                        value={ref}
                        onChange={(e) =>
                            setRef((v) => (e.target.validity.valid ? e.target.value : v))
                        } />
                </label>
                <label>
                    Valeur seuil :
                    <input
                        type="text"
                        name='seuil'
                        pattern="[0-9]*"
                        value={seuil}
                        onChange={(e) =>
                            setSeuil((v) => (e.target.validity.valid ? e.target.value : v))
                        }
                    />
                </label>
                <label>
                    Quantité :
                    <input
                        type="text"
                        name='quantite'
                        pattern="[0-9]*"
                        value={quantite}
                        onChange={(e) =>
                            setQuantite((v) => (e.target.validity.valid ? e.target.value : v))
                        }
                    />
                </label>
                <label>
                    id finition (1) :
                    <input
                        type="text"
                        name='finition'
                        pattern="[0-9]*"
                        value={finition}
                        onChange={(e) =>
                            setFinition((v) => (e.target.validity.valid ? e.target.value : v))
                        }
                    />
                </label>
                <label>
                    id catégorie (1) :
                    <input
                        type="text"
                        name='categorie'
                        pattern="[0-9]*"
                        value={categorie}
                        onChange={(e) =>
                            setCategorie((v) => (e.target.validity.valid ? e.target.value : v))
                        }
                    />
                </label>
                <label>
                    id famille (1) :
                    <input
                        type="text"
                        name='famille'
                        pattern="[0-9]*"
                        value={famille}
                        onChange={(e) =>
                            setFamille((v) => (e.target.validity.valid ? e.target.value : v))
                        }
                    />
                </label>
                <input onClick={Envoyer} />
            </form>

            {/* <input
                type="text"
                pattern="[0-9]*"
                value={value}
                onChange={(e) =>
                    setValue((v) => (e.target.validity.valid ? e.target.value : v))
                }
            />
                <button onClick={Ajouter}>Add</button> */}
        </div>
    );
};

export default TestPage;
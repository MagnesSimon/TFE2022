import React from 'react';

const test = () => {
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

export default test;
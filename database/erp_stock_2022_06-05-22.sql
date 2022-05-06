-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 06 mai 2022 à 16:17
-- Version du serveur : 5.7.36
-- Version de PHP : 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `erp_stock_2022`
--

-- --------------------------------------------------------

--
-- Structure de la table `categorie`
--

DROP TABLE IF EXISTS `categorie`;
CREATE TABLE IF NOT EXISTS `categorie` (
  `id_categorie` int(11) NOT NULL AUTO_INCREMENT,
  `nom_categorie` varchar(255) NOT NULL,
  `pole` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`id_categorie`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `categorie`
--

INSERT INTO `categorie` (`id_categorie`, `nom_categorie`, `pole`) VALUES
(1, 'catégorie test', 'Petits accessoirs'),
(2, 'Ustensile pour porte  en verre', NULL),
(3, 'Cadran', 'Grands accessoires'),
(4, 'Porte', 'Grands accessoires');

-- -------------------------------------------------------

--
-- Structure de la table `famille`
--

DROP TABLE IF EXISTS `famille`;
CREATE TABLE IF NOT EXISTS `famille` (
  `id_famille` int(11) NOT NULL AUTO_INCREMENT,
  `nom_famille` varchar(25) NOT NULL,
  `materiaux` varchar(25) DEFAULT NULL,
  `id_fournisseur` int(11) NOT NULL,
  PRIMARY KEY (`id_famille`),
  KEY `fk1_famille` (`id_fournisseur`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `famille`
--

INSERT INTO `famille` (`id_famille`, `nom_famille`, `materiaux`, `id_fournisseur`) VALUES
(1, 'famille test', 'materieux test', 1),
(2, 'Poignée', 'zinc', 1),
(9, 'Ornement', 'plastique', 1),
(10, 'Poignée', 'Bois', 2),
(11, 'Encoche', 'plastique', 4);

-- --------------------------------------------------------

--
-- Structure de la table `finition`
--

DROP TABLE IF EXISTS `finition`;
CREATE TABLE IF NOT EXISTS `finition` (
  `id_finition` int(11) NOT NULL AUTO_INCREMENT,
  `nom_finition` varchar(25) NOT NULL,
  `effet_finition` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`id_finition`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `finition`
--

INSERT INTO `finition` (`id_finition`, `nom_finition`, `effet_finition`) VALUES
(1, 'finition test', 'effet test'),
(2, 'Aluminium', 'Poli'),
(3, 'Aluminium', 'Brossé'),
(4, 'Bois', 'Brossé'),
(5, 'Zinc', 'Brillant'),
(6, 'Bronze', 'Lisse');

-- --------------------------------------------------------

--
-- Structure de la table `fonctionnalite`
--

DROP TABLE IF EXISTS `fonctionnalite`;
CREATE TABLE IF NOT EXISTS `fonctionnalite` (
  `id_fonctionnalite` int(11) NOT NULL AUTO_INCREMENT,
  `libelle_fonctionnalite` varchar(25) NOT NULL,
  `description_fonctionnalite` varchar(255) NOT NULL,
  `id_profil` int(11) NOT NULL,
  PRIMARY KEY (`id_fonctionnalite`),
  KEY `fk1_fonctionnalite` (`id_profil`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `fonctionnalite`
--

INSERT INTO `fonctionnalite` (`id_fonctionnalite`, `libelle_fonctionnalite`, `description_fonctionnalite`, `id_profil`) VALUES
(1, 'fonctionnalité test', 'test de descriiption', 1);

-- --------------------------------------------------------

--
-- Structure de la table `fournisseur`
--

DROP TABLE IF EXISTS `fournisseur`;
CREATE TABLE IF NOT EXISTS `fournisseur` (
  `id_fournisseur` int(11) NOT NULL AUTO_INCREMENT,
  `nom_fournisseur` varchar(25) NOT NULL,
  `mail_fournisseur` varchar(25) NOT NULL,
  `tel_fournisseur` int(12) NOT NULL,
  `adresse_fournisseur` varchar(255) NOT NULL,
  `id_localite` int(11) NOT NULL,
  PRIMARY KEY (`id_fournisseur`),
  KEY `fk1_fournisseur` (`id_localite`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `fournisseur`
--

INSERT INTO `fournisseur` (`id_fournisseur`, `nom_fournisseur`, `mail_fournisseur`, `tel_fournisseur`, `adresse_fournisseur`, `id_localite`) VALUES
(1, 'fournisseur test', 'mail@fournisseur.be', 479123654, 'ru du fournisseur 42', 7041),
(2, 'Royal Glass', 'mai@mail.be', 479123654, 'rue de glass, 63', 8491),
(3, 'Logi Massimo', 'logi@mail.be', 479856365, 'Rue de logis, 9', 7065),
(4, 'Géant Verre', 'mail@geantverre.be', 0, 'Rue du bonduelle 3', 6986);

-- --------------------------------------------------------

--
-- Structure de la table `historique`
--

DROP TABLE IF EXISTS `historique`;
CREATE TABLE IF NOT EXISTS `historique` (
  `id_fiche_historique` int(11) NOT NULL AUTO_INCREMENT,
  `quantite_modifie` int(11) NOT NULL,
  `date_heure` datetime NOT NULL,
  `reference` varchar(10) NOT NULL,
  `id_utilisateur` int(11) NOT NULL,
  PRIMARY KEY (`id_fiche_historique`),
  KEY `fk1_historique` (`reference`),
  KEY `fk2_historique` (`id_utilisateur`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `historique`
--

INSERT INTO `historique` (`id_fiche_historique`, `quantite_modifie`, `date_heure`, `reference`, `id_utilisateur`) VALUES
(1, 0, '2022-03-18 16:10:10', 'TST100', 1);

-- --------------------------------------------------------

--
-- Structure de la table `jeu_de_dimension`
--

-- DROP TABLE IF EXISTS `jeu_de_dimension`;
-- CREATE TABLE IF NOT EXISTS `jeu_de_dimension` (
--   `id_jeu_de_dimension` int(11) NOT NULL AUTO_INCREMENT,
--   `Longueur` int(11) DEFAULT NULL,
--   `Largeur` int(11) DEFAULT NULL,
--   `reference` varchar(10) DEFAULT NULL,
--   PRIMARY KEY (`id_jeu_de_dimension`),
--   KEY `fk2_jeu_de_dimension` (`reference`) USING BTREE,
--   KEY `fk1_jeu_de_dimension` (`Largeur`) USING BTREE
-- ) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- -- --------------------------------------------------------

--
-- Structure de la table `localite`
--

DROP TABLE IF EXISTS `localite`;
CREATE TABLE IF NOT EXISTS `localite` (
  `id_localite` int(11) NOT NULL AUTO_INCREMENT,
  `code_postal` int(11) NOT NULL default '0',
  `nom_localite` varchar(255) NOT NULL default '',
  PRIMARY KEY (`id_localite`)
) ENGINE=InnoDB AUTO_INCREMENT=9611 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `localite`
--

INSERT INTO `localite` (`id_localite`, `code_postal`, `localite`) VALUES


-- --------------------------------------------------------

--
-- Structure de la table `piece`
--

DROP TABLE IF EXISTS `piece`;
CREATE TABLE IF NOT EXISTS `piece` (
  `reference` varchar(10) NOT NULL,
  `valeur_seuil` int(11) DEFAULT '0',
  `quantite_en_stock` int(11) DEFAULT '0',
  `id_finition` int(11) NOT NULL,
  `id_categorie` int(11) NOT NULL,
  `id_famille` int(11) NOT NULL,
  PRIMARY KEY (`reference`),
  KEY `fk1_piece` (`id_finition`) USING BTREE,
  KEY `fk2_piece` (`id_categorie`) USING BTREE,
  KEY `fk3_piece` (`id_famille`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `piece`
--

INSERT INTO `piece` (`reference`, `valeur_seuil`, `quantite_en_stock`, `id_finition`, `id_categorie`, `id_famille`) VALUES
('ADD100', 14, 28, 1, 1, 1),
('ADD101', 14, 5, 1, 1, 1),
('ADD102', 14, 6295, 1, 1, 1),
('ADD103', 14, 15, 1, 1, 1),
('ADD104', 14, 15, 1, 1, 1),
('ADD201', 78, 1654, 1, 1, 1),
('ADD202', 78, 1654, 1, 1, 1),
('CHOIX200', 14, 2, 3, 2, 2),
('ENV100', 50, 30, 3, 3, 10),
('JU123', 45, 16, 3, 2, 2),
('NAV100', 66, 65, 1, 1, 1),
('NAV101', 0, 9, 1, 1, 1),
('NAV102', 14, 65, 1, 1, 1),
('TSP', 10, 2, 1, 1, 1),
('TST100', 12, 27, 1, 1, 1),
('TST201', 4, 20, 1, 1, 1),
('TST203', 50, 8, 1, 1, 1),
('TST204', 0, 0, 1, 1, 1),
('TST205', 56, 13, 1, 1, 1),
('TST301', 0, 0, 1, 1, 1),
('VEIL100', 100, 99, 4, 3, 10),
('VEIL200', 100, 101, 3, 2, 9);

-- --------------------------------------------------------

--
-- Structure de la table `profil`
--

DROP TABLE IF EXISTS `profil`;
CREATE TABLE IF NOT EXISTS `profil` (
  `id_profil` int(11) NOT NULL AUTO_INCREMENT,
  `libelle_profil` varchar(25) NOT NULL,
  PRIMARY KEY (`id_profil`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `profil`
--

INSERT INTO `profil` (`id_profil`, `libelle_profil`) VALUES
(1, 'profil test');

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
CREATE TABLE IF NOT EXISTS `utilisateur` (
  `id_utilisateur` int(11) NOT NULL AUTO_INCREMENT,
  `nom_utilisateur` varchar(25) NOT NULL,
  `mot_de_passe` varchar(25) NOT NULL,
  `prenom_utilisateur` varchar(25) NOT NULL,
  `nom_famille_utilisateur` varchar(25) NOT NULL,
  `telephone_utilisateur` varchar(12) NOT NULL,
  `id_profil` int(11) NOT NULL,
  PRIMARY KEY (`id_utilisateur`),
  KEY `fk1_utilisateur` (`id_profil`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`id_utilisateur`, `nom_utilisateur`, `mot_de_passe`, `prenom_utilisateur`, `nom_famille_utilisateur`, `telephone_utilisateur`, `id_profil`) VALUES
(1, 'utilisateur test', 'pswtest', 'prénom test', 'nom de famille test', '', 1);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `famille`
--
ALTER TABLE `famille`
  ADD CONSTRAINT `famille_ibfk_1` FOREIGN KEY (`id_fournisseur`) REFERENCES `fournisseur` (`id_fournisseur`) ON UPDATE CASCADE;

--
-- Contraintes pour la table `fonctionnalite`
--
ALTER TABLE `fonctionnalite`
  ADD CONSTRAINT `fonctionnalite_ibfk_1` FOREIGN KEY (`id_profil`) REFERENCES `profil` (`id_profil`) ON UPDATE CASCADE;

--
-- Contraintes pour la table `fournisseur`
--
ALTER TABLE `fournisseur`
  ADD CONSTRAINT `fournisseur_ibfk_1` FOREIGN KEY (`id_localite`) REFERENCES `localite` (`id_localite`) ON UPDATE CASCADE;

--
-- Contraintes pour la table `historique`
--
ALTER TABLE `historique`
  ADD CONSTRAINT `historique_ibfk_1` FOREIGN KEY (`reference`) REFERENCES `piece` (`reference`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `historique_ibfk_2` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateur` (`id_utilisateur`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- --
-- -- Contraintes pour la table `jeu_de_dimension`
-- --
-- ALTER TABLE `jeu_de_dimension`
--   ADD CONSTRAINT `jeu_de_dimension_ibfk_1` FOREIGN KEY (`Largeur`) REFERENCES `dimension` (`valeur`) ON UPDATE CASCADE,
--   ADD CONSTRAINT `jeu_de_dimension_ibfk_2` FOREIGN KEY (`reference`) REFERENCES `piece` (`reference`) ON UPDATE CASCADE;

--
-- Contraintes pour la table `piece`
--
ALTER TABLE `piece`
  ADD CONSTRAINT `piece_ibfk_1` FOREIGN KEY (`id_finition`) REFERENCES `finition` (`id_finition`) ON UPDATE CASCADE,
  ADD CONSTRAINT `piece_ibfk_2` FOREIGN KEY (`id_categorie`) REFERENCES `categorie` (`id_categorie`) ON UPDATE CASCADE,
  ADD CONSTRAINT `piece_ibfk_3` FOREIGN KEY (`id_famille`) REFERENCES `famille` (`id_famille`) ON UPDATE CASCADE;

--
-- Contraintes pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD CONSTRAINT `utilisateur_ibfk_1` FOREIGN KEY (`id_profil`) REFERENCES `profil` (`id_profil`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

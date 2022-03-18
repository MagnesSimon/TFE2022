-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : sam. 12 mars 2022 à 16:45
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
  `nom_categorie` varchar(25) NOT NULL,
  PRIMARY KEY (`id_categorie`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `dimension`
--

DROP TABLE IF EXISTS `dimension`;
CREATE TABLE IF NOT EXISTS `dimension` (
  `valeur` int(11) NOT NULL,
  PRIMARY KEY (`valeur`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

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
  KEY `famille_ibfk_1` (`id_fournisseur`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

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
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

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
  KEY `fonctionnalite_ibfk_1` (`id_profil`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `fournisseur`
--

DROP TABLE IF EXISTS `fournisseur`;
CREATE TABLE IF NOT EXISTS `fournisseur` (
  `id_fournisseur` int(11) NOT NULL AUTO_INCREMENT,
  `nom_fournisseur` varchar(25) NOT NULL,
  `mail_fournisseur` int(25) NOT NULL,
  `tel_fournisseur` int(12) NOT NULL,
  `adresse_fournisseur` int(255) NOT NULL,
  `code_postal` int(11) NOT NULL,
  PRIMARY KEY (`id_fournisseur`),
  KEY `fournisseur_ibfk_1` (`code_postal`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

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
  KEY `historique_ibfk_1` (`id_utilisateur`),
  KEY `historique_ibfk_2` (`reference`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `jeu_de_dimension`
--

DROP TABLE IF EXISTS `jeu_de_dimension`;
CREATE TABLE IF NOT EXISTS `jeu_de_dimension` (
  `id_jeu_de_dimension` int(11) NOT NULL,
  `libelle_jeu_de_dimension` int(11) NOT NULL,
  `valeur` int(11) NOT NULL,
  `reference` varchar(10) NOT NULL,
  KEY `jeu_de_dimension_ibfk_1` (`valeur`),
  KEY `jeu_de_dimension_ibfk_2` (`reference`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `localite`
--

DROP TABLE IF EXISTS `localite`;
CREATE TABLE IF NOT EXISTS `localite` (
  `code_postal` int(11) NOT NULL,
  `Localite` varchar(255) NOT NULL,
  PRIMARY KEY (`code_postal`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `piece`
--

DROP TABLE IF EXISTS `piece`;
CREATE TABLE IF NOT EXISTS `piece` (
  `reference` varchar(10) NOT NULL,
  `valeur_seuil` int(11) DEFAULT NULL,
  `quantite_en_stock` int(11) NOT NULL,
  `id_categorie` int(11) NOT NULL,
  `id_finition` int(11) NOT NULL,
  `id_famille` int(11) NOT NULL,
  PRIMARY KEY (`reference`),
  KEY `piece_ibfk_1` (`id_famille`),
  KEY `piece_ibfk_2` (`id_categorie`),
  KEY `piece_ibfk_3` (`id_finition`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `profil`
--

DROP TABLE IF EXISTS `profil`;
CREATE TABLE IF NOT EXISTS `profil` (
  `id_profil` int(11) NOT NULL AUTO_INCREMENT,
  `libelle_profil` varchar(25) NOT NULL,
  PRIMARY KEY (`id_profil`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

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
  KEY `utilisateur_ibfk_1` (`id_profil`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

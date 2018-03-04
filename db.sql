-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 04. Mrz 2018 um 22:14
-- Server-Version: 10.1.16-MariaDB
-- PHP-Version: 7.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `spacecombat`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `actions`
--

CREATE TABLE `actions` (
  `id` int(3) NOT NULL,
  `shipid` int(3) DEFAULT NULL,
  `turn` int(3) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `dist` int(4) DEFAULT NULL,
  `x` int(4) DEFAULT NULL,
  `y` int(4) DEFAULT NULL,
  `a` int(3) DEFAULT NULL,
  `cost` int(4) DEFAULT NULL,
  `delay` int(4) DEFAULT NULL,
  `costmod` float DEFAULT NULL,
  `resolved` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `actions`
--

INSERT INTO `actions` (`id`, `shipid`, `turn`, `type`, `dist`, `x`, `y`, `a`, `cost`, `delay`, `costmod`, `resolved`) VALUES
(1, 3, 1, 'deploy', 0, 549, 210, 180, 0, 0, 1, 1),
(2, 4, 1, 'deploy', 0, 528, -117, 180, 0, 0, 1, 1),
(3, 5, 1, 'deploy', 0, 536, 532, 180, 0, 0, 1, 1),
(4, 1, 1, 'deploy', 0, -535, 406, 0, 0, 0, 1, 1),
(5, 2, 1, 'deploy', 0, -545, -1, 0, 0, 0, 1, 1),
(6, 1, 1, 'jumpIn', 30, -511, 423, -10, 0, 0, 0, 1),
(7, 2, 1, 'jumpIn', 30, -572, -12, -13, 0, 0, 0, 1),
(8, 3, 1, 'jumpIn', 14, 556, 222, 14, 0, 0, 0, 1),
(9, 4, 1, 'jumpIn', 24, 515, -136, 2, 0, 0, 0, 1),
(10, 5, 1, 'jumpIn', 26, 558, 519, -8, 0, 0, 0, 1),
(11, 1, 1, 'turn', 0, -511, 423, 4, 4, 13, 1, 1),
(12, 1, 1, 'move', 155, -357, 407, 0, 0, 0, 1, 1),
(13, 2, 1, 'turn', 0, -572, -12, 12, 13, 41, 1, 1),
(14, 2, 1, 'move', 155, -417, -15, 0, 0, 0, 1, 1),
(15, 3, 1, 'turn', 0, 556, 222, 30, 30, 105, 1, 1),
(16, 3, 1, 'move', 140, 455, 125, 0, 0, 0, 1, 1),
(17, 4, 1, 'turn', 0, 515, -136, 27, 28, 51, 1, 1),
(18, 4, 1, 'move', 165, 371, -216, 0, 0, 0, 1, 1),
(19, 5, 1, 'turn', 0, 558, 519, 30, 30, 56, 1, 1),
(20, 5, 1, 'move', 165, 405, 457, 0, 0, 0, 1, 1),
(21, 6, 2, 'deploy', 0, 411, 118, -171, 1, 0, 1, 1),
(22, 7, 2, 'deploy', 0, 411, 118, -171, 1, 0, 1, 1),
(23, 8, 2, 'deploy', 0, 351, -221, 166, 0, 0, 0, 1),
(24, 9, 2, 'deploy', 0, 402, 449, -150, 0, 0, 0, 1),
(25, 3, 2, 'turn', 0, 455, 125, -30, 30, 105, 1, 1),
(26, 3, 2, 'move', 139, 331, 62, 0, 0, 0, 1, 1),
(27, 3, 2, 'turn', 0, 331, 62, -21, 40, 7, 1, 1),
(28, 3, 2, 'move', 1, 330, 62, 0, 0, 0, 1, 1),
(29, 4, 2, 'move', 165, 227, -296, 0, 0, 0, 1, 1),
(30, 4, 2, 'turn', 0, 227, -296, -30, 60, 0, 1, 1),
(31, 5, 2, 'turn', 0, 405, 457, -30, 30, 56, 1, 1),
(32, 5, 2, 'move', 163, 253, 517, 0, 0, 0, 1, 1),
(33, 5, 2, 'turn', 0, 253, 517, 30, 59, 2, 1, 1),
(34, 5, 2, 'move', 2, 251, 516, 0, 0, 0, 1, 1),
(35, 8, 2, 'deploy', 0, 351, -221, 166, 0, 0, 0, 1),
(36, 9, 2, 'deploy', 0, 402, 449, -150, 0, 0, 0, 1),
(37, 1, 2, 'turn', 0, -357, 407, 7, 8, 24, 1, 1),
(38, 1, 2, 'move', 155, -202, 410, 0, 0, 0, 1, 1),
(39, 1, 2, 'turn', 0, -202, 410, 4, 8, 0, 1, 1),
(40, 2, 2, 'turn', 0, -417, -15, -22, 22, 71, 1, 1),
(41, 2, 2, 'move', 155, -274, -76, 0, 0, 0, 1, 1),
(42, 6, 2, 'move', 712, 328, 95, 196, 0, 0, 0, 1),
(43, 7, 2, 'move', 712, 328, 95, 196, 0, 0, 0, 1),
(44, 8, 2, 'move', 642, 239, -195, 167, 0, 0, 0, 1),
(45, 9, 2, 'move', 856, 311, 378, 218, 0, 0, 0, 1),
(46, 1, 3, 'move', 155, -48, 424, 0, 0, 0, 1, 1),
(47, 1, 3, 'turn', 0, -48, 424, -9, 20, 0, 1, 1),
(48, 2, 3, 'move', 146, -155, -162, 0, 0, 0, 1, 1),
(49, 2, 3, 'turn', 0, -155, -162, 21, 40, 9, 1, 1),
(50, 2, 3, 'move', 9, -146, -162, 0, 0, 0, 1, 1),
(51, 3, 3, 'turn', 0, 330, 62, 30, 30, 105, 1, 1),
(52, 3, 3, 'move', 140, 201, 7, 0, 0, 0, 1, 1),
(53, 3, 3, 'turn', 0, 201, 7, 8, 18, 0, 1, 1),
(54, 4, 3, 'speed', 1, 227, -296, 0, 35, 0, 1, 1),
(55, 4, 3, 'move', 185, 42, -293, 0, 0, 0, 1, 1),
(56, 4, 3, 'turn', 0, 42, -293, -30, 68, 0, 1, 1),
(57, 5, 3, 'turn', 0, 251, 516, -18, 19, 34, 1, 1),
(58, 5, 3, 'move', 165, 86, 504, 0, 0, 0, 1, 1),
(59, 5, 3, 'turn', 0, 86, 504, 30, 60, 0, 1, 1),
(60, 6, 3, 'move', 540, 177, 13, 208, 0, 0, 0, 1),
(61, 7, 3, 'move', 540, 177, 13, 208, 0, 0, 0, 1),
(62, 8, 3, 'move', 387, 10, -175, 175, 0, 0, 0, 1),
(63, 9, 3, 'move', 708, 162, 202, 230, 0, 0, 0, 1),
(64, 1, 4, 'turn', 0, -48, 424, -30, 30, 97, 1, 1),
(65, 1, 4, 'move', 97, 32, 370, 0, 0, 0, 1, 1),
(66, 1, 4, 'turn', 0, 32, 370, -30, 43, 58, 1, 1),
(67, 1, 4, 'move', 58, 57, 318, 0, 0, 0, 1, 1),
(68, 2, 4, 'turn', 0, -146, -162, 21, 21, 67, 1, 1),
(69, 2, 4, 'move', 155, 1, -112, 0, 0, 0, 1, 1),
(70, 3, 4, 'turn', 0, 201, 7, 30, 30, 105, 1, 1),
(71, 3, 4, 'move', 140, 133, -115, 0, 0, 0, 1, 1),
(72, 3, 4, 'turn', 0, 133, -115, -30, 40, 70, 1, 1),
(73, 4, 4, 'turn', 0, 42, -293, 30, 34, 62, 1, 1),
(74, 4, 4, 'move', 185, -143, -290, 0, 0, 0, 1, 1),
(75, 5, 4, 'move', 165, -51, 412, 0, 0, 0, 1, 1),
(76, 6, 4, 'move', 216, 1, -112, 215, 0, 0, 0, 1),
(77, 7, 4, 'move', 216, 1, -112, 215, 0, 0, 0, 1),
(78, 8, 4, 'move', 64, 1, -112, 98, 0, 0, 0, 1),
(79, 9, 4, 'move', 353, 5, -105, 243, 0, 0, 0, 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `chat`
--

CREATE TABLE `chat` (
  `id` int(5) NOT NULL,
  `username` varchar(30) DEFAULT NULL,
  `userid` int(3) DEFAULT NULL,
  `msg` varchar(255) DEFAULT NULL,
  `time` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `damages`
--

CREATE TABLE `damages` (
  `id` int(5) NOT NULL,
  `fireid` int(5) DEFAULT NULL,
  `gameid` int(5) DEFAULT NULL,
  `shipid` int(5) DEFAULT NULL,
  `structureid` int(5) DEFAULT NULL,
  `systemid` int(3) DEFAULT NULL,
  `turn` int(3) DEFAULT NULL,
  `roll` int(3) DEFAULT NULL,
  `type` varchar(20) DEFAULT NULL,
  `totalDmg` int(5) DEFAULT NULL,
  `shieldDmg` int(5) DEFAULT NULL,
  `structDmg` int(5) DEFAULT NULL,
  `armourDmg` int(3) DEFAULT NULL,
  `emDmg` int(3) DEFAULT '0',
  `overkill` int(3) DEFAULT NULL,
  `negation` int(4) DEFAULT NULL,
  `destroyed` tinyint(1) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `new` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `damages`
--

INSERT INTO `damages` (`id`, `fireid`, `gameid`, `shipid`, `structureid`, `systemid`, `turn`, `roll`, `type`, `totalDmg`, `shieldDmg`, `structDmg`, `armourDmg`, `emDmg`, `overkill`, `negation`, `destroyed`, `notes`, `new`) VALUES
(1, 2, 1, 3, 21, 1, 1, 38, 'Laser', 113, 0, 0, 21, 0, 35, 21, 0, 'p;', 0),
(2, 4, 1, 3, 21, 1, 1, 19, 'Laser', 106, 0, 0, 20, 0, 33, 20, 0, 'p;', 0),
(3, 2, 1, 3, 21, 26, 1, 38, 'Laser', 113, 0, 45, 11, 0, 0, 11, 0, 'p;', 0),
(4, 4, 1, 3, 21, 26, 1, 19, 'Laser', 106, 0, 43, 10, 0, 0, 10, 0, 'p;', 0),
(5, 15, 1, 1, 14, 1, 2, 22, 'Particle', 37, 0, 0, 23, 0, 14, 23, 0, 'p;', 0),
(6, 13, 1, 2, 14, 16, 2, 9, 'Particle', 57, 0, 43, 14, 0, 0, 14, 0, 'p;', 0),
(7, 20, 1, 3, 6, 1, 2, 6, 'Particle', 49, 0, 0, 22, 0, 27, 22, 0, 'p;', 0),
(8, 21, 1, 4, 6, 7, 2, 5, 'Particle', 46, 0, 36, 10, 0, 0, 10, 0, 'p;', 0),
(9, 24, 1, 4, 6, 7, 2, 31, 'Particle', 48, 0, 12, 10, 0, 26, 10, 1, 'p;', 0),
(10, 22, 1, 4, 6, 8, 2, 21, 'Particle', 51, 0, 37, 14, 0, 0, 14, 0, 'p;', 0),
(11, 28, 1, 1, 14, 15, 3, 5, 'Particle', 61, 0, 47, 44, 0, 0, 14, 0, 'p;', 0),
(12, 26, 1, 2, 14, 1, 3, 18, 'Particle', 53, 0, 0, 22, 0, 31, 22, 0, 'p;', 0),
(13, 26, 1, 2, 14, 1, 3, 27, 'Particle', 62, 0, 0, 22, 0, 40, 22, 0, 'p;', 0),
(14, 25, 1, 2, 14, 17, 3, 82, 'Particle', 58, 0, 44, 14, 0, 0, 14, 0, 'p;', 0),
(15, 25, 1, 2, 14, 19, 3, 56, 'Particle', 54, 0, 41, 13, 0, 0, 13, 0, 'p;', 0),
(16, 34, 1, 3, 6, 7, 3, 13, 'Particle', 51, 0, 28, 9, 0, 14, 9, 1, 'p;o2;', 0),
(39, 36, 1, 2, 14, 1, 4, 93, 'Particle', 42, 0, 0, 21, 0, 21, 21, 0, 'p;', 0),
(40, 37, 1, 2, 22, 1, 4, 18, 'Particle', 39, 0, 0, 20, 0, 19, 20, 0, 'p;', 0),
(41, 39, 1, 2, 22, 1, 4, 81, 'Particle', 38, 0, 0, 20, 0, 18, 20, 0, 'p;', 0),
(42, 40, 1, 2, 14, 1, 4, 33, 'Particle', 41, 0, 0, 21, 0, 20, 21, 0, 'p;', 0),
(43, 42, 1, 2, 14, 1, 4, 40, 'Particle', 43, 0, 0, 20, 0, 23, 20, 0, 'p;', 0),
(44, 46, 1, 2, 14, 1, 4, 88, 'Particle', 39, 0, 0, 20, 0, 19, 20, 0, 'p;', 0),
(45, 51, 1, 2, 14, 1, 4, 64, 'Particle', 43, 0, 0, 19, 0, 24, 19, 0, 'p;', 0),
(46, 44, 1, 2, 6, 8, 4, 65, 'Particle', 40, 0, 26, 14, 0, 0, 14, 0, 'p;', 0),
(47, 47, 1, 2, 6, 8, 4, 27, 'Particle', 40, 0, 22, 13, 0, 5, 13, 1, 'p;o4;', 0),
(48, 43, 1, 2, 6, 10, 4, 70, 'Particle', 44, 0, 30, 14, 0, 0, 14, 0, 'p;', 0),
(49, 50, 1, 2, 6, 12, 4, 64, 'Particle', 38, 0, 24, 10, 0, 4, 10, 1, 'p;o3;', 0),
(50, 45, 1, 2, 14, 20, 4, 52, 'Particle', 38, 0, 24, 9, 0, 5, 9, 1, 'p;o3;', 0),
(51, 54, 1, 7, 0, 3, 4, 17, 'Particle', 20, 0, 0, 0, 15, 0, 5, 0, '', 0),
(52, 55, 1, 7, 0, 9, 4, 37, 'Particle', 78, 0, 0, 0, 73, 0, 5, 0, '', 0),
(53, 55, 1, 7, 0, 15, 4, 44, 'Particle', 66, 0, 0, 0, 61, 0, 5, 0, '', 0),
(54, 55, 1, 7, 0, 17, 4, 15, 'Particle', 77, 0, 0, 0, 72, 0, 5, 0, '', 0);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `deploys`
--

CREATE TABLE `deploys` (
  `id` int(4) NOT NULL,
  `gameid` int(4) DEFAULT '0',
  `userid` int(4) DEFAULT '0',
  `turn` int(2) DEFAULT '0',
  `phase` int(2) DEFAULT '0',
  `x` int(4) DEFAULT '0',
  `y` int(4) DEFAULT '0',
  `s` int(4) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `dogfights`
--

CREATE TABLE `dogfights` (
  `id` int(4) NOT NULL,
  `gameid` int(4) DEFAULT NULL,
  `turn` int(3) DEFAULT NULL,
  `a` int(4) DEFAULT NULL,
  `b` int(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `fireorders`
--

CREATE TABLE `fireorders` (
  `id` int(5) NOT NULL,
  `gameid` int(3) DEFAULT '0',
  `turn` int(3) DEFAULT '0',
  `shooterid` int(5) DEFAULT '0',
  `targetid` int(5) DEFAULT '0',
  `x` int(3) DEFAULT '0',
  `y` int(3) DEFAULT '0',
  `weaponid` int(5) DEFAULT '0',
  `shots` int(3) DEFAULT '0',
  `req` int(3) NOT NULL DEFAULT '0',
  `notes` varchar(255) NOT NULL DEFAULT '',
  `hits` int(3) NOT NULL DEFAULT '0',
  `resolved` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `fireorders`
--

INSERT INTO `fireorders` (`id`, `gameid`, `turn`, `shooterid`, `targetid`, `x`, `y`, `weaponid`, `shots`, `req`, `notes`, `hits`, `resolved`) VALUES
(1, 1, 1, 1, 3, 454, 118, 7, 1, 48, '82;', 0, 1),
(2, 1, 1, 1, 3, 454, 118, 15, 1, 48, '38;', 1, 1),
(3, 1, 1, 2, 3, 442, 126, 7, 1, 41, '78;', 0, 1),
(4, 1, 1, 2, 3, 442, 126, 15, 1, 41, '19;', 1, 1),
(5, 1, 1, 3, 2, -419, -5, 23, 2, 16, '58;68;', 0, 1),
(6, 1, 1, 3, 2, -419, -5, 25, 2, 16, '81;34;', 0, 1),
(7, 1, 2, 3, 0, NULL, NULL, 16, 0, 0, '', 0, 1),
(8, 1, 2, 3, 0, NULL, NULL, 26, 0, 0, '', 0, 1),
(9, 1, 2, 4, 2, -419, -6, 8, 3, 0, '', 0, 1),
(10, 1, 2, 5, 2, -423, -21, 8, 3, 0, '', 0, 1),
(11, 1, 2, 3, 2, -273, -58, 8, 2, 40, '85;44;', 0, 1),
(12, 1, 2, 3, 2, -273, -58, 9, 2, 40, '58;50;', 0, 1),
(13, 1, 2, 3, 2, -273, -58, 12, 2, 40, '9;85;', 1, 1),
(14, 1, 2, 3, 2, -273, -58, 14, 2, 40, '99;62;', 0, 1),
(15, 1, 2, 5, 1, -220, 414, 11, 2, 30, '22;77;', 1, 1),
(16, 1, 2, 5, 1, -220, 414, 14, 2, 30, '49;40;', 0, 1),
(17, 1, 2, 1, 3, 317, 42, 8, 1, 29, '94;', 0, 1),
(18, 1, 2, 1, 3, 317, 42, 9, 1, 29, '50;', 0, 1),
(19, 1, 2, 1, 3, 317, 42, 10, 1, 29, '71;', 0, 1),
(20, 1, 2, 1, 3, 317, 42, 11, 1, 29, '6;', 1, 1),
(21, 1, 2, 2, 4, 223, -289, 8, 1, 45, '5;', 1, 1),
(22, 1, 2, 2, 4, 223, -289, 9, 1, 45, '21;', 1, 1),
(23, 1, 2, 2, 4, 223, -289, 10, 1, 45, '71;', 0, 1),
(24, 1, 2, 2, 4, 223, -289, 11, 1, 45, '31;', 1, 1),
(25, 1, 3, 3, 2, -146, -162, 23, 2, 111, '82;56;', 2, 1),
(26, 1, 3, 3, 2, -146, -162, 25, 2, 111, '18;27;', 2, 1),
(27, 1, 3, 5, 1, -28, 444, 7, 1, 22, '67;', 0, 1),
(28, 1, 3, 5, 1, -28, 444, 9, 1, 22, '5;', 1, 1),
(29, 1, 3, 1, 5, 82, 499, 16, 1, 15, '95;', 0, 1),
(30, 1, 3, 1, 5, 82, 499, 17, 1, 15, '93;', 0, 1),
(31, 1, 3, 1, 5, 82, 499, 18, 1, 15, '72;', 0, 1),
(32, 1, 3, 1, 5, 82, 499, 19, 1, 15, '64;', 0, 1),
(33, 1, 3, 2, 3, 224, 21, 17, 1, 51, '60;', 0, 1),
(34, 1, 3, 2, 3, 224, 21, 18, 1, 51, '13;', 1, 1),
(35, 1, 3, 2, 3, 224, 21, 19, 1, 51, '84;', 0, 1),
(36, 1, 4, 6, 2, 0, 0, 2, 1, 97, '93;', 1, 1),
(37, 1, 4, 6, 2, 0, 0, 4, 1, 86, '18;', 1, 1),
(38, 1, 4, 6, 2, 0, 0, 6, 1, 86, '88;', 0, 1),
(39, 1, 4, 6, 2, 0, 0, 8, 1, 88, '81;', 1, 1),
(40, 1, 4, 6, 2, 0, 0, 10, 1, 91, '33;', 1, 1),
(41, 1, 4, 6, 2, 0, 0, 12, 1, 96, '99;', 0, 1),
(42, 1, 4, 6, 2, 0, 0, 14, 1, 93, '40;', 1, 1),
(43, 1, 4, 6, 2, 0, 0, 16, 1, 97, '70;', 1, 1),
(44, 1, 4, 6, 2, 0, 0, 18, 1, 90, '65;', 1, 1),
(45, 1, 4, 7, 2, 0, 0, 2, 1, 95, '52;', 1, 1),
(46, 1, 4, 7, 2, 0, 0, 4, 1, 89, '88;', 1, 1),
(47, 1, 4, 7, 2, 0, 0, 6, 1, 93, '27;', 1, 1),
(48, 1, 4, 7, 2, 0, 0, 8, 1, 92, '96;', 0, 1),
(49, 1, 4, 7, 2, 0, 0, 10, 1, 0, '', 0, 1),
(50, 1, 4, 7, 2, 0, 0, 12, 1, 90, '64;', 1, 1),
(51, 1, 4, 7, 2, 0, 0, 14, 1, 95, '64;', 1, 1),
(52, 1, 4, 7, 2, 0, 0, 16, 1, 0, '', 0, 1),
(53, 1, 4, 7, 2, 0, 0, 18, 1, 0, '', 0, 1),
(54, 1, 4, 2, 7, 0, 0, 12, 3, 46, '93;56;17;', 1, 1),
(55, 1, 4, 2, 7, 0, 0, 13, 3, 46, '15;44;37;', 3, 1),
(56, 1, 4, 2, 7, 0, 0, 20, 3, 46, '85;53;63;', 0, 1),
(57, 1, 4, 2, 7, 0, 0, 21, 3, 46, '65;88;94;', 0, 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `games`
--

CREATE TABLE `games` (
  `id` int(3) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `turn` int(3) DEFAULT NULL,
  `phase` int(3) DEFAULT NULL,
  `pv` int(5) DEFAULT NULL,
  `reinforce` int(5) DEFAULT NULL,
  `reinforceTurn` int(2) DEFAULT '11'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `games`
--

INSERT INTO `games` (`id`, `name`, `status`, `turn`, `phase`, `pv`, `reinforce`, `reinforceTurn`) VALUES
(1, 'myGame', 'active', 4, 3, 3000, 1500, 11);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `loads`
--

CREATE TABLE `loads` (
  `id` int(4) NOT NULL,
  `shipid` int(5) DEFAULT NULL,
  `systemid` int(3) DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL,
  `amount` int(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `loads`
--

INSERT INTO `loads` (`id`, `shipid`, `systemid`, `name`, `amount`) VALUES
(3, 4, 8, 'Javelin', 3),
(4, 5, 8, 'Javelin', 3);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `missions`
--

CREATE TABLE `missions` (
  `id` int(4) NOT NULL,
  `unitid` int(4) NOT NULL DEFAULT '0',
  `type` varchar(20) NOT NULL DEFAULT '1',
  `turn` int(1) NOT NULL DEFAULT '0',
  `targetid` int(4) NOT NULL DEFAULT '0',
  `x` int(4) NOT NULL DEFAULT '0',
  `y` int(4) NOT NULL DEFAULT '0',
  `arrived` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `missions`
--

INSERT INTO `missions` (`id`, `unitid`, `type`, `turn`, `targetid`, `x`, `y`, `arrived`) VALUES
(1, 6, '2', 2, 2, 1, -112, 4),
(2, 7, '2', 2, 2, 1, -112, 4),
(3, 8, '2', 2, 2, 1, -112, 4),
(4, 9, '2', 2, 2, 1, -112, 0);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `playerstatus`
--

CREATE TABLE `playerstatus` (
  `id` int(3) NOT NULL,
  `userid` int(3) DEFAULT NULL,
  `gameid` int(3) DEFAULT NULL,
  `turn` int(3) DEFAULT NULL,
  `phase` int(3) DEFAULT NULL,
  `faction` varchar(20) DEFAULT NULL,
  `value` int(5) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `playerstatus`
--

INSERT INTO `playerstatus` (`id`, `userid`, `gameid`, `turn`, `phase`, `faction`, `value`, `status`) VALUES
(1, 1, 1, 4, 3, 'Minbari Federation', 300, 'waiting'),
(2, 2, 1, 4, 3, 'Centauri Republic', 492, 'waiting');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `powers`
--

CREATE TABLE `powers` (
  `id` int(5) NOT NULL,
  `unitid` int(5) DEFAULT NULL,
  `systemid` int(5) DEFAULT NULL,
  `turn` int(2) DEFAULT NULL,
  `type` varchar(10) DEFAULT NULL,
  `cost` int(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `powers`
--

INSERT INTO `powers` (`id`, `unitid`, `systemid`, `turn`, `type`, `cost`) VALUES
(1, 3, 7, 2, '0', 0),
(2, 3, 10, 2, '0', 0),
(3, 3, 13, 2, '0', 0),
(4, 3, 15, 2, '0', 0),
(5, 3, 22, 2, '0', 0),
(6, 3, 23, 2, '1', 4),
(7, 3, 24, 2, '0', 0),
(8, 3, 25, 2, '1', 4),
(9, 3, 4, 2, '1', 3),
(10, 4, 8, 2, '1', 0),
(11, 4, 8, 2, '1', 0),
(12, 4, 8, 2, '1', 0),
(13, 5, 8, 2, '1', 0),
(14, 5, 8, 2, '1', 0),
(15, 5, 8, 2, '1', 0),
(16, 3, 13, 3, '0', 0),
(17, 3, 15, 3, '0', 0),
(18, 3, 22, 3, '0', 0),
(19, 3, 23, 3, '1', 4),
(20, 3, 24, 3, '0', 0),
(21, 3, 25, 3, '1', 4),
(22, 4, 9, 3, '1', 3),
(23, 5, 7, 3, '1', 3),
(24, 5, 9, 3, '1', 3),
(25, 5, 11, 3, '0', 0),
(26, 5, 14, 3, '0', 0),
(27, 2, 4, 3, '1', 3),
(28, 3, 13, 4, '0', 0),
(29, 3, 15, 4, '0', 0),
(30, 3, 22, 4, '0', 0),
(31, 3, 24, 4, '0', 0),
(32, 5, 11, 4, '0', 0),
(33, 5, 14, 4, '0', 0);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `reinforcements`
--

CREATE TABLE `reinforcements` (
  `id` int(3) NOT NULL,
  `gameid` int(3) DEFAULT NULL,
  `userid` int(5) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `eta` int(3) DEFAULT NULL,
  `cost` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `sensors`
--

CREATE TABLE `sensors` (
  `id` int(5) NOT NULL,
  `unitid` int(5) DEFAULT NULL,
  `systemid` int(5) DEFAULT NULL,
  `turn` int(3) DEFAULT NULL,
  `angle` decimal(5,2) DEFAULT NULL,
  `dist` int(4) DEFAULT NULL,
  `type` int(3) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `sensors`
--

INSERT INTO `sensors` (`id`, `unitid`, `systemid`, `turn`, `angle`, `dist`, `type`) VALUES
(1, 3, 4, 1, '-1.00', 124, 0),
(2, 4, 4, 1, '-1.00', 102, 0),
(3, 5, 4, 1, '-1.00', 102, 0),
(4, 1, 4, 1, '-1.00', 132, 0),
(5, 2, 4, 1, '-1.00', 132, 0),
(6, 1, 4, 2, '359.98', 705, 0),
(7, 2, 4, 2, '0.23', 672, 0),
(8, 3, 4, 2, '11.50', 760, 1),
(9, 4, 4, 2, '0.05', 514, 1),
(10, 5, 4, 2, '359.80', 495, 1),
(11, 3, 4, 3, '338.24', 503, 0),
(12, 4, 4, 3, '0.07', 370, 1),
(13, 5, 4, 3, '358.49', 291, 1),
(14, 1, 4, 3, '15.97', 321, 1),
(15, 2, 4, 3, '4.28', 320, 1),
(16, 3, 4, 4, '-1.00', 124, 0),
(17, 4, 4, 4, '-1.00', 102, 0),
(18, 5, 4, 4, '-1.00', 102, 0),
(19, 1, 4, 4, '-1.00', 132, 0),
(20, 2, 4, 4, '-1.00', 132, 0);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `subunits`
--

CREATE TABLE `subunits` (
  `id` int(4) NOT NULL,
  `unitid` int(4) DEFAULT NULL,
  `amount` int(2) DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `subunits`
--

INSERT INTO `subunits` (`id`, `unitid`, `amount`, `name`) VALUES
(1, 6, 9, 'SitaraParticle'),
(2, 7, 9, 'SitaraParticle'),
(3, 8, 3, 'Javelin'),
(4, 9, 3, 'Javelin');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `systemcrits`
--

CREATE TABLE `systemcrits` (
  `id` int(4) NOT NULL,
  `shipid` int(4) DEFAULT NULL,
  `systemid` int(4) DEFAULT NULL,
  `turn` int(3) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `duration` int(3) DEFAULT NULL,
  `value` decimal(5,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `systemcrits`
--

INSERT INTO `systemcrits` (`id`, `shipid`, `systemid`, `turn`, `type`, `duration`, `value`) VALUES
(1, 2, 16, 2, 'Disabled', 1, '0.00'),
(2, 2, 16, 2, 'Damage', 0, '20.00'),
(3, 2, 16, 2, 'Accuracy', 0, '30.00'),
(4, 1, 15, 3, 'Disabled', 1, '0.00'),
(5, 1, 15, 3, 'Damage', 0, '20.00'),
(6, 1, 15, 3, 'Accuracy', 0, '30.00'),
(7, 2, 17, 3, 'Disabled', 1, '0.00'),
(8, 2, 17, 3, 'Damage', 0, '20.00'),
(9, 2, 17, 3, 'Accuracy', 0, '30.00'),
(10, 2, 19, 3, 'Disabled', 1, '0.00'),
(11, 2, 19, 3, 'Damage', 0, '20.00'),
(12, 2, 19, 3, 'Accuracy', 0, '30.00'),
(13, 3, 5, 3, 'Output', 0, '1.87'),
(24, 2, 5, 4, 'Output', 0, '9.01'),
(25, 2, 10, 4, 'Accuracy', 0, '30.00'),
(26, 7, 3, 4, 'Disabled', 0, '0.00');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `units`
--

CREATE TABLE `units` (
  `id` int(3) NOT NULL,
  `gameid` int(3) DEFAULT '0',
  `userid` int(3) DEFAULT '0',
  `ship` tinyint(1) DEFAULT '0',
  `ball` tinyint(1) DEFAULT '0',
  `name` varchar(255) DEFAULT '',
  `display` varchar(50) DEFAULT '',
  `status` varchar(255) DEFAULT '',
  `available` int(3) DEFAULT '0',
  `destroyed` tinyint(1) DEFAULT '0',
  `x` int(4) DEFAULT '0',
  `y` int(4) DEFAULT '0',
  `facing` int(3) DEFAULT '0',
  `delay` int(3) DEFAULT '0',
  `thrust` int(3) DEFAULT '0',
  `rolling` int(2) DEFAULT '0',
  `rolled` int(2) DEFAULT '0',
  `turn` int(1) DEFAULT '0',
  `phase` int(1) DEFAULT '0',
  `notes` varchar(50) DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `units`
--

INSERT INTO `units` (`id`, `gameid`, `userid`, `ship`, `ball`, `name`, `display`, `status`, `available`, `destroyed`, `x`, `y`, `facing`, `delay`, `thrust`, `rolling`, `rolled`, `turn`, `phase`, `notes`) VALUES
(1, 1, 1, 1, 0, 'Tigara', '', 'bought', 1, 0, -48, 424, 356, 0, 155, 0, 0, 3, 3, ''),
(2, 1, 1, 1, 0, 'Tigara', '', 'bought', 1, 0, -146, -162, 358, 0, 155, 0, 0, 3, 3, ''),
(3, 1, 2, 1, 0, 'Primus', '', 'bought', 1, 0, 201, 7, 211, 0, 140, 0, 0, 3, 3, ''),
(4, 1, 2, 1, 0, 'Demos', '', 'bought', 1, 0, 42, -293, 149, 0, 185, 0, 0, 3, 3, ''),
(5, 1, 2, 1, 0, 'Demos', '', 'bought', 1, 0, 86, 504, 214, 0, 165, 0, 0, 3, 3, ''),
(6, 1, 2, 0, 0, 'Flight', 'Wyvern-Sigma', 'deployed', 2, 0, 177, 13, 208, 0, 258, NULL, NULL, 3, 3, ''),
(7, 1, 2, 0, 0, 'Flight', 'Blue-Sigma', 'deployed', 2, 0, 177, 13, 208, 0, 258, NULL, NULL, 3, 3, '');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `users`
--

CREATE TABLE `users` (
  `id` int(3) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `access` int(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `access`) VALUES
(1, 'Chris', '1', 0),
(2, '1', '1', 0);

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `actions`
--
ALTER TABLE `actions`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `damages`
--
ALTER TABLE `damages`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `deploys`
--
ALTER TABLE `deploys`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `dogfights`
--
ALTER TABLE `dogfights`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `fireorders`
--
ALTER TABLE `fireorders`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `loads`
--
ALTER TABLE `loads`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `missions`
--
ALTER TABLE `missions`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `playerstatus`
--
ALTER TABLE `playerstatus`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `powers`
--
ALTER TABLE `powers`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `reinforcements`
--
ALTER TABLE `reinforcements`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `sensors`
--
ALTER TABLE `sensors`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `subunits`
--
ALTER TABLE `subunits`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `systemcrits`
--
ALTER TABLE `systemcrits`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `units`
--
ALTER TABLE `units`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `actions`
--
ALTER TABLE `actions`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;
--
-- AUTO_INCREMENT für Tabelle `chat`
--
ALTER TABLE `chat`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `damages`
--
ALTER TABLE `damages`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;
--
-- AUTO_INCREMENT für Tabelle `deploys`
--
ALTER TABLE `deploys`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `dogfights`
--
ALTER TABLE `dogfights`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `fireorders`
--
ALTER TABLE `fireorders`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;
--
-- AUTO_INCREMENT für Tabelle `games`
--
ALTER TABLE `games`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT für Tabelle `loads`
--
ALTER TABLE `loads`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT für Tabelle `missions`
--
ALTER TABLE `missions`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT für Tabelle `playerstatus`
--
ALTER TABLE `playerstatus`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT für Tabelle `powers`
--
ALTER TABLE `powers`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;
--
-- AUTO_INCREMENT für Tabelle `reinforcements`
--
ALTER TABLE `reinforcements`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `sensors`
--
ALTER TABLE `sensors`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT für Tabelle `subunits`
--
ALTER TABLE `subunits`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT für Tabelle `systemcrits`
--
ALTER TABLE `systemcrits`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
--
-- AUTO_INCREMENT für Tabelle `units`
--
ALTER TABLE `units`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

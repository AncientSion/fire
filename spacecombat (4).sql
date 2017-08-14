-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 14. Aug 2017 um 16:56
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
(1, 3, 1, 'deploy', 0, 441, -109, 180, 0, 0, 1, 1),
(2, 4, 1, 'deploy', 0, 434, 486, 180, 0, 0, 1, 1),
(3, 1, 1, 'deploy', 0, -667, -34, 0, 0, 0, 1, 1),
(4, 2, 1, 'deploy', 0, -512, 96, 0, 0, 0, 1, 1),
(5, 1, 1, 'jump', 37, -632, -46, 6, 0, 0, 0, 1),
(6, 2, 1, 'jump', 25, -516, 72, 2, 0, 0, 0, 1),
(7, 3, 1, 'jump', 8, 443, -116, -8, 0, 0, 0, 1),
(8, 4, 1, 'jump', 29, 409, 499, -12, 0, 0, 0, 1),
(9, 1, 1, 'move', 170, -463, -28, 0, 0, 0, 1, 1),
(10, 2, 1, 'move', 170, -346, 78, 0, 0, 0, 1, 1),
(11, 3, 1, 'move', 180, 265, -91, 0, 0, 0, 1, 1),
(12, 4, 1, 'turn', 0, 409, 499, 30, 35, 56, 1, 1),
(13, 4, 1, 'move', 180, 238, 443, 0, 0, 0, 1, 1),
(14, 5, 2, 'deploy', 0, -404, 26, 42, 0, 0, 1, 1),
(15, 6, 2, 'deploy', 0, -278, 120, 32, 0, 0, 1, 1),
(16, 7, 2, 'deploy', 0, 212, -76, 165, 0, 0, 1, 1),
(17, 3, 2, 'turn', 0, 265, -91, 14, 16, 26, 1, 1),
(18, 3, 2, 'move', 180, 86, -110, 0, 0, 0, 1, 1),
(19, 4, 2, 'turn', 0, 238, 443, 30, 35, 56, 1, 1),
(20, 4, 2, 'move', 56, 201, 401, 0, 0, 0, 1, 1),
(21, 4, 2, 'turn', 0, 201, 401, 30, 35, 56, 1, 1),
(22, 4, 2, 'move', 124, 175, 280, 0, 0, 0, 1, 1),
(23, 1, 2, 'move', 170, -294, -10, 0, 0, 0, 1, 1),
(24, 2, 2, 'turn', 0, -346, 78, -30, 76, 77, 1, 1),
(25, 2, 2, 'move', 166, -232, -44, 0, 0, 0, 1, 1),
(26, 2, 2, 'turn', 0, -232, -44, 30, 152, 38, 2, 1),
(27, 2, 2, 'move', 4, -228, -44, 0, 0, 0, 1, 1),
(28, 5, 2, 'move', 190, -228, -44, 338, 0, 0, 0, 1),
(29, 6, 2, 'move', 481, -77, 191, 19, 0, 0, 0, 1),
(30, 7, 2, 'move', 442, -63, -56, 176, 0, 0, 0, 1),
(31, 8, 3, 'deploy', 0, 175, 280, 0, 0, 0, 1, 1),
(32, 1, 3, 'turn', 0, -294, -10, 30, 76, 77, 1, 1),
(33, 1, 3, 'move', 170, -156, 90, 0, 0, 0, 1, 1),
(34, 2, 3, 'turn', 0, -228, -44, -30, 76, 77, 1, 1),
(35, 2, 3, 'move', 170, -78, -124, 0, 0, 0, 1, 1),
(36, 3, 3, 'turn', 0, 86, -110, 30, 35, 56, 1, 1),
(37, 3, 3, 'move', 117, 19, -207, 0, 0, 0, 1, 1),
(38, 3, 3, 'turn', 0, 19, -207, -30, 35, 56, 1, 1),
(39, 3, 3, 'move', 63, -44, -214, 0, 0, 0, 1, 1),
(40, 3, 3, 'turn', 0, -44, -214, -30, 69, 28, 2, 1),
(41, 4, 3, 'move', 101, 183, 179, 0, 0, 0, 1, 1),
(42, 4, 3, 'turn', 0, 183, 179, 30, 35, 56, 1, 1),
(43, 4, 3, 'move', 79, 207, 104, 0, 0, 0, 1, 1),
(44, 5, 3, 'move', 170, -78, -124, 332, 0, 0, 0, 1),
(45, 8, 3, 'move', 179, 207, 104, 280, 0, 0, 0, 1),
(46, 6, 3, 'move', 298, 127, 129, 343, 0, 0, 0, 1),
(47, 7, 3, 'move', 70, -78, -124, 258, 0, 0, 0, 1),
(48, 11, 1, 'deploy', 0, 443, -61, 180, 0, 0, 1, 1),
(49, 12, 1, 'deploy', 0, 670, -599, 180, 0, 0, 1, 1),
(50, 13, 1, 'deploy', 0, 478, 229, 180, 0, 0, 1, 1),
(51, 9, 1, 'deploy', 0, -426, -209, 0, 0, 0, 1, 1),
(52, 10, 1, 'deploy', 0, -464, -282, 0, 0, 0, 1, 1),
(53, 9, 1, 'jump', 13, -438, -211, 6, 0, 0, 0, 1),
(54, 10, 1, 'jump', 42, -430, -305, 2, 0, 0, 0, 1),
(55, 11, 1, 'jump', 12, 436, -52, 11, 0, 0, 0, 1),
(56, 12, 1, 'jump', 26, 651, -616, 7, 0, 0, 0, 1),
(57, 13, 1, 'jump', 9, 474, 222, -1, 0, 0, 0, 1),
(58, 9, 1, 'move', 170, -269, -193, 0, 0, 0, 1, 1),
(59, 10, 1, 'move', 170, -260, -299, 0, 0, 0, 1, 1),
(60, 11, 1, 'move', 180, 259, -86, 0, 0, 0, 1, 1),
(61, 12, 1, 'turn', 0, 651, -616, -20, 24, 39, 1, 1),
(62, 12, 1, 'move', 180, 476, -576, 0, 0, 0, 1, 1),
(63, 13, 1, 'turn', 0, 474, 222, 30, 35, 56, 1, 1),
(64, 13, 1, 'move', 180, 317, 135, 0, 0, 0, 1, 1),
(65, 14, 2, 'deploy', 0, 259, -86, 0, 0, 0, 1, 1),
(66, 15, 2, 'deploy', 0, -191, -177, 11, 0, 0, 1, 1),
(67, 9, 2, 'turn', 0, -269, -193, -14, 35, 35, 1, 1),
(68, 9, 2, 'move', 170, -101, -217, 0, 0, 0, 1, 1),
(69, 10, 2, 'move', 170, -90, -293, 0, 0, 0, 1, 1),
(70, 11, 2, 'speedChange', 1, 259, -86, 0, 38, 0, 1, 1),
(71, 11, 2, 'move', 198, 65, -124, 0, 0, 0, 1, 1),
(72, 12, 2, 'turn', 0, 476, -576, 20, 23, 38, 1, 1),
(73, 12, 2, 'move', 180, 297, -598, 0, 0, 0, 1, 1),
(74, 13, 2, 'move', 180, 160, 48, 0, 0, 0, 1, 1),
(75, 14, 2, 'move', 198, 65, -124, 191, 0, 0, 0, 1),
(76, 15, 2, 'move', 262, 65, -124, 12, 0, 0, 0, 1);

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
  `overkill` int(3) DEFAULT NULL,
  `negation` int(4) DEFAULT NULL,
  `destroyed` tinyint(1) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `new` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `damages`
--

INSERT INTO `damages` (`id`, `fireid`, `gameid`, `shipid`, `structureid`, `systemid`, `turn`, `roll`, `type`, `totalDmg`, `shieldDmg`, `structDmg`, `armourDmg`, `overkill`, `negation`, `destroyed`, `notes`, `new`) VALUES
(1, 12, 1, 2, 7, -1, 2, 44, 'Particle', 41, 0, 19, 22, 0, 22, 0, 'pen', 0),
(2, 12, 1, 2, 7, -1, 2, 37, 'Particle', 43, 0, 22, 21, 0, 21, 0, 'pen', 0),
(3, 13, 1, 2, 7, -1, 2, 21, 'Particle', 45, 0, 25, 20, 0, 20, 0, 'pen', 0),
(4, 14, 1, 2, 7, -1, 2, 24, 'Particle', 47, 0, 27, 20, 0, 20, 0, 'pen', 0),
(5, 11, 1, 3, 7, -1, 2, 6, 'Laser', 98, 0, 13, 19, 0, 19, 0, 'pen', 0),
(6, 11, 1, 3, 7, -1, 2, 6, 'Laser', 98, 0, 14, 18, 0, 18, 0, 'pen', 0),
(7, 11, 1, 3, 7, -1, 2, 6, 'Laser', 98, 0, 15, 17, 0, 17, 0, 'pen', 0),
(8, 8, 1, 3, 7, -1, 2, 32, 'Matter', 33, 0, 25, 9, 0, 17, 0, '', 0),
(9, 8, 1, 3, 7, -1, 2, 31, 'Matter', 36, 0, 28, 8, 0, 16, 0, '', 0),
(10, 28, 1, 7, 0, 5, 3, 1, 'Pulse', 56, 0, 38, 18, 25, 6, 1, 'pen', 0),
(11, 30, 1, 7, 0, 7, 3, 9, 'Pulse', 40, 0, 28, 12, 33, 6, 1, 'pen', 0),
(12, 31, 1, 7, 0, 9, 3, 25, 'Pulse', 52, 0, 34, 18, 15, 6, 1, 'pen', 0),
(13, 33, 1, 7, 0, 1, 3, 19, 'Particle', 13, 0, 14, 12, 0, 6, 0, 'pen', 0),
(14, 33, 1, 7, 0, 11, 3, 6, 'Particle', 12, 0, 12, 12, 0, 6, 0, 'pen', 0),
(15, 33, 1, 7, 0, 11, 3, 15, 'Particle', 14, 0, 16, 12, 0, 6, 1, 'pen', 0),
(16, 44, 2, 10, 13, 15, 2, 62, 'Particle', 34, 0, 26, 8, 0, 8, 0, 'pen', 0),
(17, 48, 2, 10, 20, -1, 2, 17, 'Particle', 33, 0, 13, 20, 0, 20, 0, 'pen', 0),
(18, 49, 2, 10, 20, 21, 2, 24, 'Particle', 47, 0, 34, 13, 0, 13, 0, 'pen', 0),
(19, 50, 2, 10, 20, -1, 2, 35, 'Particle', 35, 0, 16, 19, 0, 19, 0, 'pen', 0),
(20, 51, 2, 10, 13, 15, 2, 38, 'Particle', 43, 0, 2, 8, 33, 8, 1, 'pen', 0),
(21, 64, 2, 11, 7, -1, 2, 22, 'Laser', 93, 0, 12, 19, 0, 19, 0, 'pen', 0),
(22, 64, 2, 11, 7, -1, 2, 22, 'Laser', 93, 0, 13, 18, 0, 18, 0, 'pen', 0),
(23, 64, 2, 11, 7, -1, 2, 22, 'Laser', 93, 0, 14, 17, 0, 17, 0, 'pen', 0),
(24, 60, 2, 11, 7, -1, 2, 38, 'Matter', 32, 0, 24, 9, 0, 17, 0, '', 0),
(25, 63, 2, 11, 7, -1, 2, 18, 'Matter', 32, 0, 24, 8, 0, 16, 0, '', 0),
(26, 61, 2, 11, 7, -1, 2, 36, 'Pulse', 54, 0, 6, 40, 0, 16, 0, 'pen', 0),
(27, 62, 2, 11, 7, -1, 2, 6, 'Pulse', 70, 0, 10, 60, 0, 15, 0, 'pen', 0),
(28, 69, 2, 11, 11, -1, 2, 5, 'Pulse', 71, 0, 2, 44, 0, 18, 0, 'block', 0),
(29, 67, 2, 12, 18, -1, 2, 1, 'Laser', 147, 0, 31, 18, 0, 18, 0, 'pen', 0),
(30, 67, 2, 12, 18, -1, 2, 1, 'Laser', 147, 0, 32, 17, 0, 17, 0, 'pen', 0),
(31, 67, 2, 12, 18, -1, 2, 1, 'Laser', 147, 0, 32, 17, 0, 17, 0, 'pen', 0),
(32, 75, 2, 12, 18, -1, 2, 7, 'Laser', 146, 0, 32, 16, 0, 16, 0, 'pen', 0),
(33, 75, 2, 12, 18, -1, 2, 7, 'Laser', 146, 0, 33, 15, 0, 15, 0, 'pen', 0),
(34, 75, 2, 12, 18, -1, 2, 7, 'Laser', 146, 0, 33, 15, 0, 15, 0, 'pen', 0),
(35, 71, 2, 12, 18, 19, 2, 9, 'Matter', 35, 0, 31, 4, 0, 8, 0, '', 0),
(36, 43, 2, 15, 0, 5, 2, 11, 'Particle', 15, 0, 10, 5, 0, 5, 0, 'pen', 0),
(37, 45, 2, 15, 0, 15, 2, 22, 'Particle', 18, 0, 14, 4, 0, 4, 0, 'pen', 0),
(38, 45, 2, 15, 0, 11, 2, 21, 'Particle', 17, 0, 13, 4, 0, 4, 0, 'pen', 0),
(39, 54, 2, 15, 0, 11, 2, 9, 'Particle', 11, 0, 14, 8, 0, 4, 1, 'pen', 0),
(40, 54, 2, 15, 0, 9, 2, 11, 'Particle', 12, 0, 16, 8, 0, 4, 0, 'pen', 0);

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

--
-- Daten für Tabelle `deploys`
--

INSERT INTO `deploys` (`id`, `gameid`, `userid`, `turn`, `phase`, `x`, `y`, `s`) VALUES
(1, 1, 1, 1, -1, -668, -35, 42),
(2, 1, 1, 1, -1, -503, 91, 64),
(3, 1, 2, 1, -1, 435, 500, 45),
(4, 1, 2, 1, -1, 434, -114, 53),
(5, 2, 1, 1, -1, -461, -259, 70),
(6, 2, 1, 1, -1, -428, -209, 43),
(7, 2, 2, 1, -1, 500, 248, 67),
(8, 2, 2, 1, -1, 452, -46, 69),
(9, 2, 2, 1, -1, 673, -600, 41);

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
-- Tabellenstruktur für Tabelle `fighters`
--

CREATE TABLE `fighters` (
  `id` int(4) NOT NULL,
  `unitid` int(4) DEFAULT NULL,
  `amount` int(2) DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `fighters`
--

INSERT INTO `fighters` (`id`, `unitid`, `amount`, `name`) VALUES
(1, 5, 8, 'Aurora'),
(2, 6, 8, 'Aurora'),
(3, 7, 6, 'Sentri'),
(4, 8, 6, 'Sentri'),
(5, 14, 6, 'Sentri'),
(6, 15, 8, 'Aurora');

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
(1, 1, 2, 1, 0, 0, 0, 10, 0, 0, '', 0, 1),
(2, 1, 2, 2, 0, 0, 0, 10, 0, 0, '', 0, 1),
(3, 1, 2, 3, 0, 0, 0, 16, 0, 0, '', 0, 1),
(4, 1, 2, 1, 3, 0, 0, 8, 1, 39, '52 40 ', 0, 1),
(5, 1, 2, 1, 3, 0, 0, 12, 1, 39, '49 98 ', 0, 1),
(6, 1, 2, 1, 4, 0, 0, 14, 1, 48, '100 ', 0, 1),
(7, 1, 2, 1, 3, 0, 0, 21, 1, 55, '57 ', 0, 1),
(8, 1, 2, 2, 3, 0, 0, 8, 1, 46, '32 31 ', 2, 1),
(9, 1, 2, 2, 3, 0, 0, 12, 1, 46, '62 60 ', 0, 1),
(10, 1, 2, 2, 4, 0, 0, 14, 1, 49, '64 ', 0, 1),
(11, 1, 2, 2, 3, 0, 0, 21, 1, 59, '6 ', 3, 1),
(12, 1, 2, 3, 2, 0, 0, 9, 1, 55, '44 37 ', 2, 1),
(13, 1, 2, 3, 2, 0, 0, 19, 1, 55, '21 ', 1, 1),
(14, 1, 2, 3, 2, 0, 0, 20, 1, 55, '24 ', 1, 1),
(15, 1, 2, 4, 2, 0, 0, 9, 1, 36, '44 62 ', 0, 1),
(16, 1, 2, 4, 2, 0, 0, 19, 1, 36, '63 ', 0, 1),
(17, 1, 2, 4, 2, 0, 0, 20, 1, 36, '96 ', 0, 1),
(18, 1, 3, 4, 0, 0, 0, 16, 0, 0, '', 0, 1),
(19, 1, 3, 4, 6, 0, 0, 17, 1, 27, '41 78 ', 0, 1),
(20, 1, 3, 4, 6, 0, 0, 21, 1, 27, '49 ', 0, 1),
(21, 1, 3, 7, 5, 0, 0, 2, 3, 31, '89 37 83 ', 0, 1),
(22, 1, 3, 7, 5, 0, 0, 4, 0, 31, '', 0, 1),
(26, 1, 3, 7, 5, 0, 0, 12, 0, 31, '', 0, 1),
(27, 1, 3, 2, 7, 0, 0, 9, 1, 39, '73 ', 0, 1),
(28, 1, 3, 2, 7, 0, 0, 11, 1, 39, '1 ', 4, 1),
(29, 1, 3, 2, 7, 0, 0, 15, 1, 39, '95 ', 0, 1),
(30, 1, 3, 2, 7, 0, 0, 16, 1, 39, '9 ', 4, 1),
(31, 1, 3, 2, 7, 0, 0, 22, 1, 39, '25 ', 3, 1),
(32, 1, 3, 2, 7, 0, 0, 23, 1, 39, '91 ', 0, 1),
(33, 1, 3, 5, 7, 0, 0, 2, 8, 26, '36 90 39 87 19 6 15 48 ', 3, 1),
(34, 1, 3, 5, 7, 0, 0, 4, 0, 26, '', 0, 1),
(35, 1, 3, 5, 7, 0, 0, 6, 0, 26, '', 0, 1),
(36, 1, 3, 5, 7, 0, 0, 8, 0, 26, '', 0, 1),
(37, 1, 3, 5, 7, 0, 0, 10, 0, 26, '', 0, 1),
(38, 1, 3, 5, 7, 0, 0, 12, 0, 26, '', 0, 1),
(39, 1, 3, 5, 7, 0, 0, 14, 0, 26, '', 0, 1),
(40, 1, 3, 5, 7, 0, 0, 16, 0, 26, '', 0, 1),
(41, 2, 2, 11, 0, 0, 0, 16, 0, 0, '', 0, 1),
(42, 2, 2, 9, 0, 0, 0, 10, 0, 0, '', 0, 1),
(43, 2, 2, 11, 15, 0, 0, 8, 1, 47, '92 11 62 51 ', 1, 1),
(44, 2, 2, 11, 10, 0, 0, 9, 1, 72, '62 77 ', 1, 1),
(45, 2, 2, 11, 15, 0, 0, 10, 1, 47, '100 22 21 94 ', 2, 1),
(46, 2, 2, 11, 10, 0, 0, 12, 1, 72, '95 ', 0, 1),
(47, 2, 2, 11, 10, 0, 0, 13, 1, 72, '84 ', 0, 1),
(48, 2, 2, 12, 10, 0, 0, 9, 1, 39, '17 93 ', 1, 1),
(49, 2, 2, 12, 10, 0, 0, 19, 1, 39, '24 ', 1, 1),
(50, 2, 2, 12, 10, 0, 0, 20, 1, 39, '35 ', 1, 1),
(51, 2, 2, 13, 10, 0, 0, 9, 1, 51, '38 74 ', 1, 1),
(52, 2, 2, 13, 10, 0, 0, 12, 1, 51, '94 ', 0, 1),
(53, 2, 2, 13, 10, 0, 0, 13, 1, 51, '91 ', 0, 1),
(54, 2, 2, 14, 15, 0, 0, 2, 6, 31, '55 9 63 99 83 11 ', 2, 1),
(55, 2, 2, 14, 15, 0, 0, 4, 0, 31, '', 0, 1),
(56, 2, 2, 14, 15, 0, 0, 6, 0, 31, '', 0, 1),
(57, 2, 2, 14, 15, 0, 0, 8, 0, 31, '', 0, 1),
(58, 2, 2, 14, 15, 0, 0, 10, 0, 31, '', 0, 1),
(59, 2, 2, 14, 15, 0, 0, 12, 0, 31, '', 0, 1),
(60, 2, 2, 9, 11, 0, 0, 8, 1, 55, '38 90 ', 1, 1),
(61, 2, 2, 9, 11, 0, 0, 9, 1, 40, '36 ', 3, 1),
(62, 2, 2, 9, 11, 0, 0, 11, 1, 40, '6 ', 4, 1),
(63, 2, 2, 9, 11, 0, 0, 12, 1, 55, '18 61 ', 1, 1),
(64, 2, 2, 9, 11, 0, 0, 14, 1, 63, '22 ', 3, 1),
(65, 2, 2, 9, 11, 0, 0, 15, 1, 40, '55 ', 0, 1),
(66, 2, 2, 9, 11, 0, 0, 16, 1, 40, '91 ', 0, 1),
(67, 2, 2, 9, 12, 0, 0, 21, 1, 48, '1 ', 3, 1),
(68, 2, 2, 10, 12, 0, 0, 8, 1, 31, '92 74 ', 0, 1),
(69, 2, 2, 10, 11, 0, 0, 9, 1, 35, '5 ', 4, 1),
(70, 2, 2, 10, 11, 0, 0, 11, 1, 35, '93 ', 0, 1),
(71, 2, 2, 10, 12, 0, 0, 12, 1, 31, '9 33 ', 1, 1),
(72, 2, 2, 10, 13, 0, 0, 14, 1, 54, '56 ', 0, 1),
(73, 2, 2, 10, 11, 0, 0, 15, 1, 35, '60 ', 0, 1),
(74, 2, 2, 10, 11, 0, 0, 16, 1, 35, '92 ', 0, 1),
(75, 2, 2, 10, 12, 0, 0, 21, 1, 51, '7 ', 3, 1);

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
  `reinforce` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `games`
--

INSERT INTO `games` (`id`, `name`, `status`, `turn`, `phase`, `pv`, `reinforce`) VALUES
(1, 'myGame', 'active', 3, 3, 5000, 20),
(2, 'myGame', 'active', 2, 3, 3500, 50);

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
(1, 1, 10, 'Aurora', 8),
(2, 2, 10, 'Aurora', 8),
(3, 3, 16, 'Sentri', 6),
(4, 4, 16, 'Sentri', 6),
(6, 10, 10, 'Aurora', 8),
(8, 12, 16, 'Sentri', 6),
(9, 13, 16, 'Sitara', 6);

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
(1, 5, '2', 2, 2, -346, 78, 2),
(2, 6, '2', 2, 4, 238, 443, 0),
(3, 7, '2', 2, 2, -346, 78, 3),
(4, 8, '2', 3, 4, 175, 280, 1),
(5, 14, '2', 2, 11, 259, -86, 1),
(6, 15, '2', 2, 11, 259, -86, 2);

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
(1, 1, 1, 3, 3, 'Earth Alliance', 2876, 'waiting'),
(2, 2, 1, 3, 3, 'Centauri Republic', 3654, 'waiting'),
(3, 1, 2, 2, 3, 'Earth Alliance', 1386, 'waiting'),
(4, 2, 2, 2, 3, 'Centauri Republic', 1495, 'waiting');

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
(1, 1, 9, 1, '-1', 0),
(2, 1, 11, 1, '-1', 0),
(3, 1, 15, 1, '-1', 0),
(4, 1, 16, 1, '-1', 0),
(5, 1, 19, 1, '0', 0),
(6, 1, 22, 1, '-1', 0),
(7, 1, 23, 1, '-1', 0),
(8, 2, 9, 1, '-1', 0),
(9, 2, 11, 1, '-1', 0),
(10, 2, 15, 1, '-1', 0),
(11, 2, 16, 1, '-1', 0),
(12, 2, 19, 1, '0', 0),
(13, 2, 22, 1, '-1', 0),
(14, 2, 23, 1, '-1', 0),
(15, 1, 9, 2, '-1', 0),
(16, 1, 11, 2, '-1', 0),
(17, 1, 15, 2, '-1', 0),
(18, 1, 16, 2, '-1', 0),
(19, 1, 19, 2, '0', 0),
(20, 1, 22, 2, '-1', 0),
(21, 1, 23, 2, '-1', 0),
(22, 2, 9, 2, '-1', 0),
(23, 2, 11, 2, '-1', 0),
(24, 2, 15, 2, '-1', 0),
(25, 2, 16, 2, '-1', 0),
(26, 2, 19, 2, '0', 0),
(27, 2, 22, 2, '-1', 0),
(28, 2, 23, 2, '-1', 0),
(29, 1, 9, 3, '-1', 0),
(30, 1, 11, 3, '-1', 0),
(31, 1, 15, 3, '-1', 0),
(32, 1, 16, 3, '-1', 0),
(33, 1, 19, 3, '0', 0),
(34, 1, 22, 3, '-1', 0),
(35, 1, 23, 3, '-1', 0),
(36, 2, 9, 3, '-1', 0),
(37, 2, 11, 3, '-1', 0),
(38, 2, 15, 3, '-1', 0),
(39, 2, 16, 3, '-1', 0),
(40, 2, 19, 3, '0', 0),
(41, 2, 22, 3, '-1', 0),
(42, 2, 23, 3, '-1', 0),
(43, 9, 9, 1, '-1', 0),
(44, 9, 11, 1, '-1', 0),
(45, 9, 15, 1, '-1', 0),
(46, 9, 16, 1, '-1', 0),
(47, 9, 19, 1, '0', 0),
(48, 9, 22, 1, '-1', 0),
(49, 9, 23, 1, '-1', 0),
(50, 10, 9, 1, '-1', 0),
(51, 10, 11, 1, '-1', 0),
(52, 10, 15, 1, '-1', 0),
(53, 10, 16, 1, '-1', 0),
(54, 10, 19, 1, '0', 0),
(55, 10, 22, 1, '-1', 0),
(56, 10, 23, 1, '-1', 0),
(57, 9, 9, 2, '-1', 0),
(58, 9, 11, 2, '-1', 0),
(59, 9, 15, 2, '-1', 0),
(60, 9, 16, 2, '-1', 0),
(61, 9, 19, 2, '0', 0),
(62, 9, 22, 2, '-1', 0),
(63, 9, 23, 2, '-1', 0),
(64, 10, 9, 2, '-1', 0),
(65, 10, 11, 2, '-1', 0),
(66, 10, 15, 2, '-1', 0),
(67, 10, 16, 2, '-1', 0),
(68, 10, 19, 2, '0', 0),
(69, 10, 22, 2, '-1', 0),
(70, 10, 23, 2, '-1', 0);

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

--
-- Daten für Tabelle `reinforcements`
--

INSERT INTO `reinforcements` (`id`, `gameid`, `userid`, `name`, `eta`, `cost`) VALUES
(1, 1, 2, 'Demos', 3, 473),
(2, 1, 2, 'Vorchan', 2, 324),
(3, 2, 2, 'Haven', 2, 192);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `sensors`
--

CREATE TABLE `sensors` (
  `id` int(5) NOT NULL,
  `unitid` int(5) DEFAULT NULL,
  `systemid` int(5) DEFAULT NULL,
  `turn` int(3) DEFAULT NULL,
  `angle` int(3) DEFAULT NULL,
  `dist` int(4) DEFAULT NULL,
  `type` int(3) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `sensors`
--

INSERT INTO `sensors` (`id`, `unitid`, `systemid`, `turn`, `angle`, `dist`, `type`) VALUES
(1, 3, 5, 1, -1, 174, 0),
(2, 4, 5, 1, -1, 174, 0),
(3, 1, 5, 1, -1, 162, 0),
(4, 2, 5, 1, -1, 162, 0),
(5, 1, 5, 2, -1, 162, 0),
(6, 2, 5, 2, -1, 162, 0),
(7, 3, 5, 2, -1, 174, 0),
(8, 4, 5, 2, -1, 174, 0),
(9, 1, 5, 3, -1, 162, 0),
(10, 2, 5, 3, -1, 162, 0),
(11, 3, 5, 3, -1, 174, 0),
(12, 4, 5, 3, -1, 174, 0),
(13, 11, 5, 1, -1, 174, 0),
(14, 12, 5, 1, -1, 174, 0),
(15, 13, 5, 1, -1, 174, 0),
(16, 9, 5, 1, -1, 162, 0),
(17, 10, 5, 1, -1, 162, 0),
(18, 11, 5, 2, -1, 174, 0),
(19, 12, 5, 2, -1, 174, 0),
(20, 13, 5, 2, -1, 174, 0),
(21, 9, 5, 2, -1, 162, 0),
(22, 10, 5, 2, -1, 162, 0);

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
  `value` decimal(3,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `systemcrits`
--

INSERT INTO `systemcrits` (`id`, `shipid`, `systemid`, `turn`, `type`, `duration`, `value`) VALUES
(1, 10, 21, 2, 'Accuracy', 0, '0.30'),
(2, 12, 19, 2, 'Disabled', 1, '0.00'),
(3, 12, 19, 2, 'Damage', 0, '0.50'),
(4, 12, 19, 2, 'Accuracy', 0, '0.50');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `units`
--

CREATE TABLE `units` (
  `id` int(3) NOT NULL,
  `gameid` int(3) DEFAULT NULL,
  `userid` int(3) DEFAULT NULL,
  `ship` tinyint(1) DEFAULT NULL,
  `ball` tinyint(1) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `available` int(3) DEFAULT NULL,
  `destroyed` tinyint(1) DEFAULT NULL,
  `x` int(4) DEFAULT '0',
  `y` int(4) DEFAULT '0',
  `angle` int(3) DEFAULT '0',
  `delay` int(3) DEFAULT '0',
  `thrust` int(3) DEFAULT '0',
  `turn` int(1) DEFAULT '0',
  `phase` int(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `units`
--

INSERT INTO `units` (`id`, `gameid`, `userid`, `ship`, `ball`, `name`, `status`, `available`, `destroyed`, `x`, `y`, `angle`, `delay`, `thrust`, `turn`, `phase`) VALUES
(1, 1, 1, 1, 0, 'Hyperion', 'bought', 1, 0, -294, -10, 6, 0, 170, 2, 3),
(2, 1, 1, 1, 0, 'Hyperion', 'bought', 1, 0, -228, -44, 2, 34, 170, 2, 3),
(3, 1, 2, 1, 0, 'Altarian', 'bought', 1, 0, 86, -110, 186, 0, 180, 2, 3),
(4, 1, 2, 1, 0, 'Altarian', 'bought', 1, 0, 175, 280, 258, 0, 180, 2, 3),
(5, 1, 1, 0, 0, 'Flight', 'deployed', 2, 0, -228, -44, 338, 0, 213, 2, 3),
(6, 1, 1, 0, 0, 'Flight', 'deployed', 2, 0, -77, 191, 19, 0, 213, 2, 3),
(7, 1, 2, 0, 0, 'Flight', 'deployed', 2, 0, -63, -56, 176, 0, 276, 2, 3),
(8, 1, 2, 0, 0, 'Flight', 'deployed', 3, 0, 175, 280, 0, 0, 276, 3, -1),
(9, 2, 1, 1, 0, 'Hyperion', 'bought', 1, 0, -269, -193, 6, 0, 170, 1, 3),
(10, 2, 1, 1, 0, 'Hyperion', 'bought', 1, 0, -260, -299, 2, 0, 170, 1, 3),
(11, 2, 2, 1, 0, 'Altarian', 'bought', 1, 0, 259, -86, 191, 0, 180, 1, 3),
(12, 2, 2, 1, 0, 'Altarian', 'bought', 1, 0, 476, -576, 167, 0, 180, 1, 3),
(13, 2, 2, 1, 0, 'Altarian', 'bought', 1, 0, 317, 135, 209, 0, 180, 1, 3),
(14, 2, 2, 0, 0, 'Flight', 'deployed', 2, 0, 259, -86, 0, 0, 276, 2, -1),
(15, 2, 1, 0, 0, 'Flight', 'deployed', 2, 0, -191, -177, 11, 0, 213, 2, -1);

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
(1, 'Chris', '1', 1),
(2, '1', '1', 1),
(3, 'cdfdf', '147147', 0),
(4, '4', '777', 0);

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `actions`
--
ALTER TABLE `actions`
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
-- Indizes für die Tabelle `fighters`
--
ALTER TABLE `fighters`
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
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;
--
-- AUTO_INCREMENT für Tabelle `damages`
--
ALTER TABLE `damages`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;
--
-- AUTO_INCREMENT für Tabelle `deploys`
--
ALTER TABLE `deploys`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT für Tabelle `dogfights`
--
ALTER TABLE `dogfights`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `fighters`
--
ALTER TABLE `fighters`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT für Tabelle `fireorders`
--
ALTER TABLE `fireorders`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;
--
-- AUTO_INCREMENT für Tabelle `games`
--
ALTER TABLE `games`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT für Tabelle `loads`
--
ALTER TABLE `loads`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT für Tabelle `missions`
--
ALTER TABLE `missions`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT für Tabelle `playerstatus`
--
ALTER TABLE `playerstatus`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT für Tabelle `powers`
--
ALTER TABLE `powers`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;
--
-- AUTO_INCREMENT für Tabelle `reinforcements`
--
ALTER TABLE `reinforcements`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT für Tabelle `sensors`
--
ALTER TABLE `sensors`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT für Tabelle `systemcrits`
--
ALTER TABLE `systemcrits`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT für Tabelle `units`
--
ALTER TABLE `units`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

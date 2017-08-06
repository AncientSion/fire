-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 06. Aug 2017 um 21:30
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
(1, 2, 1, 'deploy', 0, 579, 484, 180, 0, 0, 1, 1),
(2, 1, 1, 'deploy', 0, -551, -112, 0, 0, 0, 1, 1),
(3, 1, 1, 'jump', 10, -556, -104, 5, 0, 0, 0, 1),
(4, 2, 1, 'jump', 21, 563, 471, 4, 0, 0, 0, 1),
(5, 1, 1, 'move', 170, -387, -89, 0, 0, 0, 1, 1),
(6, 2, 1, 'move', 180, 383, 458, 0, 0, 0, 1, 1),
(7, 3, 2, 'deploy', 0, -322, -43, 35, 0, 0, 1, 1),
(8, 4, 2, 'deploy', 0, 378, 403, -95, 0, 0, 1, 1),
(9, 2, 2, 'turn', 0, 383, 458, -27, 31, 51, 1, 1),
(10, 2, 2, 'move', 51, 336, 478, 0, 0, 0, 1, 1),
(11, 2, 2, 'turn', 0, 336, 478, -30, 35, 56, 1, 1),
(12, 2, 2, 'move', 129, 258, 581, 0, 0, 0, 1, 1),
(13, 1, 2, 'turn', 0, -387, -89, -26, 65, 66, 1, 1),
(14, 1, 2, 'move', 170, -228, -150, 0, 0, 0, 1, 1),
(15, 3, 2, 'move', 852, -177, 113, 47, 0, 0, 0, 1),
(16, 4, 2, 'move', 357, 352, 128, 265, 0, 0, 0, 1),
(17, 2, 3, 'turn', 0, 258, 581, 30, 35, 56, 1, 1),
(18, 2, 3, 'move', 56, 206, 603, 0, 0, 0, 1, 1),
(19, 2, 3, 'turn', 0, 206, 603, 30, 35, 56, 1, 1),
(20, 2, 3, 'move', 56, 150, 596, 0, 0, 0, 1, 1),
(21, 2, 3, 'turn', 0, 150, 596, 30, 35, 56, 1, 1),
(22, 2, 3, 'move', 68, 96, 555, 0, 0, 0, 1, 1),
(23, 1, 3, 'turn', 0, -228, -150, 30, 76, 77, 1, 1),
(24, 1, 3, 'move', 77, -152, -138, 0, 0, 0, 1, 1),
(25, 1, 3, 'turn', 0, -152, -138, 30, 76, 77, 1, 1),
(26, 1, 3, 'move', 93, -80, -79, 0, 0, 0, 1, 1),
(27, 3, 3, 'move', 520, -65, 294, 58, 0, 0, 0, 1),
(28, 4, 3, 'move', 81, 344, 48, 264, 0, 0, 0, 1),
(29, 1, 4, 'turn', 0, -80, -79, 30, 76, 77, 1, 1),
(30, 1, 4, 'move', 170, -19, 80, 0, 0, 0, 1, 1),
(31, 1, 4, 'turn', 0, -19, 80, 30, 152, 39, 2, 1),
(32, 2, 4, 'turn', 0, 96, 555, -30, 35, 56, 1, 1),
(33, 2, 4, 'move', 56, 40, 548, 0, 0, 0, 1, 1),
(34, 2, 4, 'turn', 0, 40, 548, -30, 35, 56, 1, 1),
(35, 2, 4, 'move', 124, -74, 596, 0, 0, 0, 1, 1),
(36, 5, 4, 'move', 385, 337, 131, 153, 0, 0, 0, 1),
(37, 3, 4, 'move', 303, -71, 507, 92, 0, 0, 0, 1),
(38, 4, 4, 'move', 619, 159, 253, 132, 0, 0, 0, 1),
(39, 1, 5, 'move', 170, -46, 248, 0, 0, 0, 1, 1),
(40, 2, 5, 'turn', 0, -74, 596, 30, 35, 56, 1, 1),
(41, 2, 5, 'move', 56, -130, 589, 0, 0, 0, 1, 1),
(42, 2, 5, 'turn', 0, -130, 589, 30, 35, 56, 1, 1),
(43, 2, 5, 'move', 56, -175, 555, 0, 0, 0, 1, 1),
(44, 2, 5, 'turn', 0, -175, 555, 30, 35, 56, 1, 1),
(45, 2, 5, 'move', 56, -197, 503, 0, 0, 0, 1, 1),
(46, 2, 5, 'turn', 0, -197, 503, 30, 42, 47, 1.2, 1),
(47, 2, 5, 'move', 12, -196, 491, 0, 0, 0, 1, 1),
(48, 5, 5, 'move', 154, 200, 200, 153, 0, 0, 0, 1),
(49, 3, 5, 'move', 127, -196, 491, 187, 0, 0, 0, 1),
(50, 4, 5, 'move', 428, -70, 407, 146, 0, 0, 0, 1),
(51, 1, 6, 'turn', 0, -46, 248, -30, 152, 38, 2, 1),
(52, 1, 6, 'move', 39, -32, 284, 0, 0, 0, 1, 1),
(53, 1, 6, 'turn', 0, -32, 284, -30, 84, 70, 1.1, 1),
(54, 1, 6, 'move', 131, 69, 367, 0, 0, 0, 1, 1),
(55, 2, 6, 'turn', 0, -196, 491, -19, 22, 36, 1, 1),
(56, 2, 6, 'move', 180, -233, 315, 0, 0, 0, 1, 1),
(57, 3, 6, 'move', 180, -233, 315, 258, 0, 0, 0, 1),
(58, 5, 6, 'move', 0, 200, 200, 0, 0, 0, 0, 1),
(59, 4, 6, 'move', 188, -233, 315, 209, 0, 0, 0, 1);

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
(1, 4, 1, 1, 13, -1, 3, 13, 'Particle', 37, 0, 17, 20, 0, 20, 0, 'pen', 0),
(2, 7, 1, 3, 0, 7, 4, 14, 'Particle', 14, 0, 10, 4, 0, 4, 0, 'pen', 0),
(3, 8, 1, 3, 0, 5, 4, 26, 'Particle', 15, 0, 11, 4, 0, 4, 0, 'pen', 0),
(4, 10, 1, 2, 7, -1, 5, 2, 'Matter', 29, 0, 20, 10, 0, 19, 0, '', 0),
(5, 13, 1, 2, 7, 10, 5, 6, 'Matter', 36, 0, 26, 4, 6, 8, 1, '', 0),
(6, 13, 1, 2, 7, -1, 5, 1, 'Matter', 38, 0, 29, 9, 0, 18, 0, '', 0),
(7, 11, 1, 4, 0, 7, 5, 5, 'Pulse', 55, 0, 37, 18, 12, 6, 1, 'pen', 0),
(8, 18, 1, 2, 11, -1, 5, 69, 'Particle', 16, 0, 0, 16, 0, 18, 0, 'block', 0),
(9, 18, 1, 2, 11, 13, 5, 41, 'Particle', 13, 0, 8, 18, 0, 9, 0, 'pen', 0),
(10, 18, 1, 2, 11, -1, 5, 58, 'Particle', 14, 0, 0, 14, 0, 17, 0, 'block', 0),
(11, 18, 1, 2, 11, -1, 5, 18, 'Particle', 13, 0, 0, 14, 0, 16, 0, 'block', 0),
(12, 18, 1, 2, 11, -1, 5, 76, 'Particle', 14, 0, 0, 14, 0, 16, 0, 'block', 0),
(13, 18, 1, 2, 11, 13, 5, 37, 'Particle', 16, 0, 16, 16, 0, 8, 0, 'pen', 0),
(14, 18, 1, 2, 11, 5, 5, 67, 'Particle', 15, 0, 0, 16, 0, 15, 0, 'block', 0);

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
(1, 1, 1, 1, -1, -548, -107, 62),
(2, 1, 2, 1, -1, 583, 484, 55);

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
(1, 3, 8, 'Aurora'),
(2, 4, 6, 'Sentri'),
(3, 5, 6, 'Nial');

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
(2, 1, 2, 2, 0, 0, 0, 16, 0, 0, '', 0, 1),
(3, 1, 3, 1, 2, 0, 0, 14, 1, 41, '66 ', 0, 1),
(4, 1, 3, 2, 1, 0, 0, 9, 1, 19, '13 61 ', 1, 1),
(5, 1, 3, 2, 1, 0, 0, 12, 1, 19, '45 ', 0, 1),
(6, 1, 3, 2, 1, 0, 0, 13, 1, 19, '95 ', 0, 1),
(7, 1, 4, 2, 3, 0, 0, 8, 1, 29, '40 14 58 86 ', 1, 1),
(8, 1, 4, 2, 3, 0, 0, 10, 1, 29, '54 95 39 26 ', 1, 1),
(9, 1, 4, 2, 3, 0, 0, 17, 1, 27, '34 90 ', 0, 1),
(10, 1, 5, 1, 2, 0, 0, 8, 1, 51, '2 86 ', 1, 1),
(11, 1, 5, 1, 4, 0, 0, 9, 1, 10, '5 ', 3, 1),
(12, 1, 5, 1, 4, 0, 0, 11, 1, 10, '19 ', 0, 1),
(13, 1, 5, 1, 2, 0, 0, 12, 1, 51, '6 1 ', 2, 1),
(14, 1, 5, 1, 4, 0, 0, 15, 1, 10, '73 ', 0, 1),
(15, 1, 5, 1, 4, 0, 0, 16, 1, 10, '19 ', 0, 1),
(16, 1, 5, 1, 4, 0, 0, 22, 1, 10, '68 ', 0, 1),
(17, 1, 5, 1, 4, 0, 0, 23, 1, 10, '54 ', 0, 1),
(18, 1, 5, 3, 2, 0, 0, 2, 8, 80, '69 94 41 58 18 76 37 67 ', 7, 1),
(19, 1, 5, 3, 2, 0, 0, 4, 0, 80, '', 0, 1),
(20, 1, 5, 3, 2, 0, 0, 6, 0, 80, '', 0, 1),
(21, 1, 5, 3, 2, 0, 0, 8, 0, 80, '', 0, 1),
(22, 1, 5, 3, 2, 0, 0, 10, 0, 80, '', 0, 1),
(23, 1, 5, 3, 2, 0, 0, 12, 0, 80, '', 0, 1),
(24, 1, 5, 3, 2, 0, 0, 14, 0, 80, '', 0, 1),
(25, 1, 5, 3, 2, 0, 0, 16, 0, 80, '', 0, 1);

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
(1, 'myGame', 'active', 6, 2, 1500, 1);

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
(2, 2, 16, 'Sentri', 6);

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
(1, 3, '2', 2, 2, 383, 458, 5),
(2, 4, '2', 2, 3, 344, 48, 6),
(3, 5, '1', 2, 0, 200, 200, 5);

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
(1, 1, 1, 6, 2, 'Earth Alliance', 423, 'waiting'),
(2, 2, 1, 6, 2, 'Centauri Republic', 812, 'waiting');

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
(8, 1, 9, 2, '-1', 0),
(9, 1, 11, 2, '-1', 0),
(10, 1, 15, 2, '-1', 0),
(11, 1, 16, 2, '-1', 0),
(12, 1, 19, 2, '0', 0),
(13, 1, 22, 2, '-1', 0),
(14, 1, 23, 2, '-1', 0),
(15, 1, 9, 3, '-1', 0),
(16, 1, 11, 3, '-1', 0),
(17, 1, 15, 3, '-1', 0),
(18, 1, 16, 3, '-1', 0),
(19, 1, 19, 3, '0', 0),
(20, 1, 22, 3, '-1', 0),
(21, 1, 23, 3, '-1', 0),
(22, 1, 9, 4, '-1', 0),
(23, 1, 11, 4, '-1', 0),
(24, 1, 15, 4, '-1', 0),
(25, 1, 16, 4, '-1', 0),
(26, 1, 19, 4, '0', 0),
(27, 1, 22, 4, '-1', 0),
(28, 1, 23, 4, '-1', 0),
(29, 1, 9, 5, '-1', 0),
(30, 1, 11, 5, '-1', 0),
(31, 1, 15, 5, '-1', 0),
(32, 1, 16, 5, '-1', 0),
(33, 1, 19, 5, '0', 0),
(34, 1, 22, 5, '-1', 0),
(35, 1, 23, 5, '-1', 0),
(36, 1, 9, 6, '-1', 0),
(37, 1, 11, 6, '-1', 0),
(38, 1, 15, 6, '-1', 0),
(39, 1, 16, 6, '-1', 0),
(40, 1, 19, 6, '0', 0),
(41, 1, 22, 6, '-1', 0),
(42, 1, 23, 6, '-1', 0);

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
(1, 1, 2, 'Altarian', 4, 578),
(2, 1, 1, 'Tethys', 3, 242),
(3, 1, 2, 'Altarian', 4, 420),
(4, 1, 1, 'Omega', 6, 1440),
(5, 1, 1, 'Omega', 6, 1320);

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
(1, 2, 5, 1, -1, 174, 0),
(2, 1, 5, 1, -1, 162, 0),
(3, 1, 5, 2, -1, 162, 0),
(4, 2, 5, 2, -1, 174, 0),
(5, 1, 5, 3, -1, 162, 0),
(6, 2, 5, 3, -1, 174, 0),
(7, 1, 5, 4, -1, 162, 0),
(8, 2, 5, 4, -1, 174, 0),
(9, 2, 5, 5, -1, 174, 0),
(10, 1, 5, 5, -1, 162, 0),
(11, 2, 5, 6, -1, 174, 0),
(12, 1, 5, 6, -1, 162, 0);

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
(1, 1, 1, 1, 0, 'Hyperion', 'bought', 1, 0, -46, 248, 99, 0, 170, 5, 3),
(2, 1, 2, 1, 0, 'Altarian', 'bought', 1, 0, -196, 491, 277, 70, 180, 5, 3),
(3, 1, 1, 0, 0, 'Flight', 'deployed', 2, 0, -196, 491, 187, 0, 213, 5, 3),
(4, 1, 2, 0, 0, 'Flight', 'deployed', 2, 0, -70, 407, 146, 0, 276, 5, 3),
(5, 1, 2, 0, 0, 'Flight', 'deployed', 2, 0, 200, 200, 153, 0, 231, 5, 3);

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
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;
--
-- AUTO_INCREMENT für Tabelle `damages`
--
ALTER TABLE `damages`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT für Tabelle `deploys`
--
ALTER TABLE `deploys`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT für Tabelle `dogfights`
--
ALTER TABLE `dogfights`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `fighters`
--
ALTER TABLE `fighters`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT für Tabelle `fireorders`
--
ALTER TABLE `fireorders`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
--
-- AUTO_INCREMENT für Tabelle `games`
--
ALTER TABLE `games`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT für Tabelle `loads`
--
ALTER TABLE `loads`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT für Tabelle `missions`
--
ALTER TABLE `missions`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT für Tabelle `playerstatus`
--
ALTER TABLE `playerstatus`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT für Tabelle `powers`
--
ALTER TABLE `powers`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;
--
-- AUTO_INCREMENT für Tabelle `reinforcements`
--
ALTER TABLE `reinforcements`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT für Tabelle `sensors`
--
ALTER TABLE `sensors`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT für Tabelle `systemcrits`
--
ALTER TABLE `systemcrits`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `units`
--
ALTER TABLE `units`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

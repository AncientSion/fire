-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 03. Sep 2017 um 21:43
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
(1, 6, 1, 'deploy', 0, 543, -204, 180, 0, 0, 1, 1),
(2, 4, 1, 'deploy', 0, 381, 204, 204, 0, 0, 1, 1),
(3, 5, 1, 'deploy', 0, 406, 139, 209, 0, 0, 1, 1),
(4, 7, 1, 'deploy', 0, 452, 218, 212, 0, 0, 1, 1),
(5, 2, 1, 'deploy', 0, -648, -167, 0, 0, 0, 1, 1),
(6, 3, 1, 'deploy', 0, -541, 433, 0, 0, 0, 1, 1),
(7, 1, 1, 'deploy', 0, -528, -526, 0, 0, 0, 1, 1),
(8, 1, 1, 'jump', 26, -504, -516, -5, 0, 0, 0, 1),
(9, 2, 1, 'jump', 11, -648, -156, 9, 0, 0, 0, 1),
(10, 3, 1, 'jump', 30, -570, 429, -16, 0, 0, 0, 1),
(11, 4, 1, 'jump', 26, 372, 180, -7, 0, 0, 0, 1),
(12, 5, 1, 'jump', 19, 424, 133, 9, 0, 0, 0, 1),
(13, 6, 1, 'jump', 22, 536, -184, 16, 0, 0, 0, 1),
(14, 7, 1, 'jump', 6, 451, 223, -1, 0, 0, 0, 1),
(15, 2, 1, 'turn', 0, -648, -156, -3, 7, 8, 1, 1),
(16, 2, 1, 'move', 150, -499, -140, 0, 0, 0, 1, 1),
(17, 3, 1, 'turn', 0, -570, 429, -4, 12, 12, 1, 1),
(18, 3, 1, 'move', 150, -429, 378, 0, 0, 0, 1, 1),
(19, 1, 1, 'turn', 0, -504, -516, 7, 6, 12, 1, 1),
(20, 1, 1, 'move', 160, -344, -510, 0, 0, 0, 1, 1),
(21, 6, 1, 'speed', -1, 536, -184, 0, 363, 0, 1, 1),
(22, 6, 1, 'turn', 0, 536, -184, -8, 29, 21, 1, 1),
(23, 6, 1, 'move', 120, 417, -201, 0, 0, 0, 1, 1),
(24, 4, 1, 'turn', 0, 372, 180, -28, 32, 53, 1, 1),
(25, 4, 1, 'move', 160, 215, 211, 0, 0, 0, 1, 1),
(26, 5, 1, 'turn', 0, 424, 133, -30, 35, 56, 1, 1),
(27, 5, 1, 'move', 56, 369, 125, 0, 0, 0, 1, 1),
(28, 5, 1, 'turn', 0, 369, 125, -15, 18, 28, 1, 1),
(29, 5, 1, 'move', 104, 266, 138, 0, 0, 0, 1, 1),
(30, 7, 1, 'turn', 0, 451, 223, 5, 2, 5, 1, 1),
(31, 7, 1, 'move', 170, 313, 123, 0, 0, 0, 1, 1),
(32, 8, 2, 'deploy', 0, -429, 378, 0, 0, 0, 1, 1),
(33, 9, 2, 'deploy', 0, -480, -134, 18, 0, 0, 1, 1),
(34, 10, 2, 'deploy', 0, 196, 216, 165, 0, 0, 1, 1),
(35, 11, 2, 'deploy', 0, 247, 145, 161, 0, 0, 1, 1),
(36, 12, 2, 'deploy', 0, -330, -495, 44, 0, 0, 0, 1);

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
(1, 2, 1, 2, 7, 10, 1, 30, 'Particle', 56, 0, 45, 11, 0, 11, 0, 'pen', 0),
(2, 2, 1, 2, 7, 9, 1, 18, 'Particle', 63, 0, 28, 9, 26, 9, 1, 'pen', 0),
(3, 3, 1, 2, 7, -1, 1, 20, 'Particle', 52, 0, 31, 21, 0, 21, 0, 'pen', 0),
(4, 3, 1, 2, 7, -1, 1, 9, 'Particle', 59, 0, 38, 21, 0, 21, 0, 'pen', 0),
(5, 5, 1, 2, 7, 10, 1, 2, 'Particle', 60, 0, 50, 10, 0, 10, 0, 'pen', 0),
(6, 6, 1, 3, 7, -1, 1, 34, 'Particle', 63, 0, 41, 22, 0, 22, 0, 'pen', 0),
(7, 8, 1, 3, 7, -1, 1, 27, 'Particle', 37, 0, 16, 21, 0, 21, 0, 'pen', 0),
(8, 9, 1, 3, 7, -1, 1, 58, 'Particle', 52, 0, 32, 20, 0, 20, 0, 'pen', 0),
(9, 9, 1, 3, 7, 10, 1, 20, 'Particle', 64, 0, 54, 10, 0, 10, 0, 'pen', 0),
(10, 11, 1, 3, 7, -1, 1, 1, 'Particle', 46, 0, 27, 19, 0, 19, 0, 'pen', 0),
(11, 12, 1, 4, 11, -1, 1, 2, 'Laser', 171, 0, 39, 18, 0, 18, 0, 'pen', 0),
(12, 12, 1, 4, 11, -1, 1, 2, 'Laser', 171, 0, 40, 17, 0, 17, 0, 'pen', 0),
(13, 12, 1, 4, 11, -1, 1, 2, 'Laser', 171, 0, 40, 17, 0, 17, 0, 'pen', 0),
(14, 13, 1, 6, 7, -1, 1, 58, 'Laser', 153, 0, 25, 26, 0, 26, 0, 'pen', 0),
(15, 13, 1, 6, 7, -1, 1, 58, 'Laser', 153, 0, 26, 25, 0, 25, 0, 'pen', 0),
(16, 13, 1, 6, 7, -1, 1, 58, 'Laser', 153, 0, 27, 24, 0, 24, 0, 'pen', 0),
(17, 15, 1, 6, 22, -1, 1, 61, 'Laser', 150, 0, 26, 24, 0, 24, 0, 'pen', 0),
(18, 15, 1, 6, 22, -1, 1, 61, 'Laser', 150, 0, 27, 23, 0, 23, 0, 'pen', 0),
(19, 15, 1, 6, 22, -1, 1, 61, 'Laser', 150, 0, 27, 23, 0, 23, 0, 'pen', 0),
(20, 16, 1, 6, 7, -1, 1, 1, 'Matter', 37, 0, 25, 12, 0, 24, 0, '', 0),
(21, 17, 1, 6, 7, -1, 1, 4, 'Matter', 59, 0, 48, 12, 0, 23, 0, '', 0),
(22, 17, 1, 6, 7, -1, 1, 21, 'Matter', 71, 0, 60, 12, 0, 23, 0, '', 0),
(23, 18, 1, 6, 7, 10, 1, 3, 'Matter', 35, 0, 29, 7, 0, 13, 0, '', 0);

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
(1, 1, 1, 1, -1, -649, -166, 44),
(2, 1, 1, 1, -1, -529, -526, 43),
(3, 1, 1, 1, -1, -539, 431, 46),
(4, 1, 2, 1, -1, 573, 81, 46),
(5, 1, 2, 1, -1, 403, 171, 70),
(6, 1, 2, 1, -1, 472, 222, 47),
(7, 1, 2, 1, -1, 529, -202, 68);

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
(1, 1, 1, 6, 2, 0, 0, 8, 1, 46, '62 100 ', 0, 1),
(2, 1, 1, 6, 2, 0, 0, 9, 1, 46, '30 18 ', 2, 1),
(3, 1, 1, 6, 2, 0, 0, 10, 1, 46, '20 9 ', 2, 1),
(4, 1, 1, 6, 2, 0, 0, 11, 1, 46, '96 87 ', 0, 1),
(5, 1, 1, 6, 2, 0, 0, 24, 1, 46, '81 2 ', 1, 1),
(6, 1, 1, 4, 3, 0, 0, 9, 1, 65, '34 89 ', 1, 1),
(7, 1, 1, 4, 3, 0, 0, 18, 1, 39, '67 ', 0, 1),
(8, 1, 1, 4, 3, 0, 0, 19, 1, 39, '27 ', 1, 1),
(9, 1, 1, 5, 3, 0, 0, 9, 1, 59, '58 20 ', 2, 1),
(10, 1, 1, 5, 3, 0, 0, 18, 1, 29, '31 ', 0, 1),
(11, 1, 1, 5, 3, 0, 0, 19, 1, 29, '1 ', 1, 1),
(12, 1, 1, 2, 4, 0, 0, 14, 1, 33, '2 ', 3, 1),
(13, 1, 1, 2, 6, 0, 0, 21, 1, 62, '58 ', 3, 1),
(14, 1, 1, 3, 4, 0, 0, 14, 1, 38, '99 ', 0, 1),
(15, 1, 1, 3, 6, 0, 0, 21, 1, 63, '61 ', 3, 1),
(16, 1, 1, 1, 6, 0, 0, 8, 1, 35, '59 1 ', 1, 1),
(17, 1, 1, 1, 6, 0, 0, 9, 1, 68, '4 21 ', 2, 1),
(18, 1, 1, 1, 6, 0, 0, 10, 1, 35, '46 3 ', 1, 1),
(19, 1, 2, 2, 0, 0, 0, 10, 0, 0, '', 0, 1),
(20, 1, 2, 3, 0, 0, 0, 10, 0, 0, '', 0, 1),
(21, 1, 2, 1, 7, 0, 0, 14, 3, 0, '', 0, 1),
(22, 1, 2, 1, 7, 0, 0, 18, 3, 0, '', 0, 1),
(23, 1, 2, 4, 0, 0, 0, 16, 0, 0, '', 0, 1),
(24, 1, 2, 5, 0, 0, 0, 16, 0, 0, '', 0, 1);

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
(1, 'myGame', 'active', 2, 0, 3000, 100);

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
(1, 1, 14, 'Naga', 6),
(2, 1, 18, 'Naga', 6),
(3, 2, 10, 'Aurora', 10),
(4, 3, 10, 'Aurora', 10),
(5, 4, 16, 'Sentri', 6),
(6, 4, 16, 'Sitara', 2),
(7, 5, 16, 'Sentri', 6),
(8, 5, 16, 'Sitara', 2),
(9, 7, 9, 'Hasta', 8);

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
(1, 8, '2', 2, 3, -429, 378, 1),
(2, 9, '2', 2, 7, 313, 123, 0),
(3, 10, '2', 2, 3, -429, 378, 0),
(4, 11, '2', 2, 3, -429, 378, 0),
(5, 12, '2', 2, 7, 313, 123, 0);

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
(1, 1, 1, 2, 0, 'Earth Alliance', 150, 'waiting'),
(2, 2, 1, 2, 0, 'Centauri Republic', 130, 'waiting');

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
(1, 6, 14, 1, '0', 0),
(2, 6, 15, 1, '0', 0),
(3, 6, 16, 1, '0', 0),
(4, 6, 17, 1, '0', 0),
(5, 6, 23, 1, '0', 0),
(6, 6, 25, 1, '0', 0),
(7, 6, 26, 1, '0', 0),
(8, 6, 27, 1, '0', 0),
(9, 6, 5, 1, '1', 6),
(10, 6, 5, 1, '1', 8),
(11, 4, 8, 1, '0', 0),
(12, 4, 10, 1, '0', 0),
(13, 4, 14, 1, '0', 0),
(14, 4, 20, 1, '0', 0),
(15, 4, 5, 1, '1', 4),
(16, 4, 5, 1, '1', 6),
(17, 5, 8, 1, '0', 0),
(18, 5, 10, 1, '0', 0),
(19, 5, 14, 1, '0', 0),
(20, 5, 20, 1, '0', 0),
(21, 5, 5, 1, '1', 4),
(22, 5, 5, 1, '1', 6),
(23, 2, 9, 1, '-2', 0),
(24, 2, 11, 1, '-2', 0),
(25, 2, 15, 1, '-2', 0),
(26, 2, 16, 1, '-2', 0),
(27, 2, 18, 1, '0', 0),
(28, 2, 19, 1, '0', 0),
(29, 2, 22, 1, '-2', 0),
(30, 2, 23, 1, '-2', 0),
(31, 2, 5, 1, '1', 4),
(32, 3, 9, 1, '-2', 0),
(33, 3, 11, 1, '-2', 0),
(34, 3, 15, 1, '-2', 0),
(35, 3, 16, 1, '-2', 0),
(36, 3, 18, 1, '0', 0),
(37, 3, 19, 1, '0', 0),
(38, 3, 22, 1, '-2', 0),
(39, 3, 23, 1, '-2', 0),
(40, 3, 5, 1, '1', 4),
(41, 1, 12, 1, '-1', 0),
(42, 1, 13, 1, '-1', 0),
(43, 1, 16, 1, '-1', 0),
(44, 1, 17, 1, '-1', 0),
(45, 1, 17, 1, '0', 0),
(46, 2, 11, 2, '-2', 0),
(47, 2, 15, 2, '-2', 0),
(48, 2, 16, 2, '-2', 0),
(49, 2, 18, 2, '0', 0),
(50, 2, 19, 2, '0', 0),
(51, 2, 22, 2, '-2', 0),
(52, 2, 23, 2, '-2', 0),
(53, 3, 9, 2, '-2', 0),
(54, 3, 11, 2, '-2', 0),
(55, 3, 15, 2, '-2', 0),
(56, 3, 16, 2, '-2', 0),
(57, 3, 18, 2, '0', 0),
(58, 3, 19, 2, '0', 0),
(59, 3, 22, 2, '-2', 0),
(60, 3, 23, 2, '-2', 0),
(61, 1, 12, 2, '-1', 0),
(62, 1, 13, 2, '-1', 0),
(63, 1, 14, 2, '1', 0),
(64, 1, 14, 2, '1', 0),
(65, 1, 14, 2, '1', 0),
(66, 1, 16, 2, '-1', 0),
(67, 1, 17, 2, '-1', 0),
(68, 1, 17, 2, '0', 0),
(69, 1, 18, 2, '1', 0),
(70, 1, 18, 2, '1', 0),
(71, 1, 18, 2, '1', 0),
(72, 6, 8, 2, '1', 4),
(73, 6, 8, 2, '1', 4),
(74, 6, 9, 2, '1', 4),
(75, 6, 9, 2, '1', 4),
(76, 6, 10, 2, '1', 4),
(77, 6, 11, 2, '1', 4),
(78, 6, 14, 2, '0', 0),
(79, 6, 15, 2, '0', 0),
(80, 6, 16, 2, '0', 0),
(81, 6, 17, 2, '0', 0),
(82, 6, 19, 2, '0', 0),
(83, 6, 20, 2, '0', 0),
(84, 6, 21, 2, '0', 0),
(85, 6, 23, 2, '0', 0),
(86, 6, 25, 2, '0', 0),
(87, 6, 26, 2, '0', 0),
(88, 6, 27, 2, '0', 0),
(89, 4, 14, 2, '0', 0),
(90, 4, 18, 2, '1', 3),
(91, 4, 19, 2, '1', 3),
(92, 4, 20, 2, '0', 0),
(93, 5, 14, 2, '0', 0),
(94, 5, 18, 2, '1', 3),
(95, 5, 19, 2, '1', 3),
(96, 5, 20, 2, '0', 0);

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
(1, 1, 2, 'Vorchan', 2, 396);

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
(1, 6, 5, 1, 359, 1055, 0),
(2, 4, 5, 1, 358, 900, 0),
(3, 5, 5, 1, 359, 900, 0),
(4, 7, 5, 1, -1, 116, 0),
(5, 2, 5, 1, -1, 1000, 3),
(6, 3, 5, 1, -1, 1000, 3),
(7, 1, 5, 1, -1, 1000, 3),
(8, 2, 5, 2, 4, 627, 0),
(9, 3, 5, 2, 0, 630, 0),
(10, 1, 5, 2, 0, 625, 0),
(11, 6, 5, 2, 1, 667, 0),
(12, 4, 5, 2, 359, 488, 1),
(13, 5, 5, 2, 359, 508, 1),
(14, 7, 5, 2, -1, 1000, 3);

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
(1, 8, 10, 'Aurora'),
(2, 9, 10, 'Aurora'),
(3, 10, 6, 'Sentri'),
(4, 10, 2, 'Sitara'),
(5, 11, 6, 'Sentri'),
(6, 11, 2, 'Sitara'),
(7, 12, 6, 'Naga');

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
(1, 6, 10, 1, 'Damage', 0, '0.20');

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
(1, 1, 1, 1, 0, 'Artemis', 'bought', 1, 0, -344, -510, 2, 0, 160, 1, 3),
(2, 1, 1, 1, 0, 'Hyperion', 'bought', 1, 0, -499, -140, 6, 0, 150, 1, 3),
(3, 1, 1, 1, 0, 'Hyperion', 'bought', 1, 0, -429, 378, 340, 0, 150, 1, 3),
(4, 1, 2, 1, 0, 'Altarian', 'bought', 1, 0, 215, 211, 169, 0, 160, 1, 3),
(5, 1, 2, 1, 0, 'Altarian', 'bought', 1, 0, 266, 138, 173, 0, 160, 1, 3),
(6, 1, 2, 1, 0, 'Primus', 'bought', 1, 0, 417, -201, 188, 0, 120, 1, 3),
(7, 1, 2, 1, 0, 'Vorchan', 'bought', 1, 0, 313, 123, 216, 0, 170, 1, 3),
(8, 1, 1, 0, 0, 'Flight', 'deployed', 2, 0, -429, 378, 0, 0, 256, 2, -1),
(9, 1, 1, 0, 0, 'Flight', 'deployed', 2, 0, -480, -134, 18, 0, 256, 2, -1),
(10, 1, 2, 0, 0, 'Flight', 'deployed', 2, 0, 196, 216, 165, 0, 331, 2, -1),
(11, 1, 2, 0, 0, 'Flight', 'deployed', 2, 0, 247, 145, 161, 0, 331, 2, -1),
(12, 1, 1, 0, 1, 'Salvo', 'deployed', 2, 0, -330, -495, 44, NULL, NULL, 2, -1);

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
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;
--
-- AUTO_INCREMENT für Tabelle `damages`
--
ALTER TABLE `damages`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
--
-- AUTO_INCREMENT für Tabelle `deploys`
--
ALTER TABLE `deploys`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT für Tabelle `dogfights`
--
ALTER TABLE `dogfights`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `fireorders`
--
ALTER TABLE `fireorders`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
--
-- AUTO_INCREMENT für Tabelle `games`
--
ALTER TABLE `games`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT für Tabelle `loads`
--
ALTER TABLE `loads`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT für Tabelle `missions`
--
ALTER TABLE `missions`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT für Tabelle `playerstatus`
--
ALTER TABLE `playerstatus`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT für Tabelle `powers`
--
ALTER TABLE `powers`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;
--
-- AUTO_INCREMENT für Tabelle `reinforcements`
--
ALTER TABLE `reinforcements`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT für Tabelle `sensors`
--
ALTER TABLE `sensors`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT für Tabelle `subunits`
--
ALTER TABLE `subunits`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT für Tabelle `systemcrits`
--
ALTER TABLE `systemcrits`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT für Tabelle `units`
--
ALTER TABLE `units`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

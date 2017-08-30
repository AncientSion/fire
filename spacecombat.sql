-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 24. Aug 2017 um 15:12
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
(1, 4, 1, 'deploy', 0, 414, -584, 180, 0, 0, 1, 1),
(2, 5, 1, 'deploy', 0, 551, -226, 180, 0, 0, 1, 1),
(3, 6, 1, 'deploy', 0, 424, 146, 180, 0, 0, 1, 1),
(4, 1, 1, 'deploy', 0, -498, -571, 0, 0, 0, 1, 1),
(5, 2, 1, 'deploy', 0, -575, 265, 0, 0, 0, 1, 1),
(6, 3, 1, 'deploy', 0, -567, 330, 0, 0, 0, 1, 1),
(7, 1, 1, 'jump', 30, -522, -553, 10, 0, 0, 0, 1),
(8, 2, 1, 'jump', 15, -570, 279, 14, 0, 0, 0, 1),
(9, 3, 1, 'jump', 26, -542, 333, 9, 0, 0, 0, 1),
(10, 4, 1, 'jump', 20, 420, -565, 6, 0, 0, 0, 1),
(11, 5, 1, 'jump', 23, 552, -248, 11, 0, 0, 0, 1),
(12, 6, 1, 'jump', 26, 427, 121, 11, 0, 0, 0, 1),
(13, 4, 1, 'turn', 0, 420, -565, -19, 22, 36, 1, 1),
(14, 4, 1, 'move', 180, 245, -525, 0, 0, 0, 1, 1),
(15, 5, 1, 'turn', 0, 552, -248, -10, 12, 19, 1, 1),
(16, 5, 1, 'move', 180, 372, -251, 0, 0, 0, 1, 1),
(17, 6, 1, 'turn', 0, 427, 121, 6, 7, 11, 1, 1),
(18, 6, 1, 'move', 180, 255, 68, 0, 0, 0, 1, 1),
(19, 1, 1, 'move', 170, -355, -523, 0, 0, 0, 1, 1),
(20, 2, 1, 'turn', 0, -570, 279, -30, 76, 77, 1, 1),
(21, 2, 1, 'move', 170, -407, 232, 0, 0, 0, 1, 1),
(22, 3, 1, 'turn', 0, -542, 333, -30, 27, 51, 1, 1),
(23, 3, 1, 'move', 180, -374, 268, 0, 0, 0, 1, 1),
(24, 7, 2, 'deploy', 0, 225, -525, 180, 0, 0, 1, 1),
(25, 8, 2, 'deploy', 0, 353, -258, -159, 0, 0, 1, 1),
(26, 9, 2, 'deploy', 0, -388, 227, -14, 0, 0, 1, 1),
(27, 10, 2, 'launch', 0, -366, 270, -18, 0, 0, 0, 1),
(28, 1, 2, 'turn', 0, -355, -523, 30, 76, 77, 1, 0),
(29, 1, 2, 'move', 166, -269, -381, 0, 0, 0, 1, 0),
(30, 1, 2, 'turn', 0, -269, -381, -30, 152, 38, 2, 0),
(31, 1, 2, 'move', 4, -265, -380, 0, 0, 0, 1, 0),
(32, 2, 2, 'turn', 0, -407, 232, -30, 76, 77, 1, 0),
(33, 2, 2, 'move', 170, -333, 79, 0, 0, 0, 1, 0),
(34, 2, 2, 'turn', 0, -333, 79, 9, 45, 12, 2, 0),
(35, 3, 2, 'move', 179, -195, 259, 0, 0, 0, 1, 0),
(36, 3, 2, 'turn', 0, -195, 259, -30, 54, 25, 2, 0),
(37, 3, 2, 'move', 1, -194, 258, 0, 0, 0, 1, 0),
(38, 12, 1, 'deploy', 0, 524, -564, 180, 0, 0, 1, 1),
(39, 11, 1, 'deploy', 0, -611, 243, 0, 0, 0, 1, 1),
(40, 11, 1, 'jump', 39, -633, 211, 11, 0, 0, 0, 1),
(41, 12, 1, 'jump', 30, 510, -538, -7, 0, 0, 0, 1),
(42, 11, 1, 'turn', 0, -633, 211, -30, 159, 104, 1, 1),
(43, 11, 1, 'move', 155, -486, 161, 0, 0, 0, 1, 1),
(44, 12, 1, 'turn', 0, 510, -538, -21, 19, 36, 1, 1),
(45, 12, 1, 'move', 180, 351, -453, 0, 0, 0, 1, 1),
(46, 13, 2, 'deploy', 0, -470, 149, -36, 0, 0, 1, 1),
(47, 14, 2, 'deploy', 0, 343, -451, 144, 0, 0, 0, 1),
(48, 11, 2, 'turn', 0, -486, 161, 24, 130, 84, 1, 1),
(49, 11, 2, 'move', 155, -332, 175, 0, 0, 0, 1, 1),
(50, 12, 2, 'move', 180, 192, -368, 0, 0, 0, 1, 1),
(51, 13, 2, 'move', 840, -282, 3, 322, 0, 0, 0, 1),
(52, 14, 2, 'move', 178, 212, -330, 137, 0, 0, 0, 1),
(53, 11, 3, 'turn', 0, -332, 175, -3, 19, 13, 1, 1),
(54, 11, 3, 'move', 149, -189, 132, 0, 0, 0, 1, 1),
(55, 11, 3, 'turn', 0, -189, 132, -30, 318, 52, 2, 1),
(56, 11, 3, 'move', 6, -184, 129, 0, 0, 0, 1, 1),
(57, 12, 3, 'turn', 0, 192, -368, -30, 27, 51, 1, 1),
(58, 12, 3, 'move', 180, 97, -215, 0, 0, 0, 1, 1),
(59, 13, 3, 'move', 438, -76, -116, 330, 0, 0, 0, 1),
(60, 14, 3, 'move', 267, 38, -128, 131, 0, 0, 0, 1),
(61, 12, 4, 'move', 178, -42, -103, 0, 0, 0, 1, 0),
(62, 12, 4, 'turn', 0, -42, -103, -17, 32, 15, 2, 0),
(63, 12, 4, 'move', 2, -43, -101, 0, 0, 0, 1, 0);

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
(1, 2, 1, 1, 7, -1, 1, 18, 'Particle', 49, 0, 27, 22, 0, 22, 0, 'pen', 0),
(2, 3, 1, 2, 7, -1, 1, 12, 'Particle', 53, 0, 31, 22, 0, 22, 0, 'pen', 0),
(3, 6, 1, 6, 17, -1, 1, 6, 'Laser', 166, 0, 37, 18, 0, 18, 0, 'pen', 0),
(4, 6, 1, 6, 17, -1, 1, 6, 'Laser', 166, 0, 38, 17, 0, 17, 0, 'pen', 0),
(5, 6, 1, 6, 17, -1, 1, 6, 'Laser', 166, 0, 38, 17, 0, 17, 0, 'pen', 0),
(6, 16, 2, 11, 7, 12, 3, 16, 'Matter', 34, 0, 26, 9, 0, 17, 0, '', 0),
(7, 16, 2, 11, 7, -1, 3, 90, 'Matter', 31, 0, 19, 12, 0, 24, 0, '', 0),
(8, 17, 2, 11, 7, -1, 3, 27, 'Matter', 64, 0, 52, 12, 0, 24, 0, '', 0),
(9, 17, 2, 11, 7, 9, 3, 90, 'Matter', 62, 0, 50, 8, 4, 16, 1, '', 0),
(10, 18, 2, 11, 7, -1, 3, 59, 'Pulse', 74, 0, 0, 38, 0, 23, 0, 'block', 0),
(11, 19, 2, 11, 7, 10, 3, 27, 'Pulse', 89, 0, 34, 55, 0, 11, 0, 'pen', 0),
(12, 20, 2, 12, 7, -1, 3, 2, 'Laser', 138, 0, 26, 20, 0, 20, 0, 'pen', 0),
(13, 20, 2, 12, 7, -1, 3, 2, 'Laser', 138, 0, 27, 19, 0, 19, 0, 'pen', 0),
(14, 20, 2, 12, 7, -1, 3, 2, 'Laser', 138, 0, 28, 18, 0, 18, 0, 'pen', 0);

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
(1, 1, 1, 1, -1, -573, 272, 51),
(2, 1, 1, 1, -1, -490, -565, 69),
(3, 1, 1, 1, -1, -571, 306, 50),
(4, 1, 2, 1, -1, 415, 142, 50),
(5, 1, 2, 1, -1, 415, -596, 62),
(6, 1, 2, 1, -1, 551, -224, 55),
(7, 2, 1, 1, -1, -611, 244, 59),
(8, 2, 2, 1, -1, 537, -576, 53);

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
(1, 1, 1, 4, 1, 0, 0, 9, 1, 44, '52 87 ', 0, 1),
(2, 1, 1, 5, 1, 0, 0, 9, 1, 30, '18 58 ', 1, 1),
(3, 1, 1, 6, 2, 0, 0, 9, 1, 36, '72 12 ', 1, 1),
(4, 1, 1, 1, 5, 0, 0, 14, 1, 32, '86 ', 0, 1),
(5, 1, 1, 1, 4, 0, 0, 21, 1, 42, '94 ', 0, 1),
(6, 1, 1, 2, 6, 0, 0, 14, 1, 39, '6 ', 3, 1),
(7, 1, 1, 3, 6, 0, 0, 9, 1, 25, '72 60 ', 0, 1),
(8, 1, 2, 4, 0, 0, 0, 16, 0, 0, '', 0, 1),
(9, 1, 2, 5, 0, 0, 0, 16, 0, 0, '', 0, 1),
(10, 1, 2, 2, 0, 0, 0, 10, 0, 0, '', 0, 1),
(11, 1, 2, 3, 6, 0, 0, 14, 2, 0, '', 0, 1),
(12, 1, 2, 3, 6, 0, 0, 18, 2, 0, '', 0, 1),
(13, 2, 2, 11, 0, 0, 0, 10, 0, 0, '', 0, 1),
(14, 2, 2, 12, 11, 0, 0, 14, 2, 0, '', 0, 1),
(15, 2, 2, 12, 11, 0, 0, 18, 2, 0, '', 0, 1),
(16, 2, 3, 12, 11, 0, 0, 8, 1, 128, '16 90 ', 2, 1),
(17, 2, 3, 12, 11, 0, 0, 9, 1, 146, '27 90 ', 2, 1),
(18, 2, 3, 12, 11, 0, 0, 12, 1, 92, '59 ', 4, 1),
(19, 2, 3, 12, 11, 0, 0, 13, 1, 92, '27 ', 5, 1),
(20, 2, 3, 11, 12, 0, 0, 8, 1, 45, '2 ', 3, 1),
(21, 2, 3, 11, 12, 0, 0, 9, 1, 45, '97 ', 0, 1);

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
(1, 'myGame', 'active', 2, 0, 3000, 50),
(2, 'myGame', 'active', 4, 0, 5000, 50);

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
(1, 1, 10, 'Aurora', 12),
(3, 3, 14, 'Naga', 8),
(4, 3, 18, 'Naga', 8),
(7, 6, 16, 'Sentri', 8),
(8, 11, 10, 'Thunderbolt', 8),
(9, 12, 14, 'Naga', 4),
(10, 12, 18, 'Naga', 8);

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
(1, 7, '2', 2, 1, -355, -523, 0),
(2, 8, '2', 2, 1, -355, -523, 0),
(3, 9, '2', 2, 6, 255, 68, 0),
(4, 13, '2', 2, 12, 351, -453, 0),
(5, 14, '2', 2, 11, -486, 161, 0);

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
(1, 1, 1, 2, 0, 'Earth Alliance', 236, 'ready'),
(2, 2, 1, 2, 0, 'Centauri Republic', 971, 'waiting'),
(3, 1, 2, 4, 0, 'Earth Alliance', 3310, 'waiting'),
(4, 2, 2, 4, 0, 'Earth Alliance', 4500, 'ready');

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
(15, 3, 12, 1, '-1', 0),
(16, 3, 13, 1, '-1', 0),
(17, 3, 13, 1, '0', 0),
(18, 3, 16, 1, '-1', 0),
(19, 3, 17, 1, '-1', 0),
(20, 4, 8, 2, '0', 0),
(21, 4, 9, 2, '1', 4),
(22, 4, 10, 2, '0', 0),
(23, 5, 8, 2, '0', 0),
(24, 5, 9, 2, '1', 4),
(25, 5, 10, 2, '0', 0),
(26, 6, 8, 2, '0', 0),
(27, 6, 10, 2, '0', 0),
(28, 1, 9, 2, '-1', 0),
(29, 1, 11, 2, '-1', 0),
(30, 1, 15, 2, '-1', 0),
(31, 1, 16, 2, '-1', 0),
(32, 1, 19, 2, '0', 0),
(33, 1, 22, 2, '-1', 0),
(34, 1, 23, 2, '-1', 0),
(35, 2, 9, 2, '-1', 0),
(36, 2, 11, 2, '-1', 0),
(37, 2, 15, 2, '-1', 0),
(38, 2, 16, 2, '-1', 0),
(39, 2, 19, 2, '0', 0),
(40, 2, 22, 2, '-1', 0),
(41, 2, 23, 2, '-1', 0),
(42, 3, 12, 2, '-1', 0),
(43, 3, 13, 2, '-1', 0),
(44, 3, 13, 2, '0', 0),
(45, 3, 14, 2, '1', 0),
(46, 3, 14, 2, '1', 0),
(47, 3, 16, 2, '-1', 0),
(48, 3, 17, 2, '-1', 0),
(49, 3, 18, 2, '1', 0),
(50, 3, 18, 2, '1', 0),
(51, 12, 10, 1, '0', 0),
(52, 12, 12, 1, '-1', 0),
(53, 12, 13, 1, '-1', 0),
(54, 12, 16, 1, '-1', 0),
(55, 12, 17, 1, '-1', 0),
(56, 11, 8, 1, '-1', 0),
(57, 11, 9, 1, '-1', 0),
(58, 11, 11, 1, '-1', 0),
(59, 11, 12, 1, '-1', 0),
(60, 11, 14, 1, '-1', 0),
(61, 11, 15, 1, '-1', 0),
(62, 11, 16, 1, '-1', 0),
(63, 11, 17, 1, '-1', 0),
(64, 11, 18, 1, '-1', 0),
(65, 11, 19, 1, '-1', 0),
(66, 11, 23, 1, '0', 0),
(67, 11, 24, 1, '0', 0),
(68, 11, 25, 1, '0', 0),
(69, 11, 27, 1, '-1', 0),
(70, 11, 28, 1, '-1', 0),
(71, 11, 29, 1, '-1', 0),
(72, 11, 30, 1, '-1', 0),
(73, 11, 31, 1, '-1', 0),
(74, 11, 32, 1, '-1', 0),
(75, 11, 8, 2, '-1', 0),
(76, 11, 9, 2, '-1', 0),
(77, 11, 11, 2, '-1', 0),
(78, 11, 12, 2, '-1', 0),
(79, 11, 14, 2, '-1', 0),
(80, 11, 15, 2, '-1', 0),
(81, 11, 16, 2, '-1', 0),
(82, 11, 17, 2, '-1', 0),
(83, 11, 18, 2, '-1', 0),
(84, 11, 19, 2, '-1', 0),
(85, 11, 23, 2, '0', 0),
(86, 11, 24, 2, '0', 0),
(87, 11, 25, 2, '0', 0),
(88, 11, 27, 2, '-1', 0),
(89, 11, 28, 2, '-1', 0),
(90, 11, 29, 2, '-1', 0),
(91, 11, 30, 2, '-1', 0),
(92, 11, 31, 2, '-1', 0),
(93, 11, 32, 2, '-1', 0),
(94, 12, 10, 2, '0', 0),
(95, 12, 12, 2, '-1', 0),
(96, 12, 13, 2, '-1', 0),
(97, 12, 14, 2, '1', 0),
(98, 12, 14, 2, '1', 0),
(99, 12, 16, 2, '-1', 0),
(100, 12, 17, 2, '-1', 0),
(101, 12, 18, 2, '1', 0),
(102, 12, 18, 2, '1', 0),
(103, 11, 8, 3, '-1', 0),
(104, 11, 9, 3, '-1', 0),
(105, 11, 11, 3, '-1', 0),
(106, 11, 12, 3, '-1', 0),
(107, 11, 14, 3, '-1', 0),
(108, 11, 15, 3, '-1', 0),
(109, 11, 16, 3, '-1', 0),
(110, 11, 17, 3, '-1', 0),
(111, 11, 18, 3, '-1', 0),
(112, 11, 19, 3, '-1', 0),
(113, 11, 23, 3, '0', 0),
(114, 11, 24, 3, '0', 0),
(115, 11, 25, 3, '0', 0),
(116, 11, 27, 3, '-1', 0),
(117, 11, 28, 3, '-1', 0),
(118, 11, 29, 3, '-1', 0),
(119, 11, 30, 3, '-1', 0),
(120, 11, 31, 3, '-1', 0),
(121, 11, 32, 3, '-1', 0),
(122, 12, 10, 3, '0', 0),
(123, 12, 12, 3, '-1', 0),
(124, 12, 13, 3, '-1', 0),
(125, 12, 16, 3, '-1', 0),
(126, 12, 17, 3, '-1', 0),
(127, 11, 8, 4, '-1', 0),
(128, 11, 11, 4, '-1', 0),
(129, 11, 11, 4, '1', 4),
(130, 11, 12, 4, '-1', 0),
(131, 11, 12, 4, '1', 4),
(132, 11, 14, 4, '-1', 0),
(133, 11, 15, 4, '-1', 0),
(134, 11, 16, 4, '-1', 0),
(135, 11, 17, 4, '-1', 0),
(136, 11, 18, 4, '-1', 0),
(137, 11, 19, 4, '-1', 0),
(138, 11, 21, 4, '0', 0),
(139, 11, 22, 4, '0', 0),
(140, 11, 23, 4, '0', 0),
(141, 11, 24, 4, '0', 0),
(142, 11, 25, 4, '0', 0),
(143, 11, 27, 4, '-1', 0),
(144, 11, 28, 4, '-1', 0),
(145, 11, 29, 4, '-1', 0),
(146, 11, 30, 4, '-1', 0),
(147, 11, 31, 4, '-1', 0),
(148, 11, 32, 4, '-1', 0),
(149, 12, 10, 4, '0', 0),
(150, 12, 12, 4, '-1', 0),
(151, 12, 13, 4, '-1', 0),
(152, 12, 16, 4, '-1', 0),
(153, 12, 17, 4, '-1', 0);

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
(1, 2, 1, 'Hyperion', 5, 850),
(2, 2, 2, 'Tethys', 2, 264),
(3, 2, 1, 'Artemis', 3, 490),
(4, 2, 1, 'Artemis', 4, 441),
(5, 2, 2, 'Hyperion', 4, 680);

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
(1, 4, 5, 1, -1, 174, 0),
(2, 5, 5, 1, -1, 174, 0),
(3, 6, 5, 1, -1, 174, 0),
(4, 1, 5, 1, -1, 162, 0),
(5, 2, 5, 1, -1, 162, 0),
(6, 3, 5, 1, -1, 151, 0),
(7, 4, 5, 2, 13, 447, 0),
(8, 5, 5, 2, 356, 656, 0),
(9, 6, 5, 2, 5, 610, 0),
(10, 1, 5, 2, 7, 535, 0),
(11, 2, 5, 2, 1, 600, 0),
(12, 3, 5, 2, 1, 541, 0),
(13, 12, 5, 1, -1, 151, 0),
(14, 11, 5, 1, -1, 214, 0),
(15, 11, 5, 2, -1, 214, 0),
(16, 12, 5, 2, -1, 151, 0),
(17, 11, 5, 3, -1, 214, 0),
(18, 12, 5, 3, 359, 563, 0),
(19, 11, 5, 4, -1, 214, 1),
(20, 12, 5, 4, -1, 151, 0);

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
(1, 7, 8, 'Sentri'),
(2, 8, 8, 'Sentri'),
(3, 9, 12, 'Aurora'),
(4, 13, 12, 'Thunderbolt'),
(5, 14, 4, 'Naga');

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
(1, 11, 12, 3, 'Accuracy', 0, '0.30');

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
(1, 1, 1, 1, 0, 'Hyperion', 'bought', 1, 0, -355, -523, 10, 0, 170, 1, 3),
(2, 1, 1, 1, 0, 'Hyperion', 'bought', 1, 0, -407, 232, 344, 0, 170, 1, 3),
(3, 1, 1, 1, 0, 'Artemis', 'bought', 1, 0, -374, 268, 339, 0, 180, 1, 3),
(4, 1, 2, 1, 0, 'Altarian', 'bought', 1, 0, 245, -525, 167, 0, 180, 1, 3),
(5, 1, 2, 1, 0, 'Altarian', 'bought', 1, 0, 372, -251, 181, 0, 180, 1, 3),
(6, 1, 2, 1, 0, 'Altarian', 'bought', 1, 0, 255, 68, 197, 0, 180, 1, 3),
(7, 1, 2, 0, 0, 'Flight', 'deployed', 2, 0, 225, -525, 180, 0, 359, 2, -1),
(8, 1, 2, 0, 0, 'Flight', 'deployed', 2, 0, 353, -258, -159, 0, 359, 2, -1),
(9, 1, 1, 0, 0, 'Flight', 'deployed', 2, 0, -388, 227, -14, 0, 277, 2, -1),
(10, 1, 1, 6, 4, 'Naga', 'launched', 2, 0, -366, 270, -18, 0, 178, 2, -1),
(11, 2, 1, 1, 0, 'Omega', 'bought', 1, 0, -184, 129, 332, 46, 155, 3, 3),
(12, 2, 2, 1, 0, 'Artemis', 'bought', 1, 0, 97, -215, 122, 0, 180, 3, 3),
(13, 2, 1, 0, 0, 'Flight', 'deployed', 2, 0, -76, -116, 330, 0, 238, 3, 3),
(14, 2, 2, 0, 1, 'Salvo', 'deployed', 2, 0, 38, -128, 131, 0, 267, 3, 3);

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
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;
--
-- AUTO_INCREMENT für Tabelle `damages`
--
ALTER TABLE `damages`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT für Tabelle `deploys`
--
ALTER TABLE `deploys`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT für Tabelle `dogfights`
--
ALTER TABLE `dogfights`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `fireorders`
--
ALTER TABLE `fireorders`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
--
-- AUTO_INCREMENT für Tabelle `games`
--
ALTER TABLE `games`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT für Tabelle `loads`
--
ALTER TABLE `loads`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT für Tabelle `missions`
--
ALTER TABLE `missions`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT für Tabelle `playerstatus`
--
ALTER TABLE `playerstatus`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT für Tabelle `powers`
--
ALTER TABLE `powers`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=154;
--
-- AUTO_INCREMENT für Tabelle `reinforcements`
--
ALTER TABLE `reinforcements`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT für Tabelle `sensors`
--
ALTER TABLE `sensors`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT für Tabelle `subunits`
--
ALTER TABLE `subunits`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT für Tabelle `systemcrits`
--
ALTER TABLE `systemcrits`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT für Tabelle `units`
--
ALTER TABLE `units`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
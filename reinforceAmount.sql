-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 22. Jul 2018 um 22:01
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
  `a` decimal(5,2) NOT NULL DEFAULT '0.00',
  `cost` int(4) DEFAULT NULL,
  `delay` int(4) DEFAULT NULL,
  `costmod` float DEFAULT NULL,
  `resolved` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `actions`
--

INSERT INTO `actions` (`id`, `shipid`, `turn`, `type`, `dist`, `x`, `y`, `a`, `cost`, `delay`, `costmod`, `resolved`) VALUES
(1, 3, 1, 'deploy', 0, 269, 489, '180.00', 0, 0, 1, 1),
(2, 2, 1, 'deploy', 0, 288, -104, '180.00', 0, 0, 1, 1),
(3, 1, 1, 'deploy', 0, -276, 180, '109.19', 0, 0, 1, 1),
(4, 1, 1, 'jumpIn', 0, -276, 180, '0.00', 0, 0, 0, 1),
(5, 2, 1, 'jumpIn', 0, 288, -104, '0.00', 0, 0, 0, 1),
(6, 3, 1, 'jumpIn', 0, 269, 489, '0.00', 0, 0, 0, 1),
(7, 1, 1, 'move', 155, -327, 326, '0.00', 0, 0, 1, 1),
(8, 3, 1, 'turn', 0, 269, 489, '18.83', 19, 66, 1, 1),
(9, 3, 1, 'move', 140, 136, 444, '0.00', 0, 0, 1, 1),
(10, 2, 1, 'turn', 0, 288, -104, '-30.00', 30, 37, 1, 1),
(11, 2, 1, 'move', 175, 136, -17, '0.00', 0, 0, 1, 1),
(12, 24, 2, 'deploy', 0, -327, 326, '0.00', 1, 0, 1, 1),
(13, 25, 2, 'deploy', 0, -327, 326, '0.00', 1, 0, 1, 1),
(14, 16, 4, 'deploy', 0, -793, 602, '340.03', 0, 0, 1, 0),
(15, 20, 4, 'deploy', 0, -828, 459, '358.38', 0, 0, 1, 0),
(16, 26, 2, 'deploy', 0, 136, 444, '0.00', 1, 0, 1, 1),
(17, 27, 2, 'deploy', 0, 112, -5, '143.47', 0, 0, 0, 1),
(18, 3, 2, 'turn', 0, 136, 444, '-30.00', 30, 105, 1, 1),
(19, 3, 2, 'move', 140, -1, 471, '0.00', 0, 0, 1, 1),
(20, 2, 2, 'turn', 0, 136, -17, '-30.00', 30, 37, 1, 1),
(21, 2, 2, 'move', 175, 49, 135, '0.00', 0, 0, 1, 1),
(22, 1, 2, 'move', 155, -378, 472, '0.00', 0, 0, 1, 1),
(23, 24, 2, 'move', 90, -247, 285, '333.07', 0, 0, 0, 1),
(24, 25, 2, 'move', 90, -245, 363, '23.98', 0, 0, 0, 1),
(25, 26, 2, 'move', 105, 31, 450, '176.88', 0, 0, 0, 1),
(26, 27, 2, 'move', 120, 26, 79, '135.77', 0, 0, 0, 1),
(27, 3, 3, 'move', 140, -138, 498, '0.00', 0, 0, 1, 0),
(28, 3, 3, 'turn', 0, -138, 498, '28.14', 58, 0, 1, 0),
(29, 28, 3, 'deploy', 0, -1, 471, '0.00', 1, 0, 1, 1),
(30, 1, 3, 'turn', 0, -378, 472, '-30.00', 30, 105, 1, 0),
(31, 1, 3, 'move', 105, -358, 575, '0.00', 0, 0, 1, 0),
(32, 1, 3, 'turn', 0, -358, 575, '-25.00', 25, 88, 1, 0),
(33, 1, 3, 'move', 50, -329, 616, '0.00', 0, 0, 1, 0);

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
(1, 1, 3, 3, 6, 1, 1, 0, 'Pulse', 70, 0, 0, 35, 0, 0, 22, 0, 'b;v5;', 0),
(2, 4, 3, 3, 6, 1, 1, 0, 'Pulse', 56, 0, 0, 28, 0, 0, 18, 0, 'b;v4;', 0),
(3, 3, 3, 3, 6, 8, 1, 0, 'Pulse', 70, 0, 10, 60, 0, 0, 12, 0, 'p;v5;', 0),
(4, 5, 3, 3, 6, 8, 1, 0, 'Pulse', 14, 0, 4, 10, 0, 0, 10, 0, 'p;v1;', 0),
(5, 2, 3, 3, 6, 9, 1, 0, 'Pulse', 75, 0, 20, 55, 0, 0, 11, 0, 'p;v5;', 0),
(6, 6, 3, 3, 6, 9, 1, 0, 'Pulse', 65, 0, 20, 45, 0, 0, 9, 0, 'p;v5;', 0),
(7, 14, 3, 1, 18, 1, 2, 0, 'Particle', 55, 0, 0, 15, 0, 40, 15, 0, 'p;', 0),
(8, 17, 3, 1, 18, 1, 2, 0, 'Particle', 67, 0, 0, 14, 0, 53, 14, 0, 'p;', 0),
(9, 15, 3, 1, 18, 21, 2, 0, 'Particle', 63, 0, 55, 8, 0, 0, 8, 0, 'p;', 0),
(10, 16, 3, 1, 18, 21, 2, 0, 'Particle', 69, 0, 61, 8, 0, 0, 8, 0, 'p;', 0);

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
(1, 3, 1, 1, 3, 136, 447, 16, 1, 96, '4;', 1, 1),
(2, 3, 1, 1, 3, 136, 447, 17, 1, 96, '32;', 1, 1),
(3, 3, 1, 1, 3, 136, 447, 19, 1, 96, '34;', 1, 1),
(4, 3, 1, 1, 3, 136, 447, 20, 1, 96, '43;', 1, 1),
(5, 3, 1, 1, 3, 136, 447, 22, 1, 96, '87;', 1, 1),
(6, 3, 1, 1, 3, 136, 447, 23, 1, 96, '1;', 1, 1),
(7, 3, 2, 1, 0, 137, -20, 12, 0, 0, '', 0, 1),
(8, 3, 2, 1, 0, 144, 438, 21, 0, 0, '', 0, 1),
(9, 3, 2, 3, 0, -320, 317, 9, 0, 0, '', 0, 1),
(10, 3, 2, 2, 1, -333, 332, 5, 2, 0, '', 0, 1),
(11, 3, 2, 2, 1, -333, 332, 7, 2, 0, '', 0, 1),
(12, 3, 2, 2, 1, -333, 332, 9, 2, 0, '', 0, 1),
(13, 3, 2, 2, 1, -333, 332, 11, 2, 0, '', 0, 1),
(14, 3, 2, 3, 1, -369, 473, 8, 2, 66, '95;50;', 1, 1),
(15, 3, 2, 3, 1, -369, 473, 10, 2, 70, '43;99;', 1, 1),
(16, 3, 2, 3, 1, -369, 473, 13, 2, 70, '84;32;', 1, 1),
(17, 3, 2, 3, 1, -369, 473, 15, 2, 70, '79;15;', 1, 1),
(18, 3, 3, 3, 0, -249, 281, 9, 0, 0, '', 0, 1);

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
  `reinforceTurn` int(2) DEFAULT '11',
  `reinforceETA` int(2) DEFAULT '3',
  `reinforceAmount` int(2) NOT NULL DEFAULT '10',
  `focusMod` int(3) DEFAULT '100'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `games`
--

INSERT INTO `games` (`id`, `name`, `status`, `turn`, `phase`, `pv`, `reinforce`, `reinforceTurn`, `reinforceETA`, `reinforceAmount`, `focusMod`) VALUES
(3, 'myGame', 'active', 3, 0, 3500, 1500, 2, 2, 15, 10),
(4, 'myGame', 'open', -1, -1, 3500, 1500, 11, 3, 10, 10);

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
(3, 2, 1, 'Command', 1),
(4, 2, 1, 'Sensor', 1),
(5, 2, 5, 'Myrmidon', 6),
(6, 2, 7, 'Myrmidon', 6),
(7, 2, 9, 'Myrmidon', 6),
(8, 2, 11, 'Myrmidon', 6),
(9, 3, 2, 'Command', 1),
(29, 17, 4, 'Javelin', 4),
(30, 17, 8, 'Javelin', 4),
(36, 22, 4, 'Javelin', 4),
(37, 22, 8, 'Javelin', 4);

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
(1, 24, '2', 2, 2, 136, -17, 0),
(2, 25, '2', 2, 3, 136, 444, 0),
(3, 26, '2', 2, 1, -327, 326, 0),
(4, 27, '2', 2, 1, -327, 326, 0),
(5, 28, '2', 3, 24, -247, 285, 0),
(6, 26, '2', 3, 25, -245, 363, 0),
(7, 25, '2', 3, 26, 31, 450, 0);

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
  `maxFocus` int(4) DEFAULT '0',
  `gainFocus` int(4) DEFAULT '0',
  `curFocus` int(4) DEFAULT '0',
  `status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `playerstatus`
--

INSERT INTO `playerstatus` (`id`, `userid`, `gameid`, `turn`, `phase`, `faction`, `value`, `maxFocus`, `gainFocus`, `curFocus`, `status`) VALUES
(3, 1, 3, 3, 0, 'Earth Alliance', 3878, 1540, 385, 1155, 'ready'),
(4, 2, 3, 3, 0, 'Centauri Republic', 2126, 1764, 441, 1302, 'waiting'),
(5, 2, 4, 0, -1, '', 0, 0, 0, 0, 'joined');

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
(1, 1, 7, 1, '-1', 0),
(2, 1, 8, 1, '-1', 0),
(3, 1, 10, 1, '-1', 0),
(4, 1, 11, 1, '-1', 0),
(5, 1, 13, 1, '-1', 0),
(6, 1, 14, 1, '-1', 0),
(7, 1, 16, 1, '-1', 0),
(8, 1, 17, 1, '-1', 0),
(9, 1, 19, 1, '-1', 0),
(10, 1, 20, 1, '-1', 0),
(11, 1, 22, 1, '-1', 0),
(12, 1, 23, 1, '-1', 0),
(13, 1, 7, 2, '-1', 0),
(14, 1, 8, 2, '-1', 0),
(15, 1, 10, 2, '-1', 0),
(16, 1, 11, 2, '-1', 0),
(17, 1, 13, 2, '-1', 0),
(18, 1, 14, 2, '-1', 0),
(19, 1, 16, 2, '-1', 0),
(20, 1, 17, 2, '-1', 0),
(21, 1, 19, 2, '-1', 0),
(22, 1, 20, 2, '-1', 0),
(23, 1, 22, 2, '-1', 0),
(24, 1, 23, 2, '-1', 0),
(25, 2, 5, 2, '1', 0),
(26, 2, 5, 2, '1', 0),
(27, 2, 7, 2, '1', 0),
(28, 2, 7, 2, '1', 0),
(29, 2, 9, 2, '1', 0),
(30, 2, 9, 2, '1', 0),
(31, 2, 11, 2, '1', 0),
(32, 2, 11, 2, '1', 0),
(33, 1, 7, 3, '-1', 0),
(34, 1, 8, 3, '-1', 0),
(35, 1, 10, 3, '-1', 0),
(36, 1, 11, 3, '-1', 0),
(37, 1, 13, 3, '-1', 0),
(38, 1, 14, 3, '-1', 0),
(39, 1, 16, 3, '-1', 0),
(40, 1, 17, 3, '-1', 0),
(41, 1, 19, 3, '-1', 0),
(42, 1, 20, 3, '-1', 0),
(43, 1, 22, 3, '-1', 0),
(44, 1, 23, 3, '-1', 0);

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
(2, 2, 2, 1, '-1.00', 75, 0),
(3, 1, 4, 1, '-1.00', 88, 0),
(4, 1, 4, 2, '-1.00', 88, 0),
(5, 3, 4, 2, '-1.00', 124, 0),
(6, 2, 2, 2, '-1.00', 75, 0),
(7, -16, 4, 2, '-1.00', 95, 0),
(8, -20, 4, 2, '-1.00', 95, 0),
(9, 3, 4, 3, '-1.00', 124, 0),
(10, 2, 2, 3, '-1.00', 75, 0),
(11, 1, 4, 3, '-1.00', 88, 0);

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
(1, 2, 1, 'Darkner'),
(2, 2, 1, 'Darkner'),
(3, 17, 1, 'Vorchan'),
(4, 17, 1, 'Vorchan'),
(5, 22, 1, 'Vorchan'),
(6, 22, 1, 'Vorchan'),
(7, 24, 12, 'Aurora'),
(8, 25, 12, 'Aurora'),
(9, 26, 8, 'Sentri'),
(10, 27, 8, 'Myrmidon'),
(11, 28, 6, 'Sentri');

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
(1, 3, 8, 1, 'Accuracy', 0, '15.00');

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
  `display` varchar(40) DEFAULT '',
  `status` varchar(255) DEFAULT '',
  `command` tinyint(4) DEFAULT '0',
  `available` int(3) DEFAULT '0',
  `destroyed` tinyint(1) DEFAULT '0',
  `x` int(4) DEFAULT '0',
  `y` int(4) DEFAULT '0',
  `facing` decimal(5,2) NOT NULL DEFAULT '0.00',
  `delay` int(4) NOT NULL DEFAULT '0',
  `thrust` int(3) DEFAULT '0',
  `rolling` int(2) DEFAULT '0',
  `rolled` int(2) DEFAULT '0',
  `flipped` int(2) DEFAULT '0',
  `turn` int(1) DEFAULT '0',
  `phase` int(1) DEFAULT '0',
  `focus` tinyint(4) DEFAULT '0',
  `notes` varchar(50) DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `units`
--

INSERT INTO `units` (`id`, `gameid`, `userid`, `ship`, `ball`, `name`, `display`, `status`, `command`, `available`, `destroyed`, `x`, `y`, `facing`, `delay`, `thrust`, `rolling`, `rolled`, `flipped`, `turn`, `phase`, `focus`, `notes`) VALUES
(1, 3, 1, 1, 0, 'Avenger', '', 'bought', 1, 1, 0, -378, 472, '109.19', 0, 155, 0, 0, 0, 2, 3, 0, ''),
(2, 3, 2, 1, 0, 'Squadron', '', 'bought', 0, 1, 0, 49, 135, '120.00', 0, 175, 0, 0, 0, 2, 3, 0, ''),
(3, 3, 2, 1, 0, 'Primus', '', 'bought', 1, 1, 0, -1, 471, '168.83', 0, 140, 0, 0, 0, 2, 3, 0, ''),
(16, 3, 2, 1, 0, 'Kutai', '', 'bought', 0, 4, 0, 0, 0, '0.00', 0, 0, 0, 0, 0, 2, -1, 0, ''),
(20, 3, 2, 1, 0, 'Kutai', '', 'bought', 0, 4, 0, 0, 0, '0.00', 0, 0, 0, 0, 0, 2, -1, 0, ''),
(24, 3, 1, 0, 0, 'Flight', '', 'deployed', 0, 2, 0, -247, 285, '333.07', 0, 180, 0, 0, 0, 2, 3, 0, ''),
(25, 3, 1, 0, 0, 'Flight', '', 'deployed', 0, 2, 0, -245, 363, '23.98', 0, 180, 0, 0, 0, 2, 3, 0, ''),
(26, 3, 2, 0, 0, 'Flight', '', 'deployed', 0, 2, 0, 31, 450, '176.88', 0, 210, 0, 0, 0, 2, 3, 0, ''),
(27, 3, 2, 0, 1, 'Salvo', '', 'deployed', 0, 2, 0, 26, 79, '135.77', 0, 240, 0, 0, 0, 2, 3, 0, ''),
(28, 3, 2, 0, 0, 'Flight', '', 'deployed', 0, 3, 0, -1, 471, '0.00', 0, 0, 0, 0, 0, 3, -1, 0, '');

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
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;
--
-- AUTO_INCREMENT für Tabelle `chat`
--
ALTER TABLE `chat`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `damages`
--
ALTER TABLE `damages`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
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
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT für Tabelle `games`
--
ALTER TABLE `games`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT für Tabelle `loads`
--
ALTER TABLE `loads`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;
--
-- AUTO_INCREMENT für Tabelle `missions`
--
ALTER TABLE `missions`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT für Tabelle `playerstatus`
--
ALTER TABLE `playerstatus`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT für Tabelle `powers`
--
ALTER TABLE `powers`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;
--
-- AUTO_INCREMENT für Tabelle `reinforcements`
--
ALTER TABLE `reinforcements`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `sensors`
--
ALTER TABLE `sensors`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT für Tabelle `subunits`
--
ALTER TABLE `subunits`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT für Tabelle `systemcrits`
--
ALTER TABLE `systemcrits`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT für Tabelle `units`
--
ALTER TABLE `units`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

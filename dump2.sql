-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 14. Jan 2019 um 22:04
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
  `unitid` int(3) DEFAULT NULL,
  `turn` int(3) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `forced` tinyint(4) NOT NULL DEFAULT '0',
  `dist` int(4) DEFAULT NULL,
  `x` int(4) DEFAULT NULL,
  `y` int(4) DEFAULT NULL,
  `h` decimal(5,2) NOT NULL DEFAULT '0.00',
  `f` decimal(5,2) NOT NULL DEFAULT '0.00',
  `cost` int(4) DEFAULT NULL,
  `delay` int(4) DEFAULT NULL,
  `costmod` float DEFAULT NULL,
  `resolved` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `actions`
--

INSERT INTO `actions` (`id`, `unitid`, `turn`, `type`, `forced`, `dist`, `x`, `y`, `h`, `f`, `cost`, `delay`, `costmod`, `resolved`) VALUES
(1, 2, 1, 'deploy', 0, 0, -428, -353, '0.00', '0.00', 0, 0, 1, 1),
(2, 1, 1, 'deploy', 0, 0, -490, -258, '46.12', '46.12', 0, 0, 1, 1),
(3, 4, 1, 'deploy', 0, 0, -556, -78, '0.00', '0.00', 0, 0, 1, 1),
(4, 3, 1, 'deploy', 0, 0, -493, 263, '0.00', '0.00', 0, 0, 1, 1),
(5, 6, 1, 'deploy', 0, 0, 454, 387, '180.00', '180.00', 0, 0, 1, 1),
(6, 5, 1, 'deploy', 0, 0, 457, 507, '180.00', '180.00', 0, 0, 1, 1),
(7, 8, 1, 'deploy', 0, 0, 578, -32, '180.00', '180.00', 0, 0, 1, 1),
(8, 7, 1, 'deploy', 0, 0, 444, -379, '180.00', '180.00', 0, 0, 1, 1),
(9, 4, 1, 'jumpIn', 0, 96, -602, 6, '-16.00', '-16.00', 0, 0, 0, 1),
(10, 3, 1, 'jumpIn', 0, 34, -526, 262, '-6.00', '-6.00', 0, 0, 0, 1),
(11, 2, 1, 'jumpIn', 0, 61, -489, -353, '8.00', '8.00', 0, 0, 0, 1),
(12, 1, 1, 'jumpIn', 0, 52, -446, -232, '-6.00', '-6.00', 0, 0, 0, 1),
(13, 8, 1, 'jumpIn', 0, 65, 631, 5, '-8.00', '-8.00', 0, 0, 0, 1),
(14, 7, 1, 'jumpIn', 0, 142, 553, -288, '-8.00', '-8.00', 0, 0, 0, 1),
(15, 6, 1, 'jumpIn', 0, 20, 459, 406, '-7.00', '-7.00', 0, 0, 0, 1),
(16, 5, 1, 'jumpIn', 0, 54, 422, 467, '-18.00', '-18.00', 0, 0, 0, 1),
(17, 6, 1, 'turn', 0, 0, 459, 406, '30.00', '30.00', 30, 95, 1, 1),
(18, 6, 1, 'move', 0, 155, 310, 363, '0.00', '0.00', 0, 0, 1, 1),
(19, 5, 1, 'turn', 0, 0, 422, 467, '30.00', '30.00', 30, 95, 1, 1),
(20, 5, 1, 'move', 0, 155, 268, 483, '0.00', '0.00', 0, 0, 1, 1),
(21, 5, 1, 'turn', 0, 0, 268, 483, '30.00', '30.00', 45, 48, 1, 1),
(22, 8, 1, 'turn', 0, 0, 631, 5, '30.00', '30.00', 30, 86, 1, 1),
(23, 8, 1, 'move', 0, 151, 497, -65, '0.00', '0.00', 0, 0, 1, 1),
(24, 8, 1, 'turn', 0, 0, 497, -65, '-11.88', '-11.88', 23, 4, 1, 1),
(25, 8, 1, 'move', 0, 4, 493, -65, '0.00', '0.00', 0, 0, 1, 1),
(26, 7, 1, 'speed', 0, 1, 553, -288, '0.00', '0.00', 30, 0, 1, 1),
(27, 7, 1, 'speed', 0, 1, 553, -288, '0.00', '0.00', 30, 0, 1, 1),
(28, 7, 1, 'turn', 0, 0, 553, -288, '32.00', '32.00', 40, 48, 1, 1),
(29, 7, 1, 'move', 0, 231, 331, -352, '0.00', '0.00', 0, 0, 1, 1),
(30, 2, 1, 'turn', 0, 0, -489, -353, '30.00', '30.00', 30, 75, 1, 1),
(31, 2, 1, 'move', 0, 75, -437, -299, '0.00', '0.00', 0, 0, 1, 1),
(32, 2, 1, 'turn', 0, 0, -437, -299, '30.00', '30.00', 30, 75, 1, 1),
(33, 2, 1, 'move', 0, 70, -433, -229, '0.00', '0.00', 0, 0, 1, 1),
(34, 2, 1, 'move', 0, 10, -431, -219, '0.00', '0.00', 0, 0, 1, 1),
(35, 2, 1, 'turn', 0, 0, -431, -219, '-29.00', '-29.00', 29, 73, 1, 1),
(36, 1, 1, 'turn', 0, 0, -446, -232, '30.00', '30.00', 30, 75, 1, 1),
(37, 1, 1, 'move', 0, 155, -430, -78, '0.00', '0.00', 0, 0, 1, 1),
(38, 1, 1, 'turn', 0, 0, -430, -78, '-30.00', '-30.00', 59, 3, 1, 1),
(39, 4, 1, 'turn', 0, 0, -602, 6, '-30.00', '-30.00', 30, 81, 1, 1),
(40, 4, 1, 'move', 0, 155, -580, -148, '0.00', '0.00', 0, 0, 1, 1),
(41, 3, 1, 'move', 0, 165, -365, 228, '0.00', '0.00', 0, 0, 1, 1),
(42, 3, 1, 'turn', 0, 0, -365, 228, '28.02', '28.02', 58, 0, 1, 1);

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
  `unitid` int(5) DEFAULT NULL,
  `structureid` int(5) DEFAULT NULL,
  `systemid` int(3) DEFAULT NULL,
  `turn` int(3) DEFAULT NULL,
  `roll` int(3) DEFAULT NULL,
  `type` varchar(20) DEFAULT NULL,
  `totalDmg` int(5) DEFAULT NULL,
  `shieldDmg` int(5) DEFAULT NULL,
  `armourDmg` int(3) DEFAULT NULL,
  `systemDmg` int(5) NOT NULL DEFAULT '0',
  `hullDmg` int(5) NOT NULL DEFAULT '0',
  `emDmg` int(3) DEFAULT '0',
  `negation` int(4) DEFAULT NULL,
  `destroyed` tinyint(1) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `new` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `damages`
--

INSERT INTO `damages` (`id`, `fireid`, `gameid`, `unitid`, `structureid`, `systemid`, `turn`, `roll`, `type`, `totalDmg`, `shieldDmg`, `armourDmg`, `systemDmg`, `hullDmg`, `emDmg`, `negation`, `destroyed`, `notes`, `new`) VALUES
(1, 2, 1, 3, 7, 2, 1, 0, 'Beam', 68, 0, 14, 8, 0, 0, 14, 0, 'p;', 0),
(2, 2, 1, 3, 7, 8, 1, 0, 'Beam', 68, 0, 8, 14, 0, 0, 8, 0, 'p;', 0),
(3, 1, 1, 3, 7, 8, 1, 0, 'Beam', 73, 0, 8, 16, 0, 0, 8, 0, 'p;', 0),
(4, 1, 1, 3, 7, 10, 1, 0, 'Beam', 73, 0, 8, 16, 0, 0, 8, 0, 'p;', 0),
(5, 2, 1, 3, 19, 19, 1, 0, 'Beam', 68, 0, 10, 12, 0, 0, 10, 0, 'p;', 0),
(6, 1, 1, 3, 19, 19, 1, 0, 'Beam', 73, 0, 9, 15, 0, 0, 9, 0, 'p;', 0);

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
  `shots` int(3) NOT NULL DEFAULT '0',
  `req` int(3) NOT NULL DEFAULT '0',
  `notes` varchar(255) NOT NULL DEFAULT '',
  `hits` int(3) NOT NULL DEFAULT '0',
  `resolved` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `fireorders`
--

INSERT INTO `fireorders` (`id`, `gameid`, `turn`, `shooterid`, `targetid`, `x`, `y`, `weaponid`, `shots`, `req`, `notes`, `hits`, `resolved`) VALUES
(1, 1, 1, 6, 3, -371, 229, 20, 1, 35, '5;', 1, 1),
(2, 1, 1, 5, 3, -360, 227, 20, 1, 36, '35;', 1, 1),
(3, 1, 1, 8, 2, -432, -220, 11, 1, 74, '99;', 0, 1),
(4, 1, 1, 8, 2, -432, -220, 12, 1, 74, '81;', 0, 1);

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
  `focusMod` int(3) DEFAULT '100',
  `obstaclesAmount` int(3) NOT NULL DEFAULT '0',
  `nebulaAmount` int(2) NOT NULL DEFAULT '0',
  `obstaclesSizeMin` int(3) NOT NULL DEFAULT '0',
  `obstaclesSizeMax` int(3) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `games`
--

INSERT INTO `games` (`id`, `name`, `status`, `turn`, `phase`, `pv`, `reinforce`, `reinforceTurn`, `reinforceETA`, `reinforceAmount`, `focusMod`, `obstaclesAmount`, `nebulaAmount`, `obstaclesSizeMin`, `obstaclesSizeMax`) VALUES
(1, 'myGame', 'active', 2, -1, 3500, 1500, 11, 3, 10, 10, 4, 4, 50, 100);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `globals`
--

CREATE TABLE `globals` (
  `id` int(4) NOT NULL,
  `playerstatusid` int(4) DEFAULT '0',
  `unitid` int(3) NOT NULL DEFAULT '0',
  `turn` int(4) DEFAULT '0',
  `type` varchar(20) DEFAULT '',
  `scope` int(11) NOT NULL DEFAULT '0',
  `value` decimal(5,2) DEFAULT '0.00',
  `notes` varchar(20) NOT NULL DEFAULT '',
  `text` varchar(50) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `globals`
--

INSERT INTO `globals` (`id`, `playerstatusid`, `unitid`, `turn`, `type`, `scope`, `value`, `notes`, `text`) VALUES
(1, 1, 0, 0, 'Morale', 0, '100.00', '', ''),
(2, 2, 0, 0, 'Morale', 0, '115.00', '', '');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `loads`
--

CREATE TABLE `loads` (
  `id` int(4) NOT NULL,
  `unitid` int(5) DEFAULT NULL,
  `systemid` int(3) DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL,
  `amount` int(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `loads`
--

INSERT INTO `loads` (`id`, `unitid`, `systemid`, `name`, `amount`) VALUES
(1, 1, 2, 'Engine', 1),
(2, 2, 2, 'Engine', 1),
(3, 3, 2, 'Command', 2),
(4, 3, 2, 'Engine', 1),
(5, 3, 2, 'Sensor', 1),
(6, 4, 13, 'Zorth', 10),
(7, 4, 13, 'Tzymm', 4),
(8, 4, 21, 'Zorth', 10),
(9, 4, 21, 'Tzymm', 4),
(10, 5, 17, 'Gorith', 12),
(11, 6, 17, 'Gorith', 12),
(12, 8, 7, 'Vranoth', 12),
(13, 8, 9, 'Vranoth', 12);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `missions`
--

CREATE TABLE `missions` (
  `id` int(4) NOT NULL,
  `unitid` int(4) NOT NULL DEFAULT '0',
  `type` varchar(20) NOT NULL DEFAULT '1',
  `turn` int(1) NOT NULL DEFAULT '0',
  `phase` int(1) DEFAULT '0',
  `targetid` int(4) NOT NULL DEFAULT '0',
  `x` int(4) NOT NULL DEFAULT '0',
  `y` int(4) NOT NULL DEFAULT '0',
  `arrived` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  `morale` int(4) NOT NULL DEFAULT '0',
  `value` int(5) DEFAULT NULL,
  `maxFocus` int(4) DEFAULT '0',
  `gainFocus` int(4) DEFAULT '0',
  `curFocus` int(4) DEFAULT '0',
  `status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `playerstatus`
--

INSERT INTO `playerstatus` (`id`, `userid`, `gameid`, `turn`, `phase`, `faction`, `morale`, `value`, `maxFocus`, `gainFocus`, `curFocus`, `status`) VALUES
(1, 1, 1, 2, -1, 'Vree Conglomerate', 2888, 1504, 1540, 385, 770, 'waiting'),
(2, 2, 1, 2, -1, 'Narn Regime', 2930, 1516, 1540, 385, 770, 'waiting');

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
(2, 6, 16, 1, '0', 0),
(3, 6, 18, 1, '0', 0),
(4, 6, 23, 1, '0', 0),
(5, 6, 4, 1, '1', 4),
(6, 5, 14, 1, '0', 0),
(7, 5, 16, 1, '0', 0),
(8, 5, 18, 1, '0', 0),
(9, 5, 23, 1, '0', 0),
(10, 5, 4, 1, '1', 4),
(11, 8, 11, 1, '1', 3),
(12, 8, 12, 1, '1', 3),
(13, 8, 13, 1, '0', 0),
(14, 8, 14, 1, '0', 0),
(15, 8, 16, 1, '0', 0),
(16, 8, 17, 1, '0', 0),
(17, 8, 21, 1, '0', 0),
(18, 8, 22, 1, '0', 0),
(19, 8, 4, 1, '1', 4);

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
(1, 2, 4, 1, '1.11', 878, 1),
(2, 1, 4, 1, '359.51', 945, 1),
(3, 4, 4, 1, '-1.00', 102, 0),
(4, 3, 4, 1, '0.14', 798, 1),
(5, 6, 4, 1, '0.81', 918, 0),
(6, 5, 4, 1, '359.94', 944, 0),
(7, 8, 4, 1, '7.05', 953, 0),
(8, 7, 3, 1, '-1.00', 66, 0);

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
(1, 7, 1, 'Trakk'),
(2, 7, 1, 'Trakk');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `systemcrits`
--

CREATE TABLE `systemcrits` (
  `id` int(4) NOT NULL,
  `unitid` int(4) DEFAULT NULL,
  `systemid` int(4) DEFAULT NULL,
  `turn` int(3) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `duration` int(3) DEFAULT NULL,
  `value` decimal(5,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `systemcrits`
--

INSERT INTO `systemcrits` (`id`, `unitid`, `systemid`, `turn`, `type`, `duration`, `value`) VALUES
(1, 3, 2, 1, 'Engine', 0, '-7.50'),
(2, 3, 8, 1, 'Damage', 0, '-25.00');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `units`
--

CREATE TABLE `units` (
  `id` int(3) NOT NULL,
  `gameid` int(3) DEFAULT '0',
  `userid` int(3) DEFAULT '0',
  `type` int(1) NOT NULL DEFAULT '0',
  `name` varchar(255) NOT NULL DEFAULT '',
  `callsign` varchar(40) NOT NULL DEFAULT '',
  `totalCost` int(4) NOT NULL DEFAULT '0',
  `moraleCost` int(4) NOT NULL DEFAULT '0',
  `status` varchar(255) NOT NULL DEFAULT '',
  `command` tinyint(4) DEFAULT '0',
  `available` int(3) DEFAULT '0',
  `withdraw` int(2) NOT NULL DEFAULT '0',
  `manual` tinyint(4) NOT NULL DEFAULT '0',
  `destroyed` tinyint(1) DEFAULT '0',
  `x` int(4) DEFAULT '0',
  `y` int(4) DEFAULT '0',
  `heading` decimal(5,2) NOT NULL DEFAULT '0.00',
  `facing` decimal(5,2) NOT NULL DEFAULT '0.00',
  `delay` int(4) NOT NULL DEFAULT '0',
  `thrust` int(3) DEFAULT '0',
  `rolling` int(2) DEFAULT '0',
  `rolled` int(2) DEFAULT '0',
  `flipped` int(2) DEFAULT '0',
  `turn` int(1) DEFAULT '0',
  `phase` int(1) DEFAULT '0',
  `focus` tinyint(4) DEFAULT '0',
  `notes` varchar(50) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `units`
--

INSERT INTO `units` (`id`, `gameid`, `userid`, `type`, `name`, `callsign`, `totalCost`, `moraleCost`, `status`, `command`, `available`, `withdraw`, `manual`, `destroyed`, `x`, `y`, `heading`, `facing`, `delay`, `thrust`, `rolling`, `rolled`, `flipped`, `turn`, `phase`, `focus`, `notes`) VALUES
(1, 1, 1, 4, 'Xill', 'A', 839, 839, 'bought', 0, 1, 0, 0, 0, -430, -78, '34.12', '34.12', 3, 155, 0, 0, 0, 1, 3, 0, ''),
(2, 1, 1, 4, 'Xill', 'B', 839, 839, 'bought', 0, 1, 0, 0, 0, -431, -219, '47.00', '47.00', 73, 155, 0, 0, 0, 1, 3, 0, ''),
(3, 1, 1, 4, 'Zaatrr', 'Command', 610, 610, 'bought', 1, 1, 0, 0, 0, -365, 228, '16.02', '16.02', 0, 165, 0, 0, 0, 1, 3, 0, ''),
(4, 1, 1, 4, 'Zitomm', '', 1208, 600, 'bought', 0, 1, 0, 0, 0, -580, -148, '298.00', '298.00', 0, 155, 0, 0, 0, 1, 3, 0, ''),
(5, 1, 2, 4, 'GQuan', '', 1126, 850, 'bought', 1, 1, 0, 0, 0, 268, 483, '204.00', '204.00', 48, 155, 0, 0, 0, 1, 3, 0, ''),
(6, 1, 2, 4, 'GQuan', '', 1126, 850, 'bought', 0, 1, 0, 0, 0, 310, 363, '196.00', '196.00', 0, 155, 0, 0, 0, 1, 3, 0, ''),
(7, 1, 2, 3, 'Squadron', '', 480, 480, 'bought', 0, 1, 0, 0, 0, 331, -352, '196.00', '196.00', 0, 231, 0, 0, 0, 1, 3, 0, ''),
(8, 1, 2, 4, 'GSten', '', 752, 750, 'bought', 0, 1, 0, 0, 0, 493, -65, '182.12', '182.12', 0, 155, 0, 0, 0, 1, 3, 0, ''),
(9, 3, 0, 0, 'AsteroidField', '', 0, 0, 'deployed', 0, 0, 0, 0, 0, -288, -456, '0.00', '0.00', 0, 0, 0, 0, 0, 1, 3, 0, '110;20;2;28'),
(10, 3, 0, 0, 'AsteroidField', '', 0, 0, 'deployed', 0, 0, 0, 0, 0, -182, 488, '0.00', '0.00', 0, 0, 0, 0, 0, 1, 3, 0, '112;20;4;64'),
(11, 3, 0, 0, 'AsteroidField', '', 0, 0, 'deployed', 0, 0, 0, 0, 0, 185, -342, '0.00', '0.00', 0, 0, 0, 0, 0, 1, 3, 0, '85;20;1;14'),
(12, 3, 0, 0, 'AsteroidField', '', 0, 0, 'deployed', 0, 0, 0, 0, 0, 133, 410, '0.00', '0.00', 0, 0, 0, 0, 0, 1, 3, 0, '84;10;4;56'),
(13, 3, 0, 0, 'NebulaCloud', '', 0, 0, 'deployed', 0, 0, 0, 0, 0, -113, -277, '0.00', '0.00', 0, 0, 0, 0, 0, 1, 3, 0, '127;27'),
(14, 3, 0, 0, 'NebulaCloud', '', 0, 0, 'deployed', 0, 0, 0, 0, 0, -216, 258, '0.00', '0.00', 0, 0, 0, 0, 0, 1, 3, 0, '100;23'),
(15, 1, 0, 0, 'NebulaCloud', '', 0, 0, 'deployed', 0, 0, 0, 0, 0, -350, 200, '0.00', '0.00', 0, 0, 0, 0, 0, 1, 3, 0, '110;20;2;28'),
(16, 3, 0, 0, 'NebulaCloud', '', 0, 0, 'deployed', 0, 0, 0, 0, 0, 367, 429, '0.00', '0.00', 0, 0, 0, 0, 0, 1, 3, 0, '140;20'),
(17, 1, 0, 0, 'AsteroidField', '', 0, 0, 'deployed', 0, 0, 0, 0, 0, -300, -75, '0.00', '0.00', 0, 0, 0, 0, 0, 1, 3, 0, '110;20;2;28');

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
-- Indizes für die Tabelle `globals`
--
ALTER TABLE `globals`
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
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;
--
-- AUTO_INCREMENT für Tabelle `chat`
--
ALTER TABLE `chat`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `damages`
--
ALTER TABLE `damages`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT für Tabelle `fireorders`
--
ALTER TABLE `fireorders`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT für Tabelle `games`
--
ALTER TABLE `games`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT für Tabelle `globals`
--
ALTER TABLE `globals`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT für Tabelle `loads`
--
ALTER TABLE `loads`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT für Tabelle `missions`
--
ALTER TABLE `missions`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `playerstatus`
--
ALTER TABLE `playerstatus`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT für Tabelle `powers`
--
ALTER TABLE `powers`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT für Tabelle `sensors`
--
ALTER TABLE `sensors`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT für Tabelle `subunits`
--
ALTER TABLE `subunits`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT für Tabelle `systemcrits`
--
ALTER TABLE `systemcrits`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT für Tabelle `units`
--
ALTER TABLE `units`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

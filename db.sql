-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 05. Jun 2018 um 23:32
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
(1, 3, 1, 'deploy', 0, 636, -44, '180.00', 0, 0, 1, 1),
(2, 4, 1, 'deploy', 0, 662, 131, '180.00', 0, 0, 1, 1),
(3, 1, 1, 'deploy', 0, -644, -96, '0.00', 0, 0, 1, 1),
(4, 2, 1, 'deploy', 0, -651, 241, '0.00', 0, 0, 1, 1),
(5, 1, 1, 'jumpIn', 0, -644, -96, '0.00', 0, 0, 0, 1),
(6, 2, 1, 'jumpIn', 0, -651, 241, '0.00', 0, 0, 0, 1),
(7, 3, 1, 'jumpIn', 0, 636, -44, '0.00', 0, 0, 0, 1),
(8, 4, 1, 'jumpIn', 0, 662, 131, '0.00', 0, 0, 0, 1),
(9, 1, 1, 'move', 155, -489, -96, '0.00', 0, 0, 1, 1),
(10, 2, 1, 'move', 175, -476, 241, '0.00', 0, 0, 1, 1),
(11, 3, 1, 'move', 155, 481, -44, '0.00', 0, 0, 1, 1),
(12, 4, 1, 'move', 165, 497, 131, '0.00', 0, 0, 1, 1),
(13, 2, 2, 'move', 175, -301, 241, '0.00', 0, 0, 1, 1),
(14, 3, 2, 'move', 155, 326, -44, '0.00', 0, 0, 1, 1),
(15, 1, 2, 'move', 155, -334, -96, '0.00', 0, 0, 1, 1),
(16, 4, 2, 'move', 165, 332, 131, '0.00', 0, 0, 1, 1),
(17, 5, 3, 'deploy', 0, -307, -87, '18.82', 1, 0, 1, 1),
(18, 1, 3, 'turn', 0, -334, -96, '-30.00', 30, 86, 1, 1),
(19, 1, 3, 'move', 155, -200, -173, '0.00', 0, 0, 1, 1),
(20, 2, 3, 'move', 175, -126, 241, '0.00', 0, 0, 1, 1),
(21, 3, 3, 'turn', 0, 326, -44, '-4.04', 5, 12, 1, 1),
(22, 3, 3, 'move', 155, 171, -33, '0.00', 0, 0, 1, 1),
(23, 4, 3, 'turn', 0, 332, 131, '3.79', 4, 8, 1, 1),
(24, 4, 3, 'move', 165, 167, 120, '0.00', 0, 0, 1, 1),
(25, 5, 3, 'move', 90, -225, -51, '23.59', 0, 0, 0, 1),
(26, 6, 4, 'deploy', 0, -172, -173, '0.00', 1, 0, 1, 1),
(27, 7, 4, 'deploy', 0, 147, -48, '-159.33', 0, 0, 0, 1),
(28, 1, 4, 'turn', 0, -200, -173, '30.00', 30, 86, 1, 1),
(29, 1, 4, 'move', 155, -45, -173, '0.00', 0, 0, 1, 1),
(30, 1, 4, 'turn', 0, -45, -173, '30.00', 40, 58, 1, 1),
(31, 3, 4, 'turn', 0, 171, -33, '30.00', 30, 86, 1, 1),
(32, 3, 4, 'move', 155, 32, -101, '0.00', 0, 0, 1, 1),
(33, 4, 4, 'turn', 0, 167, 120, '30.00', 30, 61, 1, 1),
(34, 4, 4, 'move', 165, 30, 28, '0.00', 0, 0, 1, 1),
(35, 2, 4, 'turn', 0, -126, 241, '-30.00', 30, 39, 1, 1),
(36, 2, 4, 'move', 39, -92, 222, '0.00', 0, 0, 1, 1),
(37, 2, 4, 'turn', 0, -92, 222, '-30.00', 30, 39, 1, 1),
(38, 2, 4, 'move', 136, -24, 104, '0.00', 0, 0, 1, 1),
(39, 5, 4, 'move', 90, -137, -68, '348.99', 0, 0, 0, 1),
(40, 6, 4, 'move', 90, -87, -143, '19.44', 0, 0, 0, 1),
(41, 7, 4, 'move', 230, -45, -173, '213.07', 0, 0, 0, 1),
(42, 10, 1, 'deploy', 0, 636, -155, '180.00', 0, 0, 1, 1),
(43, 11, 1, 'deploy', 0, 626, 140, '180.00', 0, 0, 1, 1),
(44, 8, 1, 'deploy', 0, -629, -78, '0.00', 0, 0, 1, 1),
(45, 9, 1, 'deploy', 0, -637, 375, '0.00', 0, 0, 1, 1),
(46, 10, 1, 'jumpIn', 0, 636, -155, '0.00', 0, 0, 0, 1),
(47, 11, 1, 'jumpIn', 0, 626, 140, '0.00', 0, 0, 0, 1),
(48, 8, 1, 'jumpIn', 0, -629, -78, '0.00', 0, 0, 0, 1),
(49, 9, 1, 'jumpIn', 0, -637, 375, '0.00', 0, 0, 0, 1),
(50, 8, 1, 'move', 155, -474, -78, '0.00', 0, 0, 1, 1),
(51, 9, 1, 'move', 165, -472, 375, '0.00', 0, 0, 1, 1),
(52, 10, 1, 'move', 155, 481, -155, '0.00', 0, 0, 1, 1),
(53, 11, 1, 'move', 155, 471, 140, '0.00', 0, 0, 1, 1);

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
(1, 16, 1, 1, 6, 1, 4, 0, 'Warhead', 29, 0, 0, 18, 0, 11, 18, 0, 'p;', 0),
(2, 16, 1, 1, 6, 1, 4, 0, 'Warhead', 31, 0, 0, 18, 0, 13, 18, 0, 'p;', 0),
(3, 16, 1, 1, 6, 1, 4, 0, 'Warhead', 28, 0, 0, 17, 0, 11, 17, 0, 'p;', 0),
(4, 16, 1, 1, 6, 7, 4, 0, 'Warhead', 30, 0, 19, 11, 0, 0, 11, 0, 'p;', 0),
(5, 16, 1, 1, 6, 8, 4, 0, 'Warhead', 32, 0, 24, 8, 0, 0, 8, 0, 'p;', 0),
(6, 16, 1, 1, 6, 10, 4, 0, 'Warhead', 31, 0, 22, 9, 0, 0, 9, 0, 'p;', 0),
(7, 16, 1, 1, 6, 10, 4, 0, 'Warhead', 28, 0, 18, 8, 0, 2, 8, 1, 'p;o4;', 0),
(8, 15, 1, 5, 0, 3, 4, 0, 'Pulse', 40, 0, 0, 40, 0, 16, 4, 1, 'p;v5;', 0),
(9, 14, 1, 5, 0, 9, 4, 0, 'Pulse', 45, 0, 0, 40, 0, 16, 4, 1, 'p;v5;', 0),
(10, 7, 1, 4, 6, 1, 4, 0, 'Laser', 577, 0, 0, 16, 0, 176, 16, 0, 'p;', 0),
(11, 6, 1, 4, 6, 1, 4, 0, 'Particle', 36, 0, 0, 8, 0, 28, 16, 0, 'p;', 0),
(12, 7, 1, 4, 6, 7, 4, 0, 'Laser', 577, 0, 64, 10, 0, 118, 10, 1, 'p;o6;', 0),
(13, 7, 1, 4, 6, 8, 4, 0, 'Laser', 577, 0, 64, 10, 0, 118, 10, 1, 'p;o6;', 0),
(14, 8, 1, 7, 0, 13, 4, 0, 'Pulse', 14, 0, 0, 1, 0, 5, 1, 1, 'p;v1;', 0),
(15, 18, 3, 10, 6, 1, 1, 0, 'Laser', 218, 0, 0, 20, 0, 52, 20, 0, 'p;', 0),
(16, 18, 3, 10, 6, 7, 1, 0, 'Laser', 218, 0, 28, 9, 0, 35, 9, 1, 'p;o2;', 0),
(17, 18, 3, 10, 6, 9, 1, 0, 'Laser', 218, 0, 36, 11, 0, 25, 11, 1, 'p;o3;', 0),
(18, 17, 3, 8, 6, 7, 1, 0, 'Particle', 58, 0, 43, 15, 0, 0, 15, 0, 'p;', 0),
(19, 17, 3, 8, 6, 9, 1, 0, 'Particle', 63, 0, 48, 15, 0, 0, 15, 0, 'p;', 0);

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
(2, 1, 4, 1, 0, 173, -37, 9, 0, 0, '', 0, 1),
(3, 1, 4, 3, 1, -192, -166, 7, 4, 0, '', 0, 1),
(4, 1, 4, 3, 1, -192, -166, 9, 4, 0, '', 0, 1),
(5, 1, 4, 1, 4, 31, 32, 7, 2, 49, '51;55;', 0, 1),
(6, 1, 4, 1, 4, 31, 32, 11, 2, 49, '37;65;', 1, 1),
(7, 1, 4, 1, 4, 31, 32, 13, 1, 58, '23;', 1, 1),
(8, 1, 4, 1, 7, 0, 0, 14, 1, 12, '7;', 1, 1),
(9, 1, 4, 1, 7, 0, 0, 15, 1, 12, '94;', 0, 1),
(10, 1, 4, 2, 4, 33, 25, 4, 1, 59, '74;', 0, 1),
(11, 1, 4, 2, 4, 33, 25, 6, 1, 59, '67;', 0, 1),
(12, 1, 4, 2, 4, 33, 25, 9, 1, 59, '71;', 0, 1),
(13, 1, 4, 2, 4, 33, 25, 11, 1, 59, '91;', 0, 1),
(14, 1, 4, 3, 5, -137, -62, 21, 1, 192, '63;', 1, 1),
(15, 1, 4, 3, 5, -137, -62, 22, 1, 192, '79;', 1, 1),
(16, 1, 4, 7, 1, 0, 0, 2, 7, 100, '29;65;62;100;29;82;28;', 7, 1),
(17, 3, 1, 10, 8, -478, -74, 19, 2, 59, '4;49;', 2, 1),
(18, 3, 1, 8, 10, 473, -158, 7, 1, 66, '38;', 1, 1),
(19, 3, 1, 8, 10, 473, -158, 9, 1, 66, '77;', 0, 1);

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
  `focusMod` int(3) DEFAULT '100'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `games`
--

INSERT INTO `games` (`id`, `name`, `status`, `turn`, `phase`, `pv`, `reinforce`, `reinforceTurn`, `reinforceETA`, `focusMod`) VALUES
(1, 'myGame', 'active', 4, 3, 3000, 1500, 11, 3, 10),
(3, 'myGame', 'active', 1, 3, 3000, 1500, 2, 2, 10);

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
(1, 3, 2, 'Morale', 1),
(2, 3, 2, 'Focus', 1),
(3, 3, 2, 'Engine', 1),
(4, 3, 2, 'Sensor', 1),
(5, 3, 2, 'Reactor', 1),
(7, 3, 7, 'Vran', 16),
(8, 3, 9, 'Vran', 16),
(9, 8, 2, 'Command', 1),
(10, 8, 2, 'Engine', 1),
(11, 8, 2, 'Sensor', 1),
(12, 8, 2, 'Reactor', 1),
(13, 10, 13, 'Javelin', 4),
(14, 10, 20, 'Javelin', 4),
(15, 11, 13, 'Javelin', 4),
(16, 11, 20, 'Javelin', 4);

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
(1, 5, '2', 3, 4, 332, 131, 0),
(2, 6, '2', 4, 3, 171, -33, 0),
(3, 5, '2', 4, 3, 171, -33, 0),
(4, 7, '2', 4, 1, -200, -173, 4);

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
(1, 1, 1, 4, 3, 'Earth Alliance', 3145, 1440, 360, 525, 'waiting'),
(2, 2, 1, 4, 3, 'Narn Regime', 3020, 0, 0, 0, 'waiting'),
(4, 2, 3, 1, 3, 'Narn Regime', 2950, 1512, 378, 720, 'waiting'),
(5, 1, 3, 1, 3, 'Centauri Republic', 2820, 1440, 360, 720, 'waiting');

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
(1, 3, 7, 1, '0', 0),
(2, 3, 9, 1, '0', 0),
(3, 1, 14, 1, '-1', 0),
(4, 1, 15, 1, '-1', 0),
(5, 1, 21, 1, '-1', 0),
(6, 1, 22, 1, '-1', 0),
(7, 2, 4, 1, '-1', 0),
(8, 2, 5, 1, '-1', 0),
(9, 2, 6, 1, '-1', 0),
(10, 2, 7, 1, '-1', 0),
(11, 2, 9, 1, '-1', 0),
(12, 2, 10, 1, '-1', 0),
(13, 2, 11, 1, '-1', 0),
(14, 2, 12, 1, '-1', 0),
(17, 1, 14, 2, '-1', 0),
(18, 1, 15, 2, '-1', 0),
(19, 1, 21, 2, '-1', 0),
(20, 1, 22, 2, '-1', 0),
(21, 2, 4, 2, '-1', 0),
(22, 2, 5, 2, '-1', 0),
(23, 2, 6, 2, '-1', 0),
(24, 2, 7, 2, '-1', 0),
(25, 2, 9, 2, '-1', 0),
(26, 2, 10, 2, '-1', 0),
(27, 2, 11, 2, '-1', 0),
(28, 2, 12, 2, '-1', 0),
(29, 1, 14, 3, '-1', 0),
(30, 1, 15, 3, '-1', 0),
(31, 1, 21, 3, '-1', 0),
(32, 1, 22, 3, '-1', 0),
(33, 2, 4, 3, '-1', 0),
(34, 2, 5, 3, '-1', 0),
(35, 2, 6, 3, '-1', 0),
(36, 2, 7, 3, '-1', 0),
(37, 2, 9, 3, '-1', 0),
(38, 2, 10, 3, '-1', 0),
(39, 2, 11, 3, '-1', 0),
(40, 2, 12, 3, '-1', 0),
(41, 1, 14, 4, '-1', 0),
(42, 1, 15, 4, '-1', 0),
(43, 1, 21, 4, '-1', 0),
(44, 1, 22, 4, '-1', 0),
(45, 2, 4, 4, '-1', 0),
(46, 2, 5, 4, '-1', 0),
(47, 2, 6, 4, '-1', 0),
(48, 2, 7, 4, '-1', 0),
(49, 2, 9, 4, '-1', 0),
(50, 2, 10, 4, '-1', 0),
(51, 2, 11, 4, '-1', 0),
(52, 2, 12, 4, '-1', 0),
(53, 3, 7, 4, '1', 0),
(54, 3, 7, 4, '1', 0),
(55, 3, 7, 4, '1', 0),
(56, 3, 7, 4, '1', 0),
(57, 3, 9, 4, '1', 0),
(58, 3, 9, 4, '1', 0),
(59, 3, 9, 4, '1', 0),
(60, 3, 9, 4, '1', 0),
(61, 8, 7, 1, '1', 5),
(62, 8, 13, 1, '0', 0),
(63, 8, 14, 1, '0', 0),
(64, 8, 16, 1, '0', 0),
(65, 8, 18, 1, '0', 0),
(66, 8, 22, 1, '0', 0),
(67, 8, 23, 1, '0', 0),
(68, 8, 4, 1, '1', 3),
(69, 8, 4, 1, '1', 5);

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
(1, 3, 4, 1, '-1.00', 118, 0),
(2, 4, 4, 1, '-1.00', 95, 0),
(3, 1, 4, 1, '-1.00', 102, 0),
(4, 2, 1, 1, '-1.00', 73, 0),
(5, 3, 4, 2, '-1.00', 118, 0),
(6, 4, 4, 2, '-1.00', 95, 0),
(7, 1, 4, 2, '-1.00', 102, 0),
(8, 2, 1, 2, '-1.00', 73, 0),
(9, 1, 4, 3, '-1.00', 102, 0),
(10, 2, 1, 3, '-1.00', 73, 0),
(11, 3, 4, 3, '-1.00', 118, 0),
(12, 4, 4, 3, '-1.00', 95, 0),
(13, 1, 4, 4, '-1.00', 102, 0),
(14, 2, 1, 4, '-1.00', 73, 0),
(15, 3, 4, 4, '-1.00', 118, 0),
(16, 4, 4, 4, '-1.00', 95, 0),
(17, 10, 4, 1, '0.85', 1149, 0),
(18, 11, 4, 1, '359.15', 1281, 0),
(19, 8, 4, 1, '1.67', 1203, 0),
(20, 9, 4, 1, '-1.00', 95, 0);

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
(1, 2, 1, 'Crius'),
(2, 2, 1, 'Crius'),
(3, 5, 8, 'Aurora'),
(4, 6, 1, 'Aurora'),
(5, 7, 8, 'Vran');

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
(1, 1, 5, 4, 'Overload', 0, '2.91'),
(2, 1, 7, 4, 'Accuracy', 0, '30.00'),
(3, 1, 8, 4, 'Damage', 0, '20.00'),
(4, 4, 5, 4, 'Overload', 0, '2.63'),
(5, 10, 5, 1, 'Overload', 0, '1.90'),
(6, 8, 7, 1, 'Damage', 0, '20.00'),
(7, 8, 9, 1, 'Accuracy', 0, '30.00');

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
  `delay` int(3) DEFAULT '0',
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
(1, 1, 1, 1, 0, 'Hyperion', '', 'bought', 1, 1, 0, -200, -173, '330.00', 0, 155, 0, 0, 0, 3, 3, 0, ''),
(2, 1, 1, 1, 0, 'Squadron', '', 'bought', 0, 1, 0, -126, 241, '0.00', 0, 175, 0, 0, 0, 3, 3, 0, ''),
(3, 1, 2, 1, 0, 'GSten', '', 'bought', 0, 1, 0, 171, -33, '175.96', 0, 155, 0, 0, 0, 3, 3, 0, ''),
(4, 1, 2, 1, 0, 'Rongoth', '', 'jumpOut', 1, 1, 0, 167, 120, '183.79', 0, 165, 0, 0, 0, 3, 3, 0, '6'),
(5, 1, 1, 0, 0, 'Flight', '', 'deployed', 0, 3, 0, -225, -51, '23.59', 0, 180, 0, 0, 0, 3, 3, 0, ''),
(6, 1, 1, 0, 0, 'Flight', '', 'deployed', 0, 4, 0, -172, -173, '0.00', 0, 0, 0, 0, 0, 4, -1, 0, ''),
(7, 1, 2, 0, 1, 'Salvo', NULL, 'deployed', 0, 4, 0, 147, -48, '0.00', 0, 0, 0, 0, 0, 4, -1, 0, ''),
(8, 3, 2, 1, 0, 'GQuan', 'Gaylord', 'bought', 1, 1, 0, -629, -78, '0.00', 0, 155, 0, 0, 0, 1, -1, 0, ''),
(9, 3, 2, 1, 0, 'Rongoth', '', 'bought', 0, 1, 0, -637, 375, '0.00', 0, 165, 0, 0, 0, 1, -1, 0, ''),
(10, 3, 1, 1, 0, 'Centurion', '', 'bought', 1, 1, 0, 636, -155, '0.00', 0, 155, 0, 0, 0, 1, -1, 0, ''),
(11, 3, 1, 1, 0, 'Centurion', '', 'bought', 0, 1, 0, 626, 140, '0.00', 0, 155, 0, 0, 0, 1, -1, 0, '');

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
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;
--
-- AUTO_INCREMENT für Tabelle `chat`
--
ALTER TABLE `chat`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `damages`
--
ALTER TABLE `damages`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
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
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT für Tabelle `games`
--
ALTER TABLE `games`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT für Tabelle `loads`
--
ALTER TABLE `loads`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT für Tabelle `missions`
--
ALTER TABLE `missions`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT für Tabelle `playerstatus`
--
ALTER TABLE `playerstatus`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT für Tabelle `powers`
--
ALTER TABLE `powers`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;
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
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT für Tabelle `systemcrits`
--
ALTER TABLE `systemcrits`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT für Tabelle `units`
--
ALTER TABLE `units`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

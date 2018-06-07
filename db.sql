-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 07. Jun 2018 um 17:11
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
(1, 3, 1, 'deploy', 0, 686, -142, '180.00', 0, 0, 1, 1),
(2, 4, 1, 'deploy', 0, 697, 661, '180.00', 0, 0, 1, 1),
(3, 5, 1, 'deploy', 0, 684, 244, '180.00', 0, 0, 1, 1),
(4, 1, 1, 'deploy', 0, -640, -97, '0.00', 0, 0, 1, 1),
(5, 2, 1, 'deploy', 0, -640, 649, '0.00', 0, 0, 1, 1),
(6, 1, 1, 'jumpIn', 0, -640, -97, '0.00', 0, 0, 0, 1),
(7, 2, 1, 'jumpIn', 0, -640, 649, '0.00', 0, 0, 0, 1),
(8, 3, 1, 'jumpIn', 0, 686, -142, '0.00', 0, 0, 0, 1),
(9, 4, 1, 'jumpIn', 0, 697, 661, '0.00', 0, 0, 0, 1),
(10, 5, 1, 'jumpIn', 0, 684, 244, '0.00', 0, 0, 0, 1),
(11, 1, 1, 'move', 155, -485, -97, '0.00', 0, 0, 1, 1),
(12, 2, 1, 'move', 155, -485, 649, '0.00', 0, 0, 1, 1),
(13, 3, 1, 'move', 155, 531, -142, '0.00', 0, 0, 1, 1),
(14, 3, 1, 'turn', 0, 531, -142, '-1.91', 4, 0, 1, 1),
(15, 4, 1, 'move', 155, 542, 661, '0.00', 0, 0, 1, 1),
(16, 4, 1, 'turn', 0, 542, 661, '0.50', 2, 0, 1, 1),
(17, 5, 1, 'move', 165, 519, 244, '0.00', 0, 0, 1, 1),
(18, 25, 2, 'deploy', 0, 531, -142, '0.00', 1, 0, 1, 1),
(19, 26, 2, 'deploy', 0, 542, 661, '0.00', 1, 0, 1, 1),
(20, 1, 2, 'move', 155, -330, -97, '0.00', 0, 0, 1, 1),
(21, 2, 2, 'move', 155, -330, 649, '0.00', 0, 0, 1, 1),
(22, 3, 2, 'turn', 0, 531, -142, '-10.55', 11, 31, 1, 1),
(23, 3, 2, 'move', 155, 380, -109, '0.00', 0, 0, 1, 1),
(24, 4, 2, 'turn', 0, 542, 661, '30.00', 30, 86, 1, 1),
(25, 4, 2, 'move', 86, 468, 617, '0.00', 0, 0, 1, 1),
(26, 4, 2, 'turn', 0, 468, 617, '17.75', 18, 51, 1, 1),
(27, 4, 2, 'move', 69, 422, 566, '0.00', 0, 0, 1, 1),
(28, 28, 1, 'deploy', 0, 621, -46, '180.00', 0, 0, 1, 1),
(29, 27, 1, 'deploy', 0, -685, 65, '0.00', 0, 0, 1, 1),
(30, 27, 1, 'jumpIn', 0, -685, 65, '0.00', 0, 0, 0, 1),
(31, 28, 1, 'jumpIn', 0, 621, -46, '0.00', 0, 0, 0, 1),
(32, 27, 1, 'move', 140, -545, 65, '0.00', 0, 0, 1, 1),
(33, 28, 1, 'move', 165, 456, -46, '0.00', 0, 0, 1, 1);

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
(1, 1, 1, 3, 1, -490, -93, 20, 1, 24, '42;', 0, 1),
(2, 1, 1, 4, 2, -475, 645, 13, 1, 23, '46;', 0, 1),
(3, 1, 2, 3, 0, 516, 246, 9, 0, 0, '', 0, 1),
(4, 1, 2, 4, 0, -484, -103, 9, 0, 0, '', 0, 1);

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
(1, 'myGame', 'active', 2, 1, 3000, 1500, 2, 2, 10),
(2, 'myGame', 'active', 2, -1, 3000, 1500, 11, 3, 10);

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
(6, 27, 9, 'Aurora', 12),
(7, 28, 15, 'SitaraParticle', 8);

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
(1, 25, '2', 2, 3, 531, -142, 1),
(2, 26, '2', 2, 1, -485, -97, 0);

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
(1, 1, 1, 2, 1, 'Minbari Federation', 1800, 1440, 360, 1080, 'ready'),
(2, 2, 1, 2, 1, 'Earth Alliance', 1900, 1440, 360, 590, 'waiting'),
(3, 1, 2, 2, -1, 'Earth Alliance', 3064, 1680, 420, 1260, 'waiting'),
(4, 2, 2, 2, -1, 'Centauri Republic', 3783, 1200, 300, 900, 'waiting');

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
(1, 3, 13, 1, '1', 4),
(2, 3, 14, 1, '-1', 0),
(3, 3, 15, 1, '-1', 0),
(4, 3, 17, 1, '0', 0),
(5, 3, 18, 1, '0', 0),
(6, 3, 20, 1, '1', 4),
(7, 3, 21, 1, '-1', 0),
(8, 3, 22, 1, '-1', 0),
(9, 3, 4, 1, '1', 3),
(10, 3, 4, 1, '1', 5),
(11, 4, 13, 1, '1', 4),
(12, 4, 14, 1, '-1', 0),
(13, 4, 15, 1, '-1', 0),
(14, 4, 17, 1, '0', 0),
(15, 4, 18, 1, '0', 0),
(16, 4, 20, 1, '1', 4),
(17, 4, 21, 1, '-1', 0),
(18, 4, 22, 1, '-1', 0),
(19, 4, 4, 1, '1', 3),
(20, 4, 4, 1, '1', 5),
(21, 5, 11, 1, '-1', 0),
(22, 5, 12, 1, '-1', 0),
(23, 5, 17, 1, '-1', 0),
(24, 5, 18, 1, '-1', 0),
(25, 1, 15, 1, '0', 0),
(26, 1, 16, 1, '0', 0),
(27, 1, 17, 1, '0', 0),
(28, 1, 18, 1, '0', 0),
(29, 1, 19, 1, '0', 0),
(30, 1, 4, 1, '1', 3),
(31, 1, 4, 1, '1', 5),
(32, 2, 15, 1, '0', 0),
(33, 2, 16, 1, '0', 0),
(34, 2, 17, 1, '0', 0),
(35, 2, 18, 1, '0', 0),
(36, 2, 19, 1, '0', 0),
(37, 2, 4, 1, '1', 3),
(38, 2, 4, 1, '1', 5),
(39, 3, 6, 2, '1', 4),
(40, 3, 13, 2, '1', 4),
(41, 3, 14, 2, '-1', 0),
(42, 3, 15, 2, '-1', 0),
(43, 3, 17, 2, '0', 0),
(44, 3, 18, 2, '0', 0),
(45, 3, 21, 2, '-1', 0),
(46, 3, 22, 2, '-1', 0),
(47, 3, 4, 2, '1', 3),
(48, 3, 4, 2, '1', 5),
(49, 4, 14, 2, '-1', 0),
(50, 4, 15, 2, '-1', 0),
(51, 4, 17, 2, '0', 0),
(52, 4, 18, 2, '0', 0),
(53, 4, 21, 2, '-1', 0),
(54, 4, 22, 2, '-1', 0),
(55, 4, 4, 2, '1', 3),
(56, 4, 4, 2, '1', 5),
(57, 4, 4, 2, '1', 6),
(58, 5, 6, 2, '1', 3),
(59, 5, 11, 2, '-2', 0),
(60, 5, 12, 2, '-2', 0),
(61, 5, 17, 2, '-2', 0),
(62, 5, 18, 2, '-2', 0),
(63, 1, 15, 2, '0', 0),
(64, 1, 16, 2, '0', 0),
(65, 1, 17, 2, '0', 0),
(66, 1, 18, 2, '0', 0),
(67, 1, 19, 2, '0', 0),
(68, 1, 4, 2, '1', 3),
(69, 1, 4, 2, '1', 5),
(70, 2, 15, 2, '0', 0),
(71, 2, 16, 2, '0', 0),
(72, 2, 17, 2, '0', 0),
(73, 2, 18, 2, '0', 0),
(74, 2, 19, 2, '0', 0),
(75, 2, 4, 2, '1', 3),
(76, 2, 4, 2, '1', 5),
(77, 27, 7, 1, '-1', 0),
(78, 27, 8, 1, '-1', 0),
(79, 27, 10, 1, '-1', 0),
(80, 27, 11, 1, '-1', 0),
(81, 27, 13, 1, '-1', 0),
(82, 27, 14, 1, '-1', 0),
(83, 27, 15, 1, '-1', 0),
(84, 27, 16, 1, '-1', 0),
(85, 27, 17, 1, '-1', 0),
(86, 27, 18, 1, '-1', 0),
(87, 27, 19, 1, '-1', 0),
(88, 27, 20, 1, '-1', 0),
(89, 27, 27, 1, '-1', 0),
(90, 27, 28, 1, '-1', 0),
(91, 27, 29, 1, '-1', 0),
(92, 27, 30, 1, '-1', 0),
(93, 27, 31, 1, '-1', 0),
(94, 27, 32, 1, '-1', 0),
(95, 27, 33, 1, '-1', 0),
(96, 27, 34, 1, '-1', 0);

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
(1, 3, 4, 1, '359.62', 1193, 0),
(2, 4, 4, 1, '359.95', 1263, 0),
(3, 5, 4, 1, '-1.00', 95, 0),
(4, 1, 4, 1, '0.19', 1210, 1),
(5, 2, 4, 1, '359.24', 1202, 1),
(6, 3, 4, 2, '9.93', 845, 0),
(7, 4, 4, 2, '353.29', 1146, 0),
(8, 5, 4, 2, '2.12', 807, 0),
(9, 1, 4, 2, '359.63', 764, 0),
(10, 2, 4, 2, '0.51', 780, 0),
(11, 28, 4, 1, '-1.00', 110, 0),
(12, 27, 4, 1, '-1.00', 117, 0);

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
(16, 25, 10, 'Aurora'),
(17, 26, 10, 'Aurora');

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
(1, 1, 1, 1, 0, 'Tigara', 'A', 'bought', 1, 1, 0, -485, -97, '0.00', 0, 155, 0, 0, 0, 1, 3, 0, ''),
(2, 1, 1, 1, 0, 'Tigara', 'B', 'bought', 0, 1, 0, -485, 649, '0.00', 0, 155, 0, 0, 0, 1, 3, 0, ''),
(3, 1, 2, 1, 0, 'Hyperion', '', 'bought', 0, 1, 0, 531, -142, '178.09', 0, 155, 0, 0, 0, 1, 3, 0, ''),
(4, 1, 2, 1, 0, 'Hyperion', '', 'bought', 1, 1, 0, 542, 661, '180.50', 0, 155, 0, 0, 0, 1, 3, 0, ''),
(5, 1, 2, 1, 0, 'Artemis', '', 'bought', 0, 1, 0, 519, 244, '180.00', 0, 165, 0, 0, 0, 1, 3, 1, ''),
(25, 1, 2, 0, 0, 'Flight', '', 'deployed', 0, 2, 0, 531, -142, '0.00', 0, 0, 0, 0, 0, 2, -1, 0, ''),
(26, 1, 2, 0, 0, 'Flight', '', 'deployed', 0, 2, 0, 542, 661, '0.00', 0, 0, 0, 0, 0, 2, -1, 0, ''),
(27, 2, 1, 1, 0, 'Omega', '', 'bought', 1, 1, 0, -545, 65, '0.00', 0, 140, 0, 0, 0, 1, 3, 0, ''),
(28, 2, 2, 1, 0, 'Altarian', '', 'bought', 1, 1, 0, 456, -46, '180.00', 0, 165, 0, 0, 0, 1, 3, 0, '');

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
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT;
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
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT für Tabelle `games`
--
ALTER TABLE `games`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT für Tabelle `loads`
--
ALTER TABLE `loads`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT für Tabelle `missions`
--
ALTER TABLE `missions`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT für Tabelle `playerstatus`
--
ALTER TABLE `playerstatus`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT für Tabelle `powers`
--
ALTER TABLE `powers`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;
--
-- AUTO_INCREMENT für Tabelle `reinforcements`
--
ALTER TABLE `reinforcements`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `sensors`
--
ALTER TABLE `sensors`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT für Tabelle `subunits`
--
ALTER TABLE `subunits`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT für Tabelle `systemcrits`
--
ALTER TABLE `systemcrits`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT;
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

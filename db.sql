-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 24. Aug 2018 um 14:39
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
(1, 3, 1, 'deploy', 0, 729, 369, '180.00', 0, 0, 1, 1),
(2, 4, 1, 'deploy', 0, 703, -87, '180.00', 0, 0, 1, 1),
(3, 1, 1, 'deploy', 0, -608, 87, '0.00', 0, 0, 1, 1),
(4, 2, 1, 'deploy', 0, -700, -101, '0.00', 0, 0, 1, 1),
(5, 1, 1, 'jumpIn', 0, -608, 87, '0.00', 0, 0, 0, 1),
(6, 2, 1, 'jumpIn', 0, -700, -101, '0.00', 0, 0, 0, 1),
(7, 3, 1, 'jumpIn', 0, 729, 369, '0.00', 0, 0, 0, 1),
(8, 4, 1, 'jumpIn', 0, 703, -87, '0.00', 0, 0, 0, 1),
(9, 3, 1, 'move', 165, 564, 369, '0.00', 0, 0, 1, 1),
(10, 4, 1, 'move', 165, 538, -87, '0.00', 0, 0, 1, 1),
(11, 1, 1, 'move', 140, -468, 87, '0.00', 0, 0, 1, 1),
(12, 2, 1, 'move', 175, -525, -101, '0.00', 0, 0, 1, 1),
(13, 5, 4, 'deploy', 0, -739, 29, '326.90', 0, 0, 1, 1),
(14, 6, 4, 'deploy', 0, -747, 95, '34.18', 0, 0, 1, 1),
(15, 10, 4, 'deploy', 0, 757, 67, '210.60', 0, 0, 1, 1),
(16, 3, 2, 'move', 165, 399, 369, '0.00', 0, 0, 1, 1),
(17, 4, 2, 'move', 165, 373, -87, '0.00', 0, 0, 1, 1),
(18, 1, 2, 'move', 140, -328, 87, '0.00', 0, 0, 1, 1),
(19, 2, 2, 'move', 175, -350, -101, '0.00', 0, 0, 1, 1),
(20, 3, 3, 'move', 165, 234, 369, '0.00', 0, 0, 1, 1),
(21, 4, 3, 'move', 165, 208, -87, '0.00', 0, 0, 1, 1),
(22, 1, 3, 'move', 140, -188, 87, '0.00', 0, 0, 1, 1),
(23, 2, 3, 'move', 175, -175, -101, '0.00', 0, 0, 1, 1),
(24, 16, 1, 'deploy', 0, 643, 1, '180.00', 0, 0, 1, 1),
(25, 15, 1, 'deploy', 0, -666, -49, '0.00', 0, 0, 1, 1),
(26, 15, 1, 'jumpIn', 0, -666, -49, '0.00', 0, 0, 0, 1),
(27, 16, 1, 'jumpIn', 0, 643, 1, '0.00', 0, 0, 0, 1),
(28, 15, 1, 'move', 140, -526, -49, '0.00', 0, 0, 1, 1),
(29, 16, 1, 'move', 165, 478, 1, '0.00', 0, 0, 1, 1),
(30, 27, 3, 'deploy', 0, 734, -61, '200.85', 0, 0, 1, 1),
(31, 28, 3, 'deploy', 0, 724, 122, '133.69', 0, 0, 1, 1),
(32, 17, 3, 'deploy', 0, -721, -282, '326.49', 0, 0, 1, 1),
(33, 15, 2, 'move', 140, -386, -49, '0.00', 0, 0, 1, 1),
(34, 16, 2, 'move', 165, 313, 1, '0.00', 0, 0, 1, 1);

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
(1, 'myGame', 'active', 3, 3, 3500, 1500, 2, 2, 5, 10),
(2, 'myGame', 'active', 2, 3, 3500, 1500, 2, 1, 10, 10);

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
(2, 10, 9, 'Sentri', 14),
(9, 28, 12, 'Naga', 4),
(10, 28, 16, 'Naga', 4);

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
(1, 1, 1, 3, 3, 'Earth Alliance', 2370, 1680, 420, 1260, 'waiting'),
(2, 2, 1, 3, 3, 'Centauri Republic', 2576, 1400, 350, 1050, 'ready'),
(3, 1, 2, 2, 3, 'Earth Alliance', 3410, 1680, 420, 840, 'waiting'),
(4, 2, 2, 2, 3, 'Earth Alliance', 3508, 1400, 350, 700, 'waiting');

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
(7, 1, 15, 1, '-1', 0),
(8, 1, 16, 1, '-1', 0),
(9, 1, 17, 1, '-1', 0),
(10, 1, 18, 1, '-1', 0),
(11, 1, 19, 1, '-1', 0),
(12, 1, 20, 1, '-1', 0),
(13, 1, 27, 1, '-1', 0),
(14, 1, 28, 1, '-1', 0),
(15, 1, 29, 1, '-1', 0),
(16, 1, 30, 1, '-1', 0),
(17, 1, 31, 1, '-1', 0),
(18, 1, 32, 1, '-1', 0),
(19, 1, 33, 1, '-1', 0),
(20, 1, 34, 1, '-1', 0),
(21, 2, 6, 1, '0', 0),
(22, 2, 10, 1, '0', 0),
(23, 1, 7, 2, '-1', 0),
(24, 1, 8, 2, '-1', 0),
(25, 1, 10, 2, '-1', 0),
(26, 1, 11, 2, '-1', 0),
(27, 1, 13, 2, '-1', 0),
(28, 1, 14, 2, '-1', 0),
(29, 1, 15, 2, '-1', 0),
(30, 1, 16, 2, '-1', 0),
(31, 1, 17, 2, '-1', 0),
(32, 1, 18, 2, '-1', 0),
(33, 1, 19, 2, '-1', 0),
(34, 1, 20, 2, '-1', 0),
(35, 1, 27, 2, '-1', 0),
(36, 1, 28, 2, '-1', 0),
(37, 1, 29, 2, '-1', 0),
(38, 1, 30, 2, '-1', 0),
(39, 1, 31, 2, '-1', 0),
(40, 1, 32, 2, '-1', 0),
(41, 1, 33, 2, '-1', 0),
(42, 1, 34, 2, '-1', 0),
(43, 2, 6, 2, '0', 0),
(44, 2, 10, 2, '0', 0),
(45, -5, 11, 2, '-1', 0),
(46, -5, 12, 2, '-1', 0),
(47, -5, 17, 2, '-1', 0),
(48, -5, 18, 2, '-1', 0),
(49, -6, 6, 2, '-1', 0),
(50, -6, 7, 2, '-1', 0),
(51, -6, 8, 2, '-1', 0),
(52, -6, 9, 2, '-1', 0),
(53, -6, 12, 2, '-1', 0),
(54, -6, 13, 2, '-1', 0),
(55, -6, 14, 2, '-1', 0),
(56, -6, 15, 2, '-1', 0),
(57, 1, 7, 3, '-1', 0),
(58, 1, 8, 3, '-1', 0),
(59, 1, 10, 3, '-1', 0),
(60, 1, 11, 3, '-1', 0),
(61, 1, 13, 3, '-1', 0),
(62, 1, 14, 3, '-1', 0),
(63, 1, 15, 3, '-1', 0),
(64, 1, 16, 3, '-1', 0),
(65, 1, 17, 3, '-1', 0),
(66, 1, 18, 3, '-1', 0),
(67, 1, 19, 3, '-1', 0),
(68, 1, 20, 3, '-1', 0),
(69, 1, 27, 3, '-1', 0),
(70, 1, 28, 3, '-1', 0),
(71, 1, 29, 3, '-1', 0),
(72, 1, 30, 3, '-1', 0),
(73, 1, 31, 3, '-1', 0),
(74, 1, 32, 3, '-1', 0),
(75, 1, 33, 3, '-1', 0),
(76, 1, 34, 3, '-1', 0),
(77, 2, 6, 3, '0', 0),
(78, 2, 10, 3, '0', 0),
(79, 16, 11, 1, '-1', 0),
(80, 16, 12, 1, '0', 0),
(81, 16, 15, 1, '-1', 0),
(82, 16, 16, 1, '0', 0),
(83, 15, 7, 1, '-1', 0),
(84, 15, 8, 1, '-1', 0),
(85, 15, 10, 1, '-1', 0),
(86, 15, 11, 1, '-1', 0),
(87, 15, 13, 1, '-1', 0),
(88, 15, 14, 1, '-1', 0),
(89, 15, 15, 1, '-1', 0),
(90, 15, 16, 1, '-1', 0),
(91, 15, 17, 1, '-1', 0),
(92, 15, 18, 1, '-1', 0),
(93, 15, 19, 1, '-1', 0),
(94, 15, 20, 1, '-1', 0),
(95, 15, 27, 1, '-1', 0),
(96, 15, 28, 1, '-1', 0),
(97, 15, 29, 1, '-1', 0),
(98, 15, 30, 1, '-1', 0),
(99, 15, 31, 1, '-1', 0),
(100, 15, 32, 1, '-1', 0),
(101, 15, 33, 1, '-1', 0),
(102, 15, 34, 1, '-1', 0),
(103, 16, 11, 2, '-1', 0),
(104, 16, 12, 2, '0', 0),
(105, 16, 15, 2, '-1', 0),
(106, 16, 16, 2, '0', 0),
(107, -28, 11, 2, '-1', 0),
(108, -28, 15, 2, '-1', 0),
(109, 15, 7, 2, '-1', 0),
(110, 15, 8, 2, '-1', 0),
(111, 15, 10, 2, '-1', 0),
(112, 15, 11, 2, '-1', 0),
(113, 15, 13, 2, '-1', 0),
(114, 15, 14, 2, '-1', 0),
(115, 15, 15, 2, '-1', 0),
(116, 15, 16, 2, '-1', 0),
(117, 15, 17, 2, '-1', 0),
(118, 15, 18, 2, '-1', 0),
(119, 15, 19, 2, '-1', 0),
(120, 15, 20, 2, '-1', 0),
(121, 15, 27, 2, '-1', 0),
(122, 15, 28, 2, '-1', 0),
(123, 15, 29, 2, '-1', 0),
(124, 15, 30, 2, '-1', 0),
(125, 15, 31, 2, '-1', 0),
(126, 15, 32, 2, '-1', 0),
(127, 15, 33, 2, '-1', 0),
(128, 15, 34, 2, '-1', 0),
(129, -17, 11, 2, '-1', 0),
(130, -17, 12, 2, '-1', 0),
(131, -17, 17, 2, '-1', 0),
(132, -17, 18, 2, '-1', 0);

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
(1, 3, 4, 1, '358.71', 712, 0),
(2, 4, 4, 1, '357.24', 664, 0),
(3, 1, 4, 1, '-1.00', 117, 0),
(4, 2, 2, 1, '-1.00', 62, 0),
(5, 1, 4, 2, '-1.00', 117, 0),
(6, 2, 2, 2, '-1.00', 62, 0),
(7, -5, 4, 2, '-1.00', 95, 0),
(8, -6, 2, 2, '-1.00', 73, 0),
(9, 3, 4, 2, '-1.00', 106, 0),
(10, 4, 4, 2, '-1.00', 106, 0),
(11, -10, 4, 2, '-1.00', 124, 0),
(12, 1, 4, 3, '-1.00', 117, 0),
(13, 2, 2, 3, '-1.00', 62, 0),
(14, 3, 4, 3, '-1.00', 106, 0),
(15, 4, 4, 3, '-1.00', 106, 0),
(16, 16, 4, 1, '-1.00', 88, 0),
(17, 15, 4, 1, '-1.00', 117, 0),
(18, 16, 4, 2, '-1.00', 88, 0),
(19, -27, 2, 2, '-1.00', 55, 0),
(20, -28, 4, 2, '-1.00', 88, 0),
(21, 15, 4, 2, '-1.00', 117, 0),
(22, -17, 4, 2, '-1.00', 95, 0);

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
(1, 2, 1, 'Hermes'),
(2, 2, 1, 'Hermes'),
(3, 6, 1, 'Crius'),
(4, 6, 1, 'Crius'),
(23, 27, 1, 'Tethys'),
(24, 27, 1, 'Tethys'),
(25, 27, 1, 'Tethys');

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
(1, 1, 1, 1, 0, 'Omega', '', 'bought', 1, 1, 0, -328, 87, '0.00', 0, 140, 0, 0, 0, 2, 3, 0, ''),
(2, 1, 1, 1, 0, 'Squadron', '', 'bought', 0, 1, 0, -350, -101, '0.00', 0, 175, 0, 0, 0, 2, 3, 0, ''),
(3, 1, 2, 1, 0, 'Altarian', '', 'bought', 1, 1, 0, 399, 369, '180.00', 0, 165, 0, 0, 0, 2, 3, 0, ''),
(4, 1, 2, 1, 0, 'Altarian', '', 'bought', 0, 1, 0, 373, -87, '180.00', 0, 165, 0, 0, 0, 2, 3, 0, ''),
(5, 1, 1, 1, 0, 'Artemis', '', 'bought', 0, 4, 0, -739, 29, '326.90', 0, 0, 0, 0, 0, 2, 3, 0, ''),
(6, 1, 1, 1, 0, 'Squadron', '', 'bought', 0, 4, 0, -747, 95, '34.18', 0, 0, 0, 0, 0, 2, 3, 0, ''),
(10, 1, 2, 1, 0, 'Primus', '', 'bought', 0, 4, 0, 757, 67, '210.60', 0, 0, 0, 0, 0, 2, 3, 0, ''),
(15, 2, 1, 1, 0, 'Omega', '', 'bought', 1, 1, 0, -526, -49, '0.00', 0, 140, 0, 0, 0, 1, 3, 0, ''),
(16, 2, 2, 1, 0, 'Olympus', '', 'bought', 1, 1, 0, 478, 1, '180.00', 0, 165, 0, 0, 0, 1, 3, 0, ''),
(17, 2, 1, 1, 0, 'Artemis', '', 'bought', 0, 3, 0, 0, 0, '0.00', 0, 0, 0, 0, 0, 2, -1, 0, ''),
(27, 2, 2, 1, 0, 'Squadron', '', 'bought', 0, 3, 0, 0, 0, '0.00', 0, 0, 0, 0, 0, 2, -1, 0, ''),
(28, 2, 2, 1, 0, 'Olympus', '', 'bought', 0, 3, 0, 0, 0, '0.00', 0, 0, 0, 0, 0, 2, -1, 0, '');

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
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;
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
-- AUTO_INCREMENT für Tabelle `fireorders`
--
ALTER TABLE `fireorders`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `games`
--
ALTER TABLE `games`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT für Tabelle `loads`
--
ALTER TABLE `loads`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT für Tabelle `missions`
--
ALTER TABLE `missions`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `playerstatus`
--
ALTER TABLE `playerstatus`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT für Tabelle `powers`
--
ALTER TABLE `powers`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=133;
--
-- AUTO_INCREMENT für Tabelle `sensors`
--
ALTER TABLE `sensors`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT für Tabelle `subunits`
--
ALTER TABLE `subunits`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;
--
-- AUTO_INCREMENT für Tabelle `systemcrits`
--
ALTER TABLE `systemcrits`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `units`
--
ALTER TABLE `units`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;
--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

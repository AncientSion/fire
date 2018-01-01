-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 01. Jan 2018 um 21:02
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
(1, 6, 1, 'deploy', 0, 647, 278, 191, 0, 0, 1, 1),
(2, 7, 1, 'deploy', 0, 638, 378, 188, 0, 0, 1, 1),
(3, 8, 1, 'deploy', 0, 651, -140, 180, 0, 0, 1, 1),
(4, 9, 1, 'deploy', 0, 715, 334, 187, 0, 0, 1, 1),
(5, 2, 1, 'deploy', 0, -642, 95, 0, 0, 0, 1, 1),
(6, 3, 1, 'deploy', 0, -639, 17, 0, 0, 0, 1, 1),
(7, 1, 1, 'deploy', 0, -691, 63, 0, 0, 0, 1, 1),
(8, 4, 1, 'deploy', 0, -672, -127, 0, 0, 0, 1, 1),
(9, 5, 1, 'deploy', 0, -669, 440, 0, 0, 0, 1, 1),
(10, 1, 1, 'jump', 20, -709, 70, -13, 0, 0, 0, 1),
(11, 2, 1, 'jump', 25, -619, 87, 5, 0, 0, 0, 1),
(12, 3, 1, 'jump', 29, -663, 33, 6, 0, 0, 0, 1),
(13, 6, 1, 'jump', 25, 666, 293, -11, 0, 0, 0, 1),
(14, 7, 1, 'jump', 24, 634, 355, -1, 0, 0, 0, 1),
(15, 6, 1, 'turn', 0, 666, 293, -11, 16, 37, 1, 1),
(16, 6, 1, 'move', 160, 526, 371, 0, 0, 0, 1, 1),
(17, 6, 1, 'turn', 0, 526, 371, 28, 78, 46, 2, 1),
(18, 6, 1, 'move', 15, 512, 367, 0, 0, 0, 1, 1),
(19, 7, 1, 'move', 170, 468, 396, 0, 0, 0, 1, 1),
(20, 7, 1, 'turn', 0, 468, 396, 11, 32, 18, 2, 1),
(21, 7, 1, 'move', 5, 463, 394, 0, 0, 0, 1, 1),
(22, 8, 1, 'move', 190, 461, -140, 0, 0, 0, 1, 1),
(23, 9, 1, 'move', 200, 516, 310, 0, 0, 0, 1, 1),
(24, 2, 1, 'move', 167, -467, 158, 0, 0, 0, 1, 1),
(25, 2, 1, 'turn', 0, -467, 158, 4, 6, 8, 1.2, 1),
(26, 2, 1, 'move', 8, -459, 159, 0, 0, 0, 1, 1),
(27, 3, 1, 'turn', 0, -663, 33, 6, 7, 14, 1, 1),
(28, 3, 1, 'move', 175, -492, 69, 0, 0, 0, 1, 1),
(29, 1, 1, 'turn', 0, -709, 70, 30, 22, 57, 1, 1),
(30, 1, 1, 'move', 175, -542, 121, 0, 0, 0, 1, 1),
(31, 4, 1, 'speed', 1, -672, -127, 0, 12, 0, 1, 1),
(32, 4, 1, 'move', 213, -470, -195, 0, 0, 0, 1, 1),
(33, 5, 1, 'speed', 1, -669, 440, 0, 12, 0, 1, 1),
(34, 5, 1, 'turn', 0, -669, 440, 28, 11, 47, 1, 1),
(35, 5, 1, 'move', 213, -481, 540, 0, 0, 0, 1, 1),
(36, 5, 1, 'turn', 0, -481, 540, -18, 14, 8, 2, 1),
(37, 10, 2, 'deploy', 0, 436, 398, 171, 1, 0, 1, 1),
(38, 11, 2, 'deploy', 0, 485, 372, 170, 1, 0, 1, 1),
(39, 12, 2, 'deploy', 0, -528, 115, -15, 0, 0, 0, 1),
(40, 3, 2, 'move', 175, -321, 105, 0, 0, 0, 1, 1),
(41, 3, 2, 'turn', 0, -321, 105, -21, 45, 12, 2, 1),
(42, 2, 2, 'move', 164, -295, 154, 0, 0, 0, 1, 1),
(43, 2, 2, 'turn', 0, -295, 154, -24, 52, 27, 2, 1),
(44, 2, 2, 'move', 11, -284, 151, 0, 0, 0, 1, 1),
(45, 1, 2, 'move', 175, -375, 172, 0, 0, 0, 1, 1),
(46, 1, 2, 'turn', 0, -375, 172, -3, 4, 2, 2, 1),
(47, 5, 2, 'move', 213, -271, 577, 0, 0, 0, 1, 1),
(48, 5, 2, 'turn', 0, -271, 577, -30, 23, 12, 2, 1),
(49, 4, 2, 'move', 211, -275, -278, 0, 0, 0, 1, 1),
(50, 4, 2, 'turn', 0, -275, -278, 12, 5, 20, 1, 1),
(51, 4, 2, 'move', 2, -273, -278, 0, 0, 0, 1, 1),
(52, 7, 2, 'turn', 0, 463, 394, 30, 42, 72, 1, 1),
(53, 7, 2, 'move', 175, 346, 264, 0, 0, 0, 1, 1),
(54, 7, 2, 'turn', 0, 346, 264, 28, 77, 17, 2, 1),
(55, 6, 2, 'turn', 0, 512, 367, 30, 42, 72, 1, 1),
(56, 6, 2, 'move', 175, 393, 239, 0, 0, 0, 1, 1),
(57, 6, 2, 'turn', 0, 393, 239, 30, 83, 18, 2, 1),
(58, 8, 2, 'move', 187, 288, -212, 0, 0, 0, 1, 1),
(59, 8, 2, 'turn', 0, 288, -212, -29, 9, 40, 1, 1),
(60, 9, 2, 'turn', 0, 516, 310, 35, 7, 42, 1, 1),
(61, 9, 2, 'move', 200, 367, 176, 0, 0, 0, 1, 1),
(62, 12, 2, 'move', 880, -421, 72, 338, 0, 0, 0, 1),
(63, 10, 2, 'move', 730, 361, 417, 166, 0, 0, 0, 1),
(64, 11, 2, 'move', 784, 411, 392, 165, 0, 0, 0, 1),
(65, 3, 3, 'move', 175, -148, 78, 0, 0, 0, 1, 1),
(66, 3, 3, 'turn', 0, -148, 78, 11, 24, 6, 2, 1),
(67, 2, 3, 'turn', 0, -284, 151, 10, 11, 22, 1, 1),
(68, 2, 3, 'move', 175, -110, 136, 0, 0, 0, 1, 1),
(69, 1, 3, 'turn', 0, -375, 172, -19, 14, 37, 1, 1),
(70, 1, 3, 'move', 175, -201, 157, 0, 0, 0, 1, 1),
(71, 1, 3, 'turn', 0, -201, 157, -4, 6, 2, 2, 1),
(72, 5, 3, 'move', 213, -71, 504, 0, 0, 0, 1, 1),
(73, 5, 3, 'turn', 0, -71, 504, -26, 20, 11, 2, 1),
(74, 4, 3, 'speed', -1, -273, -278, 0, 13, 0, 1, 1),
(75, 4, 3, 'move', 190, -87, -238, 0, 0, 0, 1, 1),
(76, 7, 3, 'turn', 0, 346, 264, -30, 42, 72, 1, 1),
(77, 7, 3, 'move', 72, 296, 212, 0, 0, 0, 1, 1),
(78, 7, 3, 'turn', 0, 296, 212, -30, 42, 72, 1, 1),
(79, 7, 3, 'move', 72, 227, 192, 0, 0, 0, 1, 1),
(80, 7, 3, 'turn', 0, 227, 192, -8, 11, 19, 1, 1),
(81, 7, 3, 'move', 31, 196, 188, 0, 0, 0, 1, 1),
(82, 6, 3, 'turn', 0, 393, 239, -30, 42, 72, 1, 1),
(83, 6, 3, 'move', 72, 344, 186, 0, 0, 0, 1, 1),
(84, 6, 3, 'turn', 0, 344, 186, -22, 31, 53, 1, 1),
(85, 6, 3, 'move', 53, 296, 164, 0, 0, 0, 1, 1),
(86, 6, 3, 'turn', 0, 296, 164, -15, 21, 37, 1, 1),
(87, 6, 3, 'move', 50, 247, 155, 0, 0, 0, 1, 1),
(88, 8, 3, 'turn', 0, 288, -212, 20, 7, 28, 1, 1),
(89, 8, 3, 'move', 190, 100, -182, 0, 0, 0, 1, 1),
(90, 8, 3, 'turn', 0, 100, -182, -32, 20, 11, 2, 1),
(91, 12, 3, 'move', 580, -214, -29, 334, 0, 0, 0, 1),
(92, 10, 3, 'move', 441, 210, 447, 169, 0, 0, 0, 1),
(93, 11, 3, 'move', 495, 261, 427, 167, 0, 0, 0, 1);

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
(1, 5, 1, 2, 6, 1, 2, 3, 'Particle', 34, 3, 0, 13, 18, 16, 0, 'p;', 0),
(2, 6, 1, 2, 6, 1, 2, 9, 'Particle', 37, 3, 0, 13, 21, 16, 0, 'p;', 0),
(3, 10, 1, 2, 6, 4, 2, 16, 'Particle', 33, 3, 16, 14, 0, 17, 0, 'p;', 0);

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
(5, 1, 2, 7, 2, 0, 0, 17, 2, 25, '47;3;', 1, 1),
(6, 1, 2, 7, 2, 0, 0, 18, 2, 25, '9;50;', 1, 1),
(7, 1, 2, 7, 2, 0, 0, 19, 2, 25, '66;88;', 0, 1),
(8, 1, 2, 6, 2, 0, 0, 17, 2, 20, '52;36;', 0, 1),
(9, 1, 2, 6, 2, 0, 0, 18, 2, 20, '58;92;', 0, 1),
(10, 1, 2, 6, 2, 0, 0, 19, 2, 20, '95;16;', 1, 1);

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
(1, 'myGame', 'active', 3, 2, 3000, 100);

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
(1, 1, 12, 'Naga', 4),
(2, 1, 15, 'Naga', 4);

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
(1, 10, '2', 2, 5, -71, 504, 0),
(2, 11, '2', 2, 5, -71, 504, 0),
(3, 12, '2', 2, 8, 100, -182, 0);

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
(1, 1, 1, 3, 2, 'Earth Alliance', 310, 'waiting'),
(2, 2, 1, 3, 2, 'Centauri Republic', 558, 'waiting');

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
(9, 2, 11, 1, '-2', 0),
(10, 2, 12, 1, '-2', 0),
(11, 2, 17, 1, '-2', 0),
(12, 2, 18, 1, '-2', 0),
(13, 3, 11, 1, '-1', 0),
(14, 3, 12, 1, '-1', 0),
(15, 3, 17, 1, '-1', 0),
(16, 3, 18, 1, '-1', 0),
(17, 2, 6, 2, '1', 3),
(18, 2, 11, 2, '-2', 0),
(19, 2, 12, 2, '-2', 0),
(20, 2, 14, 2, '0', 0),
(21, 2, 15, 2, '0', 0),
(22, 2, 17, 2, '-2', 0),
(23, 2, 18, 2, '-2', 0),
(24, 2, 3, 2, '1', 2),
(25, 2, 4, 2, '1', 4),
(26, 3, 6, 2, '1', 3),
(27, 3, 11, 2, '-2', 0),
(28, 3, 12, 2, '-2', 0),
(29, 3, 14, 2, '0', 0),
(30, 3, 15, 2, '0', 0),
(31, 3, 17, 2, '-2', 0),
(32, 3, 18, 2, '-2', 0),
(33, 3, 3, 2, '1', 2),
(34, 3, 4, 2, '1', 4),
(39, 3, 11, 3, '-1', 0),
(40, 3, 12, 3, '-1', 0),
(41, 3, 14, 3, '0', 0),
(42, 3, 15, 3, '0', 0),
(43, 3, 17, 3, '-1', 0),
(44, 3, 18, 3, '-1', 0),
(45, 2, 11, 3, '-1', 0),
(46, 2, 12, 3, '-1', 0),
(47, 2, 14, 3, '0', 0),
(48, 2, 15, 3, '0', 0),
(49, 2, 17, 3, '-1', 0),
(50, 2, 18, 3, '-1', 0),
(51, 1, 8, 3, '1', 3),
(52, 1, 12, 3, '1', 0),
(53, 1, 12, 3, '1', 0),
(54, 1, 15, 3, '1', 0),
(55, 1, 15, 3, '1', 0),
(56, 5, 3, 3, '1', 2),
(57, 5, 10, 3, '1', 2),
(58, 5, 14, 3, '1', 2),
(59, 4, 3, 3, '1', 2),
(60, 4, 9, 3, '1', 2),
(61, 7, 7, 3, '0', 0),
(62, 7, 9, 3, '0', 0),
(63, 7, 15, 3, '0', 0),
(64, 7, 17, 3, '1', 3),
(65, 7, 18, 3, '1', 3),
(66, 6, 7, 3, '0', 0),
(67, 6, 9, 3, '0', 0),
(68, 6, 15, 3, '0', 0),
(69, 6, 17, 3, '1', 3),
(70, 6, 18, 3, '1', 3),
(71, 9, 4, 3, '1', 2),
(72, 9, 6, 3, '0', 0),
(73, 9, 8, 3, '1', 2),
(74, 9, 9, 3, '0', 0);

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
(1, 6, 4, 1, '357.29', 1232, 1),
(2, 7, 4, 1, '359.24', 1334, 1),
(3, 8, 1, 1, '-1.00', 84, 0),
(4, 9, 1, 1, '-1.00', 73, 0),
(5, 2, 4, 1, '0.46', 1256, 0),
(6, 3, 4, 1, '0.18', 1255, 0),
(7, 1, 4, 1, '-1.00', 88, 0),
(8, 4, 1, 1, '-1.00', 77, 0),
(9, 5, 1, 1, '-1.00', 77, 0),
(10, 2, 4, 2, '348.97', 650, 0),
(11, 3, 4, 2, '350.49', 690, 0),
(12, 1, 4, 2, '0.07', 783, 0),
(13, 4, 1, 2, '0.10', 571, 1),
(14, 5, 1, 2, '1.08', 587, 0),
(15, 6, 4, 2, '295.05', 756, 0),
(16, 7, 4, 2, '295.75', 715, 0),
(17, 8, 1, 2, '0.08', 687, 1),
(18, 9, 1, 2, '-1.00', 73, 0),
(19, 3, 4, 3, '0.59', 608, 0),
(20, 2, 4, 3, '0.53', 572, 0),
(21, 1, 4, 3, '0.39', 623, 0),
(22, 5, 1, 3, '0.07', 619, 0),
(23, 4, 1, 3, '0.66', 392, 0),
(24, 7, 4, 3, '5.66', 620, 0),
(25, 6, 4, 3, '5.81', 630, 0),
(26, 8, 1, 3, '358.89', 470, 1),
(27, 9, 1, 3, '359.43', 488, 0);

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
(1, 4, 1, 'Crius'),
(2, 4, 1, 'Crius'),
(3, 5, 1, 'Crius'),
(4, 5, 1, 'Tethys'),
(5, 5, 1, 'Tethys'),
(6, 8, 1, 'Vorchan'),
(7, 8, 1, 'Vorchan'),
(8, 9, 1, 'Haven'),
(9, 9, 1, 'Haven'),
(10, 10, 6, 'Sentri'),
(11, 10, 2, 'Sitara'),
(12, 11, 6, 'Sentri'),
(13, 11, 2, 'Sitara'),
(14, 12, 4, 'Naga');

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
(1, 2, 4, 2, 'Output', 0, '10.00');

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
  `name` varchar(255) DEFAULT '""',
  `display` varchar(50) DEFAULT '',
  `status` varchar(255) DEFAULT '""',
  `available` int(3) DEFAULT '0',
  `destroyed` tinyint(1) DEFAULT '0',
  `x` int(4) DEFAULT '0',
  `y` int(4) DEFAULT '0',
  `facing` int(3) DEFAULT '0',
  `delay` int(3) DEFAULT '0',
  `thrust` int(3) DEFAULT '0',
  `turn` int(1) DEFAULT '0',
  `phase` int(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `units`
--

INSERT INTO `units` (`id`, `gameid`, `userid`, `ship`, `ball`, `name`, `display`, `status`, `available`, `destroyed`, `x`, `y`, `facing`, `delay`, `thrust`, `turn`, `phase`) VALUES
(1, 1, 1, 1, 0, 'Olympus', '', 'bought', 1, 0, -375, 172, 14, 2, 175, 2, 3),
(2, 1, 1, 1, 0, 'Artemis', '', 'bought', 1, 0, -284, 151, 345, 16, 175, 2, 3),
(3, 1, 1, 1, 0, 'Artemis', '', 'bought', 1, 0, -321, 105, 351, 12, 175, 2, 3),
(4, 1, 1, 1, 0, 'Squadron', '', 'bought', 1, 0, -273, -278, 12, 18, 213, 2, 3),
(5, 1, 1, 1, 0, 'Squadron', '', 'bought', 1, 0, -271, 577, 340, 12, 213, 2, 3),
(6, 1, 2, 1, 0, 'Altarian', '', 'bought', 1, 0, 393, 239, 257, 18, 175, 2, 3),
(7, 1, 2, 1, 0, 'Altarian', '', 'bought', 1, 0, 346, 264, 256, 17, 175, 2, 3),
(8, 1, 2, 1, 0, 'Squadron', '', 'bought', 1, 0, 288, -212, 151, 40, 190, 2, 3),
(9, 1, 2, 1, 0, 'Squadron', '', 'bought', 1, 0, 367, 176, 222, 0, 200, 2, 3),
(10, 1, 2, 0, 0, 'Flight', '', 'deployed', 2, 0, 361, 417, 166, 0, 154, 2, 3),
(11, 1, 2, 0, 0, 'Flight', '', 'deployed', 2, 0, 411, 392, 165, 0, 154, 2, 3),
(12, 1, 1, 0, 1, 'Salvo', '', 'deployed', 2, 0, -421, 72, 338, 0, 230, 2, 3);

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
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=94;
--
-- AUTO_INCREMENT für Tabelle `chat`
--
ALTER TABLE `chat`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `damages`
--
ALTER TABLE `damages`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
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
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT für Tabelle `games`
--
ALTER TABLE `games`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT für Tabelle `loads`
--
ALTER TABLE `loads`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT für Tabelle `missions`
--
ALTER TABLE `missions`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT für Tabelle `playerstatus`
--
ALTER TABLE `playerstatus`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT für Tabelle `powers`
--
ALTER TABLE `powers`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;
--
-- AUTO_INCREMENT für Tabelle `reinforcements`
--
ALTER TABLE `reinforcements`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `sensors`
--
ALTER TABLE `sensors`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
--
-- AUTO_INCREMENT für Tabelle `subunits`
--
ALTER TABLE `subunits`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
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
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

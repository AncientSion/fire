-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 10. Sep 2017 um 21:44
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
(1, 5, 1, 'deploy', 0, 669, -297, 180, 0, 0, 1, 1),
(2, 6, 1, 'deploy', 0, 639, 28, 180, 0, 0, 1, 1),
(3, 7, 1, 'deploy', 0, 536, 96, 180, 0, 0, 1, 1),
(4, 8, 1, 'deploy', 0, 594, 309, 180, 0, 0, 1, 1),
(5, 2, 1, 'deploy', 0, -546, 216, 0, 0, 0, 1, 1),
(6, 1, 1, 'deploy', 0, -669, 464, 295, 0, 0, 1, 1),
(7, 3, 1, 'deploy', 0, -547, -122, 0, 0, 0, 1, 1),
(8, 4, 1, 'deploy', 0, -569, -164, 0, 0, 0, 1, 1),
(9, 1, 1, 'jump', 35, -647, 437, 23, 0, 0, 0, 1),
(10, 2, 1, 'jump', 32, -543, 185, 4, 0, 0, 0, 1),
(11, 3, 1, 'jump', 20, -531, -111, -7, 0, 0, 0, 1),
(12, 4, 1, 'jump', 23, -585, -180, 0, 0, 0, 0, 1),
(13, 5, 1, 'jump', 35, 698, -278, -15, 0, 0, 0, 1),
(14, 6, 1, 'jump', 17, 654, 36, -11, 0, 0, 0, 1),
(15, 7, 1, 'jump', 13, 541, 108, 11, 0, 0, 0, 1),
(16, 8, 1, 'jump', 8, 590, 315, 2, 0, 0, 0, 1),
(17, 2, 1, 'turn', 0, -543, 185, -17, 44, 45, 1, 1),
(18, 2, 1, 'move', 150, -397, 151, 0, 0, 0, 1, 1),
(19, 1, 1, 'turn', 0, -647, 437, -14, 47, 40, 1, 1),
(20, 1, 1, 'move', 150, -563, 313, 0, 0, 0, 1, 1),
(21, 3, 1, 'move', 170, -362, -132, 0, 0, 0, 1, 1),
(22, 4, 1, 'move', 170, -415, -180, 0, 0, 0, 1, 1),
(23, 5, 1, 'turn', 0, 698, -278, 30, 85, 81, 1, 1),
(24, 5, 1, 'move', 139, 581, -354, 0, 0, 0, 1, 1),
(25, 5, 1, 'turn', 0, 581, -354, -30, 170, 40, 2, 1),
(26, 5, 1, 'move', 11, 570, -351, 0, 0, 0, 1, 1),
(27, 6, 1, 'turn', 0, 654, 36, 7, 8, 13, 1, 1),
(28, 6, 1, 'move', 160, 494, 47, 0, 0, 0, 1, 1),
(29, 7, 1, 'move', 160, 384, 77, 0, 0, 0, 1, 1),
(30, 7, 1, 'turn', 0, 384, 77, -7, 16, 7, 2, 1),
(31, 8, 1, 'move', 160, 430, 309, 0, 0, 0, 1, 1),
(32, 9, 2, 'deploy', 0, 551, -346, 167, 0, 0, 1, 1),
(33, 10, 2, 'deploy', 0, -546, 303, -30, 0, 0, 1, 1),
(34, 11, 2, 'deploy', 0, -543, 313, 0, 0, 0, 1, 1),
(35, 12, 2, 'deploy', 0, 424, 291, -151, 0, 0, 0, 1),
(36, 5, 2, 'speed', -1, 570, -351, 0, 220, 0, 1, 1),
(37, 5, 2, 'move', 129, 445, -318, 0, 0, 0, 1, 1),
(38, 7, 2, 'turn', 0, 384, 77, -4, 5, 8, 1, 1),
(39, 7, 2, 'move', 160, 224, 77, 0, 0, 0, 1, 1),
(40, 6, 2, 'move', 160, 334, 58, 0, 0, 0, 1, 1),
(41, 8, 2, 'turn', 0, 430, 309, -30, 28, 39, 1.2, 1),
(42, 8, 2, 'move', 42, 401, 340, 0, 0, 0, 1, 1),
(43, 8, 2, 'turn', 0, 401, 340, -12, 9, 19, 1, 1),
(44, 8, 2, 'move', 116, 341, 440, 0, 0, 0, 1, 1),
(45, 8, 2, 'turn', 0, 341, 440, 30, 46, 23, 2, 1),
(46, 8, 2, 'move', 2, 339, 440, 0, 0, 0, 1, 1),
(47, 2, 2, 'move', 150, -247, 152, 0, 0, 0, 1, 1),
(48, 2, 2, 'turn', 0, -247, 152, -7, 35, 9, 2, 1),
(49, 1, 2, 'move', 150, -479, 189, 0, 0, 0, 1, 1),
(50, 3, 2, 'turn', 0, -362, -132, -30, 8, 30, 1, 1),
(51, 3, 2, 'move', 30, -338, -150, 0, 0, 0, 1, 1),
(52, 3, 2, 'turn', 0, -338, -150, -30, 8, 30, 1, 1),
(53, 3, 2, 'move', 140, -283, -279, 0, 0, 0, 1, 1),
(54, 4, 2, 'turn', 0, -415, -180, -30, 8, 30, 1, 1),
(55, 4, 2, 'move', 30, -389, -195, 0, 0, 0, 1, 1),
(56, 4, 2, 'turn', 0, -389, -195, -30, 8, 30, 1, 1),
(57, 4, 2, 'move', 140, -319, -316, 0, 0, 0, 1, 1),
(58, 11, 2, 'move', 892, -290, 349, 8, 0, 0, 0, 1),
(59, 10, 2, 'move', 1170, -329, 167, 328, 0, 0, 0, 1),
(60, 9, 2, 'move', 837, 187, -317, 175, 0, 0, 0, 1),
(61, 12, 2, 'move', 909, 285, 179, 219, 0, 0, 0, 1);

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
(1, 1, 1, 2, 7, -1, 1, 43, 'Particle', 50, 0, 28, 22, 0, 22, 0, 'pen', 0);

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
(1, 1, 1, 1, -1, -546, 229, 57),
(2, 1, 1, 1, -1, -557, -145, 47),
(3, 1, 1, 1, -1, -437, 97, 55),
(4, 1, 1, 1, -1, -666, 458, 64),
(5, 1, 2, 1, -1, 537, 83, 47),
(6, 1, 2, 1, -1, 670, -296, 44),
(7, 1, 2, 1, -1, 609, 340, 67),
(8, 1, 2, 1, -1, 643, 35, 40);

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
(1, 1, 1, 6, 2, 0, 0, 9, 1, 47, '59 43 ', 1, 1),
(2, 1, 1, 7, 2, 0, 0, 9, 1, 57, '62 79 ', 0, 1),
(3, 1, 1, 7, 2, 0, 0, 18, 1, 25, '50 ', 0, 1),
(4, 1, 1, 7, 2, 0, 0, 19, 1, 25, '80 ', 0, 1),
(5, 1, 1, 2, 5, 0, 0, 21, 1, 35, '58 ', 0, 1),
(6, 1, 2, 5, 0, 0, 0, 20, 0, 0, '', 0, 1),
(7, 1, 2, 8, 3, 0, 0, 9, 3, 0, '', 0, 1),
(8, 1, 2, 1, 0, 0, 0, 13, 0, 0, '', 0, 1),
(9, 1, 2, 1, 0, 0, 0, 17, 0, 0, '', 0, 1),
(10, 1, 2, 2, 5, 0, 0, 8, 0, 0, '', 0, 0),
(11, 1, 2, 2, 7, 0, 0, 9, 0, 0, '', 0, 0),
(12, 1, 2, 2, 7, 0, 0, 11, 0, 0, '', 0, 0),
(13, 1, 2, 2, 5, 0, 0, 12, 0, 0, '', 0, 0),
(14, 1, 2, 2, 7, 0, 0, 14, 0, 0, '', 0, 0),
(15, 1, 2, 2, 7, 0, 0, 15, 0, 0, '', 0, 0),
(16, 1, 2, 2, 7, 0, 0, 16, 0, 0, '', 0, 0),
(17, 1, 2, 2, 5, 0, 0, 22, 0, 0, '', 0, 0),
(18, 1, 2, 2, 5, 0, 0, 23, 0, 0, '', 0, 0),
(19, 1, 2, 1, 7, 0, 0, 8, 0, 0, '', 0, 0),
(20, 1, 2, 1, 7, 0, 0, 9, 0, 0, '', 0, 0),
(21, 1, 2, 1, 7, 0, 0, 11, 0, 0, '', 0, 0),
(22, 1, 2, 1, 7, 0, 0, 12, 0, 0, '', 0, 0),
(23, 1, 2, 1, 7, 0, 0, 15, 0, 0, '', 0, 0),
(24, 1, 2, 1, 7, 0, 0, 16, 0, 0, '', 0, 0);

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
(1, 'myGame', 'active', 2, 2, 3500, 100);

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
(1, 1, 13, 'Aurora', 12),
(2, 1, 17, 'Aurora', 12),
(3, 1, 24, 'Aurora', 12),
(4, 1, 28, 'Aurora', 12),
(5, 5, 20, 'Gorith', 18),
(6, 8, 9, 'Javelin', 6);

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
(1, 9, '2', 2, 3, -283, -279, 0),
(2, 10, '2', 2, 5, 445, -318, 0),
(3, 11, '2', 2, 8, 339, 440, 0),
(4, 12, '2', 2, 3, -283, -279, 0);

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
(1, 1, 1, 2, 2, 'Earth Alliance', 468, 'ready'),
(2, 2, 1, 2, 2, 'Narn Regime', 759, 'waiting');

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
(1, 5, 8, 1, '0', 0),
(2, 5, 9, 1, '1', 6),
(3, 5, 10, 1, '1', 6),
(4, 5, 11, 1, '0', 0),
(5, 5, 13, 1, '0', 0),
(6, 5, 14, 1, '0', 0),
(7, 5, 15, 1, '0', 0),
(8, 5, 16, 1, '0', 0),
(9, 5, 18, 1, '0', 0),
(10, 5, 19, 1, '0', 0),
(11, 5, 21, 1, '0', 0),
(12, 5, 22, 1, '0', 0),
(13, 5, 24, 1, '0', 0),
(14, 5, 25, 1, '0', 0),
(15, 5, 26, 1, '0', 0),
(16, 5, 27, 1, '0', 0),
(17, 5, 5, 1, '1', 4),
(18, 5, 5, 1, '1', 6),
(19, 5, 5, 1, '1', 7),
(20, 6, 8, 1, '0', 0),
(21, 6, 10, 1, '0', 0),
(22, 6, 14, 1, '0', 0),
(23, 6, 16, 1, '0', 0),
(24, 6, 20, 1, '0', 0),
(25, 6, 5, 1, '1', 4),
(26, 6, 5, 1, '1', 6),
(27, 7, 8, 1, '0', 0),
(28, 7, 10, 1, '0', 0),
(29, 7, 14, 1, '0', 0),
(30, 7, 16, 1, '0', 0),
(31, 7, 20, 1, '0', 0),
(32, 7, 5, 1, '1', 4),
(33, 7, 5, 1, '1', 6),
(34, 2, 9, 1, '-1', 0),
(35, 2, 9, 1, '0', 0),
(36, 2, 10, 1, '0', 0),
(37, 2, 11, 1, '-1', 0),
(38, 2, 11, 1, '0', 0),
(39, 2, 14, 1, '1', 4),
(40, 2, 15, 1, '-1', 0),
(41, 2, 15, 1, '0', 0),
(42, 2, 16, 1, '-1', 0),
(43, 2, 16, 1, '0', 0),
(44, 2, 18, 1, '0', 0),
(45, 2, 19, 1, '0', 0),
(46, 2, 21, 1, '1', 4),
(47, 2, 22, 1, '-1', 0),
(48, 2, 22, 1, '0', 0),
(49, 2, 23, 1, '-1', 0),
(50, 2, 23, 1, '0', 0),
(51, 2, 5, 1, '1', 4),
(52, 2, 5, 1, '1', 6),
(53, 1, 8, 1, '-1', 0),
(54, 1, 9, 1, '-1', 0),
(55, 1, 11, 1, '-1', 0),
(56, 1, 12, 1, '-1', 0),
(57, 1, 15, 1, '-1', 0),
(58, 1, 16, 1, '-1', 0),
(59, 1, 19, 1, '-1', 0),
(60, 1, 19, 1, '0', 0),
(61, 1, 20, 1, '-1', 0),
(62, 1, 20, 1, '0', 0),
(63, 1, 22, 1, '-1', 0),
(64, 1, 23, 1, '-1', 0),
(65, 1, 26, 1, '-1', 0),
(66, 1, 27, 1, '-1', 0),
(67, 5, 8, 2, '0', 0),
(68, 5, 9, 2, '1', 6),
(69, 5, 9, 2, '1', 6),
(70, 5, 10, 2, '1', 6),
(71, 5, 10, 2, '1', 6),
(72, 5, 11, 2, '0', 0),
(73, 5, 13, 2, '0', 0),
(74, 5, 14, 2, '0', 0),
(75, 5, 15, 2, '0', 0),
(76, 5, 16, 2, '0', 0),
(77, 5, 18, 2, '0', 0),
(78, 5, 19, 2, '0', 0),
(79, 5, 21, 2, '0', 0),
(80, 5, 22, 2, '0', 0),
(81, 5, 24, 2, '0', 0),
(82, 5, 25, 2, '0', 0),
(83, 5, 26, 2, '0', 0),
(84, 5, 27, 2, '0', 0),
(85, 5, 5, 2, '1', 4),
(86, 6, 8, 2, '0', 0),
(87, 6, 9, 2, '1', 4),
(88, 6, 9, 2, '1', 4),
(89, 6, 10, 2, '0', 0),
(90, 6, 14, 2, '0', 0),
(91, 6, 16, 2, '0', 0),
(92, 6, 20, 2, '0', 0),
(93, 6, 5, 2, '1', 4),
(94, 7, 8, 2, '0', 0),
(95, 7, 9, 2, '1', 4),
(96, 7, 10, 2, '0', 0),
(97, 7, 14, 2, '0', 0),
(98, 7, 16, 2, '0', 0),
(99, 7, 18, 2, '1', 3),
(100, 7, 19, 2, '1', 3),
(101, 7, 20, 2, '0', 0),
(102, 8, 9, 2, '1', 0),
(103, 8, 9, 2, '1', 0),
(104, 8, 9, 2, '1', 0),
(105, 2, 9, 2, '-2', 0),
(106, 2, 10, 2, '0', 0),
(107, 2, 11, 2, '-2', 0),
(108, 2, 14, 2, '1', 4),
(109, 2, 15, 2, '-2', 0),
(110, 2, 16, 2, '-2', 0),
(111, 2, 18, 2, '0', 0),
(112, 2, 19, 2, '0', 0),
(113, 2, 22, 2, '-2', 0),
(114, 2, 23, 2, '-2', 0),
(115, 2, 5, 2, '1', 5),
(116, 1, 8, 2, '-2', 0),
(117, 1, 9, 2, '-2', 0),
(118, 1, 11, 2, '-2', 0),
(119, 1, 12, 2, '-2', 0),
(120, 1, 15, 2, '-2', 0),
(121, 1, 16, 2, '-2', 0),
(122, 1, 19, 2, '-1', 0),
(123, 1, 19, 2, '0', 0),
(124, 1, 20, 2, '-1', 0),
(125, 1, 20, 2, '0', 0),
(126, 1, 22, 2, '-2', 0),
(127, 1, 23, 2, '-2', 0),
(128, 1, 26, 2, '-2', 0),
(129, 1, 27, 2, '-2', 0);

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
(1, 1, 2, 'GQuan', 4, 1050);

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
(1, 5, 5, 1, 359, 975, 0),
(2, 6, 5, 1, 359, 900, 0),
(3, 7, 5, 1, 0, 900, 0),
(4, 8, 5, 1, -1, 174, 0),
(5, 2, 5, 1, -1, 1000, 3),
(6, 1, 5, 1, -1, 1000, 3),
(7, 3, 5, 1, -1, 1000, 3),
(8, 4, 5, 1, -1, 1000, 3),
(9, 5, 5, 2, 0, 825, 0),
(10, 6, 5, 2, 3, 825, 0),
(11, 7, 5, 2, 1, 750, 0),
(12, 8, 5, 2, -1, 1000, 3),
(13, 2, 5, 2, 359, 880, 0),
(14, 1, 5, 2, -1, 1000, 2),
(15, 3, 5, 2, -1, 1000, 3),
(16, 4, 5, 2, -1, 1000, 3);

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
(1, 9, 8, 'Gorith'),
(2, 10, 12, 'Aurora'),
(3, 11, 8, 'Aurora'),
(4, 12, 3, 'Javelin');

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
(1, 1, 1, 1, 0, 'Avenger', 'bought', 1, 0, -563, 313, 304, 0, 150, 1, 3),
(2, 1, 1, 1, 0, 'Hyperion', 'bought', 1, 0, -397, 151, 347, 0, 150, 1, 3),
(3, 1, 1, 1, 0, 'Tethys', 'bought', 1, 0, -362, -132, 353, 0, 170, 1, 3),
(4, 1, 1, 1, 0, 'Tethys', 'bought', 1, 0, -415, -180, 0, 0, 170, 1, 3),
(5, 1, 2, 1, 0, 'GQuan', 'bought', 1, 0, 570, -351, 165, 29, 150, 1, 3),
(6, 1, 2, 1, 0, 'Altarian', 'bought', 1, 0, 494, 47, 176, 0, 160, 1, 3),
(7, 1, 2, 1, 0, 'Altarian', 'bought', 1, 0, 384, 77, 184, 7, 160, 1, 3),
(8, 1, 2, 1, 0, 'Demos', 'bought', 1, 0, 430, 309, 182, 0, 160, 1, 3),
(9, 1, 2, 0, 0, 'Flight', 'deployed', 2, 0, 551, -346, 167, 0, 365, 2, -1),
(10, 1, 1, 0, 0, 'Flight', 'deployed', 2, 0, -546, 303, 330, 0, 256, 2, -1),
(11, 1, 1, 0, 0, 'Flight', 'deployed', 2, 0, -543, 313, 0, 0, 256, 2, -1),
(12, 1, 2, 0, 1, 'Salvo', 'deployed', 2, 0, 424, 291, 209, NULL, NULL, 2, -1);

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
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;
--
-- AUTO_INCREMENT für Tabelle `damages`
--
ALTER TABLE `damages`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
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
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT für Tabelle `missions`
--
ALTER TABLE `missions`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT für Tabelle `playerstatus`
--
ALTER TABLE `playerstatus`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT für Tabelle `powers`
--
ALTER TABLE `powers`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=130;
--
-- AUTO_INCREMENT für Tabelle `reinforcements`
--
ALTER TABLE `reinforcements`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT für Tabelle `sensors`
--
ALTER TABLE `sensors`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT für Tabelle `subunits`
--
ALTER TABLE `subunits`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT für Tabelle `systemcrits`
--
ALTER TABLE `systemcrits`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT;
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

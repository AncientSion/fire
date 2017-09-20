-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 20. Sep 2017 um 16:45
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
(1, 2, 1, 'deploy', 0, -527, -497, 0, 0, 0, 1, 1),
(2, 1, 1, 'deploy', 0, -486, 179, 0, 0, 0, 1, 1),
(3, 3, 1, 'deploy', 0, -472, -419, 0, 0, 0, 1, 1),
(4, 4, 1, 'deploy', 0, 523, -541, 180, 0, 0, 1, 1),
(5, 5, 1, 'deploy', 0, 599, 63, 180, 0, 0, 1, 1),
(6, 6, 1, 'deploy', 0, 628, 116, 180, 0, 0, 1, 1),
(7, 7, 1, 'deploy', 0, 553, -59, 180, 0, 0, 1, 1),
(8, 1, 1, 'jump', 20, -472, 192, 6, 0, 0, 0, 1),
(9, 2, 1, 'jump', 24, -514, -478, -5, 0, 0, 0, 1),
(10, 3, 1, 'jump', 10, -469, -428, 8, 0, 0, 0, 1),
(11, 4, 1, 'jump', 10, 531, -546, 16, 0, 0, 0, 1),
(12, 5, 1, 'jump', 24, 622, 66, 3, 0, 0, 0, 1),
(13, 6, 1, 'jump', 24, 642, 135, -3, 0, 0, 0, 1),
(14, 7, 1, 'jump', 35, 522, -75, 0, 0, 0, 0, 1),
(15, 2, 1, 'move', 135, -389, -531, 0, 0, 0, 1, 1),
(16, 2, 1, 'turn', 0, -389, -531, 11, 118, 19, 2, 1),
(17, 2, 1, 'move', 5, -384, -530, 0, 0, 0, 1, 1),
(18, 1, 1, 'turn', 0, -472, 192, -30, 27, 51, 1, 1),
(19, 1, 1, 'move', 160, -326, 127, 0, 0, 0, 1, 1),
(20, 3, 1, 'turn', 0, -469, -428, -30, 8, 30, 1, 1),
(21, 3, 1, 'move', 30, -441, -439, 0, 0, 0, 1, 1),
(22, 3, 1, 'turn', 0, -441, -439, -30, 8, 30, 1, 1),
(23, 3, 1, 'move', 140, -355, -549, 0, 0, 0, 1, 1),
(24, 4, 1, 'move', 137, 417, -623, 0, 0, 0, 1, 1),
(25, 4, 1, 'turn', 0, 417, -623, -30, 266, 48, 2, 1),
(26, 4, 1, 'move', 3, 414, -622, 0, 0, 0, 1, 1),
(27, 5, 1, 'move', 160, 462, 58, 0, 0, 0, 1, 1),
(28, 6, 1, 'turn', 0, 642, 135, 8, 9, 15, 1, 1),
(29, 6, 1, 'move', 160, 483, 121, 0, 0, 0, 1, 1),
(30, 7, 1, 'turn', 0, 522, -75, 30, 4, 24, 1, 1),
(31, 7, 1, 'move', 24, 501, -87, 0, 0, 0, 1, 1),
(32, 7, 1, 'turn', 0, 501, -87, 27, 4, 21, 1, 1),
(33, 7, 1, 'move', 156, 416, -218, 0, 0, 0, 1, 1),
(34, 12, 2, 'deploy', 0, -368, -519, 35, 0, 0, 1, 1),
(35, 13, 2, 'deploy', 0, 400, -608, 135, 0, 0, 1, 0),
(36, 14, 2, 'deploy', 0, 400, -608, 135, 0, 0, 1, 0),
(37, 15, 2, 'deploy', 0, 400, -608, 135, 0, 0, 1, 0),
(38, 16, 2, 'deploy', 0, 400, -608, 135, 0, 0, 1, 0),
(39, 17, 2, 'deploy', 0, 400, -608, 135, 0, 0, 1, 0),
(40, 18, 2, 'deploy', 0, 393, -601, 135, 0, 0, 1, 1),
(41, 19, 2, 'deploy', 0, -310, 127, -25, 0, 0, 0, 1);

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
(1, 1, 1, 2, 7, 12, 1, 76, 'Particle', 51, 0, 34, 17, 0, 17, 0, 'pen', 0),
(2, 1, 1, 2, 7, -1, 1, 27, 'Particle', 52, 0, 28, 24, 0, 24, 0, 'pen', 0),
(3, 2, 1, 2, 7, -1, 1, 23, 'Particle', 65, 0, 42, 23, 0, 23, 0, 'pen', 0),
(4, 2, 1, 2, 7, -1, 1, 67, 'Particle', 62, 0, 39, 23, 0, 23, 0, 'pen', 0),
(5, 3, 1, 2, 7, -1, 1, 24, 'Particle', 65, 0, 43, 22, 0, 22, 0, 'pen', 0),
(6, 3, 1, 2, 7, 11, 1, 65, 'Particle', 57, 0, 42, 15, 0, 15, 0, 'pen', 0),
(7, 4, 1, 2, 7, -1, 1, 45, 'Particle', 50, 0, 29, 21, 0, 21, 0, 'pen', 0),
(8, 4, 1, 2, 7, -1, 1, 72, 'Particle', 58, 0, 37, 21, 0, 21, 0, 'pen', 0),
(9, 5, 1, 2, 7, 12, 1, 66, 'Particle', 56, 0, 16, 14, 26, 14, 1, 'pen', 0),
(10, 5, 1, 2, 7, -1, 1, 73, 'Particle', 50, 0, 30, 20, 0, 20, 0, 'pen', 0),
(11, 7, 1, 2, 13, -1, 1, 22, 'Particle', 65, 0, 43, 22, 0, 22, 0, 'pen', 0),
(12, 8, 1, 4, 7, -1, 1, 47, 'Laser', 154, 0, 25, 26, 0, 26, 0, 'pen', 0),
(13, 8, 1, 4, 7, -1, 1, 47, 'Laser', 154, 0, 26, 25, 0, 25, 0, 'pen', 0),
(14, 8, 1, 4, 7, -1, 1, 47, 'Laser', 154, 0, 27, 24, 0, 24, 0, 'pen', 0),
(15, 9, 1, 4, 7, -1, 1, 73, 'Laser', 158, 0, 28, 24, 0, 24, 0, 'pen', 0),
(16, 9, 1, 4, 7, 8, 1, 73, 'Laser', 158, 0, 39, 13, 0, 13, 0, 'pen', 0),
(17, 9, 1, 4, 7, -1, 1, 73, 'Laser', 158, 0, 29, 23, 0, 23, 0, 'pen', 0);

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
(1, 2, 1, 1, -1, -637, -373, 61),
(2, 2, 2, 1, -1, 580, 512, 56),
(3, 1, 1, 1, -1, -477, 167, 60),
(4, 1, 1, 1, -1, -486, -419, 42),
(5, 1, 1, 1, -1, -528, -487, 68),
(6, 1, 2, 1, -1, 624, 467, 49),
(7, 1, 2, 1, -1, 614, 88, 61),
(8, 1, 2, 1, -1, 532, -36, 54),
(9, 1, 2, 1, -1, 517, -542, 62);

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
(1, 1, 1, 4, 2, 0, 0, 8, 1, 103, '76 27 ', 2, 1),
(2, 1, 1, 4, 2, 0, 0, 9, 1, 103, '23 67 ', 2, 1),
(3, 1, 1, 4, 2, 0, 0, 10, 1, 103, '24 65 ', 2, 1),
(4, 1, 1, 4, 2, 0, 0, 11, 1, 103, '45 72 ', 2, 1),
(5, 1, 1, 4, 2, 0, 0, 13, 1, 103, '66 73 ', 2, 1),
(6, 1, 1, 5, 2, 0, 0, 9, 1, 58, '71 69 ', 0, 1),
(7, 1, 1, 6, 2, 0, 0, 9, 1, 54, '22 77 ', 1, 1),
(8, 1, 1, 2, 4, 0, 0, 8, 1, 114, '47 ', 3, 1),
(9, 1, 1, 2, 4, 0, 0, 9, 1, 114, '73 ', 3, 1),
(10, 1, 2, 2, 5, 0, 0, 10, 1, 0, '', 0, 1),
(11, 1, 2, 1, 7, 0, 0, 14, 3, 0, '', 0, 1),
(12, 1, 2, 1, 7, 0, 0, 18, 3, 0, '', 0, 1),
(13, 1, 2, 4, 1, 0, 0, 17, 1, 0, '', 0, 1),
(14, 1, 2, 4, 1, 0, 0, 27, 1, 0, '', 0, 1);

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
(3, 2, 10, 'Aurora', 13);

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
(1, 12, '2', 2, 5, 462, 58, 0),
(2, 13, '2', 2, 1, -326, 127, 0),
(3, 14, '2', 2, 1, -326, 127, 0),
(4, 15, '2', 2, 1, -326, 127, 0),
(5, 16, '2', 2, 1, -326, 127, 0),
(6, 17, '2', 2, 1, -326, 127, 0),
(7, 18, '2', 2, 1, -326, 127, 0),
(8, 19, '2', 2, 7, 416, -218, 0);

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
(1, 1, 1, 2, 0, 'Earth Alliance', 256, 'waiting'),
(2, 2, 1, 2, 0, 'Centauri Republic', 242, 'waiting'),
(3, 1, 2, 1, -1, 'Earth Alliance', 3800, 'waiting'),
(4, 2, 2, 1, -1, 'Centauri Republic', 3920, 'waiting'),
(5, 2, 3, -1, -1, 'Earth Alliance', 3800, 'ready'),
(6, 1, 3, -1, -1, 'Centauri Republic', 4640, 'ready');

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
(1, 2, 8, 1, '-1', 0),
(2, 2, 9, 1, '-1', 0),
(3, 2, 11, 1, '-1', 0),
(4, 2, 12, 1, '-1', 0),
(5, 2, 14, 1, '-2', 0),
(6, 2, 15, 1, '-2', 0),
(7, 2, 16, 1, '-2', 0),
(8, 2, 17, 1, '-2', 0),
(9, 2, 18, 1, '-2', 0),
(10, 2, 19, 1, '-2', 0),
(11, 2, 21, 1, '0', 0),
(12, 2, 22, 1, '0', 0),
(13, 2, 23, 1, '0', 0),
(14, 2, 24, 1, '0', 0),
(15, 2, 26, 1, '-2', 0),
(16, 2, 27, 1, '-2', 0),
(17, 2, 28, 1, '-2', 0),
(18, 2, 29, 1, '-2', 0),
(19, 2, 30, 1, '-2', 0),
(20, 2, 31, 1, '-2', 0),
(21, 2, 5, 1, '1', 5),
(22, 1, 12, 1, '-1', 0),
(23, 1, 13, 1, '-1', 0),
(24, 1, 13, 1, '0', 0),
(25, 1, 16, 1, '-1', 0),
(26, 1, 17, 1, '-1', 0),
(27, 4, 19, 1, '0', 0),
(28, 4, 20, 1, '0', 0),
(29, 4, 21, 1, '0', 0),
(30, 5, 16, 1, '0', 0),
(31, 6, 16, 1, '0', 0),
(32, 2, 8, 2, '-1', 0),
(33, 2, 9, 2, '-1', 0),
(34, 2, 11, 2, '-1', 0),
(35, 2, 11, 2, '1', 4),
(36, 2, 14, 2, '-1', 0),
(37, 2, 15, 2, '-1', 0),
(38, 2, 16, 2, '-1', 0),
(39, 2, 17, 2, '-1', 0),
(40, 2, 18, 2, '-1', 0),
(41, 2, 19, 2, '-1', 0),
(42, 2, 21, 2, '0', 0),
(43, 2, 22, 2, '0', 0),
(44, 2, 23, 2, '0', 0),
(45, 2, 24, 2, '0', 0),
(46, 2, 26, 2, '-1', 0),
(47, 2, 27, 2, '-1', 0),
(48, 2, 28, 2, '-1', 0),
(49, 2, 29, 2, '-1', 0),
(50, 2, 30, 2, '-1', 0),
(51, 2, 31, 2, '-1', 0),
(52, 1, 12, 2, '-1', 0),
(53, 1, 13, 2, '-1', 0),
(54, 1, 13, 2, '0', 0),
(55, 1, 14, 2, '1', 0),
(56, 1, 14, 2, '1', 0),
(57, 1, 14, 2, '1', 0),
(58, 1, 16, 2, '-1', 0),
(59, 1, 17, 2, '-1', 0),
(60, 1, 18, 2, '1', 0),
(61, 1, 18, 2, '1', 0),
(62, 1, 18, 2, '1', 0),
(63, 4, 9, 2, '1', 4),
(64, 4, 10, 2, '1', 4),
(65, 4, 19, 2, '0', 0),
(66, 4, 20, 2, '0', 0),
(67, 4, 21, 2, '0', 0),
(68, 5, 16, 2, '0', 0),
(69, 6, 16, 2, '0', 0);

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
(1, 1, 1, 'Tethys', 3, 220),
(2, 1, 2, 'Altarian', 3, 630);

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
(1, 2, 5, 1, 359, 891, 0),
(2, 1, 5, 1, -1, 1000, 3),
(3, 3, 5, 1, -1, 1000, 3),
(4, 4, 5, 1, 359, 875, 0),
(5, 5, 5, 1, -1, 1000, 2),
(6, 6, 5, 1, -1, 1000, 2),
(7, 7, 5, 1, -1, 72, 0),
(8, 2, 5, 2, 0, 594, 0),
(9, 1, 5, 2, 359, 580, 1),
(10, 3, 5, 2, -1, 1000, 3),
(11, 4, 5, 2, 358, 661, 1),
(12, 5, 5, 2, 359, 615, 0),
(13, 6, 5, 2, 359, 626, 0),
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
(1, 12, 13, 'Aurora'),
(2, 13, 14, 'Sentri'),
(3, 13, 2, 'Sitara'),
(4, 14, 7, 'Sentri'),
(5, 14, 1, 'Sitara'),
(6, 14, NULL, NULL),
(7, 15, 2, 'Sitara'),
(8, 16, 1, 'Sitara'),
(9, 16, NULL, NULL),
(10, 17, 8, 'Sentri'),
(11, 17, 3, 'Sitara'),
(12, 18, 14, 'Sentri'),
(13, 18, 4, 'Sitara'),
(14, 19, 6, 'Naga');

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
(1, 2, 11, 1, 'Damage', 0, '0.40');

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
(1, 1, 1, 1, 0, 'Artemis', 'bought', 1, 0, -326, 127, 336, 0, 160, 1, 3),
(2, 1, 1, 1, 0, 'Omega', 'bought', 1, 0, -384, -530, 6, 14, 140, 1, 3),
(3, 1, 1, 1, 0, 'Tethys', 'bought', 1, 0, -355, -549, 308, 0, 170, 1, 3),
(4, 1, 2, 1, 0, 'Primus', 'bought', 1, 0, 414, -622, 166, 45, 140, 1, 3),
(5, 1, 2, 1, 0, 'Altarian', 'bought', 1, 0, 462, 58, 183, 0, 160, 1, 3),
(6, 1, 2, 1, 0, 'Altarian', 'bought', 1, 0, 483, 121, 185, 0, 160, 1, 3),
(7, 1, 2, 1, 0, 'Haven', 'bought', 1, 0, 416, -218, 237, 0, 180, 1, 3),
(8, 2, 1, 1, 0, 'Omega', 'bought', 1, 0, 0, 0, 0, 0, 0, 0, 0),
(9, 2, 2, 1, 0, 'Primus', 'bought', 1, 0, 0, 0, 0, 0, 0, 0, 0),
(10, 3, 2, 1, 0, 'Omega', 'bought', 1, 0, 0, 0, 0, 0, 0, 0, 0),
(11, 3, 1, 1, 0, 'Vorchan', 'bought', 1, 0, 0, 0, 0, 0, 0, 0, 0),
(12, 1, 1, 0, 0, 'Flight', 'deployed', 2, 0, -368, -519, 35, 0, 217, 2, -1),
(18, 1, 2, 0, 0, 'Flight', 'deployed', 2, 0, 393, -601, 135, 0, 249, 2, -1),
(19, 1, 1, 0, 1, 'Salvo', 'deployed', 2, 0, -310, 127, 335, NULL, NULL, 2, -1);

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
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;
--
-- AUTO_INCREMENT für Tabelle `damages`
--
ALTER TABLE `damages`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT für Tabelle `deploys`
--
ALTER TABLE `deploys`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT für Tabelle `dogfights`
--
ALTER TABLE `dogfights`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `fireorders`
--
ALTER TABLE `fireorders`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT für Tabelle `games`
--
ALTER TABLE `games`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT für Tabelle `loads`
--
ALTER TABLE `loads`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT für Tabelle `missions`
--
ALTER TABLE `missions`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT für Tabelle `playerstatus`
--
ALTER TABLE `playerstatus`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT für Tabelle `powers`
--
ALTER TABLE `powers`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;
--
-- AUTO_INCREMENT für Tabelle `reinforcements`
--
ALTER TABLE `reinforcements`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT für Tabelle `sensors`
--
ALTER TABLE `sensors`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
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
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 24. Apr 2017 um 21:35
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
(1, 2, 1, 'deploy', 0, 654, -108, 180, 0, 0, 1, 1),
(2, 1, 1, 'deploy', 0, -657, -52, 0, 0, 0, 1, 1),
(3, 1, 1, 'move', 135, -522, -52, 0, 0, 0, 1, 1),
(4, 2, 1, 'move', 150, 504, -108, 0, 0, 0, 1, 1),
(5, 1, 2, 'move', 135, -387, -52, 0, 0, 0, 1, 1),
(6, 2, 2, 'move', 150, 354, -108, 0, 0, 0, 1, 1),
(7, 1, 3, 'turn', 0, -387, -52, -25, 123, 141, 1, 1),
(8, 1, 3, 'move', 135, -265, -109, 0, 0, 0, 1, 1),
(9, 2, 3, 'move', 150, 204, -108, 0, 0, 0, 1, 1),
(10, 2, 4, 'turn', 0, 204, -108, 25, 46, 99, 1, 1),
(11, 2, 4, 'move', 150, 68, -171, 0, 0, 0, 1, 1),
(12, 1, 4, 'move', 135, -143, -166, 0, 0, 0, 1, 1),
(13, 1, 5, 'speedChange', -1, -143, -166, 0, 97, 0, 1, 1),
(14, 1, 5, 'speedChange', -1, -143, -166, 0, 88, 0, 1, 1),
(15, 1, 5, 'move', 109, -44, -212, 0, 0, 0, 1, 1),
(16, 2, 5, 'speedChange', -1, 68, -171, 0, 46, 0, 1, 1),
(17, 2, 5, 'turn', 0, 68, -171, -25, 42, 90, 1, 1),
(18, 2, 5, 'move', 135, -67, -171, 0, 0, 0, 1, 1),
(19, 1, 6, 'turn', 0, -44, -212, 25, 100, 114, 1.6, 1),
(20, 1, 6, 'move', 72, 28, -212, 0, 0, 0, 1, 1),
(21, 1, 6, 'turn', 0, 28, -212, 25, 100, 114, 1, 1),
(22, 1, 6, 'move', 37, 62, -196, 0, 0, 0, 1, 1),
(23, 2, 6, 'turn', 0, -67, -171, 25, 42, 90, 1.2, 1),
(24, 2, 6, 'move', 75, -135, -203, 0, 0, 0, 1, 1),
(25, 2, 6, 'turn', 0, -135, -203, 25, 42, 90, 1.4, 1),
(26, 2, 6, 'move', 60, -174, -249, 0, 0, 0, 1, 1),
(27, 2, 7, 'move', 5, -177, -253, 0, 0, 0, 1, 1),
(28, 2, 7, 'turn', 0, -177, -253, 25, 42, 90, 1.6, 1),
(29, 2, 7, 'move', 57, -192, -308, 0, 0, 0, 1, 1),
(30, 2, 7, 'turn', 0, -192, -308, 25, 42, 90, 1, 1),
(31, 2, 7, 'move', 73, -179, -380, 0, 0, 0, 1, 1),
(32, 1, 7, 'move', 77, 132, -163, 0, 0, 0, 1, 1),
(33, 1, 7, 'turn', 0, 132, -163, 25, 100, 114, 2.4, 1),
(34, 1, 7, 'move', 32, 153, -138, 0, 0, 0, 1, 1);

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
  `mitigation` decimal(10,0) DEFAULT NULL,
  `negation` int(4) DEFAULT NULL,
  `destroyed` tinyint(1) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `new` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `damages`
--

INSERT INTO `damages` (`id`, `fireid`, `gameid`, `shipid`, `structureid`, `systemid`, `turn`, `roll`, `type`, `totalDmg`, `shieldDmg`, `structDmg`, `armourDmg`, `mitigation`, `negation`, `destroyed`, `notes`, `new`) VALUES
(1, 3, 1, 1, 1, -1, 1, 11, 'Laser', 120, 0, 28, 32, '0', 32, 0, '', 0),
(2, 3, 1, 1, 1, 6, 1, 11, 'Laser', 120, 0, 39, 21, '0', 21, 0, '', 0),
(3, 5, 1, 1, 1, -1, 2, 9, 'Particle', 30, 0, 2, 28, '0', 28, 0, '', 0),
(4, 6, 1, 2, 1, -1, 2, 31, 'Laser', 224, 0, 49, 25, '0', 25, 0, '', 0),
(5, 6, 1, 2, 1, -1, 2, 31, 'Laser', 224, 0, 51, 23, '0', 23, 0, '', 0),
(6, 6, 1, 2, 1, -1, 2, 31, 'Laser', 224, 0, 53, 21, '0', 21, 0, '', 0),
(7, 9, 1, 1, 1, -1, 3, 33, 'Laser', 117, 0, 32, 26, '0', 26, 0, '', 0),
(8, 9, 1, 1, 1, 4, 3, 33, 'Laser', 117, 0, 46, 12, '0', 12, 0, '', 0),
(9, 12, 1, 1, 1, 4, 3, 26, 'Laser', 146, 0, 61, 12, '0', 12, 0, '', 0),
(10, 12, 1, 1, 1, -1, 3, 26, 'Laser', 146, 0, 51, 22, '0', 22, 0, '', 0),
(11, 13, 1, 1, 1, -1, 3, 36, 'Laser', 100, 0, 29, 21, '0', 21, 0, '', 0),
(12, 13, 1, 1, 1, -1, 3, 36, 'Laser', 100, 0, 30, 20, '0', 20, 0, '', 0),
(13, 7, 1, 1, 1, -1, 3, 42, 'Particle', 37, 0, 19, 18, '0', 18, 0, '', 0),
(14, 7, 1, 1, 1, -1, 3, 34, 'Particle', 35, 0, 18, 17, '0', 17, 0, '', 0),
(15, 8, 1, 1, 1, -1, 3, 25, 'Particle', 30, 0, 14, 16, '0', 16, 0, '', 0),
(16, 8, 1, 1, 1, -1, 3, 24, 'Particle', 34, 0, 19, 15, '0', 15, 0, '', 0),
(17, 10, 1, 1, 1, 2, 3, 42, 'Particle', 30, 0, 20, 10, '0', 10, 0, '', 0),
(18, 10, 1, 1, 1, 22, 3, 38, 'Particle', 36, 0, 22, 14, '0', 14, 0, '', 0),
(19, 11, 1, 1, 1, 22, 3, 19, 'Particle', 31, 0, 18, 13, '0', 13, 0, '', 0),
(20, 18, 1, 2, 6, -1, 3, 33, 'Laser', 259, 0, 61, 25, '0', 25, 0, '', 0),
(21, 18, 1, 2, 6, 7, 3, 33, 'Laser', 259, 0, 69, 17, '0', 16, 1, '', 0),
(22, 18, 1, 2, 6, -1, 3, 33, 'Laser', 259, 0, 64, 22, '0', 22, 0, '', 0),
(23, 25, 1, 1, 1, -1, 4, 7, 'Particle', 33, 0, 21, 12, '0', 12, 0, '', 0),
(24, 25, 1, 1, 1, 4, 4, 35, 'Particle', 30, 0, 24, 6, '0', 6, 0, '', 0),
(25, 26, 1, 1, 1, -1, 4, 59, 'Particle', 30, 0, 19, 11, '0', 11, 0, '', 0),
(26, 27, 1, 1, 7, 9, 5, 48, 'Particle', 32, 0, 18, 14, '0', 14, 0, '', 0),
(27, 27, 1, 1, 7, -1, 5, 9, 'Particle', 38, 0, 11, 27, '0', 27, 0, '', 0),
(28, 30, 1, 2, 6, 19, 5, 68, 'Pulse', 24, 0, 4, 20, '0', 20, 0, '', 0),
(29, 30, 1, 2, 6, 19, 5, 68, 'Pulse', 24, 0, 5, 19, '0', 19, 0, '', 0),
(30, 30, 1, 2, 6, 19, 5, 68, 'Pulse', 20, 0, 3, 17, '0', 17, 0, '', 0),
(31, 33, 1, 1, 11, -1, 6, 77, 'Particle', 34, 0, 8, 26, '0', 26, 0, '', 0),
(32, 32, 1, 1, 11, -1, 6, 37, 'Particle', 30, 0, 6, 24, '0', 24, 0, '', 0),
(33, 34, 1, 2, 11, -1, 6, 7, 'Pulse', 18, 0, 0, 18, '0', 22, 0, '', 0),
(34, 34, 1, 2, 11, -1, 6, 7, 'Pulse', 22, 0, 1, 21, '0', 21, 0, '', 0),
(35, 34, 1, 2, 11, -1, 6, 7, 'Pulse', 18, 0, 0, 18, '0', 19, 0, '', 0),
(36, 39, 1, 1, 11, -1, 7, 42, 'Particle', 30, 0, 7, 23, '0', 23, 0, '', 0),
(37, 38, 1, 2, 6, -1, 7, 38, 'Laser', 251, 0, 67, 16, '0', 16, 0, '', 0),
(38, 38, 1, 2, 6, 9, 7, 38, 'Laser', 251, 0, 75, 8, '0', 8, 1, '', 0),
(39, 38, 1, 2, 6, -1, 7, 38, 'Laser', 251, 0, 68, 15, '0', 15, 0, '', 0);

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
-- Tabellenstruktur für Tabelle `fighters`
--

CREATE TABLE `fighters` (
  `id` int(4) NOT NULL,
  `unitid` int(4) DEFAULT NULL,
  `amount` int(2) DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `fireorders`
--

CREATE TABLE `fireorders` (
  `id` int(5) NOT NULL,
  `gameid` int(3) DEFAULT NULL,
  `turn` int(3) DEFAULT NULL,
  `shooterid` int(5) DEFAULT NULL,
  `targetid` int(5) DEFAULT NULL,
  `weaponid` int(5) DEFAULT NULL,
  `shots` int(3) DEFAULT NULL,
  `req` int(3) NOT NULL DEFAULT '0',
  `notes` varchar(255) NOT NULL DEFAULT '',
  `hits` int(3) NOT NULL DEFAULT '0',
  `resolved` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `fireorders`
--

INSERT INTO `fireorders` (`id`, `gameid`, `turn`, `shooterid`, `targetid`, `weaponid`, `shots`, `req`, `notes`, `hits`, `resolved`) VALUES
(1, 1, 1, 2, 1, 5, 1, 57, '68 ', 0, 1),
(2, 1, 1, 2, 1, 10, 1, 57, '83 ', 0, 1),
(3, 1, 1, 2, 1, 13, 1, 57, '11 ', 2, 1),
(4, 1, 2, 2, 1, 2, 2, 9, ' 23 34', 0, 1),
(5, 1, 2, 2, 1, 3, 2, 9, ' 45 9', 1, 1),
(6, 1, 2, 1, 2, 15, 1, 50, '31 ', 3, 1),
(7, 1, 3, 2, 1, 2, 2, 44, ' 42 34', 2, 1),
(8, 1, 3, 2, 1, 3, 2, 44, ' 25 24', 2, 1),
(9, 1, 3, 2, 1, 5, 1, 96, '33 ', 2, 1),
(10, 1, 3, 2, 1, 7, 2, 44, ' 42 38', 2, 1),
(11, 1, 3, 2, 1, 8, 2, 44, ' 85 19', 1, 1),
(12, 1, 3, 2, 1, 10, 1, 96, '26 ', 2, 1),
(13, 1, 3, 2, 1, 13, 1, 96, '36 ', 2, 1),
(14, 1, 3, 1, 2, 2, 2, 29, ' 92 44', 0, 1),
(15, 1, 3, 1, 2, 3, 3, 1, '6 ', 0, 1),
(16, 1, 3, 1, 2, 5, 3, 1, '36 ', 0, 1),
(17, 1, 3, 1, 2, 6, 2, 29, ' 86 91', 0, 1),
(18, 1, 3, 1, 2, 8, 1, 63, '33 ', 3, 1),
(19, 1, 3, 1, 2, 9, 1, 42, '90 ', 0, 1),
(20, 1, 3, 1, 2, 10, 1, 42, '98 ', 0, 1),
(21, 1, 4, 1, 2, 3, 3, 46, '51 ', 0, 1),
(22, 1, 4, 1, 2, 5, 3, 46, '60 ', 0, 1),
(23, 1, 4, 1, 2, 9, 3, 46, '71 ', 0, 1),
(24, 1, 4, 1, 2, 10, 3, 46, '47 ', 0, 1),
(25, 1, 4, 2, 1, 2, 2, 72, ' 7 35', 2, 1),
(26, 1, 4, 2, 1, 3, 2, 72, ' 93 59', 1, 1),
(27, 1, 5, 2, 1, 8, 2, 105, ' 48 9', 2, 1),
(28, 1, 5, 2, 1, 9, 3, 85, ' 59 80 22', 3, 1),
(29, 1, 5, 1, 2, 9, 3, 81, '83 ', 0, 1),
(30, 1, 5, 1, 2, 10, 3, 81, '68 ', 3, 1),
(31, 1, 6, 2, 1, 9, 3, 47, ' 98 66 64', 0, 1),
(32, 1, 6, 2, 1, 12, 2, 77, ' 37 85', 1, 1),
(33, 1, 6, 2, 1, 14, 2, 77, ' 80 77', 1, 1),
(34, 1, 6, 1, 2, 9, 3, 47, '7 ', 3, 1),
(35, 1, 6, 1, 2, 10, 3, 47, '48 ', 0, 1),
(36, 1, 7, 1, 2, 9, 3, 28, '58 ', 0, 1),
(37, 1, 7, 1, 2, 10, 3, 28, '98 ', 0, 1),
(38, 1, 7, 1, 2, 12, 1, 87, '38 ', 3, 1),
(39, 1, 7, 2, 1, 8, 2, 59, ' 42 66', 1, 1),
(40, 1, 7, 2, 1, 9, 3, 20, ' 89 83 85', 0, 1);

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
(1, 'myGame', 'active', 8, -1, 3500, 175);

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
(1, 1, 1, 8, -1, 'Earth Alliance', 3875, 'waiting'),
(2, 2, 1, 8, -1, 'Minbari Federation', 3725, 'waiting');

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
(1, 1, 3, 1, '-1', 0),
(2, 1, 5, 1, '-1', 0),
(3, 1, 9, 1, '-2', 0),
(4, 1, 10, 1, '-2', 0),
(5, 1, 12, 1, '0', 0),
(6, 1, 13, 1, '0', 0),
(7, 1, 15, 1, '1', 6),
(8, 1, 16, 1, '-1', 0),
(9, 1, 17, 1, '-1', 0),
(10, 1, 17, 1, '0', 0),
(11, 1, 3, 2, '-1', 0),
(12, 1, 5, 2, '-1', 0),
(13, 1, 9, 2, '-2', 0),
(14, 1, 9, 2, '0', 0),
(15, 1, 10, 2, '-1', 0),
(16, 1, 12, 2, '0', 0),
(17, 1, 13, 2, '0', 0),
(18, 1, 16, 2, '-1', 0),
(19, 1, 17, 2, '-1', 0),
(20, 1, 17, 2, '0', 0),
(21, 2, 4, 3, '0', 0),
(22, 2, 5, 3, '1', 3),
(23, 2, 9, 3, '0', 0),
(24, 2, 10, 3, '1', 3),
(25, 1, 3, 3, '-1', 0),
(26, 1, 5, 3, '-1', 0),
(27, 1, 8, 3, '1', 6),
(28, 1, 9, 3, '-2', 0),
(29, 1, 10, 3, '-2', 0),
(30, 1, 12, 3, '0', 0),
(31, 1, 13, 3, '0', 0),
(32, 1, 16, 3, '-2', 0),
(33, 1, 17, 3, '-2', 0),
(34, 1, 3, 4, '-1', 0),
(35, 1, 5, 4, '-1', 0),
(36, 1, 9, 4, '-1', 0),
(37, 1, 10, 4, '-1', 0),
(38, 1, 12, 4, '0', 0),
(39, 1, 13, 4, '0', 0),
(40, 1, 16, 4, '-1', 0),
(41, 1, 17, 4, '-1', 0),
(42, 2, 4, 4, '0', 0),
(43, 2, 9, 4, '0', 0),
(44, 2, 5, 5, '1', 3),
(45, 2, 10, 5, '1', 3),
(46, 2, 12, 5, '0', 0),
(47, 2, 13, 5, '1', 3),
(48, 2, 14, 5, '0', 0),
(49, 1, 3, 5, '-1', 0),
(50, 1, 4, 5, '0', 0),
(51, 1, 5, 5, '-1', 0),
(52, 1, 6, 5, '0', 0),
(53, 1, 9, 5, '-1', 0),
(54, 1, 10, 5, '-1', 0),
(55, 1, 15, 5, '1', 6),
(56, 1, 16, 5, '-1', 0),
(57, 1, 17, 5, '-1', 0),
(58, 2, 9, 6, '1', 2),
(59, 2, 9, 6, '1', 2),
(60, 2, 9, 6, '1', 2),
(61, 2, 10, 6, '1', 3),
(62, 2, 13, 6, '0', 0),
(63, 1, 3, 6, '-2', 0),
(64, 1, 4, 6, '0', 0),
(65, 1, 5, 6, '-2', 0),
(66, 1, 6, 6, '0', 0),
(67, 1, 9, 6, '-1', 0),
(68, 1, 10, 6, '-1', 0),
(69, 1, 16, 6, '-1', 0),
(70, 1, 17, 6, '-1', 0),
(71, 1, 17, 6, '0', 0),
(72, 1, 20, 6, '1', 10),
(73, 2, 9, 7, '1', 2),
(74, 2, 9, 7, '1', 2),
(75, 2, 9, 7, '1', 2),
(76, 2, 10, 7, '1', 3),
(77, 2, 13, 7, '0', 0),
(78, 1, 2, 7, '0', 0),
(79, 1, 3, 7, '-1', 0),
(80, 1, 4, 7, '0', 0),
(81, 1, 5, 7, '-1', 0),
(82, 1, 6, 7, '0', 0),
(83, 1, 9, 7, '-1', 0),
(84, 1, 10, 7, '-1', 0),
(85, 1, 12, 7, '1', 6),
(86, 1, 13, 7, '1', 6),
(87, 1, 16, 7, '-1', 0),
(88, 1, 17, 7, '-1', 0),
(89, 1, 17, 7, '0', 0);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `reinforcements`
--

CREATE TABLE `reinforcements` (
  `id` int(3) NOT NULL,
  `gameid` int(3) DEFAULT NULL,
  `userid` int(5) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `arrival` int(3) DEFAULT NULL,
  `cost` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `reinforcements`
--

INSERT INTO `reinforcements` (`id`, `gameid`, `userid`, `name`, `arrival`, `cost`) VALUES
(1, 1, 1, 'Hyperion', 4, 850),
(2, 1, 2, 'Tinashi', 3, 1000),
(3, 1, 2, 'WhiteStar', 3, 600),
(4, 1, 2, 'Tinashi', 4, 1000),
(5, 1, 1, 'Hyperion', 3, 850),
(6, 1, 2, 'Tinashi', 4, 1000),
(7, 1, 2, 'WhiteStar', 4, 600),
(8, 1, 2, 'Sharlin', 2, 2000),
(9, 1, 1, 'Omega', 2, 1200);

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
  `duration` int(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `systemcrits`
--

INSERT INTO `systemcrits` (`id`, `shipid`, `systemid`, `turn`, `type`, `duration`) VALUES
(1, 1, 6, 1, 'disabled', 1),
(2, 1, 2, 3, 'range2', 0),
(3, 1, 4, 3, 'launch3', 0),
(4, 1, 22, 3, 'output_0.85', 0),
(5, 1, 4, 4, 'launch1', 0),
(6, 1, 9, 5, 'damage1', 0),
(7, 2, 19, 5, 'output_0.85', 0);

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
  `destroyed` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `units`
--

INSERT INTO `units` (`id`, `gameid`, `userid`, `ship`, `ball`, `name`, `status`, `available`, `destroyed`) VALUES
(1, 1, 1, 1, 0, 'Hyperion', 'bought', 1, 0),
(2, 1, 2, 1, 0, 'Tinashi', 'bought', 1, 0);

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
(1, 'Chris', '147147', 1),
(2, '1', '147147', 1),
(3, 'cdfdf', '147147', 0);

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
-- Indizes für die Tabelle `dogfights`
--
ALTER TABLE `dogfights`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `fighters`
--
ALTER TABLE `fighters`
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
-- AUTO_INCREMENT für Tabelle `damages`
--
ALTER TABLE `damages`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;
--
-- AUTO_INCREMENT für Tabelle `dogfights`
--
ALTER TABLE `dogfights`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `fighters`
--
ALTER TABLE `fighters`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `fireorders`
--
ALTER TABLE `fireorders`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;
--
-- AUTO_INCREMENT für Tabelle `games`
--
ALTER TABLE `games`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT für Tabelle `loads`
--
ALTER TABLE `loads`
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
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;
--
-- AUTO_INCREMENT für Tabelle `reinforcements`
--
ALTER TABLE `reinforcements`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT für Tabelle `systemcrits`
--
ALTER TABLE `systemcrits`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT für Tabelle `units`
--
ALTER TABLE `units`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 23. Jun 2017 um 15:24
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
(2, 1, 1, 'deploy', 0, -649, -127, 25, 0, 0, 1, 1),
(3, 2, 1, 'deploy', 0, -666, 143, 0, 0, 0, 1, 1),
(4, 3, 1, 'deploy', 0, 648, -46, 180, 0, 0, 1, 1),
(5, 3, 1, 'move', 150, 498, -46, 0, 0, 0, 1, 1),
(6, 1, 1, 'turn', 0, -649, -127, -25, 311, 195, 1, 1),
(7, 1, 1, 'move', 125, -524, -127, 0, 0, 0, 1, 1),
(8, 2, 1, 'move', 165, -501, 143, 0, 0, 0, 1, 1),
(9, 4, 2, 'deploy', 0, -462, -97, 25, 0, 0, 1, 1),
(10, 5, 2, 'deploy', 0, 169, 611, 255, 0, 0, 1, 1),
(11, 6, 2, 'launch', 0, 472, -38, 0, 0, 0, 0, 1),
(12, 1, 2, 'move', 125, -399, -127, 0, 0, 0, 1, 1),
(13, 2, 2, 'turn', 0, -501, 143, -25, 7, 50, 1, 1),
(14, 2, 2, 'move', 165, -351, 73, 0, 0, 0, 1, 1),
(15, 3, 2, 'move', 150, 348, -46, 0, 0, 0, 1, 1),
(16, 4, 2, 'move', 126, -348, -44, 0, 0, 0, 1, 1),
(17, 6, 2, 'move', 142, 331, -19, 0, 0, 0, 0, 1),
(18, 3, 3, 'move', 150, 198, -46, 0, 0, 0, 1, 1),
(19, 1, 3, 'move', 125, -274, -127, 0, 0, 0, 1, 1),
(20, 1, 3, 'turn', 0, -274, -127, 25, 311, 195, 1.6, 1),
(21, 2, 3, 'turn', 0, -351, 73, 25, 7, 50, 1, 1),
(22, 2, 3, 'move', 165, -186, 73, 0, 0, 0, 1, 1),
(23, 4, 3, 'turn', 0, -348, -44, -20, 14, 19, 1, 1),
(24, 4, 3, 'move', 210, -139, -26, 0, 0, 0, 1, 1),
(25, 6, 3, 'move', 213, 121, 18, 0, 0, 0, 0, 1),
(26, 9, 4, 'launch', 0, 181, -48, 0, 0, 0, 0, 1),
(27, 1, 4, 'move', 125, -161, -74, 0, 0, 0, 1, 1),
(28, 2, 4, 'move', 137, -60, 128, 0, 0, 0, 1, 1),
(29, 2, 4, 'turn', 0, -60, 128, -25, 7, 50, 1.8, 1),
(30, 2, 4, 'move', 28, -35, 116, 0, 0, 0, 1, 1),
(31, 2, 4, 'turn', 0, -35, 116, -25, 7, 50, 2, 1),
(32, 3, 4, 'move', 148, 63, -109, 0, 0, 0, 1, 1),
(33, 3, 4, 'turn', 0, 63, -109, -25, 27, 82, 3.4, 1),
(34, 3, 4, 'move', 2, 61, -108, 0, 0, 0, 1, 1),
(35, 4, 4, 'move', 151, 12, -37, 0, 0, 0, 1, 1),
(36, 4, 4, 'turn', 0, 12, -37, 20, 14, 19, 1, 1),
(37, 4, 4, 'move', 59, 65, -12, 0, 0, 0, 1, 1),
(38, 6, 4, 'impact', 185, -38, 114, 0, 0, 0, 0, 1),
(39, 9, 4, 'move', 142, 68, 38, 0, 0, 0, 0, 1),
(40, 10, 5, 'deploy', 0, -137, -74, 0, 0, 0, 1, 1),
(41, 5, 5, 'jump', 15, 183, 613, -6, 0, 0, 0, 1),
(42, 3, 5, 'move', 92, -31, -105, 0, 0, 0, 1, 1),
(43, 3, 5, 'turn', 0, -31, -105, -25, 27, 82, 1.6, 1),
(44, 3, 5, 'move', 52, -64, -65, 0, 0, 0, 1, 1),
(45, 3, 5, 'turn', 0, -64, -65, -25, 27, 82, 1.8, 1),
(46, 3, 5, 'move', 6, -66, -59, 0, 0, 0, 1, 1),
(47, 5, 5, 'jump', 15, 183, 613, -6, 0, 0, 0, 1),
(48, 5, 5, 'move', 180, 118, 445, 0, 0, 0, 1, 1),
(49, 1, 5, 'turn', 0, -161, -74, 25, 311, 195, 1.6, 1),
(50, 1, 5, 'move', 125, -81, 21, 0, 0, 0, 1, 1),
(51, 2, 5, 'move', 25, -19, 97, 0, 0, 0, 1, 1),
(52, 2, 5, 'turn', 0, -19, 97, -25, 7, 50, 1, 1),
(53, 2, 5, 'move', 50, -6, 49, 0, 0, 0, 1, 1),
(54, 2, 5, 'turn', 0, -6, 49, -25, 7, 50, 1, 1),
(55, 2, 5, 'move', 50, -15, 0, 0, 0, 0, 1, 1),
(56, 2, 5, 'turn', 0, -15, 0, -25, 7, 50, 1, 1),
(57, 2, 5, 'move', 40, -38, -33, 0, 0, 0, 1, 1),
(58, 4, 5, 'turn', 0, 65, -12, 20, 14, 19, 1, 1),
(59, 4, 5, 'move', 131, 182, 48, 0, 0, 0, 1, 1),
(60, 4, 5, 'turn', 0, 182, 48, 40, 28, 38, 1, 1),
(61, 4, 5, 'move', 79, 189, 127, 0, 0, 0, 1, 1),
(62, 10, 5, 'turn', 0, -137, -74, -40, 28, 38, 1, 1),
(63, 10, 5, 'move', 126, -40, -155, 0, 0, 0, 1, 1);

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
(1, 11, 1, 3, 1, 4, 3, 29, 'Laser', 78, 0, 13, 13, '0', 13, 0, '', 0),
(2, 11, 1, 3, 1, -1, 3, 29, 'Laser', 78, 0, 5, 21, '0', 21, 0, '', 0),
(3, 11, 1, 3, 1, -1, 3, 29, 'Laser', 78, 0, 5, 21, '0', 21, 0, '', 0),
(4, 13, 1, 3, 1, -1, 3, 13, 'Laser', 31, 0, 11, 20, '0', 20, 0, '', 0),
(5, 44, 1, 1, 20, -1, 4, 73, 'Plasma', 26, 0, 0, 39, '0', 32, 0, '', 0),
(6, 42, 1, 1, 20, -1, 4, 45, 'Plasma', 27, 0, 0, 41, '0', 31, 0, '', 0),
(7, 43, 1, 1, 20, -1, 4, 34, 'Particle', 17, 0, 0, 9, '0', 31, 0, '', 0),
(8, 43, 1, 1, 20, 25, 4, 58, 'Particle', 22, 0, 10, 12, '0', 12, 0, '', 0),
(9, 43, 1, 1, 20, -1, 4, 9, 'Particle', 18, 0, 0, 9, '0', 30, 0, '', 0),
(10, 43, 1, 1, 20, -1, 4, 53, 'Particle', 17, 0, 0, 9, '0', 30, 0, '', 0),
(11, 20, 1, 3, 1, 3, 4, 42, 'Laser', 41, 0, 0, 7, '0', 15, 0, '', 0),
(12, 20, 1, 3, 1, 3, 4, 42, 'Laser', 41, 0, 0, 7, '0', 15, 0, '', 0),
(13, 20, 1, 3, 1, -1, 4, 42, 'Laser', 41, 0, 0, 7, '0', 19, 0, '', 0),
(14, 21, 1, 3, 1, -1, 4, 14, 'Laser', 17, 0, 0, 9, '0', 18, 0, '', 0),
(15, 22, 1, 3, 1, -1, 4, 31, 'Laser', 18, 0, 0, 9, '0', 18, 0, '', 0),
(16, 24, 1, 3, 1, 3, 4, 15, 'Laser', 19, 0, 5, 14, '0', 14, 0, '', 0),
(17, 25, 1, 3, 1, -1, 4, 44, 'Laser', 18, 0, 1, 17, '0', 17, 0, '', 0),
(18, 26, 1, 3, 1, -1, 4, 10, 'Laser', 17, 0, 1, 16, '0', 16, 0, '', 0),
(19, 27, 1, 3, 1, 3, 4, 19, 'Laser', 91, 0, 17, 13, '0', 13, 0, '', 0),
(20, 27, 1, 3, 1, 2, 4, 19, 'Laser', 91, 0, 21, 9, '0', 9, 0, '', 0),
(21, 27, 1, 3, 1, -1, 4, 19, 'Laser', 91, 0, 15, 15, '0', 15, 0, '', 0),
(22, 28, 1, 3, 1, -1, 4, 5, 'Laser', 111, 0, 22, 15, '0', 15, 0, '', 0),
(23, 28, 1, 3, 1, 2, 4, 5, 'Laser', 111, 0, 29, 8, '0', 8, 1, '', 0),
(24, 28, 1, 3, 1, -1, 4, 5, 'Laser', 111, 0, 23, 14, '0', 14, 0, '', 0),
(25, 46, 1, 2, 1, 2, 4, 92, 'explosive', 41, 0, 31, 10, '0', 10, 0, '', 0),
(26, 46, 1, 2, 1, 2, 4, 89, 'explosive', 44, 0, 34, 10, '0', 10, 1, '', 0),
(27, 46, 1, 2, 1, 11, 4, 97, 'explosive', 38, 0, 23, 15, '0', 15, 0, '', 0),
(28, 46, 1, 2, 1, -1, 4, 67, 'explosive', 35, 0, 21, 14, '0', 14, 0, '', 0);

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

--
-- Daten für Tabelle `fighters`
--

INSERT INTO `fighters` (`id`, `unitid`, `amount`, `name`) VALUES
(1, 4, 11, 'Aurora'),
(2, 10, 11, 'Aurora');

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
  `shots` int(3) DEFAULT '0',
  `req` int(3) NOT NULL DEFAULT '0',
  `notes` varchar(255) NOT NULL DEFAULT '',
  `hits` int(3) NOT NULL DEFAULT '0',
  `resolved` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `fireorders`
--

INSERT INTO `fireorders` (`id`, `gameid`, `turn`, `shooterid`, `targetid`, `weaponid`, `shots`, `req`, `notes`, `hits`, `resolved`) VALUES
(1, 1, 2, 1, 0, 4, 0, 0, '', 0, 1),
(2, 1, 2, 3, 2, 3, 4, 0, '', 0, 1),
(3, 1, 2, 1, 3, 5, 1, -6, '49 ', 0, 1),
(4, 1, 2, 1, 3, 6, 1, 22, '32 ', 0, 1),
(5, 1, 2, 1, 3, 8, 1, -15, '76 ', 0, 1),
(6, 1, 2, 1, 3, 9, 1, -15, '68 ', 0, 1),
(7, 1, 2, 1, 3, 10, 1, -15, '82 ', 0, 1),
(8, 1, 2, 1, 3, 11, 1, -15, '7 ', 0, 1),
(9, 1, 2, 1, 3, 12, 1, -15, '52 ', 0, 1),
(10, 1, 2, 1, 3, 13, 1, -15, '9 ', 0, 1),
(11, 1, 3, 1, 3, 2, 1, 40, '29 ', 3, 1),
(12, 1, 3, 1, 3, 3, 1, 16, '54 ', 0, 1),
(13, 1, 3, 1, 3, 21, 1, 16, '13 ', 1, 1),
(14, 1, 3, 1, 3, 22, 1, 16, '71 ', 0, 1),
(15, 1, 3, 1, 3, 23, 1, 16, '92 ', 0, 1),
(16, 1, 3, 1, 3, 24, 1, 16, '45 ', 0, 1),
(17, 1, 3, 1, 3, 25, 1, 16, '58 ', 0, 1),
(18, 1, 3, 1, 3, 26, 1, 16, '50 ', 0, 1),
(19, 1, 4, 3, 2, 3, 4, 0, '', 0, 1),
(20, 1, 4, 1, 3, 2, 1, 56, '42 ', 3, 1),
(21, 1, 4, 1, 3, 21, 1, 45, '14 ', 1, 1),
(22, 1, 4, 1, 3, 22, 1, 45, '31 ', 1, 1),
(23, 1, 4, 1, 3, 23, 1, 45, '51 ', 0, 1),
(24, 1, 4, 1, 3, 24, 1, 45, '15 ', 1, 1),
(25, 1, 4, 1, 3, 25, 1, 45, '44 ', 1, 1),
(26, 1, 4, 1, 3, 26, 1, 45, '10 ', 1, 1),
(27, 1, 4, 2, 3, 2, 1, 43, '19 ', 3, 1),
(28, 1, 4, 2, 3, 3, 1, 43, '5 ', 3, 1),
(29, 1, 4, 2, 6, 5, 1, 32, '70 ', 0, 1),
(30, 1, 4, 2, 3, 7, 1, 29, '96 ', 0, 1),
(31, 1, 4, 4, 6, 2, 1, -6, ' 92', 0, 1),
(32, 1, 4, 4, 6, 4, 1, -6, ' 46', 0, 1),
(33, 1, 4, 4, 6, 6, 1, -6, ' 96', 0, 1),
(34, 1, 4, 4, 6, 8, 1, -6, ' 62', 0, 1),
(35, 1, 4, 4, 6, 10, 1, -6, ' 39', 0, 1),
(36, 1, 4, 4, 6, 12, 1, -6, ' 1', 0, 1),
(37, 1, 4, 4, 6, 14, 1, -6, ' 11', 0, 1),
(38, 1, 4, 4, 6, 16, 1, -6, ' 26', 0, 1),
(39, 1, 4, 4, 6, 18, 1, -6, ' 99', 0, 1),
(40, 1, 4, 4, 6, 20, 1, -6, ' 86', 0, 1),
(41, 1, 4, 4, 6, 22, 1, -6, ' 33', 0, 1),
(42, 1, 4, 3, 1, 6, 1, 153, ' 45', 1, 1),
(43, 1, 4, 3, 1, 7, 4, 130, ' 34 58 9 53', 4, 1),
(44, 1, 4, 3, 1, 9, 1, 153, ' 73', 1, 1),
(45, 1, 4, 3, 4, 10, 4, 26, ' 71 66 85 93', 0, 1),
(46, 1, 4, 6, 2, 0, 4, 100, ' 92 89 97 67', 4, 1),
(47, 1, 5, 1, 0, 4, 0, 0, '', 0, 1),
(48, 1, 5, 1, 3, 21, 0, 0, '', 0, 0),
(49, 1, 5, 1, 3, 22, 0, 0, '', 0, 0),
(50, 1, 5, 1, 3, 23, 0, 0, '', 0, 0),
(51, 1, 5, 1, 3, 24, 0, 0, '', 0, 0),
(52, 1, 5, 1, 3, 25, 0, 0, '', 0, 0),
(53, 1, 5, 1, 3, 26, 0, 0, '', 0, 0),
(54, 1, 5, 2, 3, 3, 0, 0, '', 0, 0),
(55, 1, 5, 2, 3, 7, 0, 0, '', 0, 0);

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
(1, 'myGame', 'active', 5, 2, 3500, 175),
(2, 'myGame', 'active', 1, -1, 3500, 175);

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
(2, 3, 3, 'Javelin', 16);

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
(1, 1, 1, 5, 2, 'Earth Alliance', 1952, 'ready'),
(2, 2, 1, 5, 2, 'Centauri Republic', 3300, 'waiting'),
(3, 1, 2, 1, -1, 'Earth Alliance', 2650, 'waiting'),
(4, 2, 2, 1, -1, 'Minbari Federation', 2500, 'waiting');

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
(1, 1, 2, 1, '-1', 0),
(2, 1, 6, 1, '-1', 0),
(3, 1, 8, 1, '-1', 0),
(4, 1, 9, 1, '-1', 0),
(5, 1, 10, 1, '-1', 0),
(6, 1, 11, 1, '-1', 0),
(7, 1, 12, 1, '-1', 0),
(8, 1, 13, 1, '-1', 0),
(9, 1, 21, 1, '-1', 0),
(10, 1, 22, 1, '-1', 0),
(11, 1, 23, 1, '-1', 0),
(12, 1, 24, 1, '-1', 0),
(13, 1, 25, 1, '-1', 0),
(14, 1, 26, 1, '-1', 0),
(15, 2, 5, 1, '-1', 0),
(16, 2, 7, 1, '-1', 0),
(17, 1, 2, 2, '-1', 0),
(18, 1, 6, 2, '-1', 0),
(19, 1, 8, 2, '-2', 0),
(20, 1, 9, 2, '-2', 0),
(21, 1, 10, 2, '-2', 0),
(22, 1, 11, 2, '-2', 0),
(23, 1, 12, 2, '-2', 0),
(24, 1, 13, 2, '-2', 0),
(25, 1, 21, 2, '-2', 0),
(26, 1, 22, 2, '-2', 0),
(27, 1, 23, 2, '-2', 0),
(28, 1, 24, 2, '-2', 0),
(29, 1, 25, 2, '-2', 0),
(30, 1, 26, 2, '-2', 0),
(31, 2, 5, 2, '-1', 0),
(32, 2, 7, 2, '-1', 0),
(33, 3, 2, 2, '0', 0),
(34, 3, 3, 2, '1', 0),
(35, 3, 3, 2, '1', 0),
(36, 3, 3, 2, '1', 0),
(37, 3, 4, 2, '0', 0),
(38, 3, 15, 2, '1', 10),
(39, 1, 2, 3, '-1', 0),
(40, 1, 6, 3, '-1', 0),
(41, 1, 8, 3, '-2', 0),
(42, 1, 9, 3, '-2', 0),
(43, 1, 10, 3, '-2', 0),
(44, 1, 11, 3, '-2', 0),
(45, 1, 12, 3, '-2', 0),
(46, 1, 13, 3, '-2', 0),
(47, 1, 21, 3, '-2', 0),
(48, 1, 22, 3, '-2', 0),
(49, 1, 23, 3, '-2', 0),
(50, 1, 24, 3, '-2', 0),
(51, 1, 25, 3, '-2', 0),
(52, 1, 26, 3, '-2', 0),
(53, 2, 5, 3, '-1', 0),
(54, 2, 7, 3, '-1', 0),
(55, 3, 2, 3, '0', 0),
(56, 3, 4, 3, '0', 0),
(57, 3, 3, 4, '1', 0),
(58, 3, 3, 4, '1', 0),
(59, 3, 3, 4, '1', 0),
(60, 1, 2, 4, '-1', 0),
(61, 1, 6, 4, '-1', 0),
(62, 1, 8, 4, '-2', 0),
(63, 1, 9, 4, '-2', 0),
(64, 1, 10, 4, '-2', 0),
(65, 1, 11, 4, '-2', 0),
(66, 1, 12, 4, '-2', 0),
(67, 1, 13, 4, '-2', 0),
(68, 1, 15, 4, '0', 0),
(69, 1, 16, 4, '0', 0),
(70, 1, 18, 4, '0', 0),
(71, 1, 19, 4, '0', 0),
(72, 1, 21, 4, '-2', 0),
(73, 1, 22, 4, '-2', 0),
(74, 1, 23, 4, '-2', 0),
(75, 1, 24, 4, '-2', 0),
(76, 1, 25, 4, '-2', 0),
(77, 1, 26, 4, '-2', 0),
(78, 2, 5, 4, '-1', 0),
(79, 2, 7, 4, '-1', 0),
(80, 1, 2, 5, '-1', 0),
(81, 1, 6, 5, '-1', 0),
(82, 1, 8, 5, '-1', 0),
(83, 1, 9, 5, '-1', 0),
(84, 1, 10, 5, '-1', 0),
(85, 1, 11, 5, '-1', 0),
(86, 1, 12, 5, '-1', 0),
(87, 1, 13, 5, '-1', 0),
(88, 1, 15, 5, '0', 0),
(89, 1, 16, 5, '0', 0),
(90, 1, 17, 5, '0', 0),
(91, 1, 18, 5, '0', 0),
(92, 1, 19, 5, '0', 0),
(93, 1, 21, 5, '-1', 0),
(94, 1, 22, 5, '-1', 0),
(95, 1, 23, 5, '-1', 0),
(96, 1, 24, 5, '-1', 0),
(97, 1, 25, 5, '-1', 0),
(98, 1, 26, 5, '-1', 0),
(99, 1, 31, 5, '1', 10),
(100, 2, 5, 5, '-1', 0),
(101, 2, 7, 5, '-1', 0);

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
(1, 1, 2, 'Haven', 3, 310),
(2, 1, 1, 'Saggitarius', 2, 400),
(3, 1, 1, 'Saggitarius', 2, 400),
(4, 1, 2, 'Vorchan', 4, 360);

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
(1, 1, 31, 1, 357, 793, 0),
(2, 2, 12, 1, -1, 99, 0),
(3, 1, 31, 1, 357, 925, 0),
(4, 2, 12, 1, -1, 99, 0),
(5, 3, 15, 1, 358, 724, 1),
(6, 1, 31, 2, 2, 925, 0),
(7, 2, 12, 2, -1, 99, 0),
(8, 3, 15, 2, 4, 825, 1),
(9, -1, 13, 2, 359, 375, 0),
(10, 1, 31, 3, -1, 214, 0),
(11, 2, 12, 3, -1, 99, 0),
(12, 3, 15, 3, -1, 174, 0),
(13, 3, 15, 4, 359, 299, 0),
(14, 1, 31, 4, -1, 214, 0),
(15, 2, 12, 4, -1, 99, 0),
(16, 1, 31, 5, -1, 236, 0),
(17, 2, 12, 5, -1, 99, 0),
(18, 3, 15, 5, -1, 174, 0),
(19, 5, 13, 5, -1, 87, 0);

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
  `value` decimal(2,1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `systemcrits`
--

INSERT INTO `systemcrits` (`id`, `shipid`, `systemid`, `turn`, `type`, `duration`, `value`) VALUES
(1, 3, 4, 3, 'Damage', 0, '0.2'),
(2, 3, 4, 3, 'Accuracy', 0, '0.2'),
(3, 2, 11, 4, 'Output', 1, '0.2');

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
(1, 1, 1, 1, 0, 'Omega', 'bought', 1, 0),
(2, 1, 1, 1, 0, 'Tethys', 'bought', 1, 0),
(3, 1, 2, 1, 0, 'Demos', 'bought', 1, 0),
(4, 1, 1, 0, 0, 'Flight', 'deployed', 2, 0),
(5, 1, 2, 1, 0, 'Haven', 'bought', 5, 0),
(6, 1, 2, 2, 1, 'Javelin', 'impact', 4, 1),
(7, 2, 1, 1, 0, 'Hyperion', 'bought', 1, 0),
(8, 2, 2, 1, 0, 'Tinashi', 'bought', 1, 0),
(9, 1, 2, 2, 1, 'Javelin', 'launched', 4, 0),
(10, 1, 1, 0, 0, 'Flight', 'deployed', 5, 0);

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
-- Indizes für die Tabelle `sensors`
--
ALTER TABLE `sensors`
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
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
--
-- AUTO_INCREMENT für Tabelle `dogfights`
--
ALTER TABLE `dogfights`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `fighters`
--
ALTER TABLE `fighters`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT für Tabelle `fireorders`
--
ALTER TABLE `fireorders`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;
--
-- AUTO_INCREMENT für Tabelle `games`
--
ALTER TABLE `games`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT für Tabelle `loads`
--
ALTER TABLE `loads`
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
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=102;
--
-- AUTO_INCREMENT für Tabelle `reinforcements`
--
ALTER TABLE `reinforcements`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT für Tabelle `sensors`
--
ALTER TABLE `sensors`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT für Tabelle `systemcrits`
--
ALTER TABLE `systemcrits`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT für Tabelle `units`
--
ALTER TABLE `units`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

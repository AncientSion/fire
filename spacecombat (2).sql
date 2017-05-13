-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 12. Mai 2017 um 16:21
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
(1, 4, 1, 'deploy', 0, 634, 291, 180, 0, 0, 1, 1),
(2, 5, 1, 'deploy', 0, 617, -122, 180, 0, 0, 1, 1),
(3, 6, 1, 'deploy', 0, 654, -41, 180, 0, 0, 1, 1),
(4, 7, 1, 'deploy', 0, 646, 441, 180, 0, 0, 1, 1),
(5, 1, 1, 'deploy', 0, -709, 134, 0, 0, 0, 1, 1),
(6, 2, 1, 'deploy', 0, -659, -41, 0, 0, 0, 1, 1),
(7, 3, 1, 'deploy', 0, -642, 299, 0, 0, 0, 1, 1),
(8, 1, 1, 'move', 135, -584, 84, 0, 0, 0, 1, 1),
(9, 2, 1, 'move', 135, -524, -41, 0, 0, 0, 1, 1),
(10, 3, 1, 'move', 150, -501, 249, 0, 0, 0, 1, 1),
(11, 4, 1, 'move', 150, 484, 291, 0, 0, 0, 1, 1),
(12, 5, 1, 'move', 165, 452, -122, 0, 0, 0, 1, 1),
(13, 6, 1, 'move', 165, 489, -41, 0, 0, 0, 1, 1),
(14, 7, 1, 'move', 135, 511, 441, 0, 0, 0, 1, 1),
(15, 8, 2, 'deploy', 0, 454, 403, -147, 0, 0, 1, 1),
(16, 9, 2, 'deploy', 0, 451, 483, 145, 0, 0, 1, 1),
(17, 10, 2, 'deploy', 0, -524, 103, 17, 0, 0, 1, 1),
(18, 11, 2, 'deploy', 0, -466, -44, -3, 0, 0, 1, 1),
(19, 12, 2, 'launch', 0, -493, 244, 0, 0, 0, 0, 1),
(20, 13, 2, 'launch', 0, 474, 289, 0, 0, 0, 0, 1),
(21, 1, 2, 'turn', 0, -584, 84, 25, 123, 141, 1.8, 1),
(22, 1, 2, 'move', 135, -462, 141, 0, 0, 0, 1, 1),
(23, 3, 2, 'move', 150, -363, 189, 0, 0, 0, 1, 1),
(24, 2, 2, 'turn', 0, -524, -41, 25, 123, 141, 1.8, 1),
(25, 2, 2, 'move', 135, -402, 16, 0, 0, 0, 1, 1),
(26, 4, 2, 'move', 150, 334, 291, 0, 0, 0, 1, 1),
(27, 5, 2, 'move', 165, 287, -122, 0, 0, 0, 1, 1),
(28, 7, 2, 'move', 135, 386, 388, 0, 0, 0, 1, 1),
(29, 6, 2, 'move', 165, 324, -41, 0, 0, 0, 1, 1),
(30, 8, 2, 'move', 140, 337, 327, 0, 0, 0, 1, 1),
(31, 9, 2, 'turn', 0, 451, 483, 60, 33, 48, 1, 1),
(32, 9, 2, 'move', 140, 324, 424, 0, 0, 0, 1, 1),
(33, 10, 2, 'turn', 0, -524, 103, -40, 28, 38, 1, 1),
(34, 10, 2, 'move', 140, -395, 48, 0, 0, 0, 1, 1),
(35, 11, 2, 'turn', 0, -466, -44, -20, 14, 19, 1, 1),
(36, 11, 2, 'move', 140, -337, -99, 0, 0, 0, 1, 1),
(37, 13, 2, 'move', 0, 333, 272, 0, 0, 0, 0, 1),
(38, 12, 2, 'move', 0, -388, 261, 0, 0, 0, 0, 1),
(39, 14, 3, 'launch', 0, 279, -117, 0, 0, 0, 0, 1),
(40, 15, 3, 'launch', 0, 316, -39, 0, 0, 0, 0, 1),
(41, 1, 3, 'turn', 0, -462, 141, -25, 123, 141, 1, 1),
(42, 1, 3, 'move', 135, -327, 141, 0, 0, 0, 1, 1),
(43, 3, 3, 'move', 150, -213, 189, 0, 0, 0, 1, 1),
(44, 2, 3, 'turn', 0, -402, 16, -25, 123, 141, 1, 1),
(45, 2, 3, 'move', 135, -267, 16, 0, 0, 0, 1, 1),
(46, 4, 3, 'move', 150, 184, 291, 0, 0, 0, 1, 1),
(47, 5, 3, 'turn', 0, 287, -122, 25, 6, 49, 1, 1),
(48, 5, 3, 'move', 165, 137, -192, 0, 0, 0, 1, 1),
(49, 5, 3, 'turn', 0, 137, -192, -25, 6, 49, 1, 1),
(50, 7, 3, 'move', 135, 251, 388, 0, 0, 0, 1, 1),
(51, 6, 3, 'turn', 0, 324, -41, 25, 6, 49, 1, 1),
(52, 6, 3, 'move', 165, 174, -111, 0, 0, 0, 1, 1),
(53, 6, 3, 'turn', 0, 174, -111, -25, 6, 49, 1, 1),
(54, 8, 3, 'speedChange', 1, 337, 327, 0, 18, 0, 1, 1),
(55, 8, 3, 'speedChange', 1, 337, 327, 0, 20, 0, 1, 1),
(56, 8, 3, 'turn', 0, 337, 327, -40, 26, 40, 1, 1),
(57, 8, 3, 'move', 252, 87, 358, 0, 0, 0, 1, 1),
(58, 9, 3, 'speedChange', 1, 324, 424, 0, 18, 0, 1, 1),
(59, 9, 3, 'speedChange', 1, 324, 424, 0, 20, 0, 1, 1),
(60, 9, 3, 'turn', 0, 324, 424, -20, 13, 20, 1, 1),
(61, 9, 3, 'move', 252, 73, 402, 0, 0, 0, 1, 1),
(62, 10, 3, 'turn', 0, -395, 48, -60, 42, 57, 1, 1),
(63, 10, 3, 'move', 210, -369, -160, 0, 0, 0, 1, 1),
(64, 10, 3, 'turn', 0, -369, -160, 20, 14, 19, 1, 1),
(65, 11, 3, 'speedChange', -1, -337, -99, 0, 22, 0, 1, 1),
(66, 11, 3, 'turn', 0, -337, -99, -40, 24, 36, 1, 1),
(67, 11, 3, 'move', 189, -251, -267, 0, 0, 0, 1, 1),
(68, 11, 3, 'turn', 0, -251, -267, 40, 24, 36, 1, 1);

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
(1, 1, 1, 2, 1, 5, 1, 46, 'Particle', 57, 0, 42, 15, '0', 15, 0, '', 0),
(2, 3, 1, 2, 1, -1, 1, 21, 'Particle', 78, 0, 49, 29, '0', 29, 0, '', 0),
(3, 5, 1, 7, 1, 3, 1, 29, 'Laser', 174, 0, 32, 26, '0', 25, 0, '', 0),
(4, 5, 1, 7, 1, -1, 1, 29, 'Laser', 174, 0, 23, 35, '0', 35, 0, '', 0),
(5, 5, 1, 7, 1, 3, 1, 29, 'Laser', 174, 0, 34, 24, '0', 23, 1, '', 0),
(6, 34, 1, 1, 1, -1, 2, 12, 'Particle', 35, 0, 5, 30, '0', 30, 0, '', 0),
(7, 34, 1, 1, 1, -1, 2, 2, 'Particle', 34, 0, 6, 28, '0', 28, 0, '', 0),
(8, 33, 1, 1, 1, -1, 2, 20, 'Particle', 33, 0, 7, 26, '0', 26, 0, '', 0),
(9, 33, 1, 1, 1, -1, 2, 56, 'Particle', 36, 0, 12, 24, '0', 24, 0, '', 0),
(10, 32, 1, 1, 1, -1, 2, 19, 'Particle', 37, 0, 14, 23, '0', 23, 0, '', 0),
(11, 38, 1, 1, 1, 4, 2, 5, 'Particle', 67, 0, 56, 11, '0', 11, 0, '', 0),
(12, 18, 1, 7, 1, -1, 2, 8, 'Laser', 310, 0, 71, 32, '0', 32, 0, '', 0),
(13, 18, 1, 7, 1, -1, 2, 8, 'Laser', 310, 0, 73, 30, '0', 30, 0, '', 0),
(14, 18, 1, 7, 1, -1, 2, 8, 'Laser', 310, 0, 74, 29, '0', 29, 0, '', 0),
(15, 28, 1, 7, 1, -1, 2, 16, 'Laser', 9, 0, 0, 5, '0', 27, 0, '', 0),
(16, 17, 1, 7, 1, 2, 2, 10, 'Matter', 46, 0, 37, 9, '0', 19, 0, '', 0),
(17, 26, 1, 7, 1, -1, 2, 9, 'Matter', 39, 0, 26, 14, '0', 27, 0, '', 0),
(18, 23, 1, 7, 1, -1, 2, 31, 'Matter', 44, 0, 31, 13, '0', 26, 0, '', 0),
(19, 23, 1, 7, 1, 2, 2, 5, 'Matter', 43, 0, 34, 9, '0', 18, 1, '', 0),
(20, 22, 1, 7, 1, -1, 2, 53, 'Matter', 81, 0, 69, 13, '0', 25, 0, '', 0);

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
(1, 8, 9, 'Sentri'),
(2, 9, 9, 'Sentri'),
(3, 10, 9, 'Aurora'),
(4, 11, 9, 'Aurora');

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
(1, 1, 1, 7, 2, 2, 1, 64, ' 46', 1, 1),
(2, 1, 1, 7, 2, 3, 1, 64, ' 89', 0, 1),
(3, 1, 1, 7, 2, 4, 1, 64, ' 21', 1, 1),
(4, 1, 1, 7, 2, 5, 1, 64, ' 74', 0, 1),
(5, 1, 1, 1, 7, 8, 1, 53, '29 ', 3, 1),
(6, 1, 1, 2, 7, 8, 1, 55, '96 ', 0, 1),
(7, 1, 2, 4, 3, 3, 4, 0, '', 0, 1),
(8, 1, 2, 7, 0, 11, NULL, 0, '', 0, 1),
(9, 1, 2, 7, 0, 21, NULL, 0, '', 0, 1),
(10, 1, 2, 1, 0, 4, NULL, 0, '', 0, 1),
(11, 1, 2, 2, 0, 4, NULL, 0, '', 0, 1),
(12, 1, 2, 3, 7, 8, 2, 0, '', 0, 1),
(13, 1, 2, 3, 7, 12, 2, 0, '', 0, 1),
(14, 1, 2, 1, 7, 2, 2, 31, ' 56 43', 0, 1),
(15, 1, 2, 1, 7, 3, 1, 35, '43 ', 0, 1),
(16, 1, 2, 1, 7, 5, 1, 35, '73 ', 0, 1),
(17, 1, 2, 1, 7, 6, 2, 31, ' 10 40', 1, 1),
(18, 1, 2, 1, 7, 15, 1, 66, '8 ', 3, 1),
(19, 1, 2, 1, 7, 16, 1, 35, '50 ', 0, 1),
(20, 1, 2, 1, 7, 17, 1, 35, '90 ', 0, 1),
(21, 1, 2, 3, 7, 2, 2, 40, ' 85 99', 0, 1),
(22, 1, 2, 3, 7, 3, 2, 59, ' 83 53', 1, 1),
(23, 1, 2, 3, 7, 4, 2, 40, ' 31 5', 2, 1),
(24, 1, 2, 2, 7, 2, 2, 34, ' 55 92', 0, 1),
(25, 1, 2, 2, 7, 3, 1, 38, '58 ', 0, 1),
(26, 1, 2, 2, 7, 6, 2, 34, ' 86 9', 1, 1),
(27, 1, 2, 2, 7, 9, 1, 38, '75 ', 0, 1),
(28, 1, 2, 2, 7, 10, 1, 38, '16 ', 1, 1),
(29, 1, 2, 2, 7, 15, 1, 69, '90 ', 0, 1),
(30, 1, 2, 2, 7, 16, 1, 38, '58 ', 0, 1),
(31, 1, 2, 2, 7, 17, 1, 38, '85 ', 0, 1),
(32, 1, 2, 4, 1, 6, 2, 58, ' 19 77', 1, 1),
(33, 1, 2, 4, 1, 7, 2, 58, ' 20 56', 2, 1),
(34, 1, 2, 4, 1, 9, 2, 58, ' 12 2', 2, 1),
(35, 1, 2, 4, 1, 10, 2, 58, ' 85 76', 0, 1),
(36, 1, 2, 7, 1, 2, 1, 76, ' 93', 0, 1),
(37, 1, 2, 7, 1, 4, 1, 76, ' 98', 0, 1),
(38, 1, 2, 7, 1, 5, 1, 76, ' 5', 1, 1),
(39, 1, 3, 5, 11, 3, 5, 0, '', 0, 1),
(40, 1, 3, 6, 11, 3, 5, 0, '', 0, 1),
(41, 1, 3, 1, 6, 3, NULL, 0, '', 0, 0),
(42, 1, 3, 1, 6, 5, NULL, 0, '', 0, 0),
(43, 1, 3, 1, 4, 9, NULL, 0, '', 0, 0),
(44, 1, 3, 1, 4, 10, NULL, 0, '', 0, 0),
(45, 1, 3, 1, 6, 16, NULL, 0, '', 0, 0),
(46, 1, 3, 1, 6, 17, NULL, 0, '', 0, 0),
(47, 1, 3, 3, 4, 6, NULL, 0, '', 0, 0),
(48, 1, 3, 3, 4, 7, NULL, 0, '', 0, 0),
(49, 1, 3, 2, 6, 3, NULL, 0, '', 0, 0),
(50, 1, 3, 2, 4, 9, NULL, 0, '', 0, 0),
(51, 1, 3, 2, 4, 10, NULL, 0, '', 0, 0),
(52, 1, 3, 2, 6, 16, NULL, 0, '', 0, 0),
(53, 1, 3, 2, 6, 17, NULL, 0, '', 0, 0);

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
(1, 'myGame', 'active', 3, 2, 3500, 175);

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
(3, 3, 8, 'Cyclops', 8),
(4, 3, 12, 'Cyclops', 8),
(5, 4, 3, 'Javelin', 16),
(6, 5, 3, 'Hasta', 10),
(7, 6, 3, 'Hasta', 10);

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
(1, 1, 1, 3, 2, 'Earth Alliance', 824, 'ready'),
(2, 2, 1, 3, 2, 'Centauri Republic', 836, 'waiting');

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
(1, 7, 7, 1, '0', 0),
(2, 7, 8, 1, '0', 0),
(3, 7, 9, 1, '0', 0),
(4, 7, 10, 1, '0', 0),
(5, 7, 13, 1, '0', 0),
(6, 7, 14, 1, '0', 0),
(7, 7, 15, 1, '0', 0),
(8, 7, 17, 1, '0', 0),
(9, 7, 18, 1, '0', 0),
(10, 7, 19, 1, '0', 0),
(11, 7, 20, 1, '0', 0),
(12, 7, 26, 1, '1', 10),
(13, 7, 26, 1, '1', 12),
(14, 1, 3, 1, '-1', 0),
(15, 1, 5, 1, '-1', 0),
(16, 1, 9, 1, '-1', 0),
(17, 1, 10, 1, '-1', 0),
(18, 1, 16, 1, '-1', 0),
(19, 1, 17, 1, '-1', 0),
(20, 2, 3, 1, '-1', 0),
(21, 2, 5, 1, '-1', 0),
(22, 2, 9, 1, '-1', 0),
(23, 2, 10, 1, '-1', 0),
(24, 2, 16, 1, '-1', 0),
(25, 2, 17, 1, '-1', 0),
(26, 3, 6, 1, '-1', 0),
(27, 3, 7, 1, '-1', 0),
(28, 3, 10, 1, '-1', 0),
(29, 3, 11, 1, '-1', 0),
(30, 4, 2, 2, '0', 0),
(31, 4, 3, 2, '1', 0),
(32, 4, 3, 2, '1', 0),
(33, 4, 3, 2, '1', 0),
(34, 4, 4, 2, '0', 0),
(35, 4, 15, 2, '1', 10),
(36, 7, 7, 2, '0', 0),
(37, 7, 8, 2, '0', 0),
(38, 7, 9, 2, '0', 0),
(39, 7, 10, 2, '0', 0),
(40, 7, 13, 2, '0', 0),
(41, 7, 14, 2, '0', 0),
(42, 7, 15, 2, '0', 0),
(43, 7, 17, 2, '0', 0),
(44, 7, 18, 2, '0', 0),
(45, 7, 19, 2, '0', 0),
(46, 7, 20, 2, '0', 0),
(47, 1, 3, 2, '-2', 0),
(48, 1, 5, 2, '-2', 0),
(49, 1, 9, 2, '-2', 0),
(50, 1, 10, 2, '-2', 0),
(51, 1, 12, 2, '0', 0),
(52, 1, 15, 2, '1', 6),
(53, 1, 15, 2, '1', 6),
(54, 1, 16, 2, '-2', 0),
(55, 1, 17, 2, '-2', 0),
(56, 2, 3, 2, '-2', 0),
(57, 2, 5, 2, '-1', 0),
(58, 2, 9, 2, '-2', 0),
(59, 2, 10, 2, '-2', 0),
(60, 2, 12, 2, '0', 0),
(61, 2, 15, 2, '1', 6),
(62, 2, 15, 2, '1', 6),
(63, 2, 16, 2, '-2', 0),
(64, 2, 17, 2, '-2', 0),
(65, 3, 6, 2, '-1', 0),
(66, 3, 7, 2, '-1', 0),
(67, 3, 8, 2, '1', 0),
(68, 3, 10, 2, '-1', 0),
(69, 3, 11, 2, '-1', 0),
(70, 3, 12, 2, '1', 0),
(71, 1, 3, 3, '-2', 0),
(72, 1, 4, 3, '0', 0),
(73, 1, 5, 3, '-2', 0),
(74, 1, 9, 3, '-2', 0),
(75, 1, 10, 3, '-2', 0),
(76, 1, 16, 3, '-2', 0),
(77, 1, 17, 3, '-2', 0),
(78, 3, 6, 3, '-1', 0),
(79, 3, 7, 3, '-1', 0),
(80, 3, 10, 3, '-1', 0),
(81, 3, 11, 3, '-1', 0),
(82, 2, 3, 3, '-2', 0),
(83, 2, 5, 3, '-1', 0),
(84, 2, 9, 3, '-2', 0),
(85, 2, 10, 3, '-2', 0),
(86, 2, 16, 3, '-2', 0),
(87, 2, 17, 3, '-2', 0),
(88, 5, 3, 3, '1', 0),
(89, 5, 3, 3, '1', 0),
(90, 5, 3, 3, '1', 0),
(91, 5, 3, 3, '1', 0),
(92, 7, 11, 3, '0', 0),
(93, 7, 13, 3, '0', 0),
(94, 7, 14, 3, '0', 0),
(95, 7, 15, 3, '0', 0),
(96, 7, 21, 3, '0', 0),
(97, 7, 24, 3, '1', 10),
(98, 7, 26, 3, '1', 10),
(99, 6, 3, 3, '1', 0),
(100, 6, 3, 3, '1', 0),
(101, 6, 3, 3, '1', 0),
(102, 6, 3, 3, '1', 0);

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
(1, 1, 2, 'Demos', 3, 430),
(2, 1, 1, 'Tethys', 4, 300);

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
  `dist` int(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `sensors`
--

INSERT INTO `sensors` (`id`, `unitid`, `systemid`, `turn`, `angle`, `dist`) VALUES
(1, 4, 15, 1, 0, 174),
(2, 5, 13, 1, 0, 116),
(3, 6, 13, 1, 0, 116),
(4, 7, 26, 1, 21, 1260),
(5, 1, 22, 1, 0, 174),
(6, 2, 22, 1, 0, 174),
(7, 3, 17, 1, 0, 151),
(8, 4, 15, 2, 14, 825),
(9, 5, 13, 2, 0, 116),
(10, 6, 13, 2, 0, 116),
(11, 7, 26, 2, 21, 1050),
(12, 1, 22, 2, 0, 174),
(13, 2, 22, 2, 0, 174),
(14, 3, 17, 2, 0, 151),
(15, 1, 22, 3, 328, 750),
(16, 3, 17, 3, 13, 650),
(17, 2, 22, 3, 336, 671),
(18, 4, 15, 3, 23, 588),
(19, 5, 13, 3, 9, 312),
(20, 7, 26, 3, 25, 718),
(21, 6, 13, 3, 6, 388);

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
(1, 2, 5, 1, 'disabled', 1),
(2, 1, 4, 2, 'launch2', 0);

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
(2, 1, 1, 1, 0, 'Hyperion', 'bought', 1, 0),
(3, 1, 1, 1, 0, 'Artemis', 'bought', 1, 0),
(4, 1, 2, 1, 0, 'Demos', 'bought', 1, 0),
(5, 1, 2, 1, 0, 'Vorchan', 'bought', 1, 0),
(6, 1, 2, 1, 0, 'Vorchan', 'bought', 1, 0),
(7, 1, 2, 1, 0, 'Primus', 'bought', 1, 0),
(8, 1, 2, 0, 0, 'Flight', 'deployed', 2, 0),
(9, 1, 2, 0, 0, 'Flight', 'deployed', 2, 0),
(10, 1, 1, 0, 0, 'Flight', 'deployed', 2, 0),
(11, 1, 1, 0, 0, 'Flight', 'deployed', 2, 0),
(12, 1, 1, 7, 1, 'Cyclops', 'launched', 4, 0),
(13, 1, 2, 3, 1, 'Javelin', 'launched', 4, 0),
(14, 1, 2, 11, 1, 'Hasta', 'launched', 5, 0),
(15, 1, 2, 11, 1, 'Hasta', 'launched', 5, 0);

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
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;
--
-- AUTO_INCREMENT für Tabelle `damages`
--
ALTER TABLE `damages`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT für Tabelle `dogfights`
--
ALTER TABLE `dogfights`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `fighters`
--
ALTER TABLE `fighters`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT für Tabelle `fireorders`
--
ALTER TABLE `fireorders`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;
--
-- AUTO_INCREMENT für Tabelle `games`
--
ALTER TABLE `games`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT für Tabelle `loads`
--
ALTER TABLE `loads`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT für Tabelle `playerstatus`
--
ALTER TABLE `playerstatus`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT für Tabelle `powers`
--
ALTER TABLE `powers`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=103;
--
-- AUTO_INCREMENT für Tabelle `reinforcements`
--
ALTER TABLE `reinforcements`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT für Tabelle `sensors`
--
ALTER TABLE `sensors`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
--
-- AUTO_INCREMENT für Tabelle `systemcrits`
--
ALTER TABLE `systemcrits`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT für Tabelle `units`
--
ALTER TABLE `units`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

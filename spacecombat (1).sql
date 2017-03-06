-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 04. Mrz 2017 um 22:48
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
(1, 4, 1, 'deploy', 0, 1287, 400, 180, 0, 0, 1, 1),
(2, 1, 1, 'deploy', 0, 369, 178, 0, 0, 0, 1, 1),
(3, 2, 1, 'deploy', 0, 365, 689, 0, 0, 0, 1, 1),
(4, 3, 1, 'deploy', 0, 338, 441, 0, 0, 0, 1, 1),
(5, 1, 1, 'move', 165, 535, 179, 0, 0, 0, 1, 1),
(6, 2, 1, 'move', 165, 531, 690, 0, 0, 0, 1, 1),
(7, 3, 1, 'move', 165, 504, 442, 0, 0, 0, 1, 1),
(8, 4, 1, 'move', 130, 1158, 400, 0, 0, 0, 1, 1),
(9, 1, 2, 'move', 82, 617, 189, 0, 0, 0, 1, 1),
(10, 1, 2, 'turn', 0, 617, 189, 30, 123, 141, 2, 1),
(11, 1, 2, 'move', 83, 688, 231, 0, 0, 0, 1, 1),
(12, 2, 2, 'turn', 0, 531, 690, -30, 123, 141, 1, 1),
(13, 2, 2, 'move', 141, 653, 620, 0, 0, 0, 1, 1),
(14, 2, 2, 'turn', 0, 653, 620, -30, 123, 141, 1, 1),
(15, 2, 2, 'move', 24, 665, 599, 0, 0, 0, 1, 1),
(16, 3, 2, 'move', 121, 625, 454, 0, 0, 0, 1, 1),
(17, 3, 2, 'turn', 0, 625, 454, -30, 123, 141, 2.2, 1),
(18, 3, 2, 'move', 44, 663, 432, 0, 0, 0, 1, 1),
(19, 4, 2, 'turn', 0, 1158, 400, 30, 473, 226, 1.8, 1),
(20, 4, 2, 'move', 130, 1045, 335, 0, 0, 0, 1, 1),
(21, 5, 3, 'deploy', 0, 717, 400, -31, 0, 0, 1, 1),
(22, 1, 3, 'turn', 0, 688, 231, 30, 123, 141, 1.2, 1),
(23, 1, 3, 'move', 118, 747, 333, 0, 0, 0, 1, 1),
(24, 1, 3, 'turn', 0, 747, 333, 30, 123, 141, 1, 1),
(25, 1, 3, 'move', 47, 747, 380, 0, 0, 0, 1, 1),
(26, 2, 3, 'move', 117, 724, 498, 0, 0, 0, 1, 1),
(27, 2, 3, 'turn', 0, 724, 498, -30, 123, 141, 2.2, 1),
(28, 2, 3, 'move', 48, 724, 450, 0, 0, 0, 1, 1),
(29, 3, 3, 'move', 21, 681, 422, 0, 0, 0, 1, 1),
(30, 3, 3, 'turn', 0, 681, 422, -30, 123, 141, 1, 1),
(31, 3, 3, 'move', 141, 752, 300, 0, 0, 0, 1, 1),
(32, 3, 3, 'turn', 0, 752, 300, -30, 123, 141, 1, 1),
(33, 3, 3, 'move', 3, 752, 297, 0, 0, 0, 1, 1),
(34, 4, 3, 'move', 130, 932, 270, 0, 0, 0, 1, 1),
(35, 5, 3, 'speedChange', -1, 717, 400, 0, 13, 0, 1, 1),
(36, 5, 3, 'speedChange', -1, 717, 400, 0, 12, 0, 1, 1),
(37, 5, 3, 'speedChange', -1, 717, 400, 0, 11, 0, 1, 1),
(38, 5, 3, 'move', 175, 867, 310, 0, 0, 0, 1, 1),
(39, 4, 4, 'move', 107, 845, 207, 0, 0, 0, 1, 1),
(40, 4, 4, 'turn', 0, 845, 207, -30, 473, 226, 1.8, 1),
(41, 4, 4, 'move', 23, 822, 207, 0, 0, 0, 1, 1),
(42, 1, 4, 'move', 94, 747, 474, 0, 0, 0, 1, 1),
(43, 1, 4, 'turn', 0, 747, 474, 30, 123, 141, 2, 1),
(44, 1, 4, 'move', 71, 712, 535, 0, 0, 0, 1, 1),
(45, 2, 4, 'move', 78, 710, 373, 0, 0, 0, 1, 1),
(46, 2, 4, 'turn', 0, 710, 373, 30, 123, 141, 2, 1),
(47, 2, 4, 'move', 87, 754, 298, 0, 0, 0, 1, 1),
(48, 3, 4, 'move', 165, 752, 132, 0, 0, 0, 1, 1),
(49, 5, 4, 'move', 79, 941, 280, 0, 0, 0, 1, 1),
(50, 5, 4, 'turn', 0, 941, 280, -30, 9, 27, 1, 1),
(51, 5, 4, 'move', 27, 954, 256, 0, 0, 0, 1, 1),
(52, 5, 4, 'turn', 0, 954, 256, -30, 9, 27, 1, 1),
(53, 5, 4, 'move', 27, 954, 229, 0, 0, 0, 1, 1),
(54, 5, 4, 'turn', 0, 954, 229, -30, 9, 27, 1, 1),
(55, 5, 4, 'move', 27, 940, 206, 0, 0, 0, 1, 1),
(56, 5, 4, 'turn', 0, 940, 206, -30, 9, 27, 1, 1),
(57, 5, 4, 'turn', 0, 940, 206, -30, 9, 27, 1, 1),
(58, 5, 4, 'move', 15, 925, 206, 0, 0, 0, 1, 1);

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
(21, 35, 2, 1, 1, -1, 2, 31, 'Particle', 35, 0, 3, 32, '0', 32, 0, '', 0),
(22, 35, 2, 1, 1, -1, 2, 23, 'Particle', 36, 0, 5, 31, '0', 30, 0, '', 0),
(23, 34, 2, 1, 1, 4, 2, 14, 'Particle', 40, 0, 25, 15, '0', 14, 0, '', 0),
(24, 34, 2, 1, 1, -1, 2, 7, 'Particle', 37, 0, 8, 29, '0', 28, 0, '', 0),
(25, 32, 2, 2, 1, -1, 2, 61, 'Laser', 200, 0, 68, 32, '0', 32, 0, '', 0),
(26, 32, 2, 2, 1, 4, 2, 61, 'Laser', 200, 0, 84, 16, '0', 15, 0, '', 0),
(27, 33, 2, 3, 1, 25, 2, 61, 'Laser', 154, 0, 45, 32, '0', 32, 0, '', 0),
(28, 33, 2, 3, 1, -1, 2, 61, 'Laser', 154, 0, 46, 31, '0', 30, 0, '', 0),
(29, 38, 2, 3, 1, 6, 2, 13, 'Particle', 36, 0, 15, 21, '0', 20, 0, '', 0),
(30, 38, 2, 3, 1, -1, 2, 21, 'Particle', 37, 0, 9, 28, '0', 28, 0, '', 0),
(31, 28, 2, 4, 1, -1, 2, 67, 'Matter', 55, 0, 33, 22, '0', 44, 0, '', 0),
(32, 29, 2, 4, 1, 31, 2, 87, 'Matter', 48, 0, 26, 22, '0', 44, 0, '', 0),
(33, 27, 2, 4, 1, 29, 2, 22, 'Laser', 327, 0, 65, 44, '0', 43, 0, '', 0),
(34, 27, 2, 4, 1, -1, 2, 22, 'Laser', 327, 0, 66, 43, '0', 43, 0, '', 0),
(35, 27, 2, 4, 1, -1, 2, 22, 'Laser', 327, 0, 66, 43, '0', 42, 0, '', 0),
(36, 30, 2, 4, 1, -1, 2, 19, 'Particle', 27, 0, 0, 27, '0', 42, 0, '', 0),
(37, 30, 2, 4, 1, -1, 2, 29, 'Particle', 26, 0, 0, 26, '0', 41, 0, '', 0),
(38, 31, 2, 4, 1, -1, 2, 28, 'Particle', 34, 0, 0, 34, '0', 41, 0, '', 0),
(39, 66, 2, 3, 7, -1, 3, 52, 'Laser', 136, 0, 40, 28, '0', 28, 0, '', 0),
(40, 66, 2, 3, 7, -1, 3, 52, 'Laser', 136, 0, 40, 28, '0', 27, 0, '', 0),
(41, 67, 2, 3, 7, -1, 3, 10, 'Laser', 111, 0, 28, 27, '0', 26, 0, '', 0),
(42, 67, 2, 3, 7, 23, 3, 10, 'Laser', 111, 0, 29, 26, '0', 25, 0, '', 0),
(43, 61, 2, 3, 7, -1, 3, 73, 'Laser', 98, 0, 24, 25, '0', 24, 0, '', 0),
(44, 61, 2, 3, 7, 24, 3, 73, 'Laser', 98, 0, 25, 24, '0', 23, 0, '', 0),
(45, 60, 2, 3, 7, 22, 3, 58, 'Laser', 121, 0, 37, 23, '0', 22, 0, '', 0),
(46, 60, 2, 3, 7, 21, 3, 58, 'Laser', 121, 0, 38, 22, '0', 22, 0, '', 0),
(47, 73, 2, 3, 7, -1, 3, 61, 'Particle', 33, 0, 12, 21, '0', 21, 0, '', 0),
(48, 73, 2, 3, 7, -1, 3, 61, 'Particle', 33, 0, 12, 21, '0', 20, 0, '', 0),
(49, 72, 2, 3, 7, -1, 3, 72, 'Particle', 36, 0, 16, 20, '0', 19, 0, '', 0),
(50, 69, 2, 3, 7, -1, 3, 11, 'Particle', 36, 0, 17, 19, '0', 19, 0, '', 0),
(51, 68, 2, 3, 7, 8, 3, 58, 'Particle', 40, 0, 23, 17, '0', 16, 0, '', 0),
(52, 68, 2, 3, 7, -1, 3, 24, 'Particle', 37, 0, 19, 18, '0', 17, 0, '', 0),
(53, 63, 2, 3, 7, 25, 3, 18, 'Particle', 32, 0, 15, 17, '0', 17, 0, '', 0),
(54, 63, 2, 3, 7, 25, 3, 31, 'Particle', 32, 0, 15, 17, '0', 16, 0, '', 0),
(55, 42, 2, 4, 1, -1, 3, 67, 'Laser', 175, 0, 17, 41, '0', 40, 0, '', 0),
(56, 42, 2, 4, 1, -1, 3, 67, 'Laser', 175, 0, 18, 40, '0', 40, 0, '', 0),
(57, 42, 2, 4, 1, 28, 3, 67, 'Laser', 175, 0, 18, 40, '0', 39, 0, '', 0),
(58, 47, 2, 4, 1, -1, 3, 86, 'Laser', 165, 0, 16, 39, '0', 39, 0, '', 0),
(59, 47, 2, 4, 1, -1, 3, 86, 'Laser', 165, 0, 16, 39, '0', 38, 0, '', 0),
(60, 47, 2, 4, 1, -1, 3, 86, 'Laser', 165, 0, 17, 38, '0', 38, 0, '', 0),
(61, 41, 2, 4, 1, 30, 3, 37, 'Particle', 29, 0, 0, 29, '0', 37, 0, '', 0),
(62, 41, 2, 4, 1, 32, 3, 78, 'Particle', 33, 0, 0, 33, '0', 37, 0, '', 0),
(63, 40, 2, 4, 1, 28, 3, 53, 'Particle', 31, 0, 0, 31, '0', 36, 0, '', 0),
(64, 40, 2, 4, 1, -1, 3, 33, 'Particle', 28, 0, 0, 28, '0', 36, 0, '', 0),
(65, 40, 2, 4, 1, -1, 3, 53, 'Particle', 28, 0, 0, 28, '0', 35, 0, '', 0),
(66, 43, 2, 4, 1, 28, 3, 18, 'Particle', 25, 0, 0, 25, '0', 35, 0, '', 0),
(67, 43, 2, 4, 1, 4, 3, 21, 'Particle', 29, 0, 4, 25, '0', 24, 0, '', 0),
(68, 44, 2, 4, 1, -1, 3, 77, 'Particle', 34, 0, 0, 34, '0', 34, 0, '', 0),
(69, 44, 2, 4, 1, -1, 3, 67, 'Particle', 29, 0, 0, 29, '0', 34, 0, '', 0),
(70, 44, 2, 4, 1, 2, 3, 1, 'Particle', 30, 0, 6, 24, '0', 23, 0, '', 0),
(71, 48, 2, 4, 1, -1, 3, 64, 'Particle', 31, 0, 0, 31, '0', 33, 0, '', 0),
(72, 48, 2, 4, 1, -1, 3, 48, 'Particle', 30, 0, 0, 30, '0', 33, 0, '', 0),
(73, 48, 2, 4, 1, -1, 3, 30, 'Particle', 27, 0, 0, 27, '0', 32, 0, '', 0),
(74, 45, 2, 4, 1, -1, 3, 44, 'Particle', 26, 0, 0, 26, '0', 32, 0, '', 0),
(75, 45, 2, 4, 1, 32, 3, 18, 'Particle', 25, 0, 0, 25, '0', 32, 0, '', 0),
(76, 45, 2, 4, 1, 32, 3, 73, 'Particle', 28, 0, 0, 28, '0', 31, 0, '', 0),
(77, 49, 2, 4, 1, 30, 3, 57, 'Particle', 31, 0, 0, 31, '0', 31, 0, '', 0),
(78, 49, 2, 4, 1, -1, 3, 15, 'Particle', 26, 0, 0, 26, '0', 30, 0, '', 0),
(79, 49, 2, 4, 1, -1, 3, 1, 'Particle', 28, 0, 0, 28, '0', 30, 0, '', 0),
(80, 46, 2, 4, 1, 5, 3, 22, 'Particle', 30, 0, 9, 21, '0', 21, 0, '', 0),
(81, 46, 2, 4, 1, 28, 3, 69, 'Particle', 26, 0, 0, 26, '0', 29, 0, '', 0),
(82, 46, 2, 4, 1, -1, 3, 63, 'Particle', 25, 0, 0, 25, '0', 29, 0, '', 0),
(83, 53, 2, 4, 1, 31, 3, 73, 'Particle', 31, 0, 2, 29, '0', 29, 0, '', 0),
(84, 53, 2, 4, 1, -1, 3, 19, 'Particle', 31, 0, 2, 29, '0', 28, 0, '', 0),
(85, 53, 2, 4, 1, -1, 3, 69, 'Particle', 34, 0, 6, 28, '0', 28, 0, '', 0),
(86, 52, 2, 4, 1, 29, 3, 41, 'Particle', 30, 0, 2, 28, '0', 28, 0, '', 0),
(87, 52, 2, 4, 1, -1, 3, 4, 'Particle', 26, 0, 0, 26, '0', 27, 0, '', 0),
(88, 52, 2, 4, 1, -1, 3, 19, 'Particle', 34, 0, 7, 27, '0', 27, 0, '', 0),
(89, 51, 2, 4, 1, -1, 3, 31, 'Particle', 34, 0, 7, 27, '0', 26, 0, '', 0),
(90, 51, 2, 4, 1, -1, 3, 24, 'Particle', 30, 0, 3, 27, '0', 26, 0, '', 0),
(91, 50, 2, 4, 1, -1, 3, 70, 'Particle', 25, 0, 0, 25, '0', 26, 0, '', 0),
(92, 50, 2, 4, 1, -1, 3, 66, 'Particle', 29, 0, 3, 26, '0', 25, 0, '', 0),
(93, 50, 2, 4, 1, 5, 3, 21, 'Particle', 25, 0, 7, 18, '0', 18, 0, '', 0),
(94, 70, 2, 5, 1, 1, 3, 7, 'Particle', 39, 0, 32, 7, '0', 7, 1, '', 0),
(95, 57, 2, 4, 1, 4, 3, 52, 'Particle', 14, 0, 0, 28, '0', 17, 0, '', 0),
(96, 55, 2, 4, 1, -1, 3, 76, 'Particle', 15, 0, 0, 30, '0', 24, 0, '', 0),
(97, 59, 2, 4, 1, -1, 3, 34, 'Particle', 13, 0, 0, 26, '0', 24, 0, '', 0),
(98, 58, 2, 4, 1, 4, 3, 29, 'Particle', 14, 0, 0, 28, '0', 17, 0, '', 0),
(99, 56, 2, 4, 1, -1, 3, 23, 'Particle', 16, 0, 0, 32, '0', 23, 0, '', 0);

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
  `classname` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `fighters`
--

INSERT INTO `fighters` (`id`, `unitid`, `amount`, `classname`) VALUES
(1, 5, 6, 'Aurora');

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
  `notes` varchar(255) NOT NULL DEFAULT '0',
  `hits` int(3) NOT NULL DEFAULT '0',
  `resolved` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `fireorders`
--

INSERT INTO `fireorders` (`id`, `gameid`, `turn`, `shooterid`, `targetid`, `weaponid`, `shots`, `req`, `notes`, `hits`, `resolved`) VALUES
(27, 2, 2, 1, 4, 17, 1, 124, '022 ', 3, 1),
(28, 2, 2, 2, 4, 2, 1, 109, '0 67', 1, 1),
(29, 2, 2, 2, 4, 6, 1, 109, '0 87', 1, 1),
(30, 2, 2, 3, 4, 3, 3, 50, '0 19 29 52', 2, 1),
(31, 2, 2, 3, 4, 5, 3, 50, '0 28 97 97', 1, 1),
(32, 2, 2, 4, 2, 4, 1, 84, '061 ', 2, 1),
(33, 2, 2, 4, 3, 5, 1, 87, '061 ', 2, 1),
(34, 2, 2, 4, 1, 7, 2, 35, '0 14 7', 2, 1),
(35, 2, 2, 4, 1, 8, 2, 35, '0 31 23', 2, 1),
(36, 2, 2, 4, 1, 15, 2, 35, '0 92 58', 0, 1),
(37, 2, 2, 4, 1, 16, 2, 35, '0 54 55', 0, 1),
(38, 2, 2, 4, 3, 20, 2, 33, '0 13 21', 2, 1),
(39, 2, 2, 4, 2, 21, 2, 25, '0 34 56', 0, 1),
(40, 2, 3, 1, 4, 13, 3, 85, '0 53 33 53', 3, 1),
(41, 2, 3, 1, 4, 14, 3, 85, '0 37 91 78', 2, 1),
(42, 2, 3, 1, 4, 15, 1, 167, '067 ', 3, 1),
(43, 2, 3, 1, 4, 18, 3, 85, '0 92 18 21', 2, 1),
(44, 2, 3, 1, 4, 19, 3, 85, '0 77 67 1', 3, 1),
(45, 2, 3, 2, 4, 3, 3, 81, '0 44 18 73', 3, 1),
(46, 2, 3, 2, 4, 5, 3, 81, '0 22 69 63', 3, 1),
(47, 2, 3, 2, 4, 8, 1, 171, '086 ', 3, 1),
(48, 2, 3, 2, 4, 9, 3, 81, '0 64 48 30', 3, 1),
(49, 2, 3, 2, 4, 10, 3, 81, '0 57 15 1', 3, 1),
(50, 2, 3, 3, 4, 3, 3, 80, '0 70 66 21', 3, 1),
(51, 2, 3, 3, 4, 5, 3, 80, '0 31 24 90', 2, 1),
(52, 2, 3, 3, 4, 9, 3, 80, '0 41 4 19', 3, 1),
(53, 2, 3, 3, 4, 10, 3, 80, '0 73 19 69', 3, 1),
(55, 2, 3, 5, 4, 4, 1, 125, '0 76', 1, 1),
(56, 2, 3, 5, 4, 6, 1, 125, '0 23', 1, 1),
(57, 2, 3, 5, 4, 8, 1, 125, '0 52', 1, 1),
(58, 2, 3, 5, 4, 10, 1, 125, '0 29', 1, 1),
(59, 2, 3, 5, 4, 12, 1, 125, '0 34', 1, 1),
(60, 2, 3, 4, 3, 2, 1, 116, '058 ', 2, 1),
(61, 2, 3, 4, 3, 3, 1, 116, '073 ', 2, 1),
(62, 2, 3, 4, 3, 6, 2, 74, '0 97 85', 0, 1),
(63, 2, 3, 4, 3, 7, 2, 74, '0 18 31', 2, 1),
(64, 2, 3, 4, 5, 8, 2, 17, '0 66 50', 0, 1),
(65, 2, 3, 4, 5, 9, 2, 17, '0 41 91', 0, 1),
(66, 2, 3, 4, 3, 11, 1, 116, '052 ', 2, 1),
(67, 2, 3, 4, 3, 12, 1, 116, '010 ', 2, 1),
(68, 2, 3, 4, 3, 15, 2, 74, '0 58 24', 2, 1),
(69, 2, 3, 4, 3, 16, 2, 74, '0 95 11', 1, 1),
(70, 2, 3, 4, 5, 20, 2, 17, '0 35 7', 1, 1),
(71, 2, 3, 4, 5, 21, 2, 17, '0 43 100', 0, 1),
(72, 2, 3, 4, 3, 22, 2, 74, '0 87 72', 1, 1),
(73, 2, 3, 4, 3, 24, 2, 74, '0 61 61', 2, 1),
(74, 2, 4, 1, 4, 9, 3, 0, '0', 0, 0),
(75, 2, 4, 1, 4, 10, 3, 0, '0', 0, 0),
(76, 2, 4, 1, 4, 12, 1, 0, '0', 0, 0),
(77, 2, 4, 1, 4, 13, 3, 0, '0', 0, 0),
(78, 2, 4, 1, 4, 14, 3, 0, '0', 0, 0),
(79, 2, 4, 2, 4, 2, 1, 0, '0', 0, 0),
(80, 2, 4, 2, 4, 3, 3, 0, '0', 0, 0),
(81, 2, 4, 2, 4, 5, 3, 0, '0', 0, 0),
(82, 2, 4, 2, 4, 6, 1, 0, '0', 0, 0),
(83, 2, 4, 2, 4, 9, 3, 0, '0', 0, 0),
(84, 2, 4, 2, 4, 10, 3, 0, '0', 0, 0),
(85, 2, 4, 3, 4, 9, 3, 0, '0', 0, 0),
(86, 2, 4, 3, 4, 10, 3, 0, '0', 0, 0),
(87, 2, 4, 3, 4, 12, 1, 0, '0', 0, 0),
(88, 2, 4, 3, 4, 13, 3, 0, '0', 0, 0),
(89, 2, 4, 3, 4, 14, 3, 0, '0', 0, 0),
(90, 2, 4, 5, 4, 4, 1, 0, '0', 0, 0),
(91, 2, 4, 5, 4, 6, 1, 0, '0', 0, 0),
(92, 2, 4, 5, 4, 8, 1, 0, '0', 0, 0),
(93, 2, 4, 5, 4, 10, 1, 0, '0', 0, 0),
(94, 2, 4, 5, 4, 12, 1, 0, '0', 0, 0),
(95, 2, 4, 4, 2, 4, 1, 0, '0', 0, 0),
(96, 2, 4, 4, 2, 5, 1, 0, '0', 0, 0),
(97, 2, 4, 4, 2, 6, 2, 0, '0', 0, 0),
(98, 2, 4, 4, 2, 7, 2, 0, '0', 0, 0),
(99, 2, 4, 4, 2, 8, 2, 0, '0', 0, 0),
(100, 2, 4, 4, 2, 9, 2, 0, '0', 0, 0),
(101, 2, 4, 4, 3, 13, 1, 0, '0', 0, 0),
(102, 2, 4, 4, 3, 14, 1, 0, '0', 0, 0),
(103, 2, 4, 4, 2, 15, 2, 0, '0', 0, 0),
(104, 2, 4, 4, 2, 16, 2, 0, '0', 0, 0),
(105, 2, 4, 4, 3, 17, 2, 0, '0', 0, 0),
(106, 2, 4, 4, 3, 18, 2, 0, '0', 0, 0),
(107, 2, 4, 4, 2, 20, 2, 0, '0', 0, 0),
(108, 2, 4, 4, 2, 21, 2, 0, '0', 0, 0),
(109, 2, 4, 4, 2, 22, 2, 0, '0', 0, 0),
(110, 2, 4, 4, 2, 24, 2, 0, '0', 0, 0),
(111, 2, 4, 4, 3, 25, 2, 0, '0', 0, 0),
(112, 2, 4, 4, 3, 26, 2, 0, '0', 0, 0);

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
(2, 'test30', 'active', 4, 2, 3000, 300);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `loads`
--

CREATE TABLE `loads` (
  `id` int(4) NOT NULL,
  `shipid` int(5) DEFAULT NULL,
  `systemid` int(3) DEFAULT NULL,
  `classname` varchar(20) DEFAULT NULL,
  `amount` int(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `loads`
--

INSERT INTO `loads` (`id`, `shipid`, `systemid`, `classname`, `amount`) VALUES
(1, 2, 4, 'Aurora', 6);

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
  `status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `playerstatus`
--

INSERT INTO `playerstatus` (`id`, `userid`, `gameid`, `turn`, `phase`, `status`) VALUES
(2, 1, 2, 4, 2, 'ready'),
(3, 2, 2, 4, 2, 'ready');

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
(1, 1, 4, 2, '0', 0),
(2, 1, 9, 2, '0', 0),
(3, 1, 17, 2, '1', 4),
(4, 1, 17, 2, '1', 4),
(5, 3, 22, 2, '1', 10),
(6, 4, 4, 2, '1', 3),
(7, 4, 4, 2, '1', 3),
(8, 4, 4, 2, '1', 3),
(9, 4, 5, 2, '1', 3),
(10, 4, 11, 2, '0', 0),
(11, 4, 12, 2, '0', 0),
(12, 4, 25, 2, '0', 0),
(13, 4, 26, 2, '0', 0),
(14, 4, 29, 2, '1', 8),
(15, 4, 29, 2, '1', 8),
(16, 1, 22, 3, '1', 10),
(17, 2, 22, 3, '1', 10),
(18, 3, 13, 3, '0', 0),
(19, 3, 14, 3, '0', 0),
(20, 4, 2, 3, '1', 3),
(21, 4, 3, 3, '1', 3),
(22, 4, 11, 3, '1', 3),
(23, 4, 12, 3, '1', 3),
(24, 4, 26, 3, '0', 0),
(25, 3, 2, 4, '0', 0),
(26, 3, 4, 4, '0', 0),
(27, 3, 6, 4, '0', 0),
(28, 3, 17, 4, '0', 0),
(29, 3, 22, 4, '0', 0),
(30, 4, 2, 4, '0', 0),
(31, 4, 4, 4, '1', 3),
(32, 4, 5, 4, '1', 3),
(33, 4, 13, 4, '1', 3),
(34, 4, 14, 4, '1', 3),
(35, 4, 23, 4, '0', 0),
(36, 4, 29, 4, '1', 8),
(37, 4, 29, 4, '1', 8);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `reinforce`
--

CREATE TABLE `reinforce` (
  `id` int(5) NOT NULL,
  `gameid` int(5) DEFAULT NULL,
  `userid` int(5) DEFAULT NULL,
  `points` int(5) DEFAULT NULL,
  `faction` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `reinforce`
--

INSERT INTO `reinforce` (`id`, `gameid`, `userid`, `points`, `faction`) VALUES
(1, 2, 1, 1350, 'Earth Alliance'),
(2, 2, 2, 300, 'Minbari Federation');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `reinforcements`
--

CREATE TABLE `reinforcements` (
  `id` int(3) NOT NULL,
  `gameid` int(3) DEFAULT NULL,
  `userid` int(5) DEFAULT NULL,
  `classname` varchar(255) DEFAULT NULL,
  `turn` int(3) DEFAULT NULL,
  `arrival` int(3) DEFAULT NULL,
  `cost` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `reinforcements`
--

INSERT INTO `reinforcements` (`id`, `gameid`, `userid`, `classname`, `turn`, `arrival`, `cost`) VALUES
(1, 2, 1, 'Artemis', 2, 2, 600),
(2, 2, 2, 'Sharlin', 2, 3, 2000),
(3, 2, 1, 'Tethys', 3, 3, 300);

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
(1, 1, 2, 1, 'damage2', 0),
(2, 1, 6, 1, 'range2', 0),
(3, 1, 23, 1, 'dmg25', 1),
(4, 4, 3, 1, 'damage2', 0),
(5, 4, 6, 1, 'disabled', 1),
(6, 4, 9, 1, 'disabled', 1),
(7, 2, 4, 2, 'launch3', 0),
(8, 3, 6, 2, 'damage1', 0),
(9, 3, 25, 2, 'output_0.9', 0),
(10, 4, 29, 2, 'output_0.5', 1),
(11, 3, 8, 3, 'range1', 0),
(12, 3, 21, 3, 'bridge_disabled', 1),
(13, 3, 22, 3, 'output_0.9', 0),
(14, 3, 23, 3, 'dmg15', 1),
(15, 3, 24, 3, 'output_0.85', 0),
(16, 3, 25, 3, 'output_0.5', 1),
(17, 4, 5, 3, 'range1', 0),
(18, 4, 28, 3, 'bridge_accu-10', 2),
(19, 4, 29, 3, 'output_0.9', 0);

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
  `classname` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `available` int(3) DEFAULT NULL,
  `destroyed` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `units`
--

INSERT INTO `units` (`id`, `gameid`, `userid`, `ship`, `ball`, `classname`, `status`, `available`, `destroyed`) VALUES
(1, 2, 1, 1, 0, 'Hyperion', 'deployed', 1, 0),
(2, 2, 1, 1, 0, 'Hyperion', 'deployed', 1, 0),
(3, 2, 1, 1, 0, 'Hyperion', 'deployed', 1, 0),
(4, 2, 2, 1, 0, 'Sharlin', 'deployed', 1, 0),
(5, 2, 1, 0, 0, 'Flight', 'bought', 3, 0),
(6, 2, 2, 1, 0, 'WhiteStar', 'bought', 6, 0),
(7, 2, 2, 1, 0, 'Tinashi', 'bought', 6, 0);

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
(2, '1', '147147', 1);

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
-- Indizes für die Tabelle `reinforce`
--
ALTER TABLE `reinforce`
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
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;
--
-- AUTO_INCREMENT für Tabelle `damages`
--
ALTER TABLE `damages`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;
--
-- AUTO_INCREMENT für Tabelle `dogfights`
--
ALTER TABLE `dogfights`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `fighters`
--
ALTER TABLE `fighters`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT für Tabelle `fireorders`
--
ALTER TABLE `fireorders`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=113;
--
-- AUTO_INCREMENT für Tabelle `games`
--
ALTER TABLE `games`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT für Tabelle `loads`
--
ALTER TABLE `loads`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT für Tabelle `playerstatus`
--
ALTER TABLE `playerstatus`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT für Tabelle `powers`
--
ALTER TABLE `powers`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;
--
-- AUTO_INCREMENT für Tabelle `reinforce`
--
ALTER TABLE `reinforce`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT für Tabelle `reinforcements`
--
ALTER TABLE `reinforcements`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT für Tabelle `systemcrits`
--
ALTER TABLE `systemcrits`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT für Tabelle `units`
--
ALTER TABLE `units`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

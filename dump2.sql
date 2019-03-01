-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 01. Mrz 2019 um 16:16
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
  `unitid` int(3) DEFAULT NULL,
  `turn` int(3) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `forced` tinyint(4) NOT NULL DEFAULT '0',
  `dist` int(4) DEFAULT NULL,
  `x` int(4) DEFAULT NULL,
  `y` int(4) DEFAULT NULL,
  `h` decimal(5,2) NOT NULL DEFAULT '0.00',
  `f` decimal(5,2) NOT NULL DEFAULT '0.00',
  `cost` int(4) DEFAULT NULL,
  `delay` int(4) DEFAULT NULL,
  `costmod` float DEFAULT NULL,
  `resolved` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `actions`
--

INSERT INTO `actions` (`id`, `unitid`, `turn`, `type`, `forced`, `dist`, `x`, `y`, `h`, `f`, `cost`, `delay`, `costmod`, `resolved`) VALUES
(1, 3, 1, 'deploy', 0, 0, -429, -491, '0.00', '0.00', 0, 0, 1, 1),
(2, 2, 1, 'deploy', 0, 0, -471, -323, '0.00', '0.00', 0, 0, 1, 1),
(3, 1, 1, 'deploy', 0, 0, -513, 243, '0.00', '0.00', 0, 0, 1, 1),
(4, 6, 1, 'deploy', 0, 0, 450, 377, '180.00', '180.00', 0, 0, 1, 1),
(5, 5, 1, 'deploy', 0, 0, 430, 641, '180.00', '180.00', 0, 0, 1, 1),
(6, 4, 1, 'deploy', 0, 0, 546, -117, '180.00', '180.00', 0, 0, 1, 1),
(7, 3, 1, 'jumpIn', 0, 107, -372, -581, '-14.00', '-14.00', 0, 0, 0, 1),
(8, 2, 1, 'jumpIn', 0, 34, -505, -319, '-5.00', '-5.00', 0, 0, 0, 1),
(9, 1, 1, 'jumpIn', 0, 51, -563, 254, '-15.00', '-15.00', 0, 0, 0, 1),
(10, 6, 1, 'jumpIn', 0, 81, 400, 441, '-20.00', '-20.00', 0, 0, 0, 1),
(11, 5, 1, 'jumpIn', 0, 68, 426, 709, '-22.00', '-22.00', 0, 0, 0, 1),
(12, 4, 1, 'jumpIn', 0, 19, 533, -131, '2.00', '2.00', 0, 0, 0, 1),
(13, 6, 1, 'turn', 0, 0, 400, 441, '30.00', '30.00', 30, 86, 1, 1),
(14, 6, 1, 'move', 0, 86, 315, 456, '0.00', '0.00', 0, 0, 1, 1),
(15, 6, 1, 'turn', 0, 0, 315, 456, '15.44', '15.44', 16, 45, 1, 1),
(16, 6, 1, 'move', 0, 69, 246, 449, '0.00', '0.00', 0, 0, 1, 1),
(17, 6, 1, 'turn', 0, 0, 246, 449, '2.76', '2.76', 6, 0, 1, 1),
(18, 5, 1, 'turn', 0, 0, 426, 709, '30.00', '30.00', 30, 86, 1, 1),
(19, 5, 1, 'move', 0, 86, 343, 730, '0.00', '0.00', 0, 0, 1, 1),
(20, 5, 1, 'turn', 0, 0, 343, 730, '25.84', '25.84', 28, 69, 1, 1),
(21, 5, 1, 'move', 0, 69, 275, 716, '0.00', '0.00', 0, 0, 1, 1),
(22, 5, 1, 'turn', 0, 0, 275, 716, '12.00', '12.00', 12, 35, 1, 1),
(23, 4, 1, 'turn', 0, 0, 533, -131, '-9.60', '-9.60', 10, 28, 1, 1),
(24, 4, 1, 'move', 0, 152, 388, -83, '0.00', '0.00', 0, 0, 1, 1),
(25, 4, 1, 'turn', 0, 0, 388, -83, '-20.04', '-20.04', 41, 3, 1, 1),
(26, 4, 1, 'move', 0, 3, 385, -82, '0.00', '0.00', 0, 0, 1, 1),
(27, 3, 1, 'turn', 0, 0, -372, -581, '23.08', '23.08', 24, 58, 1, 1),
(28, 3, 1, 'move', 0, 141, -232, -558, '0.00', '0.00', 0, 0, 1, 1),
(29, 3, 1, 'turn', 0, 0, -232, -558, '30.00', '30.00', 55, 14, 1, 1),
(30, 3, 1, 'move', 0, 14, -219, -552, '0.00', '0.00', 0, 0, 1, 1),
(31, 2, 1, 'move', 0, 155, -352, -346, '0.00', '0.00', 0, 0, 1, 1),
(32, 2, 1, 'turn', 0, 0, -352, -346, '24.12', '24.12', 50, 0, 1, 1),
(33, 1, 1, 'turn', 0, 0, -563, 254, '-30.00', '-30.00', 30, 75, 1, 1),
(34, 1, 1, 'move', 0, 149, -540, 106, '0.00', '0.00', 0, 0, 1, 1),
(35, 1, 1, 'turn', 0, 0, -540, 106, '30.00', '30.00', 50, 25, 1, 1),
(36, 1, 1, 'move', 0, 6, -535, 103, '0.00', '0.00', 0, 0, 1, 1),
(57, 3, 2, 'turn', 0, 0, -219, -552, '30.00', '30.00', 30, 75, 1, 1),
(58, 3, 2, 'move', 0, 147, -180, -410, '0.00', '0.00', 0, 0, 1, 1),
(59, 3, 2, 'move', 0, 8, -175, -403, '0.00', '0.00', 0, 0, 1, 1),
(60, 2, 2, 'turn', 0, 0, -352, -346, '30.00', '30.00', 30, 75, 1, 1),
(61, 2, 2, 'move', 0, 75, -338, -272, '0.00', '0.00', 0, 0, 1, 1),
(62, 2, 2, 'turn', 0, 0, -338, -272, '30.00', '30.00', 30, 75, 1, 1),
(63, 2, 2, 'move', 0, 79, -363, -197, '0.00', '0.00', 0, 0, 1, 1),
(64, 2, 2, 'turn', 0, 0, -363, -197, '-20.00', '-20.00', 20, 50, 1, 1),
(65, 2, 2, 'move', 0, 1, -362, -196, '0.00', '0.00', 0, 0, 1, 1),
(66, 1, 2, 'move', 0, 19, -519, 93, '0.00', '0.00', 0, 0, 1, 1),
(67, 1, 2, 'move', 0, 136, -401, 25, '0.00', '0.00', 0, 0, 1, 1),
(68, 1, 2, 'turn', 0, 0, -401, 25, '30.00', '30.00', 60, 0, 1, 1),
(69, 6, 2, 'turn', 0, 0, 246, 449, '30.00', '30.00', 30, 86, 1, 1),
(70, 6, 2, 'move', 0, 86, 178, 396, '0.00', '0.00', 0, 0, 1, 1),
(71, 6, 2, 'turn', 0, 0, 178, 396, '30.00', '30.00', 36, 69, 1, 1),
(72, 6, 2, 'move', 0, 69, 152, 332, '0.00', '0.00', 0, 0, 1, 1),
(73, 6, 2, 'turn', 0, 0, 152, 332, '-4.00', '-4.00', 4, 12, 1, 1),
(74, 5, 2, 'move', 0, 35, 243, 702, '0.00', '0.00', 0, 0, 1, 1),
(75, 5, 2, 'turn', 0, 0, 243, 702, '27.06', '27.06', 28, 78, 1, 1),
(76, 5, 2, 'move', 0, 120, 167, 609, '0.00', '0.00', 0, 0, 1, 1),
(77, 4, 2, 'move', 0, 86, 317, -29, '0.00', '0.00', 0, 0, 1, 1),
(78, 4, 2, 'turn', 0, 0, 317, -29, '30.00', '30.00', 36, 69, 1, 1),
(79, 4, 2, 'move', 0, 69, 248, -34, '0.00', '0.00', 0, 0, 1, 1),
(104, 3, 3, 'turn', 0, 0, -175, -403, '-16.55', '-16.55', 17, 42, 1, 1),
(105, 3, 3, 'move', 0, 155, -54, -306, '0.00', '0.00', 0, 0, 1, 1),
(106, 3, 3, 'turn', 0, 0, -54, -306, '11.75', '11.75', 24, 0, 1, 1),
(107, 2, 3, 'move', 0, 49, -333, -156, '0.00', '0.00', 0, 0, 1, 1),
(108, 2, 3, 'turn', 0, 0, -333, -156, '-30.00', '-30.00', 30, 75, 1, 1),
(109, 2, 3, 'move', 0, 106, -236, -113, '0.00', '0.00', 0, 0, 1, 1),
(110, 2, 3, 'turn', 0, 0, -236, -113, '-10.26', '-10.26', 22, 0, 1, 1),
(111, 1, 3, 'turn', 0, 0, -401, 25, '30.00', '30.00', 30, 75, 1, 1),
(112, 1, 3, 'move', 0, 153, -341, 166, '0.00', '0.00', 0, 0, 1, 1),
(113, 1, 3, 'move', 0, 2, -339, 167, '0.00', '0.00', 0, 0, 1, 1),
(114, 6, 3, 'move', 0, 12, 147, 321, '0.00', '0.00', 0, 0, 1, 1),
(115, 6, 3, 'turn', 0, 0, 147, 321, '-30.00', '-30.00', 30, 86, 1, 1),
(116, 6, 3, 'move', 0, 86, 76, 273, '0.00', '0.00', 0, 0, 1, 1),
(117, 6, 3, 'turn', 0, 0, 76, 273, '-30.00', '-30.00', 40, 58, 1, 1),
(118, 6, 3, 'move', 0, 57, 19, 269, '0.00', '0.00', 0, 0, 1, 1),
(119, 5, 3, 'speed', 0, 1, 167, 609, '0.00', '0.00', 30, 0, 1, 1),
(120, 5, 3, 'speed', 0, 1, 167, 609, '0.00', '0.00', 30, 0, 1, 1),
(121, 5, 3, 'turn', 0, 0, 167, 609, '-8.00', '-8.00', 10, 29, 1, 1),
(122, 5, 3, 'move', 0, 193, 26, 478, '0.00', '0.00', 0, 0, 1, 1),
(123, 4, 3, 'speed', 0, -1, 248, -34, '0.00', '0.00', 30, 0, 1, 1),
(124, 4, 3, 'speed', 0, -1, 248, -34, '0.00', '0.00', 30, 0, 1, 1),
(125, 4, 3, 'turn', 0, 0, 248, -34, '13.00', '13.00', 10, 28, 1, 1),
(126, 4, 3, 'move', 0, 116, 149, -96, '0.00', '0.00', 0, 0, 1, 1),
(127, 4, 3, 'move', 0, 1, 148, -96, '0.00', '0.00', 0, 0, 1, 1),
(128, 3, 4, 'turn', 0, 0, -54, -306, '-30.00', '-30.00', 30, 75, 1, 0),
(129, 3, 4, 'move', 0, 75, 16, -280, '0.00', '0.00', 0, 0, 1, 0),
(130, 3, 4, 'turn', 0, 0, 16, -280, '-30.00', '-30.00', 30, 75, 1, 0),
(131, 3, 4, 'move', 0, 77, 83, -319, '0.00', '0.00', 0, 0, 1, 0),
(132, 3, 4, 'turn', 0, 0, 83, -319, '20.00', '20.00', 20, 50, 1, 0),
(133, 3, 4, 'move', 0, 3, 86, -318, '0.00', '0.00', 0, 0, 1, 0),
(134, 2, 4, 'turn', 0, 0, -236, -113, '30.00', '30.00', 30, 75, 1, 0),
(135, 2, 4, 'move', 0, 75, -182, -61, '0.00', '0.00', 0, 0, 1, 0),
(136, 2, 4, 'turn', 0, 0, -182, -61, '30.00', '30.00', 30, 75, 1, 0),
(137, 2, 4, 'move', 0, 80, -160, 16, '0.00', '0.00', 0, 0, 1, 0),
(138, 1, 4, 'turn', 0, 0, -339, 167, '30.00', '30.00', 30, 75, 1, 0),
(139, 1, 4, 'move', 0, 75, -301, 232, '0.00', '0.00', 0, 0, 1, 0),
(140, 1, 4, 'turn', 0, 0, -301, 232, '30.00', '30.00', 30, 75, 1, 0),
(141, 1, 4, 'move', 0, 80, -301, 312, '0.00', '0.00', 0, 0, 1, 0);

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
  `unitid` int(5) DEFAULT NULL,
  `structureid` int(5) DEFAULT NULL,
  `systemid` int(3) DEFAULT NULL,
  `turn` int(3) DEFAULT NULL,
  `roll` int(3) DEFAULT NULL,
  `type` varchar(20) DEFAULT NULL,
  `totalDmg` int(5) DEFAULT NULL,
  `shieldDmg` int(5) DEFAULT NULL,
  `armourDmg` int(3) DEFAULT NULL,
  `systemDmg` int(5) NOT NULL DEFAULT '0',
  `hullDmg` int(5) NOT NULL DEFAULT '0',
  `emDmg` int(3) DEFAULT '0',
  `negation` int(4) DEFAULT NULL,
  `destroyed` tinyint(1) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `new` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `damages`
--

INSERT INTO `damages` (`id`, `fireid`, `gameid`, `unitid`, `structureid`, `systemid`, `turn`, `roll`, `type`, `totalDmg`, `shieldDmg`, `armourDmg`, `systemDmg`, `hullDmg`, `emDmg`, `negation`, `destroyed`, `notes`, `new`) VALUES
(1, 17, 1, 1, 11, 1, 2, 0, 'Beam', 168, 0, 16, 0, 40, 0, 16, 0, 'p;', 0),
(2, 12, 1, 1, 7, 1, 2, 0, 'Beam', 172, 0, 16, 0, 41, 0, 16, 0, 'p;', 0),
(3, 11, 1, 1, 7, 1, 2, 0, 'Particle', 32, 0, 15, 0, 17, 0, 15, 0, 'p;', 0),
(4, 12, 1, 1, 7, 4, 2, 0, 'Beam', 172, 0, 16, 20, 21, 0, 16, 0, 'p;c;', 0),
(5, 16, 1, 1, 11, 12, 2, 0, 'Particle', 33, 0, 10, 23, 0, 0, 10, 0, 'p;', 0),
(6, 17, 1, 1, 23, 23, 2, 0, 'Beam', 168, 0, 14, 42, 0, 0, 14, 0, 'p;', 0),
(7, 12, 1, 1, 23, 23, 2, 0, 'Beam', 172, 0, 13, 44, 0, 0, 13, 0, 'p;', 0),
(8, 16, 1, 1, 23, 23, 2, 0, 'Particle', 34, 0, 12, 22, 0, 0, 12, 0, 'p;', 0),
(9, 17, 1, 1, 26, 26, 2, 0, 'Beam', 168, 0, 14, 42, 0, 0, 14, 0, 'p;', 0),
(10, 14, 1, 1, 26, 26, 2, 0, 'Beam', 28, 0, 13, 15, 0, 0, 13, 0, 'p;', 0),
(11, 7, 1, 4, 6, 1, 2, 0, 'Particle', 66, 0, 19, 0, 47, 0, 19, 0, 'p;', 0),
(12, 8, 1, 4, 6, 1, 2, 0, 'Particle', 68, 0, 18, 0, 50, 0, 18, 0, 'p;', 0),
(13, 9, 1, 4, 6, 1, 2, 0, 'Particle', 53, 0, 18, 0, 35, 0, 18, 0, 'p;', 0),
(14, 5, 1, 4, 12, 1, 2, 0, 'Particle', 65, 3, 17, 0, 45, 0, 20, 0, 'p;', 0),
(15, 5, 1, 4, 12, 1, 2, 0, 'Particle', 59, 3, 17, 0, 39, 0, 20, 0, 'p;', 0),
(16, 6, 1, 4, 12, 1, 2, 0, 'Particle', 68, 3, 17, 0, 48, 0, 20, 0, 'p;', 0),
(17, 8, 1, 4, 6, 7, 2, 0, 'Particle', 67, 0, 11, 44, 12, 0, 11, 1, 'p;o3;', 0),
(18, 9, 1, 4, 6, 9, 2, 0, 'Particle', 72, 0, 18, 54, 0, 0, 18, 0, 'p;', 0),
(19, 10, 1, 4, 6, 10, 2, 0, 'Particle', 66, 0, 8, 40, 18, 0, 8, 1, 'p;o4;', 0),
(20, 3, 1, 4, 12, 13, 2, 0, 'Particle', 62, 3, 14, 45, 0, 0, 17, 0, 'p;', 0),
(21, 4, 1, 4, 12, 13, 2, 0, 'Particle', 66, 3, 14, 15, 34, 0, 17, 1, 'p;o6;', 0),
(22, 20, 1, 1, 7, 1, 3, 0, 'Pulse', 103, 0, 56, 0, 47, 0, 14, 0, 'p;v4;', 0),
(23, 19, 1, 1, 7, 8, 3, 0, 'Particle', 37, 0, 9, 28, 0, 0, 9, 0, 'p;', 0),
(24, 21, 1, 1, 7, 10, 3, 0, 'Beam', 30, 0, 8, 22, 0, 0, 8, 0, 'p;', 0),
(25, 22, 1, 1, 23, 23, 3, 0, 'Beam', 31, 0, 12, 19, 0, 0, 12, 0, 'p;', 0),
(26, 24, 1, 1, 26, 26, 3, 0, 'Beam', 28, 0, 12, 16, 0, 0, 12, 0, 'p;', 0),
(27, 32, 1, 6, 6, 1, 3, 0, 'Particle', 45, 3, 19, 0, 23, 0, 22, 0, 'p;', 0),
(28, 32, 1, 6, 6, 3, 3, 0, 'Particle', 54, 3, 19, 20, 12, 0, 22, 0, 'p;c;', 0),
(29, 31, 1, 6, 6, 4, 3, 0, 'Particle', 34, 3, 18, 13, 0, 0, 21, 0, 'p;', 0),
(30, 29, 1, 4, 6, 1, 3, 0, 'Particle', 39, 0, 17, 0, 22, 0, 17, 0, 'p;', 0),
(31, 27, 1, 4, 6, 1, 3, 0, 'Particle', 33, 0, 16, 0, 17, 0, 16, 0, 'p;', 0),
(32, 26, 1, 4, 6, 8, 3, 0, 'Particle', 32, 0, 7, 25, 0, 0, 7, 0, 'p;', 0),
(33, 28, 1, 4, 6, 9, 3, 0, 'Particle', 25, 0, 17, 8, 0, 0, 17, 0, 'p;', 0);

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
  `shots` int(3) NOT NULL DEFAULT '0',
  `req` int(3) NOT NULL DEFAULT '0',
  `notes` varchar(255) NOT NULL DEFAULT '',
  `hits` int(3) NOT NULL DEFAULT '0',
  `resolved` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `fireorders`
--

INSERT INTO `fireorders` (`id`, `gameid`, `turn`, `shooterid`, `targetid`, `x`, `y`, `weaponid`, `shots`, `req`, `notes`, `hits`, `resolved`) VALUES
(1, 1, 1, 6, 1, -540, 103, 13, 1, 32, '46;', 0, 1),
(2, 1, 1, 5, 1, -539, 101, 13, 1, 23, '46;', 0, 1),
(3, 1, 2, 3, 4, 255, -33, 24, 2, 82, '27;87;', 1, 1),
(4, 1, 2, 3, 4, 255, -33, 25, 2, 82, '31;96;', 1, 1),
(5, 1, 2, 3, 4, 255, -33, 27, 2, 82, '20;18;', 2, 1),
(6, 1, 2, 3, 4, 255, -33, 28, 2, 82, '59;100;', 1, 1),
(7, 1, 2, 2, 4, 255, -32, 24, 2, 67, '99;30;', 1, 1),
(8, 1, 2, 2, 4, 255, -32, 25, 2, 67, '47;37;', 2, 1),
(9, 1, 2, 2, 4, 255, -32, 27, 2, 67, '62;18;', 2, 1),
(10, 1, 2, 2, 4, 255, -32, 28, 2, 67, '25;76;', 1, 1),
(11, 1, 2, 6, 1, -409, 21, 11, 2, 67, '-84;61;', 1, 1),
(12, 1, 2, 6, 1, -409, 21, 20, 1, 93, '28;', 1, 1),
(13, 1, 2, 6, 1, -409, 21, 21, 1, 55, '94;', 0, 1),
(14, 1, 2, 6, 1, -409, 21, 22, 1, 55, '39;', 1, 1),
(15, 1, 2, 5, 1, -405, 31, 7, 2, 49, '83;76;', 0, 1),
(16, 1, 2, 5, 1, -405, 31, 11, 2, 49, '27;44;', 2, 1),
(17, 1, 2, 5, 1, -405, 31, 20, 1, 82, '34;', 1, 1),
(18, 1, 2, 4, 3, -171, -403, 13, 1, 50, '85;', 0, 1),
(19, 1, 3, 6, 1, -330, 170, 7, 2, 93, '98;53;', 1, 1),
(20, 1, 3, 6, 1, -330, 170, 8, 1, 86, '42;', 1, 1),
(21, 1, 3, 6, 1, -330, 170, 14, 1, 86, '82;', 1, 1),
(22, 1, 3, 6, 1, -330, 170, 15, 1, 86, '20;', 1, 1),
(23, 1, 3, 5, 1, -331, 161, 21, 1, 26, '59;', 0, 1),
(24, 1, 3, 5, 1, -331, 161, 22, 1, 26, '21;', 1, 1),
(25, 1, 3, 4, 1, -342, 162, 20, 1, 50, '78;', 0, 1),
(26, 1, 3, 3, 4, 152, -91, 8, 1, 71, '61;', 1, 1),
(27, 1, 3, 3, 4, 152, -91, 10, 1, 71, '44;', 1, 1),
(28, 1, 3, 2, 4, 155, -91, 8, 1, 53, '53;', 1, 1),
(29, 1, 3, 2, 4, 155, -91, 10, 1, 53, '11;', 1, 1),
(30, 1, 3, 1, 6, 24, 272, 8, 1, 46, '59;', 0, 1),
(31, 1, 3, 1, 6, 24, 272, 10, 1, 46, '34;', 1, 1),
(32, 1, 3, 1, 6, 24, 272, 24, 2, 46, '11;1;', 2, 1),
(33, 1, 3, 1, 6, 24, 272, 25, 2, 46, '68;48;', 0, 1);

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
  `focusMod` int(3) DEFAULT '100',
  `obstaclesAmount` int(3) NOT NULL DEFAULT '0',
  `nebulaAmount` int(2) NOT NULL DEFAULT '0',
  `obstaclesSizeMin` int(3) NOT NULL DEFAULT '0',
  `obstaclesSizeMax` int(3) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `games`
--

INSERT INTO `games` (`id`, `name`, `status`, `turn`, `phase`, `pv`, `reinforce`, `reinforceTurn`, `reinforceETA`, `reinforceAmount`, `focusMod`, `obstaclesAmount`, `nebulaAmount`, `obstaclesSizeMin`, `obstaclesSizeMax`) VALUES
(1, 'myGame', 'active', 4, -1, 3500, 1500, 11, 3, 10, 10, 5, 3, 75, 150);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `globals`
--

CREATE TABLE `globals` (
  `id` int(4) NOT NULL,
  `playerstatusid` int(4) DEFAULT '0',
  `unitid` int(3) NOT NULL DEFAULT '0',
  `turn` int(4) DEFAULT '0',
  `type` varchar(20) DEFAULT '',
  `scope` int(11) NOT NULL DEFAULT '0',
  `value` decimal(5,2) DEFAULT '0.00',
  `notes` varchar(20) NOT NULL DEFAULT '',
  `text` varchar(50) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `globals`
--

INSERT INTO `globals` (`id`, `playerstatusid`, `unitid`, `turn`, `type`, `scope`, `value`, `notes`, `text`) VALUES
(1, 1, 0, 0, 'Morale', 0, '100.00', '', ''),
(2, 2, 0, 0, 'Morale', 0, '100.00', '', '');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `loads`
--

CREATE TABLE `loads` (
  `id` int(4) NOT NULL,
  `unitid` int(5) DEFAULT NULL,
  `systemid` int(3) DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL,
  `amount` int(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `missions`
--

CREATE TABLE `missions` (
  `id` int(4) NOT NULL,
  `unitid` int(4) NOT NULL DEFAULT '0',
  `type` varchar(20) NOT NULL DEFAULT '1',
  `turn` int(1) NOT NULL DEFAULT '0',
  `phase` int(1) DEFAULT '0',
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
  `morale` int(4) NOT NULL DEFAULT '0',
  `value` int(5) DEFAULT NULL,
  `maxFocus` int(4) DEFAULT '0',
  `gainFocus` int(4) DEFAULT '0',
  `curFocus` int(4) DEFAULT '0',
  `status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `playerstatus`
--

INSERT INTO `playerstatus` (`id`, `userid`, `gameid`, `turn`, `phase`, `faction`, `morale`, `value`, `maxFocus`, `gainFocus`, `curFocus`, `status`) VALUES
(1, 1, 1, 4, -1, 'Vree Conglomerate', 2325, 2675, 1540, 385, 765, 'ready'),
(2, 2, 1, 4, -1, 'Earth Alliance', 2325, 2675, 1540, 385, 765, 'waiting');

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
(1, 6, 10, 1, '0', 0),
(2, 6, 13, 1, '1', 4),
(3, 6, 14, 1, '-1', 0),
(4, 6, 15, 1, '-1', 0),
(5, 6, 21, 1, '-1', 0),
(6, 6, 22, 1, '-1', 0),
(7, 6, 4, 1, '1', 4),
(8, 5, 8, 1, '0', 0),
(9, 5, 13, 1, '1', 4),
(10, 5, 14, 1, '-1', 0),
(11, 5, 15, 1, '-1', 0),
(12, 5, 21, 1, '-1', 0),
(13, 5, 22, 1, '-1', 0),
(14, 5, 4, 1, '1', 4),
(15, 4, 10, 1, '0', 0),
(16, 4, 13, 1, '1', 4),
(17, 4, 14, 1, '-1', 0),
(18, 4, 15, 1, '-1', 0),
(19, 4, 21, 1, '-1', 0),
(20, 4, 22, 1, '-1', 0),
(21, 4, 4, 1, '1', 4),
(22, 6, 14, 2, '-2', 0),
(23, 6, 15, 2, '-2', 0),
(24, 6, 19, 2, '1', 4),
(25, 6, 21, 2, '-2', 0),
(26, 6, 22, 2, '-2', 0),
(27, 5, 6, 2, '1', 4),
(28, 5, 14, 2, '-1', 0),
(29, 5, 15, 2, '-1', 0),
(30, 5, 21, 2, '-1', 0),
(31, 5, 22, 2, '-1', 0),
(32, 4, 12, 2, '1', 4),
(33, 4, 14, 2, '-1', 0),
(34, 4, 15, 2, '-1', 0),
(35, 4, 21, 2, '-1', 0),
(36, 4, 22, 2, '-1', 0),
(37, 2, 9, 2, '0', 0),
(38, 2, 13, 2, '0', 0),
(39, 2, 17, 2, '0', 0),
(40, 2, 21, 2, '0', 0),
(41, 2, 6, 2, '1', 8),
(42, 6, 6, 3, '1', 4),
(43, 6, 14, 3, '-2', 0),
(44, 6, 15, 3, '-2', 0),
(45, 6, 21, 3, '-2', 0),
(46, 6, 22, 3, '-2', 0),
(47, 5, 14, 3, '-2', 0),
(48, 5, 15, 3, '-2', 0),
(49, 5, 21, 3, '-2', 0),
(50, 5, 22, 3, '-2', 0),
(51, 5, 4, 3, '1', 4),
(52, 4, 14, 3, '-2', 0),
(53, 4, 15, 3, '-2', 0),
(54, 4, 20, 3, '1', 4),
(55, 4, 21, 3, '-2', 0),
(56, 4, 22, 3, '-2', 0),
(57, 1, 9, 3, '0', 0),
(58, 1, 13, 3, '0', 0),
(59, 1, 17, 3, '0', 0),
(60, 1, 21, 3, '0', 0),
(61, 1, 6, 3, '1', 8),
(62, 1, 9, 4, '0', 0),
(63, 1, 13, 4, '0', 0),
(64, 1, 17, 4, '0', 0),
(65, 1, 21, 4, '0', 0),
(66, 1, 27, 4, '1', 4),
(67, 1, 28, 4, '1', 4);

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
(1, 3, 4, 1, '0.29', 800, 1),
(2, 2, 4, 1, '359.52', 844, 1),
(3, 1, 4, 1, '359.40', 959, 1),
(4, 6, 4, 1, '8.43', 846, 0),
(5, 5, 4, 1, '9.23', 854, 0),
(6, 4, 4, 1, '7.32', 926, 0),
(7, 6, 4, 2, '318.10', 679, 0),
(8, 5, 4, 2, '349.88', 846, 0),
(9, 4, 4, 2, '23.50', 594, 0),
(10, 3, 4, 2, '346.99', 692, 0),
(11, 2, 4, 2, '321.57', 680, 0),
(12, 1, 4, 2, '-1.00', 106, 0),
(13, 6, 4, 3, '27.36', 431, 0),
(14, 5, 4, 3, '6.47', 585, 0),
(15, 4, 4, 3, '326.91', 516, 0),
(16, 3, 4, 3, '0.42', 391, 1),
(17, 2, 4, 3, '356.08', 417, 1),
(18, 1, 4, 3, '11.20', 587, 1),
(19, 3, 4, 4, '89.62', 325, 1),
(20, 2, 4, 4, '263.95', 304, 1),
(21, 1, 4, 4, '281.51', 275, 0);

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

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `systemcrits`
--

CREATE TABLE `systemcrits` (
  `id` int(4) NOT NULL,
  `unitid` int(4) DEFAULT NULL,
  `systemid` int(4) DEFAULT NULL,
  `turn` int(3) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `duration` int(3) DEFAULT NULL,
  `value` decimal(5,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `systemcrits`
--

INSERT INTO `systemcrits` (`id`, `unitid`, `systemid`, `turn`, `type`, `duration`, `value`) VALUES
(1, 1, 2, 2, '', 0, '0.00'),
(2, 1, 4, 2, 'Output', 0, '-15.00'),
(3, 1, 12, 2, 'Accuracy', 0, '-25.00'),
(4, 1, 24, 2, 'Damage', 0, '-25.00'),
(5, 1, 25, 2, 'Damage', 0, '-25.00'),
(6, 4, 2, 2, 'Morale', -2, '-15.00'),
(7, 4, 5, 2, 'Overload', 0, '-10.72'),
(8, 1, 8, 3, 'Damage', 0, '-25.00'),
(9, 6, 3, 3, 'Output', 0, '-15.00'),
(10, 4, 8, 3, 'Accuracy', 0, '-25.00');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `units`
--

CREATE TABLE `units` (
  `id` int(3) NOT NULL,
  `gameid` int(3) DEFAULT '0',
  `userid` int(3) DEFAULT '0',
  `type` int(1) NOT NULL DEFAULT '0',
  `name` varchar(255) NOT NULL DEFAULT '',
  `callsign` varchar(40) NOT NULL DEFAULT '',
  `totalCost` int(4) NOT NULL DEFAULT '0',
  `moraleCost` int(4) NOT NULL DEFAULT '0',
  `status` varchar(255) NOT NULL DEFAULT '',
  `command` tinyint(4) DEFAULT '0',
  `available` int(3) DEFAULT '0',
  `withdraw` int(2) NOT NULL DEFAULT '0',
  `manual` tinyint(4) NOT NULL DEFAULT '0',
  `destroyed` tinyint(1) DEFAULT '0',
  `x` int(4) DEFAULT '0',
  `y` int(4) DEFAULT '0',
  `heading` decimal(5,2) NOT NULL DEFAULT '0.00',
  `facing` decimal(5,2) NOT NULL DEFAULT '0.00',
  `delay` int(4) NOT NULL DEFAULT '0',
  `thrust` int(3) DEFAULT '0',
  `rolling` int(2) DEFAULT '0',
  `rolled` int(2) DEFAULT '0',
  `flipped` int(2) DEFAULT '0',
  `turn` int(1) DEFAULT '0',
  `phase` int(1) DEFAULT '0',
  `focus` tinyint(4) DEFAULT '0',
  `notes` varchar(50) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `units`
--

INSERT INTO `units` (`id`, `gameid`, `userid`, `type`, `name`, `callsign`, `totalCost`, `moraleCost`, `status`, `command`, `available`, `withdraw`, `manual`, `destroyed`, `x`, `y`, `heading`, `facing`, `delay`, `thrust`, `rolling`, `rolled`, `flipped`, `turn`, `phase`, `focus`, `notes`) VALUES
(1, 1, 1, 4, 'Xill', 'A', 775, 775, 'bought', 1, 1, 0, 0, 0, -339, 167, '30.00', '30.00', 0, 155, 0, 0, 0, 3, 3, 1, ''),
(2, 1, 1, 4, 'Xill', 'B', 775, 775, 'bought', 0, 1, 0, 0, 0, -236, -113, '13.86', '13.86', 0, 155, 0, 0, 0, 3, 3, 0, ''),
(3, 1, 1, 4, 'Xill', 'C', 775, 775, 'bought', 0, 1, 0, 0, 0, -54, -306, '50.28', '50.28', 0, 155, 0, 0, 0, 3, 3, 0, ''),
(4, 1, 2, 4, 'Hyperion', '', 775, 775, 'bought', 1, 1, 0, 0, 0, 148, -96, '197.36', '197.36', 0, 117, 0, 0, 0, 3, 3, 0, ''),
(5, 1, 2, 4, 'Hyperion', '', 775, 775, 'bought', 0, 1, 0, 0, 0, 26, 478, '222.90', '222.90', 0, 193, 0, 0, 0, 3, 3, 1, ''),
(6, 1, 2, 4, 'Hyperion', '', 775, 775, 'bought', 0, 1, 0, 0, 0, 19, 269, '184.20', '184.20', 1, 155, 0, 0, 0, 3, 3, 0, ''),
(7, 1, 0, 0, 'NebulaCloud', '', 0, 0, 'deployed', 0, 0, 0, 0, 0, -279, -411, '0.00', '0.00', 0, 0, 0, 0, 0, 1, -1, 0, '102;18;87;5'),
(8, 1, 0, 0, 'NebulaCloud', '', 0, 0, 'deployed', 0, 0, 0, 0, 0, 53, -307, '0.00', '0.00', 0, 0, 0, 0, 0, 1, -1, 0, '106;17;17;6'),
(9, 1, 0, 0, 'NebulaCloud', '', 0, 0, 'deployed', 0, 0, 0, 0, 0, -133, -16, '0.00', '0.00', 0, 0, 0, 0, 0, 1, -1, 0, '114;19;272;6'),
(10, 1, 0, 0, 'AsteroidField', '', 0, 0, 'deployed', 0, 0, 0, 0, 0, -64, 59, '0.00', '0.00', 0, 0, 0, 0, 0, 1, -1, 0, '0;25;132;56;168;2;15'),
(11, 1, 0, 0, 'AsteroidField', '', 0, 0, 'deployed', 0, 0, 0, 0, 0, 304, 224, '0.00', '0.00', 0, 0, 0, 0, 0, 1, -1, 0, '0;20;310;47;188;1;12'),
(12, 1, 0, 0, 'AsteroidField', '', 0, 0, 'deployed', 0, 0, 0, 0, 0, -565, -349, '0.00', '0.00', 0, 0, 0, 0, 0, 1, -1, 0, '0;15;333;46;138;3;16'),
(13, 1, 0, 0, 'AsteroidField', '', 0, 0, 'deployed', 0, 0, 0, 0, 0, -170, -477, '0.00', '0.00', 0, 0, 0, 0, 0, 1, -1, 0, '0;25;349;66;198;2;15'),
(14, 1, 0, 0, 'AsteroidField', '', 0, 0, 'deployed', 0, 0, 0, 0, 0, 615, -434, '0.00', '0.00', 0, 0, 0, 0, 0, 1, -1, 0, '0;15;182;44;132;3;14');

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
-- Indizes für die Tabelle `globals`
--
ALTER TABLE `globals`
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
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=142;
--
-- AUTO_INCREMENT für Tabelle `chat`
--
ALTER TABLE `chat`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `damages`
--
ALTER TABLE `damages`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;
--
-- AUTO_INCREMENT für Tabelle `fireorders`
--
ALTER TABLE `fireorders`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;
--
-- AUTO_INCREMENT für Tabelle `games`
--
ALTER TABLE `games`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT für Tabelle `globals`
--
ALTER TABLE `globals`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT für Tabelle `loads`
--
ALTER TABLE `loads`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `missions`
--
ALTER TABLE `missions`
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
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;
--
-- AUTO_INCREMENT für Tabelle `sensors`
--
ALTER TABLE `sensors`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
--
-- AUTO_INCREMENT für Tabelle `subunits`
--
ALTER TABLE `subunits`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `systemcrits`
--
ALTER TABLE `systemcrits`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT für Tabelle `units`
--
ALTER TABLE `units`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

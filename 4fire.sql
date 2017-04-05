-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 02. Apr 2017 um 21:32
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
(1, 3, 1, 'deploy', 0, 634, -9, 180, 0, 0, 1, 1),
(2, 4, 1, 'deploy', 0, 775, -165, 180, 0, 0, 1, 1),
(3, 5, 1, 'deploy', 0, 736, 179, 180, 0, 0, 1, 1),
(4, 1, 1, 'deploy', 0, -665, -146, 25, 0, 0, 1, 1),
(5, 2, 1, 'deploy', 0, -700, 43, 0, 0, 0, 1, 1),
(6, 1, 1, 'speedChange', -1, -665, -146, 0, 130, 0, 1, 1),
(7, 1, 1, 'move', 130, -547, -91, 0, 0, 0, 1, 1),
(8, 2, 1, 'speedChange', -1, -700, 43, 0, 49, 0, 1, 1),
(9, 2, 1, 'move', 150, -550, 43, 0, 0, 0, 1, 1),
(10, 3, 1, 'move', 145, 489, -9, 0, 0, 0, 1, 1),
(11, 4, 1, 'move', 165, 610, -165, 0, 0, 0, 1, 1),
(12, 5, 1, 'move', 185, 551, 179, 0, 0, 0, 1, 1),
(13, 6, 2, 'deploy', 0, 483, -68, -96, 0, 0, 1, 1),
(14, 7, 2, 'deploy', 0, 482, 56, 96, 0, 0, 1, 1),
(15, 9, 2, 'deploy', 0, -486, -109, -17, 0, 0, 1, 1),
(16, 10, 2, 'deploy', 0, -516, -31, 62, 0, 0, 1, 1),
(17, 12, 2, 'launch', 0, -515, 53, 0, 0, 0, 0, 1),
(18, 13, 2, 'launch', 0, -533, 44, 0, 0, 0, 0, 1),
(19, 14, 2, 'launch', 0, 592, -155, 0, 0, 0, 0, 1),
(20, 1, 2, 'speedChange', -1, -547, -91, 0, 117, 0, 1, 1),
(21, 1, 2, 'move', 115, -443, -42, 0, 0, 0, 1, 1),
(22, 2, 2, 'speedChange', -1, -550, 43, 0, 45, 0, 1, 1),
(23, 2, 2, 'move', 135, -415, 43, 0, 0, 0, 1, 1),
(24, 3, 2, 'move', 145, 344, -9, 0, 0, 0, 1, 1),
(25, 4, 2, 'move', 165, 445, -165, 0, 0, 0, 1, 1),
(26, 5, 2, 'move', 185, 366, 179, 0, 0, 0, 1, 1),
(27, 6, 2, 'move', 125, 472, -193, 0, 0, 0, 1, 1),
(28, 6, 2, 'turn', 0, 472, -193, -30, 11, 32, 1, 1),
(29, 6, 2, 'turn', 0, 472, -193, -30, 11, 32, 1, 1),
(30, 6, 2, 'move', 85, 394, -228, 0, 0, 0, 1, 1),
(31, 6, 2, 'turn', 0, 394, -228, -30, 11, 32, 1, 1),
(32, 7, 2, 'move', 138, 470, 194, 0, 0, 0, 1, 1),
(33, 7, 2, 'turn', 0, 470, 194, 30, 11, 32, 1, 1),
(34, 7, 2, 'turn', 0, 470, 194, 30, 11, 32, 1, 1),
(35, 7, 2, 'move', 64, 412, 220, 0, 0, 0, 1, 1),
(36, 7, 2, 'turn', 0, 412, 220, 30, 11, 32, 1, 1),
(37, 7, 2, 'move', 8, 404, 219, 0, 0, 0, 1, 1),
(38, 9, 2, 'speedChange', -1, -486, -109, 0, 13, 0, 1, 1),
(39, 9, 2, 'move', 119, -376, -155, 0, 0, 0, 1, 1),
(40, 9, 2, 'turn', 0, -376, -155, 30, 12, 36, 1, 1),
(41, 9, 2, 'move', 76, -302, -138, 0, 0, 0, 1, 1),
(42, 10, 2, 'move', 152, -448, 105, 0, 0, 0, 1, 1),
(43, 10, 2, 'turn', 0, -448, 105, -30, 13, 38, 1, 1),
(44, 10, 2, 'turn', 0, -448, 105, -30, 13, 38, 1, 1),
(45, 10, 2, 'move', 58, -390, 107, 0, 0, 0, 1, 1),
(46, 14, 2, 'move', 0, 378, -132, 0, 0, 0, 0, 1),
(47, 13, 2, 'move', 0, -353, 33, 0, 0, 0, 0, 1),
(48, 12, 2, 'move', 0, -297, 84, 0, 0, 0, 0, 1),
(49, 16, 3, 'launch', 0, -385, 58, 0, 0, 0, 0, 1),
(50, 17, 3, 'launch', 0, -382, 31, 0, 0, 0, 0, 1),
(51, 18, 3, 'launch', 0, 357, 170, 0, 0, 0, 0, 1),
(52, 3, 3, 'speedChange', -1, 344, -9, 0, 165, 0, 1, 1),
(53, 3, 3, 'move', 130, 214, -9, 0, 0, 0, 1, 1),
(54, 4, 3, 'move', 165, 280, -165, 0, 0, 0, 1, 1),
(55, 5, 3, 'speedChange', -1, 366, 179, 0, 10, 0, 1, 1),
(56, 5, 3, 'turn', 0, 366, 179, 25, 6, 45, 1, 1),
(57, 5, 3, 'move', 170, 212, 107, 0, 0, 0, 1, 1),
(58, 1, 3, 'move', 115, -339, 7, 0, 0, 0, 1, 1),
(59, 2, 3, 'speedChange', -1, -415, 43, 0, 40, 0, 1, 1),
(60, 2, 3, 'turn', 0, -415, 43, -25, 37, 75, 1, 1),
(61, 2, 3, 'move', 120, -306, -8, 0, 0, 0, 1, 1),
(62, 9, 3, 'speedChange', -1, -302, -138, 0, 12, 0, 1, 1),
(63, 9, 3, 'move', 180, -127, -98, 0, 0, 0, 1, 1),
(64, 10, 3, 'speedChange', -1, -390, 107, 0, 13, 0, 1, 1),
(65, 10, 3, 'move', 195, -195, 114, 0, 0, 0, 1, 1),
(66, 6, 3, 'speedChange', -1, 394, -228, 0, 11, 0, 1, 1),
(67, 6, 3, 'move', 195, 200, -208, 0, 0, 0, 1, 1),
(68, 7, 3, 'move', 173, 231, 231, 0, 0, 0, 1, 1),
(69, 7, 3, 'turn', 0, 231, 231, 30, 11, 32, 1, 1),
(70, 7, 3, 'move', 37, 201, 209, 0, 0, 0, 1, 1),
(71, 18, 3, 'move', 0, 135, 80, 0, 0, 0, 0, 1),
(72, 17, 3, 'move', 0, -70, -40, 0, 0, 0, 0, 1),
(73, 14, 3, 'move', 0, 167, -91, 0, 0, 0, 0, 1),
(74, 13, 3, 'move', 0, -173, 20, 0, 0, 0, 0, 1),
(75, 12, 3, 'move', 0, -77, 94, 0, 0, 0, 0, 1),
(76, 16, 3, 'move', 0, -75, 138, 0, 0, 0, 0, 1),
(77, 20, 4, 'launch', 0, -285, -1, 0, 0, 0, 0, 1),
(78, 21, 4, 'launch', 0, -272, -9, 0, 0, 0, 0, 1),
(79, 22, 4, 'launch', 0, 276, -150, 0, 0, 0, 0, 1),
(80, 3, 4, 'turn', 0, 214, -9, 25, 221, 161, 1, 1),
(81, 3, 4, 'move', 130, 96, -64, 0, 0, 0, 1, 1),
(82, 4, 4, 'move', 119, 161, -174, 0, 0, 0, 1, 1),
(83, 4, 4, 'turn', 0, 161, -174, -25, 31, 86, 2.4, 1),
(84, 4, 4, 'move', 46, 119, -155, 0, 0, 0, 1, 1),
(85, 5, 4, 'speedChange', -1, 212, 107, 0, 9, 0, 1, 1),
(86, 5, 4, 'turn', 0, 212, 107, 25, 5, 41, 1, 1),
(87, 5, 4, 'move', 155, 112, -12, 0, 0, 0, 1, 1),
(88, 1, 4, 'move', 115, -235, 56, 0, 0, 0, 1, 1),
(89, 2, 4, 'turn', 0, -306, -8, 25, 37, 75, 1, 1),
(90, 2, 4, 'move', 75, -231, -8, 0, 0, 0, 1, 1),
(91, 2, 4, 'turn', 0, -231, -8, 25, 37, 75, 1, 1),
(92, 2, 4, 'move', 45, -190, 11, 0, 0, 0, 1, 1),
(93, 9, 4, 'turn', 0, -127, -98, 30, 11, 33, 1, 1),
(94, 9, 4, 'turn', 0, -127, -98, 30, 11, 33, 1, 1),
(95, 9, 4, 'move', 108, -114, 10, 0, 0, 0, 1, 1),
(96, 9, 4, 'turn', 0, -114, 10, -30, 11, 33, 1, 1),
(97, 9, 4, 'turn', 0, -114, 10, -30, 11, 33, 1, 1),
(98, 9, 4, 'move', 72, -44, 26, 0, 0, 0, 1, 1),
(99, 9, 4, 'turn', 0, -44, 26, -30, 11, 33, 1, 1),
(100, 10, 4, 'speedChange', -1, -195, 114, 0, 12, 0, 1, 1),
(101, 10, 4, 'move', 144, -51, 111, 0, 0, 0, 1, 1),
(102, 10, 4, 'turn', 0, -51, 111, -30, 11, 33, 1, 1),
(103, 10, 4, 'move', 36, -19, 94, 0, 0, 0, 1, 1),
(104, 6, 4, 'speedChange', -1, 200, -208, 0, 10, 0, 1, 1),
(105, 6, 4, 'move', 180, 21, -189, 0, 0, 0, 1, 1),
(106, 6, 4, 'turn', 0, 21, -189, -30, 10, 28, 1, 1),
(107, 7, 4, 'speedChange', -1, 201, 209, 0, 11, 0, 1, 1),
(108, 7, 4, 'speedChange', -1, 201, 209, 0, 10, 0, 1, 1),
(109, 7, 4, 'move', 99, 128, 142, 0, 0, 0, 1, 1),
(110, 7, 4, 'turn', 0, 128, 142, -30, 10, 28, 1, 1),
(111, 7, 4, 'move', 81, 47, 134, 0, 0, 0, 1, 1);

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
(1, 1, 1, 1, 1, -1, 1, 37, 'Particle', 77, 0, 45, 32, '0', 32, 0, '', 0),
(2, 15, 1, 1, 1, -1, 2, 13, 'Particle', 78, 0, 48, 30, '0', 30, 0, '', 0),
(3, 20, 1, 1, 21, -1, 2, 12, 'Particle', 74, 0, 46, 28, '0', 28, 0, '', 0),
(4, 25, 1, 1, 1, -1, 3, 64, 'Particle', 64, 0, 36, 28, '0', 28, 0, '', 0),
(5, 26, 1, 1, 1, -1, 3, 42, 'Particle', 58, 0, 32, 26, '0', 26, 0, '', 0),
(6, 27, 1, 1, 1, 5, 3, 68, 'Particle', 75, 0, 57, 18, '0', 18, 1, '', 0),
(7, 29, 1, 1, 21, 24, 3, 50, 'Particle', 56, 0, 42, 14, '0', 14, 0, '', 0),
(8, 31, 1, 1, 21, 24, 3, 34, 'Particle', 38, 0, 25, 13, '0', 13, 0, '', 0),
(9, 33, 1, 3, 1, -1, 3, 31, 'Matter', 50, 0, 33, 17, '0', 34, 0, '', 0),
(10, 35, 1, 3, 1, 2, 3, 13, 'Pulse', 19, 0, 0, 19, '0', 23, 0, '', 0),
(11, 35, 1, 3, 1, 2, 3, 13, 'Pulse', 18, 0, 0, 18, '0', 23, 0, '', 0),
(12, 35, 1, 3, 1, 2, 3, 13, 'Pulse', 18, 0, 0, 18, '0', 22, 0, '', 0),
(13, 36, 1, 3, 1, -1, 3, 13, 'Pulse', 22, 0, 0, 22, '0', 31, 0, '', 0),
(14, 36, 1, 3, 1, -1, 3, 13, 'Pulse', 23, 0, 0, 23, '0', 30, 0, '', 0),
(15, 36, 1, 3, 1, -1, 3, 13, 'Pulse', 24, 0, 0, 24, '0', 29, 0, '', 0);

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

--
-- Daten für Tabelle `dogfights`
--

INSERT INTO `dogfights` (`id`, `gameid`, `turn`, `a`, `b`) VALUES
(1, 1, 4, 10, 7);

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
(1, 6, 8, 'Sentri'),
(2, 7, 8, 'Sentri'),
(3, 9, 12, 'Aurora'),
(4, 10, 12, 'Aurora');

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
(1, 1, 1, 3, 1, 2, 1, 45, ' 37', 1, 1),
(2, 1, 1, 3, 1, 3, 1, 45, ' 69', 0, 1),
(3, 1, 1, 3, 1, 4, 1, 45, ' 47', 0, 1),
(4, 1, 1, 3, 1, 5, 1, 45, ' 79', 0, 1),
(5, 1, 1, 4, 1, 2, 1, 38, ' 73', 0, 1),
(6, 1, 1, 4, 1, 4, 1, 38, ' 53', 0, 1),
(7, 1, 2, 3, 0, 11, 0, 0, '', 0, 1),
(8, 1, 2, 3, 0, 21, 0, 0, '', 0, 1),
(9, 1, 2, 4, 1, 3, 4, 0, '', 0, 1),
(10, 1, 2, 1, 0, 9, 0, 0, '', 0, 1),
(11, 1, 2, 1, 0, 24, 0, 0, '', 0, 1),
(12, 1, 2, 2, 3, 3, 4, 0, '', 0, 1),
(13, 1, 2, 2, 5, 7, 3, 0, '', 0, 1),
(14, 1, 2, 2, 4, 13, 3, 0, '', 0, 1),
(15, 1, 2, 3, 1, 2, 1, 63, ' 13', 1, 1),
(16, 1, 2, 3, 1, 3, 1, 63, ' 77', 0, 1),
(17, 1, 2, 3, 1, 4, 1, 63, ' 93', 0, 1),
(18, 1, 2, 3, 1, 5, 1, 63, ' 65', 0, 1),
(19, 1, 2, 4, 1, 2, 1, 57, ' 98', 0, 1),
(20, 1, 2, 4, 1, 4, 1, 57, ' 12', 1, 1),
(21, 1, 3, 2, 7, 6, 3, 0, '', 0, 1),
(22, 1, 3, 2, 14, 12, 3, 0, '', 0, 1),
(23, 1, 3, 5, 13, 3, 2, 0, '', 0, 1),
(24, 1, 3, 3, 1, 2, 1, 80, ' 85', 0, 1),
(25, 1, 3, 3, 1, 3, 1, 80, ' 64', 1, 1),
(26, 1, 3, 3, 1, 4, 1, 80, ' 42', 1, 1),
(27, 1, 3, 3, 1, 5, 1, 80, ' 68', 1, 1),
(28, 1, 3, 4, 1, 2, 1, 76, ' 87', 0, 1),
(29, 1, 3, 4, 1, 4, 1, 76, ' 50', 1, 1),
(30, 1, 3, 4, 1, 6, 2, 37, ' 51 50', 0, 1),
(31, 1, 3, 4, 1, 9, 2, 37, ' 34 50', 1, 1),
(32, 1, 3, 1, 3, 2, 3, 21, '33 ', 0, 1),
(33, 1, 3, 1, 3, 3, 1, 49, ' 31', 1, 1),
(34, 1, 3, 1, 3, 4, 1, 49, ' 99', 0, 1),
(35, 1, 3, 1, 3, 5, 3, 21, '13 ', 3, 1),
(36, 1, 3, 1, 3, 18, 3, 21, '13 ', 3, 1),
(37, 1, 3, 1, 3, 19, 3, 21, '33 ', 0, 1),
(38, 1, 3, 1, 3, 22, 3, 21, '35 ', 0, 1),
(39, 1, 3, 1, 3, 23, 3, 21, '38 ', 0, 1),
(40, 1, 4, 2, 3, 3, 4, 0, '', 0, 1),
(41, 1, 4, 2, 5, 7, 3, 0, '', 0, 1),
(42, 1, 4, 4, 10, 3, 4, 0, '', 0, 1),
(43, 1, 4, 10, 7, 2, 1, 0, '', 0, 0),
(44, 1, 4, 10, 7, 4, 1, 0, '', 0, 0),
(45, 1, 4, 10, 7, 6, 1, 0, '', 0, 0),
(46, 1, 4, 10, 7, 8, 1, 0, '', 0, 0),
(47, 1, 4, 10, 7, 10, 1, 0, '', 0, 0),
(48, 1, 4, 10, 7, 12, 1, 0, '', 0, 0),
(49, 1, 4, 10, 7, 14, 1, 0, '', 0, 0),
(50, 1, 4, 10, 7, 16, 1, 0, '', 0, 0),
(51, 1, 4, 10, 7, 18, 1, 0, '', 0, 0),
(52, 1, 4, 10, 7, 20, 1, 0, '', 0, 0),
(53, 1, 4, 10, 7, 22, 1, 0, '', 0, 0),
(54, 1, 4, 10, 7, 24, 1, 0, '', 0, 0),
(55, 1, 4, 7, 10, 2, 1, 0, '', 0, 0),
(56, 1, 4, 7, 10, 4, 1, 0, '', 0, 0),
(57, 1, 4, 7, 10, 6, 1, 0, '', 0, 0),
(58, 1, 4, 7, 10, 8, 1, 0, '', 0, 0),
(59, 1, 4, 7, 10, 10, 1, 0, '', 0, 0),
(60, 1, 4, 7, 10, 12, 1, 0, '', 0, 0),
(61, 1, 4, 7, 10, 14, 1, 0, '', 0, 0),
(62, 1, 4, 7, 10, 16, 1, 0, '', 0, 0);

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
(1, 'myGame', 'active', 4, 2, 5000, 500);

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
(3, 2, 3, 'Zeus', 20),
(4, 2, 6, 'Barracuda', 20),
(5, 2, 7, 'Myrmidon', 20),
(6, 2, 12, 'Barracuda', 20),
(7, 2, 13, 'Myrmidon', 20),
(10, 4, 3, 'Javelin', 14),
(11, 5, 3, 'Hasta', 8);

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
(1, 1, 1, 4, 2, 'Earth Alliance', 3044, 'waiting'),
(2, 2, 1, 4, 2, 'Centauri Republic', 3368, 'waiting');

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
(1, 4, 3, 2, '3', 0),
(2, 2, 3, 2, '3', 0),
(3, 2, 7, 2, '2', 0),
(4, 2, 13, 2, '2', 0),
(5, 2, 6, 3, '2', 0),
(6, 2, 12, 3, '2', 0),
(7, 5, 3, 3, '1', 0),
(8, 2, 3, 4, '3', 0),
(9, 2, 7, 4, '2', 0),
(10, 3, 11, 4, '0', 0),
(11, 3, 21, 4, '0', 0),
(12, 3, 24, 4, '1', 10),
(13, 4, 3, 4, '3', 0);

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
(2, 1, 1, 'Artemis', 4, 475),
(3, 1, 2, 'Demos', 2, 600),
(5, 1, 1, 'Avenger', 3, 450),
(6, 1, 1, 'Tethys', 4, 300),
(8, 1, 2, 'Primus', 2, 1080);

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
(1, 1, 24, 3, 'launch1', 0);

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
(1, 1, 1, 1, 0, 'Avenger', 'deployed', 1, 0),
(2, 1, 1, 1, 0, 'Saggitarius', 'deployed', 1, 0),
(3, 1, 2, 1, 0, 'Primus', 'deployed', 1, 0),
(4, 1, 2, 1, 0, 'Demos', 'deployed', 1, 0),
(5, 1, 2, 1, 0, 'Vorchan', 'deployed', 1, 0),
(6, 1, 2, 0, 0, 'Flight', 'bought', 2, 0),
(7, 1, 2, 0, 0, 'Flight', 'bought', 2, 0),
(8, 1, 2, 1, 0, 'Haven', 'bought', 6, 0),
(9, 1, 1, 0, 0, 'Flight', 'bought', 2, 0),
(10, 1, 1, 0, 0, 'Flight', 'bought', 2, 0),
(11, 1, 1, 1, 0, 'Tethys', 'bought', 5, 0),
(12, 1, 1, 5, 1, 'Myrmidon', 'launched', 6, 0),
(13, 1, 1, 3, 1, 'Zeus', 'launched', 4, 0),
(14, 1, 2, 1, 1, 'Javelin', 'launched', 4, 0),
(15, 1, 2, 1, 0, 'Haven', 'bought', 7, 0),
(16, 1, 1, 7, 1, 'Barracuda', 'launched', 3, 0),
(17, 1, 1, 14, 1, 'Barracuda', 'launched', 3, 0),
(18, 1, 2, 13, 1, 'Hasta', 'launched', 2, 0),
(19, 1, 1, 1, 0, 'Hyperion', 'bought', 6, 0),
(20, 1, 1, 3, 1, 'Zeus', 'launched', 4, 0),
(21, 1, 1, 5, 1, 'Myrmidon', 'launched', 3, 0),
(22, 1, 2, 2, 1, 'Javelin', 'launched', 4, 0);

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
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=112;
--
-- AUTO_INCREMENT für Tabelle `damages`
--
ALTER TABLE `damages`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT für Tabelle `dogfights`
--
ALTER TABLE `dogfights`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT für Tabelle `fighters`
--
ALTER TABLE `fighters`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT für Tabelle `fireorders`
--
ALTER TABLE `fireorders`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;
--
-- AUTO_INCREMENT für Tabelle `games`
--
ALTER TABLE `games`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT für Tabelle `loads`
--
ALTER TABLE `loads`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT für Tabelle `playerstatus`
--
ALTER TABLE `playerstatus`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT für Tabelle `powers`
--
ALTER TABLE `powers`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT für Tabelle `reinforcements`
--
ALTER TABLE `reinforcements`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT für Tabelle `systemcrits`
--
ALTER TABLE `systemcrits`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT für Tabelle `units`
--
ALTER TABLE `units`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

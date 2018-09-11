-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 10. Sep 2018 um 23:32
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
  `forced` tinyint(4) NOT NULL DEFAULT '0',
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

INSERT INTO `actions` (`id`, `shipid`, `turn`, `type`, `forced`, `dist`, `x`, `y`, `a`, `cost`, `delay`, `costmod`, `resolved`) VALUES
(1, 6, 1, 'deploy', 0, 0, 354, 372, '180.00', 0, 0, 1, 1),
(2, 7, 1, 'deploy', 0, 0, 339, 566, '180.00', 0, 0, 1, 1),
(3, 4, 1, 'deploy', 0, 0, 374, 19, '180.00', 0, 0, 1, 1),
(4, 5, 1, 'deploy', 0, 0, 368, 148, '180.00', 0, 0, 1, 1),
(5, 2, 1, 'deploy', 0, 0, -367, 345, '0.00', 0, 0, 1, 1),
(6, 3, 1, 'deploy', 0, 0, -361, -3, '0.00', 0, 0, 1, 1),
(7, 1, 1, 'deploy', 0, 0, -249, 227, '0.00', 0, 0, 1, 1),
(8, 1, 1, 'jumpIn', 0, 0, -249, 227, '0.00', 0, 0, 0, 1),
(9, 2, 1, 'jumpIn', 0, 0, -367, 345, '0.00', 0, 0, 0, 1),
(10, 3, 1, 'jumpIn', 0, 0, -361, -3, '0.00', 0, 0, 0, 1),
(11, 4, 1, 'jumpIn', 0, 0, 374, 19, '0.00', 0, 0, 0, 1),
(12, 5, 1, 'jumpIn', 0, 0, 368, 148, '0.00', 0, 0, 0, 1),
(13, 6, 1, 'jumpIn', 0, 0, 354, 372, '0.00', 0, 0, 0, 1),
(14, 7, 1, 'jumpIn', 0, 0, 339, 566, '0.00', 0, 0, 0, 1),
(15, 2, 1, 'move', 0, 165, -202, 345, '0.00', 0, 0, 1, 1),
(16, 3, 1, 'move', 0, 165, -196, -3, '0.00', 0, 0, 1, 1),
(17, 1, 1, 'move', 0, 185, -64, 227, '0.00', 0, 0, 1, 1),
(18, 6, 1, 'move', 0, 165, 189, 372, '0.00', 0, 0, 1, 1),
(19, 7, 1, 'move', 0, 165, 174, 566, '0.00', 0, 0, 1, 1),
(20, 4, 1, 'move', 0, 165, 209, 19, '0.00', 0, 0, 1, 1),
(21, 5, 1, 'move', 0, 165, 203, 148, '0.00', 0, 0, 1, 1),
(22, 13, 4, 'deploy', 0, 0, -675, -56, '18.71', 0, 0, 1, 1),
(23, 17, 4, 'deploy', 0, 0, -698, 446, '339.52', 0, 0, 1, 1),
(24, 8, 4, 'deploy', 0, 0, -685, -69, '22.60', 0, 0, 1, 1),
(25, 18, 2, 'deploy', 0, 0, -202, 345, '0.00', 1, 0, 1, 1),
(26, 7, 2, 'move', 0, 165, 9, 566, '0.00', 0, 0, 1, 1),
(27, 4, 2, 'move', 0, 165, 44, 19, '0.00', 0, 0, 1, 1),
(28, 5, 2, 'move', 0, 165, 38, 148, '0.00', 0, 0, 1, 1),
(29, 3, 2, 'move', 0, 165, -31, -3, '0.00', 0, 0, 1, 1),
(30, 2, 2, 'move', 0, 165, -37, 345, '0.00', 0, 0, 1, 1),
(31, 1, 2, 'move', 0, 185, 121, 227, '0.00', 0, 0, 1, 1),
(32, 18, 2, 'move', 0, 110, -126, 425, '46.33', 0, 0, 0, 1),
(39, 19, 3, 'deploy', 0, 0, 44, 19, '0.00', 1, 0, 1, 1),
(46, 2, 3, 'speed', 0, -1, -37, 345, '0.00', 24, 0, 1, 1),
(47, 2, 3, 'speed', 0, -1, -37, 345, '0.00', 23, 0, 1, 1),
(48, 2, 3, 'speed', 0, -1, -37, 345, '0.00', 21, 0, 1, 1),
(49, 2, 3, 'move', 0, 105, 68, 345, '0.00', 0, 0, 1, 1),
(50, 3, 3, 'speed', 0, -1, -31, -3, '0.00', 24, 0, 1, 1),
(51, 3, 3, 'speed', 0, -1, -31, -3, '0.00', 23, 0, 1, 1),
(52, 3, 3, 'speed', 0, -1, -31, -3, '0.00', 21, 0, 1, 1),
(53, 3, 3, 'move', 0, 105, 74, -3, '0.00', 0, 0, 1, 1),
(54, 1, 3, 'turn', 0, 0, 121, 227, '-45.00', 45, 49, 1, 1),
(55, 1, 3, 'move', 0, 49, 156, 192, '0.00', 0, 0, 1, 1),
(56, 1, 3, 'turn', 0, 0, 156, 192, '-45.00', 45, 49, 1, 1),
(57, 1, 3, 'move', 0, 49, 156, 143, '0.00', 0, 0, 1, 1),
(58, 1, 3, 'turn', 0, 0, 156, 143, '-45.00', 45, 49, 1, 1),
(59, 1, 3, 'move', 0, 87, 94, 81, '0.00', 0, 0, 1, 1),
(60, 7, 3, 'turn', 0, 0, 9, 566, '30.00', 30, 60, 1, 1),
(61, 7, 3, 'move', 0, 60, -43, 536, '0.00', 0, 0, 1, 1),
(62, 7, 3, 'turn', 0, 0, -43, 536, '30.00', 30, 60, 1, 1),
(63, 7, 3, 'move', 0, 60, -73, 484, '0.00', 0, 0, 1, 1),
(64, 7, 3, 'turn', 0, 0, -73, 484, '20.00', 20, 40, 1, 1),
(65, 7, 3, 'move', 0, 45, -81, 440, '0.00', 0, 0, 1, 1),
(66, 5, 3, 'turn', 0, 0, 38, 148, '-30.00', 30, 63, 1, 1),
(67, 5, 3, 'move', 0, 63, -17, 180, '0.00', 0, 0, 1, 1),
(68, 5, 3, 'turn', 0, 0, -17, 180, '-30.00', 30, 63, 1, 1),
(69, 5, 3, 'move', 0, 63, -48, 235, '0.00', 0, 0, 1, 1),
(70, 5, 3, 'turn', 0, 0, -48, 235, '-25.00', 25, 53, 1, 1),
(71, 5, 3, 'move', 0, 39, -51, 274, '0.00', 0, 0, 1, 1),
(72, 4, 3, 'turn', 0, 0, 44, 19, '-30.00', 30, 63, 1, 1),
(73, 4, 3, 'move', 0, 63, -11, 51, '0.00', 0, 0, 1, 1),
(74, 4, 3, 'turn', 0, 0, -11, 51, '-30.00', 30, 63, 1, 1),
(75, 4, 3, 'move', 0, 63, -42, 106, '0.00', 0, 0, 1, 1),
(76, 4, 3, 'turn', 0, 0, -42, 106, '-25.00', 25, 53, 1, 1),
(77, 4, 3, 'move', 0, 39, -45, 145, '0.00', 0, 0, 1, 1),
(78, 18, 3, 'move', 0, 48, -81, 440, '18.43', 0, 0, 0, 1),
(79, 19, 3, 'move', 0, 38, 74, -3, '323.75', 0, 0, 0, 1),
(80, 20, 4, 'deploy', 0, 0, -652, -64, '28.41', 0, 0, 0, 1),
(81, 21, 4, 'deploy', 0, 0, -665, 439, '-7.51', 0, 0, 0, 1),
(82, 8, 4, 'jumpIn', 0, 84, -620, -121, '11.00', 0, 0, 0, 1),
(83, 17, 4, 'jumpIn', 0, 75, -753, 496, '9.00', 0, 0, 0, 1),
(84, 13, 4, 'jumpIn', 0, 126, -709, 65, '-50.00', 0, 0, 0, 1),
(85, 8, 4, 'move', 0, 155, -491, -35, '0.00', 0, 0, 1, 1),
(86, 2, 4, 'speed', 0, 1, 68, 345, '0.00', 19, 0, 1, 1),
(87, 2, 4, 'move', 0, 125, 193, 345, '0.00', 0, 0, 1, 1),
(88, 3, 4, 'move', 0, 105, 179, -3, '0.00', 0, 0, 1, 1),
(89, 1, 4, 'move', 0, 185, -37, -50, '0.00', 0, 0, 1, 1),
(90, 17, 4, 'move', 0, 155, -601, 465, '0.00', 0, 0, 1, 1),
(91, 7, 4, 'move', 0, 165, -110, 278, '0.00', 0, 0, 1, 1),
(92, 4, 4, 'move', 0, 165, -59, 309, '0.00', 0, 0, 1, 1),
(93, 5, 4, 'move', 0, 165, -65, 438, '0.00', 0, 0, 1, 1),
(94, 13, 4, 'move', 0, 185, -551, -31, '0.00', 0, 0, 1, 1),
(95, 20, 4, 'move', 0, 773, -65, 438, '40.54', 0, 0, 0, 1),
(96, 18, 4, 'move', 0, 165, -110, 278, '259.85', 0, 0, 0, 1),
(97, 19, 4, 'move', 0, 105, 179, -3, '360.00', 0, 0, 0, 1),
(98, 21, 4, 'move', 0, 850, 180, 346, '353.75', 0, 0, 0, 1),
(99, 17, 5, 'move', 0, 155, -449, 434, '0.00', 0, 0, 1, 1),
(100, 7, 5, 'move', 0, 165, -139, 116, '0.00', 0, 0, 1, 1),
(101, 5, 5, 'turn', 0, 0, -65, 438, '30.00', 30, 63, 1, 1),
(102, 5, 5, 'move', 0, 63, -101, 490, '0.00', 0, 0, 1, 1),
(103, 5, 5, 'turn', 0, 0, -101, 490, '30.00', 30, 63, 1, 1),
(104, 5, 5, 'move', 0, 102, -193, 533, '0.00', 0, 0, 1, 1),
(105, 5, 5, 'turn', 0, 0, -193, 533, '25.00', 25, 53, 1, 1),
(106, 4, 5, 'move', 0, 165, -73, 473, '0.00', 0, 0, 1, 1),
(107, 4, 5, 'turn', 0, 0, -73, 473, '30.00', 60, 0, 1, 1),
(108, 13, 5, 'move', 0, 183, -380, -98, '0.00', 0, 0, 1, 1),
(109, 13, 5, 'turn', 0, 0, -380, -98, '45.00', 45, 0, 1, 1),
(110, 13, 5, 'move', 0, 2, -378, -98, '0.00', 0, 0, 1, 1),
(111, 8, 5, 'move', 0, 155, -362, 51, '0.00', 0, 0, 1, 1),
(112, 3, 5, 'flip', 0, 1, 179, -3, '0.00', 57, 0, 1, 1),
(113, 3, 5, 'move', 0, 52, 231, -3, '0.00', 0, 0, 1, 1),
(114, 2, 5, 'flip', 0, 1, 193, 345, '0.00', 63, 0, 1, 1),
(115, 2, 5, 'move', 0, 62, 255, 345, '0.00', 0, 0, 1, 1),
(116, 1, 5, 'speed', 0, 1, -37, -50, '0.00', 24, 0, 1, 1),
(117, 1, 5, 'speed', 0, 1, -37, -50, '0.00', 26, 0, 1, 1),
(118, 1, 5, 'speed', 0, 1, -37, -50, '0.00', 27, 0, 1, 1),
(119, 1, 5, 'turn', 0, 0, -37, -50, '-36.15', 50, 0, 1, 1),
(120, 1, 5, 'move', 0, 254, -288, -89, '0.00', 0, 0, 1, 1),
(121, 18, 5, 'move', 0, 165, -139, 116, '259.85', 0, 0, 0, 1),
(122, 19, 5, 'move', 0, 52, 231, -3, '360.00', 0, 0, 0, 1),
(123, 23, 1, 'deploy', 0, 0, 407, -13, '180.00', 0, 0, 1, 1),
(124, 24, 1, 'deploy', 0, 0, 493, 241, '180.00', 0, 0, 1, 1),
(125, 22, 1, 'deploy', 0, 0, -425, 193, '0.00', 0, 0, 1, 1),
(126, 22, 1, 'jumpIn', 0, 0, -425, 193, '0.00', 0, 0, 0, 1),
(127, 23, 1, 'jumpIn', 0, 0, 407, -13, '0.00', 0, 0, 0, 1),
(128, 24, 1, 'jumpIn', 0, 0, 493, 241, '0.00', 0, 0, 0, 1),
(129, 22, 1, 'move', 0, 155, -270, 193, '0.00', 0, 0, 1, 1),
(130, 23, 1, 'move', 0, 165, 242, -13, '0.00', 0, 0, 1, 1),
(131, 24, 1, 'move', 0, 165, 328, 241, '0.00', 0, 0, 1, 1),
(132, 26, 1, 'deploy', 0, 0, 405, 13, '180.00', 0, 0, 1, 1),
(133, 27, 1, 'deploy', 0, 0, 415, 165, '180.00', 0, 0, 1, 1),
(134, 25, 1, 'deploy', 0, 0, -433, 191, '0.00', 0, 0, 1, 1),
(135, 25, 1, 'jumpIn', 0, 0, -433, 191, '0.00', 0, 0, 0, 1),
(136, 26, 1, 'jumpIn', 0, 0, 405, 13, '0.00', 0, 0, 0, 1),
(137, 27, 1, 'jumpIn', 0, 0, 415, 165, '0.00', 0, 0, 0, 1),
(138, 25, 1, 'move', 0, 155, -278, 191, '0.00', 0, 0, 1, 1),
(139, 26, 1, 'move', 0, 165, 240, 13, '0.00', 0, 0, 1, 1),
(140, 27, 1, 'move', 0, 185, 230, 165, '0.00', 0, 0, 1, 1),
(141, 26, 2, 'move', 0, 165, 76, 33, '0.00', 0, 0, 1, 0),
(142, 27, 2, 'move', 0, 185, 48, 127, '0.00', 0, 0, 1, 0);

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

INSERT INTO `damages` (`id`, `fireid`, `gameid`, `shipid`, `structureid`, `systemid`, `turn`, `roll`, `type`, `totalDmg`, `shieldDmg`, `armourDmg`, `systemDmg`, `hullDmg`, `emDmg`, `negation`, `destroyed`, `notes`, `new`) VALUES
(273, 1, 2, 1, 16, 12, 1, 0, 'Laser', 102, 0, 24, 0, 78, 0, 8, 0, 'p;', 0),
(274, 3, 2, 5, 6, 1, 1, 0, 'Particle', 26, 0, 29, 0, 10, 0, 16, 0, 'p;', 0),
(275, 6, 2, 5, 6, 1, 1, 0, 'Particle', 31, 0, 30, 0, 16, 0, 15, 0, 'p;', 0),
(276, 7, 2, 5, 6, 1, 1, 0, 'Particle', 28, 0, 28, 0, 14, 0, 14, 0, 'p;', 0),
(277, 2, 2, 5, 6, 8, 1, 0, 'Particle', 28, 0, 24, 18, 0, 0, 10, 0, 'p;', 0),
(278, 4, 2, 6, 10, 1, 1, 0, 'Particle', 223, 0, 14, 0, 209, 0, 14, 0, 'p;', 0),
(279, 4, 2, 6, 10, 2, 1, 0, 'Particle', 222, 0, 13, 20, 189, 0, 13, 0, 'p;c;', 0),
(280, 4, 2, 6, 10, 12, 1, 0, 'Particle', 247, 0, 6, 28, 213, 0, 6, 1, 'p;', 0),
(355, 11, 2, 1, 12, 4, 2, 0, 'Laser', 96, 0, 8, 0, 24, 0, 8, 0, 'p;', 0),
(356, 11, 2, 1, 12, 4, 2, 0, 'Laser', 96, 0, 8, 0, 24, 0, 8, 0, 'p;', 0),
(357, 11, 2, 1, 12, 4, 2, 0, 'Laser', 96, 0, 8, 0, 24, 0, 8, 0, 'p;', 0),
(358, 12, 2, 1, 16, 4, 2, 0, 'Pulse', 44, 0, 48, 0, 16, 0, 7, 0, 'p;v4;', 0),
(359, 13, 2, 1, 16, 8, 2, 0, 'Particle', 13, 0, 16, 0, 10, 0, 8, 0, 'p;', 0),
(360, 13, 2, 1, 16, 16, 2, 0, 'Particle', 13, 0, 16, 0, 10, 0, 8, 0, 'p;', 0),
(361, 10, 2, 18, 0, 7, 2, 0, 'Pulse', 26, 0, 10, 0, 16, 0, 5, 0, 'p;v2;', 0),
(362, 9, 2, 18, 0, 9, 2, 0, 'Pulse', 32, 0, 10, 0, 22, 0, 5, 0, 'p;v2;', 0),
(401, 31, 2, 2, 16, 1, 3, 0, 'Particle', 65, 0, 48, 0, 49, 0, 16, 0, 'p;', 0),
(402, 27, 2, 2, 10, 11, 3, 0, 'Particle', 36, 0, 5, 31, 0, 0, 10, 0, 'p;', 0),
(403, 27, 2, 2, 10, 11, 3, 0, 'Particle', 36, 0, 5, 5, 26, 0, 10, 1, 'p;o3;', 0),
(404, 31, 2, 2, 16, 17, 3, 0, 'Particle', 7, 0, 7, 0, 0, 0, 8, 0, 'b;', 0),
(405, 31, 2, 2, 16, 18, 3, 0, 'Particle', 26, 0, 21, 18, 0, 0, 8, 0, 'p;', 0),
(406, 31, 2, 2, 16, 19, 3, 0, 'Particle', 46, 0, 31, 36, 0, 0, 8, 1, 'p;o3;', 0),
(407, 34, 2, 3, 14, 1, 3, 0, 'Pulse', 30, 0, 32, 0, 0, 0, 16, 0, 'b;v2;', 0),
(408, 35, 2, 3, 16, 1, 3, 0, 'Pulse', 32, 0, 32, 0, 0, 0, 16, 0, 'b;v2;', 0),
(409, 38, 2, 3, 16, 1, 3, 0, 'Pulse', 15, 0, 16, 0, 0, 0, 15, 0, 'b;v1;', 0),
(410, 37, 2, 3, 10, 2, 3, 0, 'Pulse', 0, 0, 0, 0, 0, 0, 16, 0, 'b;v0;', 0),
(411, 33, 2, 3, 14, 4, 3, 0, 'Pulse', 0, 0, 0, 0, 0, 0, 16, 0, 'b;v0;', 0),
(412, 36, 2, 3, 6, 8, 3, 0, 'Pulse', 0, 0, 0, 0, 0, 0, 8, 0, 'p;v0;', 0),
(413, 22, 2, 7, 16, 1, 3, 0, 'Particle', 15, 0, 28, 0, 2, 0, 14, 0, 'p;', 0),
(414, 24, 2, 7, 13, 1, 3, 0, 'Pulse', 32, 0, 52, 0, 12, 0, 13, 0, 'p;v2;', 0),
(415, 25, 2, 7, 13, 1, 3, 0, 'Pulse', 26, 0, 44, 0, 8, 0, 11, 0, 'p;v2;', 0),
(416, 21, 2, 7, 13, 3, 3, 0, 'Particle', 13, 0, 14, 0, 0, 0, 13, 0, 'b;', 0),
(417, 23, 2, 7, 10, 12, 3, 0, 'Particle', 16, 0, 12, 20, 0, 0, 6, 0, 'p;', 0),
(418, 15, 2, 4, 17, 18, 3, 0, 'Particle', 30, 0, 9, 21, 0, 0, 9, 0, 'p;', 0),
(419, 17, 2, 4, 17, 19, 3, 0, 'Particle', 29, 0, 15, 14, 0, 0, 15, 0, 'p;', 0),
(420, 19, 2, 19, 0, 1, 3, 0, 'Particle', 12, 0, 3, 0, 9, 0, 3, 0, 'p;', 0),
(421, 18, 2, 19, 0, 3, 3, 0, 'Particle', 12, 0, 3, 0, 9, 0, 3, 0, 'p;', 0),
(422, 19, 2, 19, 0, 5, 3, 0, 'Particle', 14, 0, 3, 0, 11, 0, 3, 0, 'p;', 0),
(423, 18, 2, 19, 0, 9, 3, 0, 'Particle', 13, 0, 3, 0, 10, 0, 3, 0, 'p;', 0),
(424, 45, 2, 20, 0, 3, 4, 0, 'Particle', 10, 0, 4, 0, 8, 0, 2, 1, 'p;', 0),
(425, 50, 2, 3, 10, 1, 4, 0, 'Particle', 16, 0, 16, 0, 0, 0, 16, 0, 'b;', 0),
(426, 51, 2, 3, 16, 1, 4, 0, 'Pulse', 24, 0, 24, 0, 0, 0, 14, 0, 'b;v2;', 0),
(427, 49, 2, 3, 6, 7, 4, 0, 'Particle', 13, 0, 16, 10, 0, 0, 8, 0, 'p;', 0),
(428, 47, 2, 3, 14, 15, 4, 0, 'Pulse', 16, 0, 16, 16, 0, 0, 8, 0, 'p;v1;', 0),
(429, 57, 2, 5, 10, 1, 4, 0, 'Warhead', 39, 0, 15, 0, 24, 0, 15, 0, 'p;', 0),
(430, 57, 2, 5, 10, 1, 4, 0, 'Warhead', 38, 0, 14, 0, 24, 0, 14, 0, 'p;', 0),
(431, 57, 2, 5, 10, 1, 4, 0, 'Warhead', 44, 0, 14, 0, 30, 0, 14, 0, 'p;', 0),
(432, 57, 2, 5, 10, 1, 4, 0, 'Warhead', 32, 0, 13, 0, 19, 0, 13, 0, 'p;', 0),
(433, 57, 2, 5, 10, 12, 4, 0, 'Warhead', 35, 0, 15, 20, 0, 0, 15, 0, 'p;', 0),
(434, 57, 2, 5, 10, 12, 4, 0, 'Warhead', 34, 0, 13, 21, 0, 0, 13, 0, 'p;', 0),
(435, 57, 2, 5, 10, 13, 4, 0, 'Warhead', 34, 0, 5, 24, 5, 0, 5, 1, 'p;o2;', 0),
(436, 53, 2, 13, 4, 4, 4, 0, 'Particle', 16, 0, 8, 0, 8, 0, 8, 0, 'p;', 0),
(437, 52, 2, 13, 12, 8, 4, 0, 'Particle', 12, 0, 8, 0, 4, 0, 8, 0, 'p;', 0),
(438, 53, 2, 13, 4, 8, 4, 0, 'Particle', 13, 0, 8, 0, 5, 0, 8, 0, 'p;', 0),
(439, 52, 2, 13, 12, 12, 4, 0, 'Particle', 13, 0, 8, 0, 5, 0, 8, 0, 'p;', 0),
(440, 52, 2, 13, 12, 12, 4, 0, 'Particle', 13, 0, 8, 0, 5, 0, 8, 0, 'p;', 0),
(441, 53, 2, 13, 4, 12, 4, 0, 'Particle', 15, 0, 8, 0, 7, 0, 8, 0, 'p;', 0),
(442, 55, 2, 19, 0, 1, 4, 0, 'Particle', 13, 0, 3, 0, 10, 0, 3, 0, 'p;', 0),
(443, 56, 2, 19, 0, 3, 4, 0, 'Particle', 12, 0, 3, 0, 9, 0, 3, 0, 'p;', 0),
(444, 54, 2, 19, 0, 7, 4, 0, 'Particle', 16, 0, 3, 0, 13, 0, 3, 0, 'p;', 0),
(445, 58, 0, 1, 8, 4, 5, 0, 'Area', 120, 0, 36, 0, 84, 0, 6, 0, 'p;v6;', 0),
(446, 58, 0, 1, 8, 8, 5, 0, 'Area', 120, 0, 48, 0, 72, 0, 8, 0, 'p;v6;', 0),
(447, 58, 0, 1, 8, 12, 5, 0, 'Area', 120, 0, 42, 0, 78, 0, 7, 0, 'p;v6;', 0),
(448, 58, 0, 1, 8, 16, 5, 0, 'Area', 120, 0, 48, 0, 72, 0, 8, 0, 'p;v6;', 0),
(449, 58, 0, 13, 4, 4, 5, 0, 'Area', 120, 0, 48, 0, 72, 0, 8, 0, 'p;v6;', 0),
(450, 58, 0, 13, 4, 8, 5, 0, 'Area', 120, 0, 48, 0, 72, 0, 8, 0, 'p;v6;', 0),
(451, 58, 0, 13, 4, 12, 5, 0, 'Area', 120, 0, 42, 0, 78, 0, 7, 0, 'p;v6;', 0);

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
(1, 2, 1, 5, 1, -71, 223, 18, 1, 136, '10;', 1, 1),
(2, 2, 1, 1, 5, 202, 144, 5, 1, 127, '24;', 1, 1),
(3, 2, 1, 1, 5, 202, 144, 9, 1, 127, '9;', 1, 1),
(4, 2, 1, 1, 6, 192, 375, 10, 4, 112, '72;76;40;28;', 3, 1),
(5, 2, 1, 1, 6, 192, 375, 11, 4, 0, '', 0, 1),
(6, 2, 1, 1, 5, 202, 144, 13, 1, 127, '88;', 1, 1),
(7, 2, 1, 1, 5, 202, 144, 17, 1, 127, '78;', 1, 1),
(8, 2, 2, 2, 0, 173, 573, 15, 0, 0, '', 0, 1),
(9, 2, 2, 7, 18, -126, 431, 11, 1, 86, '86;', 1, 1),
(10, 2, 2, 7, 18, -126, 431, 12, 1, 86, '69;', 1, 1),
(11, 2, 2, 4, 1, 114, 227, 18, 1, 139, '50;', 1, 1),
(12, 2, 2, 5, 1, 123, 222, 16, 1, 132, '92;', 1, 1),
(13, 2, 2, 5, 1, 123, 222, 20, 2, 132, '24;16;', 2, 1),
(14, 2, 3, 4, 0, -35, 2, 15, 0, 0, '', 0, 1),
(15, 2, 3, 2, 4, -41, 146, 17, 2, 43, '70;12;', 1, 1),
(16, 2, 3, 2, 4, -41, 146, 18, 2, 43, '67;49;', 0, 1),
(17, 2, 3, 2, 4, -41, 146, 19, 2, 43, '4;46;', 1, 1),
(18, 2, 3, 1, 19, 0, 0, 10, 4, 44, '58;65;30;14;', 2, 1),
(19, 2, 3, 1, 19, 0, 0, 11, 4, 44, '81;15;12;81;', 2, 1),
(20, 2, 3, 18, 7, 0, 0, 2, 1, 71, '88;', 0, 1),
(21, 2, 3, 18, 7, 0, 0, 4, 1, 72, '37;', 1, 1),
(22, 2, 3, 18, 7, 0, 0, 6, 1, 65, '44;', 1, 1),
(23, 2, 3, 18, 7, 0, 0, 8, 1, 66, '9;', 1, 1),
(24, 2, 3, 18, 7, 0, 0, 12, 1, 77, '5;', 1, 1),
(25, 2, 3, 18, 7, 0, 0, 14, 1, 70, '15;', 1, 1),
(26, 2, 3, 18, 7, 0, 0, 16, 1, 67, '97;', 0, 1),
(27, 2, 3, 7, 2, 67, 345, 15, 2, 66, '13;2;', 2, 1),
(28, 2, 3, 7, 18, 0, 0, 17, 1, 27, '53;', 0, 1),
(29, 2, 3, 7, 18, 0, 0, 18, 1, 27, '48;', 0, 1),
(30, 2, 3, 4, 1, 85, 81, 7, 1, 25, '97;', 0, 1),
(31, 2, 3, 4, 2, 69, 343, 8, 1, 62, '45;', 1, 1),
(32, 2, 3, 4, 1, 85, 81, 16, 1, 25, '27;', 0, 1),
(33, 2, 3, 19, 3, 0, 0, 2, 1, 67, '52;', 1, 1),
(34, 2, 3, 19, 3, 0, 0, 4, 1, 74, '10;', 1, 1),
(35, 2, 3, 19, 3, 0, 0, 6, 1, 68, '24;', 1, 1),
(36, 2, 3, 19, 3, 0, 0, 8, 1, 79, '63;', 1, 1),
(37, 2, 3, 19, 3, 0, 0, 10, 1, 78, '70;', 1, 1),
(38, 2, 3, 19, 3, 0, 0, 12, 1, 70, '40;', 1, 1),
(39, 2, 4, 17, 2, 60, 350, 7, 4, 0, '', 0, 1),
(40, 2, 4, 17, 2, 60, 350, 9, 4, 0, '', 0, 1),
(41, 2, 4, 8, 5, -50, 268, 13, 4, 0, '', 0, 1),
(42, 2, 4, 8, 5, -50, 268, 20, 4, 0, '', 0, 1),
(43, 2, 4, 17, 3, 173, -6, 19, 1, 29, '59;', 0, 1),
(44, 2, 4, 17, 3, 173, -6, 20, 1, 29, '69;', 0, 1),
(45, 2, 4, 5, 20, 0, 0, 13, 2, 40, '8;56;', 1, 1),
(46, 2, 4, 5, 20, 0, 0, 16, 1, 32, '52;', 0, 1),
(47, 2, 4, 19, 3, 178, -7, 2, 1, 78, '77;', 1, 1),
(48, 2, 4, 19, 3, 178, -7, 4, 1, 73, '93;', 0, 1),
(49, 2, 4, 19, 3, 178, -7, 8, 1, 79, '7;', 1, 1),
(50, 2, 4, 19, 3, 178, -7, 10, 1, 78, '13;', 1, 1),
(51, 2, 4, 19, 3, 178, -7, 12, 1, 75, '28;', 1, 1),
(52, 2, 4, 8, 13, -547, -36, 16, 4, 74, '93;56;9;64;', 3, 1),
(53, 2, 4, 8, 13, -547, -36, 17, 4, 74, '57;7;78;40;', 3, 1),
(54, 2, 4, 3, 19, 0, 0, 7, 4, 36, '60;96;5;45;', 1, 1),
(55, 2, 4, 3, 19, 0, 0, 8, 4, 36, '99;86;8;98;', 1, 1),
(56, 2, 4, 3, 19, 0, 0, 9, 4, 36, '88;100;60;32;', 1, 1),
(57, 2, 4, 20, 5, 0, 0, 2, 7, 80, '31;26;49;72;39;57;29;', 7, 1),
(58, 2, 5, 8, 0, -340, -81, 8, 1, 0, '-340;-81;', 2, 1),
(59, 4, 2, 25, 0, 67, 91, 8, 0, 0, '', 0, 0);

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
(2, 'myGame', 'active', 5, 2, 3500, 1500, 2, 2, 5, 10),
(3, 'myGame', 'active', 1, 2, 3500, 1500, 11, 3, 10, 10),
(4, 'myGame', 'active', 2, 0, 3500, 1500, 11, 3, 10, 10);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `globals`
--

CREATE TABLE `globals` (
  `id` int(4) NOT NULL,
  `playerstatusid` int(4) DEFAULT '0',
  `turn` int(4) DEFAULT '0',
  `type` varchar(20) DEFAULT '',
  `value` decimal(5,2) DEFAULT '0.00',
  `notes` varchar(20) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
(1, 1, 1, 'Command', 3),
(2, 1, 1, 'Sensor', 3),
(19, 17, 7, 'Vranoth', 1),
(20, 17, 9, 'Vranoth', 1),
(21, 2, 15, 'Sentri', 6),
(22, 4, 15, 'Gorith', 2);

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
(1, 18, '2', 2, 7, 174, 566, 5),
(2, 19, '2', 3, 3, -31, -3, 5),
(3, 20, '2', 4, 5, -51, 274, 4),
(4, 21, '2', 4, 2, 68, 345, 0);

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
(2, 1, 2, 5, 2, 'Centauri Republic', 2253, 2007, 1288, 322, 966, 'waiting'),
(3, 2, 2, 5, 2, 'Narn Regime', 1900, 1690, 1400, 350, 1050, 'waiting'),
(4, 1, 3, 1, 2, 'Minbari Federation', 1150, 3850, 1540, 385, 385, 'waiting'),
(5, 2, 3, 1, 2, 'Earth Alliance', 980, 4020, 1400, 350, 350, 'waiting'),
(6, 1, 4, 2, 0, 'Narn Regime', 850, 4150, 1540, 385, 770, 'waiting'),
(7, 2, 4, 2, 0, 'Centauri Republic', 1071, 3929, 1400, 350, 700, 'ready');

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
(1, 6, 11, 1, '-1', 0),
(2, 6, 12, 1, '-1', 0),
(3, 6, 17, 1, '-1', 0),
(4, 6, 18, 1, '-1', 0),
(5, 7, 11, 1, '-1', 0),
(6, 7, 12, 1, '-1', 0),
(7, 7, 17, 1, '-1', 0),
(8, 7, 18, 1, '-1', 0),
(9, 7, 11, 2, '-1', 0),
(10, 7, 12, 2, '-1', 0),
(11, 7, 17, 2, '-1', 0),
(12, 7, 18, 2, '-1', 0),
(13, 7, 11, 3, '-1', 0),
(14, 7, 12, 3, '-1', 0),
(15, 7, 17, 3, '-2', 0),
(16, 7, 18, 3, '-2', 0),
(17, 18, 2, 3, '-1', 0),
(18, 18, 4, 3, '-1', 0),
(19, 18, 6, 3, '-1', 0),
(20, 18, 8, 3, '-1', 0),
(21, 18, 10, 3, '-1', 0),
(22, 18, 12, 3, '-2', 0),
(23, 18, 14, 3, '-2', 0),
(24, 18, 16, 3, '-2', 0),
(25, 19, 2, 3, '-2', 0),
(26, 19, 4, 3, '-2', 0),
(27, 19, 6, 3, '-2', 0),
(28, 19, 8, 3, '-2', 0),
(29, 19, 10, 3, '-2', 0),
(30, 19, 12, 3, '-2', 0),
(31, 17, 7, 4, '1', 0),
(32, 17, 7, 4, '1', 0),
(33, 17, 7, 4, '1', 0),
(34, 17, 7, 4, '1', 0),
(35, 17, 9, 4, '1', 0),
(36, 17, 9, 4, '1', 0),
(37, 17, 9, 4, '1', 0),
(38, 17, 9, 4, '1', 0),
(39, 7, 11, 4, '-1', 0),
(40, 7, 12, 4, '-1', 0),
(41, 7, 17, 4, '-2', 0),
(42, 7, 18, 4, '-2', 0),
(43, 19, 2, 4, '-2', 0),
(44, 19, 4, 4, '-2', 0),
(45, 19, 6, 4, '-2', 0),
(46, 19, 8, 4, '-2', 0),
(47, 19, 10, 4, '-2', 0),
(48, 19, 12, 4, '-2', 0),
(49, 8, 13, 4, '1', 0),
(50, 8, 13, 4, '1', 0),
(51, 8, 13, 4, '1', 0),
(52, 8, 13, 4, '1', 0),
(53, 8, 20, 4, '1', 0),
(54, 8, 20, 4, '1', 0),
(55, 8, 20, 4, '1', 0),
(56, 8, 20, 4, '1', 0),
(57, 18, 2, 4, '-1', 0),
(58, 18, 4, 4, '-1', 0),
(59, 18, 6, 4, '-1', 0),
(60, 18, 8, 4, '-1', 0),
(61, 18, 10, 4, '-1', 0),
(62, 18, 12, 4, '-2', 0),
(63, 18, 14, 4, '-2', 0),
(64, 18, 16, 4, '-2', 0),
(65, 19, 2, 4, '-2', 0),
(66, 19, 4, 4, '-2', 0),
(67, 19, 6, 4, '-2', 0),
(68, 19, 8, 4, '-1', 0),
(69, 19, 10, 4, '-1', 0),
(70, 19, 12, 4, '-2', 0),
(71, 18, 2, 4, '-1', 0),
(72, 18, 4, 4, '-1', 0),
(73, 18, 6, 4, '-1', 0),
(74, 18, 8, 4, '-1', 0),
(75, 18, 10, 4, '-1', 0),
(76, 18, 12, 4, '-2', 0),
(77, 18, 14, 4, '-2', 0),
(78, 18, 16, 4, '-2', 0),
(79, 8, 13, 5, '0', 0),
(80, 8, 20, 5, '0', 0),
(81, 18, 2, 5, '-1', 0),
(82, 18, 2, 5, '-1', 0),
(83, 18, 4, 5, '-1', 0),
(84, 18, 4, 5, '-1', 0),
(85, 18, 6, 5, '-1', 0),
(86, 18, 6, 5, '-1', 0),
(87, 18, 8, 5, '-1', 0),
(88, 18, 8, 5, '-1', 0),
(89, 18, 10, 5, '-1', 0),
(90, 18, 10, 5, '-1', 0),
(91, 18, 12, 5, '-2', 0),
(92, 18, 12, 5, '-2', 0),
(93, 18, 14, 5, '-2', 0),
(94, 18, 14, 5, '-2', 0),
(95, 18, 16, 5, '-2', 0),
(96, 18, 16, 5, '-2', 0),
(97, 7, 11, 5, '-1', 0),
(98, 7, 12, 5, '-1', 0),
(99, 7, 17, 5, '-2', 0),
(100, 7, 18, 5, '-2', 0),
(101, 19, 2, 5, '-2', 0),
(102, 19, 2, 5, '-2', 0),
(103, 19, 4, 5, '-2', 0),
(104, 19, 4, 5, '-2', 0),
(105, 19, 6, 5, '-2', 0),
(106, 19, 6, 5, '-2', 0),
(107, 19, 8, 5, '-2', 0),
(108, 19, 8, 5, '-1', 0),
(109, 19, 10, 5, '-2', 0),
(110, 19, 10, 5, '-1', 0),
(111, 19, 12, 5, '-2', 0),
(112, 19, 12, 5, '-2', 0),
(113, 23, 11, 1, '-1', 0),
(114, 23, 12, 1, '-1', 0),
(115, 23, 17, 1, '-1', 0),
(116, 23, 18, 1, '-1', 0),
(117, 24, 11, 1, '-1', 0),
(118, 24, 12, 1, '-1', 0),
(119, 24, 17, 1, '-1', 0),
(120, 24, 18, 1, '-1', 0),
(121, 25, 14, 1, '0', 0),
(122, 25, 16, 1, '0', 0),
(123, 25, 18, 1, '0', 0),
(124, 25, 23, 1, '0', 0),
(125, 25, 14, 2, '0', 0),
(126, 25, 16, 2, '0', 0),
(127, 25, 18, 2, '0', 0),
(128, 25, 23, 2, '0', 0);

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
(1, 6, 4, 1, '-1.00', 95, 0),
(2, 7, 4, 1, '-1.00', 95, 0),
(3, 4, 4, 1, '-1.00', 102, 0),
(4, 5, 4, 1, '-1.00', 102, 0),
(5, 2, 4, 1, '-1.00', 106, 0),
(6, 3, 4, 1, '-1.00', 106, 0),
(7, 1, 2, 1, '-1.00', 66, 0),
(8, 7, 4, 2, '-1.00', 95, 0),
(9, 4, 4, 2, '-1.00', 102, 0),
(10, 5, 4, 2, '-1.00', 102, 0),
(11, -13, 2, 2, '-1.00', 59, 0),
(12, -17, 4, 2, '-1.00', 110, 0),
(13, 2, 4, 2, '-1.00', 106, 0),
(14, 3, 4, 2, '-1.00', 106, 0),
(15, 1, 2, 2, '-1.00', 90, 0),
(16, -8, 4, 2, '-1.00', 117, 0),
(17, 7, 4, 3, '-1.00', 95, 0),
(18, 4, 4, 3, '-1.00', 102, 0),
(19, 5, 4, 3, '-1.00', 102, 0),
(20, 2, 4, 3, '-1.00', 106, 0),
(21, 3, 4, 3, '-1.00', 106, 0),
(22, 1, 2, 3, '-1.00', 90, 0),
(23, 17, 4, 4, '-1.00', 110, 0),
(24, 7, 4, 4, '-1.00', 95, 0),
(25, 5, 4, 4, '-1.00', 102, 0),
(26, 4, 4, 4, '-1.00', 102, 0),
(27, 13, 2, 4, '-1.00', 59, 0),
(28, 8, 4, 4, '-1.00', 117, 0),
(29, 2, 4, 4, '-1.00', 106, 0),
(30, 3, 4, 4, '-1.00', 106, 0),
(31, 1, 2, 4, '-1.00', 90, 0),
(32, 8, 4, 5, '-1.00', 117, 0),
(33, 3, 4, 5, '-1.00', 106, 0),
(34, 2, 4, 5, '-1.00', 106, 0),
(35, 1, 2, 5, '-1.00', 90, 0),
(36, 17, 4, 5, '-1.00', 110, 0),
(37, 7, 4, 5, '-1.00', 95, 0),
(38, 5, 4, 5, '-1.00', 102, 0),
(39, 4, 4, 5, '-1.00', 102, 0),
(40, 13, 2, 5, '-1.00', 59, 0),
(41, 23, 4, 1, '-1.00', 95, 0),
(42, 24, 4, 1, '-1.00', 95, 0),
(43, 22, 4, 1, '-1.00', 132, 0),
(44, 26, 4, 1, '-1.00', 106, 0),
(45, 27, 2, 1, '-1.00', 66, 0),
(46, 25, 4, 1, '-1.00', 113, 0),
(47, 26, 4, 2, '-1.00', 106, 0),
(48, 27, 2, 2, '-1.00', 66, 0),
(49, 25, 4, 2, '-1.00', 113, 0);

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
(1, 1, 1, 'Haven'),
(2, 1, 1, 'Haven'),
(3, 1, 1, 'Haven'),
(4, 1, 1, 'Haven'),
(5, 13, 1, 'Shokos'),
(6, 13, 1, 'Shokos'),
(7, 13, 1, 'Shokos'),
(10, 18, 8, 'Sentri'),
(11, 19, 6, 'Gorith'),
(12, 20, 8, 'Javelin'),
(13, 21, 8, 'Vranoth'),
(14, 27, 1, 'Haven'),
(15, 27, 1, 'Haven'),
(16, 27, 1, 'Haven');

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
(95, 1, 13, 1, 'Accuracy', 0, '-20.00'),
(96, 1, 14, 1, 'Damage', 0, '-20.00'),
(97, 1, 15, 1, 'Damage', 0, '-20.00'),
(148, 1, 5, 2, 'Accuracy', 0, '-30.00'),
(149, 1, 6, 2, 'Damage', 0, '-30.00'),
(150, 1, 7, 2, 'Damage', 0, '-30.00'),
(151, 18, 9, 2, 'Disabled', 0, '0.00'),
(158, 2, 5, 3, 'Overload', 0, '-9.81'),
(159, 7, 12, 3, 'Accuracy', 0, '-30.00'),
(160, 19, 5, 3, 'Disabled', 0, '0.00'),
(161, 3, 7, 4, 'Accuracy', 0, '-30.00'),
(162, 5, 5, 4, 'Overload', 0, '-2.81'),
(163, 13, 13, 4, 'Damage', 0, '-30.00'),
(164, 19, 3, 4, 'Disabled', 0, '0.00');

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
  `totalCost` int(4) NOT NULL DEFAULT '0',
  `moraleCost` int(4) NOT NULL DEFAULT '0',
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

INSERT INTO `units` (`id`, `gameid`, `userid`, `ship`, `ball`, `name`, `display`, `totalCost`, `moraleCost`, `status`, `command`, `available`, `destroyed`, `x`, `y`, `facing`, `delay`, `thrust`, `rolling`, `rolled`, `flipped`, `turn`, `phase`, `focus`, `notes`) VALUES
(1, 2, 1, 1, 0, 'Squadron', 'Fibonacci', 0, 1233, 'bought', 1, 1, 0, -37, -50, '225.00', 0, 185, 0, 0, 0, 4, 3, 0, ''),
(2, 2, 1, 1, 0, 'Altarian', '', 0, 510, 'bought', 0, 1, 0, 193, 345, '0.00', 0, 125, 0, 0, 0, 4, 3, 0, ''),
(3, 2, 1, 1, 0, 'Altarian', '', 0, 510, 'bought', 0, 1, 0, 179, -3, '0.00', 0, 105, 0, 0, 0, 4, 3, 0, ''),
(4, 2, 2, 1, 0, 'KaToc', '', 0, 460, 'bought', 0, 1, 0, -59, 309, '95.00', 0, 165, 0, 0, 0, 4, 3, 0, ''),
(5, 2, 2, 1, 0, 'KaToc', '', 0, 460, 'bought', 1, 1, 0, -65, 438, '95.00', 0, 165, 0, 0, 0, 4, 3, 0, ''),
(6, 2, 2, 1, 0, 'Artemis', '', 0, 490, 'bought', 0, 1, 1, 189, 372, '180.00', 0, 165, 0, 0, 0, 1, 3, 0, ''),
(7, 2, 2, 1, 0, 'Artemis', '', 0, 490, 'bought', 0, 1, 0, -110, 278, '260.00', 0, 165, 0, 0, 0, 4, 3, 0, ''),
(8, 2, 1, 1, 0, 'Centurion', '', 804, 740, 'bought', 0, 4, 0, -491, -35, '33.60', 0, 155, 0, 0, 0, 4, 3, 0, ''),
(13, 2, 2, 1, 0, 'Squadron', '', 660, 0, 'bought', 0, 4, 0, -551, -31, '328.71', 0, 185, 0, 0, 0, 4, 3, 0, ''),
(17, 2, 2, 1, 0, 'GSten', '', 750, 750, 'bought', 0, 4, 0, -601, 465, '348.52', 0, 155, 0, 0, 0, 4, 3, 0, ''),
(18, 2, 1, 0, 0, 'Flight', '', 208, 208, 'deployed', 0, 2, 0, -110, 278, '259.85', 0, 440, 0, 0, 0, 4, 3, 0, ''),
(19, 2, 2, 0, 0, 'Flight', '', 126, 126, 'deployed', 0, 3, 0, 179, -3, '360.00', 0, 300, 0, 0, 0, 4, 3, 0, ''),
(20, 2, 1, 0, 1, 'Salvo', '', 0, 0, 'deployed', 0, 4, 1, -65, 438, '40.54', 0, 28286, 0, 0, 0, 4, 3, 0, ''),
(21, 2, 2, 0, 1, 'Salvo', '', 0, 0, 'deployed', 0, 4, 1, 180, 346, '353.75', 0, 850, 0, 0, 0, 4, 3, 0, ''),
(22, 3, 1, 1, 0, 'Tigara', '', 1150, 1150, 'bought', 1, 1, 0, -425, 193, '0.00', 0, 155, 0, 0, 0, 1, -1, 0, ''),
(23, 3, 2, 1, 0, 'Artemis', '', 490, 490, 'bought', 0, 1, 0, 407, -13, '0.00', 0, 165, 0, 0, 0, 1, -1, 0, ''),
(24, 3, 2, 1, 0, 'Artemis', '', 490, 490, 'bought', 1, 1, 0, 493, 241, '0.00', 0, 165, 0, 0, 0, 1, -1, 0, ''),
(25, 4, 1, 1, 0, 'GQuan', '', 850, 850, 'bought', 1, 1, 0, -278, 191, '0.00', 0, 155, 0, 0, 0, 1, 3, 0, ''),
(26, 4, 2, 1, 0, 'Altarian', '', 510, 510, 'bought', 1, 1, 0, 240, 13, '180.00', 0, 165, 0, 0, 0, 1, 3, 0, ''),
(27, 4, 2, 1, 0, 'Squadron', '', 561, 561, 'bought', 0, 1, 0, 230, 165, '180.00', 0, 185, 0, 0, 0, 1, 3, 0, '');

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
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=143;
--
-- AUTO_INCREMENT für Tabelle `chat`
--
ALTER TABLE `chat`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `damages`
--
ALTER TABLE `damages`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=452;
--
-- AUTO_INCREMENT für Tabelle `fireorders`
--
ALTER TABLE `fireorders`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;
--
-- AUTO_INCREMENT für Tabelle `games`
--
ALTER TABLE `games`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT für Tabelle `globals`
--
ALTER TABLE `globals`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `loads`
--
ALTER TABLE `loads`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT für Tabelle `missions`
--
ALTER TABLE `missions`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT für Tabelle `playerstatus`
--
ALTER TABLE `playerstatus`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT für Tabelle `powers`
--
ALTER TABLE `powers`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=129;
--
-- AUTO_INCREMENT für Tabelle `sensors`
--
ALTER TABLE `sensors`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;
--
-- AUTO_INCREMENT für Tabelle `subunits`
--
ALTER TABLE `subunits`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT für Tabelle `systemcrits`
--
ALTER TABLE `systemcrits`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=165;
--
-- AUTO_INCREMENT für Tabelle `units`
--
ALTER TABLE `units`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

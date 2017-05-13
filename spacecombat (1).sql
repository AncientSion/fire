-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 07. Mai 2017 um 22:12
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
(1, 4, 1, 'deploy', 0, 721, -79, 180, 0, 0, 1, 1),
(2, 5, 1, 'deploy', 0, 726, 63, 180, 0, 0, 1, 1),
(3, 6, 1, 'deploy', 0, 634, 129, 180, 0, 0, 1, 1),
(4, 1, 1, 'deploy', 0, -702, 173, 0, 0, 0, 1, 1),
(5, 2, 1, 'deploy', 0, -635, 68, 0, 0, 0, 1, 1),
(6, 3, 1, 'deploy', 0, -611, -120, 0, 0, 0, 1, 1),
(7, 1, 1, 'move', 150, -555, 204, 0, 0, 0, 1, 1),
(8, 2, 1, 'move', 150, -497, 128, 0, 0, 0, 1, 1),
(9, 3, 1, 'move', 135, -476, -120, 0, 0, 0, 1, 1),
(10, 4, 1, 'move', 135, 598, -135, 0, 0, 0, 1, 1),
(11, 5, 1, 'move', 165, 576, -7, 0, 0, 0, 1, 1),
(12, 6, 1, 'move', 150, 484, 129, 0, 0, 0, 1, 1),
(13, 7, 2, 'deploy', 0, -406, -129, -8, 0, 0, 1, 1),
(14, 8, 2, 'deploy', 0, 596, -199, -92, 0, 0, 1, 1),
(15, 9, 2, 'deploy', 0, 595, -61, 92, 0, 0, 1, 1),
(16, 10, 2, 'launch', 0, -534, 200, 0, 0, 0, 0, 1),
(17, 11, 2, 'launch', 0, -483, 116, 0, 0, 0, 0, 1),
(18, 12, 2, 'launch', 0, 473, 133, 0, 0, 0, 0, 1),
(19, 4, 2, 'speedChange', -1, 598, -135, 0, 165, 0, 1, 1),
(20, 4, 2, 'move', 122, 486, -185, 0, 0, 0, 1, 1),
(21, 5, 2, 'move', 165, 426, 62, 0, 0, 0, 1, 1),
(22, 6, 2, 'move', 150, 347, 190, 0, 0, 0, 1, 1),
(23, 1, 2, 'move', 150, -417, 144, 0, 0, 0, 1, 1),
(24, 2, 2, 'move', 150, -353, 85, 0, 0, 0, 1, 1),
(25, 3, 2, 'turn', 0, -476, -120, -25, 123, 141, 1.8, 1),
(26, 3, 2, 'move', 135, -386, -221, 0, 0, 0, 1, 1),
(27, 7, 2, 'move', 105, -302, -144, 0, 0, 0, 1, 1),
(28, 8, 2, 'turn', 0, 596, -199, -60, 33, 48, 1, 1),
(29, 8, 2, 'move', 140, 472, -265, 0, 0, 0, 1, 1),
(30, 9, 2, 'turn', 0, 595, -61, 60, 33, 48, 1, 1),
(31, 9, 2, 'move', 140, 471, 5, 0, 0, 0, 1, 1),
(32, 12, 2, 'move', 0, 348, 126, 0, 0, 0, 0, 1),
(33, 11, 2, 'move', 0, -380, 110, 0, 0, 0, 0, 1),
(34, 10, 2, 'move', 0, -431, 199, 0, 0, 0, 0, 1),
(35, 13, 3, 'launch', 0, 418, 68, 0, 0, 0, 0, 1),
(36, 4, 3, 'move', 122, 364, -185, 0, 0, 0, 1, 1),
(37, 5, 3, 'turn', 0, 426, 62, 25, 6, 49, 1, 1),
(38, 5, 3, 'move', 165, 276, -8, 0, 0, 0, 1, 1),
(39, 6, 3, 'move', 150, 211, 253, 0, 0, 0, 1, 1),
(40, 6, 3, 'turn', 0, 211, 253, 25, 27, 82, 3, 1),
(41, 1, 3, 'turn', 0, -417, 144, -25, 34, 89, 1, 1),
(42, 1, 3, 'move', 150, -318, 31, 0, 0, 0, 1, 1),
(43, 2, 3, 'turn', 0, -353, 85, -25, 34, 89, 1, 1),
(44, 2, 3, 'move', 150, -255, -29, 0, 0, 0, 1, 1),
(45, 3, 3, 'move', 132, -301, -323, 0, 0, 0, 1, 1),
(46, 3, 3, 'turn', 0, -301, -323, 25, 123, 141, 2.2, 1),
(47, 3, 3, 'move', 3, -298, -323, 0, 0, 0, 1, 1),
(48, 8, 3, 'turn', 0, 472, -265, -80, 44, 64, 1, 1),
(49, 8, 3, 'move', 210, 343, -100, 0, 0, 0, 1, 1),
(50, 9, 3, 'move', 210, 286, 104, 0, 0, 0, 1, 1),
(51, 7, 3, 'turn', 0, -302, -144, 80, 56, 76, 1, 1),
(52, 7, 3, 'move', 210, -237, 56, 0, 0, 0, 1, 1),
(53, 12, 3, 'move', 0, 106, 64, 0, 0, 0, 0, 1),
(54, 11, 3, 'move', 0, -177, 74, 0, 0, 0, 0, 1),
(55, 10, 3, 'move', 0, -226, 216, 0, 0, 0, 0, 1),
(56, 13, 3, 'move', 0, 168, 63, 0, 0, 0, 0, 1),
(57, 14, 4, 'launch', 0, -304, 17, 0, 0, 0, 0, 1),
(58, 15, 4, 'launch', 0, -232, -35, 0, 0, 0, 0, 1),
(59, 16, 4, 'launch', 0, 204, 242, 0, 0, 0, 0, 1),
(60, 1, 4, 'move', 73, -270, -24, 0, 0, 0, 1, 1),
(61, 1, 4, 'turn', 0, -270, -24, 25, 34, 89, 1.2, 1),
(62, 1, 4, 'move', 77, -193, -24, 0, 0, 0, 1, 1),
(63, 2, 4, 'move', 92, -193, -98, 0, 0, 0, 1, 1),
(64, 2, 4, 'turn', 0, -193, -98, 25, 34, 89, 1.6, 1),
(65, 2, 4, 'move', 58, -135, -98, 0, 0, 0, 1, 1),
(66, 3, 4, 'move', 134, -176, -379, 0, 0, 0, 1, 1),
(67, 3, 4, 'turn', 0, -176, -379, 25, 123, 141, 1.8, 1),
(68, 3, 4, 'move', 1, -175, -379, 0, 0, 0, 1, 1),
(69, 4, 4, 'move', 122, 252, -137, 0, 0, 0, 1, 1),
(70, 5, 4, 'turn', 0, 276, -8, -25, 6, 49, 1, 1),
(71, 5, 4, 'move', 49, 227, -8, 0, 0, 0, 1, 1),
(72, 5, 4, 'turn', 0, 227, -8, -25, 6, 49, 1, 1),
(73, 5, 4, 'move', 116, 122, 41, 0, 0, 0, 1, 1),
(74, 6, 4, 'move', 28, 186, 241, 0, 0, 0, 1, 1),
(75, 6, 4, 'turn', 0, 186, 241, 25, 27, 82, 1, 1),
(76, 6, 4, 'move', 122, 107, 147, 0, 0, 0, 1, 1),
(77, 7, 4, 'turn', 0, -237, 56, -40, 28, 38, 1, 1),
(78, 7, 4, 'move', 161, -95, 132, 0, 0, 0, 1, 1),
(79, 7, 4, 'turn', 0, -95, 132, -20, 14, 19, 1, 1),
(80, 7, 4, 'move', 49, -47, 142, 0, 0, 0, 1, 1),
(81, 7, 4, 'turn', 0, -47, 142, -20, 14, 19, 1, 1),
(82, 8, 4, 'turn', 0, 343, -100, 120, 66, 96, 1, 1),
(83, 8, 4, 'move', 210, 264, -295, 0, 0, 0, 1, 1),
(84, 9, 4, 'turn', 0, 286, 104, 100, 55, 80, 1, 1),
(85, 9, 4, 'move', 210, 221, -96, 0, 0, 0, 1, 1),
(86, 12, 4, 'impact', 0, -129, -101, 0, 0, 0, 0, 1),
(87, 14, 4, 'move', 0, -205, -10, 0, 0, 0, 0, 1),
(88, 15, 4, 'move', 0, -131, -56, 0, 0, 0, 0, 1),
(89, 11, 4, 'impact', 0, 121, 42, 0, 0, 0, 0, 1),
(90, 10, 4, 'move', 0, 77, 153, 0, 0, 0, 0, 1),
(91, 13, 4, 'impact', 0, -50, 149, 0, 0, 0, 0, 1),
(92, 16, 4, 'move', 0, 88, 196, 0, 0, 0, 0, 1);

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
(1, 2, 1, 4, 1, -1, 1, 6, 'Matter', 73, 0, 56, 17, '0', 34, 0, '', 0),
(2, 18, 1, 4, 1, -1, 2, 4, 'Laser', 4, 0, 0, 4, '0', 33, 0, '', 0),
(3, 16, 1, 4, 1, 3, 2, 13, 'Matter', 46, 0, 34, 12, '0', 23, 0, '', 0),
(4, 20, 1, 4, 1, 2, 2, 30, 'Matter', 48, 0, 37, 11, '0', 22, 0, '', 0),
(5, 21, 1, 4, 1, -1, 2, 7, 'Matter', 40, 0, 24, 16, '0', 32, 0, '', 0),
(6, 21, 1, 4, 1, -1, 2, 22, 'Matter', 43, 0, 28, 16, '0', 31, 0, '', 0),
(7, 43, 1, 2, 1, -1, 3, 43, 'Plasma', 32, 0, 8, 36, '0', 24, 0, '', 0),
(8, 42, 1, 2, 1, 4, 3, 39, 'Plasma', 34, 0, 19, 22, '0', 15, 0, '', 0),
(9, 47, 1, 2, 1, 2, 3, 25, 'Particle', 34, 0, 20, 14, '0', 13, 0, '', 0),
(10, 46, 1, 2, 1, 2, 3, 39, 'Particle', 38, 0, 25, 13, '0', 13, 1, '', 0),
(11, 44, 1, 2, 1, -1, 3, 47, 'Particle', 41, 0, 24, 17, '0', 17, 0, '', 0),
(12, 44, 1, 2, 1, 3, 3, 35, 'Particle', 41, 0, 30, 11, '0', 11, 0, '', 0),
(13, 40, 1, 3, 1, -1, 3, 6, 'Particle', 19, 0, 0, 19, '0', 32, 0, '', 0),
(14, 30, 1, 3, 1, -1, 3, 27, 'Particle', 52, 0, 21, 31, '0', 31, 0, '', 0),
(15, 38, 1, 3, 1, 5, 3, 17, 'Particle', 19, 0, 5, 14, '0', 14, 0, '', 0),
(16, 36, 1, 3, 1, 4, 3, 16, 'Particle', 18, 0, 4, 14, '0', 14, 0, '', 0),
(17, 36, 1, 3, 1, -1, 3, 9, 'Particle', 19, 0, 0, 19, '0', 26, 0, '', 0),
(18, 35, 1, 3, 1, -1, 3, 3, 'Particle', 19, 0, 0, 19, '0', 25, 0, '', 0),
(19, 35, 1, 3, 1, 4, 3, 10, 'Particle', 16, 0, 4, 12, '0', 12, 0, '', 0),
(20, 33, 1, 3, 1, -1, 3, 79, 'Particle', 60, 0, 37, 23, '0', 23, 0, '', 0),
(21, 32, 1, 3, 1, -1, 3, 25, 'Particle', 69, 0, 48, 21, '0', 21, 0, '', 0),
(22, 53, 1, 4, 1, -1, 3, 1, 'Laser', 22, 0, 0, 22, '0', 30, 0, '', 0),
(23, 55, 1, 4, 1, 2, 3, 49, 'Laser', 22, 0, 1, 21, '0', 20, 0, '', 0),
(24, 50, 1, 6, 1, 3, 3, 11, 'Laser', 26, 0, 6, 20, '0', 19, 0, '', 0),
(25, 104, 1, 2, 1, -1, 4, 24, 'Plasma', 35, 0, 20, 23, '0', 15, 0, '', 0),
(26, 103, 1, 2, 1, -1, 4, 36, 'Plasma', 34, 0, 21, 20, '0', 13, 0, '', 0),
(27, 94, 1, 2, 1, -1, 4, 17, 'Particle', 19, 0, 7, 12, '0', 12, 0, '', 0),
(28, 100, 1, 2, 1, -1, 4, 33, 'Particle', 16, 0, 5, 11, '0', 11, 0, '', 0),
(29, 100, 1, 2, 1, 17, 4, 6, 'Particle', 19, 0, 9, 10, '0', 10, 0, '', 0),
(30, 99, 1, 2, 1, 3, 4, 17, 'Particle', 18, 0, 11, 7, '0', 6, 0, '', 0),
(31, 99, 1, 2, 1, -1, 4, 3, 'Particle', 19, 0, 10, 9, '0', 9, 0, '', 0),
(32, 99, 1, 2, 1, -1, 4, 2, 'Particle', 17, 0, 9, 8, '0', 8, 0, '', 0),
(33, 98, 1, 2, 1, -1, 4, 19, 'Particle', 19, 0, 11, 8, '0', 8, 0, '', 0),
(34, 98, 1, 2, 1, -1, 4, 37, 'Particle', 23, 0, 16, 7, '0', 7, 0, '', 0),
(35, 97, 1, 2, 1, -1, 4, 23, 'Particle', 23, 0, 16, 7, '0', 7, 0, '', 0),
(36, 96, 1, 2, 1, 4, 4, 12, 'Particle', 18, 0, 13, 5, '0', 4, 0, '', 0),
(37, 95, 1, 2, 1, 3, 4, 35, 'Particle', 19, 0, 14, 5, '0', 4, 1, '', 0),
(38, 93, 1, 2, 1, -1, 4, 36, 'Particle', 21, 0, 15, 6, '0', 6, 0, '', 0),
(39, 93, 1, 2, 1, 4, 4, 2, 'Particle', 19, 0, 14, 5, '0', 4, 1, '', 0),
(40, 93, 1, 2, 1, -1, 4, 21, 'Particle', 23, 0, 18, 5, '0', 5, 0, '', 0),
(41, 91, 1, 3, 1, 3, 4, 18, 'Particle', 76, 0, 66, 10, '0', 10, 1, '', 0),
(42, 92, 1, 3, 1, -1, 4, 58, 'Particle', 73, 0, 54, 19, '0', 19, 0, '', 0),
(43, 90, 1, 3, 1, 6, 4, 18, 'Particle', 66, 0, 53, 13, '0', 13, 1, '', 0),
(44, 89, 1, 3, 1, 4, 4, 36, 'Particle', 60, 0, 51, 9, '0', 9, 0, '', 0),
(45, 74, 1, 4, 6, -1, 4, 34, 'Matter', 51, 0, 35, 16, '0', 32, 0, '', 0),
(46, 74, 1, 4, 6, -1, 4, 44, 'Matter', 45, 0, 30, 16, '0', 31, 0, '', 0),
(47, 77, 1, 4, 6, 7, 4, 36, 'Matter', 41, 0, 33, 8, '0', 16, 1, '', 0),
(48, 77, 1, 4, 6, 11, 4, 99, 'Matter', 42, 0, 34, 8, '0', 16, 0, '', 0),
(49, 66, 1, 4, 1, 4, 4, 21, 'Pulse', 26, 0, 6, 20, '0', 20, 0, '', 0),
(50, 66, 1, 4, 1, 4, 4, 21, 'Pulse', 25, 0, 6, 19, '0', 19, 0, '', 0),
(51, 66, 1, 4, 1, 4, 4, 21, 'Pulse', 24, 0, 5, 19, '0', 19, 0, '', 0),
(52, 75, 1, 4, 6, -1, 4, 57, 'Pulse', 23, 0, 0, 23, '0', 30, 0, '', 0),
(53, 75, 1, 4, 6, -1, 4, 57, 'Pulse', 22, 0, 0, 22, '0', 29, 0, '', 0),
(54, 75, 1, 4, 6, -1, 4, 57, 'Pulse', 25, 0, 0, 25, '0', 29, 0, '', 0),
(55, 76, 1, 4, 6, 11, 4, 78, 'Pulse', 26, 0, 12, 14, '0', 14, 0, '', 0),
(56, 76, 1, 4, 6, 11, 4, 78, 'Pulse', 26, 0, 12, 14, '0', 14, 0, '', 0),
(57, 76, 1, 4, 6, 11, 4, 78, 'Pulse', 22, 0, 8, 14, '0', 14, 0, '', 0),
(58, 78, 1, 4, 6, -1, 4, 30, 'Pulse', 20, 0, 0, 20, '0', 26, 0, '', 0),
(59, 78, 1, 4, 6, -1, 4, 30, 'Pulse', 21, 0, 0, 21, '0', 26, 0, '', 0),
(60, 78, 1, 4, 6, -1, 4, 30, 'Pulse', 26, 0, 1, 25, '0', 25, 0, '', 0),
(61, 79, 1, 4, 6, 11, 4, 5, 'Pulse', 26, 0, 14, 12, '0', 12, 0, '', 0),
(62, 79, 1, 4, 6, 11, 4, 5, 'Pulse', 21, 0, 9, 12, '0', 12, 0, '', 0),
(63, 79, 1, 4, 6, 11, 4, 5, 'Pulse', 25, 0, 13, 12, '0', 12, 0, '', 0),
(64, 61, 1, 5, 1, -1, 4, 13, 'Matter', 42, 0, 33, 10, '0', 19, 0, '', 0),
(65, 61, 1, 5, 1, -1, 4, 18, 'Matter', 41, 0, 32, 9, '0', 18, 0, '', 0),
(66, 68, 1, 5, 1, -1, 4, 18, 'Matter', 58, 0, 50, 9, '0', 17, 0, '', 0),
(67, 69, 1, 5, 1, -1, 4, 22, 'Matter', 45, 0, 37, 8, '0', 16, 0, '', 0),
(68, 70, 1, 5, 1, 3, 4, 12, 'Pulse', 24, 0, 12, 12, '0', 12, 0, '', 0),
(69, 70, 1, 5, 1, 3, 4, 12, 'Pulse', 22, 0, 11, 11, '0', 10, 0, '', 0),
(70, 70, 1, 5, 1, 3, 4, 12, 'Pulse', 24, 0, 14, 10, '0', 10, 0, '', 0),
(71, 80, 1, 6, 1, 3, 4, 15, 'Particle', 14, 0, 0, 28, '0', 18, 0, '', 0),
(72, 105, 1, 2, 1, -1, 4, 21, 'explosive', 44, 0, 39, 5, '0', 5, 0, '', 0),
(73, 105, 1, 2, 1, -1, 4, 1, 'explosive', 36, 0, 31, 5, '0', 5, 0, '', 0),
(74, 105, 1, 2, 1, -1, 4, 7, 'explosive', 40, 0, 36, 4, '0', 4, 0, '', 0),
(75, 105, 1, 2, 1, 16, 4, 72, 'explosive', 41, 0, 37, 4, '0', 4, 0, '', 0),
(76, 106, 1, 5, 1, 3, 4, 54, 'explosive', 67, 0, 58, 9, '0', 9, 1, '', 0),
(77, 106, 1, 5, 1, 4, 4, 77, 'explosive', 76, 0, 71, 5, '0', 5, 1, '', 0),
(78, 106, 1, 5, 1, 10, 4, 2, 'explosive', 57, 0, 47, 10, '0', 10, 0, '', 0),
(79, 107, 1, 7, 0, 15, 4, 9, 'explosive', 23, 0, 15, 8, '0', 8, 0, '', 0),
(80, 107, 1, 7, 0, 5, 4, 84, 'explosive', 28, 0, 20, 8, '0', 8, 0, '', 0),
(81, 107, 1, 7, 0, 3, 4, 71, 'explosive', 25, 0, 17, 8, '0', 8, 0, '', 0);

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
(1, 7, 9, 'Aurora'),
(2, 8, 9, 'Sentri'),
(3, 9, 9, 'Sentri');

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
(1, 1, 1, 1, 4, 3, 2, 32, ' 61 94', 0, 1),
(2, 1, 1, 2, 4, 3, 2, 36, ' 71 6', 1, 1),
(3, 1, 1, 3, 4, 15, 1, 53, '67 ', 0, 1),
(4, 1, 1, 4, 3, 2, 1, 15, ' 32', 0, 1),
(5, 1, 1, 4, 3, 3, 1, 15, ' 82', 0, 1),
(6, 1, 1, 4, 3, 4, 1, 15, ' 61', 0, 1),
(7, 1, 1, 4, 3, 5, 1, 15, ' 54', 0, 1),
(8, 1, 2, 1, 6, 8, 2, 0, '', 0, 1),
(9, 1, 2, 1, 6, 12, 2, 0, '', 0, 1),
(10, 1, 2, 2, 5, 8, 2, 0, '', 0, 1),
(11, 1, 2, 2, 5, 12, 2, 0, '', 0, 1),
(12, 1, 2, 3, 0, 4, 0, 0, '', 0, 1),
(13, 1, 2, 4, 0, 11, 0, 0, '', 0, 1),
(14, 1, 2, 4, 0, 21, 0, 0, '', 0, 1),
(15, 1, 2, 6, 2, 3, 4, 0, '', 0, 1),
(16, 1, 2, 1, 4, 2, 2, 31, ' 95 13', 1, 1),
(17, 1, 2, 1, 4, 4, 2, 31, ' 76 96', 0, 1),
(18, 1, 2, 1, 4, 10, 1, 26, '4 ', 1, 1),
(19, 1, 2, 1, 4, 11, 1, 26, '41 ', 0, 1),
(20, 1, 2, 2, 4, 2, 2, 37, ' 30 69', 1, 1),
(21, 1, 2, 2, 4, 4, 2, 37, ' 7 22', 2, 1),
(22, 1, 2, 2, 4, 10, 1, 33, '82 ', 0, 1),
(23, 1, 2, 2, 4, 11, 1, 33, '43 ', 0, 1),
(24, 1, 2, 3, 4, 3, 1, 30, '74 ', 0, 1),
(25, 1, 2, 3, 4, 5, 1, 30, '31 ', 0, 1),
(26, 1, 2, 3, 4, 8, 1, 69, '95 ', 0, 1),
(27, 1, 2, 3, 4, 9, 1, 30, '51 ', 0, 1),
(28, 1, 2, 3, 4, 10, 1, 30, '93 ', 0, 1),
(29, 1, 3, 5, 7, 3, 3, 0, '', 0, 1),
(30, 1, 3, 4, 3, 2, 1, 91, ' 27', 1, 1),
(31, 1, 3, 4, 3, 3, 1, 82, ' 97', 0, 1),
(32, 1, 3, 4, 3, 4, 1, 91, ' 25', 1, 1),
(33, 1, 3, 4, 3, 5, 1, 91, ' 79', 1, 1),
(34, 1, 3, 4, 3, 7, 4, 17, ' 31 26 98 60', 0, 1),
(35, 1, 3, 4, 3, 8, 4, 17, ' 3 10 58 84', 2, 1),
(36, 1, 3, 4, 3, 9, 4, 17, ' 16 53 34 9', 2, 1),
(37, 1, 3, 4, 3, 10, 4, 17, ' 47 46 85 50', 0, 1),
(38, 1, 3, 4, 3, 17, 4, 17, ' 49 43 50 17', 1, 1),
(39, 1, 3, 4, 3, 18, 4, 17, ' 29 26 74 74', 0, 1),
(40, 1, 3, 4, 3, 19, 4, 17, ' 99 87 6 100', 1, 1),
(41, 1, 3, 4, 3, 20, 4, 17, ' 78 98 60 54', 0, 1),
(42, 1, 3, 6, 2, 2, 1, 61, ' 39', 1, 1),
(43, 1, 3, 6, 2, 4, 1, 61, ' 43', 1, 1),
(44, 1, 3, 6, 2, 6, 2, 61, ' 47 35', 2, 1),
(45, 1, 3, 6, 2, 7, 2, 61, ' 92 68', 0, 1),
(46, 1, 3, 6, 2, 9, 2, 61, ' 91 39', 1, 1),
(47, 1, 3, 6, 2, 10, 2, 61, ' 83 25', 1, 1),
(48, 1, 3, 1, 6, 6, 1, 13, '95 ', 0, 1),
(49, 1, 3, 1, 6, 7, 1, 13, '41 ', 0, 1),
(50, 1, 3, 2, 6, 6, 1, 16, '11 ', 1, 1),
(51, 1, 3, 2, 6, 7, 1, 16, '57 ', 0, 1),
(52, 1, 3, 3, 4, 3, 1, 51, '56 ', 0, 1),
(53, 1, 3, 3, 4, 5, 1, 51, '1 ', 1, 1),
(54, 1, 3, 3, 4, 9, 1, 51, '73 ', 0, 1),
(55, 1, 3, 3, 4, 10, 1, 51, '49 ', 1, 1),
(56, 1, 4, 6, 7, 3, 4, 0, '', 0, 1),
(57, 1, 4, 1, 4, 8, 2, 0, '', 0, 1),
(58, 1, 4, 1, 4, 12, 2, 0, '', 0, 1),
(59, 1, 4, 2, 4, 8, 2, 0, '', 0, 1),
(60, 1, 4, 2, 4, 12, 2, 0, '', 0, 1),
(61, 1, 4, 1, 5, 2, 2, 35, ' 13 18', 2, 1),
(62, 1, 4, 1, 5, 3, 2, 27, ' 44 98', 0, 1),
(63, 1, 4, 1, 5, 4, 2, 35, ' 74 76', 0, 1),
(64, 1, 4, 1, 5, 6, 1, 30, '44 ', 0, 1),
(65, 1, 4, 1, 5, 7, 1, 30, '57 ', 0, 1),
(66, 1, 4, 1, 4, 10, 1, 47, '21 ', 3, 1),
(67, 1, 4, 1, 4, 11, 1, 47, '49 ', 0, 1),
(68, 1, 4, 2, 5, 3, 2, 29, ' 18 95', 1, 1),
(69, 1, 4, 2, 5, 4, 2, 38, ' 22 53', 1, 1),
(70, 1, 4, 2, 5, 6, 1, 37, '12 ', 3, 1),
(71, 1, 4, 2, 5, 7, 1, 37, '70 ', 0, 1),
(72, 1, 4, 2, 4, 10, 1, 55, '85 ', 0, 1),
(73, 1, 4, 2, 4, 11, 1, 55, '73 ', 0, 1),
(74, 1, 4, 3, 4, 2, 2, 135, ' 34 44', 2, 1),
(75, 1, 4, 3, 4, 3, 1, 106, '57 ', 3, 1),
(76, 1, 4, 3, 4, 5, 1, 106, '78 ', 3, 1),
(77, 1, 4, 3, 4, 6, 2, 135, ' 36 99', 2, 1),
(78, 1, 4, 3, 4, 9, 1, 106, '30 ', 3, 1),
(79, 1, 4, 3, 4, 10, 1, 106, '5 ', 3, 1),
(80, 1, 4, 7, 6, 2, 1, 27, ' 15', 1, 1),
(81, 1, 4, 7, 6, 4, 1, 27, ' 87', 0, 1),
(82, 1, 4, 7, 6, 6, 1, 27, ' 91', 0, 1),
(83, 1, 4, 7, 6, 8, 1, 27, ' 35', 0, 1),
(84, 1, 4, 7, 6, 10, 1, 27, ' 66', 0, 1),
(85, 1, 4, 7, 6, 12, 1, 27, ' 55', 0, 1),
(86, 1, 4, 7, 6, 14, 1, 27, ' 91', 0, 1),
(87, 1, 4, 7, 6, 16, 1, 27, ' 89', 0, 1),
(88, 1, 4, 7, 6, 18, 1, 27, ' 44', 0, 1),
(89, 1, 4, 4, 3, 2, 1, 99, ' 36', 1, 1),
(90, 1, 4, 4, 3, 3, 1, 95, ' 18', 1, 1),
(91, 1, 4, 4, 3, 4, 1, 102, ' 18', 1, 1),
(92, 1, 4, 4, 3, 5, 1, 102, ' 58', 1, 1),
(93, 1, 4, 4, 2, 7, 4, 37, ' 36 72 2 21', 3, 1),
(94, 1, 4, 4, 2, 8, 4, 37, ' 81 69 65 17', 1, 1),
(95, 1, 4, 4, 2, 9, 4, 37, ' 82 72 35 63', 1, 1),
(96, 1, 4, 4, 2, 10, 4, 37, ' 94 12 80 66', 1, 1),
(97, 1, 4, 4, 2, 17, 4, 37, ' 97 91 23 96', 1, 1),
(98, 1, 4, 4, 2, 18, 4, 37, ' 19 37 99 90', 2, 1),
(99, 1, 4, 4, 2, 19, 4, 37, ' 17 99 3 2', 3, 1),
(100, 1, 4, 4, 2, 20, 4, 37, ' 86 63 33 6', 2, 1),
(101, 1, 4, 5, 11, 6, 4, 21, ' 80 94 66 59', 0, 1),
(102, 1, 4, 5, 11, 8, 4, 21, ' 39 72 98 29', 0, 1),
(103, 1, 4, 6, 2, 2, 1, 79, ' 36', 1, 1),
(104, 1, 4, 6, 2, 4, 1, 79, ' 24', 1, 1),
(105, 1, 4, 12, 2, 0, 4, 100, ' 21 1 7 72', 4, 1),
(106, 1, 4, 11, 5, 0, 4, 80, ' 54 92 77 2', 3, 1),
(107, 1, 4, 13, 7, 0, 3, 100, ' 9 84 71', 3, 1);

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
(1, 'myGame', 'active', 4, 3, 3500, 175);

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
(1, 1, 8, 'Cyclops', 8),
(2, 1, 12, 'Cyclops', 8),
(3, 2, 8, 'Cyclops', 8),
(4, 2, 12, 'Cyclops', 8),
(8, 5, 3, 'Hasta', 6),
(9, 6, 3, 'Javelin', 16);

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
(1, 1, 1, 4, 3, 'Earth Alliance', 1471, 'waiting'),
(2, 2, 1, 4, 3, 'Centauri Republic', 1275, 'waiting');

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
(1, 1, 6, 1, '-1', 0),
(2, 1, 7, 1, '-1', 0),
(3, 1, 10, 1, '-1', 0),
(4, 1, 11, 1, '-1', 0),
(5, 2, 6, 1, '-1', 0),
(6, 2, 7, 1, '-1', 0),
(7, 2, 10, 1, '-1', 0),
(8, 2, 11, 1, '-1', 0),
(9, 3, 3, 1, '-1', 0),
(10, 3, 5, 1, '-1', 0),
(11, 3, 9, 1, '-1', 0),
(12, 3, 10, 1, '-1', 0),
(13, 3, 16, 1, '-1', 0),
(14, 3, 17, 1, '-1', 0),
(15, 1, 6, 2, '-2', 0),
(16, 1, 7, 2, '-2', 0),
(17, 1, 10, 2, '-2', 0),
(18, 1, 11, 2, '-2', 0),
(19, 2, 6, 2, '-2', 0),
(20, 2, 7, 2, '-2', 0),
(21, 2, 10, 2, '-2', 0),
(22, 2, 11, 2, '-2', 0),
(23, 3, 2, 2, '0', 0),
(24, 3, 3, 2, '-2', 0),
(25, 3, 5, 2, '-2', 0),
(26, 3, 6, 2, '0', 0),
(27, 3, 9, 2, '-2', 0),
(28, 3, 10, 2, '-2', 0),
(29, 3, 12, 2, '0', 0),
(30, 3, 13, 2, '0', 0),
(31, 3, 15, 2, '0', 0),
(32, 3, 16, 2, '-2', 0),
(33, 3, 17, 2, '-2', 0),
(34, 3, 22, 2, '1', 15),
(35, 3, 22, 2, '1', 18),
(36, 4, 11, 3, '0', 0),
(37, 4, 13, 3, '0', 0),
(38, 4, 14, 3, '0', 0),
(39, 4, 15, 3, '0', 0),
(40, 4, 21, 3, '0', 0),
(41, 4, 24, 3, '1', 10),
(42, 4, 26, 3, '1', 10),
(43, 1, 6, 3, '-2', 0),
(44, 1, 7, 3, '-2', 0),
(45, 1, 10, 3, '-2', 0),
(46, 1, 11, 3, '-2', 0),
(47, 2, 6, 3, '-2', 0),
(48, 2, 7, 3, '-2', 0),
(49, 2, 10, 3, '-2', 0),
(50, 2, 11, 3, '-2', 0),
(51, 3, 3, 3, '-2', 0),
(52, 3, 4, 3, '0', 0),
(53, 3, 5, 3, '-2', 0),
(54, 3, 9, 3, '-2', 0),
(55, 3, 10, 3, '-2', 0),
(56, 3, 12, 3, '0', 0),
(57, 3, 13, 3, '0', 0),
(58, 3, 16, 3, '-2', 0),
(59, 3, 17, 3, '-2', 0),
(60, 3, 20, 3, '1', 10),
(61, 3, 20, 3, '1', 12),
(62, 4, 11, 4, '0', 0),
(63, 4, 13, 4, '0', 0),
(64, 4, 14, 4, '0', 0),
(65, 4, 15, 4, '0', 0),
(66, 4, 21, 4, '0', 0),
(67, 1, 6, 4, '-1', 0),
(68, 1, 7, 4, '-1', 0),
(69, 1, 10, 4, '-1', 0),
(70, 1, 11, 4, '-1', 0),
(71, 2, 6, 4, '-1', 0),
(72, 2, 7, 4, '-1', 0),
(73, 2, 10, 4, '-1', 0),
(74, 2, 11, 4, '-1', 0),
(75, 3, 3, 4, '-1', 0),
(76, 3, 4, 4, '0', 0),
(77, 3, 5, 4, '-1', 0),
(78, 3, 9, 4, '-1', 0),
(79, 3, 10, 4, '-1', 0),
(80, 3, 12, 4, '0', 0),
(81, 3, 13, 4, '0', 0),
(82, 3, 16, 4, '-1', 0),
(83, 3, 17, 4, '-1', 0);

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
(1, 1, 1, 'Avenger', 3, 450),
(2, 1, 1, 'Hyperion', 4, 850),
(3, 1, 2, 'Haven', 2, 270);

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
(1, 4, 26, 1, 0, 243),
(2, 5, 13, 1, 0, 116),
(3, 6, 15, 1, 0, 174),
(4, 1, 17, 1, 0, 151),
(5, 2, 17, 1, 0, 151),
(6, 3, 22, 1, 0, 174),
(7, 1, 17, 2, 0, 151),
(8, 2, 17, 2, 0, 151),
(9, 3, 22, 2, 6, 900),
(10, 4, 26, 2, 354, 1050),
(11, 5, 13, 2, 0, 116),
(12, 6, 15, 2, 0, 174),
(13, 4, 26, 3, 354, 733),
(14, 5, 13, 3, 12, 453),
(15, 6, 15, 3, 12, 728),
(16, 1, 17, 3, 359, 650),
(17, 2, 17, 3, 357, 650),
(18, 3, 22, 3, 0, 174),
(19, 4, 26, 4, 357, 500),
(20, 5, 13, 4, 349, 240),
(21, 6, 15, 4, 4, 386),
(22, 1, 17, 4, 26, 379),
(23, 2, 17, 4, 29, 325),
(24, 3, 22, 4, 14, 495);

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
(1, 4, 2, 2, 'damage2', 0),
(2, 4, 3, 2, 'range2', 0),
(3, 2, 3, 3, 'damage2', 0),
(4, 2, 4, 3, 'damage1', 0),
(5, 4, 2, 3, 'range1', 0),
(6, 2, 16, 4, 'dmg25', 1),
(7, 2, 17, 4, 'output_0.85', 0),
(8, 3, 4, 4, 'launch2', 0),
(9, 4, 4, 4, 'damage1', 0),
(10, 4, 11, 4, 'launch3', 0),
(11, 5, 10, 4, 'disabled', 1);

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
(1, 1, 1, 1, 0, 'Artemis', 'bought', 1, 0),
(2, 1, 1, 1, 0, 'Artemis', 'bought', 1, 0),
(3, 1, 1, 1, 0, 'Hyperion', 'bought', 1, 0),
(4, 1, 2, 1, 0, 'Primus', 'bought', 1, 0),
(5, 1, 2, 1, 0, 'Vorchan', 'bought', 1, 0),
(6, 1, 2, 1, 0, 'Demos', 'bought', 1, 0),
(7, 1, 1, 0, 0, 'Flight', 'deployed', 2, 0),
(8, 1, 2, 0, 0, 'Flight', 'deployed', 2, 0),
(9, 1, 2, 0, 0, 'Flight', 'deployed', 2, 0),
(10, 1, 1, 6, 1, 'Cyclops', 'launched', 4, 0),
(11, 1, 1, 5, 1, 'Cyclops', 'impact', 4, 0),
(12, 1, 2, 2, 1, 'Javelin', 'impact', 4, 0),
(13, 1, 2, 7, 1, 'Hasta', 'impact', 3, 0),
(14, 1, 1, 4, 1, 'Cyclops', 'launched', 4, 0),
(15, 1, 1, 4, 1, 'Cyclops', 'launched', 4, 0),
(16, 1, 2, 7, 1, 'Javelin', 'launched', 4, 0);

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
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;
--
-- AUTO_INCREMENT für Tabelle `damages`
--
ALTER TABLE `damages`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;
--
-- AUTO_INCREMENT für Tabelle `dogfights`
--
ALTER TABLE `dogfights`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `fighters`
--
ALTER TABLE `fighters`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT für Tabelle `fireorders`
--
ALTER TABLE `fireorders`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=108;
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
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;
--
-- AUTO_INCREMENT für Tabelle `reinforcements`
--
ALTER TABLE `reinforcements`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT für Tabelle `sensors`
--
ALTER TABLE `sensors`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
--
-- AUTO_INCREMENT für Tabelle `systemcrits`
--
ALTER TABLE `systemcrits`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT für Tabelle `units`
--
ALTER TABLE `units`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

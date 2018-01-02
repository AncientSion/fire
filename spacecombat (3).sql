-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 02. Jan 2018 um 22:35
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
(1, 6, 1, 'deploy', 0, 647, 278, 191, 0, 0, 1, 1),
(2, 7, 1, 'deploy', 0, 638, 378, 188, 0, 0, 1, 1),
(3, 8, 1, 'deploy', 0, 651, -140, 180, 0, 0, 1, 1),
(4, 9, 1, 'deploy', 0, 715, 334, 187, 0, 0, 1, 1),
(5, 2, 1, 'deploy', 0, -642, 95, 0, 0, 0, 1, 1),
(6, 3, 1, 'deploy', 0, -639, 17, 0, 0, 0, 1, 1),
(7, 1, 1, 'deploy', 0, -691, 63, 0, 0, 0, 1, 1),
(8, 4, 1, 'deploy', 0, -672, -127, 0, 0, 0, 1, 1),
(9, 5, 1, 'deploy', 0, -669, 440, 0, 0, 0, 1, 1),
(10, 1, 1, 'jump', 20, -709, 70, -13, 0, 0, 0, 1),
(11, 2, 1, 'jump', 25, -619, 87, 5, 0, 0, 0, 1),
(12, 3, 1, 'jump', 29, -663, 33, 6, 0, 0, 0, 1),
(13, 6, 1, 'jump', 25, 666, 293, -11, 0, 0, 0, 1),
(14, 7, 1, 'jump', 24, 634, 355, -1, 0, 0, 0, 1),
(15, 6, 1, 'turn', 0, 666, 293, -11, 16, 37, 1, 1),
(16, 6, 1, 'move', 160, 526, 371, 0, 0, 0, 1, 1),
(17, 6, 1, 'turn', 0, 526, 371, 28, 78, 46, 2, 1),
(18, 6, 1, 'move', 15, 512, 367, 0, 0, 0, 1, 1),
(19, 7, 1, 'move', 170, 468, 396, 0, 0, 0, 1, 1),
(20, 7, 1, 'turn', 0, 468, 396, 11, 32, 18, 2, 1),
(21, 7, 1, 'move', 5, 463, 394, 0, 0, 0, 1, 1),
(22, 8, 1, 'move', 190, 461, -140, 0, 0, 0, 1, 1),
(23, 9, 1, 'move', 200, 516, 310, 0, 0, 0, 1, 1),
(24, 2, 1, 'move', 167, -467, 158, 0, 0, 0, 1, 1),
(25, 2, 1, 'turn', 0, -467, 158, 4, 6, 8, 1.2, 1),
(26, 2, 1, 'move', 8, -459, 159, 0, 0, 0, 1, 1),
(27, 3, 1, 'turn', 0, -663, 33, 6, 7, 14, 1, 1),
(28, 3, 1, 'move', 175, -492, 69, 0, 0, 0, 1, 1),
(29, 1, 1, 'turn', 0, -709, 70, 30, 22, 57, 1, 1),
(30, 1, 1, 'move', 175, -542, 121, 0, 0, 0, 1, 1),
(31, 4, 1, 'speed', 1, -672, -127, 0, 12, 0, 1, 1),
(32, 4, 1, 'move', 213, -470, -195, 0, 0, 0, 1, 1),
(33, 5, 1, 'speed', 1, -669, 440, 0, 12, 0, 1, 1),
(34, 5, 1, 'turn', 0, -669, 440, 28, 11, 47, 1, 1),
(35, 5, 1, 'move', 213, -481, 540, 0, 0, 0, 1, 1),
(36, 5, 1, 'turn', 0, -481, 540, -18, 14, 8, 2, 1),
(37, 10, 2, 'deploy', 0, 436, 398, 171, 1, 0, 1, 1),
(38, 11, 2, 'deploy', 0, 485, 372, 170, 1, 0, 1, 1),
(39, 12, 2, 'deploy', 0, -528, 115, -15, 0, 0, 0, 1),
(40, 3, 2, 'move', 175, -321, 105, 0, 0, 0, 1, 1),
(41, 3, 2, 'turn', 0, -321, 105, -21, 45, 12, 2, 1),
(42, 2, 2, 'move', 164, -295, 154, 0, 0, 0, 1, 1),
(43, 2, 2, 'turn', 0, -295, 154, -24, 52, 27, 2, 1),
(44, 2, 2, 'move', 11, -284, 151, 0, 0, 0, 1, 1),
(45, 1, 2, 'move', 175, -375, 172, 0, 0, 0, 1, 1),
(46, 1, 2, 'turn', 0, -375, 172, -3, 4, 2, 2, 1),
(47, 5, 2, 'move', 213, -271, 577, 0, 0, 0, 1, 1),
(48, 5, 2, 'turn', 0, -271, 577, -30, 23, 12, 2, 1),
(49, 4, 2, 'move', 211, -275, -278, 0, 0, 0, 1, 1),
(50, 4, 2, 'turn', 0, -275, -278, 12, 5, 20, 1, 1),
(51, 4, 2, 'move', 2, -273, -278, 0, 0, 0, 1, 1),
(52, 7, 2, 'turn', 0, 463, 394, 30, 42, 72, 1, 1),
(53, 7, 2, 'move', 175, 346, 264, 0, 0, 0, 1, 1),
(54, 7, 2, 'turn', 0, 346, 264, 28, 77, 17, 2, 1),
(55, 6, 2, 'turn', 0, 512, 367, 30, 42, 72, 1, 1),
(56, 6, 2, 'move', 175, 393, 239, 0, 0, 0, 1, 1),
(57, 6, 2, 'turn', 0, 393, 239, 30, 83, 18, 2, 1),
(58, 8, 2, 'move', 187, 288, -212, 0, 0, 0, 1, 1),
(59, 8, 2, 'turn', 0, 288, -212, -29, 9, 40, 1, 1),
(60, 9, 2, 'turn', 0, 516, 310, 35, 7, 42, 1, 1),
(61, 9, 2, 'move', 200, 367, 176, 0, 0, 0, 1, 1),
(62, 12, 2, 'move', 880, -421, 72, 338, 0, 0, 0, 1),
(63, 10, 2, 'move', 730, 361, 417, 166, 0, 0, 0, 1),
(64, 11, 2, 'move', 784, 411, 392, 165, 0, 0, 0, 1),
(65, 3, 3, 'move', 175, -148, 78, 0, 0, 0, 1, 1),
(66, 3, 3, 'turn', 0, -148, 78, 11, 24, 6, 2, 1),
(67, 2, 3, 'turn', 0, -284, 151, 10, 11, 22, 1, 1),
(68, 2, 3, 'move', 175, -110, 136, 0, 0, 0, 1, 1),
(69, 1, 3, 'turn', 0, -375, 172, -19, 14, 37, 1, 1),
(70, 1, 3, 'move', 175, -201, 157, 0, 0, 0, 1, 1),
(71, 1, 3, 'turn', 0, -201, 157, -4, 6, 2, 2, 1),
(72, 5, 3, 'move', 213, -71, 504, 0, 0, 0, 1, 1),
(73, 5, 3, 'turn', 0, -71, 504, -26, 20, 11, 2, 1),
(74, 4, 3, 'speed', -1, -273, -278, 0, 13, 0, 1, 1),
(75, 4, 3, 'move', 190, -87, -238, 0, 0, 0, 1, 1),
(76, 7, 3, 'turn', 0, 346, 264, -30, 42, 72, 1, 1),
(77, 7, 3, 'move', 72, 296, 212, 0, 0, 0, 1, 1),
(78, 7, 3, 'turn', 0, 296, 212, -30, 42, 72, 1, 1),
(79, 7, 3, 'move', 72, 227, 192, 0, 0, 0, 1, 1),
(80, 7, 3, 'turn', 0, 227, 192, -8, 11, 19, 1, 1),
(81, 7, 3, 'move', 31, 196, 188, 0, 0, 0, 1, 1),
(82, 6, 3, 'turn', 0, 393, 239, -30, 42, 72, 1, 1),
(83, 6, 3, 'move', 72, 344, 186, 0, 0, 0, 1, 1),
(84, 6, 3, 'turn', 0, 344, 186, -22, 31, 53, 1, 1),
(85, 6, 3, 'move', 53, 296, 164, 0, 0, 0, 1, 1),
(86, 6, 3, 'turn', 0, 296, 164, -15, 21, 37, 1, 1),
(87, 6, 3, 'move', 50, 247, 155, 0, 0, 0, 1, 1),
(88, 8, 3, 'turn', 0, 288, -212, 20, 7, 28, 1, 1),
(89, 8, 3, 'move', 190, 100, -182, 0, 0, 0, 1, 1),
(90, 8, 3, 'turn', 0, 100, -182, -32, 20, 11, 2, 1),
(91, 12, 3, 'move', 580, -214, -29, 334, 0, 0, 0, 1),
(92, 10, 3, 'move', 441, 210, 447, 169, 0, 0, 0, 1),
(93, 11, 3, 'move', 495, 261, 427, 167, 0, 0, 0, 1),
(94, 9, 3, 'move', 200, 250, 100, 191, 0, 0, 1, 1),
(95, 3, 4, 'turn', 0, -148, 78, 30, 33, 66, 1, 1),
(96, 3, 4, 'move', 66, -92, 113, 0, 0, 0, 1, 1),
(97, 3, 4, 'turn', 0, -92, 113, 30, 33, 66, 1, 1),
(98, 3, 4, 'move', 109, -41, 209, 0, 0, 0, 1, 1),
(99, 2, 4, 'turn', 0, -110, 136, 30, 33, 66, 1, 1),
(100, 2, 4, 'move', 66, -50, 164, 0, 0, 0, 1, 1),
(101, 2, 4, 'turn', 0, -50, 164, 30, 33, 66, 1, 1),
(102, 2, 4, 'move', 109, 13, 253, 0, 0, 0, 1, 1),
(103, 2, 4, 'turn', 0, 13, 253, -13, 28, 7, 2, 1),
(104, 1, 4, 'turn', 0, -201, 157, -17, 13, 33, 1, 1),
(105, 1, 4, 'move', 175, -44, 80, 0, 0, 0, 1, 1),
(106, 5, 4, 'turn', 0, -71, 504, -40, 16, 65, 1, 1),
(107, 5, 4, 'move', 213, -56, 292, 0, 0, 0, 1, 1),
(108, 5, 4, 'turn', 0, -56, 292, 12, 10, 5, 2, 1),
(109, 4, 4, 'speed', 1, -87, -238, 0, 12, 0, 1, 1),
(110, 4, 4, 'turn', 0, -87, -238, 40, 16, 65, 1, 1),
(111, 4, 4, 'move', 213, 44, -70, 0, 0, 0, 1, 1),
(112, 4, 4, 'turn', 0, 44, -70, -36, 14, 59, 1, 1),
(113, 7, 4, 'move', 175, 41, 106, 0, 0, 0, 1, 1),
(114, 7, 4, 'turn', 0, 41, 106, -30, 83, 18, 2, 1),
(115, 6, 4, 'move', 175, 84, 90, 0, 0, 0, 1, 1),
(116, 8, 4, 'move', 98, 6, -151, 0, 0, 0, 1, 1),
(117, 8, 4, 'turn', 0, 6, -151, -40, 12, 56, 1, 1),
(118, 8, 4, 'move', 88, -30, -70, 0, 0, 0, 1, 1),
(119, 8, 4, 'turn', 0, -30, -70, -21, 14, 15, 2, 1),
(120, 8, 4, 'move', 4, -29, -66, 0, 0, 0, 1, 1),
(121, 9, 4, 'turn', 0, 250, 100, 13, 3, 16, 1, 1),
(122, 9, 4, 'move', 195, 189, -86, 0, 0, 0, 1, 1),
(123, 9, 4, 'turn', 0, 189, -86, -21, 10, 13, 2, 1),
(124, 9, 4, 'move', 5, 185, -89, 0, 0, 0, 1, 1),
(125, 12, 4, 'move', 189, -29, -66, 349, 0, 0, 0, 1),
(126, 10, 4, 'move', 308, 10, 331, 210, 0, 0, 0, 1),
(127, 11, 4, 'move', 345, 48, 336, 203, 0, 0, 0, 1);

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

--
-- Daten für Tabelle `chat`
--

INSERT INTO `chat` (`id`, `username`, `userid`, `msg`, `time`) VALUES
(1, 'Chris', 1, 'kkkkkkkkkkkk', 1514884163);

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
(1, 5, 1, 2, 6, 1, 2, 3, 'Particle', 34, 3, 0, 13, 18, 16, 0, 'p;', 0),
(2, 6, 1, 2, 6, 1, 2, 9, 'Particle', 37, 3, 0, 13, 21, 16, 0, 'p;', 0),
(3, 10, 1, 2, 6, 4, 2, 16, 'Particle', 33, 3, 16, 14, 0, 17, 0, 'p;', 0),
(134, 39, 1, 3, 6, 1, 3, 5, 'Particle', 30, 0, 0, 14, 16, 14, 0, 'p;', 0),
(135, 40, 1, 3, 6, 1, 3, 28, 'Particle', 36, 0, 0, 13, 23, 13, 0, 'p;', 0),
(136, 36, 1, 3, 6, 1, 3, 27, 'Particle', 31, 0, 0, 12, 19, 12, 0, 'p;', 0),
(137, 37, 1, 3, 6, 1, 3, 6, 'Particle', 35, 0, 0, 12, 23, 12, 0, 'p;', 0),
(138, 35, 1, 3, 6, 8, 3, 37, 'Particle', 49, 0, 41, 8, 0, 8, 0, 'p;', 0),
(139, 37, 1, 3, 6, 8, 3, 30, 'Particle', 33, 0, 15, 7, 11, 7, 1, 'p;', 0),
(140, 21, 1, 6, 6, 1, 3, 58, 'Laser', 139, 0, 0, 17, 29, 17, 0, 'p;', 0),
(141, 21, 1, 6, 6, 1, 3, 58, 'Laser', 139, 0, 0, 16, 30, 16, 0, 'p;', 0),
(142, 16, 1, 6, 6, 1, 3, 10, 'Matter', 36, 0, 0, 8, 28, 15, 0, 'p;', 0),
(143, 16, 1, 6, 6, 1, 3, 42, 'Matter', 36, 0, 0, 7, 29, 14, 0, 'p;', 0),
(144, 17, 1, 6, 6, 1, 3, 49, 'Matter', 65, 0, 0, 7, 58, 14, 0, 'p;', 0),
(145, 18, 1, 6, 6, 1, 3, 50, 'Matter', 36, 0, 0, 7, 29, 13, 0, 'p;', 0),
(146, 13, 1, 6, 6, 1, 3, 52, 'Matter', 36, 0, 0, 7, 29, 13, 0, 'p;', 0),
(147, 13, 1, 6, 6, 1, 3, 61, 'Matter', 36, 0, 0, 6, 30, 12, 0, 'p;', 0),
(148, 15, 1, 6, 6, 1, 3, 19, 'Pulse', 57, 0, 0, 18, 39, 6, 0, 'p;', 0),
(149, 14, 1, 6, 6, 3, 3, 23, 'Pulse', 51, 0, 25, 24, 2, 8, 0, 'p;c;', 0),
(150, 20, 1, 6, 6, 4, 3, 13, 'Pulse', 48, 0, 21, 27, 0, 9, 0, 'p;', 0),
(151, 19, 1, 6, 6, 7, 3, 9, 'Pulse', 64, 0, 28, 20, 16, 5, 1, 'p;', 0),
(152, 17, 1, 6, 6, 8, 3, 39, 'Matter', 65, 0, 61, 4, 0, 8, 0, 'p;', 0),
(153, 22, 1, 6, 6, 8, 3, 32, 'Pulse', 90, 0, 3, 21, 66, 7, 1, 'p;o6;', 0),
(154, 21, 1, 6, 6, 9, 3, 58, 'Laser', 139, 0, 28, 8, 10, 8, 1, 'p;', 0),
(155, 32, 1, 8, 7, 3, 3, 11, 'Pulse', 68, 0, 0, 60, 8, 15, 0, 'p;', 0),
(156, 31, 1, 8, 7, 7, 3, 34, 'Pulse', 45, 0, 0, 24, 0, 15, 0, 'b;', 0),
(157, 28, 1, 7, 16, 1, 3, 11, 'Laser', 70, 0, 0, 15, 8, 15, 0, 'p;', 0),
(158, 28, 1, 7, 16, 18, 3, 11, 'Laser', 70, 0, 13, 10, 0, 10, 0, 'p;', 0),
(159, 28, 1, 7, 16, 19, 3, 11, 'Laser', 70, 0, 13, 10, 0, 10, 0, 'p;', 0);

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
(5, 1, 2, 7, 2, 0, 0, 17, 2, 25, '47;3;', 1, 1),
(6, 1, 2, 7, 2, 0, 0, 18, 2, 25, '9;50;', 1, 1),
(7, 1, 2, 7, 2, 0, 0, 19, 2, 25, '66;88;', 0, 1),
(8, 1, 2, 6, 2, 0, 0, 17, 2, 20, '52;36;', 0, 1),
(9, 1, 2, 6, 2, 0, 0, 18, 2, 20, '58;92;', 0, 1),
(10, 1, 2, 6, 2, 0, 0, 19, 2, 20, '95;16;', 1, 1),
(11, 1, 3, 3, 6, 0, 0, 7, 2, 62, '80;89;', 0, 1),
(12, 1, 3, 3, 6, 0, 0, 8, 2, 49, '57;78;', 0, 1),
(13, 1, 3, 3, 6, 0, 0, 9, 2, 62, '52;61;', 2, 1),
(14, 1, 3, 3, 6, 0, 0, 11, 1, 30, '23;', 1, 1),
(15, 1, 3, 3, 6, 0, 0, 12, 1, 30, '19;', 1, 1),
(16, 1, 3, 2, 6, 0, 0, 7, 2, 68, '10;42;', 2, 1),
(17, 1, 3, 2, 6, 0, 0, 8, 2, 54, '39;49;', 2, 1),
(18, 1, 3, 2, 6, 0, 0, 9, 2, 68, '50;83;', 1, 1),
(19, 1, 3, 2, 6, 0, 0, 11, 1, 39, '9;', 1, 1),
(20, 1, 3, 2, 6, 0, 0, 12, 1, 39, '13;', 1, 1),
(21, 1, 3, 1, 6, 0, 0, 8, 1, 63, '58;', 1, 1),
(22, 1, 3, 1, 6, 0, 0, 9, 1, 50, '32;', 1, 1),
(23, 1, 3, 5, 7, 0, 0, 5, 1, 33, '78;', 0, 1),
(24, 1, 3, 5, 7, 0, 0, 7, 1, 33, '97;', 0, 1),
(25, 1, 3, 5, 7, 0, 0, 10, 1, 58, '59;', 0, 1),
(26, 1, 3, 5, 7, 0, 0, 11, 1, 33, '97;', 0, 1),
(27, 1, 3, 5, 7, 0, 0, 12, 1, 33, '39;', 0, 1),
(28, 1, 3, 5, 7, 0, 0, 14, 1, 58, '11;', 1, 1),
(29, 1, 3, 5, 7, 0, 0, 15, 1, 33, '75;', 0, 1),
(30, 1, 3, 5, 7, 0, 0, 16, 1, 33, '63;', 0, 1),
(31, 1, 3, 4, 8, 0, 0, 5, 1, 46, '34;', 1, 1),
(32, 1, 3, 4, 8, 0, 0, 7, 1, 46, '11;', 1, 1),
(33, 1, 3, 4, 8, 0, 0, 11, 1, 46, '82;', 0, 1),
(34, 1, 3, 4, 8, 0, 0, 13, 1, 46, '68;', 0, 1),
(35, 1, 3, 7, 3, 0, 0, 8, 2, 48, '52;37;', 1, 1),
(36, 1, 3, 7, 3, 0, 0, 11, 2, 57, '27;85;', 1, 1),
(37, 1, 3, 7, 3, 0, 0, 12, 2, 57, '6;30;', 2, 1),
(38, 1, 3, 6, 3, 0, 0, 8, 2, 43, '68;61;', 0, 1),
(39, 1, 3, 6, 3, 0, 0, 11, 2, 51, '5;73;', 1, 1),
(40, 1, 3, 6, 3, 0, 0, 12, 2, 51, '28;60;', 1, 1),
(41, 1, 3, 8, 4, 0, 0, 4, 2, 34, '69;72;', 0, 1),
(42, 1, 3, 8, 4, 0, 0, 8, 2, 34, '64;55;', 0, 1),
(43, 1, 4, 7, 4, 0, 0, 13, 0, 0, '', 0, 0),
(44, 1, 4, 7, 2, 0, 0, 17, 0, 0, '', 0, 0),
(45, 1, 4, 7, 2, 0, 0, 18, 0, 0, '', 0, 0),
(46, 1, 4, 6, 4, 0, 0, 13, 0, 0, '', 0, 0),
(47, 1, 4, 6, 2, 0, 0, 17, 0, 0, '', 0, 0),
(48, 1, 4, 6, 2, 0, 0, 18, 0, 0, '', 0, 0),
(49, 1, 4, 6, 2, 0, 0, 19, 0, 0, '', 0, 0),
(50, 1, 4, 8, 1, 0, 0, 5, 0, 0, '', 0, 0),
(51, 1, 4, 8, 1, 0, 0, 6, 0, 0, '', 0, 0),
(52, 1, 4, 8, 1, 0, 0, 9, 0, 0, '', 0, 0),
(53, 1, 4, 8, 1, 0, 0, 10, 0, 0, '', 0, 0),
(54, 1, 4, 9, 4, 0, 0, 4, 0, 0, '', 0, 0),
(55, 1, 4, 9, 4, 0, 0, 5, 0, 0, '', 0, 0),
(56, 1, 4, 9, 4, 0, 0, 8, 0, 0, '', 0, 0),
(57, 1, 4, 9, 4, 0, 0, 10, 0, 0, '', 0, 0);

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
(1, 'myGame', 'active', 4, 2, 3000, 100);

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
(1, 1, 12, 'Naga', 4),
(2, 1, 15, 'Naga', 4);

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
(1, 10, '2', 2, 5, -56, 292, 0),
(2, 11, '2', 2, 5, -56, 292, 0),
(3, 12, '2', 2, 8, -29, -66, 4);

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
(1, 1, 1, 4, 2, 'Earth Alliance', 410, 'waiting'),
(2, 2, 1, 4, 2, 'Centauri Republic', 658, 'ready');

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
(9, 2, 11, 1, '-2', 0),
(10, 2, 12, 1, '-2', 0),
(11, 2, 17, 1, '-2', 0),
(12, 2, 18, 1, '-2', 0),
(13, 3, 11, 1, '-1', 0),
(14, 3, 12, 1, '-1', 0),
(15, 3, 17, 1, '-1', 0),
(16, 3, 18, 1, '-1', 0),
(17, 2, 6, 2, '1', 3),
(18, 2, 11, 2, '-2', 0),
(19, 2, 12, 2, '-2', 0),
(20, 2, 14, 2, '0', 0),
(21, 2, 15, 2, '0', 0),
(22, 2, 17, 2, '-2', 0),
(23, 2, 18, 2, '-2', 0),
(24, 2, 3, 2, '1', 2),
(25, 2, 4, 2, '1', 4),
(26, 3, 6, 2, '1', 3),
(27, 3, 11, 2, '-2', 0),
(28, 3, 12, 2, '-2', 0),
(29, 3, 14, 2, '0', 0),
(30, 3, 15, 2, '0', 0),
(31, 3, 17, 2, '-2', 0),
(32, 3, 18, 2, '-2', 0),
(33, 3, 3, 2, '1', 2),
(34, 3, 4, 2, '1', 4),
(39, 3, 11, 3, '-1', 0),
(40, 3, 12, 3, '-1', 0),
(41, 3, 14, 3, '0', 0),
(42, 3, 15, 3, '0', 0),
(43, 3, 17, 3, '-1', 0),
(44, 3, 18, 3, '-1', 0),
(45, 2, 11, 3, '-1', 0),
(46, 2, 12, 3, '-1', 0),
(47, 2, 14, 3, '0', 0),
(48, 2, 15, 3, '0', 0),
(49, 2, 17, 3, '-1', 0),
(50, 2, 18, 3, '-1', 0),
(51, 1, 8, 3, '1', 3),
(52, 1, 12, 3, '1', 0),
(53, 1, 12, 3, '1', 0),
(54, 1, 15, 3, '1', 0),
(55, 1, 15, 3, '1', 0),
(56, 5, 3, 3, '1', 2),
(57, 5, 10, 3, '1', 2),
(58, 5, 14, 3, '1', 2),
(59, 4, 3, 3, '1', 2),
(60, 4, 9, 3, '1', 2),
(61, 7, 7, 3, '0', 0),
(62, 7, 9, 3, '0', 0),
(63, 7, 15, 3, '0', 0),
(64, 7, 17, 3, '1', 3),
(65, 7, 18, 3, '1', 3),
(66, 6, 7, 3, '0', 0),
(67, 6, 9, 3, '0', 0),
(68, 6, 15, 3, '0', 0),
(69, 6, 17, 3, '1', 3),
(70, 6, 18, 3, '1', 3),
(71, 9, 4, 3, '1', 2),
(72, 9, 6, 3, '0', 0),
(73, 9, 8, 3, '1', 2),
(74, 9, 9, 3, '0', 0),
(75, 7, 7, 4, '0', 0),
(76, 7, 9, 4, '0', 0),
(77, 7, 15, 4, '0', 0),
(78, 7, 19, 4, '1', 3),
(79, 7, 3, 4, '1', 3),
(80, 6, 15, 4, '0', 0),
(81, 6, 19, 4, '1', 3),
(82, 6, 3, 4, '1', 3),
(83, 8, 4, 4, '0', 0),
(84, 8, 5, 4, '1', 2),
(85, 8, 6, 4, '1', 2),
(86, 8, 8, 4, '0', 0),
(87, 8, 9, 4, '1', 2),
(88, 8, 10, 4, '1', 2),
(89, 3, 11, 4, '-1', 0),
(90, 3, 12, 4, '-1', 0),
(91, 3, 13, 4, '1', 3),
(92, 3, 16, 4, '1', 3),
(93, 3, 16, 4, '1', 4),
(94, 3, 17, 4, '-1', 0),
(95, 3, 18, 4, '-1', 0),
(96, 2, 11, 4, '-1', 0),
(97, 2, 12, 4, '-1', 0),
(98, 2, 16, 4, '1', 3),
(99, 2, 17, 4, '-1', 0),
(100, 2, 18, 4, '-1', 0),
(101, 1, 12, 4, '1', 0),
(102, 1, 12, 4, '1', 0),
(103, 1, 15, 4, '1', 0),
(104, 1, 15, 4, '1', 0),
(105, 5, 3, 4, '1', 2),
(106, 5, 9, 4, '1', 2),
(107, 5, 13, 4, '1', 2),
(108, 4, 3, 4, '1', 2),
(109, 4, 9, 4, '1', 2);

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
(1, 6, 4, 1, '357.29', 1232, 1),
(2, 7, 4, 1, '359.24', 1334, 1),
(3, 8, 1, 1, '-1.00', 84, 0),
(4, 9, 1, 1, '-1.00', 73, 0),
(5, 2, 4, 1, '0.46', 1256, 0),
(6, 3, 4, 1, '0.18', 1255, 0),
(7, 1, 4, 1, '-1.00', 88, 0),
(8, 4, 1, 1, '-1.00', 77, 0),
(9, 5, 1, 1, '-1.00', 77, 0),
(10, 2, 4, 2, '348.97', 650, 0),
(11, 3, 4, 2, '350.49', 690, 0),
(12, 1, 4, 2, '0.07', 783, 0),
(13, 4, 1, 2, '0.10', 571, 1),
(14, 5, 1, 2, '1.08', 587, 0),
(15, 6, 4, 2, '295.05', 756, 0),
(16, 7, 4, 2, '295.75', 715, 0),
(17, 8, 1, 2, '0.08', 687, 1),
(18, 9, 1, 2, '-1.00', 73, 0),
(19, 3, 4, 3, '0.59', 608, 0),
(20, 2, 4, 3, '0.53', 572, 0),
(21, 1, 4, 3, '0.39', 623, 0),
(22, 5, 1, 3, '0.07', 619, 0),
(23, 4, 1, 3, '0.66', 392, 0),
(24, 7, 4, 3, '5.66', 620, 0),
(25, 6, 4, 3, '5.81', 630, 0),
(26, 8, 1, 3, '358.89', 470, 1),
(27, 9, 1, 3, '359.43', 488, 0),
(28, 7, 4, 4, '300.00', 227, 0),
(29, 6, 4, 4, '300.00', 204, 0),
(30, 8, 1, 4, '359.64', 311, 1),
(31, 9, 1, 4, '359.78', 201, 0),
(32, 3, 4, 4, '245.67', 242, 1),
(33, 2, 4, 4, '252.22', 216, 1),
(34, 1, 4, 4, '300.00', 181, 0),
(35, 5, 1, 4, '23.85', 214, 1),
(36, 4, 1, 4, '178.51', 153, 0);

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
(1, 4, 1, 'Crius'),
(2, 4, 1, 'Crius'),
(3, 5, 1, 'Crius'),
(4, 5, 1, 'Tethys'),
(5, 5, 1, 'Tethys'),
(6, 8, 1, 'Vorchan'),
(7, 8, 1, 'Vorchan'),
(8, 9, 1, 'Haven'),
(9, 9, 1, 'Haven'),
(10, 10, 6, 'Sentri'),
(11, 10, 2, 'Sitara'),
(12, 11, 6, 'Sentri'),
(13, 11, 2, 'Sitara'),
(14, 12, 4, 'Naga');

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
(1, 2, 4, 2, 'Output', 0, '10.00'),
(42, 6, 3, 3, 'Output', 0, '10.00'),
(43, 6, 4, 3, 'Output', 0, '10.00'),
(44, 6, 5, 3, 'Output', 0, '12.00'),
(45, 7, 18, 3, 'Accuracy', 0, '10.00'),
(46, 7, 19, 3, 'Accuracy', 0, '10.00');

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
  `name` varchar(255) DEFAULT '""',
  `display` varchar(50) DEFAULT '',
  `status` varchar(255) DEFAULT '""',
  `available` int(3) DEFAULT '0',
  `destroyed` tinyint(1) DEFAULT '0',
  `x` int(4) DEFAULT '0',
  `y` int(4) DEFAULT '0',
  `facing` int(3) DEFAULT '0',
  `delay` int(3) DEFAULT '0',
  `thrust` int(3) DEFAULT '0',
  `turn` int(1) DEFAULT '0',
  `phase` int(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `units`
--

INSERT INTO `units` (`id`, `gameid`, `userid`, `ship`, `ball`, `name`, `display`, `status`, `available`, `destroyed`, `x`, `y`, `facing`, `delay`, `thrust`, `turn`, `phase`) VALUES
(1, 1, 1, 1, 0, 'Olympus', '', 'bought', 1, 0, -201, 157, 351, 2, 175, 3, 3),
(2, 1, 1, 1, 0, 'Artemis', '', 'bought', 1, 0, -110, 136, 355, 0, 175, 3, 3),
(3, 1, 1, 1, 0, 'Artemis', '', 'bought', 1, 0, -148, 78, 2, 6, 175, 3, 3),
(4, 1, 1, 1, 0, 'Squadron', '', 'bought', 1, 0, -87, -238, 12, 0, 190, 3, 3),
(5, 1, 1, 1, 0, 'Squadron', '', 'bought', 1, 0, -71, 504, 314, 11, 213, 3, 3),
(6, 1, 2, 1, 0, 'Altarian', '', 'bought', 1, 0, 247, 155, 190, 0, 175, 3, 3),
(7, 1, 2, 1, 0, 'Altarian', '', 'bought', 1, 0, 196, 188, 188, 0, 175, 3, 3),
(8, 1, 2, 1, 0, 'Squadron', '', 'bought', 1, 0, 100, -182, 139, 11, 190, 3, 3),
(9, 1, 2, 1, 0, 'Squadron', '', 'bought', 1, 0, 250, 100, 222, 0, 200, 3, 3),
(10, 1, 2, 0, 0, 'Flight', '', 'deployed', 2, 0, 210, 447, 169, 0, 231, 3, 3),
(11, 1, 2, 0, 0, 'Flight', '', 'deployed', 2, 0, 261, 427, 167, 0, 231, 3, 3),
(12, 1, 1, 0, 1, 'Salvo', '', 'deployed', 2, 0, -214, -29, 334, 0, 345, 3, 3);

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
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=128;
--
-- AUTO_INCREMENT für Tabelle `chat`
--
ALTER TABLE `chat`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT für Tabelle `damages`
--
ALTER TABLE `damages`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=160;
--
-- AUTO_INCREMENT für Tabelle `deploys`
--
ALTER TABLE `deploys`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `dogfights`
--
ALTER TABLE `dogfights`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `fireorders`
--
ALTER TABLE `fireorders`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;
--
-- AUTO_INCREMENT für Tabelle `games`
--
ALTER TABLE `games`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT für Tabelle `loads`
--
ALTER TABLE `loads`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT für Tabelle `missions`
--
ALTER TABLE `missions`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT für Tabelle `playerstatus`
--
ALTER TABLE `playerstatus`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT für Tabelle `powers`
--
ALTER TABLE `powers`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=110;
--
-- AUTO_INCREMENT für Tabelle `reinforcements`
--
ALTER TABLE `reinforcements`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `sensors`
--
ALTER TABLE `sensors`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;
--
-- AUTO_INCREMENT für Tabelle `subunits`
--
ALTER TABLE `subunits`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT für Tabelle `systemcrits`
--
ALTER TABLE `systemcrits`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;
--
-- AUTO_INCREMENT für Tabelle `units`
--
ALTER TABLE `units`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 06. Nov 2017 um 17:08
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
(1, 7, 1, 'deploy', 0, 487, -467, 180, 0, 0, 1, 1),
(2, 8, 1, 'deploy', 0, 504, 208, 180, 0, 0, 1, 1),
(3, 5, 1, 'deploy', 0, 677, -240, 180, 0, 0, 1, 1),
(4, 6, 1, 'deploy', 0, 587, 82, 180, 0, 0, 1, 1),
(5, 9, 1, 'deploy', 0, 637, 2, 180, 0, 0, 1, 1),
(6, 1, 1, 'deploy', 0, -427, -375, 0, 0, 0, 1, 1),
(7, 2, 1, 'deploy', 0, -539, 448, 0, 0, 0, 1, 1),
(8, 3, 1, 'deploy', 0, -614, -328, 0, 0, 0, 1, 1),
(9, 4, 1, 'deploy', 0, -431, -73, 0, 0, 0, 1, 1),
(10, 1, 1, 'jump', 20, -408, -369, 17, 0, 0, 0, 1),
(11, 2, 1, 'jump', 11, -529, 449, 13, 0, 0, 0, 1),
(12, 3, 1, 'jump', 13, -623, -337, -11, 0, 0, 0, 1),
(13, 4, 1, 'jump', 18, -441, -87, -11, 0, 0, 0, 1),
(14, 5, 1, 'jump', 12, 683, -230, 11, 0, 0, 0, 1),
(15, 6, 1, 'jump', 23, 589, 60, 8, 0, 0, 0, 1),
(16, 7, 1, 'jump', 28, 504, -488, 6, 0, 0, 0, 1),
(17, 8, 1, 'jump', 5, 504, 213, -7, 0, 0, 0, 1),
(18, 9, 1, 'jump', 14, 625, 9, -3, 0, 0, 0, 1),
(19, 1, 1, 'turn', 0, -408, -369, -17, 57, 48, 1, 1),
(20, 1, 1, 'move', 150, -258, -369, 0, 0, 0, 1, 1),
(21, 1, 1, 'turn', 0, -258, -369, -3, 21, 5, 2, 1),
(22, 2, 1, 'turn', 0, -529, 449, -12, 41, 35, 1, 1),
(23, 2, 1, 'move', 150, -379, 452, 0, 0, 0, 1, 1),
(24, 2, 1, 'turn', 0, -379, 452, -4, 29, 6, 2, 1),
(25, 3, 1, 'speed', 1, -623, -337, 0, 29, 0, 1, 1),
(26, 3, 1, 'move', 182, -444, -372, 0, 0, 0, 1, 1),
(27, 4, 1, 'move', 170, -274, -119, 0, 0, 0, 1, 1),
(28, 7, 1, 'turn', 0, 504, -488, -14, 22, 30, 1, 1),
(29, 7, 1, 'move', 160, 346, -466, 0, 0, 0, 1, 1),
(30, 8, 1, 'move', 160, 345, 232, 0, 0, 0, 1, 1),
(31, 8, 1, 'turn', 0, 345, 232, -7, 22, 8, 2, 1),
(32, 5, 1, 'turn', 0, 683, -230, -4, 3, 6, 1, 1),
(33, 5, 1, 'move', 170, 514, -251, 0, 0, 0, 1, 1),
(34, 6, 1, 'turn', 0, 589, 60, 15, 9, 23, 1, 1),
(35, 6, 1, 'move', 170, 433, -6, 0, 0, 0, 1, 1),
(36, 9, 1, 'move', 170, 455, 18, 0, 0, 0, 1, 1),
(37, 10, 2, 'deploy', 0, -219, -375, -9, 1, 0, 1, 1),
(38, 11, 2, 'deploy', 0, -341, 440, -17, 1, 0, 1, 1),
(39, 12, 2, 'deploy', 0, 445, 18, -169, 0, 0, 0, 1),
(40, 8, 2, 'turn', 0, 345, 232, -30, 46, 65, 1, 1),
(41, 8, 2, 'move', 65, 298, 277, 0, 0, 0, 1, 1),
(42, 8, 2, 'turn', 0, 298, 277, -30, 46, 65, 1, 1),
(43, 8, 2, 'move', 95, 272, 368, 0, 0, 0, 1, 1),
(44, 8, 2, 'turn', 0, 272, 368, 2, 7, 3, 2, 1),
(45, 7, 2, 'turn', 0, 346, -466, -30, 46, 65, 1, 1),
(46, 7, 2, 'move', 65, 295, -426, 0, 0, 0, 1, 1),
(47, 7, 2, 'turn', 0, 295, -426, -15, 23, 33, 1, 1),
(48, 7, 2, 'move', 95, 238, -350, 0, 0, 0, 1, 1),
(49, 7, 2, 'turn', 0, 238, -350, -7, 23, 8, 2, 1),
(50, 6, 2, 'speed', -1, 433, -6, 0, 21, 0, 1, 1),
(51, 6, 2, 'turn', 0, 433, -6, 7, 4, 10, 1, 1),
(52, 6, 2, 'move', 146, 307, -79, 0, 0, 0, 1, 1),
(53, 5, 2, 'speed', -1, 514, -251, 0, 21, 0, 1, 1),
(54, 5, 2, 'move', 146, 369, -269, 0, 0, 0, 1, 1),
(55, 9, 2, 'speed', 1, 455, 18, 0, 10, 0, 1, 1),
(56, 9, 2, 'speed', 1, 455, 18, 0, 11, 0, 1, 1),
(57, 9, 2, 'move', 218, 237, 29, 0, 0, 0, 1, 1),
(58, 1, 2, 'move', 145, -123, -424, 0, 0, 0, 1, 1),
(59, 1, 2, 'turn', 0, -123, -424, -12, 84, 17, 2, 1),
(60, 1, 2, 'move', 5, -118, -425, 0, 0, 0, 1, 1),
(61, 2, 2, 'turn', 0, -379, 452, -9, 31, 26, 1, 1),
(62, 2, 2, 'move', 150, -232, 421, 0, 0, 0, 1, 1),
(63, 2, 2, 'turn', 0, -232, 421, -9, 58, 13, 2, 1),
(64, 3, 2, 'move', 182, -265, -407, 0, 0, 0, 1, 1),
(65, 3, 2, 'turn', 0, -265, -407, 9, 17, 9, 2, 1),
(66, 4, 2, 'speed', 1, -274, -119, 0, 10, 0, 1, 1),
(67, 4, 2, 'move', 194, -84, -156, 0, 0, 0, 1, 1),
(68, 4, 2, 'turn', 0, -84, -156, -19, 14, 14, 2, 1),
(69, 11, 2, 'move', 618, -223, 426, 353, 0, 0, 0, 1),
(70, 10, 2, 'move', 458, -100, -368, 3, 0, 0, 0, 1),
(71, 12, 2, 'move', 557, 309, -27, 198, 0, 0, 0, 1),
(72, 8, 3, 'turn', 0, 272, 368, 30, 46, 65, 1, 1),
(73, 8, 3, 'move', 160, 153, 475, 0, 0, 0, 1, 1),
(74, 7, 3, 'turn', 0, 238, -350, 30, 46, 65, 1, 1),
(75, 7, 3, 'move', 65, 182, -317, 0, 0, 0, 1, 1),
(76, 7, 3, 'turn', 0, 182, -317, 30, 46, 65, 1, 1),
(77, 7, 3, 'move', 95, 87, -317, 0, 0, 0, 1, 1),
(78, 6, 3, 'turn', 0, 307, -79, 20, 11, 26, 1, 1),
(79, 6, 3, 'move', 146, 213, -191, 0, 0, 0, 1, 1),
(80, 5, 3, 'turn', 0, 369, -269, 16, 8, 21, 1, 1),
(81, 5, 3, 'move', 146, 235, -326, 0, 0, 0, 1, 1),
(82, 9, 3, 'turn', 0, 237, 29, -30, 12, 46, 1, 1),
(83, 9, 3, 'move', 218, 54, 148, 0, 0, 0, 1, 1),
(84, 9, 3, 'turn', 0, 54, 148, -17, 14, 14, 2, 1),
(85, 1, 3, 'turn', 0, -118, -425, 30, 101, 86, 1, 1),
(86, 1, 3, 'move', 150, 27, -386, 0, 0, 0, 1, 1),
(87, 1, 3, 'turn', 0, 27, -386, 30, 132, 66, 1.3, 1),
(88, 2, 3, 'turn', 0, -232, 421, 30, 101, 86, 1, 1),
(89, 2, 3, 'move', 150, -84, 444, 0, 0, 0, 1, 1),
(90, 2, 3, 'turn', 0, -84, 444, 4, 27, 6, 2, 1),
(91, 3, 3, 'speed', -1, -265, -407, 0, 33, 0, 1, 1),
(92, 3, 3, 'turn', 0, -265, -407, 24, 19, 41, 1, 1),
(93, 3, 3, 'move', 160, -117, -347, 0, 0, 0, 1, 1),
(94, 4, 3, 'speed', -1, -84, -156, 0, 12, 0, 1, 1),
(95, 4, 3, 'turn', 0, -84, -156, 30, 10, 37, 1, 1),
(96, 4, 3, 'move', 37, -47, -156, 0, 0, 0, 1, 1),
(97, 4, 3, 'turn', 0, -47, -156, 30, 10, 37, 1, 1),
(98, 4, 3, 'move', 133, 68, -90, 0, 0, 0, 1, 1),
(99, 11, 3, 'move', 380, -31, 451, 7, 0, 0, 0, 1),
(100, 10, 3, 'move', 194, 87, -317, 15, 0, 0, 0, 1),
(101, 12, 3, 'move', 250, 68, -90, 195, 0, 0, 0, 1),
(102, 13, 4, 'deploy', 0, 87, -317, 0, 1, 0, 1, 1),
(103, 14, 4, 'deploy', 0, 126, 471, -173, 1, 0, 1, 1),
(104, 2, 4, 'move', 150, 66, 433, 0, 0, 0, 1, 0),
(105, 1, 4, 'turn', 0, 27, -386, 30, 101, 86, 1, 0),
(106, 1, 4, 'move', 86, 49, -303, 0, 0, 0, 1, 0),
(107, 1, 4, 'turn', 0, 49, -303, 30, 131, 66, 1.3, 0),
(108, 1, 4, 'move', 64, 32, -241, 0, 0, 0, 1, 0),
(109, 3, 4, 'turn', 0, -117, -347, 30, 24, 52, 1, 0),
(110, 3, 4, 'move', 162, -17, -219, 0, 0, 0, 1, 0),
(111, 3, 4, 'turn', 0, -17, -219, 30, 48, 26, 2, 0),
(112, 4, 4, 'turn', 0, 68, -90, 30, 10, 38, 1, 0),
(113, 4, 4, 'move', 38, 87, -57, 0, 0, 0, 1, 0),
(114, 4, 4, 'turn', 0, 87, -57, 30, 10, 38, 1, 0),
(115, 4, 4, 'move', 38, 87, -19, 0, 0, 0, 1, 0),
(116, 4, 4, 'turn', 0, 87, -19, 22, 7, 27, 1, 0),
(117, 4, 4, 'move', 97, 51, 71, 0, 0, 0, 1, 0);

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
(1, 'Chris', 1, 'test', 1509364582);

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
(1, 7, 1, 1, 7, -1, 1, 76, 'Particle', 56, 0, 35, 21, 0, 21, 0, 'pen', 0),
(2, 8, 1, 1, 7, -1, 1, 49, 'Particle', 63, 0, 43, 20, 0, 20, 0, 'pen', 0),
(3, 9, 1, 1, 13, -1, 1, 7, 'Particle', 59, 0, 40, 19, 0, 19, 0, 'pen', 0),
(4, 9, 1, 1, 13, -1, 1, 23, 'Particle', 61, 0, 43, 18, 0, 18, 0, 'pen', 0),
(5, 10, 1, 1, 13, -1, 1, 42, 'Particle', 61, 0, 43, 18, 0, 18, 0, 'pen', 0),
(6, 1, 1, 1, 7, -1, 1, 88, 'Particle', 60, 0, 41, 19, 0, 19, 0, 'pen', 0),
(7, 1, 1, 1, 7, -1, 1, 58, 'Particle', 60, 0, 42, 18, 0, 18, 0, 'pen', 0),
(8, 2, 1, 1, 7, -1, 1, 61, 'Particle', 40, 0, 22, 18, 0, 18, 0, 'pen', 0),
(9, 3, 1, 1, 7, -1, 1, 17, 'Particle', 40, 0, 23, 17, 0, 17, 0, 'pen', 0),
(10, 5, 1, 2, 7, -1, 1, 27, 'Particle', 47, 0, 26, 21, 0, 21, 0, 'pen', 0),
(11, 5, 1, 2, 7, 10, 1, 15, 'Particle', 46, 0, 36, 10, 0, 10, 0, 'pen', 0),
(12, 6, 1, 2, 7, 10, 1, 47, 'Particle', 47, 0, 37, 10, 0, 10, 0, 'pen', 0),
(13, 13, 1, 7, 7, -1, 1, 37, 'Laser', 203, 0, 48, 19, 0, 19, 0, 'pen', 0),
(14, 13, 1, 7, 7, -1, 1, 37, 'Laser', 203, 0, 49, 18, 0, 18, 0, 'pen', 0),
(15, 13, 1, 7, 7, -1, 1, 37, 'Laser', 203, 0, 50, 17, 0, 17, 0, 'pen', 0),
(16, 11, 1, 7, 7, -1, 1, 21, 'Matter', 31, 0, 23, 8, 0, 16, 0, '', 0),
(17, 11, 1, 7, 7, 8, 1, 26, 'Matter', 34, 0, 26, 3, 5, 6, 1, '', 0),
(18, 12, 1, 7, 7, -1, 1, 36, 'Matter', 29, 0, 22, 8, 0, 15, 0, '', 0),
(19, 12, 1, 7, 7, -1, 1, 28, 'Matter', 29, 0, 22, 8, 0, 15, 0, '', 0),
(20, 16, 1, 8, 7, 8, 1, 67, 'Laser', 211, 0, 26, 8, 36, 8, 1, 'pen', 0),
(21, 16, 1, 8, 7, -1, 1, 67, 'Laser', 211, 0, 51, 19, 0, 19, 0, 'pen', 0),
(22, 16, 1, 8, 7, -1, 1, 67, 'Laser', 211, 0, 53, 17, 0, 17, 0, 'pen', 0),
(23, 15, 1, 8, 7, -1, 1, 7, 'Matter', 33, 0, 25, 8, 0, 16, 0, '', 0),
(24, 27, 1, 1, 7, -1, 2, 3, 'Particle', 35, 0, 19, 16, 0, 16, 0, 'pen', 0),
(25, 20, 1, 7, 11, 13, 2, 50, 'Laser', 152, 0, 32, 10, 8, 10, 1, 'pen', 0),
(26, 20, 1, 7, 11, -1, 2, 50, 'Laser', 152, 0, 33, 17, 0, 17, 0, 'pen', 0),
(27, 20, 1, 7, 11, -1, 2, 50, 'Laser', 152, 0, 34, 16, 0, 16, 0, 'pen', 0),
(28, 57, 1, 1, 7, 9, 3, 19, 'Particle', 52, 0, 28, 6, 18, 6, 1, 'pen', 0),
(29, 57, 1, 1, 7, 6, 3, 78, 'Particle', 50, 0, 35, 15, 0, 15, 0, 'pen', 0),
(30, 58, 1, 1, 7, -1, 3, 58, 'Particle', 62, 0, 48, 14, 0, 14, 0, 'pen', 0),
(31, 58, 1, 1, 7, 10, 3, 64, 'Particle', 56, 0, 49, 7, 0, 7, 0, 'pen', 0),
(32, 55, 1, 1, 7, 5, 3, 25, 'Particle', 59, 0, 46, 13, 0, 13, 0, 'pen', 0),
(33, 55, 1, 1, 7, 12, 3, 44, 'Particle', 58, 0, 40, 7, 11, 7, 1, 'pen', 0),
(34, 56, 1, 1, 7, 11, 3, 40, 'Particle', 62, 0, 28, 5, 29, 5, 1, 'pen', 0),
(35, 56, 1, 1, 7, -1, 3, 52, 'Particle', 50, 0, 38, 12, 0, 12, 0, 'pen', 0),
(36, 59, 1, 2, 20, -1, 3, 42, 'Plasma', 40, 0, 21, 39, 0, 19, 0, '', 0),
(37, 60, 1, 2, 20, -1, 3, 32, 'Plasma', 43, 0, 26, 37, 0, 17, 0, '', 0),
(38, 53, 1, 2, 7, -1, 3, 71, 'Particle', 41, 0, 22, 19, 0, 19, 0, 'pen', 0),
(39, 54, 1, 2, 7, -1, 3, 57, 'Particle', 35, 0, 17, 18, 0, 18, 0, 'pen', 0),
(40, 54, 1, 2, 7, 12, 3, 53, 'Particle', 40, 0, 31, 9, 0, 9, 0, 'pen', 0),
(41, 33, 1, 5, 7, 9, 3, 23, 'Pulse', 73, 0, 29, 44, 0, 11, 0, 'pen', 0),
(42, 39, 1, 5, 7, 8, 3, 42, 'Pulse', 88, 0, 61, 27, 0, 9, 0, 'pen', 0),
(43, 42, 1, 5, 7, -1, 3, 1, 'Pulse', 69, 0, 25, 44, 0, 11, 0, 'pen', 0),
(44, 30, 1, 6, 7, -1, 3, 29, 'Pulse', 52, 0, 4, 40, 0, 16, 0, 'pen', 0),
(45, 35, 1, 8, 11, -1, 3, 4, 'Pulse', 94, 0, 5, 72, 0, 18, 0, 'pen', 0),
(46, 36, 1, 8, 11, -1, 3, 22, 'Pulse', 73, 0, 17, 56, 0, 14, 0, 'pen', 0),
(47, 38, 1, 8, 11, -1, 3, 23, 'Pulse', 77, 0, 33, 44, 0, 11, 0, 'pen', 0),
(48, 43, 1, 7, 17, 20, 3, 46, 'Particle', 15, 0, 10, 20, 0, 10, 0, 'pen', 0),
(49, 44, 1, 7, 17, -1, 3, 51, 'Particle', 14, 0, 0, 14, 0, 17, 0, 'block', 0),
(50, 45, 1, 7, 15, -1, 3, 50, 'Particle', 13, 0, 0, 14, 0, 16, 0, 'block', 0),
(51, 46, 1, 7, 7, 3, 3, 17, 'Particle', 15, 0, 2, 28, 0, 14, 0, 'pen', 0),
(52, 47, 1, 7, 15, 2, 3, 1, 'Particle', 14, 0, 0, 14, 0, 23, 0, 'block', 0),
(53, 48, 1, 7, 17, 2, 3, 24, 'Particle', 14, 0, 0, 14, 0, 24, 0, 'block', 0),
(54, 61, 1, 4, 7, -1, 3, 72, 'explosive', 24, 0, 12, 12, 0, 12, 0, 'pen', 0),
(55, 61, 1, 4, 7, 8, 3, 9, 'explosive', 21, 0, 15, 6, 0, 6, 0, 'pen', 0),
(56, 61, 1, 4, 7, 5, 3, 37, 'explosive', 19, 0, 8, 11, 0, 11, 0, 'pen', 0),
(57, 61, 1, 4, 7, 9, 3, 100, 'explosive', 22, 0, 16, 6, 0, 6, 0, 'pen', 0);

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
(1, 1, 1, 1, -1, -425, -379, 52),
(2, 1, 1, 1, -1, -537, 446, 52),
(3, 1, 1, 1, -1, -616, -324, 30),
(4, 1, 1, 1, -1, -428, -74, 23),
(5, 1, 2, 1, -1, 591, 79, 33),
(6, 1, 2, 1, -1, 502, 207, 33),
(7, 1, 2, 1, -1, 672, -238, 36),
(8, 1, 2, 1, -1, 489, -468, 36),
(9, 1, 2, 1, -1, 638, 4, 26);

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
(1, 1, 1, 7, 1, 0, 0, 9, 1, 88, '88 58 ', 2, 1),
(2, 1, 1, 7, 1, 0, 0, 18, 1, 63, '70 61 ', 1, 1),
(3, 1, 1, 7, 1, 0, 0, 19, 1, 63, '17 65 ', 1, 1),
(4, 1, 1, 8, 2, 0, 0, 9, 1, 79, '92 89 ', 0, 1),
(5, 1, 1, 8, 2, 0, 0, 18, 1, 49, '27 15 ', 2, 1),
(6, 1, 1, 8, 2, 0, 0, 19, 1, 49, '99 47 ', 1, 1),
(7, 1, 1, 5, 1, 0, 0, 8, 1, 76, '76 89 ', 1, 1),
(8, 1, 1, 5, 1, 0, 0, 9, 1, 76, '96 49 ', 1, 1),
(9, 1, 1, 6, 1, 0, 0, 8, 1, 83, '7 23 ', 2, 1),
(10, 1, 1, 6, 1, 0, 0, 9, 1, 83, '98 42 ', 1, 1),
(11, 1, 1, 1, 7, 0, 0, 8, 1, 54, '21 26 ', 2, 1),
(12, 1, 1, 1, 7, 0, 0, 12, 1, 54, '36 28 ', 2, 1),
(13, 1, 1, 1, 7, 0, 0, 21, 1, 79, '37 ', 3, 1),
(14, 1, 1, 2, 8, 0, 0, 8, 1, 40, '47 86 ', 0, 1),
(15, 1, 1, 2, 8, 0, 0, 12, 1, 40, '87 7 ', 1, 1),
(16, 1, 1, 2, 8, 0, 0, 21, 1, 70, '67 ', 3, 1),
(17, 1, 2, 1, 7, 0, 0, 10, 1, 0, '', 0, 1),
(18, 1, 2, 2, 8, 0, 0, 10, 1, 0, '', 0, 1),
(19, 1, 2, 9, 4, 0, 0, 9, 4, 0, '', 0, 1),
(20, 1, 2, 1, 7, 0, 0, 14, 1, 55, '50 ', 3, 1),
(21, 1, 2, 2, 8, 0, 0, 14, 1, 45, '86 ', 0, 1),
(22, 1, 2, 3, 7, 0, 0, 9, 1, 30, '31 ', 0, 1),
(23, 1, 2, 4, 7, 0, 0, 8, 1, 65, '68 ', 0, 1),
(24, 1, 2, 4, 7, 0, 0, 9, 1, 65, '82 ', 0, 1),
(25, 1, 2, 4, 7, 0, 0, 13, 1, 46, '60 ', 0, 1),
(26, 1, 2, 7, 1, 0, 0, 12, 1, 39, '79 94 ', 0, 1),
(27, 1, 2, 7, 1, 0, 0, 13, 1, 39, '3 79 ', 1, 1),
(28, 1, 2, 7, 1, 0, 0, 14, 1, 39, '87 59 ', 0, 1),
(29, 1, 3, 1, 6, 0, 0, 9, 1, 48, '65 ', 0, 1),
(30, 1, 3, 1, 6, 0, 0, 11, 1, 48, '29 ', 1, 1),
(31, 1, 3, 1, 6, 0, 0, 15, 1, 48, '91 ', 0, 1),
(32, 1, 3, 1, 6, 0, 0, 16, 1, 48, '70 ', 0, 1),
(33, 1, 3, 1, 5, 0, 0, 22, 1, 57, '23 ', 1, 1),
(34, 1, 3, 1, 5, 0, 0, 23, 1, 57, '99 ', 0, 1),
(35, 1, 3, 2, 8, 0, 0, 9, 1, 72, '4 ', 1, 1),
(36, 1, 3, 2, 8, 0, 0, 11, 1, 72, '22 ', 1, 1),
(37, 1, 3, 2, 8, 0, 0, 22, 1, 72, '91 ', 0, 1),
(38, 1, 3, 2, 8, 0, 0, 23, 1, 72, '23 ', 1, 1),
(39, 1, 3, 3, 5, 0, 0, 8, 1, 51, '42 ', 1, 1),
(40, 1, 3, 3, 6, 0, 0, 10, 1, 51, '90 ', 0, 1),
(41, 1, 3, 3, 6, 0, 0, 12, 1, 36, '77 ', 0, 1),
(42, 1, 3, 3, 5, 0, 0, 15, 1, 37, '1 ', 1, 1),
(43, 1, 3, 10, 7, 0, 0, 2, 1, 74, '46 ', 1, 1),
(44, 1, 3, 10, 7, 0, 0, 4, 1, 69, '51 ', 1, 1),
(45, 1, 3, 10, 7, 0, 0, 6, 1, 73, '50 ', 1, 1),
(46, 1, 3, 10, 7, 0, 0, 8, 1, 70, '17 ', 1, 1),
(47, 1, 3, 10, 7, 0, 0, 10, 1, 69, '1 ', 1, 1),
(48, 1, 3, 10, 7, 0, 0, 12, 1, 78, '24 ', 1, 1),
(49, 1, 3, 10, 7, 0, 0, 14, 1, 77, '97 ', 0, 1),
(50, 1, 3, 10, 7, 0, 0, 16, 1, 74, '90 ', 0, 1),
(51, 1, 3, 10, 7, 0, 0, 18, 1, 69, '99 ', 0, 1),
(52, 1, 3, 10, 7, 0, 0, 20, 1, 74, '98 ', 0, 1),
(53, 1, 3, 8, 2, 0, 0, 12, 2, 91, '95 71 ', 1, 1),
(54, 1, 3, 8, 2, 0, 0, 13, 2, 91, '57 53 ', 2, 1),
(55, 1, 3, 6, 1, 0, 0, 8, 2, 94, '25 44 ', 2, 1),
(56, 1, 3, 6, 1, 0, 0, 9, 2, 94, '40 52 ', 2, 1),
(57, 1, 3, 5, 1, 0, 0, 8, 2, 105, '19 78 ', 2, 1),
(58, 1, 3, 5, 1, 0, 0, 9, 2, 105, '58 64 ', 2, 1),
(59, 1, 3, 9, 2, 0, 0, 12, 1, 95, '42 ', 1, 1),
(60, 1, 3, 9, 2, 0, 0, 14, 1, 95, '32 ', 1, 1),
(61, 1, 3, 12, 4, 0, 0, 2, 4, 100, '072 9 37 100 ', 4, 1),
(62, 1, 4, 7, 7, 0, 0, 16, 1, 0, '', 0, 1),
(63, 1, 4, 8, 2, 0, 0, 16, 1, 0, '', 0, 1);

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
(1, 'myGame', 'active', 4, 0, 3500, 100);

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
(3, 3, 13, 'Needle', 9),
(4, 3, 16, 'Needle', 9),
(9, 9, 9, 'Hasta', 4);

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
(1, 10, '2', 2, 7, 87, -317, 3),
(2, 11, '2', 2, 8, 153, 475, 0),
(3, 12, '2', 2, 4, 68, -90, 3),
(4, 13, '2', 4, 7, 87, -317, 1),
(5, 14, '2', 4, 2, -84, 444, 0);

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
(1, 1, 1, 4, 0, 'Earth Alliance', 782, 'ready'),
(2, 2, 1, 4, 0, 'Centauri Republic', 1070, 'waiting');

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
(1, 1, 9, 1, '-2', 0),
(2, 1, 11, 1, '-2', 0),
(3, 1, 15, 1, '-1', 0),
(4, 1, 15, 1, '0', 0),
(5, 1, 16, 1, '-1', 0),
(6, 1, 16, 1, '0', 0),
(7, 1, 18, 1, '0', 0),
(8, 1, 19, 1, '0', 0),
(9, 1, 21, 1, '1', 4),
(10, 1, 21, 1, '1', 4),
(11, 1, 22, 1, '-2', 0),
(12, 1, 23, 1, '-2', 0),
(13, 1, 23, 1, '0', 0),
(14, 1, 5, 1, '1', 4),
(15, 2, 9, 1, '-2', 0),
(16, 2, 11, 1, '-2', 0),
(17, 2, 15, 1, '-2', 0),
(18, 2, 15, 1, '0', 0),
(19, 2, 16, 1, '-1', 0),
(20, 2, 16, 1, '0', 0),
(21, 2, 18, 1, '0', 0),
(22, 2, 19, 1, '0', 0),
(23, 2, 21, 1, '1', 4),
(24, 2, 21, 1, '1', 4),
(25, 2, 22, 1, '-2', 0),
(26, 2, 23, 1, '-1', 0),
(27, 2, 23, 1, '0', 0),
(28, 2, 5, 1, '1', 4),
(29, 3, 15, 1, '0', 0),
(30, 1, 9, 2, '-1', 0),
(31, 1, 11, 2, '-1', 0),
(32, 1, 15, 2, '-1', 0),
(33, 1, 16, 2, '-1', 0),
(34, 1, 18, 2, '0', 0),
(35, 1, 19, 2, '0', 0),
(36, 1, 22, 2, '-1', 0),
(37, 1, 23, 2, '-1', 0),
(38, 2, 9, 2, '-1', 0),
(39, 2, 11, 2, '-1', 0),
(40, 2, 15, 2, '-1', 0),
(41, 2, 16, 2, '-1', 0),
(42, 2, 18, 2, '0', 0),
(43, 2, 19, 2, '0', 0),
(44, 2, 22, 2, '-1', 0),
(45, 2, 23, 2, '-1', 0),
(46, 5, 8, 2, '1', 4),
(47, 5, 9, 2, '1', 4),
(48, 5, 11, 2, '0', 0),
(49, 5, 13, 2, '0', 0),
(50, 6, 8, 2, '1', 4),
(51, 6, 9, 2, '1', 4),
(52, 6, 11, 2, '0', 0),
(53, 6, 13, 2, '0', 0),
(54, 9, 8, 2, '0', 0),
(55, 9, 9, 2, '1', 0),
(56, 9, 9, 2, '1', 0),
(57, 9, 9, 2, '1', 0),
(58, 9, 9, 2, '1', 0),
(59, 9, 10, 2, '0', 0),
(60, 1, 9, 3, '-1', 0),
(61, 1, 11, 3, '-1', 0),
(62, 1, 15, 3, '-1', 0),
(63, 1, 16, 3, '-1', 0),
(64, 1, 18, 3, '0', 0),
(65, 1, 19, 3, '0', 0),
(66, 1, 22, 3, '-1', 0),
(67, 1, 23, 3, '-1', 0),
(68, 2, 9, 3, '-1', 0),
(69, 2, 11, 3, '-1', 0),
(70, 2, 15, 3, '-1', 0),
(71, 2, 16, 3, '-1', 0),
(72, 2, 18, 3, '0', 0),
(73, 2, 19, 3, '0', 0),
(74, 2, 22, 3, '-1', 0),
(75, 2, 23, 3, '-1', 0),
(76, 6, 8, 3, '1', 4),
(77, 6, 9, 3, '1', 4),
(78, 6, 11, 3, '0', 0),
(79, 6, 13, 3, '0', 0),
(80, 5, 8, 3, '1', 4),
(81, 5, 9, 3, '1', 4),
(82, 5, 11, 3, '0', 0),
(83, 5, 13, 3, '0', 0),
(84, 9, 8, 3, '0', 0),
(85, 9, 10, 3, '0', 0),
(86, 5, 11, 4, '1', 3),
(87, 5, 13, 4, '1', 3),
(88, 5, 3, 4, '1', 2),
(89, 6, 9, 4, '0', 0),
(90, 6, 11, 4, '1', 3),
(91, 6, 13, 4, '1', 3),
(92, 6, 3, 4, '1', 2),
(93, 1, 10, 4, '0', 0),
(94, 1, 15, 4, '-1', 0),
(95, 1, 16, 4, '-1', 0),
(96, 1, 18, 4, '0', 0),
(97, 1, 19, 4, '0', 0),
(98, 1, 22, 4, '-1', 0),
(99, 1, 23, 4, '-1', 0),
(100, 2, 9, 4, '-1', 0),
(101, 2, 11, 4, '-1', 0),
(102, 2, 15, 4, '-1', 0),
(103, 2, 16, 4, '-1', 0),
(104, 2, 18, 4, '0', 0),
(105, 2, 19, 4, '0', 0),
(106, 2, 22, 4, '-1', 0),
(107, 2, 23, 4, '-1', 0),
(108, 4, 8, 4, '1', 2),
(109, 4, 9, 4, '1', 2),
(110, 4, 11, 4, '0', 0),
(111, 4, 13, 4, '0', 0);

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
(1, 1, 1, 'Hyperion', 5, 850),
(2, 1, 2, 'Altarian', 4, 473);

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
(1, 7, 5, 1, 359, 798, 0),
(2, 8, 5, 1, 359, 928, 0),
(3, 5, 5, 1, 358, 918, 0),
(4, 6, 5, 1, 359, 937, 0),
(5, 9, 5, 1, -1, 95, 0),
(6, 1, 5, 1, 351, 824, 0),
(7, 2, 5, 1, 346, 962, 0),
(8, 3, 5, 1, -1, 88, 0),
(9, 4, 5, 1, -1, 73, 1),
(10, 1, 5, 2, 17, 477, 0),
(11, 2, 5, 2, 12, 598, 0),
(12, 3, 5, 2, 359, 537, 0),
(13, 4, 5, 2, 0, 451, 0),
(14, 7, 5, 2, 57, 525, 1),
(15, 8, 5, 2, 59, 647, 1),
(16, 5, 5, 2, 0, 638, 1),
(17, 6, 5, 2, 0, 617, 1),
(18, 9, 5, 2, -1, 95, 0),
(19, 1, 5, 3, 2, 309, 0),
(20, 2, 5, 3, 358, 382, 0),
(21, 3, 5, 3, 359, 405, 0),
(22, 4, 5, 3, -1, 73, 1),
(23, 8, 5, 3, 48, 327, 0),
(24, 7, 5, 3, 44, 277, 1),
(25, 6, 5, 3, 359, 410, 0),
(26, 5, 5, 3, 1, 357, 0),
(27, 9, 5, 3, 0, 393, 0),
(28, 7, 5, 4, -1, 110, 0),
(29, 8, 5, 4, -1, 110, 0),
(30, 5, 5, 4, -1, 110, 0),
(31, 6, 5, 4, -1, 110, 0),
(32, 9, 5, 4, 1, 219, 1),
(33, 1, 5, 4, 91, 145, 1),
(34, 2, 5, 4, 74, 212, 1),
(35, 3, 5, 4, 182, 201, 1),
(36, 4, 5, 4, 0, 379, 0);

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
(1, 10, 10, 'Aurora'),
(2, 11, 10, 'Aurora'),
(3, 12, 4, 'Hasta'),
(4, 13, 6, 'Sentri'),
(5, 13, 2, 'Sitara'),
(6, 14, 6, 'Sentri'),
(7, 14, 2, 'Sitara');

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
(1, 1, 5, 3, 'Output', 0, '0.10'),
(2, 1, 6, 3, 'Output', 0, '0.10'),
(3, 1, 6, 3, 'Output', 0, '0.11'),
(4, 4, 8, 3, 'Damage', 0, '0.20'),
(5, 5, 8, 3, 'Disabled', 1, '0.30'),
(6, 5, 8, 3, 'Accuracy', 0, '0.30'),
(7, 5, 9, 3, 'Accuracy', 0, '0.20');

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
(1, 1, 1, 1, 0, 'Hyperion', 'bought', 1, 0, 27, -386, 45, 68, 150, 3, 3),
(2, 1, 1, 1, 0, 'Hyperion', 'bought', 1, 0, -84, 444, 13, 6, 150, 3, 3),
(3, 1, 1, 1, 0, 'Olympus', 'bought', 1, 0, -117, -347, 22, 0, 162, 3, 3),
(4, 1, 1, 1, 0, 'Tethys', 'bought', 1, 0, 68, -90, 30, 0, 173, 3, 3),
(5, 1, 2, 1, 0, 'Darkner', 'bought', 1, 0, 235, -326, 203, 0, 146, 3, 3),
(6, 1, 2, 1, 0, 'Darkner', 'bought', 1, 0, 213, -191, 230, 0, 146, 3, 3),
(7, 1, 2, 1, 0, 'Altarian', 'bought', 1, 0, 87, -317, 180, 0, 160, 3, 3),
(8, 1, 2, 1, 0, 'Altarian', 'bought', 1, 0, 153, 475, 138, 0, 160, 3, 3),
(9, 1, 2, 1, 0, 'Vorchan', 'bought', 1, 0, 54, 148, 130, 14, 218, 3, 3),
(10, 1, 1, 0, 0, 'Flight', 'deployed', 2, 0, 87, -317, 15, 0, 291, 3, 3),
(11, 1, 1, 0, 0, 'Flight', 'deployed', 2, 0, -31, 451, 7, 0, 291, 3, 3),
(12, 1, 2, 0, 1, 'Salvo', 'deployed', 2, 1, 68, -90, 195, 0, 286, 3, 3),
(13, 1, 2, 0, 0, 'Flight', 'deployed', 4, 0, 87, -317, 0, 0, 0, 4, -1),
(14, 1, 2, 0, 0, 'Flight', 'deployed', 4, 0, 126, 471, 187, 0, 0, 4, -1);

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
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=118;
--
-- AUTO_INCREMENT für Tabelle `chat`
--
ALTER TABLE `chat`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT für Tabelle `damages`
--
ALTER TABLE `damages`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;
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
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;
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
-- AUTO_INCREMENT für Tabelle `missions`
--
ALTER TABLE `missions`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT für Tabelle `playerstatus`
--
ALTER TABLE `playerstatus`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT für Tabelle `powers`
--
ALTER TABLE `powers`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=112;
--
-- AUTO_INCREMENT für Tabelle `reinforcements`
--
ALTER TABLE `reinforcements`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT für Tabelle `sensors`
--
ALTER TABLE `sensors`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;
--
-- AUTO_INCREMENT für Tabelle `subunits`
--
ALTER TABLE `subunits`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT für Tabelle `systemcrits`
--
ALTER TABLE `systemcrits`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT für Tabelle `units`
--
ALTER TABLE `units`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

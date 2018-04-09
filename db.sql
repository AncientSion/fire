-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 09. Apr 2018 um 21:27
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
(1, 3, 1, 'deploy', 0, 640, -44, 180, 0, 0, 1, 1),
(2, 1, 1, 'deploy', 0, -619, -97, 0, 0, 0, 1, 1),
(3, 2, 1, 'deploy', 0, -679, 252, 0, 0, 0, 1, 1),
(4, 1, 1, 'jumpIn', 32, -616, -128, -17, 0, 0, 0, 1),
(5, 2, 1, 'jumpIn', 29, -658, 272, -8, 0, 0, 0, 1),
(6, 3, 1, 'jumpIn', 9, 648, -47, -11, 0, 0, 0, 1),
(7, 1, 1, 'move', 155, -468, -173, 0, 0, 0, 1, 1),
(8, 2, 1, 'move', 155, -505, 250, 0, 0, 0, 1, 1),
(9, 3, 1, 'move', 165, 486, -16, 0, 0, 0, 1, 1),
(10, -3, 1, 'speed', 1, 486, -16, 0, 35, 0, 1, 0),
(11, -3, 1, 'turn', 0, 486, -16, 26, 30, 64, 1, 0),
(12, -3, 1, 'move', 185, 307, -64, 0, 0, 0, 1, 0),
(13, 4, 2, 'deploy', 0, -478, 239, -15, 0, 0, 0, 1),
(14, 1, 2, 'move', 155, -320, -218, 0, 0, 0, 1, 1),
(15, 2, 2, 'move', 155, -352, 228, 0, 0, 0, 1, 1),
(16, 4, 2, 'deploy', 0, -478, 239, -15, 0, 0, 0, 1),
(17, 3, 2, 'speed', 1, 486, -16, 0, 35, 0, 1, 1),
(18, 3, 2, 'turn', 0, 486, -16, 26, 30, 64, 1, 1),
(19, 3, 2, 'move', 185, 307, -64, 0, 0, 0, 1, 1),
(20, 4, 2, 'move', 842, 307, -64, 339, 0, 0, 0, 1),
(21, 5, 3, 'deploy', 0, -279, -208, 14, 1, 0, 1, 1),
(22, 1, 3, 'move', 155, -172, -263, 0, 0, 0, 1, 1),
(23, 1, 3, 'turn', 0, -172, -263, 30, 60, 0, 1, 1),
(24, 2, 3, 'move', 155, -199, 206, 0, 0, 0, 1, 1),
(25, 3, 3, 'turn', 0, 307, -64, -25, 29, 62, 1, 1),
(26, 3, 3, 'move', 185, 125, -32, 0, 0, 0, 1, 1),
(27, 5, 3, 'move', 441, -187, -168, 24, 0, 0, 0, 1),
(28, 1, 4, 'turn', 0, -172, -263, 30, 30, 95, 1, 1),
(29, 1, 4, 'move', 95, -103, -198, 0, 0, 0, 1, 1),
(30, 1, 4, 'turn', 0, -103, -198, 30, 42, 60, 1, 1),
(31, 1, 4, 'move', 60, -85, -141, 0, 0, 0, 1, 1),
(32, 2, 4, 'turn', 0, -199, 206, -30, 30, 86, 1, 1),
(33, 2, 4, 'move', 86, -131, 153, 0, 0, 0, 1, 1),
(34, 2, 4, 'turn', 0, -131, 153, -30, 36, 69, 1, 1),
(35, 2, 4, 'move', 69, -105, 89, 0, 0, 0, 1, 1),
(36, 3, 4, 'turn', 0, 125, -32, 30, 34, 74, 1, 1),
(37, 3, 4, 'move', 185, -49, -95, 0, 0, 0, 1, 1),
(38, 5, 4, 'move', 157, -49, -95, 28, 0, 0, 0, 1),
(39, 7, 1, 'deploy', 0, -642, 458, 0, 0, 0, 1, 1),
(40, 6, 1, 'deploy', 0, -617, -52, 0, 0, 0, 1, 1),
(41, 8, 1, 'deploy', 0, 679, -120, 180, 0, 0, 1, 1),
(42, 9, 1, 'deploy', 0, 644, 400, 180, 0, 0, 1, 1),
(43, 6, 1, 'jumpIn', 27, -643, -57, -1, 0, 0, 0, 1),
(44, 7, 1, 'jumpIn', 32, -672, 467, 15, 0, 0, 0, 1),
(45, 8, 1, 'jumpIn', 12, 675, -109, -10, 0, 0, 0, 1),
(46, 9, 1, 'jumpIn', 24, 646, 377, 7, 0, 0, 0, 1),
(47, 8, 1, 'move', 155, 522, -82, 0, 0, 0, 1, 1),
(48, 8, 1, 'turn', 0, 522, -82, -3, 8, 0, 1, 1),
(49, 9, 1, 'move', 175, 472, 356, 0, 0, 0, 1, 1),
(50, 7, 1, 'turn', 0, -672, 467, -30, 30, 84, 1, 1),
(51, 7, 1, 'move', 155, -522, 427, 0, 0, 0, 1, 1),
(52, 7, 1, 'turn', 0, -522, 427, -17, 34, 0, 1, 1),
(53, 6, 1, 'move', 175, -468, -60, 0, 0, 0, 1, 1),
(54, -8, 1, 'move', 155, 371, -47, 0, 0, 0, 1, 0),
(55, -8, 1, 'turn', 0, 371, -47, -15, 30, 0, 1, 0),
(56, -9, 1, 'turn', 0, 472, 356, -30, 30, 38, 1, 0),
(57, -9, 1, 'move', 175, 311, 424, 0, 0, 0, 1, 0),
(58, -9, 1, 'turn', 0, 311, 424, 27, 56, 0, 1, 0),
(59, -7, 1, 'turn', 0, -522, 427, 30, 30, 84, 1, 0),
(60, -7, 1, 'move', 155, -367, 422, 0, 0, 0, 1, 0),
(61, -6, 1, 'move', 175, -293, -63, 0, 0, 0, 1, 0),
(62, 10, 2, 'deploy', 0, 503, -75, 179, 0, 0, 0, 1),
(63, 7, 2, 'turn', 0, -522, 427, 30, 30, 84, 1, 1),
(64, 7, 2, 'move', 155, -367, 422, 0, 0, 0, 1, 1),
(65, 6, 2, 'move', 175, -293, -63, 0, 0, 0, 1, 1),
(66, 8, 2, 'move', 155, 371, -47, 0, 0, 0, 1, 1),
(67, 8, 2, 'turn', 0, 371, -47, -16, 32, 0, 1, 1),
(68, 9, 2, 'turn', 0, 472, 356, -8, 8, 11, 1, 1),
(69, 9, 2, 'move', 175, 297, 359, 0, 0, 0, 1, 1),
(70, 10, 2, 'deploy', 0, 503, -75, 179, 0, 0, 0, 1),
(71, 10, 2, 'move', 797, -97, -66, 179, 0, 0, 0, 1),
(72, -7, 1, 'move', 155, -212, 417, 0, 0, 0, 1, 0),
(73, -6, 1, 'move', 175, -118, -66, 0, 0, 0, 1, 0),
(74, -8, 1, 'move', 155, 235, 28, 0, 0, 0, 1, 0),
(75, -9, 1, 'turn', 0, 297, 359, 30, 30, 38, 1, 0),
(76, -9, 1, 'move', 175, 144, 274, 0, 0, 0, 1, 0),
(77, 11, 3, 'deploy', 0, -349, 427, -5, 0, 0, 0, 1),
(78, 7, 3, 'move', 155, -212, 417, 0, 0, 0, 1, 1),
(79, 6, 3, 'move', 175, -118, -66, 0, 0, 0, 1, 1),
(80, 11, 3, 'deploy', 0, -349, 427, -5, 0, 0, 0, 1),
(81, 8, 3, 'move', 155, 235, 28, 0, 0, 0, 1, 1),
(82, 9, 3, 'speed', 1, 297, 359, 0, 40, 0, 1, 1),
(83, 9, 3, 'turn', 0, 297, 359, 26, 29, 37, 1, 1),
(84, 9, 3, 'move', 196, 119, 276, 0, 0, 0, 1, 1),
(85, 9, 3, 'turn', 0, 119, 276, 2, 6, 0, 1, 1),
(86, 11, 3, 'move', 492, -214, 383, 342, 0, 0, 0, 1),
(87, 7, 4, 'move', 155, -57, 412, 0, 0, 0, 1, 1),
(88, 6, 4, 'move', 175, 57, -69, 0, 0, 0, 1, 1),
(89, 8, 4, 'move', 155, 99, 103, 0, 0, 0, 1, 1),
(90, 9, 4, 'move', 196, -56, 187, 0, 0, 0, 1, 1),
(91, 11, 4, 'move', 252, -56, 187, 309, 0, 0, 0, 1),
(92, 14, 1, 'deploy', 0, 676, -57, 180, 0, 0, 1, 0),
(93, 13, 1, 'deploy', 0, -613, 155, 0, 0, 0, 1, 1),
(94, 15, 1, 'deploy', 0, 647, -64, 180, 0, 0, 1, 1),
(95, 16, 1, 'deploy', 0, 651, 514, 180, 0, 0, 1, 1),
(96, 13, 1, 'jumpIn', 34, -646, 152, 10, 0, 0, 0, 1),
(97, 15, 1, 'jumpIn', 42, 678, -37, -7, 0, 0, 0, 1),
(98, 16, 1, 'jumpIn', 24, 664, 494, 13, 0, 0, 0, 1),
(99, 15, 1, 'move', 155, 524, -18, 0, 0, 0, 1, 1),
(100, 16, 1, 'move', 155, 513, 459, 0, 0, 0, 1, 1),
(101, 13, 1, 'move', 155, -493, 179, 0, 0, 0, 1, 1);

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
  `structDmg` int(5) DEFAULT NULL,
  `armourDmg` int(3) DEFAULT NULL,
  `emDmg` int(3) DEFAULT '0',
  `overkill` int(3) DEFAULT NULL,
  `negation` int(4) DEFAULT NULL,
  `destroyed` tinyint(1) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `new` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `damages`
--

INSERT INTO `damages` (`id`, `fireid`, `gameid`, `shipid`, `structureid`, `systemid`, `turn`, `roll`, `type`, `totalDmg`, `shieldDmg`, `structDmg`, `armourDmg`, `emDmg`, `overkill`, `negation`, `destroyed`, `notes`, `new`) VALUES
(1, 3, 2, 3, 16, 1, 2, 0, 'Warhead', 32, 0, 0, 14, 0, 18, 14, 0, 'p;', 0),
(2, 3, 2, 3, 16, 1, 2, 0, 'Warhead', 31, 0, 0, 14, 0, 17, 14, 0, 'p;', 0),
(3, 3, 2, 3, 16, 1, 2, 0, 'Warhead', 28, 0, 0, 13, 0, 15, 13, 0, 'p;', 0),
(4, 3, 2, 3, 16, 1, 2, 0, 'Warhead', 32, 0, 0, 13, 0, 19, 13, 0, 'p;', 0),
(5, 6, 2, 1, 6, 8, 3, 0, 'Pulse', 23, 0, 19, 4, 0, 0, 4, 0, 'p;v1;', 0),
(6, 7, 2, 3, 9, 1, 3, 0, 'Laser', 216, 0, 0, 14, 0, 58, 14, 0, 'p;', 0),
(7, 8, 2, 3, 9, 1, 3, 0, 'Laser', 203, 0, 0, 13, 0, 54, 13, 0, 'p;', 0),
(8, 10, 2, 3, 6, 1, 3, 0, 'Laser', 82, 0, 0, 13, 0, 14, 13, 0, 'p;', 0),
(9, 8, 2, 3, 9, 3, 3, 0, 'Laser', 203, 0, 20, 13, 0, 34, 13, 0, 'p;c;', 0),
(10, 10, 2, 3, 6, 5, 3, 0, 'Laser', 82, 0, 13, 14, 0, 0, 14, 0, 'p;', 0),
(11, 10, 2, 3, 6, 7, 3, 0, 'Laser', 82, 0, 19, 8, 0, 0, 8, 0, 'p;', 0),
(12, 8, 2, 3, 9, 10, 3, 0, 'Laser', 203, 0, 44, 8, 0, 15, 8, 1, 'p;', 0),
(13, 7, 2, 3, 9, 11, 3, 0, 'Laser', 216, 0, 28, 6, 0, 38, 6, 1, 'p;', 0),
(14, 7, 2, 3, 9, 12, 3, 0, 'Laser', 216, 0, 44, 8, 0, 20, 8, 1, 'p;', 0),
(15, 13, 2, 5, 0, 7, 4, 0, 'Pulse', 26, 0, 0, 6, 0, 20, 3, 0, 'p;v2;', 0),
(16, 12, 2, 5, 0, 17, 4, 0, 'Pulse', 48, 0, 0, 9, 0, 39, 3, 1, 'p;v3;', 0),
(17, 14, 2, 3, 9, 1, 4, 0, 'Laser', 99, 0, 0, 10, 0, 23, 10, 0, 'p;', 0),
(18, 14, 2, 3, 9, 1, 4, 0, 'Laser', 99, 0, 0, 10, 0, 23, 10, 0, 'p;', 0),
(19, 14, 2, 3, 9, 1, 4, 0, 'Laser', 99, 0, 0, 10, 0, 23, 10, 0, 'p;', 0),
(20, 16, 2, 3, 16, 1, 4, 0, 'Laser', 97, 0, 0, 12, 0, 20, 12, 0, 'p;', 0),
(21, 20, 2, 3, 16, 1, 4, 0, 'Particle', 12, 0, 0, 12, 0, 0, 12, 0, 'b;', 0),
(22, 22, 2, 3, 9, 1, 4, 0, 'Particle', 14, 0, 0, 18, 0, 10, 9, 0, 'p;', 0),
(23, 23, 2, 3, 13, 1, 4, 0, 'Particle', 15, 0, 0, 24, 0, 6, 12, 0, 'p;', 0),
(24, 25, 2, 3, 9, 1, 4, 0, 'Particle', 12, 0, 0, 18, 0, 6, 9, 0, 'p;', 0),
(25, 15, 2, 3, 9, 4, 4, 0, 'Pulse', 92, 0, 20, 92, 0, 24, 12, 0, 'p;v4;c;', 0),
(26, 16, 2, 3, 16, 5, 4, 0, 'Laser', 97, 0, 19, 13, 0, 0, 13, 0, 'p;', 0),
(27, 24, 2, 3, 16, 17, 4, 0, 'Particle', 12, 0, 10, 14, 0, 0, 7, 0, 'p;', 0),
(28, 16, 2, 3, 16, 18, 4, 0, 'Laser', 97, 0, 27, 5, 0, 0, 5, 0, 'p;', 0),
(29, 33, 3, 7, 18, 1, 2, 0, 'Laser', 70, 0, 0, 19, 0, 4, 19, 0, 'p;', 0),
(30, 33, 3, 7, 18, 1, 2, 0, 'Laser', 70, 0, 0, 18, 0, 5, 18, 0, 'p;', 0),
(31, 34, 3, 7, 18, 1, 2, 0, 'Laser', 75, 0, 0, 17, 0, 8, 17, 0, 'p;', 0),
(32, 34, 3, 7, 18, 1, 2, 0, 'Laser', 75, 0, 0, 16, 0, 9, 16, 0, 'p;', 0),
(33, 35, 3, 7, 18, 1, 2, 0, 'Laser', 70, 0, 0, 16, 0, 7, 16, 0, 'p;', 0),
(34, 35, 3, 7, 18, 1, 2, 0, 'Laser', 70, 0, 0, 15, 0, 8, 15, 0, 'p;', 0),
(35, 36, 3, 7, 18, 1, 2, 0, 'Laser', 84, 0, 0, 15, 0, 13, 15, 0, 'p;', 0),
(36, 36, 3, 7, 18, 1, 2, 0, 'Laser', 84, 0, 0, 14, 0, 14, 14, 0, 'p;', 0),
(37, 38, 3, 7, 6, 1, 2, 0, 'Laser', 95, 0, 0, 20, 0, 11, 20, 0, 'p;', 0),
(38, 38, 3, 7, 6, 1, 2, 0, 'Laser', 95, 0, 0, 19, 0, 12, 19, 0, 'p;', 0),
(39, 39, 3, 7, 6, 1, 2, 0, 'Laser', 92, 0, 0, 18, 0, 12, 18, 0, 'p;', 0),
(40, 33, 3, 7, 18, 5, 2, 0, 'Laser', 70, 0, 5, 18, 0, 0, 18, 0, 'p;', 0),
(41, 39, 3, 7, 6, 5, 2, 0, 'Laser', 92, 0, 12, 18, 0, 0, 18, 0, 'p;', 0),
(42, 38, 3, 7, 6, 7, 2, 0, 'Laser', 95, 0, 22, 9, 0, 0, 9, 0, 'p;', 0),
(43, 39, 3, 7, 6, 9, 2, 0, 'Laser', 92, 0, 19, 11, 0, 0, 11, 0, 'p;', 0),
(44, 34, 3, 7, 18, 19, 2, 0, 'Laser', 75, 0, 15, 10, 0, 0, 10, 0, 'p;', 0),
(45, 36, 3, 7, 18, 19, 2, 0, 'Laser', 84, 0, 19, 9, 0, 0, 9, 0, 'p;', 0),
(46, 35, 3, 7, 18, 21, 2, 0, 'Laser', 70, 0, 13, 10, 0, 0, 10, 0, 'p;', 0),
(47, 42, 3, 8, 6, 8, 2, 0, 'Particle', 56, 0, 38, 18, 0, 0, 18, 0, 'p;', 0),
(48, 40, 3, 8, 6, 8, 2, 0, 'Particle', 33, 0, 16, 17, 0, 0, 17, 0, 'p;', 0),
(49, 43, 3, 8, 6, 8, 2, 0, 'Particle', 35, 0, 18, 17, 0, 0, 17, 0, 'p;', 0),
(50, 50, 3, 8, 10, 11, 3, 0, 'Particle', 12, 0, 4, 68, 0, 0, 10, 0, 'p;', 0),
(51, 47, 3, 9, 7, 7, 3, 0, 'Particle', 13, 0, 0, 11, 0, 2, 11, 0, 'p;', 0),
(52, 47, 3, 9, 7, 11, 3, 0, 'Particle', 13, 0, 0, 11, 0, 2, 11, 0, 'p;', 0),
(53, 61, 3, 8, 10, 1, 4, 0, 'Particle', 16, 0, 0, 14, 0, 2, 14, 0, 'p;', 0),
(54, 61, 3, 8, 10, 1, 4, 0, 'Particle', 13, 0, 0, 7, 0, 0, 14, 0, 'b;', 0),
(55, 62, 3, 8, 10, 1, 4, 0, 'Particle', 13, 0, 0, 7, 0, 0, 13, 0, 'b;', 0),
(56, 63, 3, 8, 10, 2, 4, 0, 'Particle', 14, 0, 1, 13, 0, 0, 13, 0, 'p;', 0),
(57, 63, 3, 8, 10, 5, 4, 0, 'Particle', 12, 0, 0, 6, 0, 0, 13, 0, 'b;', 0),
(58, 61, 3, 8, 10, 12, 4, 0, 'Particle', 14, 0, 6, 8, 0, 0, 8, 0, 'p;', 0),
(59, 62, 3, 8, 10, 12, 4, 0, 'Particle', 15, 0, 7, 8, 0, 0, 8, 0, 'p;', 0),
(60, 63, 3, 8, 10, 12, 4, 0, 'Particle', 13, 0, 5, 8, 0, 0, 8, 0, 'p;', 0),
(61, 63, 3, 8, 10, 12, 4, 0, 'Particle', 12, 0, 5, 7, 0, 0, 7, 0, 'p;', 0),
(62, 64, 3, 9, 11, 3, 4, 0, 'Warhead', 44, 0, 0, 11, 0, 33, 11, 0, 'p;', 0),
(63, 64, 3, 9, 11, 7, 4, 0, 'Warhead', 34, 0, 0, 11, 0, 23, 11, 0, 'p;', 0),
(64, 64, 3, 9, 11, 7, 4, 0, 'Warhead', 38, 0, 0, 10, 0, 28, 10, 0, 'p;', 0),
(65, 64, 3, 9, 11, 7, 4, 0, 'Warhead', 33, 0, 0, 10, 0, 23, 10, 0, 'p;', 0),
(66, 64, 3, 9, 11, 11, 4, 0, 'Warhead', 34, 0, 0, 11, 0, 23, 11, 0, 'p;', 0),
(67, 64, 3, 9, 11, 11, 4, 0, 'Warhead', 35, 0, 0, 10, 0, 25, 10, 0, 'p;', 0),
(68, 64, 3, 9, 11, 11, 4, 0, 'Warhead', 41, 0, 0, 10, 0, 31, 10, 0, 'p;', 0),
(69, 64, 3, 9, 11, 11, 4, 0, 'Warhead', 37, 0, 0, 10, 0, 27, 10, 0, 'p;', 0),
(106, 68, 5, 13, 6, 1, 1, 0, 'Particle', 53, 0, 0, 20, 0, 33, 20, 0, 'p;', 0),
(107, 69, 5, 13, 6, 1, 1, 0, 'Particle', 52, 0, 0, 18, 0, 34, 18, 0, 'p;', 0),
(108, 69, 5, 13, 6, 2, 1, 0, 'Particle', 56, 0, 20, 19, 0, 17, 19, 0, 'p;c;', 0),
(109, 70, 5, 13, 6, 4, 1, 0, 'Particle', 52, 0, 20, 17, 0, 15, 17, 0, 'p;c;', 0),
(110, 70, 5, 13, 6, 8, 1, 0, 'Particle', 54, 0, 36, 11, 0, 7, 11, 1, 'p;o3;', 0),
(111, 68, 5, 13, 6, 9, 1, 0, 'Particle', 55, 0, 36, 11, 0, 8, 11, 1, 'p;o3;', 0),
(112, 65, 5, 15, 6, 1, 1, 0, 'Particle', 49, 0, 0, 20, 0, 29, 20, 0, 'p;', 0),
(113, 66, 5, 15, 6, 1, 1, 0, 'Particle', 48, 0, 0, 19, 0, 29, 19, 0, 'p;', 0),
(114, 67, 5, 15, 6, 5, 1, 0, 'Particle', 55, 0, 20, 18, 0, 17, 18, 0, 'p;c;', 0),
(115, 67, 5, 15, 6, 7, 1, 0, 'Particle', 49, 0, 28, 8, 0, 13, 8, 1, 'p;o2;', 0),
(116, 65, 5, 15, 6, 8, 1, 0, 'Particle', 55, 0, 36, 11, 0, 8, 11, 1, 'p;o3;', 0),
(117, 66, 5, 15, 6, 9, 1, 0, 'Particle', 49, 0, 36, 11, 0, 2, 11, 1, 'p;o3;', 0);

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
(1, 2, 2, 1, 0, 249, -112, 8, 1, 0, '249;-112;', 0, 1),
(2, 2, 2, 2, 3, 488, -19, 9, 4, 0, '', 0, 1),
(3, 2, 2, 4, 3, 0, 0, 2, 4, 100, '97;5;95;67;', 4, 1),
(4, 2, 3, 1, 0, 313, -59, 18, 0, 0, '', 0, 1),
(5, 2, 3, 3, 1, -166, -260, 7, 1, 42, '85;', 0, 1),
(6, 2, 3, 3, 1, -166, -260, 8, 1, 42, '32;', 1, 1),
(7, 2, 3, 1, 3, 128, -32, 7, 1, 33, '22;', 1, 1),
(8, 2, 3, 1, 3, 128, -32, 9, 1, 33, '23;', 1, 1),
(9, 2, 3, 2, 3, 115, -32, 19, 1, 42, '58;', 0, 1),
(10, 2, 3, 2, 3, 115, -32, 20, 1, 42, '34;', 1, 1),
(11, 2, 4, 3, 5, 0, 0, 14, 1, 48, '71;', 0, 1),
(12, 2, 4, 3, 5, 0, 0, 15, 1, 48, '6;', 1, 1),
(13, 2, 4, 3, 5, 0, 0, 18, 1, 48, '32;', 1, 1),
(14, 2, 4, 1, 3, -54, -97, 20, 1, 106, '45;', 1, 1),
(15, 2, 4, 1, 3, -54, -97, 22, 1, 102, '28;', 1, 1),
(16, 2, 4, 2, 3, -49, -94, 11, 1, 65, '35;', 1, 1),
(17, 2, 4, 2, 3, -49, -94, 12, 1, 65, '96;', 0, 1),
(18, 2, 4, 2, 3, -49, -94, 21, 1, 42, '61;', 0, 1),
(19, 2, 4, 2, 3, -49, -94, 22, 1, 42, '48;', 0, 1),
(20, 2, 4, 5, 3, 0, 0, 2, 1, 70, '14;', 1, 1),
(21, 2, 4, 5, 3, 0, 0, 4, 1, 73, '97;', 0, 1),
(22, 2, 4, 5, 3, 0, 0, 6, 1, 81, '52;', 1, 1),
(23, 2, 4, 5, 3, 0, 0, 8, 1, 75, '63;', 1, 1),
(24, 2, 4, 5, 3, 0, 0, 10, 1, 81, '26;', 1, 1),
(25, 2, 4, 5, 3, 0, 0, 12, 1, 77, '5;', 1, 1),
(26, 2, 4, 5, 3, 0, 0, 14, 1, 76, '95;', 0, 1),
(27, 2, 4, 5, 3, 0, 0, 16, 1, 75, '77;', 0, 1),
(28, 2, 4, 5, 3, 0, 0, 18, 1, 0, '', 0, 1),
(29, 2, 4, 5, 3, 0, 0, 20, 1, 76, '93;', 0, 1),
(30, 3, 1, 7, 8, 513, -82, 12, 0, 0, '', 0, 0),
(31, 3, 2, 8, 6, -460, -52, 7, 4, 0, '', 0, 1),
(32, 3, 2, 8, 6, -460, -52, 9, 4, 0, '', 0, 1),
(33, 3, 2, 8, 7, -371, 416, 11, 1, 77, '60;', 1, 1),
(34, 3, 2, 8, 7, -375, 415, 12, 1, 77, '11;', 1, 1),
(35, 3, 2, 8, 7, -371, 416, 19, 1, 77, '74;', 1, 1),
(36, 3, 2, 8, 7, -371, 416, 20, 1, 77, '18;', 1, 1),
(37, 3, 2, 9, 7, -380, 415, 4, 1, 70, '85;', 0, 1),
(38, 3, 2, 9, 7, -380, 415, 8, 1, 70, '50;', 1, 1),
(39, 3, 2, 9, 7, -380, 415, 12, 1, 70, '52;', 1, 1),
(40, 3, 2, 7, 8, 378, -44, 8, 2, 24, '9;30;', 1, 1),
(41, 3, 2, 7, 8, 378, -44, 9, 2, 24, '61;92;', 0, 1),
(42, 3, 2, 7, 8, 378, -44, 19, 2, 59, '46;63;', 1, 1),
(43, 3, 2, 7, 8, 378, -44, 21, 2, 24, '11;57;', 1, 1),
(44, 3, 3, 7, 9, 298, 358, 13, 4, 0, '', 0, 1),
(45, 3, 3, 7, 9, 298, 358, 20, 4, 0, '', 0, 1),
(46, 3, 3, 7, 9, 106, 273, 7, 4, 22, '52;68;41;32;', 0, 1),
(47, 3, 3, 7, 9, 106, 273, 10, 4, 22, '41;2;97;4;', 2, 1),
(48, 3, 3, 6, 8, 238, 27, 4, 1, 30, '53;', 0, 1),
(49, 3, 3, 6, 8, 238, 27, 8, 1, 30, '76;', 0, 1),
(50, 3, 3, 6, 8, 238, 27, 12, 1, 30, '13;', 1, 1),
(51, 3, 3, 9, 6, -110, -64, 5, 2, 4, '37;26;', 0, 1),
(52, 3, 3, 9, 7, -205, 417, 6, 2, 16, '17;44;', 0, 1),
(53, 3, 3, 9, 6, -110, -64, 9, 2, 4, '77;56;', 0, 1),
(54, 3, 3, 9, 7, -205, 417, 10, 2, 16, '69;90;', 0, 1),
(55, 3, 3, 9, 6, -110, -64, 13, 2, 4, '80;68;', 0, 1),
(56, 3, 3, 9, 7, -205, 417, 14, 2, 16, '78;62;', 0, 1),
(57, 3, 4, 8, 6, 71, -58, 13, 1, 23, '66;', 0, 1),
(58, 3, 4, 8, 6, 71, -58, 14, 1, 23, '74;', 0, 1),
(59, 3, 4, 8, 7, -59, 406, 21, 1, 24, '36;', 0, 1),
(60, 3, 4, 8, 7, -59, 406, 22, 1, 24, '29;', 0, 1),
(61, 3, 4, 6, 8, 103, 112, 5, 4, 55, '49;52;87;28;', 3, 1),
(62, 3, 4, 6, 8, 103, 112, 9, 4, 55, '89;91;25;22;', 2, 1),
(63, 3, 4, 6, 8, 103, 112, 13, 4, 55, '18;55;18;29;', 4, 1),
(64, 3, 4, 11, 9, 0, 0, 2, 8, 100, '61;97;32;83;37;55;67;26;', 8, 1),
(65, 5, 1, 13, 15, 526, -10, 8, 2, 139, '9;47;', 2, 1),
(66, 5, 1, 13, 15, 526, -10, 9, 2, 139, '39;61;', 2, 1),
(67, 5, 1, 13, 15, 526, -10, 21, 2, 139, '8;43;', 2, 1),
(68, 5, 1, 15, 13, -496, 185, 8, 2, 147, '37;62;', 2, 1),
(69, 5, 1, 15, 13, -496, 185, 9, 2, 147, '23;96;', 2, 1),
(70, 5, 1, 15, 13, -496, 185, 21, 2, 147, '16;29;', 2, 1);

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
  `reinforceTurn` int(2) DEFAULT '11'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `games`
--

INSERT INTO `games` (`id`, `name`, `status`, `turn`, `phase`, `pv`, `reinforce`, `reinforceTurn`) VALUES
(5, 'myGame', 'active', 1, 3, 3000, 1500, 11);

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
(2, 2, 9, 'Vran', 12),
(3, 3, 10, 'Naga', 4),
(4, 7, 13, 'Javelin', 8),
(5, 7, 20, 'Javelin', 8),
(6, 8, 7, 'Vran', 12),
(7, 8, 9, 'Vran', 12),
(8, 15, 13, 'Javelin', 4),
(9, 16, 9, 'Vran', 16);

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
(1, 4, '2', 2, 3, 307, -64, 2),
(2, 5, '2', 3, 3, -49, -95, 4),
(3, 10, '2', 2, 6, -293, -63, 0),
(4, 11, '2', 3, 9, -56, 187, 4);

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
(4, 1, 2, 4, 3, 'Narn Regime', 1179, 'waiting'),
(5, 2, 2, 4, 3, 'Earth Alliance', 1380, 'waiting'),
(6, 1, 3, 5, -1, 'Centauri Republic', -1389, 'ready'),
(7, 2, 3, 5, -1, 'Narn Regime', -1006, 'waiting'),
(8, 1, 4, 1, 2, 'Earth Alliance', 2225, 'ready'),
(9, 2, 4, 1, 2, 'Centauri Republic', 2200, 'ready'),
(10, 1, 5, 1, 3, 'Centauri Republic', 2200, 'waiting'),
(11, 2, 5, 1, 3, 'Centauri Republic', 1429, 'waiting');

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
(1, 3, 11, 1, '-1', 0),
(2, 3, 12, 1, '0', 0),
(3, 3, 14, 1, '-1', 0),
(4, 3, 15, 1, '-1', 0),
(5, 3, 17, 1, '0', 0),
(6, 3, 18, 1, '-1', 0),
(7, 3, 19, 1, '0', 0),
(8, 1, 11, 1, '0', 0),
(9, 2, 7, 1, '0', 0),
(10, 1, 11, 2, '0', 0),
(11, 2, 7, 2, '0', 0),
(12, 2, 9, 2, '1', 0),
(13, 2, 9, 2, '1', 0),
(14, 2, 9, 2, '1', 0),
(15, 2, 9, 2, '1', 0),
(16, 3, 11, 2, '-1', 0),
(17, 3, 12, 2, '0', 0),
(18, 3, 14, 2, '-1', 0),
(19, 3, 15, 2, '-1', 0),
(20, 3, 17, 2, '0', 0),
(21, 3, 18, 2, '-1', 0),
(22, 3, 19, 2, '0', 0),
(23, 3, 11, 3, '-1', 0),
(24, 3, 12, 3, '0', 0),
(25, 3, 14, 3, '-1', 0),
(26, 3, 15, 3, '-1', 0),
(27, 3, 17, 3, '0', 0),
(28, 3, 18, 3, '-1', 0),
(29, 3, 19, 3, '0', 0),
(30, 1, 11, 3, '0', 0),
(31, 2, 7, 3, '0', 0),
(32, 3, 12, 4, '0', 0),
(33, 3, 14, 4, '-1', 0),
(34, 3, 15, 4, '-1', 0),
(35, 3, 17, 4, '0', 0),
(36, 3, 18, 4, '-1', 0),
(37, 3, 19, 4, '0', 0),
(38, 1, 11, 4, '0', 0),
(39, 2, 7, 4, '0', 0),
(40, 2, 13, 4, '1', 2),
(41, 2, 14, 4, '1', 2),
(42, 8, 13, 1, '0', 0),
(43, 8, 14, 1, '0', 0),
(44, 8, 16, 1, '0', 0),
(45, 8, 17, 1, '0', 0),
(46, 8, 21, 1, '0', 0),
(47, 8, 22, 1, '0', 0),
(48, 8, 4, 1, '1', 3),
(49, 8, 4, 1, '1', 5),
(50, 8, 7, 2, '1', 0),
(51, 8, 7, 2, '1', 0),
(52, 8, 7, 2, '1', 0),
(53, 8, 7, 2, '1', 0),
(54, 8, 9, 2, '1', 0),
(55, 8, 9, 2, '1', 0),
(56, 8, 9, 2, '1', 0),
(57, 8, 9, 2, '1', 0),
(58, 8, 11, 2, '1', 3),
(59, 8, 12, 2, '1', 3),
(60, 8, 13, 2, '0', 0),
(61, 8, 14, 2, '0', 0),
(62, 8, 16, 2, '0', 0),
(63, 8, 17, 2, '0', 0),
(64, 8, 19, 2, '1', 3),
(65, 8, 20, 2, '1', 3),
(66, 8, 21, 2, '0', 0),
(67, 8, 22, 2, '0', 0),
(68, 9, 4, 2, '1', 3),
(69, 9, 8, 2, '1', 3),
(70, 9, 12, 2, '1', 3),
(71, 7, 12, 2, '1', 4),
(72, 7, 16, 2, '0', 0),
(73, 7, 17, 2, '0', 0),
(74, 7, 13, 3, '1', 0),
(75, 7, 13, 3, '1', 0),
(76, 7, 13, 3, '1', 0),
(77, 7, 13, 3, '1', 0),
(78, 7, 17, 3, '0', 0),
(79, 7, 19, 3, '0', 0),
(80, 7, 20, 3, '1', 0),
(81, 7, 20, 3, '1', 0),
(82, 7, 20, 3, '1', 0),
(83, 7, 20, 3, '1', 0),
(84, 6, 4, 3, '1', 3),
(85, 6, 8, 3, '1', 3),
(86, 6, 12, 3, '1', 3),
(87, 7, 17, 4, '0', 0),
(88, 7, 19, 4, '0', 0),
(89, 7, 17, 5, '0', 0),
(90, 7, 19, 5, '0', 0),
(91, 14, 13, 1, '0', 0),
(92, 14, 20, 1, '0', 0),
(93, 13, 13, 1, '0', 0),
(94, 13, 20, 1, '0', 0),
(95, 15, 20, 1, '0', 0),
(96, 16, 7, 1, '0', 0);

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
(1, 3, 4, 1, '-1.00', 95, 0),
(2, 1, 4, 1, '-1.00', 113, 0),
(3, 2, 4, 1, '-1.00', 110, 0),
(4, 1, 4, 2, '-1.00', 113, 0),
(5, 2, 4, 2, '-1.00', 110, 0),
(6, 3, 4, 2, '-1.00', 95, 0),
(7, 3, 4, 3, '-1.00', 95, 0),
(8, 1, 4, 3, '-1.00', 113, 0),
(9, 2, 4, 3, '-1.00', 110, 0),
(10, 3, 4, 4, '-1.00', 95, 0),
(11, 1, 4, 4, '-1.00', 113, 0),
(12, 2, 4, 4, '-1.00', 110, 0),
(13, 7, 4, 1, '5.69', 1180, 0),
(14, 6, 1, 1, '-1.00', 77, 0),
(15, 8, 4, 1, '347.71', 1221, 0),
(16, 9, 1, 1, '-1.00', 73, 0),
(17, 8, 4, 2, '0.22', 924, 0),
(18, 9, 1, 2, '0.27', 793, 0),
(19, 7, 4, 2, '331.73', 962, 0),
(20, 6, 1, 2, '4.08', 744, 1),
(21, 7, 4, 3, '0.65', 381, 0),
(22, 6, 1, 3, '12.60', 462, 0),
(23, 8, 4, 3, '38.06', 444, 1),
(24, 9, 1, 3, '19.50', 428, 0),
(25, 8, 4, 4, '-1.00', 110, 0),
(26, 9, 1, 4, '-1.00', 73, 0),
(27, 7, 4, 4, '-1.00', 117, 0),
(28, 6, 1, 4, '-1.00', 77, 0),
(29, 7, 4, 5, '-1.00', 117, 0),
(30, 6, 1, 5, '-1.00', 77, 0),
(31, 14, 4, 1, '-1.00', 117, 0),
(32, 13, 4, 1, '-1.00', 117, 0),
(33, 15, 4, 1, '-1.00', 117, 0),
(34, 16, 4, 1, '-1.00', 110, 0);

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
(1, 4, 4, 'Vran'),
(2, 5, 10, 'Gorith'),
(3, 6, 1, 'VorchanB'),
(4, 6, 1, 'VorchanB'),
(5, 6, 1, 'VorchanB'),
(6, 9, 1, 'Thentus'),
(7, 9, 1, 'Thentus'),
(8, 9, 1, 'Thentus'),
(9, 10, 8, 'Vran'),
(10, 11, 8, 'Javelin');

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
(1, 1, 8, 3, 'Accuracy', 0, '30.00'),
(2, 3, 3, 3, 'Output', 0, '13.00'),
(3, 3, 5, 3, 'Output', 0, '8.00'),
(4, 3, 7, 3, 'Damage', 0, '20.00'),
(5, 3, 18, 4, 'Disabled', 1, '0.00'),
(6, 3, 18, 4, 'Damage', 0, '20.00'),
(7, 3, 18, 4, 'Accuracy', 0, '30.00'),
(8, 7, 5, 2, 'Output', 0, '10.00'),
(9, 7, 7, 2, 'Damage', 0, '20.00'),
(10, 7, 19, 2, 'Accuracy', 0, '30.00'),
(11, 7, 21, 2, 'Damage', 0, '20.00'),
(12, 8, 12, 4, 'Accuracy', 0, '30.00'),
(13, 9, 4, 4, 'Accuracy', 0, '25.00'),
(14, 9, 9, 4, 'Accuracy', 0, '25.00'),
(15, 9, 10, 4, 'Accuracy', 0, '25.00'),
(16, 9, 12, 4, 'Damage', 0, '15.00'),
(17, 9, 13, 4, 'Accuracy', 0, '25.00'),
(18, 9, 14, 4, 'Damage', 0, '15.00'),
(22, 13, 2, 1, 'Reactor', 0, '7.50'),
(23, 13, 5, 1, 'Output', 0, '8.33'),
(24, 15, 5, 1, 'Output', 0, '12.00'),
(25, 15, 5, 1, 'Output', 0, '11.11');

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
  `display` varchar(50) DEFAULT '',
  `status` varchar(255) DEFAULT '',
  `available` int(3) DEFAULT '0',
  `destroyed` tinyint(1) DEFAULT '0',
  `x` int(4) DEFAULT '0',
  `y` int(4) DEFAULT '0',
  `facing` int(3) DEFAULT '0',
  `delay` int(3) DEFAULT '0',
  `thrust` int(3) DEFAULT '0',
  `rolling` int(2) DEFAULT '0',
  `rolled` int(2) DEFAULT '0',
  `turn` int(1) DEFAULT '0',
  `phase` int(1) DEFAULT '0',
  `notes` varchar(50) DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `units`
--

INSERT INTO `units` (`id`, `gameid`, `userid`, `ship`, `ball`, `name`, `display`, `status`, `available`, `destroyed`, `x`, `y`, `facing`, `delay`, `thrust`, `rolling`, `rolled`, `turn`, `phase`, `notes`) VALUES
(1, 2, 1, 1, 0, 'GQuan', '', 'bought', 1, 0, -172, -263, 13, 0, 155, 0, 0, 3, 3, ''),
(2, 2, 1, 1, 0, 'GSten', '', 'bought', 1, 0, -199, 206, 352, 0, 155, 0, 0, 3, 3, ''),
(3, 2, 2, 1, 0, 'Saggitarius', '', 'bought', 1, 0, 125, -32, 170, 0, 185, 0, 0, 3, 3, ''),
(4, 2, 1, 0, 1, 'Salvo', NULL, 'deployed', 2, 1, 307, -64, 339, 0, 1600, NULL, NULL, 2, 3, ''),
(5, 2, 1, 0, 0, 'Flight', 'Eagle-Sigma', 'deployed', 3, 0, -187, -168, 24, 0, 200, NULL, NULL, 3, 3, ''),
(6, 3, 1, 1, 0, 'Squadron', '', 'bought', 1, 0, 57, -69, 359, 0, 175, 0, 0, 4, 3, ''),
(7, 3, 1, 1, 0, 'Centurion', '', 'bought', 1, 0, -57, 412, 358, 0, 155, 0, 0, 4, 3, ''),
(8, 3, 2, 1, 0, 'GSten', '', 'bought', 1, 0, 99, 103, 151, 0, 155, 0, 0, 4, 3, ''),
(9, 3, 2, 1, 0, 'Squadron', '', 'bought', 1, 0, -56, 187, 207, 0, 196, 0, 0, 4, 3, ''),
(10, 3, 2, 0, 1, 'Salvo', NULL, 'deployed', 2, 1, -97, -66, 179, 0, 600, NULL, NULL, 2, 3, ''),
(11, 3, 1, 0, 1, 'Salvo', NULL, 'deployed', 3, 1, -56, 187, 309, 0, 426, NULL, NULL, 4, 3, ''),
(12, 4, 1, 1, 0, 'Hyperion', '', 'bought', 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ''),
(13, 5, 1, 1, 0, 'Centurion', '', 'bought', 1, 0, -646, 152, 0, 0, 155, 0, 0, 1, -1, ''),
(14, 4, 2, 1, 0, 'Centurion', '', 'bought', 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ''),
(15, 5, 2, 1, 0, 'Centurion', '', 'bought', 1, 0, 678, -37, 0, 0, 155, 0, 0, 1, -1, ''),
(16, 5, 2, 1, 0, 'GSten', '', 'bought', 1, 0, 664, 494, 0, 0, 155, 0, 0, 1, -1, '');

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
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=102;
--
-- AUTO_INCREMENT für Tabelle `chat`
--
ALTER TABLE `chat`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `damages`
--
ALTER TABLE `damages`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=118;
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
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;
--
-- AUTO_INCREMENT für Tabelle `games`
--
ALTER TABLE `games`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT für Tabelle `loads`
--
ALTER TABLE `loads`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT für Tabelle `missions`
--
ALTER TABLE `missions`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT für Tabelle `playerstatus`
--
ALTER TABLE `playerstatus`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT für Tabelle `powers`
--
ALTER TABLE `powers`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;
--
-- AUTO_INCREMENT für Tabelle `reinforcements`
--
ALTER TABLE `reinforcements`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `sensors`
--
ALTER TABLE `sensors`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;
--
-- AUTO_INCREMENT für Tabelle `subunits`
--
ALTER TABLE `subunits`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT für Tabelle `systemcrits`
--
ALTER TABLE `systemcrits`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
--
-- AUTO_INCREMENT für Tabelle `units`
--
ALTER TABLE `units`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

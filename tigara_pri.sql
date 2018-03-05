-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 05. Mrz 2018 um 16:48
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
(1, 3, 1, 'deploy', 0, 549, 210, 180, 0, 0, 1, 1),
(2, 4, 1, 'deploy', 0, 528, -117, 180, 0, 0, 1, 1),
(3, 5, 1, 'deploy', 0, 536, 532, 180, 0, 0, 1, 1),
(4, 1, 1, 'deploy', 0, -535, 406, 0, 0, 0, 1, 1),
(5, 2, 1, 'deploy', 0, -545, -1, 0, 0, 0, 1, 1),
(6, 1, 1, 'jumpIn', 30, -511, 423, -10, 0, 0, 0, 1),
(7, 2, 1, 'jumpIn', 30, -572, -12, -13, 0, 0, 0, 1),
(8, 3, 1, 'jumpIn', 14, 556, 222, 14, 0, 0, 0, 1),
(9, 4, 1, 'jumpIn', 24, 515, -136, 2, 0, 0, 0, 1),
(10, 5, 1, 'jumpIn', 26, 558, 519, -8, 0, 0, 0, 1),
(11, 1, 1, 'turn', 0, -511, 423, 4, 4, 13, 1, 1),
(12, 1, 1, 'move', 155, -357, 407, 0, 0, 0, 1, 1),
(13, 2, 1, 'turn', 0, -572, -12, 12, 13, 41, 1, 1),
(14, 2, 1, 'move', 155, -417, -15, 0, 0, 0, 1, 1),
(15, 3, 1, 'turn', 0, 556, 222, 30, 30, 105, 1, 1),
(16, 3, 1, 'move', 140, 455, 125, 0, 0, 0, 1, 1),
(17, 4, 1, 'turn', 0, 515, -136, 27, 28, 51, 1, 1),
(18, 4, 1, 'move', 165, 371, -216, 0, 0, 0, 1, 1),
(19, 5, 1, 'turn', 0, 558, 519, 30, 30, 56, 1, 1),
(20, 5, 1, 'move', 165, 405, 457, 0, 0, 0, 1, 1),
(21, 6, 2, 'deploy', 0, 411, 118, -171, 1, 0, 1, 1),
(22, 7, 2, 'deploy', 0, 411, 118, -171, 1, 0, 1, 1),
(23, 8, 2, 'deploy', 0, 351, -221, 166, 0, 0, 0, 1),
(24, 9, 2, 'deploy', 0, 402, 449, -150, 0, 0, 0, 1),
(25, 3, 2, 'turn', 0, 455, 125, -30, 30, 105, 1, 1),
(26, 3, 2, 'move', 139, 331, 62, 0, 0, 0, 1, 1),
(27, 3, 2, 'turn', 0, 331, 62, -21, 40, 7, 1, 1),
(28, 3, 2, 'move', 1, 330, 62, 0, 0, 0, 1, 1),
(29, 4, 2, 'move', 165, 227, -296, 0, 0, 0, 1, 1),
(30, 4, 2, 'turn', 0, 227, -296, -30, 60, 0, 1, 1),
(31, 5, 2, 'turn', 0, 405, 457, -30, 30, 56, 1, 1),
(32, 5, 2, 'move', 163, 253, 517, 0, 0, 0, 1, 1),
(33, 5, 2, 'turn', 0, 253, 517, 30, 59, 2, 1, 1),
(34, 5, 2, 'move', 2, 251, 516, 0, 0, 0, 1, 1),
(35, 8, 2, 'deploy', 0, 351, -221, 166, 0, 0, 0, 1),
(36, 9, 2, 'deploy', 0, 402, 449, -150, 0, 0, 0, 1),
(37, 1, 2, 'turn', 0, -357, 407, 7, 8, 24, 1, 1),
(38, 1, 2, 'move', 155, -202, 410, 0, 0, 0, 1, 1),
(39, 1, 2, 'turn', 0, -202, 410, 4, 8, 0, 1, 1),
(40, 2, 2, 'turn', 0, -417, -15, -22, 22, 71, 1, 1),
(41, 2, 2, 'move', 155, -274, -76, 0, 0, 0, 1, 1),
(42, 6, 2, 'move', 712, 328, 95, 196, 0, 0, 0, 1),
(43, 7, 2, 'move', 712, 328, 95, 196, 0, 0, 0, 1),
(44, 8, 2, 'move', 642, 239, -195, 167, 0, 0, 0, 1),
(45, 9, 2, 'move', 856, 311, 378, 218, 0, 0, 0, 1),
(46, 1, 3, 'move', 155, -48, 424, 0, 0, 0, 1, 1),
(47, 1, 3, 'turn', 0, -48, 424, -9, 20, 0, 1, 1),
(48, 2, 3, 'move', 146, -155, -162, 0, 0, 0, 1, 1),
(49, 2, 3, 'turn', 0, -155, -162, 21, 40, 9, 1, 1),
(50, 2, 3, 'move', 9, -146, -162, 0, 0, 0, 1, 1),
(51, 3, 3, 'turn', 0, 330, 62, 30, 30, 105, 1, 1),
(52, 3, 3, 'move', 140, 201, 7, 0, 0, 0, 1, 1),
(53, 3, 3, 'turn', 0, 201, 7, 8, 18, 0, 1, 1),
(54, 4, 3, 'speed', 1, 227, -296, 0, 35, 0, 1, 1),
(55, 4, 3, 'move', 185, 42, -293, 0, 0, 0, 1, 1),
(56, 4, 3, 'turn', 0, 42, -293, -30, 68, 0, 1, 1),
(57, 5, 3, 'turn', 0, 251, 516, -18, 19, 34, 1, 1),
(58, 5, 3, 'move', 165, 86, 504, 0, 0, 0, 1, 1),
(59, 5, 3, 'turn', 0, 86, 504, 30, 60, 0, 1, 1),
(60, 6, 3, 'move', 540, 177, 13, 208, 0, 0, 0, 1),
(61, 7, 3, 'move', 540, 177, 13, 208, 0, 0, 0, 1),
(62, 8, 3, 'move', 387, 10, -175, 175, 0, 0, 0, 1),
(63, 9, 3, 'move', 708, 162, 202, 230, 0, 0, 0, 1),
(64, 1, 4, 'turn', 0, -48, 424, -30, 30, 97, 1, 1),
(65, 1, 4, 'move', 97, 32, 370, 0, 0, 0, 1, 1),
(66, 1, 4, 'turn', 0, 32, 370, -30, 43, 58, 1, 1),
(67, 1, 4, 'move', 58, 57, 318, 0, 0, 0, 1, 1),
(68, 2, 4, 'turn', 0, -146, -162, 21, 21, 67, 1, 1),
(69, 2, 4, 'move', 155, 1, -112, 0, 0, 0, 1, 1),
(70, 3, 4, 'turn', 0, 201, 7, 30, 30, 105, 1, 1),
(71, 3, 4, 'move', 140, 133, -115, 0, 0, 0, 1, 1),
(72, 3, 4, 'turn', 0, 133, -115, -30, 40, 70, 1, 1),
(73, 4, 4, 'turn', 0, 42, -293, 30, 34, 62, 1, 1),
(74, 4, 4, 'move', 185, -143, -290, 0, 0, 0, 1, 1),
(75, 5, 4, 'move', 165, -51, 412, 0, 0, 0, 1, 1),
(76, 6, 4, 'move', 216, 1, -112, 215, 0, 0, 0, 1),
(77, 7, 4, 'move', 216, 1, -112, 215, 0, 0, 0, 1),
(78, 8, 4, 'move', 64, 1, -112, 98, 0, 0, 0, 1),
(79, 9, 4, 'move', 353, 5, -105, 243, 0, 0, 0, 1),
(80, 13, 1, 'deploy', 0, 548, 532, 180, 0, 0, 1, 1),
(81, 12, 1, 'deploy', 0, 533, 7, 180, 0, 0, 1, 1),
(82, 10, 1, 'deploy', 0, -527, 2, 0, 0, 0, 1, 1),
(83, 11, 1, 'deploy', 0, -521, 422, 0, 0, 0, 1, 1),
(84, 10, 1, 'jumpIn', 26, -539, -21, 11, 0, 0, 0, 1),
(85, 11, 1, 'jumpIn', 9, -522, 414, 1, 0, 0, 0, 1),
(86, 12, 1, 'jumpIn', 40, 561, 35, -7, 0, 0, 0, 1),
(87, 13, 1, 'jumpIn', 33, 562, 561, 19, 0, 0, 0, 1),
(88, 13, 1, 'speed', -1, 562, 561, 0, 35, 0, 1, 1),
(89, 13, 1, 'move', 136, 433, 517, 0, 0, 0, 1, 1),
(90, 12, 1, 'speed', -1, 561, 35, 0, 40, 0, 1, 1),
(91, 12, 1, 'move', 154, 408, 54, 0, 0, 0, 1, 1),
(92, 10, 1, 'speed', -1, -539, -21, 0, 35, 0, 1, 1),
(93, 10, 1, 'turn', 0, -539, -21, -6, 6, 18, 1, 1),
(94, 10, 1, 'move', 136, -404, -9, 0, 0, 0, 1, 1),
(95, 11, 1, 'speed', -1, -522, 414, 0, 35, 0, 1, 1),
(96, 11, 1, 'move', 145, -377, 417, 0, 0, 0, 1, 1),
(97, 10, 2, 'move', 136, -269, 3, 0, 0, 0, 1, 1),
(98, 11, 2, 'move', 145, -232, 420, 0, 0, 0, 1, 1),
(99, 13, 2, 'move', 136, 304, 473, 0, 0, 0, 1, 1),
(100, 12, 2, 'turn', 0, 408, 54, 22, 20, 25, 1, 1),
(101, 12, 2, 'move', 154, 259, 14, 0, 0, 0, 1, 1),
(102, 14, 3, 'deploy', 0, 262, 469, -174, 1, 0, 1, 1),
(103, 10, 3, 'move', 136, -134, 15, 0, 0, 0, 1, 1),
(104, 11, 3, 'turn', 0, -232, 420, -30, 27, 55, 1, 1),
(105, 11, 3, 'move', 145, -105, 350, 0, 0, 0, 1, 1),
(106, 13, 3, 'move', 136, 175, 429, 0, 0, 0, 1, 1),
(107, 12, 3, 'turn', 0, 259, 14, -30, 27, 35, 1, 1),
(108, 12, 3, 'move', 154, 110, 54, 0, 0, 0, 1, 1),
(109, 14, 3, 'move', 386, 180, 442, 198, 0, 0, 0, 1),
(110, 16, 1, 'deploy', 0, 539, 237, 180, 0, 0, 1, 1),
(111, 15, 1, 'deploy', 0, -535, 277, 0, 0, 0, 1, 1),
(112, 15, 1, 'jumpIn', 27, -529, 303, 17, 0, 0, 0, 1),
(113, 16, 1, 'jumpIn', 18, 523, 244, 6, 0, 0, 0, 1),
(114, 15, 1, 'turn', 0, -529, 303, -21, 21, 73, 1, 1),
(115, 15, 1, 'move', 140, -389, 293, 0, 0, 0, 1, 1),
(116, 16, 1, 'turn', 0, 523, 244, -9, 9, 28, 1, 1),
(117, 16, 1, 'move', 155, 368, 252, 0, 0, 0, 1, 1);

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
(71, 36, 1, 2, 14, 1, 4, 29, 'Particle', 38, 0, 0, 21, 0, 17, 21, 0, 'p;', 0),
(72, 39, 1, 2, 6, 1, 4, 22, 'Particle', 39, 0, 0, 23, 0, 16, 23, 0, 'p;', 0),
(73, 41, 1, 2, 22, 1, 4, 67, 'Particle', 40, 0, 0, 20, 0, 20, 20, 0, 'p;', 0),
(74, 44, 1, 2, 22, 1, 4, 63, 'Particle', 39, 0, 0, 19, 0, 20, 19, 0, 'p;', 0),
(75, 47, 1, 2, 14, 1, 4, 34, 'Particle', 36, 0, 0, 21, 0, 15, 21, 0, 'p;', 0),
(76, 52, 1, 2, 22, 1, 4, 41, 'Particle', 43, 0, 0, 19, 0, 24, 19, 0, 'p;', 0),
(77, 43, 1, 2, 22, 4, 4, 93, 'Particle', 43, 0, 23, 20, 0, 0, 20, 0, 'p;', 0),
(78, 51, 1, 2, 6, 7, 4, 22, 'Particle', 36, 0, 23, 13, 0, 0, 13, 0, 'p;', 0),
(79, 53, 1, 2, 6, 7, 4, 61, 'Particle', 37, 0, 24, 13, 0, 0, 13, 0, 'p;', 0),
(80, 38, 1, 2, 6, 8, 4, 21, 'Particle', 39, 0, 25, 14, 0, 0, 14, 0, 'p;', 0),
(81, 42, 1, 2, 6, 11, 4, 57, 'Particle', 38, 0, 25, 13, 0, 0, 13, 0, 'p;', 0),
(82, 40, 1, 2, 6, 13, 4, 63, 'Particle', 36, 0, 24, 10, 0, 2, 10, 1, 'p;', 0),
(83, 45, 1, 2, 14, 21, 4, 85, 'Particle', 36, 0, 24, 9, 0, 3, 9, 1, 'p;o3;', 0),
(84, 56, 1, 7, 0, 3, 4, 12, 'Particle', 30, 0, 0, 0, 25, 0, 5, 0, '', 0),
(85, 56, 1, 7, 0, 9, 4, 21, 'Particle', 82, 0, 0, 0, 77, 0, 5, 0, '', 0),
(86, 55, 1, 7, 0, 11, 4, 7, 'Particle', 64, 0, 0, 0, 59, 0, 5, 0, '', 0),
(140, 60, 2, 10, 10, 1, 2, 62, 'Laser', 204, 0, 0, 18, 0, 33, 18, 0, 'p;', 0),
(141, 60, 2, 10, 10, 1, 2, 62, 'Laser', 204, 0, 0, 18, 0, 33, 18, 0, 'p;', 0),
(142, 60, 2, 10, 10, 1, 2, 62, 'Laser', 204, 0, 0, 17, 0, 34, 17, 0, 'p;', 0),
(143, 60, 2, 10, 10, 1, 2, 62, 'Laser', 204, 0, 0, 17, 0, 34, 17, 0, 'p;', 0),
(144, 61, 2, 10, 10, 1, 2, 82, 'Laser', 229, 0, 0, 16, 0, 41, 16, 0, 'p;', 0),
(145, 61, 2, 10, 10, 4, 2, 82, 'Laser', 229, 0, 25, 16, 0, 16, 16, 0, 'p;c;', 0),
(146, 61, 2, 10, 10, 11, 2, 82, 'Laser', 229, 0, 24, 7, 0, 26, 7, 1, 'p;', 0),
(147, 61, 2, 10, 10, 15, 2, 82, 'Laser', 229, 0, 42, 10, 0, 5, 10, 1, 'p;', 0),
(148, 62, 2, 13, 6, 7, 2, 13, 'Particle', 17, 0, 0, 17, 0, 0, 17, 0, 'b;', 0),
(149, 62, 2, 13, 6, 8, 2, 13, 'Particle', 17, 0, 13, 12, 0, 0, 4, 0, 'p;', 0),
(150, 62, 2, 13, 6, 9, 2, 13, 'Particle', 17, 0, 1, 24, 0, 0, 16, 0, 'p;', 0),
(153, 64, 2, 12, 8, 3, 3, 71, 'Particle', 69, 0, 0, 48, 0, 55, 14, 0, 'p;', 0),
(154, 64, 2, 12, 8, 8, 3, 71, 'Particle', 69, 0, 0, 48, 0, 55, 14, 0, 'p;', 0),
(173, 71, 3, 15, 6, 7, 1, 9, 'Particle', 48, 0, 28, 10, 0, 0, 10, 1, 'p;', 0),
(174, 71, 3, 15, 6, 8, 1, 9, 'Particle', 48, 0, 35, 13, 0, 0, 13, 0, 'p;', 0),
(175, 71, 3, 15, 6, 9, 1, 9, 'Particle', 48, 0, 35, 13, 0, 0, 13, 0, 'p;', 0),
(176, 71, 3, 15, 6, 10, 1, 9, 'Particle', 48, 0, 28, 9, 0, 0, 9, 1, 'p;o2;', 0),
(177, 65, 3, 16, 6, 1, 1, 73, 'Particle', 56, 0, 0, 23, 0, 33, 23, 0, 'p;', 0),
(178, 66, 3, 16, 6, 1, 1, 72, 'Particle', 54, 0, 0, 22, 0, 32, 22, 0, 'p;', 0),
(179, 66, 3, 16, 6, 1, 1, 30, 'Particle', 64, 0, 0, 22, 0, 42, 22, 0, 'p;', 0),
(180, 70, 3, 16, 6, 1, 1, 11, 'Particle', 57, 0, 0, 20, 0, 37, 20, 0, 'p;', 0),
(181, 70, 3, 16, 6, 8, 1, 33, 'Particle', 57, 0, 45, 12, 0, 0, 12, 0, 'p;', 0),
(182, 67, 3, 16, 6, 9, 1, 24, 'Particle', 53, 0, 40, 13, 0, 0, 13, 0, 'p;', 0),
(183, 68, 3, 16, 6, 9, 1, 7, 'Particle', 53, 0, 8, 13, 0, 32, 13, 1, 'p;o4;', 0),
(184, 67, 3, 16, 6, 10, 1, 72, 'Particle', 60, 0, 47, 13, 0, 0, 13, 0, 'p;', 0),
(185, 69, 3, 16, 6, 10, 1, 98, 'Particle', 60, 0, 1, 12, 0, 47, 12, 1, 'p;o4;', 0),
(186, 65, 3, 16, 6, 11, 1, 11, 'Particle', 56, 0, 42, 14, 0, 0, 14, 0, 'p;', 0),
(187, 69, 3, 16, 6, 11, 1, 12, 'Particle', 57, 0, 6, 12, 0, 39, 12, 1, 'p;', 0),
(188, 68, 3, 16, 6, 12, 1, 20, 'Particle', 59, 0, 24, 9, 0, 26, 9, 1, 'p;o3;', 0);

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
(1, 1, 1, 1, 3, 454, 118, 7, 0, 0, '', 0, 0),
(2, 1, 1, 1, 3, 454, 118, 15, 0, 0, '', 0, 0),
(3, 1, 1, 2, 3, 442, 126, 7, 0, 0, '', 0, 0),
(4, 1, 1, 2, 3, 442, 126, 15, 0, 0, '', 0, 0),
(5, 1, 1, 3, 2, -419, -5, 23, 0, 0, '', 0, 0),
(6, 1, 1, 3, 2, -419, -5, 25, 0, 0, '', 0, 0),
(7, 1, 2, 3, 0, NULL, NULL, 16, 0, 0, '', 0, 0),
(8, 1, 2, 3, 0, NULL, NULL, 26, 0, 0, '', 0, 0),
(9, 1, 2, 4, 2, -419, -6, 8, 0, 0, '', 0, 0),
(10, 1, 2, 5, 2, -423, -21, 8, 0, 0, '', 0, 0),
(11, 1, 2, 3, 2, -273, -58, 8, 0, 0, '', 0, 0),
(12, 1, 2, 3, 2, -273, -58, 9, 0, 0, '', 0, 0),
(13, 1, 2, 3, 2, -273, -58, 12, 0, 0, '', 0, 0),
(14, 1, 2, 3, 2, -273, -58, 14, 0, 0, '', 0, 0),
(15, 1, 2, 5, 1, -220, 414, 11, 0, 0, '', 0, 0),
(16, 1, 2, 5, 1, -220, 414, 14, 0, 0, '', 0, 0),
(17, 1, 2, 1, 3, 317, 42, 8, 0, 0, '', 0, 0),
(18, 1, 2, 1, 3, 317, 42, 9, 0, 0, '', 0, 0),
(19, 1, 2, 1, 3, 317, 42, 10, 0, 0, '', 0, 0),
(20, 1, 2, 1, 3, 317, 42, 11, 0, 0, '', 0, 0),
(21, 1, 2, 2, 4, 223, -289, 8, 0, 0, '', 0, 0),
(22, 1, 2, 2, 4, 223, -289, 9, 0, 0, '', 0, 0),
(23, 1, 2, 2, 4, 223, -289, 10, 0, 0, '', 0, 0),
(24, 1, 2, 2, 4, 223, -289, 11, 0, 0, '', 0, 0),
(25, 1, 3, 3, 2, -146, -162, 23, 0, 0, '', 0, 0),
(26, 1, 3, 3, 2, -146, -162, 25, 0, 0, '', 0, 0),
(27, 1, 3, 5, 1, -28, 444, 7, 0, 0, '', 0, 0),
(28, 1, 3, 5, 1, -28, 444, 9, 0, 0, '', 0, 0),
(29, 1, 3, 1, 5, 82, 499, 16, 0, 0, '', 0, 0),
(30, 1, 3, 1, 5, 82, 499, 17, 0, 0, '', 0, 0),
(31, 1, 3, 1, 5, 82, 499, 18, 0, 0, '', 0, 0),
(32, 1, 3, 1, 5, 82, 499, 19, 0, 0, '', 0, 0),
(33, 1, 3, 2, 3, 224, 21, 17, 0, 0, '', 0, 0),
(34, 1, 3, 2, 3, 224, 21, 18, 0, 0, '', 0, 0),
(35, 1, 3, 2, 3, 224, 21, 19, 0, 0, '', 0, 0),
(36, 1, 4, 6, 2, 0, 0, 2, 1, 90, '29;', 1, 1),
(37, 1, 4, 6, 2, 0, 0, 4, 1, 94, '97;', 0, 1),
(38, 1, 4, 6, 2, 0, 0, 6, 1, 94, '21;', 1, 1),
(39, 1, 4, 6, 2, 0, 0, 8, 1, 88, '22;', 1, 1),
(40, 1, 4, 6, 2, 0, 0, 10, 1, 88, '63;', 1, 1),
(41, 1, 4, 6, 2, 0, 0, 12, 1, 97, '67;', 1, 1),
(42, 1, 4, 6, 2, 0, 0, 14, 1, 90, '57;', 1, 1),
(43, 1, 4, 6, 2, 0, 0, 16, 1, 96, '93;', 1, 1),
(44, 1, 4, 6, 2, 0, 0, 18, 1, 93, '63;', 1, 1),
(45, 1, 4, 7, 2, 0, 0, 2, 1, 92, '85;', 1, 1),
(46, 1, 4, 7, 2, 0, 0, 4, 1, 0, '', 0, 1),
(47, 1, 4, 7, 2, 0, 0, 6, 1, 92, '34;', 1, 1),
(48, 1, 4, 7, 2, 0, 0, 8, 1, 96, '100;', 0, 1),
(49, 1, 4, 7, 2, 0, 0, 10, 1, 0, '', 0, 1),
(50, 1, 4, 7, 2, 0, 0, 12, 1, 0, '', 0, 1),
(51, 1, 4, 7, 2, 0, 0, 14, 1, 94, '22;', 1, 1),
(52, 1, 4, 7, 2, 0, 0, 16, 1, 96, '41;', 1, 1),
(53, 1, 4, 7, 2, 0, 0, 18, 1, 92, '61;', 1, 1),
(54, 1, 4, 2, 7, 0, 0, 12, 3, 46, '74;76;87;', 0, 1),
(55, 1, 4, 2, 7, 0, 0, 13, 3, 46, '7;88;78;', 1, 1),
(56, 1, 4, 2, 7, 0, 0, 20, 3, 46, '12;62;21;', 2, 1),
(57, 1, 4, 2, 7, 0, 0, 21, 3, 46, '48;52;81;', 0, 1),
(59, 2, 2, 13, 0, -278, 376, 8, 0, 0, '', 0, 1),
(60, 2, 2, 13, 10, -262, 11, 7, 1, 170, '62;', 1, 1),
(61, 2, 2, 13, 10, -262, 11, 9, 1, 170, '82;', 1, 1),
(62, 2, 2, 11, 13, 305, 472, 8, 1, 130, '13;', 4, 1),
(63, 2, 3, 13, 0, NULL, NULL, 19, 0, 0, '', 0, 1),
(64, 2, 3, 11, 12, 98, 57, 8, 1, 124, '71;', 3, 1),
(65, 3, 1, 15, 16, 360, 247, 8, 2, 224, '73;11;', 2, 1),
(66, 3, 1, 15, 16, 360, 247, 9, 2, 224, '72;30;', 2, 1),
(67, 3, 1, 15, 16, 360, 247, 12, 2, 224, '72;24;', 2, 1),
(68, 3, 1, 15, 16, 360, 247, 14, 2, 224, '7;20;', 2, 1),
(69, 3, 1, 15, 16, 360, 247, 23, 2, 224, '12;98;', 2, 1),
(70, 3, 1, 15, 16, 360, 247, 25, 2, 224, '33;11;', 2, 1),
(71, 3, 1, 16, 15, -382, 289, 15, 1, 120, '9;', 5, 1);

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
(1, 'myGame', 'active', 4, 3, 3000, 1500, 11),
(2, 'myGame', 'active', 3, 3, 3000, 1500, 11),
(3, 'myGame', 'active', 1, 3, 3000, 1500, 11);

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
(3, 4, 8, 'Javelin', 3),
(4, 5, 8, 'Javelin', 3),
(6, 15, 16, 'Sentri', 9);

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
(1, 6, '2', 2, 2, 1, -112, 4),
(2, 7, '2', 2, 2, 1, -112, 4),
(3, 8, '2', 2, 2, 1, -112, 4),
(4, 9, '2', 2, 2, 1, -112, 0),
(5, 14, '2', 3, 11, -105, 350, 0);

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
(1, 1, 1, 4, 3, 'Minbari Federation', 300, 'waiting'),
(2, 2, 1, 4, 3, 'Centauri Republic', 492, 'waiting'),
(3, 1, 2, 3, 3, 'Narn Regime', 1620, 'waiting'),
(4, 2, 2, 3, 3, 'Narn Regime', 1060, 'waiting'),
(5, 1, 3, 1, 3, 'Centauri Republic', 1686, 'waiting'),
(6, 2, 3, 1, 3, 'Minbari Federation', 1650, 'waiting');

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
(1, 3, 7, 2, '0', 0),
(2, 3, 10, 2, '0', 0),
(3, 3, 13, 2, '0', 0),
(4, 3, 15, 2, '0', 0),
(5, 3, 22, 2, '0', 0),
(6, 3, 23, 2, '1', 4),
(7, 3, 24, 2, '0', 0),
(8, 3, 25, 2, '1', 4),
(9, 3, 4, 2, '1', 3),
(10, 4, 8, 2, '1', 0),
(11, 4, 8, 2, '1', 0),
(12, 4, 8, 2, '1', 0),
(13, 5, 8, 2, '1', 0),
(14, 5, 8, 2, '1', 0),
(15, 5, 8, 2, '1', 0),
(16, 3, 13, 3, '0', 0),
(17, 3, 15, 3, '0', 0),
(18, 3, 22, 3, '0', 0),
(19, 3, 23, 3, '1', 4),
(20, 3, 24, 3, '0', 0),
(21, 3, 25, 3, '1', 4),
(22, 4, 9, 3, '1', 3),
(23, 5, 7, 3, '1', 3),
(24, 5, 9, 3, '1', 3),
(25, 5, 11, 3, '0', 0),
(26, 5, 14, 3, '0', 0),
(27, 2, 4, 3, '1', 3),
(28, 3, 13, 4, '0', 0),
(29, 3, 15, 4, '0', 0),
(30, 3, 22, 4, '0', 0),
(31, 3, 24, 4, '0', 0),
(32, 5, 11, 4, '0', 0),
(33, 5, 14, 4, '0', 0),
(34, 13, 11, 1, '0', 0),
(35, 13, 12, 1, '0', 0),
(36, 13, 18, 1, '0', 0),
(37, 13, 20, 1, '0', 0),
(38, 13, 22, 1, '0', 0),
(39, 13, 23, 1, '0', 0),
(40, 10, 11, 1, '0', 0),
(41, 10, 12, 1, '0', 0),
(42, 10, 18, 1, '0', 0),
(43, 10, 20, 1, '0', 0),
(44, 10, 22, 1, '0', 0),
(45, 10, 23, 1, '0', 0),
(46, 13, 11, 2, '0', 0),
(47, 13, 12, 2, '0', 0),
(48, 13, 18, 2, '0', 0),
(49, 13, 20, 2, '0', 0),
(50, 13, 22, 2, '0', 0),
(51, 13, 23, 2, '0', 0),
(52, 10, 11, 2, '0', 0),
(53, 10, 12, 2, '0', 0),
(54, 10, 18, 2, '0', 0),
(55, 10, 20, 2, '0', 0),
(56, 10, 22, 2, '0', 0),
(57, 10, 23, 2, '0', 0),
(58, 13, 11, 3, '0', 0),
(59, 13, 12, 3, '0', 0),
(60, 13, 18, 3, '0', 0),
(61, 13, 20, 3, '0', 0),
(62, 13, 22, 3, '0', 0),
(63, 13, 23, 3, '0', 0),
(64, 10, 12, 3, '0', 0),
(65, 10, 18, 3, '0', 0),
(66, 10, 20, 3, '0', 0),
(67, 10, 22, 3, '0', 0),
(68, 10, 23, 3, '0', 0);

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
(1, 3, 4, 1, '-1.00', 124, 0),
(2, 4, 4, 1, '-1.00', 102, 0),
(3, 5, 4, 1, '-1.00', 102, 0),
(4, 1, 4, 1, '-1.00', 132, 0),
(5, 2, 4, 1, '-1.00', 132, 0),
(6, 1, 4, 2, '359.98', 705, 0),
(7, 2, 4, 2, '0.23', 672, 0),
(8, 3, 4, 2, '11.50', 760, 1),
(9, 4, 4, 2, '0.05', 514, 1),
(10, 5, 4, 2, '359.80', 495, 1),
(11, 3, 4, 3, '338.24', 503, 0),
(12, 4, 4, 3, '0.07', 370, 1),
(13, 5, 4, 3, '358.49', 291, 1),
(14, 1, 4, 3, '15.97', 321, 1),
(15, 2, 4, 3, '4.28', 320, 1),
(16, 3, 4, 4, '-1.00', 124, 0),
(17, 4, 4, 4, '-1.00', 102, 0),
(18, 5, 4, 4, '-1.00', 102, 0),
(19, 1, 4, 4, '-1.00', 132, 0),
(20, 2, 4, 4, '-1.00', 132, 0),
(21, 13, 4, 1, '-1.00', 113, 0),
(22, 12, 1, 1, '-1.00', 81, 0),
(23, 10, 4, 1, '-1.00', 113, 0),
(24, 11, 4, 1, '-1.00', 102, 0),
(25, 13, 4, 2, '-1.00', 113, 0),
(26, 12, 1, 2, '-1.00', 81, 0),
(27, 10, 4, 2, '-1.00', 113, 0),
(28, 11, 4, 2, '-1.00', 102, 0),
(29, 13, 4, 3, '-1.00', 113, 0),
(30, 12, 1, 3, '-1.00', 81, 0),
(31, 10, 4, 3, '-1.00', 100, 0),
(32, 11, 4, 3, '-1.00', 102, 0),
(33, 16, 4, 1, '-1.00', 132, 0),
(34, 15, 4, 1, '0.18', 945, 0);

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
(1, 6, 9, 'SitaraParticle'),
(2, 7, 9, 'SitaraParticle'),
(3, 8, 3, 'Javelin'),
(4, 9, 3, 'Javelin'),
(5, 12, 1, 'Mograth'),
(6, 12, 1, 'Mograth'),
(7, 14, 10, 'Frazi');

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
(34, 2, 5, 4, 'Output', 0, '2.70'),
(35, 2, 7, 4, 'Disabled', 1, '0.00'),
(36, 2, 7, 4, 'Damage', 0, '20.00'),
(37, 2, 7, 4, 'Accuracy', 0, '30.00'),
(38, 2, 8, 4, 'Damage', 0, '20.00'),
(39, 2, 8, 4, 'Accuracy', 0, '30.00'),
(40, 2, 11, 4, 'Damage', 0, '20.00'),
(41, 7, 3, 4, 'Disabled', 0, '0.00'),
(42, 7, 9, 4, 'Disabled', 0, '0.00'),
(43, 7, 11, 4, 'Disabled', 0, '0.00'),
(57, 10, 4, 2, 'Output', 0, '12.00'),
(64, 15, 5, 1, 'Output', 0, '1.87'),
(65, 15, 8, 1, 'Accuracy', 0, '30.00'),
(66, 15, 9, 1, 'Damage', 0, '20.00'),
(67, 15, 9, 1, 'Accuracy', 0, '30.00'),
(68, 16, 5, 1, 'Output', 0, '9.24'),
(69, 16, 8, 1, 'Disabled', 1, '0.00'),
(70, 16, 8, 1, 'Damage', 0, '20.00');

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
(1, 1, 1, 1, 0, 'Tigara', '', 'bought', 1, 0, -48, 424, 356, 0, 155, 0, 0, 3, 3, ''),
(2, 1, 1, 1, 0, 'Tigara', '', 'bought', 1, 0, -146, -162, 358, 0, 155, 0, 0, 3, 3, ''),
(3, 1, 2, 1, 0, 'Primus', '', 'bought', 1, 0, 201, 7, 211, 0, 140, 0, 0, 3, 3, ''),
(4, 1, 2, 1, 0, 'Demos', '', 'bought', 1, 0, 42, -293, 149, 0, 185, 0, 0, 3, 3, ''),
(5, 1, 2, 1, 0, 'Demos', '', 'bought', 1, 0, 86, 504, 214, 0, 165, 0, 0, 3, 3, ''),
(6, 1, 2, 0, 0, 'Flight', 'Wyvern-Sigma', 'deployed', 2, 0, 177, 13, 208, 0, 258, NULL, NULL, 3, 3, ''),
(7, 1, 2, 0, 0, 'Flight', 'Blue-Sigma', 'deployed', 2, 0, 177, 13, 208, 0, 258, NULL, NULL, 3, 3, ''),
(10, 2, 1, 1, 0, 'GQuan', '', 'bought', 1, 0, -269, 3, 5, 0, 136, 0, 0, 2, 3, ''),
(11, 2, 1, 1, 0, 'KaToc', '', 'bought', 1, 0, -232, 420, 1, 0, 145, 0, 0, 2, 3, ''),
(12, 2, 2, 1, 0, 'Squadron', '', 'bought', 1, 0, 259, 14, 195, 0, 154, 0, 0, 2, 3, ''),
(13, 2, 2, 1, 0, 'GQuan', '', 'bought', 1, 0, 304, 473, 199, 0, 136, 0, 0, 2, 3, ''),
(14, 2, 2, 0, 0, 'Flight', 'Green-Alpha', 'deployed', 3, 0, 262, 469, 0, 0, 0, NULL, NULL, 3, -1, ''),
(15, 3, 1, 1, 0, 'Primus', '', 'bought', 1, 0, -529, 303, 0, 0, 140, 0, 0, 1, -1, ''),
(16, 3, 2, 1, 0, 'Tigara', '', 'bought', 1, 0, 523, 244, 0, 0, 155, 0, 0, 1, -1, '');

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
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=118;
--
-- AUTO_INCREMENT für Tabelle `chat`
--
ALTER TABLE `chat`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `damages`
--
ALTER TABLE `damages`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=189;
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
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;
--
-- AUTO_INCREMENT für Tabelle `games`
--
ALTER TABLE `games`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT für Tabelle `loads`
--
ALTER TABLE `loads`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT für Tabelle `missions`
--
ALTER TABLE `missions`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT für Tabelle `playerstatus`
--
ALTER TABLE `playerstatus`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT für Tabelle `powers`
--
ALTER TABLE `powers`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;
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
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT für Tabelle `systemcrits`
--
ALTER TABLE `systemcrits`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;
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

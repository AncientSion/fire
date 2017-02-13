-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 12. Feb 2017 um 20:08
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
(1, 3, 1, 'deploy', 0, 964, 166, 180, 0, 0, 1, 1),
(2, 4, 1, 'deploy', 0, 956, 415, 180, 0, 0, 1, 1),
(3, 1, 1, 'deploy', 0, 329, 257, 0, 0, 0, 1, 1),
(4, 2, 1, 'deploy', 0, 395, 96, 0, 0, 0, 1, 1),
(5, 1, 1, 'speedChange', -1, 329, 257, 0, 117, 0, 1, 1),
(6, 1, 1, 'move', 150, 479, 257, 0, 0, 0, 1, 1),
(7, 2, 1, 'speedChange', -1, 395, 96, 0, 333, 0, 1, 1),
(8, 2, 1, 'move', 130, 525, 96, 0, 0, 0, 1, 1),
(9, 3, 1, 'speedChange', -1, 964, 166, 0, 265, 0, 1, 1),
(10, 3, 1, 'move', 130, 834, 166, 0, 0, 0, 1, 1),
(11, 4, 1, 'speedChange', -1, 956, 415, 0, 36, 0, 1, 1),
(12, 4, 1, 'move', 150, 806, 415, 0, 0, 0, 1, 1),
(13, 5, 2, 'deploy', 0, 581, 98, 2, 0, 0, 1, 1),
(14, 6, 2, 'deploy', 0, 801, 227, 118, 0, 0, 1, 1),
(15, 8, 2, 'launch', 0, 823, 421, 0, 0, 0, 0, 1),
(16, 9, 2, 'launch', 0, 508, 272, 0, 0, 0, 0, 1),
(17, 10, 2, 'launch', 0, 496, 261, 0, 0, 0, 0, 1),
(18, 3, 2, 'turn', 0, 834, 166, 30, 221, 161, 1, 1),
(19, 3, 2, 'move', 130, 721, 101, 0, 0, 0, 1, 1),
(20, 4, 2, 'move', 150, 656, 415, 0, 0, 0, 1, 1),
(21, 1, 2, 'turn', 0, 479, 257, 30, 81, 114, 1, 1),
(22, 1, 2, 'move', 114, 578, 314, 0, 0, 0, 1, 1),
(23, 1, 2, 'turn', 0, 578, 314, 30, 81, 114, 1, 1),
(24, 1, 2, 'move', 36, 596, 345, 0, 0, 0, 1, 1),
(25, 2, 2, 'turn', 0, 525, 96, 30, 294, 178, 1, 1),
(26, 2, 2, 'move', 130, 638, 161, 0, 0, 0, 1, 1),
(27, 12, 1, 'deploy', 0, 1521, 308, 180, 0, 0, 1, 1),
(28, 11, 1, 'deploy', 0, 377, 211, 0, 0, 0, 1, 1),
(29, 5, 2, 'speedChange', -1, 581, 98, 0, 19, 0, 1, 1),
(30, 5, 2, 'turn', 0, 581, 98, 30, 18, 36, 1, 1),
(31, 5, 2, 'turn', 0, 581, 98, 30, 18, 36, 1, 1),
(32, 5, 2, 'move', 235, 691, 305, 0, 0, 0, 1, 1),
(33, 5, 2, 'turn', 0, 691, 305, 30, 18, 36, 1, 1),
(34, 6, 2, 'turn', 0, 801, 227, 30, 16, 32, 1, 1),
(35, 6, 2, 'move', 32, 774, 244, 0, 0, 0, 1, 1),
(36, 6, 2, 'turn', 0, 774, 244, 30, 16, 32, 1, 1),
(37, 6, 2, 'move', 32, 742, 245, 0, 0, 0, 1, 1),
(38, 6, 2, 'turn', 0, 742, 245, 30, 16, 32, 1, 1),
(39, 6, 2, 'move', 104, 643, 211, 0, 0, 0, 1, 1),
(40, 6, 2, 'turn', 0, 643, 211, -30, 16, 32, 1, 1),
(41, 6, 2, 'move', 32, 611, 212, 0, 0, 0, 1, 1),
(42, 6, 2, 'turn', 0, 611, 212, -30, 16, 32, 1, 1),
(43, 6, 2, 'move', 50, 569, 238, 0, 0, 0, 1, 1),
(44, 8, 2, 'move', 0, 725, 276, 0, 0, 0, 0, 1),
(45, 9, 2, 'impact', 0, 720, 100, 0, 0, 0, 0, 1),
(46, 10, 2, 'impact', 0, 661, 421, 0, 0, 0, 0, 1),
(47, 15, 3, 'launch', 0, 627, 379, 0, 0, 0, 0, 1),
(48, 16, 3, 'launch', 0, 614, 370, 0, 0, 0, 0, 1),
(49, 17, 3, 'launch', 0, 607, 344, 0, 0, 0, 0, 1),
(50, 18, 3, 'launch', 0, 655, 418, 0, 0, 0, 0, 1),
(51, 1, 3, 'move', 78, 635, 413, 0, 0, 0, 1, 1),
(52, 1, 3, 'turn', 0, 635, 413, -30, 81, 114, 1, 1),
(53, 1, 3, 'move', 72, 697, 449, 0, 0, 0, 1, 1),
(54, 2, 3, 'move', 48, 680, 186, 0, 0, 0, 1, 1),
(55, 2, 3, 'turn', 0, 680, 186, 30, 294, 178, 1, 1),
(56, 2, 3, 'move', 82, 721, 257, 0, 0, 0, 1, 1),
(57, 3, 3, 'move', 31, 694, 86, 0, 0, 0, 1, 1),
(58, 3, 3, 'turn', 0, 694, 86, -30, 221, 161, 1, 1),
(59, 3, 3, 'move', 99, 595, 86, 0, 0, 0, 1, 1),
(60, 4, 3, 'turn', 0, 656, 415, -30, 19, 68, 1, 1),
(61, 4, 3, 'move', 68, 597, 449, 0, 0, 0, 1, 1),
(62, 4, 3, 'turn', 0, 597, 449, -30, 19, 68, 1, 1),
(63, 4, 3, 'move', 68, 563, 508, 0, 0, 0, 1, 1),
(64, 4, 3, 'turn', 0, 563, 508, -30, 19, 68, 1, 1),
(65, 4, 3, 'move', 14, 563, 522, 0, 0, 0, 1, 1),
(66, 5, 3, 'speedChange', -1, 691, 305, 0, 12, 0, 1, 1),
(67, 5, 3, 'move', 36, 690, 341, 0, 0, 0, 1, 1),
(68, 5, 3, 'turn', 0, 690, 341, 30, 11, 31, 1, 1),
(69, 5, 3, 'move', 164, 604, 480, 0, 0, 0, 1, 1),
(70, 6, 3, 'speedChange', -1, 569, 238, 0, 11, 0, 1, 1),
(71, 6, 3, 'speedChange', -1, 569, 238, 0, 10, 0, 1, 1),
(72, 6, 3, 'speedChange', -1, 569, 238, 0, 9, 0, 1, 1),
(73, 6, 3, 'speedChange', -1, 569, 238, 0, 8, 0, 1, 1),
(74, 6, 3, 'speedChange', -1, 569, 238, 0, 7, 0, 1, 1),
(75, 6, 3, 'turn', 0, 569, 238, -30, 6, 16, 1, 1),
(76, 6, 3, 'turn', 0, 569, 238, -30, 6, 16, 1, 1),
(77, 6, 3, 'move', 32, 570, 270, 0, 0, 0, 1, 1),
(78, 6, 3, 'turn', 0, 570, 270, -30, 6, 16, 1, 1),
(79, 6, 3, 'move', 93, 619, 349, 0, 0, 0, 1, 1),
(80, 8, 3, 'impact', 0, 721, 252, 0, 0, 0, 0, 1),
(81, 15, 3, 'impact', 0, 562, 518, 0, 0, 0, 0, 1),
(82, 16, 3, 'impact', 0, 557, 523, 0, 0, 0, 0, 1),
(83, 17, 3, 'impact', 0, 613, 356, 0, 0, 0, 0, 1),
(84, 18, 3, 'impact', 0, 703, 447, 0, 0, 0, 0, 1),
(85, 13, 4, 'deploy', 0, 100, 660, -30, 0, 0, 1, 1),
(86, 19, 4, 'deploy', 0, 757, 309, 55, 0, 0, 1, 1),
(87, 20, 4, 'deploy', 0, 569, 40, -120, 0, 0, 1, 1),
(88, 21, 4, 'launch', 0, 697, 472, 0, 0, 0, 0, 1),
(89, 1, 4, 'move', 42, 733, 470, 0, 0, 0, 1, 1),
(90, 1, 4, 'turn', 0, 733, 470, 30, 81, 114, 1, 1),
(91, 1, 4, 'move', 108, 787, 564, 0, 0, 0, 1, 1),
(92, 2, 4, 'move', 96, 769, 340, 0, 0, 0, 1, 1),
(93, 2, 4, 'turn', 0, 769, 340, 30, 294, 178, 1, 1),
(94, 2, 4, 'move', 34, 769, 374, 0, 0, 0, 1, 1),
(95, 13, 4, 'move', 145, 226, 588, 0, 0, 0, 1, 1),
(96, 3, 4, 'move', 62, 533, 86, 0, 0, 0, 1, 1),
(97, 3, 4, 'turn', 0, 533, 86, -30, 221, 161, 1, 1),
(98, 3, 4, 'move', 68, 474, 120, 0, 0, 0, 1, 1),
(99, 4, 4, 'move', 54, 563, 576, 0, 0, 0, 1, 1),
(100, 4, 4, 'turn', 0, 563, 576, 30, 19, 68, 1, 1),
(101, 4, 4, 'move', 96, 515, 659, 0, 0, 0, 1, 1),
(102, 4, 4, 'turn', 0, 515, 659, 30, 19, 68, 1, 1),
(103, 6, 4, 'move', 125, 686, 455, 0, 0, 0, 1, 1),
(104, 20, 4, 'turn', 0, 569, 40, -30, 11, 32, 1, 1),
(105, 20, 4, 'turn', 0, 569, 40, -30, 11, 32, 1, 1),
(106, 20, 4, 'move', 64, 505, 40, 0, 0, 0, 1, 1),
(107, 20, 4, 'turn', 0, 505, 40, -30, 11, 32, 1, 1),
(108, 20, 4, 'move', 32, 477, 56, 0, 0, 0, 1, 1),
(109, 20, 4, 'turn', 0, 477, 56, -30, 11, 32, 1, 1),
(110, 20, 4, 'move', 32, 461, 84, 0, 0, 0, 1, 1),
(111, 20, 4, 'turn', 0, 461, 84, -30, 11, 32, 1, 1),
(112, 20, 4, 'move', 32, 461, 116, 0, 0, 0, 1, 1),
(113, 20, 4, 'turn', 0, 461, 116, -30, 11, 32, 1, 1),
(114, 20, 4, 'move', 90, 506, 194, 0, 0, 0, 1, 1),
(115, 5, 4, 'speedChange', -1, 604, 480, 0, 11, 0, 1, 1),
(116, 5, 4, 'move', 175, 529, 638, 0, 0, 0, 1, 1),
(117, 19, 4, 'speedChange', -1, 757, 309, 0, 14, 0, 1, 1),
(118, 19, 4, 'speedChange', -1, 757, 309, 0, 13, 0, 1, 1),
(119, 19, 4, 'speedChange', -1, 757, 309, 0, 12, 0, 1, 1),
(120, 19, 4, 'speedChange', -1, 757, 309, 0, 10, 0, 1, 1),
(121, 19, 4, 'turn', 0, 757, 309, 30, 9, 26, 1, 1),
(122, 19, 4, 'turn', 0, 757, 309, 30, 9, 26, 1, 1),
(123, 19, 4, 'move', 150, 694, 445, 0, 0, 0, 1, 1);

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
(21, 5, 1, 1, 1, -1, 1, 3, 'Particle', 76, 0, 46, 30, '0', 30, 0, '', 0),
(22, 3, 1, 2, 1, 6, 1, 18, 'Particle', 82, 0, 42, 40, '0', 40, 0, '', 0),
(23, 3, 1, 2, 1, 4, 1, 36, 'Particle', 89, 0, 50, 39, '0', 39, 0, '', 0),
(24, 4, 1, 2, 1, -1, 1, 32, 'Particle', 80, 0, 38, 42, '0', 42, 0, '', 0),
(25, 4, 1, 2, 1, 26, 1, 10, 'Particle', 91, 0, 50, 41, '0', 40, 0, '', 0),
(26, 1, 1, 3, 1, -1, 1, 2, 'Laser', 214, 0, 36, 35, '0', 35, 0, '', 0),
(27, 1, 1, 3, 1, 2, 1, 2, 'Laser', 214, 0, 47, 24, '0', 24, 0, '', 0),
(28, 1, 1, 3, 1, -1, 1, 2, 'Laser', 214, 0, 37, 34, '0', 33, 0, '', 0),
(29, 58, 1, 1, 1, 16, 2, 5, 'Particle', 46, 0, 17, 29, '0', 29, 0, '', 0),
(30, 58, 1, 1, 1, -1, 2, 3, 'Particle', 41, 0, 13, 28, '0', 27, 0, '', 0),
(31, 56, 1, 1, 1, 3, 2, 18, 'Particle', 45, 0, 37, 8, '0', 8, 0, '', 0),
(32, 55, 1, 1, 1, 4, 2, 83, 'Particle', 72, 0, 64, 8, '0', 8, 0, '', 0),
(33, 55, 1, 1, 1, -1, 2, 84, 'Particle', 82, 0, 56, 26, '0', 25, 0, '', 0),
(34, 54, 1, 1, 1, -1, 2, 65, 'Particle', 67, 0, 42, 25, '0', 24, 0, '', 0),
(35, 54, 1, 1, 1, -1, 2, 79, 'Particle', 87, 0, 64, 23, '0', 23, 0, '', 0),
(36, 51, 1, 2, 18, 22, 2, 7, 'Particle', 20, 0, 1, 19, '0', 19, 0, '', 0),
(37, 49, 1, 2, 18, 23, 2, 53, 'Particle', 45, 0, 26, 19, '0', 19, 0, '', 0),
(38, 49, 1, 2, 18, -1, 2, 65, 'Particle', 40, 0, 2, 38, '0', 37, 0, '', 0),
(39, 53, 1, 2, 18, 28, 2, 16, 'Particle', 19, 0, 0, 19, '0', 36, 0, '', 0),
(40, 53, 1, 2, 18, 27, 2, 16, 'Particle', 23, 0, 0, 23, '0', 36, 0, '', 0),
(41, 52, 1, 2, 18, -1, 2, 64, 'Particle', 20, 0, 0, 20, '0', 36, 0, '', 0),
(42, 52, 1, 2, 18, -1, 2, 1, 'Particle', 24, 0, 0, 24, '0', 35, 0, '', 0),
(43, 48, 1, 2, 18, 23, 2, 45, 'Particle', 48, 0, 30, 18, '0', 17, 1, '', 0),
(44, 48, 1, 2, 18, 22, 2, 8, 'Particle', 47, 0, 29, 18, '0', 17, 1, '', 0),
(45, 50, 1, 2, 18, -1, 2, 81, 'Particle', 38, 0, 4, 34, '0', 34, 0, '', 0),
(46, 50, 1, 2, 18, 19, 2, 87, 'Particle', 34, 0, 17, 17, '0', 17, 0, '', 0),
(47, 37, 1, 3, 15, 24, 2, 50, 'Particle', 32, 0, 0, 32, '0', 33, 0, '', 0),
(48, 37, 1, 3, 15, -1, 2, 73, 'Particle', 28, 0, 0, 28, '0', 32, 0, '', 0),
(49, 38, 1, 3, 15, -1, 2, 33, 'Particle', 26, 0, 0, 26, '0', 32, 0, '', 0),
(50, 38, 1, 3, 15, 25, 2, 27, 'Particle', 27, 0, 0, 27, '0', 31, 0, '', 0),
(51, 39, 1, 3, 15, 16, 2, 38, 'Particle', 25, 0, 9, 16, '0', 15, 0, '', 0),
(52, 39, 1, 3, 15, 16, 2, 57, 'Particle', 25, 0, 10, 15, '0', 15, 0, '', 0),
(53, 40, 1, 3, 15, -1, 2, 37, 'Particle', 26, 0, 0, 26, '0', 30, 0, '', 0),
(54, 40, 1, 3, 15, -1, 2, 62, 'Particle', 32, 0, 3, 29, '0', 29, 0, '', 0),
(55, 41, 1, 3, 15, -1, 2, 59, 'Particle', 27, 0, 0, 27, '0', 28, 0, '', 0),
(56, 41, 1, 3, 15, 17, 2, 9, 'Particle', 28, 0, 14, 14, '0', 14, 0, '', 0),
(57, 41, 1, 3, 15, -1, 2, 20, 'Particle', 25, 0, 0, 25, '0', 27, 0, '', 0),
(58, 27, 1, 4, 1, -1, 2, 22, 'Particle', 26, 0, 0, 26, '0', 26, 0, '', 0),
(59, 27, 1, 4, 1, -1, 2, 6, 'Particle', 27, 0, 2, 25, '0', 24, 0, '', 0),
(60, 28, 1, 4, 1, 3, 2, 21, 'Particle', 33, 0, 16, 17, '0', 16, 0, '', 0),
(61, 32, 1, 6, 7, 7, 2, 9, 'Particle', 34, 0, 27, 7, '0', 7, 0, '', 0),
(62, 30, 1, 6, 1, 1, 2, 2, 'Particle', 28, 0, 21, 7, '0', 7, 0, '', 0),
(63, 66, 1, 3, 15, -1, 2, 21, 'explosive', 48, 0, 21, 27, '0', 27, 0, '', 0),
(64, 67, 1, 3, 15, 19, 2, 39, 'explosive', 60, 0, 46, 14, '0', 13, 0, '', 0),
(65, 69, 1, 4, 1, 3, 2, 8, 'explosive', 49, 0, 33, 16, '0', 15, 0, '', 0),
(66, 70, 1, 4, 1, -1, 2, 63, 'explosive', 55, 0, 33, 22, '0', 21, 0, '', 0),
(67, 71, 1, 4, 1, -1, 2, 30, 'explosive', 46, 0, 26, 20, '0', 20, 0, '', 0),
(68, 72, 1, 4, 1, -1, 2, 26, 'explosive', 45, 0, 26, 19, '0', 19, 0, '', 0),
(69, 77, 1, 2, 13, -1, 3, 75, 'Particle', 40, 0, 6, 34, '0', 34, 0, '', 0),
(70, 78, 1, 2, 13, -1, 3, 39, 'Particle', 44, 0, 10, 34, '0', 33, 0, '', 0),
(71, 78, 1, 2, 13, -1, 3, 77, 'Particle', 35, 0, 2, 33, '0', 32, 0, '', 0),
(72, 79, 1, 2, 13, -1, 3, 49, 'Particle', 36, 0, 4, 32, '0', 31, 0, '', 0),
(73, 79, 1, 2, 13, -1, 3, 71, 'Particle', 44, 0, 13, 31, '0', 30, 0, '', 0),
(74, 81, 1, 2, 13, 14, 3, 5, 'Particle', 21, 0, 6, 15, '0', 15, 0, '', 0),
(75, 82, 1, 5, 7, 7, 3, 3, 'Particle', 21, 0, 14, 7, '0', 7, 0, '', 0),
(76, 94, 1, 6, 5, 5, 3, 7, 'Particle', 26, 0, 19, 7, '0', 7, 0, '', 0),
(77, 91, 1, 18, 3, 3, 3, 23, 'Particle', 26, 0, 18, 8, '0', 8, 1, '', 0),
(78, 90, 1, 18, 0, 0, 3, 22, 'Particle', 33, 0, 25, 8, '0', 8, 1, '', 0),
(79, 100, 1, 4, 8, -1, 3, 2, 'Particle', 15, 0, 0, 30, '0', 24, 0, '', 0),
(80, 98, 1, 4, 8, 9, 3, 18, 'Particle', 14, 0, 6, 22, '0', 11, 0, '', 0),
(81, 97, 1, 4, 8, 10, 3, 21, 'Particle', 14, 0, 6, 22, '0', 10, 0, '', 0),
(82, 103, 1, 2, 1, 3, 3, 9, 'explosive', 65, 0, 29, 36, '0', 35, 0, '', 0),
(83, 104, 1, 2, 1, -1, 3, 70, 'explosive', 73, 0, 34, 39, '0', 38, 0, '', 0),
(84, 105, 1, 2, 1, -1, 3, 61, 'explosive', 82, 0, 44, 38, '0', 37, 0, '', 0),
(85, 106, 1, 4, 8, -1, 3, 62, 'explosive', 57, 0, 38, 19, '0', 19, 0, '', 0),
(86, 107, 1, 4, 8, -1, 3, 21, 'explosive', 57, 0, 39, 18, '0', 17, 0, '', 0),
(87, 108, 1, 4, 8, 10, 3, 70, 'explosive', 50, 0, 42, 8, '0', 8, 1, '', 0),
(88, 109, 1, 4, 8, 16, 3, 20, 'explosive', 56, 0, 40, 16, '0', 15, 1, '', 0),
(89, 110, 1, 6, 1, 1, 3, 49, 'explosive', 60, 0, 53, 7, '0', 7, 1, '', 0),
(90, 111, 1, 6, 9, 9, 3, 33, 'explosive', 47, 0, 40, 7, '0', 7, 1, '', 0),
(91, 112, 1, 1, 8, -1, 3, 42, 'explosive', 66, 0, 41, 25, '0', 25, 0, '', 0),
(92, 113, 1, 1, 8, -1, 3, 62, 'explosive', 66, 0, 42, 24, '0', 24, 0, '', 0);

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
(1, 1, 4, 19, 6);

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
(1, 5, 6, 'Aurora'),
(2, 6, 6, 'Sentri'),
(3, 19, 6, 'Thunderbolt'),
(4, 20, 6, 'Sentri');

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
(1, 1, 1, 2, 3, 5, 1, 86, '2 ', 3, 1),
(2, 1, 1, 2, 4, 6, 1, 29, '99 ', 0, 1),
(3, 1, 1, 3, 2, 2, 2, 93, '', 2, 1),
(4, 1, 1, 3, 2, 3, 2, 93, '', 2, 1),
(5, 1, 1, 3, 1, 4, 2, 53, '', 1, 1),
(6, 1, 1, 3, 1, 5, 2, 53, '', 0, 1),
(27, 1, 2, 1, 4, 2, 3, 27, '0 76 22 6', 2, 1),
(28, 1, 2, 1, 4, 5, 3, 27, '0 56 21 51', 1, 1),
(29, 1, 2, 2, 6, 8, 3, 13, '0 85 50 34', 0, 1),
(30, 1, 2, 2, 6, 9, 3, 13, '0 42 2 86', 1, 1),
(31, 1, 2, 2, 6, 10, 3, 13, '0 33 13 68', 0, 1),
(32, 1, 2, 2, 6, 11, 3, 13, '0 69 20 9', 1, 1),
(33, 1, 2, 2, 6, 12, 3, 13, '0 43 49 23', 0, 1),
(34, 1, 2, 2, 6, 14, 3, 13, '0 32 68 81', 0, 1),
(35, 1, 2, 2, 6, 15, 3, 13, '0 56 65 14', 0, 1),
(36, 1, 2, 2, 6, 16, 3, 13, '0 17 98 30', 0, 1),
(37, 1, 2, 2, 3, 19, 3, 79, '0 50 73 94', 2, 1),
(38, 1, 2, 2, 3, 20, 3, 79, '0 33 99 27', 2, 1),
(39, 1, 2, 2, 3, 21, 3, 79, '0 38 98 57', 2, 1),
(40, 1, 2, 2, 3, 22, 3, 79, '0 88 37 62', 2, 1),
(41, 1, 2, 2, 3, 23, 3, 79, '0 59 9 20', 3, 1),
(42, 1, 2, 5, 4, 2, 1, 18, '0 44', 0, 1),
(43, 1, 2, 5, 4, 4, 1, 18, '0 35', 0, 1),
(44, 1, 2, 5, 4, 6, 1, 18, '0 47', 0, 1),
(45, 1, 2, 5, 4, 8, 1, 18, '0 87', 0, 1),
(46, 1, 2, 5, 4, 10, 1, 18, '0 95', 0, 1),
(47, 1, 2, 5, 4, 12, 1, 18, '0 60', 0, 1),
(48, 1, 2, 3, 2, 12, 2, 120, '0 45 8', 2, 1),
(49, 1, 2, 3, 2, 13, 2, 120, '0 53 65', 2, 1),
(50, 1, 2, 3, 2, 14, 2, 120, '0 81 87', 2, 1),
(51, 1, 2, 3, 2, 16, 2, 96, '0 7 97', 1, 1),
(52, 1, 2, 3, 2, 17, 2, 96, '0 64 1', 2, 1),
(53, 1, 2, 3, 2, 18, 2, 96, '0 16 16', 2, 1),
(54, 1, 2, 4, 1, 2, 2, 88, '0 65 79', 2, 1),
(55, 1, 2, 4, 1, 4, 2, 88, '0 83 84', 2, 1),
(56, 1, 2, 4, 1, 6, 2, 66, '0 18 71', 1, 1),
(57, 1, 2, 4, 1, 7, 2, 49, '0 96 75', 0, 1),
(58, 1, 2, 4, 1, 9, 2, 66, '0 5 3', 2, 1),
(59, 1, 2, 6, 9, 2, 1, 9, '0 72', 0, 1),
(60, 1, 2, 6, 9, 4, 1, 9, '0 86', 0, 1),
(61, 1, 2, 6, 9, 6, 1, 9, '0 58', 0, 1),
(62, 1, 2, 6, 9, 8, 1, 9, '0 19', 0, 1),
(63, 1, 2, 6, 9, 10, 1, 9, '0 71', 0, 1),
(64, 1, 2, 6, 9, 12, 1, 9, '0 16', 0, 1),
(65, 1, 2, 9, 3, 0, 1, 80, '0 94', 0, 1),
(66, 1, 2, 9, 3, 1, 1, 80, '0 21', 1, 1),
(67, 1, 2, 9, 3, 2, 1, 80, '0 39', 1, 1),
(68, 1, 2, 9, 3, 3, 1, 80, '0 87', 0, 1),
(69, 1, 2, 10, 4, 0, 1, 80, '0 8', 1, 1),
(70, 1, 2, 10, 4, 1, 1, 80, '0 63', 1, 1),
(71, 1, 2, 10, 4, 2, 1, 80, '0 30', 1, 1),
(72, 1, 2, 10, 4, 3, 1, 80, '0 26', 1, 1),
(73, 1, 3, 1, 4, 3, 2, 0, '0', 0, 1),
(74, 1, 3, 1, 4, 4, 2, 0, '0', 0, 1),
(75, 1, 3, 1, 6, 12, 2, 0, '0', 0, 1),
(76, 1, 3, 4, 1, 3, 4, 0, '0', 0, 1),
(77, 1, 3, 3, 2, 12, 2, 91, '0 75 95', 1, 1),
(78, 1, 3, 3, 2, 13, 2, 91, '0 39 77', 2, 1),
(79, 1, 3, 3, 2, 14, 2, 91, '0 49 71', 2, 1),
(80, 1, 3, 3, 2, 17, 2, 57, '0 64 78', 0, 1),
(81, 1, 3, 3, 2, 18, 2, 57, '0 5 60', 1, 1),
(82, 1, 3, 4, 5, 7, 2, 15, '0 63 3', 1, 1),
(83, 1, 3, 4, 5, 10, 2, 15, '0 92 96', 0, 1),
(84, 1, 3, 6, 15, 2, 1, 20, '0 23', 0, 1),
(85, 1, 3, 6, 15, 4, 1, 20, '0 67', 0, 1),
(86, 1, 3, 6, 15, 6, 1, 20, '0 64', 0, 1),
(87, 1, 3, 6, 15, 8, 1, 20, '0 51', 0, 1),
(88, 1, 3, 6, 15, 10, 1, 20, '0 25', 0, 1),
(89, 1, 3, 6, 15, 12, 1, 20, '0 59', 0, 1),
(90, 1, 3, 1, 18, 9, 3, 28, '0 38 36 22', 1, 1),
(91, 1, 3, 1, 18, 10, 3, 28, '0 37 86 23', 1, 1),
(92, 1, 3, 2, 6, 8, 3, 8, '0 29 38 53', 0, 1),
(93, 1, 3, 2, 6, 9, 3, 8, '0 51 22 90', 0, 1),
(94, 1, 3, 2, 6, 10, 3, 8, '0 46 41 7', 1, 1),
(95, 1, 3, 2, 6, 11, 3, 8, '0 14 61 17', 0, 1),
(96, 1, 3, 2, 6, 12, 3, 8, '0 29 46 72', 0, 1),
(97, 1, 3, 5, 4, 2, 1, 32, '0 21', 1, 1),
(98, 1, 3, 5, 4, 4, 1, 32, '0 18', 1, 1),
(99, 1, 3, 5, 4, 6, 1, 32, '0 36', 0, 1),
(100, 1, 3, 5, 4, 8, 1, 32, '0 2', 1, 1),
(101, 1, 3, 5, 4, 10, 1, 32, '0 52', 0, 1),
(102, 1, 3, 5, 4, 12, 1, 32, '0 48', 0, 1),
(103, 1, 3, 8, 2, 0, 1, 90, '0 9', 1, 1),
(104, 1, 3, 8, 2, 1, 1, 90, '0 70', 1, 1),
(105, 1, 3, 8, 2, 2, 1, 90, '0 61', 1, 1),
(106, 1, 3, 15, 4, 0, 1, 80, '0 62', 1, 1),
(107, 1, 3, 15, 4, 1, 1, 80, '0 21', 1, 1),
(108, 1, 3, 16, 4, 0, 1, 80, '0 70', 1, 1),
(109, 1, 3, 16, 4, 1, 1, 80, '0 20', 1, 1),
(110, 1, 3, 17, 6, 0, 1, 70, '0 49', 1, 1),
(111, 1, 3, 17, 6, 1, 1, 70, '0 33', 1, 1),
(112, 1, 3, 18, 1, 1, 1, 90, '0 42', 1, 1),
(113, 1, 3, 18, 1, 2, 1, 90, '0 62', 1, 1),
(114, 1, 4, 1, 4, 7, 2, 0, '0', 0, 1),
(115, 1, 4, 19, 6, 2, 3, 0, '0', 0, 0),
(116, 1, 4, 19, 6, 4, 3, 0, '0', 0, 0),
(117, 1, 4, 19, 6, 6, 3, 0, '0', 0, 0),
(118, 1, 4, 19, 6, 10, 3, 0, '0', 0, 0),
(119, 1, 4, 19, 6, 12, 3, 0, '0', 0, 0),
(120, 1, 4, 6, 19, 4, 1, 0, '0', 0, 0),
(121, 1, 4, 6, 19, 6, 1, 0, '0', 0, 0),
(122, 1, 4, 6, 19, 8, 1, 0, '0', 0, 0),
(123, 1, 4, 6, 19, 12, 1, 0, '0', 0, 0),
(124, 1, 4, 2, 4, 5, 1, 0, '0', 0, 0),
(125, 1, 4, 2, 4, 6, 1, 0, '0', 0, 0),
(126, 1, 4, 2, 6, 8, 3, 0, '0', 0, 0),
(127, 1, 4, 2, 6, 9, 3, 0, '0', 0, 0),
(128, 1, 4, 2, 3, 10, 3, 0, '0', 0, 0),
(129, 1, 4, 2, 3, 11, 3, 0, '0', 0, 0),
(130, 1, 4, 2, 3, 12, 3, 0, '0', 0, 0),
(131, 1, 4, 2, 3, 14, 3, 0, '0', 0, 0),
(132, 1, 4, 2, 3, 15, 3, 0, '0', 0, 0),
(133, 1, 4, 2, 3, 16, 3, 0, '0', 0, 0),
(134, 1, 4, 5, 4, 2, 1, 0, '0', 0, 0),
(135, 1, 4, 5, 4, 4, 1, 0, '0', 0, 0),
(136, 1, 4, 5, 4, 6, 1, 0, '0', 0, 0),
(137, 1, 4, 5, 4, 8, 1, 0, '0', 0, 0),
(138, 1, 4, 5, 4, 10, 1, 0, '0', 0, 0),
(139, 1, 4, 5, 4, 12, 1, 0, '0', 0, 0),
(140, 1, 4, 13, 3, 2, 1, 0, '0', 0, 0),
(141, 1, 4, 13, 3, 3, 1, 0, '0', 0, 0),
(142, 1, 4, 13, 4, 5, 1, 0, '0', 0, 0),
(143, 1, 4, 13, 4, 6, 1, 0, '0', 0, 0),
(144, 1, 4, 3, 13, 3, 2, 0, '0', 0, 0),
(145, 1, 4, 3, 13, 4, 2, 0, '0', 0, 0),
(146, 1, 4, 3, 13, 5, 2, 0, '0', 0, 0),
(147, 1, 4, 3, 2, 12, 2, 0, '0', 0, 0),
(148, 1, 4, 3, 2, 13, 2, 0, '0', 0, 0),
(149, 1, 4, 3, 2, 14, 2, 0, '0', 0, 0),
(150, 1, 4, 4, 13, 2, 2, 0, '0', 0, 0),
(151, 1, 4, 4, 13, 4, 2, 0, '0', 0, 0),
(152, 1, 4, 4, 13, 6, 2, 0, '0', 0, 0),
(153, 1, 4, 4, 5, 7, 2, 0, '0', 0, 0),
(154, 1, 4, 4, 13, 9, 2, 0, '0', 0, 0);

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
(1, 'test', 'active', 4, 2, 3000, 300),
(2, '1', 'active', 1, 0, 2000, 200);

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
(1, 1, 1, 4, 2, 'ready'),
(2, 2, 1, 4, 2, 'ready'),
(3, 1, 2, 1, 0, 'waiting'),
(4, 2, 2, 1, 0, 'waiting');

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
(1, 1, 1, 356, 'Earth Alliance'),
(2, 1, 2, 914, 'Centauri Republic'),
(3, 2, 1, 1400, 'Centauri Republic'),
(4, 2, 2, 1000, 'Minbari Federation');

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
(4, 1, 1, 'Hyperion', 4, 3, 850),
(5, 1, 2, 'Vorchan', 4, 4, 370);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `systemcrits`
--

CREATE TABLE `systemcrits` (
  `id` int(4) NOT NULL,
  `gameid` int(4) DEFAULT NULL,
  `shipid` int(4) DEFAULT NULL,
  `systemid` int(4) DEFAULT NULL,
  `turn` int(3) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `duration` int(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `systemcrits`
--

INSERT INTO `systemcrits` (`id`, `gameid`, `shipid`, `systemid`, `turn`, `type`, `duration`) VALUES
(3, 1, 2, 2, 1, 'range2', 15),
(4, 1, 2, 3, 1, 'damage2', 15),
(5, 1, 2, 6, 1, 'range2', 15),
(6, 1, 3, 2, 1, 'destroyed', 15),
(7, 1, 2, 19, 2, 'range2', 15),
(8, 1, 3, 16, 2, 'destroyed', 15),
(9, 1, 6, 1, 2, 'disengaged', -1),
(10, 1, 2, 14, 3, 'range1', 15);

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
(1, 1, 1, 1, 0, 'Saggitarius', 'deployed', 1, 0),
(2, 1, 1, 1, 0, 'Omega', 'deployed', 1, 0),
(3, 1, 2, 1, 0, 'Primus', 'deployed', 1, 0),
(4, 1, 2, 1, 0, 'Demos', 'deployed', 1, 0),
(5, 1, 1, 0, 0, 'Flight', 'bought', 2, 0),
(6, 1, 2, 0, 0, 'Flight', 'bought', 2, 0),
(7, 1, 2, 1, 0, 'Demos', 'bought', 6, 0),
(8, 1, 2, 2, 1, 'BallisticTorpedo', 'disabled', 3, 1),
(9, 1, 1, 3, 1, 'BallisticMissile', 'disabled', 4, 1),
(10, 1, 1, 4, 1, 'BallisticMissile', 'disabled', 4, 1),
(11, 2, 1, 1, 0, 'Demos', 'deployed', 1, 0),
(12, 2, 2, 1, 0, 'Tinashi', 'deployed', 1, 0),
(13, 1, 1, 1, 0, 'Omega', 'deployed', 4, 0),
(14, 1, 2, 1, 0, 'Vorchan', 'bought', 5, 0),
(15, 1, 1, 4, 1, 'BallisticMissile', 'disabled', 2, 1),
(16, 1, 1, 4, 1, 'BallisticMissile', 'disabled', 2, 1),
(17, 1, 1, 6, 1, 'BallisticMissile', 'disabled', 2, 1),
(18, 1, 2, 1, 1, 'BallisticTorpedo', 'disabled', 4, 1),
(19, 1, 1, 0, 0, 'Flight', 'bought', 4, 0),
(20, 1, 2, 0, 0, 'Flight', 'bought', 4, 0),
(21, 1, 1, 4, 1, 'BallisticMissile', 'launched', 2, 0);

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
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=124;
--
-- AUTO_INCREMENT für Tabelle `damages`
--
ALTER TABLE `damages`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;
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
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=155;
--
-- AUTO_INCREMENT für Tabelle `games`
--
ALTER TABLE `games`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT für Tabelle `loads`
--
ALTER TABLE `loads`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT für Tabelle `playerstatus`
--
ALTER TABLE `playerstatus`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT für Tabelle `reinforce`
--
ALTER TABLE `reinforce`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT für Tabelle `reinforcements`
--
ALTER TABLE `reinforcements`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT für Tabelle `systemcrits`
--
ALTER TABLE `systemcrits`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT für Tabelle `units`
--
ALTER TABLE `units`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

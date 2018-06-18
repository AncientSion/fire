-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 18. Jun 2018 um 22:04
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
  `a` decimal(5,2) NOT NULL DEFAULT '0.00',
  `cost` int(4) DEFAULT NULL,
  `delay` int(4) DEFAULT NULL,
  `costmod` float DEFAULT NULL,
  `resolved` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `actions`
--

INSERT INTO `actions` (`id`, `shipid`, `turn`, `type`, `dist`, `x`, `y`, `a`, `cost`, `delay`, `costmod`, `resolved`) VALUES
(1, 3, 1, 'deploy', 0, 686, -142, '180.00', 0, 0, 1, 1),
(2, 4, 1, 'deploy', 0, 697, 661, '180.00', 0, 0, 1, 1),
(3, 5, 1, 'deploy', 0, 684, 244, '180.00', 0, 0, 1, 1),
(4, 1, 1, 'deploy', 0, -640, -97, '0.00', 0, 0, 1, 1),
(5, 2, 1, 'deploy', 0, -640, 649, '0.00', 0, 0, 1, 1),
(6, 1, 1, 'jumpIn', 0, -640, -97, '0.00', 0, 0, 0, 1),
(7, 2, 1, 'jumpIn', 0, -640, 649, '0.00', 0, 0, 0, 1),
(8, 3, 1, 'jumpIn', 0, 686, -142, '0.00', 0, 0, 0, 1),
(9, 4, 1, 'jumpIn', 0, 697, 661, '0.00', 0, 0, 0, 1),
(10, 5, 1, 'jumpIn', 0, 684, 244, '0.00', 0, 0, 0, 1),
(11, 1, 1, 'move', 155, -485, -97, '0.00', 0, 0, 1, 1),
(12, 2, 1, 'move', 155, -485, 649, '0.00', 0, 0, 1, 1),
(13, 3, 1, 'move', 155, 531, -142, '0.00', 0, 0, 1, 1),
(14, 3, 1, 'turn', 0, 531, -142, '-1.91', 4, 0, 1, 1),
(15, 4, 1, 'move', 155, 542, 661, '0.00', 0, 0, 1, 1),
(16, 4, 1, 'turn', 0, 542, 661, '0.50', 2, 0, 1, 1),
(17, 5, 1, 'move', 165, 519, 244, '0.00', 0, 0, 1, 1),
(18, 25, 2, 'deploy', 0, 531, -142, '0.00', 1, 0, 1, 1),
(19, 26, 2, 'deploy', 0, 542, 661, '0.00', 1, 0, 1, 1),
(20, 1, 2, 'move', 155, -330, -97, '0.00', 0, 0, 1, 1),
(21, 2, 2, 'move', 155, -330, 649, '0.00', 0, 0, 1, 1),
(22, 3, 2, 'turn', 0, 531, -142, '-10.55', 11, 31, 1, 1),
(23, 3, 2, 'move', 155, 380, -109, '0.00', 0, 0, 1, 1),
(24, 4, 2, 'turn', 0, 542, 661, '30.00', 30, 86, 1, 1),
(25, 4, 2, 'move', 86, 468, 617, '0.00', 0, 0, 1, 1),
(26, 4, 2, 'turn', 0, 468, 617, '17.75', 18, 51, 1, 1),
(27, 4, 2, 'move', 69, 422, 566, '0.00', 0, 0, 1, 1),
(28, 28, 1, 'deploy', 0, 621, -46, '180.00', 0, 0, 1, 1),
(29, 27, 1, 'deploy', 0, -685, 65, '0.00', 0, 0, 1, 1),
(30, 27, 1, 'jumpIn', 0, -685, 65, '0.00', 0, 0, 0, 1),
(31, 28, 1, 'jumpIn', 0, 621, -46, '0.00', 0, 0, 0, 1),
(32, 27, 1, 'move', 140, -545, 65, '0.00', 0, 0, 1, 1),
(33, 28, 1, 'move', 165, 456, -46, '0.00', 0, 0, 1, 1),
(34, 29, 2, 'deploy', 0, -545, 65, '0.00', 1, 0, 1, 1),
(35, 28, 2, 'move', 165, 291, -46, '0.00', 0, 0, 1, 1),
(36, 27, 2, 'turn', 0, -545, 65, '-30.00', 30, 107, 1, 1),
(37, 27, 2, 'move', 140, -424, -5, '0.00', 0, 0, 1, 1),
(38, 29, 2, 'move', 90, -467, 20, '329.95', 0, 0, 0, 1),
(39, 5, 2, 'turn', 0, 519, 244, '17.49', 18, 35, 1, 1),
(40, 5, 2, 'move', 165, 362, 194, '0.00', 0, 0, 1, 1),
(41, 25, 2, 'move', 90, 443, -123, '167.67', 0, 0, 0, 1),
(42, 26, 2, 'move', 90, 474, 602, '221.00', 0, 0, 0, 1),
(43, 32, 1, 'deploy', 0, 645, 36, '180.00', 0, 0, 1, 1),
(44, 33, 1, 'deploy', 0, 649, 126, '180.00', 0, 0, 1, 1),
(45, 30, 1, 'deploy', 0, -685, 546, '0.00', 0, 0, 1, 1),
(46, 31, 1, 'deploy', 0, -609, 20, '0.00', 0, 0, 1, 1),
(47, 30, 1, 'jumpIn', 0, -685, 546, '0.00', 0, 0, 0, 1),
(48, 31, 1, 'jumpIn', 0, -609, 20, '0.00', 0, 0, 0, 1),
(49, 32, 1, 'jumpIn', 0, 645, 36, '0.00', 0, 0, 0, 1),
(50, 33, 1, 'jumpIn', 0, 649, 126, '0.00', 0, 0, 0, 1),
(51, 30, 1, 'move', 140, -545, 546, '0.00', 0, 0, 1, 1),
(52, 31, 1, 'move', 155, -454, 20, '0.00', 0, 0, 1, 1),
(53, 32, 1, 'move', 155, 490, 36, '0.00', 0, 0, 1, 1),
(54, 33, 1, 'move', 165, 484, 126, '0.00', 0, 0, 1, 1),
(55, 32, 2, 'move', 155, 335, 36, '0.00', 0, 0, 1, 1),
(56, 33, 2, 'move', 165, 319, 126, '0.00', 0, 0, 1, 1),
(57, 30, 2, 'move', 140, -405, 546, '0.00', 0, 0, 1, 1),
(58, 31, 2, 'move', 155, -299, 20, '0.00', 0, 0, 1, 1),
(59, 1, 3, 'turn', 0, -330, -97, '-8.00', 8, 26, 1, 1),
(60, 1, 3, 'move', 155, -177, -119, '0.00', 0, 0, 1, 1),
(61, 2, 3, 'turn', 0, -330, 649, '-21.04', 22, 68, 1, 1),
(62, 2, 3, 'move', 155, -185, 593, '0.00', 0, 0, 1, 1),
(63, 3, 3, 'turn', 0, 380, -109, '23.85', 24, 68, 1, 1),
(64, 3, 3, 'move', 155, 228, -140, '0.00', 0, 0, 1, 1),
(65, 4, 3, 'turn', 0, 422, 566, '-30.00', 30, 86, 1, 1),
(66, 4, 3, 'move', 86, 340, 539, '0.00', 0, 0, 1, 1),
(67, 4, 3, 'turn', 0, 340, 539, '-30.00', 36, 69, 1, 1),
(68, 4, 3, 'move', 69, 272, 553, '0.00', 0, 0, 1, 1),
(69, 4, 3, 'turn', 0, 272, 553, '-4.00', 4, 12, 1, 1),
(70, 5, 3, 'turn', 0, 362, 194, '30.00', 30, 60, 1, 1),
(71, 5, 3, 'move', 165, 251, 72, '0.00', 0, 0, 1, 1),
(72, 5, 3, 'turn', 0, 251, 72, '30.00', 50, 20, 1, 1),
(73, 25, 3, 'move', 90, 353, -122, '179.63', 0, 0, 0, 1),
(74, 26, 3, 'move', 180, 353, 468, '227.92', 0, 0, 0, 1),
(75, 3, 4, 'speed', -1, 228, -140, '0.00', 35, 0, 1, 0),
(76, 3, 4, 'turn', 0, 228, -140, '-14.60', 13, 37, 1, 0),
(77, 3, 4, 'move', 136, 92, -132, '0.00', 0, 0, 1, 0),
(78, 4, 4, 'move', 12, 260, 556, '0.00', 0, 0, 1, 0),
(79, 4, 4, 'turn', 0, 260, 556, '17.54', 18, 50, 1, 0),
(80, 4, 4, 'move', 101, 159, 553, '0.00', 0, 0, 1, 0),
(81, 4, 4, 'turn', 0, 159, 553, '11.69', 12, 34, 1, 0),
(82, 4, 4, 'move', 42, 118, 543, '0.00', 0, 0, 1, 0),
(83, 5, 4, 'move', 20, 247, 52, '0.00', 0, 0, 1, 0),
(84, 5, 4, 'turn', 0, 247, 52, '-30.00', 30, 60, 1, 0),
(85, 5, 4, 'move', 60, 206, 8, '0.00', 0, 0, 1, 0),
(86, 5, 4, 'turn', 0, 206, 8, '-30.00', 30, 60, 1, 0),
(87, 5, 4, 'move', 60, 149, -10, '0.00', 0, 0, 1, 0),
(88, 5, 4, 'turn', 0, 149, -10, '-20.00', 20, 40, 1, 0),
(89, 5, 4, 'move', 25, 124, -9, '0.00', 0, 0, 1, 0),
(90, 1, 4, 'turn', 0, -177, -119, '16.28', 17, 53, 1, 0),
(91, 1, 4, 'move', 155, -24, -97, '0.00', 0, 0, 1, 0),
(92, 1, 4, 'turn', 0, -24, -97, '6.53', 14, 0, 1, 0),
(93, 2, 4, 'turn', 0, -185, 593, '22.99', 23, 75, 1, 0),
(94, 2, 4, 'move', 155, -30, 598, '0.00', 0, 0, 1, 0);

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
(412, 13, 1, 1, 6, 1, 2, 0, 'Particle', 64, 0, 0, 13, 0, 51, 25, 0, 'p;', 0),
(413, 8, 1, 1, 20, 1, 2, 0, 'Laser', 189, 0, 0, 25, 0, 38, 25, 0, 'p;', 0),
(414, 8, 1, 1, 20, 1, 2, 0, 'Laser', 189, 0, 0, 24, 0, 39, 24, 0, 'p;', 0),
(415, 14, 1, 1, 6, 1, 2, 0, 'Particle', 36, 0, 0, 12, 0, 24, 24, 0, 'p;', 0),
(416, 9, 1, 1, 6, 11, 2, 0, 'Particle', 36, 0, 28, 8, 0, 0, 15, 0, 'p;', 0),
(417, 12, 1, 1, 6, 12, 2, 0, 'Particle', 36, 0, 24, 6, 0, 6, 11, 1, 'p;o3;', 0),
(418, 6, 1, 1, 20, 21, 2, 0, 'Particle', 36, 0, 29, 7, 0, 0, 14, 0, 'p;', 0),
(419, 8, 1, 1, 20, 25, 2, 0, 'Laser', 189, 0, 44, 14, 0, 5, 14, 1, 'p;o3;', 0),
(420, 17, 1, 3, 6, 1, 2, 0, 'Particle', 96, 3, 0, 18, 0, 75, 21, 0, 'p;', 0),
(421, 19, 1, 3, 6, 1, 2, 0, 'Particle', 54, 3, 0, 17, 0, 34, 20, 0, 'p;', 0),
(422, 17, 1, 3, 6, 7, 2, 0, 'Particle', 28, 3, 14, 11, 0, 0, 14, 0, 'p;', 0),
(423, 17, 1, 3, 6, 8, 2, 0, 'Particle', 28, 3, 16, 9, 0, 0, 12, 0, 'p;', 0),
(424, 17, 1, 3, 6, 9, 2, 0, 'Particle', 28, 3, 16, 9, 0, 0, 12, 0, 'p;', 0),
(425, 18, 1, 3, 6, 9, 2, 0, 'Particle', 52, 3, 40, 9, 0, 0, 12, 0, 'p;', 0),
(426, 17, 1, 3, 6, 10, 2, 0, 'Particle', 28, 3, 17, 8, 0, 0, 11, 0, 'p;', 0),
(427, 17, 1, 3, 6, 11, 2, 0, 'Particle', 28, 3, 14, 11, 0, 0, 14, 0, 'p;', 0),
(428, 24, 1, 4, 19, 1, 2, 0, 'Particle', 53, 0, 0, 18, 0, 35, 18, 0, 'p;', 0),
(429, 25, 1, 4, 19, 1, 2, 0, 'Particle', 44, 0, 0, 18, 0, 26, 18, 0, 'p;', 0),
(430, 26, 1, 4, 19, 1, 2, 0, 'Particle', 48, 0, 0, 17, 0, 31, 17, 0, 'p;', 0),
(431, 27, 0, 32, 19, 1, 2, 0, 'Area', 78, 3, 0, 17, 0, 58, 20, 0, 'p;', 0),
(432, 27, 0, 32, 19, 20, 2, 0, 'Area', 39, 3, 22, 14, 0, 0, 17, 0, 'p;', 0),
(433, 27, 0, 32, 19, 21, 2, 0, 'Area', 39, 3, 28, 8, 0, 0, 11, 1, 'p;', 0),
(434, 27, 0, 32, 19, 22, 2, 0, 'Area', 39, 3, 28, 8, 0, 0, 11, 1, 'p;', 0),
(435, 27, 0, 33, 10, 1, 2, 0, 'Area', 52, 0, 0, 14, 0, 48, 14, 0, 'p;', 0),
(436, 27, 0, 33, 10, 11, 2, 0, 'Area', 39, 0, 28, 6, 0, 0, 6, 1, 'p;', 0),
(437, 27, 0, 33, 10, 12, 2, 0, 'Area', 39, 0, 28, 6, 0, 0, 6, 1, 'p;', 0),
(769, 28, 1, 1, 6, 1, 3, 0, 'Laser', 177, 0, 0, 23, 0, 36, 23, 0, 'p;', 0),
(770, 32, 1, 1, 6, 1, 3, 0, 'Laser', 31, 0, 0, 23, 0, 8, 23, 0, 'p;', 0),
(771, 28, 1, 1, 6, 4, 3, 0, 'Laser', 177, 0, 20, 24, 0, 15, 24, 0, 'p;c;', 0),
(772, 28, 1, 1, 6, 10, 3, 0, 'Laser', 177, 0, 44, 14, 0, 1, 14, 1, 'p;o3;', 0),
(773, 33, 1, 1, 6, 11, 3, 0, 'Laser', 31, 0, 16, 13, 0, 2, 13, 1, 'p;o3;', 0),
(774, 36, 1, 3, 6, 1, 3, 0, 'Particle', 49, 3, 0, 16, 0, 30, 19, 0, 'p;', 0);

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
(6, 1, 2, 3, 1, -325, -98, 7, 2, 62, '67;13;', 1, 1),
(7, 1, 2, 3, 1, -325, -98, 11, 2, 62, '66;93;', 0, 1),
(8, 1, 2, 3, 1, -325, -98, 13, 1, 91, '75;', 1, 1),
(9, 1, 2, 4, 1, -335, -101, 7, 2, 42, '93;20;', 1, 1),
(10, 1, 2, 4, 1, -335, -101, 11, 2, 42, '72;51;', 0, 1),
(11, 1, 2, 4, 1, -335, -101, 20, 1, 82, '94;', 0, 1),
(12, 1, 2, 5, 1, -330, -95, 7, 2, 56, '71;26;', 1, 1),
(13, 1, 2, 5, 1, -330, -95, 8, 2, 71, '51;92;', 1, 1),
(14, 1, 2, 5, 1, -330, -95, 9, 2, 56, '24;72;', 1, 1),
(15, 1, 2, 5, 1, -330, -95, 11, 1, 41, '86;', 0, 1),
(16, 1, 2, 5, 1, -330, -95, 12, 1, 41, '80;', 0, 1),
(17, 1, 2, 1, 3, 383, -107, 7, 1, 42, '27;', 6, 1),
(18, 1, 2, 1, 3, 376, -108, 22, 1, 56, '51;', 1, 1),
(19, 1, 2, 1, 3, 376, -108, 23, 1, 56, '5;', 1, 1),
(20, 1, 2, 1, 3, 376, -108, 24, 1, 56, '93;', 0, 1),
(21, 1, 2, 1, 3, 376, -108, 25, 1, 56, '60;', 0, 1),
(22, 1, 2, 2, 4, 416, 562, 21, 1, 46, '56;', 0, 1),
(23, 1, 2, 2, 4, 416, 562, 22, 1, 61, '62;', 0, 1),
(24, 1, 2, 2, 4, 416, 562, 23, 1, 61, '25;', 1, 1),
(25, 1, 2, 2, 4, 416, 562, 24, 1, 61, '27;', 1, 1),
(26, 1, 2, 2, 4, 416, 562, 25, 1, 61, '54;', 1, 1),
(27, 3, 2, 31, 0, 345, 77, 8, 1, 0, '345;77;', 2, 1),
(28, 1, 3, 3, 1, -172, -118, 20, 1, 61, '4;', 1, 1),
(29, 1, 3, 4, 2, -178, 588, 13, 1, 59, '98;', 0, 1),
(30, 1, 3, 4, 2, -178, 588, 14, 1, 31, '94;', 0, 1),
(31, 1, 3, 4, 2, -178, 588, 15, 1, 31, '93;', 0, 1),
(32, 1, 3, 5, 1, -169, -113, 17, 1, 77, '73;', 1, 1),
(33, 1, 3, 5, 1, -169, -113, 18, 1, 77, '23;', 1, 1),
(34, 1, 3, 1, 3, 229, -135, 8, 1, 40, '63;', 0, 1),
(35, 1, 3, 1, 3, 229, -135, 9, 1, 40, '68;', 0, 1),
(36, 1, 3, 1, 3, 229, -135, 10, 1, 40, '37;', 1, 1),
(37, 1, 3, 1, 3, 229, -135, 11, 1, 40, '55;', 0, 1),
(38, 1, 3, 1, 3, 229, -135, 21, 1, 32, '40;', 0, 1),
(39, 1, 3, 2, 4, 266, 555, 8, 1, 35, '74;', 0, 1),
(40, 1, 3, 2, 4, 266, 555, 9, 1, 35, '45;', 0, 1),
(41, 1, 3, 2, 4, 266, 555, 10, 1, 35, '44;', 0, 1),
(42, 1, 3, 2, 4, 266, 555, 11, 1, 35, '46;', 0, 1);

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
  `focusMod` int(3) DEFAULT '100'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `games`
--

INSERT INTO `games` (`id`, `name`, `status`, `turn`, `phase`, `pv`, `reinforce`, `reinforceTurn`, `reinforceETA`, `focusMod`) VALUES
(1, 'myGame', 'active', 4, 0, 3000, 1500, 2, 2, 10),
(3, 'myGame', 'active', 2, 2, 3000, 1500, 11, 3, 10);

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
(7, 28, 15, 'SitaraParticle', 8);

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
(1, 25, '2', 2, 3, 531, -142, 0),
(2, 26, '2', 2, 1, -485, -97, 0),
(3, 29, '2', 2, 27, -545, 65, 0),
(4, 25, '2', 3, 1, -330, -97, 0);

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
  `maxFocus` int(4) DEFAULT '0',
  `gainFocus` int(4) DEFAULT '0',
  `curFocus` int(4) DEFAULT '0',
  `status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `playerstatus`
--

INSERT INTO `playerstatus` (`id`, `userid`, `gameid`, `turn`, `phase`, `faction`, `value`, `maxFocus`, `gainFocus`, `curFocus`, `status`) VALUES
(1, 1, 1, 4, 0, 'Minbari Federation', 1800, 1440, 360, 650, 'waiting'),
(2, 2, 1, 4, 0, 'Earth Alliance', 1900, 1440, 360, 1310, 'waiting'),
(6, 1, 3, 2, 2, 'Narn Regime', 3650, 1440, 360, 1080, 'waiting'),
(7, 2, 3, 2, 2, 'Earth Alliance', 3235, 1200, 300, 900, 'waiting');

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
(1, 3, 13, 1, '1', 4),
(2, 3, 14, 1, '-1', 0),
(3, 3, 15, 1, '-1', 0),
(4, 3, 17, 1, '0', 0),
(5, 3, 18, 1, '0', 0),
(6, 3, 20, 1, '1', 4),
(7, 3, 21, 1, '-1', 0),
(8, 3, 22, 1, '-1', 0),
(9, 3, 4, 1, '1', 3),
(10, 3, 4, 1, '1', 5),
(11, 4, 13, 1, '1', 4),
(12, 4, 14, 1, '-1', 0),
(13, 4, 15, 1, '-1', 0),
(14, 4, 17, 1, '0', 0),
(15, 4, 18, 1, '0', 0),
(16, 4, 20, 1, '1', 4),
(17, 4, 21, 1, '-1', 0),
(18, 4, 22, 1, '-1', 0),
(19, 4, 4, 1, '1', 3),
(20, 4, 4, 1, '1', 5),
(21, 5, 11, 1, '-1', 0),
(22, 5, 12, 1, '-1', 0),
(23, 5, 17, 1, '-1', 0),
(24, 5, 18, 1, '-1', 0),
(25, 1, 15, 1, '0', 0),
(26, 1, 16, 1, '0', 0),
(27, 1, 17, 1, '0', 0),
(28, 1, 18, 1, '0', 0),
(29, 1, 19, 1, '0', 0),
(30, 1, 4, 1, '1', 3),
(31, 1, 4, 1, '1', 5),
(32, 2, 15, 1, '0', 0),
(33, 2, 16, 1, '0', 0),
(34, 2, 17, 1, '0', 0),
(35, 2, 18, 1, '0', 0),
(36, 2, 19, 1, '0', 0),
(37, 2, 4, 1, '1', 3),
(38, 2, 4, 1, '1', 5),
(39, 3, 6, 2, '1', 4),
(40, 3, 13, 2, '1', 4),
(41, 3, 14, 2, '-1', 0),
(42, 3, 15, 2, '-1', 0),
(43, 3, 17, 2, '0', 0),
(44, 3, 18, 2, '0', 0),
(45, 3, 21, 2, '-1', 0),
(46, 3, 22, 2, '-1', 0),
(47, 3, 4, 2, '1', 3),
(48, 3, 4, 2, '1', 5),
(49, 4, 14, 2, '-1', 0),
(50, 4, 15, 2, '-1', 0),
(51, 4, 17, 2, '0', 0),
(52, 4, 18, 2, '0', 0),
(53, 4, 21, 2, '-1', 0),
(54, 4, 22, 2, '-1', 0),
(55, 4, 4, 2, '1', 3),
(56, 4, 4, 2, '1', 5),
(57, 4, 4, 2, '1', 6),
(58, 5, 6, 2, '1', 3),
(59, 5, 11, 2, '-2', 0),
(60, 5, 12, 2, '-2', 0),
(61, 5, 17, 2, '-2', 0),
(62, 5, 18, 2, '-2', 0),
(63, 1, 15, 2, '0', 0),
(64, 1, 16, 2, '0', 0),
(65, 1, 17, 2, '0', 0),
(66, 1, 18, 2, '0', 0),
(67, 1, 19, 2, '0', 0),
(68, 1, 4, 2, '1', 3),
(69, 1, 4, 2, '1', 5),
(70, 2, 15, 2, '0', 0),
(71, 2, 16, 2, '0', 0),
(72, 2, 17, 2, '0', 0),
(73, 2, 18, 2, '0', 0),
(74, 2, 19, 2, '0', 0),
(75, 2, 4, 2, '1', 3),
(76, 2, 4, 2, '1', 5),
(77, 27, 7, 1, '-1', 0),
(78, 27, 8, 1, '-1', 0),
(79, 27, 10, 1, '-1', 0),
(80, 27, 11, 1, '-1', 0),
(81, 27, 13, 1, '-1', 0),
(82, 27, 14, 1, '-1', 0),
(83, 27, 15, 1, '-1', 0),
(84, 27, 16, 1, '-1', 0),
(85, 27, 17, 1, '-1', 0),
(86, 27, 18, 1, '-1', 0),
(87, 27, 19, 1, '-1', 0),
(88, 27, 20, 1, '-1', 0),
(89, 27, 27, 1, '-1', 0),
(90, 27, 28, 1, '-1', 0),
(91, 27, 29, 1, '-1', 0),
(92, 27, 30, 1, '-1', 0),
(93, 27, 31, 1, '-1', 0),
(94, 27, 32, 1, '-1', 0),
(95, 27, 33, 1, '-1', 0),
(96, 27, 34, 1, '-1', 0),
(97, 27, 7, 2, '-1', 0),
(98, 27, 8, 2, '-1', 0),
(99, 27, 10, 2, '-1', 0),
(100, 27, 11, 2, '-1', 0),
(101, 27, 13, 2, '-1', 0),
(102, 27, 14, 2, '-1', 0),
(103, 27, 15, 2, '-1', 0),
(104, 27, 16, 2, '-1', 0),
(105, 27, 17, 2, '-1', 0),
(106, 27, 18, 2, '-1', 0),
(107, 27, 19, 2, '-1', 0),
(108, 27, 20, 2, '-1', 0),
(109, 27, 27, 2, '-1', 0),
(110, 27, 28, 2, '-1', 0),
(111, 27, 29, 2, '-1', 0),
(112, 27, 30, 2, '-1', 0),
(113, 27, 31, 2, '-1', 0),
(114, 27, 32, 2, '-1', 0),
(115, 27, 33, 2, '-1', 0),
(116, 27, 34, 2, '-1', 0),
(117, 32, 14, 1, '-1', 0),
(118, 32, 15, 1, '-1', 0),
(119, 32, 21, 1, '-1', 0),
(120, 32, 22, 1, '-1', 0),
(121, 33, 11, 1, '-1', 0),
(122, 33, 12, 1, '-1', 0),
(123, 33, 17, 1, '-1', 0),
(124, 33, 18, 1, '-1', 0),
(125, 30, 7, 1, '-1', 0),
(126, 30, 8, 1, '-1', 0),
(127, 30, 10, 1, '-1', 0),
(128, 30, 11, 1, '-1', 0),
(129, 30, 13, 1, '-1', 0),
(130, 30, 14, 1, '-1', 0),
(131, 30, 15, 1, '-1', 0),
(132, 30, 16, 1, '-1', 0),
(133, 30, 17, 1, '-1', 0),
(134, 30, 18, 1, '-1', 0),
(135, 30, 19, 1, '-1', 0),
(136, 30, 20, 1, '-1', 0),
(137, 30, 27, 1, '-1', 0),
(138, 30, 28, 1, '-1', 0),
(139, 30, 29, 1, '-1', 0),
(140, 30, 30, 1, '-1', 0),
(141, 30, 31, 1, '-1', 0),
(142, 30, 32, 1, '-1', 0),
(143, 30, 33, 1, '-1', 0),
(144, 30, 34, 1, '-1', 0),
(145, 31, 11, 1, '0', 0),
(146, 31, 20, 1, '0', 0),
(147, 32, 14, 2, '-1', 0),
(148, 32, 15, 2, '-1', 0),
(149, 32, 21, 2, '-1', 0),
(150, 32, 22, 2, '-1', 0),
(151, 33, 11, 2, '-1', 0),
(152, 33, 12, 2, '-1', 0),
(153, 33, 17, 2, '-1', 0),
(154, 33, 18, 2, '-1', 0),
(155, 30, 7, 2, '-1', 0),
(156, 30, 8, 2, '-1', 0),
(157, 30, 10, 2, '-1', 0),
(158, 30, 11, 2, '-1', 0),
(159, 30, 13, 2, '-1', 0),
(160, 30, 14, 2, '-1', 0),
(161, 30, 15, 2, '-1', 0),
(162, 30, 16, 2, '-1', 0),
(163, 30, 17, 2, '-1', 0),
(164, 30, 18, 2, '-1', 0),
(165, 30, 19, 2, '-1', 0),
(166, 30, 20, 2, '-1', 0),
(167, 30, 27, 2, '-1', 0),
(168, 30, 28, 2, '-1', 0),
(169, 30, 29, 2, '-1', 0),
(170, 30, 30, 2, '-1', 0),
(171, 30, 31, 2, '-1', 0),
(172, 30, 32, 2, '-1', 0),
(173, 30, 33, 2, '-1', 0),
(174, 30, 34, 2, '-1', 0),
(175, 31, 11, 2, '0', 0),
(176, 31, 20, 2, '0', 0),
(177, 32, 19, 2, '1', 3),
(178, 1, 13, 3, '1', 3),
(179, 3, 6, 3, '1', 4),
(180, 3, 14, 3, '-1', 0),
(181, 3, 15, 3, '-1', 0),
(182, 3, 21, 3, '-1', 0),
(183, 3, 22, 3, '-1', 0),
(184, 4, 13, 3, '1', 4),
(185, 4, 14, 3, '-2', 0),
(186, 4, 15, 3, '-2', 0),
(187, 4, 21, 3, '-2', 0),
(188, 4, 22, 3, '-2', 0),
(189, 5, 11, 3, '-2', 0),
(190, 5, 12, 3, '-2', 0),
(191, 5, 16, 3, '1', 3),
(192, 5, 17, 3, '-2', 0),
(193, 5, 18, 3, '-2', 0),
(194, 3, 6, 4, '1', 4),
(195, 3, 14, 4, '-1', 0),
(196, 3, 15, 4, '-1', 0),
(197, 3, 21, 4, '-1', 0),
(198, 3, 22, 4, '-1', 0),
(199, 4, 6, 4, '1', 4),
(200, 4, 14, 4, '-2', 0),
(201, 4, 15, 4, '-2', 0),
(202, 4, 21, 4, '-2', 0),
(203, 4, 22, 4, '-2', 0),
(204, 5, 10, 4, '1', 3),
(205, 5, 11, 4, '-2', 0),
(206, 5, 12, 4, '-2', 0),
(207, 5, 17, 4, '-2', 0),
(208, 5, 18, 4, '-2', 0),
(209, 1, 4, 4, '1', 3);

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
(1, 3, 4, 1, '359.62', 1193, 0),
(2, 4, 4, 1, '359.95', 1263, 0),
(3, 5, 4, 1, '-1.00', 95, 0),
(4, 1, 4, 1, '0.19', 1210, 1),
(5, 2, 4, 1, '359.24', 1202, 1),
(6, 3, 4, 2, '9.93', 845, 0),
(7, 4, 4, 2, '353.29', 1146, 0),
(8, 5, 4, 2, '2.12', 807, 0),
(9, 1, 4, 2, '359.63', 764, 0),
(10, 2, 4, 2, '0.51', 780, 0),
(11, 28, 4, 1, '-1.00', 110, 0),
(12, 27, 4, 1, '-1.00', 117, 0),
(13, 27, 4, 2, '-1.00', 117, 0),
(14, 28, 4, 2, '-1.00', 110, 0),
(15, 32, 4, 1, '-1.00', 102, 0),
(16, 33, 4, 1, '-1.00', 95, 0),
(17, 30, 4, 1, '-1.00', 117, 0),
(18, 31, 4, 1, '-1.00', 113, 0),
(19, 32, 4, 2, '-1.00', 102, 0),
(20, 33, 4, 2, '-1.00', 95, 0),
(21, 30, 4, 2, '-1.00', 117, 0),
(22, 31, 4, 2, '-1.00', 113, 0),
(23, 1, 4, 3, '23.97', 534, 0),
(24, 2, 4, 3, '2.09', 579, 0),
(25, 3, 4, 3, '343.52', 503, 1),
(26, 4, 4, 3, '5.46', 526, 1),
(27, 5, 4, 3, '297.53', 520, 0),
(28, 3, 4, 4, '359.63', 224, 1),
(29, 4, 4, 4, '339.99', 263, 1),
(30, 5, 4, 4, '26.49', 278, 1),
(31, 1, 4, 4, '352.65', 230, 1),
(32, 2, 4, 4, '350.92', 274, 1);

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
(16, 25, 10, 'Aurora'),
(17, 26, 10, 'Aurora'),
(18, 29, 12, 'Aurora');

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
(147, 1, 5, 2, 'Overload', 0, '2.54'),
(148, 3, 7, 2, 'Damage', 0, '20.00'),
(149, 3, 7, 2, 'Accuracy', 0, '30.00'),
(150, 3, 8, 2, 'Accuracy', 0, '30.00'),
(309, 1, 5, 3, 'Overload', 0, '3.80');

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

INSERT INTO `units` (`id`, `gameid`, `userid`, `ship`, `ball`, `name`, `display`, `status`, `command`, `available`, `destroyed`, `x`, `y`, `facing`, `delay`, `thrust`, `rolling`, `rolled`, `flipped`, `turn`, `phase`, `focus`, `notes`) VALUES
(1, 1, 1, 1, 0, 'Tigara', 'A', 'bought', 1, 1, 0, -177, -119, '352.00', 0, 155, 0, 0, 0, 3, 3, 0, ''),
(2, 1, 1, 1, 0, 'Tigara', 'B', 'bought', 0, 1, 0, -185, 593, '338.96', 0, 155, 0, 0, 0, 3, 3, 1, ''),
(3, 1, 2, 1, 0, 'Hyperion', '', 'bought', 0, 1, 0, 228, -140, '191.39', 0, 155, 0, 0, 0, 3, 3, 0, ''),
(4, 1, 2, 1, 0, 'Hyperion', '', 'bought', 1, 1, 0, 272, 553, '164.25', 12, 155, 0, 0, 0, 3, 3, 0, ''),
(5, 1, 2, 1, 0, 'Artemis', '', 'bought', 0, 1, 0, 251, 72, '257.49', 20, 165, 0, 0, 0, 3, 3, 0, ''),
(25, 1, 2, 0, 0, 'Flight', '', 'deployed', 0, 2, 0, 353, -122, '179.63', 0, 180, 0, 0, 0, 3, 3, 0, ''),
(26, 1, 2, 0, 0, 'Flight', '', 'deployed', 0, 2, 0, 353, 468, '227.92', 0, 270, 0, 0, 0, 3, 3, 0, ''),
(27, 2, 1, 1, 0, 'Omega', '', 'bought', 1, 1, 0, -545, 65, '0.00', 0, 140, 0, 0, 0, 1, 3, 0, ''),
(28, 2, 2, 1, 0, 'Altarian', '', 'bought', 1, 1, 0, 456, -46, '180.00', 0, 165, 0, 0, 0, 1, 3, 0, ''),
(29, 2, 1, 0, 0, 'Flight', '', 'deployed', 0, 2, 0, -545, 65, '0.00', 0, 0, 0, 0, 0, 2, -1, 0, ''),
(30, 3, 1, 1, 0, 'Omega', '', 'bought', 1, 1, 0, -545, 546, '0.00', 0, 140, 0, 0, 0, 1, 3, 0, ''),
(31, 3, 1, 1, 0, 'GQuan', '', 'bought', 1, 1, 0, -454, 20, '0.00', 0, 155, 0, 0, 0, 1, 3, 0, ''),
(32, 3, 2, 1, 0, 'Hyperion', '', 'bought', 0, 1, 0, 490, 36, '180.00', 0, 155, 0, 0, 0, 1, 3, 0, ''),
(33, 3, 2, 1, 0, 'Artemis', '', 'bought', 1, 1, 0, 484, 126, '180.00', 0, 165, 0, 0, 0, 1, 3, 0, '');

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
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=95;
--
-- AUTO_INCREMENT für Tabelle `chat`
--
ALTER TABLE `chat`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `damages`
--
ALTER TABLE `damages`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=775;
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
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;
--
-- AUTO_INCREMENT für Tabelle `games`
--
ALTER TABLE `games`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT für Tabelle `loads`
--
ALTER TABLE `loads`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
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
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=210;
--
-- AUTO_INCREMENT für Tabelle `reinforcements`
--
ALTER TABLE `reinforcements`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `sensors`
--
ALTER TABLE `sensors`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
--
-- AUTO_INCREMENT für Tabelle `subunits`
--
ALTER TABLE `subunits`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT für Tabelle `systemcrits`
--
ALTER TABLE `systemcrits`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=310;
--
-- AUTO_INCREMENT für Tabelle `units`
--
ALTER TABLE `units`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;
--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

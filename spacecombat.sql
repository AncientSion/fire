-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 06. Nov 2016 um 20:41
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
-- Tabellenstruktur für Tabelle `damages`
--

CREATE TABLE `damages` (
  `id` int(5) NOT NULL,
  `fireid` int(5) DEFAULT NULL,
  `gameid` int(5) DEFAULT NULL,
  `shipid` int(5) DEFAULT NULL,
  `structureid` int(5) DEFAULT NULL,
  `turn` int(3) DEFAULT NULL,
  `roll` int(3) DEFAULT NULL,
  `type` varchar(20) DEFAULT NULL,
  `totalDmg` int(5) DEFAULT NULL,
  `shieldDmg` int(5) DEFAULT NULL,
  `structDmg` int(5) DEFAULT NULL,
  `armourDmg` int(3) DEFAULT NULL,
  `mitigation` decimal(10,0) DEFAULT NULL,
  `destroyed` tinyint(1) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `new` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `damages`
--

INSERT INTO `damages` (`id`, `fireid`, `gameid`, `shipid`, `structureid`, `turn`, `roll`, `type`, `totalDmg`, `shieldDmg`, `structDmg`, `armourDmg`, `mitigation`, `destroyed`, `notes`, `new`) VALUES
(50, 60, 1, 4, 5, 1, 6, 'Laser', 400, 0, 120, 280, '70', 0, '', 0),
(51, 61, 1, 4, 5, 1, 68, 'Laser', 400, 0, 152, 248, '62', 0, '', 0),
(52, 62, 1, 4, 5, 1, 1, 'Particle', 73, 0, 34, 39, '53', 0, '', 0),
(53, 62, 1, 4, 5, 1, 77, 'Particle', 73, 0, 35, 38, '52', 0, '', 0),
(54, 62, 1, 4, 5, 1, 8, 'Particle', 73, 0, 36, 37, '50', 0, '', 0),
(55, 63, 1, 4, 5, 1, 14, 'Particle', 78, 0, 40, 38, '49', 0, '', 0),
(56, 63, 1, 4, 5, 1, 27, 'Particle', 78, 0, 41, 37, '47', 0, '', 0),
(57, 63, 1, 4, 5, 1, 12, 'Particle', 78, 0, 42, 36, '46', 0, '', 0),
(58, 64, 2, 6, 11, 1, 17, 'Laser', 489, 0, 196, 293, '60', 0, '', 0),
(59, 65, 2, 6, 11, 1, 62, 'Laser', 402, 0, 201, 201, '50', 0, '', 0),
(60, 68, 2, 7, 11, 1, 72, 'Laser', 474, 0, 190, 284, '60', 0, '', 0),
(61, 69, 2, 7, 11, 1, 62, 'Laser', 434, 0, 213, 221, '51', 0, '', 0),
(62, 70, 2, 7, 11, 1, 31, 'Laser', 466, 0, 270, 196, '42', 0, '', 0),
(63, 71, 2, 7, 11, 1, 61, 'Laser', 452, 0, 303, 149, '33', 0, '', 0),
(64, 76, 2, 9, 1, 1, 30, 'Laser', 400, 0, 60, 340, '85', 0, '', 0),
(65, 81, 2, 9, 1, 1, 41, 'Particle', 64, 0, 12, 52, '81', 0, '', 0),
(66, 81, 2, 9, 1, 1, 23, 'Particle', 64, 0, 13, 51, '80', 0, '', 0),
(67, 82, 2, 9, 1, 1, 6, 'Particle', 71, 0, 14, 57, '80', 0, '', 0),
(68, 82, 2, 9, 1, 1, 86, 'Particle', 71, 0, 15, 56, '79', 0, '', 0),
(69, 83, 2, 9, 1, 1, 81, 'Particle', 67, 0, 15, 52, '78', 0, '', 0),
(70, 83, 2, 9, 1, 1, 11, 'Particle', 67, 0, 15, 52, '78', 0, '', 0),
(71, 84, 2, 9, 1, 1, 44, 'Laser', 400, 0, 92, 308, '77', 0, '', 0),
(72, 86, 2, 12, 1, 1, 26, 'Particle', 71, 0, 21, 50, '70', 0, '', 0),
(73, 88, 2, 12, 1, 1, 7, 'Particle', 79, 0, 27, 52, '66', 0, '', 0),
(74, 89, 2, 9, 1, 1, 68, 'Particle', 71, 0, 19, 52, '73', 0, '', 0),
(75, 89, 2, 9, 1, 1, 1, 'Particle', 71, 0, 19, 52, '73', 0, '', 0),
(76, 89, 2, 9, 1, 1, 20, 'Particle', 71, 0, 20, 51, '72', 0, '', 0),
(77, 90, 2, 9, 1, 1, 70, 'Particle', 65, 0, 19, 46, '71', 0, '', 0),
(78, 91, 2, 9, 1, 1, 85, 'Particle', 63, 0, 18, 45, '71', 0, '', 0),
(79, 94, 2, 12, 7, 1, 32, 'Particle', 68, 0, 20, 48, '70', 0, '', 0),
(80, 96, 2, 12, 1, 2, 57, 'Particle', 68, 0, 26, 42, '62', 0, '', 0),
(81, 97, 2, 12, 1, 2, 15, 'Particle', 74, 0, 31, 43, '58', 0, '', 0),
(82, 97, 2, 12, 1, 2, 56, 'Particle', 74, 0, 34, 40, '54', 0, '', 0),
(83, 98, 2, 12, 1, 2, 37, 'Laser', 400, 0, 204, 196, '49', 0, '', 0),
(84, 99, 2, 9, 1, 2, 98, 'Particle', 68, 0, 20, 48, '70', 0, '', 0),
(85, 99, 2, 9, 1, 2, 42, 'Particle', 68, 0, 21, 47, '69', 0, '', 0),
(86, 99, 2, 9, 1, 2, 38, 'Particle', 68, 0, 21, 47, '69', 0, '', 0),
(87, 100, 2, 9, 1, 2, 35, 'Particle', 62, 0, 20, 42, '68', 0, '', 0),
(88, 100, 2, 9, 1, 2, 18, 'Particle', 62, 0, 20, 42, '67', 0, '', 0),
(89, 100, 2, 9, 1, 2, 70, 'Particle', 62, 0, 20, 42, '67', 0, '', 0),
(90, 101, 2, 9, 1, 2, 61, 'Particle', 60, 0, 20, 40, '66', 0, '', 0),
(91, 101, 2, 9, 1, 2, 71, 'Particle', 60, 0, 20, 40, '66', 0, '', 0),
(92, 101, 2, 9, 1, 2, 67, 'Particle', 60, 0, 21, 39, '65', 0, '', 0),
(93, 103, 2, 12, 4, 2, 33, 'Particle', 78, 0, 23, 55, '70', 0, '', 0),
(94, 106, 2, 9, 1, 2, 73, 'Particle', 61, 0, 22, 39, '64', 0, '', 0),
(95, 106, 2, 9, 1, 2, 51, 'Particle', 61, 0, 22, 39, '64', 0, '', 0),
(96, 106, 2, 9, 1, 2, 96, 'Particle', 61, 0, 23, 38, '63', 0, '', 0),
(97, 107, 2, 9, 1, 2, 95, 'Particle', 69, 0, 26, 43, '63', 0, '', 0),
(98, 107, 2, 9, 1, 2, 62, 'Particle', 69, 0, 26, 43, '62', 0, '', 0),
(99, 107, 2, 9, 1, 2, 14, 'Particle', 69, 0, 27, 42, '61', 0, '', 0),
(100, 108, 2, 9, 1, 2, 36, 'Particle', 80, 0, 31, 49, '61', 0, '', 0),
(101, 108, 2, 9, 1, 2, 37, 'Particle', 80, 0, 32, 48, '60', 0, '', 0),
(102, 108, 2, 9, 1, 2, 50, 'Particle', 80, 0, 33, 47, '59', 0, '', 0),
(103, 109, 2, 11, 4, 2, 48, 'Particle', 71, 0, 21, 50, '70', 0, '', 0),
(104, 112, 2, 7, 11, 2, 62, 'Laser', 500, 0, 385, 115, '23', 0, '', 0),
(105, 113, 2, 7, 11, 2, 46, 'Laser', 407, 0, 362, 45, '11', 0, '', 0),
(106, 115, 2, 7, 11, 2, 60, 'Particle', 93, 0, 0, 0, '0', 0, '', 0),
(107, 116, 2, 6, 4, 2, NULL, 'Particle', 60, 0, 24, 36, '60', 0, '', 0),
(108, 116, 2, 6, 4, 2, NULL, 'Particle', 60, 0, 25, 35, '59', 0, '', 0),
(109, 116, 2, 6, 4, 2, NULL, 'Particle', 60, 0, 25, 35, '58', 0, '', 0),
(110, 116, 2, 6, 4, 2, NULL, 'Particle', 60, 0, 26, 34, '57', 0, '', 0),
(111, 116, 2, 6, 4, 2, NULL, 'Particle', 60, 0, 26, 34, '56', 0, '', 0),
(112, 116, 2, 6, 4, 2, NULL, 'Particle', 60, 0, 27, 33, '55', 0, '', 0),
(113, 117, 2, 6, 4, 2, NULL, 'Particle', 55, 0, 26, 29, '53', 0, '', 0),
(114, 117, 2, 6, 4, 2, NULL, 'Particle', 55, 0, 26, 29, '52', 0, '', 0),
(115, 117, 2, 6, 4, 2, NULL, 'Particle', 55, 0, 27, 28, '51', 0, '', 0),
(116, 117, 2, 6, 4, 2, NULL, 'Particle', 55, 0, 27, 28, '50', 0, '', 0),
(117, 117, 2, 6, 4, 2, NULL, 'Particle', 55, 0, 28, 27, '49', 0, '', 0),
(118, 117, 2, 6, 4, 2, NULL, 'Particle', 55, 0, 29, 26, '48', 0, '', 0),
(119, 118, 2, 6, 4, 2, NULL, 'Particle', 51, 0, 27, 24, '47', 0, '', 0),
(120, 118, 2, 6, 4, 2, NULL, 'Particle', 51, 0, 27, 24, '47', 0, '', 0),
(121, 118, 2, 6, 4, 2, NULL, 'Particle', 51, 0, 28, 23, '46', 0, '', 0),
(122, 118, 2, 6, 4, 2, NULL, 'Particle', 51, 0, 28, 23, '45', 0, '', 0),
(123, 118, 2, 6, 4, 2, NULL, 'Particle', 51, 0, 29, 22, '44', 0, '', 0),
(124, 118, 2, 6, 4, 2, NULL, 'Particle', 51, 0, 29, 22, '43', 0, '', 0);

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
  `req` int(3) NOT NULL DEFAULT '0',
  `notes` varchar(255) NOT NULL DEFAULT '0',
  `hits` int(3) NOT NULL DEFAULT '0',
  `resolved` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `fireorders`
--

INSERT INTO `fireorders` (`id`, `gameid`, `turn`, `shooterid`, `targetid`, `weaponid`, `req`, `notes`, `hits`, `resolved`) VALUES
(60, 1, 1, 1, 4, 2, 91, '0', 1, 1),
(61, 1, 1, 1, 4, 3, 91, '0', 1, 1),
(62, 1, 1, 1, 4, 17, 77, '0', 3, 1),
(63, 1, 1, 1, 4, 18, 77, '0', 3, 1),
(64, 2, 1, 9, 6, 2, 74, '0', 1, 1),
(65, 2, 1, 9, 6, 3, 74, '0', 1, 1),
(66, 2, 1, 9, 7, 4, 24, '0', 0, 1),
(67, 2, 1, 9, 7, 5, 24, '0', 0, 1),
(68, 2, 1, 9, 7, 7, 74, '0', 1, 1),
(69, 2, 1, 9, 7, 8, 74, '0', 1, 1),
(70, 2, 1, 10, 7, 2, 74, '0', 1, 1),
(71, 2, 1, 10, 7, 6, 74, '0', 1, 1),
(72, 2, 1, 11, 7, 5, 22, 'salvo miss', 0, 1),
(73, 2, 1, 11, 7, 6, 22, 'salvo miss', 0, 1),
(74, 2, 1, 12, 7, 5, 33, 'salvo miss', 0, 1),
(75, 2, 1, 12, 7, 6, 33, 'salvo miss', 0, 1),
(76, 2, 1, 6, 9, 2, 118, '0', 1, 1),
(77, 2, 1, 6, 12, 3, 29, '0', 0, 1),
(78, 2, 1, 6, 12, 5, 1, '0', 0, 1),
(79, 2, 1, 6, 12, 6, 1, '0', 0, 1),
(80, 2, 1, 6, 12, 7, 1, '0', 0, 1),
(81, 2, 1, 6, 9, 12, 72, '0', 2, 1),
(82, 2, 1, 6, 9, 13, 72, '0', 2, 1),
(83, 2, 1, 6, 9, 14, 72, '0', 2, 1),
(84, 2, 1, 7, 9, 2, 118, '0', 1, 1),
(85, 2, 1, 7, 12, 3, 34, '0', 0, 1),
(86, 2, 1, 7, 12, 5, 11, '0', 1, 1),
(87, 2, 1, 7, 12, 6, 11, '0', 0, 1),
(88, 2, 1, 7, 12, 7, 11, '0', 1, 1),
(89, 2, 1, 7, 9, 12, 73, '0', 3, 1),
(90, 2, 1, 7, 9, 13, 73, '0', 1, 1),
(91, 2, 1, 7, 9, 14, 73, '0', 1, 1),
(92, 2, 1, 8, 12, 2, 32, '0', 0, 1),
(93, 2, 1, 8, 12, 3, 32, '0', 0, 1),
(94, 2, 1, 8, 12, 7, 32, '0', 1, 1),
(95, 2, 2, 6, 12, 5, 32, '0', 0, 1),
(96, 2, 2, 6, 12, 6, 32, '0', 1, 1),
(97, 2, 2, 6, 12, 7, 32, '0', 2, 1),
(98, 2, 2, 6, 12, 9, 45, '0', 1, 1),
(99, 2, 2, 6, 9, 12, 113, '0', 3, 1),
(100, 2, 2, 6, 9, 13, 113, '0', 3, 1),
(101, 2, 2, 6, 9, 14, 113, '0', 3, 1),
(102, 2, 2, 7, 12, 5, 31, '0', 0, 1),
(103, 2, 2, 7, 12, 6, 31, '0', 1, 1),
(104, 2, 2, 7, 12, 7, 31, '0', 0, 1),
(105, 2, 2, 7, 12, 9, 45, '0', 0, 1),
(106, 2, 2, 7, 9, 12, 107, '0', 3, 1),
(107, 2, 2, 7, 9, 13, 107, '0', 3, 1),
(108, 2, 2, 7, 9, 14, 107, '0', 3, 1),
(109, 2, 2, 8, 11, 7, 34, '0', 1, 1),
(110, 2, 2, 9, 7, 4, 54, '0', 0, 1),
(111, 2, 2, 9, 7, 5, 54, '0', 0, 1),
(112, 2, 2, 9, 7, 12, 82, '0', 1, 1),
(113, 2, 2, 9, 7, 13, 82, '0', 1, 1),
(114, 2, 2, 9, 7, 14, 54, '0', 0, 1),
(115, 2, 2, 9, 7, 15, 54, '0', 1, 1),
(116, 2, 2, 11, 6, 5, 69, 'salvo hit', 6, 1),
(117, 2, 2, 11, 6, 6, 69, 'salvo hit', 6, 1),
(118, 2, 2, 12, 6, 5, 63, 'salvo hit', 6, 1),
(119, 2, 2, 12, 6, 6, 63, 'salvo miss', 0, 1);

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
(1, 'Test1', 'active', 1, 2, 5000, 500),
(2, 'new2', 'active', 3, 1, 5000, 500);

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
(1, 1, 1, 1, 3, 'waiting'),
(2, 2, 1, 1, 3, 'waiting'),
(3, 1, 2, 3, 1, 'waiting'),
(4, 2, 2, 3, 1, 'waiting');

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
(1, 1, 1, 3200, 'Earth Alliance'),
(2, 1, 2, 3300, 'Minbari Federation'),
(3, 2, 1, 150, 'Earth Alliance'),
(4, 2, 2, 400, 'Minbari Federation');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `reinforcements`
--

CREATE TABLE `reinforcements` (
  `id` int(3) NOT NULL,
  `gameid` int(3) DEFAULT NULL,
  `userid` int(5) DEFAULT NULL,
  `shipClass` varchar(255) DEFAULT NULL,
  `turn` int(3) DEFAULT NULL,
  `arrival` int(3) DEFAULT NULL,
  `cost` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `reinforcements`
--

INSERT INTO `reinforcements` (`id`, `gameid`, `userid`, `shipClass`, `turn`, `arrival`, `cost`) VALUES
(11, 2, 2, 'Tinashi', 3, 3, 1100);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `shipactions`
--

CREATE TABLE `shipactions` (
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
-- Daten für Tabelle `shipactions`
--

INSERT INTO `shipactions` (`id`, `shipid`, `turn`, `type`, `dist`, `x`, `y`, `a`, `cost`, `delay`, `costmod`, `resolved`) VALUES
(16, 1, 1, 'deploy', 0, 450, 83, 0, 0, 0, 1, 1),
(17, 2, 1, 'deploy', 0, 395, 239, 0, 0, 0, 1, 1),
(18, 3, 1, 'deploy', 0, 376, 472, 0, 0, 0, 1, 1),
(19, 4, 1, 'deploy', 0, 928, 53, 180, 0, 0, 1, 1),
(20, 5, 1, 'deploy', 0, 868, 322, 180, 0, 0, 1, 1),
(21, 1, 1, 'move', 114, 564, 68, 0, 0, 0, 1, 1),
(22, 1, 1, 'turn', 0, 564, 68, 30, 298, 123, 1.8, 1),
(23, 1, 1, 'move', 86, 638, 111, 0, 0, 0, 1, 1),
(24, 2, 1, 'speedChange', -1, 395, 239, 0, 19, 0, 1, 1),
(25, 2, 1, 'move', 180, 575, 239, 0, 0, 0, 1, 1),
(26, 3, 1, 'turn', 0, 376, 472, -30, 9, 39, 1, 1),
(27, 3, 1, 'move', 39, 410, 453, 0, 0, 0, 1, 1),
(28, 3, 1, 'turn', 0, 410, 453, -30, 9, 39, 1, 1),
(29, 3, 1, 'move', 40, 430, 419, 0, 0, 0, 1, 1),
(30, 3, 1, 'move', 122, 491, 314, 0, 0, 0, 1, 1),
(31, 4, 1, 'turn', 0, 928, 53, -30, 135, 95, 1, 1),
(32, 4, 1, 'move', 96, 846, 101, 0, 0, 0, 1, 1),
(33, 4, 1, 'turn', 0, 846, 101, -30, 135, 95, 1.2, 1),
(34, 4, 1, 'move', 104, 794, 191, 0, 0, 0, 1, 1),
(35, 5, 1, 'turn', 0, 868, 322, -30, 28, 58, 1, 1),
(36, 5, 1, 'move', 58, 818, 351, 0, 0, 0, 1, 1),
(37, 5, 1, 'move', 42, 780, 370, 0, 0, 0, 1, 1),
(38, 5, 1, 'turn', 0, 780, 370, 30, 28, 58, 1, 1),
(39, 5, 1, 'move', 58, 722, 370, 0, 0, 0, 1, 1),
(40, 5, 1, 'turn', 0, 722, 370, 30, 28, 58, 1.6, 1),
(41, 5, 1, 'move', 42, 686, 349, 0, 0, 0, 1, 1),
(42, 5, 1, 'turn', 0, 686, 349, 30, 28, 58, 2, 1),
(43, 9, 1, 'deploy', 0, 984, 70, 180, 0, 0, 1, 1),
(44, 10, 1, 'deploy', 0, 1042, 149, 180, 0, 0, 1, 1),
(45, 11, 1, 'deploy', 0, 849, 750, 210, 0, 0, 1, 1),
(46, 12, 1, 'deploy', 0, 776, 774, 210, 0, 0, 1, 1),
(47, 6, 1, 'deploy', 0, 159, 427, 0, 0, 0, 1, 1),
(48, 7, 1, 'deploy', 0, 204, 464, 0, 0, 0, 1, 1),
(49, 8, 1, 'deploy', 0, 325, 746, 0, 0, 0, 1, 1),
(50, 6, 1, 'move', 200, 359, 427, 0, 0, 0, 1, 1),
(51, 7, 1, 'move', 200, 404, 464, 0, 0, 0, 1, 1),
(52, 8, 1, 'turn', 0, 325, 746, 30, 9, 56, 1, 1),
(53, 8, 1, 'move', 158, 468, 815, 0, 0, 0, 1, 1),
(54, 8, 1, 'turn', 0, 468, 815, -30, 9, 56, 2.4, 1),
(55, 8, 1, 'move', 42, 510, 815, 0, 0, 0, 1, 1),
(56, 9, 1, 'move', 174, 812, 43, 0, 0, 0, 1, 1),
(57, 9, 1, 'turn', 0, 812, 43, -30, 429, 226, 1.8, 1),
(58, 9, 1, 'move', 27, 789, 56, 0, 0, 0, 1, 1),
(59, 10, 1, 'turn', 0, 1042, 149, 30, 135, 150, 1, 1),
(60, 10, 1, 'move', 150, 901, 97, 0, 0, 0, 1, 1),
(61, 10, 1, 'turn', 0, 901, 97, -30, 135, 150, 1, 1),
(62, 10, 1, 'move', 50, 851, 97, 0, 0, 0, 1, 1),
(63, 11, 1, 'move', 200, 676, 650, 0, 0, 0, 1, 1),
(64, 12, 1, 'move', 200, 603, 674, 0, 0, 0, 1, 1),
(65, 9, 2, 'move', 200, 616, 156, 0, 0, 0, 1, 1),
(66, 10, 2, 'move', 200, 651, 97, 0, 0, 0, 1, 1),
(67, 10, 2, 'turn', 0, 651, 97, -30, 135, 150, 2.2, 1),
(68, 11, 2, 'move', 127, 560, 598, 0, 0, 0, 1, 1),
(69, 11, 2, 'turn', 0, 560, 598, 30, 22, 78, 1.6, 1),
(70, 11, 2, 'move', 73, 524, 535, 0, 0, 0, 1, 1),
(71, 11, 2, 'turn', 0, 524, 535, 30, 22, 78, 1.6, 1),
(72, 12, 2, 'move', 113, 503, 620, 0, 0, 0, 1, 1),
(73, 12, 2, 'turn', 0, 503, 620, 30, 22, 78, 1.4, 1),
(74, 12, 2, 'move', 87, 459, 545, 0, 0, 0, 1, 1),
(75, 12, 2, 'turn', 0, 459, 545, 30, 22, 78, 1.4, 1),
(76, 6, 2, 'move', 200, 559, 427, 0, 0, 0, 1, 1),
(77, 7, 2, 'move', 200, 604, 464, 0, 0, 0, 1, 1),
(78, 8, 2, 'turn', 0, 510, 815, -30, 9, 56, 1.6, 1),
(79, 8, 2, 'move', 35, 540, 798, 0, 0, 0, 1, 1),
(80, 8, 2, 'turn', 0, 540, 798, -30, 9, 56, 1.8, 1),
(81, 8, 2, 'move', 166, 623, 655, 0, 0, 0, 1, 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `ships`
--

CREATE TABLE `ships` (
  `id` int(3) NOT NULL,
  `gameid` int(3) DEFAULT NULL,
  `userid` int(3) DEFAULT NULL,
  `shipClass` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `available` int(3) DEFAULT NULL,
  `destroyed` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `ships`
--

INSERT INTO `ships` (`id`, `gameid`, `userid`, `shipClass`, `status`, `available`, `destroyed`) VALUES
(1, 1, 1, 'Omega', 'deployed', 1, 0),
(2, 1, 1, 'Tethys', 'deployed', 1, 0),
(3, 1, 1, 'Tethys', 'deployed', 1, 0),
(4, 1, 2, 'Tinashi', 'deployed', 1, 0),
(5, 1, 2, 'WhiteStar', 'deployed', 1, 0),
(6, 2, 1, 'Hyperion', 'deployed', 1, 0),
(7, 2, 1, 'Hyperion', 'deployed', 1, 0),
(8, 2, 1, 'Tethys', 'deployed', 1, 0),
(9, 2, 2, 'Sharlin', 'deployed', 1, 0),
(10, 2, 2, 'Tinashi', 'deployed', 1, 0),
(11, 2, 2, 'WhiteStar', 'deployed', 1, 0),
(12, 2, 2, 'WhiteStar', 'deployed', 1, 0),
(17, 2, 1, 'Omega', 'bought', 6, 0),
(18, 2, 1, 'Hyperion', 'bought', 7, 0),
(19, 2, 1, 'Tethys', 'bought', 5, 0),
(20, 2, 2, 'WhiteStar', 'bought', 7, 0),
(21, 2, 2, 'Sharlin', 'bought', 6, 0);

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
(1, 'Chris', '147147', 0),
(2, '1', '147147', 0);

--
-- Indizes der exportierten Tabellen
--

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
-- Indizes für die Tabelle `shipactions`
--
ALTER TABLE `shipactions`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `ships`
--
ALTER TABLE `ships`
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
-- AUTO_INCREMENT für Tabelle `damages`
--
ALTER TABLE `damages`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=125;
--
-- AUTO_INCREMENT für Tabelle `fireorders`
--
ALTER TABLE `fireorders`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=120;
--
-- AUTO_INCREMENT für Tabelle `games`
--
ALTER TABLE `games`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
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
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT für Tabelle `shipactions`
--
ALTER TABLE `shipactions`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;
--
-- AUTO_INCREMENT für Tabelle `ships`
--
ALTER TABLE `ships`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

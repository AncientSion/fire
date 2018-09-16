-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 16. Sep 2018 um 20:25
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
(1, 6, 1, 'deploy', 0, 0, 414, 196, '180.00', 0, 0, 1, 1),
(2, 5, 1, 'deploy', 0, 0, 528, -23, '180.00', 0, 0, 1, 1),
(3, 7, 1, 'deploy', 0, 0, 495, 488, '180.00', 0, 0, 1, 1),
(4, 4, 1, 'deploy', 0, 0, -547, 237, '0.00', 0, 0, 1, 1),
(5, 1, 1, 'deploy', 0, 0, -471, -89, '0.00', 0, 0, 1, 1),
(6, 2, 1, 'deploy', 0, 0, -503, 576, '0.00', 0, 0, 1, 1),
(7, 3, 1, 'deploy', 0, 0, -446, 673, '0.00', 0, 0, 1, 1),
(8, 1, 1, 'jumpIn', 0, 0, -471, -89, '0.00', 0, 0, 0, 1),
(9, 2, 1, 'jumpIn', 0, 0, -503, 576, '0.00', 0, 0, 0, 1),
(10, 3, 1, 'jumpIn', 0, 0, -446, 673, '0.00', 0, 0, 0, 1),
(11, 4, 1, 'jumpIn', 0, 0, -547, 237, '0.00', 0, 0, 0, 1),
(12, 5, 1, 'jumpIn', 0, 0, 528, -23, '0.00', 0, 0, 0, 1),
(13, 6, 1, 'jumpIn', 0, 0, 414, 196, '0.00', 0, 0, 0, 1),
(14, 7, 1, 'jumpIn', 0, 0, 495, 488, '0.00', 0, 0, 0, 1),
(15, 4, 1, 'turn', 0, 0, -547, 237, '-1.51', 2, 5, 1, 1),
(16, 4, 1, 'move', 0, 155, -392, 233, '0.00', 0, 0, 1, 1),
(17, 1, 1, 'turn', 0, 0, -471, -89, '-13.35', 14, 39, 1, 1),
(18, 1, 1, 'move', 0, 151, -336, -157, '0.00', 0, 0, 1, 1),
(19, 1, 1, 'turn', 0, 0, -336, -157, '30.00', 56, 12, 1, 1),
(20, 1, 1, 'move', 0, 4, -332, -156, '0.00', 0, 0, 1, 1),
(21, 2, 1, 'move', 0, 165, -339, 556, '0.00', 0, 0, 1, 1),
(22, 3, 1, 'move', 0, 165, -285, 709, '0.00', 0, 0, 1, 1),
(23, 6, 1, 'move', 0, 155, 259, 196, '0.00', 0, 0, 1, 1),
(24, 5, 1, 'turn', 0, 0, 528, -23, '-30.00', 30, 65, 1, 1),
(25, 5, 1, 'move', 0, 65, 472, 9, '0.00', 0, 0, 1, 1),
(26, 5, 1, 'turn', 0, 0, 472, 9, '20.30', 21, 44, 1, 1),
(27, 5, 1, 'move', 0, 100, 373, 26, '0.00', 0, 0, 1, 1),
(28, 7, 1, 'turn', 0, 0, 495, 488, '-8.30', 9, 13, 1, 1),
(29, 7, 1, 'move', 0, 185, 312, 515, '0.00', 0, 0, 1, 1),
(35, 20, 2, 'deploy', 0, 0, -332, -156, '0.00', 1, 0, 1, 1),
(36, 13, 5, 'deploy', 0, 0, 274, 981, '229.39', 0, 0, 1, 1),
(42, 4, 2, 'turn', 0, 0, -392, 233, '-13.34', 14, 43, 1, 1),
(43, 4, 2, 'move', 0, 155, -242, 193, '0.00', 0, 0, 1, 1),
(44, 1, 2, 'move', 0, 155, -183, -112, '0.00', 0, 0, 1, 1),
(45, 2, 2, 'move', 0, 165, -174, 556, '0.00', 0, 0, 1, 1),
(46, 3, 2, 'move', 0, 165, -120, 709, '0.00', 0, 0, 1, 1),
(47, 3, 2, 'turn', 0, 0, -120, 709, '-21.67', 44, 0, 1, 1),
(48, 6, 2, 'move', 0, 155, 104, 196, '0.00', 0, 0, 1, 1),
(49, 6, 2, 'turn', 0, 0, 104, 196, '-5.98', 12, 0, 1, 1),
(50, 5, 2, 'turn', 0, 0, 373, 26, '25.91', 26, 56, 1, 1),
(51, 5, 2, 'move', 0, 165, 215, -20, '0.00', 0, 0, 1, 1),
(52, 7, 2, 'move', 0, 185, 129, 542, '0.00', 0, 0, 1, 1),
(53, 20, 2, 'move', 0, 100, -235, -132, '13.96', 0, 0, 0, 1),
(54, 20, 2, 'move', 0, 100, -235, -132, '13.96', 0, 0, 0, 1),
(55, 6, 3, 'turn', 0, 0, 104, 196, '30.00', 30, 97, 1, 0),
(56, 6, 3, 'move', 0, 155, -38, 133, '0.00', 0, 0, 1, 0),
(57, 6, 3, 'turn', 0, 0, -38, 133, '-9.38', 20, 0, 1, 0),
(58, 5, 3, 'turn', 0, 0, 215, -20, '-30.00', 30, 65, 1, 0),
(59, 5, 3, 'move', 0, 165, 55, 19, '0.00', 0, 0, 1, 0),
(60, 7, 3, 'turn', 0, 0, 129, 542, '45.00', 45, 66, 1, 0),
(61, 7, 3, 'move', 0, 185, -19, 431, '0.00', 0, 0, 1, 0),
(62, 7, 3, 'turn', 0, 0, -19, 431, '45.00', 90, 0, 1, 0),
(63, 4, 3, 'turn', 0, 0, -242, 193, '30.00', 30, 95, 1, 0),
(64, 4, 3, 'move', 0, 95, -150, 218, '0.00', 0, 0, 1, 0),
(65, 4, 3, 'turn', 0, 0, -150, 218, '30.00', 42, 60, 1, 0),
(66, 4, 3, 'move', 0, 60, -108, 261, '0.00', 0, 0, 1, 0),
(67, 1, 3, 'turn', 0, 0, -183, -112, '30.00', 30, 86, 1, 0),
(68, 1, 3, 'move', 0, 155, -77, 1, '0.00', 0, 0, 1, 0),
(69, 1, 3, 'turn', 0, 0, -77, 1, '30.00', 40, 58, 1, 0),
(70, 2, 3, 'move', 0, 165, -9, 556, '0.00', 0, 0, 1, 0),
(71, 2, 3, 'turn', 0, 0, -9, 556, '-30.00', 60, 0, 1, 0);

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
(50, 11, 2, 4, 6, 1, 2, 0, 'Particle', 49, 0, 20, 0, 29, 0, 20, 0, 'p;', 0),
(51, 12, 2, 4, 6, 9, 2, 0, 'Particle', 46, 0, 15, 31, 0, 0, 15, 0, 'p;', 0),
(52, 14, 2, 6, 6, 1, 2, 0, 'Laser', 178, 0, 23, 0, 36, 0, 23, 0, 'p;', 0),
(53, 17, 2, 6, 6, 1, 2, 0, 'Particle', 36, 0, 11, 0, 25, 0, 22, 0, 'p;', 0),
(54, 14, 2, 6, 6, 2, 2, 0, 'Laser', 178, 0, 23, 20, 16, 0, 23, 0, 'p;c;', 0),
(55, 14, 2, 6, 6, 4, 2, 0, 'Laser', 178, 0, 22, 20, 17, 0, 22, 0, 'p;c;', 0),
(56, 18, 2, 6, 6, 4, 2, 0, 'Particle', 36, 0, 11, 20, 5, 0, 22, 0, 'p;c;', 0),
(57, 15, 2, 6, 6, 8, 2, 0, 'Laser', 115, 0, 13, 25, 0, 0, 13, 0, 'p;', 0),
(58, 15, 2, 6, 6, 9, 2, 0, 'Laser', 115, 0, 13, 25, 0, 0, 13, 0, 'p;', 0),
(59, 15, 2, 6, 6, 10, 2, 0, 'Laser', 115, 0, 13, 25, 0, 0, 13, 0, 'p;', 0),
(60, 20, 2, 6, 6, 10, 2, 0, 'Pulse', 29, 0, 20, 3, 0, 0, 13, 0, 'b;v2;', 0);

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
(1, 2, 1, 4, 6, 252, 197, 7, 1, 33, '63;', 0, 1),
(2, 2, 1, 1, 6, 252, 193, 13, 1, 47, '15;', 1, 1),
(3, 2, 1, 2, 6, 248, 200, 8, 2, 33, '52;49;', 0, 1),
(4, 2, 1, 3, 6, 253, 196, 8, 2, 31, '44;6;', 1, 1),
(5, 2, 1, 5, 4, -397, 237, 11, 1, 88, '86;', 1, 1),
(6, 2, 1, 5, 4, -397, 237, 16, 1, 88, '21;', 1, 1),
(7, 2, 1, 7, 2, -337, 558, 5, 1, 60, '52;', 1, 1),
(8, 2, 1, 7, 2, -337, 558, 10, 1, 60, '99;', 0, 1),
(9, 2, 2, 1, 0, 373, 24, 9, 0, 0, '', 0, 1),
(10, 2, 2, 6, 4, -239, 202, 8, 1, 53, '85;', 0, 1),
(11, 2, 2, 6, 4, -239, 202, 9, 1, 53, '1;', 1, 1),
(12, 2, 2, 6, 4, -239, 202, 10, 1, 53, '25;', 1, 1),
(13, 2, 2, 6, 4, -239, 202, 11, 1, 53, '95;', 0, 1),
(14, 2, 2, 4, 6, 100, 200, 9, 1, 63, '50;', 1, 1),
(15, 2, 2, 4, 6, 101, 197, 11, 1, 63, '58;', 1, 1),
(16, 2, 2, 4, 6, 101, 197, 13, 1, 42, '86;', 0, 1),
(17, 2, 2, 1, 6, 103, 197, 7, 2, 50, '47;70;', 1, 1),
(18, 2, 2, 1, 6, 103, 197, 11, 2, 50, '93;49;', 1, 1),
(19, 2, 2, 1, 6, 103, 197, 14, 1, 17, '18;', 0, 1),
(20, 2, 2, 1, 6, 103, 197, 15, 1, 17, '14;', 1, 1),
(21, 2, 2, 2, 7, 128, 539, 7, 2, 27, '76;82;', 0, 1),
(22, 2, 2, 2, 7, 128, 539, 9, 2, 27, '71;33;', 0, 1),
(23, 2, 2, 3, 7, 131, 543, 7, 2, 28, '69;40;', 0, 1),
(24, 2, 2, 3, 7, 131, 543, 9, 2, 28, '64;66;', 0, 1),
(25, 2, 3, 4, 0, 8, 213, 8, 0, 0, '', 0, 0);

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
(2, 'myGame', 'active', 3, 0, 3500, 1500, 2, 3, 5, 10),
(3, 'myGame', 'active', 1, -1, 3500, 1500, 11, 3, 10, 10),
(4, 'myGame', 'open', -1, -1, 3500, 1500, 11, 3, 10, 10);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `globals`
--

CREATE TABLE `globals` (
  `id` int(4) NOT NULL,
  `playerstatusid` int(4) DEFAULT '0',
  `unitid` int(3) NOT NULL DEFAULT '0',
  `turn` int(4) DEFAULT '0',
  `type` varchar(20) DEFAULT '',
  `scope` int(11) NOT NULL DEFAULT '0',
  `value` decimal(5,2) DEFAULT '0.00',
  `notes` varchar(20) NOT NULL DEFAULT '',
  `text` varchar(50) NOT NULL DEFAULT ''
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
(1, 20, '2', 2, 5, 373, 26, 0);

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
(2, 1, 2, 3, 0, 'Earth Alliance', 2605, 2115, 1540, 385, 1155, 'waiting'),
(3, 2, 2, 3, 0, 'Minbari Federation', 2530, 1690, 2000, 500, 1385, 'waiting'),
(4, 1, 3, 1, -1, 'Minbari Federation', 1150, 3850, 1540, 385, 385, 'waiting'),
(5, 2, 3, 1, -1, 'Narn Regime', 850, 4150, 1540, 385, 385, 'waiting'),
(6, 1, 4, -1, -1, '', 0, 3500, 0, 0, 0, 'joined');

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
(1, 7, 5, 1, '1', 3),
(2, 7, 10, 1, '1', 3),
(3, 4, 14, 1, '0', 0),
(4, 4, 16, 1, '0', 0),
(5, 4, 18, 1, '0', 0),
(6, 4, 23, 1, '0', 0),
(7, 1, 14, 1, '-1', 0),
(8, 1, 15, 1, '-1', 0),
(9, 1, 21, 1, '-1', 0),
(10, 1, 22, 1, '-1', 0),
(11, 2, 11, 1, '-1', 0),
(12, 2, 12, 1, '-1', 0),
(13, 2, 17, 1, '-1', 0),
(14, 2, 18, 1, '-1', 0),
(15, 3, 11, 1, '-1', 0),
(16, 3, 12, 1, '-1', 0),
(17, 3, 17, 1, '-1', 0),
(18, 3, 18, 1, '-1', 0),
(19, 4, 9, 2, '1', 5),
(20, 4, 11, 2, '1', 3),
(21, 4, 13, 2, '1', 3),
(22, 4, 14, 2, '0', 0),
(23, 4, 16, 2, '0', 0),
(24, 4, 18, 2, '0', 0),
(25, 4, 23, 2, '0', 0),
(26, 1, 14, 2, '-1', 0),
(27, 1, 15, 2, '-1', 0),
(28, 1, 20, 2, '1', 4),
(29, 1, 21, 2, '-1', 0),
(30, 1, 22, 2, '-1', 0),
(31, 2, 11, 2, '-1', 0),
(32, 2, 12, 2, '-1', 0),
(33, 2, 17, 2, '-1', 0),
(34, 2, 18, 2, '-1', 0),
(35, 2, 4, 2, '1', 3),
(36, 3, 11, 2, '-1', 0),
(37, 3, 12, 2, '-1', 0),
(38, 3, 17, 2, '-1', 0),
(39, 3, 18, 2, '-1', 0),
(40, 3, 4, 2, '1', 3),
(41, 6, 15, 3, '0', 0),
(42, 6, 16, 3, '0', 0),
(43, 6, 18, 3, '0', 0),
(44, 6, 19, 3, '0', 0),
(45, 4, 9, 3, '0', 0),
(46, 4, 14, 3, '0', 0),
(47, 4, 16, 3, '0', 0),
(48, 4, 18, 3, '0', 0),
(49, 4, 22, 3, '1', 3),
(50, 4, 23, 3, '0', 0),
(51, 4, 4, 3, '1', 3),
(52, 4, 4, 3, '1', 5),
(53, 1, 14, 3, '-1', 0),
(54, 1, 15, 3, '-1', 0),
(55, 1, 20, 3, '1', 4),
(56, 1, 21, 3, '-1', 0),
(57, 1, 22, 3, '-1', 0),
(58, 2, 11, 3, '-1', 0),
(59, 2, 12, 3, '-1', 0),
(60, 2, 17, 3, '-1', 0),
(61, 2, 18, 3, '-1', 0),
(62, 3, 11, 3, '-1', 0),
(63, 3, 12, 3, '-1', 0),
(64, 3, 17, 3, '-1', 0),
(65, 3, 18, 3, '-1', 0);

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
(1, 6, 4, 1, '0.08', 702, 1),
(2, 5, 4, 1, '360.00', 801, 0),
(3, 7, 2, 1, '359.71', 788, 0),
(4, 4, 4, 1, '358.70', 880, 0),
(5, 1, 4, 1, '-1.00', 102, 0),
(6, 2, 4, 1, '-1.00', 95, 0),
(7, 3, 4, 1, '-1.00', 95, 0),
(8, 4, 4, 2, '22.96', 439, 1),
(9, 1, 4, 2, '-1.00', 102, 0),
(10, 2, 4, 2, '359.54', 377, 0),
(11, 3, 4, 2, '359.19', 354, 0),
(12, 6, 4, 2, '0.58', 445, 0),
(13, 5, 4, 2, '0.21', 459, 1),
(14, 7, 2, 2, '358.92', 337, 1),
(15, -13, 2, 2, '-1.00', 102, 0),
(16, 6, 4, 3, '-1.00', 112, 0),
(17, 5, 4, 3, '50.71', 251, 0),
(18, 7, 2, 3, '349.68', 397, 0),
(19, 4, 4, 3, '323.53', 251, 1),
(20, 1, 4, 3, '327.84', 316, 1),
(21, 2, 4, 3, '259.61', 149, 0),
(22, 3, 4, 3, '-1.00', 95, 0);

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
(1, 7, 1, 'WhiteStar'),
(2, 7, 1, 'WhiteStar'),
(11, 13, 1, 'WhiteStar'),
(12, 13, 1, 'WhiteStar'),
(15, 20, 10, 'Aurora');

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
(1, 2, 9, 1, 'Damage', 0, '-30.00'),
(2, 4, 5, 1, 'Overload', 0, '-0.12'),
(3, 4, 9, 1, 'Damage', 0, '-30.00'),
(4, 6, 2, 1, '', 0, '0.00'),
(5, 6, 5, 1, 'Overload', 0, '-6.47'),
(6, 6, 11, 1, 'Damage', 0, '-30.00'),
(14, 6, 2, 2, 'Morale', 0, '-10.00'),
(15, 6, 4, 2, 'Output', 0, '-15.00'),
(16, 6, 10, 2, 'Damage', 0, '-30.00');

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
(1, 2, 1, 1, 0, 'Hyperion', '', 1055, 775, 'bought', 1, 1, 0, -183, -112, '16.65', 0, 155, 0, 0, 0, 2, 3, 0, ''),
(2, 2, 1, 1, 0, 'Artemis', '', 490, 490, 'bought', 0, 1, 0, -174, 556, '0.00', 0, 165, 0, 0, 0, 2, 3, 0, ''),
(3, 2, 1, 1, 0, 'Artemis', '', 490, 490, 'jumpOut', 0, 1, 1, -120, 709, '338.33', 0, 165, 0, 0, 0, 2, 3, 0, ''),
(4, 2, 1, 1, 0, 'GQuan', '', 850, 850, 'bought', 0, 1, 0, -242, 193, '345.15', 0, 155, 0, 0, 0, 2, 3, 0, ''),
(5, 2, 2, 1, 0, 'Tinashi', '', 600, 600, 'bought', 0, 1, 0, 215, -20, '196.21', 0, 165, 0, 0, 0, 2, 3, 0, ''),
(6, 2, 2, 1, 0, 'Tigara', '', 1150, 1150, 'bought', 1, 1, 0, 104, 196, '174.02', 0, 155, 0, 0, 0, 2, 3, 0, ''),
(7, 2, 2, 1, 0, 'Squadron', '', 780, 780, 'bought', 0, 1, 0, 129, 542, '171.70', 0, 185, 0, 0, 0, 2, 3, 0, ''),
(13, 2, 2, 1, 0, 'Squadron', '', 780, 0, 'bought', 0, 5, 0, 0, 0, '0.00', 0, 0, 0, 0, 0, 2, -1, 0, ''),
(18, 3, 2, 1, 0, 'GQuan', '', 850, 850, 'bought', 1, 1, 0, 0, 0, '0.00', 0, 0, 0, 0, 0, 0, 0, 0, ''),
(19, 3, 1, 1, 0, 'Tigara', '', 1150, 1150, 'bought', 1, 1, 0, 0, 0, '0.00', 0, 0, 0, 0, 0, 0, 0, 0, ''),
(20, 2, 1, 0, 0, 'Flight', '', 280, 280, 'deployed', 0, 2, 0, -235, -132, '13.96', 0, 200, 0, 0, 0, 2, 3, 0, '');

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
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;
--
-- AUTO_INCREMENT für Tabelle `chat`
--
ALTER TABLE `chat`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `damages`
--
ALTER TABLE `damages`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;
--
-- AUTO_INCREMENT für Tabelle `fireorders`
--
ALTER TABLE `fireorders`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
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
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `missions`
--
ALTER TABLE `missions`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT für Tabelle `playerstatus`
--
ALTER TABLE `playerstatus`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT für Tabelle `powers`
--
ALTER TABLE `powers`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;
--
-- AUTO_INCREMENT für Tabelle `sensors`
--
ALTER TABLE `sensors`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT für Tabelle `subunits`
--
ALTER TABLE `subunits`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT für Tabelle `systemcrits`
--
ALTER TABLE `systemcrits`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT für Tabelle `units`
--
ALTER TABLE `units`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

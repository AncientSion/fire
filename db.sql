-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 05. Aug 2018 um 21:38
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
(1, 3, 1, 'deploy', 0, -371, 231, '0.00', 0, 0, 1, 1),
(2, 2, 1, 'deploy', 0, -381, 647, '0.00', 0, 0, 1, 1),
(3, 1, 1, 'deploy', 0, -347, -103, '0.00', 0, 0, 1, 1),
(4, 6, 1, 'deploy', 0, 347, 253, '180.00', 0, 0, 1, 1),
(5, 5, 1, 'deploy', 0, 227, 651, '180.00', 0, 0, 1, 1),
(6, 4, 1, 'deploy', 0, 217, -121, '180.00', 0, 0, 1, 1),
(7, 1, 1, 'jumpIn', 0, -347, -103, '0.00', 0, 0, 0, 1),
(8, 2, 1, 'jumpIn', 0, -381, 647, '0.00', 0, 0, 0, 1),
(9, 3, 1, 'jumpIn', 0, -371, 231, '0.00', 0, 0, 0, 1),
(10, 4, 1, 'jumpIn', 0, 217, -121, '0.00', 0, 0, 0, 1),
(11, 5, 1, 'jumpIn', 0, 227, 651, '0.00', 0, 0, 0, 1),
(12, 6, 1, 'jumpIn', 0, 347, 253, '0.00', 0, 0, 0, 1),
(13, 3, 1, 'turn', 0, -371, 231, '1.80', 2, 6, 1, 1),
(14, 3, 1, 'move', 155, -216, 236, '0.00', 0, 0, 1, 1),
(15, 2, 1, 'turn', 0, -381, 647, '0.55', 1, 2, 1, 1),
(16, 2, 1, 'move', 165, -216, 649, '0.00', 0, 0, 1, 1),
(17, 1, 1, 'speed', -1, -347, -103, '0.00', 30, 0, 1, 1),
(18, 1, 1, 'speed', -1, -347, -103, '0.00', 30, 0, 1, 1),
(19, 1, 1, 'move', 125, -222, -103, '0.00', 0, 0, 1, 1),
(20, 1, 1, 'turn', 0, -222, -103, '-2.37', 4, 0, 1, 1),
(21, 6, 1, 'move', 155, 192, 253, '0.00', 0, 0, 1, 1),
(22, 5, 1, 'turn', 0, 227, 651, '-24.53', 25, 53, 1, 1),
(23, 5, 1, 'move', 165, 77, 720, '0.00', 0, 0, 1, 1),
(24, 5, 1, 'turn', 0, 77, 720, '30.00', 60, 0, 1, 1),
(25, 4, 1, 'move', 163, 59, -162, '0.00', 0, 0, 1, 1),
(26, 4, 1, 'turn', 0, 59, -162, '-8.63', 17, 2, 1, 1),
(27, 4, 1, 'move', 2, 57, -162, '0.00', 0, 0, 1, 1),
(52, 27, 2, 'deploy', 0, -215, -100, '-11.94', 0, 0, 0, 1),
(53, 28, 2, 'deploy', 0, 167, 264, '135.86', 0, 0, 0, 1),
(54, 3, 2, 'speed', -1, -216, 236, '0.00', 30, 0, 1, 1),
(55, 3, 2, 'move', 72, -145, 223, '0.00', 0, 0, 1, 1),
(56, 3, 2, 'turn', 0, -145, 223, '30.00', 31, 64, 1, 1),
(57, 3, 2, 'move', 64, -91, 257, '0.00', 0, 0, 1, 1),
(58, 2, 2, 'turn', 0, -216, 649, '-30.00', 30, 60, 1, 1),
(59, 2, 2, 'move', 60, -164, 620, '0.00', 0, 0, 1, 1),
(60, 2, 2, 'turn', 0, -164, 620, '-10.74', 11, 22, 1, 1),
(61, 2, 2, 'move', 105, -84, 552, '0.00', 0, 0, 1, 1),
(62, 1, 2, 'speed', 1, -222, -103, '0.00', 30, 0, 1, 1),
(63, 1, 2, 'turn', 0, -222, -103, '30.00', 27, 47, 1, 1),
(64, 1, 2, 'move', 145, -94, -36, '0.00', 0, 0, 1, 1),
(65, 1, 2, 'turn', 0, -94, -36, '27.00', 24, 42, 1, 1),
(66, 6, 2, 'turn', 0, 192, 253, '30.00', 30, 84, 1, 1),
(67, 6, 2, 'move', 155, 58, 176, '0.00', 0, 0, 1, 1),
(68, 6, 2, 'turn', 0, 58, 176, '5.66', 12, 0, 1, 1),
(69, 5, 2, 'turn', 0, 77, 720, '30.00', 30, 65, 1, 1),
(70, 5, 2, 'move', 65, 24, 682, '0.00', 0, 0, 1, 1),
(71, 5, 2, 'turn', 0, 24, 682, '30.00', 30, 65, 1, 1),
(72, 5, 2, 'move', 100, -18, 591, '0.00', 0, 0, 1, 1),
(73, 4, 2, 'turn', 0, 57, -162, '30.00', 30, 56, 1, 1),
(74, 4, 2, 'move', 112, -34, -228, '0.00', 0, 0, 1, 1),
(75, 4, 2, 'turn', 0, -34, -228, '-30.00', 32, 53, 1, 1),
(76, 4, 2, 'move', 53, -86, -220, '0.00', 0, 0, 1, 1),
(77, 4, 2, 'turn', 0, -86, -220, '-30.00', 48, 23, 1, 1),
(78, 27, 2, 'move', 142, -111, -197, '317.07', 0, 0, 0, 1),
(79, 28, 2, 'move', 142, 74, 371, '131.07', 0, 0, 0, 1);

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
(13, 8, 1, 1, 6, 9, 1, 0, 'Particle', 28, 6, 14, 8, 0, 0, 14, 0, 'p;', 0),
(14, 5, 1, 2, 6, 1, 1, 0, 'Particle', 31, 3, 0, 15, 0, 13, 18, 0, 'p;', 0),
(15, 3, 1, 3, 6, 1, 1, 0, 'Particle', 65, 3, 0, 19, 0, 43, 22, 0, 'p;', 0),
(16, 2, 1, 3, 6, 7, 1, 0, 'Particle', 35, 3, 21, 11, 0, 0, 14, 0, 'p;', 0),
(17, 16, 1, 4, 6, 1, 1, 0, 'Laser', 95, 0, 0, 16, 0, 15, 16, 0, 'p;', 0),
(18, 17, 1, 4, 6, 1, 1, 0, 'Laser', 85, 0, 0, 16, 0, 12, 16, 0, 'p;', 0),
(19, 17, 1, 4, 6, 1, 1, 0, 'Laser', 85, 0, 0, 15, 0, 13, 15, 0, 'p;', 0),
(20, 16, 1, 4, 6, 7, 1, 0, 'Laser', 95, 0, 21, 10, 0, 0, 10, 0, 'p;', 0),
(21, 17, 1, 4, 6, 7, 1, 0, 'Laser', 85, 0, 18, 10, 0, 0, 10, 0, 'p;', 0),
(22, 16, 1, 4, 6, 9, 1, 0, 'Laser', 95, 0, 21, 10, 0, 0, 10, 0, 'p;', 0),
(23, 13, 1, 5, 6, 1, 1, 0, 'Particle', 36, 0, 0, 9, 0, 27, 17, 0, 'p;', 0),
(24, 11, 1, 6, 6, 1, 1, 0, 'Laser', 186, 0, 0, 20, 0, 42, 20, 0, 'p;', 0),
(25, 11, 1, 6, 6, 1, 1, 0, 'Laser', 186, 0, 0, 19, 0, 43, 19, 0, 'p;', 0),
(26, 11, 1, 6, 6, 7, 1, 0, 'Laser', 186, 0, 28, 9, 0, 25, 9, 1, 'p;o2;', 0),
(27, 30, 1, 2, 10, 1, 2, 0, 'Particle', 13, 3, 0, 5, 0, 0, 16, 0, 'b;', 0),
(28, 30, 1, 2, 10, 1, 2, 0, 'Particle', 14, 3, 0, 6, 0, 0, 16, 0, 'b;', 0),
(29, 31, 1, 2, 10, 1, 2, 0, 'Particle', 13, 3, 0, 5, 0, 0, 16, 0, 'b;', 0),
(30, 32, 1, 2, 10, 1, 2, 0, 'Particle', 13, 3, 0, 5, 0, 0, 16, 0, 'b;', 0),
(31, 30, 1, 2, 10, 3, 2, 0, 'Particle', 14, 3, 0, 6, 0, 0, 17, 0, 'b;', 0),
(32, 32, 1, 2, 10, 3, 2, 0, 'Particle', 12, 3, 0, 5, 0, 0, 15, 0, 'b;', 0),
(33, 30, 1, 2, 10, 4, 2, 0, 'Particle', 15, 3, 0, 6, 0, 0, 17, 0, 'b;', 0),
(34, 31, 1, 2, 10, 11, 2, 0, 'Particle', 14, 3, 5, 6, 0, 0, 9, 0, 'p;', 0),
(35, 32, 1, 2, 10, 11, 2, 0, 'Particle', 15, 3, 6, 6, 0, 0, 9, 0, 'p;', 0),
(36, 34, 1, 2, 10, 12, 2, 0, 'Particle', 36, 3, 27, 6, 0, 0, 9, 0, 'p;', 0),
(37, 29, 1, 3, 19, 1, 2, 0, 'Particle', 66, 0, 0, 18, 0, 48, 18, 0, 'p;', 0),
(38, 29, 1, 3, 19, 22, 2, 0, 'Particle', 69, 0, 28, 8, 0, 33, 8, 1, 'p;o2;', 0),
(39, 28, 1, 6, 6, 1, 2, 0, 'Pulse', 52, 0, 0, 36, 0, 16, 18, 0, 'p;v2;', 0),
(40, 22, 1, 6, 18, 1, 2, 0, 'Pulse', 84, 0, 0, 54, 0, 30, 18, 0, 'p;v3;', 0),
(41, 24, 1, 6, 18, 1, 2, 0, 'Pulse', 75, 0, 0, 40, 0, 0, 15, 0, 'b;v5;', 0),
(42, 25, 1, 6, 18, 1, 2, 0, 'Pulse', 45, 0, 0, 42, 0, 3, 14, 0, 'p;v3;', 0),
(43, 26, 1, 6, 18, 4, 2, 0, 'Particle', 64, 0, 20, 10, 0, 34, 19, 0, 'p;c;', 0),
(44, 23, 1, 6, 18, 19, 2, 0, 'Pulse', 116, 0, 64, 40, 0, 12, 10, 1, 'p;v4;o6;', 0),
(45, 26, 1, 6, 18, 21, 2, 0, 'Particle', 64, 0, 36, 6, 0, 22, 11, 1, 'p;o3;', 0);

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
(1, 1, 1, 6, 3, -210, 240, 8, 2, 27, '31;64;', 0, 1),
(2, 1, 1, 6, 3, -210, 240, 9, 2, 27, '98;21;', 1, 1),
(3, 1, 1, 6, 3, -210, 240, 12, 2, 44, '26;54;', 1, 1),
(4, 1, 1, 6, 3, -210, 240, 14, 2, 27, '74;100;', 0, 1),
(5, 1, 1, 5, 2, -211, 646, 11, 2, 29, '29;96;', 1, 1),
(6, 1, 1, 5, 2, -211, 646, 12, 2, 29, '75;92;', 0, 1),
(7, 1, 1, 4, 1, -223, -103, 11, 2, 34, '51;70;', 0, 1),
(8, 1, 1, 4, 1, -223, -103, 14, 2, 34, '81;34;', 1, 1),
(9, 1, 1, 3, 6, 191, 251, 7, 2, 35, '57;88;', 0, 1),
(10, 1, 1, 3, 6, 191, 251, 11, 2, 35, '49;41;', 0, 1),
(11, 1, 1, 3, 6, 191, 251, 13, 1, 51, '22;', 1, 1),
(12, 1, 1, 2, 5, 70, 720, 7, 2, 37, '99;75;', 0, 1),
(13, 1, 1, 2, 5, 70, 720, 9, 2, 37, '85;36;', 1, 1),
(14, 1, 1, 2, 5, 70, 720, 11, 1, 31, '82;', 0, 1),
(15, 1, 1, 2, 5, 70, 720, 12, 1, 31, '76;', 0, 1),
(16, 1, 1, 1, 4, 59, -157, 7, 1, 43, '41;', 1, 1),
(17, 1, 1, 1, 4, 59, -157, 9, 1, 43, '28;', 1, 1),
(18, 1, 2, 1, 4, 56, -167, 13, 2, 0, '', 0, 1),
(19, 1, 2, 1, 4, 56, -167, 17, 2, 0, '', 0, 1),
(20, 1, 2, 6, 2, -220, 646, 13, 4, 0, '', 0, 1),
(21, 1, 2, 6, 2, -220, 646, 20, 4, 0, '', 0, 1),
(22, 1, 2, 3, 6, 54, 177, 8, 1, 67, '44;', 1, 1),
(23, 1, 2, 3, 6, 54, 177, 10, 1, 67, '20;', 1, 1),
(24, 1, 2, 3, 6, 54, 177, 21, 1, 118, '24;', 1, 1),
(25, 1, 2, 3, 6, 54, 177, 22, 1, 118, '79;', 1, 1),
(26, 1, 2, 2, 6, 58, 179, 8, 2, 57, '54;18;', 2, 1),
(27, 1, 2, 2, 5, -12, 593, 15, 2, 64, '85;99;', 0, 1),
(28, 1, 2, 1, 6, 56, 179, 15, 1, 48, '35;', 1, 1),
(29, 1, 2, 6, 3, -97, 251, 19, 2, 80, '72;80;', 2, 1),
(30, 1, 2, 5, 2, -90, 555, 7, 4, 61, '58;45;60;16;', 4, 1),
(31, 1, 2, 5, 2, -90, 555, 8, 4, 61, '42;92;43;90;', 2, 1),
(32, 1, 2, 5, 2, -90, 555, 9, 4, 61, '44;60;54;96;', 3, 1),
(33, 1, 2, 5, 2, -90, 555, 17, 2, 65, '91;73;', 0, 1),
(34, 1, 2, 5, 2, -90, 555, 18, 2, 65, '92;8;', 1, 1);

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
(1, 'myGame', 'active', 2, 3, 3500, 1500, 2, 2, 10, 10),
(2, 'myGame', 'open', -1, -1, 3500, 1500, 11, 3, 10, 10);

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
(1, 1, 13, 'Naga', 2),
(2, 1, 17, 'Naga', 2),
(19, 19, 4, 'Javelin', 5),
(20, 19, 8, 'Javelin', 5),
(21, 20, 4, 'Javelin', 5),
(22, 20, 8, 'Javelin', 5),
(29, 26, 4, 'Javelin', 5),
(30, 26, 8, 'Javelin', 5);

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
(1, 27, '2', 2, 4, 57, -162, 0),
(2, 28, '2', 2, 2, -216, 649, 0);

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
(1, 1, 1, 2, 3, 'Earth Alliance', 3273, 1540, 385, 770, 'waiting'),
(2, 2, 1, 2, 3, 'Centauri Republic', 3252, 1460, 365, 770, 'waiting'),
(3, 2, 2, -1, -1, '', 3500, 0, 0, 0, 'joined');

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
(1, 3, 6, 1, '1', 4),
(2, 3, 14, 1, '-1', 0),
(3, 3, 15, 1, '-1', 0),
(4, 3, 21, 1, '-1', 0),
(5, 3, 22, 1, '-1', 0),
(6, 2, 6, 1, '1', 3),
(7, 2, 11, 1, '-2', 0),
(8, 2, 12, 1, '-2', 0),
(9, 2, 17, 1, '-2', 0),
(10, 2, 18, 1, '-2', 0),
(11, 1, 6, 1, '1', 3),
(12, 1, 6, 1, '1', 4),
(13, 1, 8, 1, '-1', 0),
(14, 1, 8, 1, '0', 0),
(15, 1, 12, 1, '-1', 0),
(16, 1, 16, 1, '-1', 0),
(17, 1, 16, 1, '0', 0),
(18, 4, 8, 1, '0', 0),
(19, 3, 14, 2, '-1', 0),
(20, 3, 15, 2, '-1', 0),
(21, 3, 20, 2, '1', 4),
(22, 3, 21, 2, '-1', 0),
(23, 3, 22, 2, '-1', 0),
(24, 2, 10, 2, '1', 3),
(25, 2, 11, 2, '-2', 0),
(26, 2, 12, 2, '-2', 0),
(27, 2, 17, 2, '-2', 0),
(28, 2, 18, 2, '-2', 0),
(29, 1, 8, 2, '-1', 0),
(30, 1, 12, 2, '-1', 0),
(31, 1, 13, 2, '1', 0),
(32, 1, 13, 2, '1', 0),
(33, 1, 14, 2, '1', 3),
(34, 1, 16, 2, '-1', 0),
(35, 1, 17, 2, '1', 0),
(36, 1, 17, 2, '1', 0),
(37, 6, 13, 2, '1', 0),
(38, 6, 13, 2, '1', 0),
(39, 6, 13, 2, '1', 0),
(40, 6, 13, 2, '1', 0),
(41, 6, 20, 2, '1', 0),
(42, 6, 20, 2, '1', 0),
(43, 6, 20, 2, '1', 0),
(44, 6, 20, 2, '1', 0),
(45, 4, 8, 2, '0', 0),
(46, 4, 9, 2, '1', 2),
(47, 4, 4, 2, '1', 3);

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
(1, 3, 4, 1, '0.26', 448, 0),
(2, 2, 4, 1, '359.28', 478, 0),
(3, 1, 4, 1, '359.76', 480, 0),
(4, 6, 4, 1, '1.03', 446, 1),
(5, 5, 4, 1, '1.57', 366, 1),
(6, 4, 4, 1, '2.26', 304, 1),
(7, 3, 4, 2, '330.83', 218, 0),
(8, 2, 4, 2, '100.09', 217, 1),
(9, 1, 4, 2, '261.48', 145, 1),
(10, 6, 4, 2, '305.40', 215, 1),
(11, 5, 4, 2, '270.84', 151, 0),
(12, 4, 4, 2, '331.08', 212, 1);

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
(13, 19, 1, 'Vorchan'),
(14, 19, 1, 'Vorchan'),
(15, 20, 1, 'Vorchan'),
(16, 20, 1, 'Vorchan'),
(17, 26, 1, 'Vorchan'),
(18, 26, 1, 'Vorchan'),
(19, 27, 4, 'Naga'),
(20, 28, 8, 'Triarii');

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
(10, 3, 7, 1, 'Damage', 0, '20.00'),
(11, 4, 7, 1, 'Disabled', 1, '0.00'),
(12, 4, 7, 1, 'Damage', 0, '20.00'),
(13, 4, 7, 1, 'Accuracy', 0, '30.00'),
(14, 6, 5, 1, 'Overload', 0, '0.64'),
(15, 2, 11, 2, 'Damage', 0, '20.00'),
(16, 2, 12, 2, 'Disabled', 1, '0.00'),
(17, 2, 12, 2, 'Accuracy', 0, '30.00'),
(18, 3, 5, 2, 'Overload', 0, '1.60'),
(19, 6, 2, 2, 'Morale', -1, '5.00'),
(20, 6, 4, 2, 'Output', 0, '12.00'),
(21, 6, 5, 2, 'Overload', 0, '9.46');

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
(1, 1, 1, 1, 0, 'Olympus', '', 'bought', 0, 1, 0, -222, -103, '357.63', 0, 125, 0, 0, 0, 1, 3, 0, NULL),
(2, 1, 1, 1, 0, 'Artemis', 'yes', 'bought', 0, 1, 0, -216, 649, '0.55', 0, 165, 0, 0, 0, 1, 3, 0, NULL),
(3, 1, 1, 1, 0, 'Hyperion', '', 'bought', 1, 1, 0, -216, 236, '1.80', 0, 155, 0, 0, 0, 1, 3, 0, NULL),
(4, 1, 2, 1, 0, 'Demos', '', 'bought', 0, 1, 0, 57, -162, '171.37', 0, 165, 0, 0, 0, 1, 3, 0, NULL),
(5, 1, 2, 1, 0, 'Altarian', '', 'bought', 0, 1, 0, 77, 720, '185.47', 0, 165, 0, 0, 0, 1, 3, 0, NULL),
(6, 1, 2, 1, 0, 'Centurion', '', 'bought', 1, 1, 0, 192, 253, '180.00', 0, 155, 0, 0, 0, 1, 3, 0, 'm56;'),
(27, 1, 1, 0, 1, 'Salvo', '', 'deployed', 0, 2, 0, -215, -100, '0.00', 0, 0, 0, 0, 0, 2, -1, 0, NULL),
(28, 1, 2, 0, 1, 'Salvo', '', 'deployed', 0, 2, 0, 167, 264, '0.00', 0, 0, 0, 0, 0, 2, -1, 0, NULL);

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
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;
--
-- AUTO_INCREMENT für Tabelle `chat`
--
ALTER TABLE `chat`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `damages`
--
ALTER TABLE `damages`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;
--
-- AUTO_INCREMENT für Tabelle `fireorders`
--
ALTER TABLE `fireorders`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;
--
-- AUTO_INCREMENT für Tabelle `games`
--
ALTER TABLE `games`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT für Tabelle `loads`
--
ALTER TABLE `loads`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
--
-- AUTO_INCREMENT für Tabelle `missions`
--
ALTER TABLE `missions`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT für Tabelle `playerstatus`
--
ALTER TABLE `playerstatus`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT für Tabelle `powers`
--
ALTER TABLE `powers`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;
--
-- AUTO_INCREMENT für Tabelle `sensors`
--
ALTER TABLE `sensors`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT für Tabelle `subunits`
--
ALTER TABLE `subunits`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT für Tabelle `systemcrits`
--
ALTER TABLE `systemcrits`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
--
-- AUTO_INCREMENT für Tabelle `units`
--
ALTER TABLE `units`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

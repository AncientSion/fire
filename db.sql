-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 08. Jun 2018 um 16:22
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
(42, 26, 2, 'move', 90, 474, 602, '221.00', 0, 0, 0, 1);

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
(351, 8, 1, 1, 20, 1, 2, 0, 'Laser', 223, 0, 0, 21, 0, 53, 21, 0, 'p;', 0),
(352, 11, 1, 1, 6, 1, 2, 0, 'Laser', 141, 0, 0, 22, 0, 25, 22, 0, 'p;', 0),
(353, 11, 1, 1, 6, 1, 2, 0, 'Laser', 141, 0, 0, 21, 0, 26, 21, 0, 'p;', 0),
(354, 6, 1, 1, 20, 1, 2, 0, 'Particle', 36, 0, 0, 10, 0, 26, 20, 0, 'p;', 0),
(355, 9, 1, 1, 6, 1, 2, 0, 'Particle', 36, 0, 0, 11, 0, 25, 21, 0, 'p;', 0),
(356, 10, 1, 1, 6, 2, 2, 0, 'Particle', 36, 0, 20, 11, 0, 5, 21, 0, 'p;c;', 0),
(357, 8, 1, 1, 20, 4, 2, 0, 'Laser', 223, 0, 20, 21, 0, 33, 21, 0, 'p;c;', 0),
(358, 10, 1, 1, 6, 5, 2, 0, 'Particle', 36, 0, 20, 10, 0, 6, 20, 0, 'p;c;', 0),
(359, 11, 1, 1, 6, 8, 2, 0, 'Laser', 141, 0, 34, 13, 0, 0, 13, 0, 'p;', 0),
(360, 13, 1, 1, 6, 10, 2, 0, 'Particle', 64, 0, 44, 7, 0, 13, 13, 1, 'p;o3;', 0),
(361, 8, 1, 1, 20, 22, 2, 0, 'Laser', 223, 0, 44, 12, 0, 18, 12, 1, 'p;o3;', 0),
(362, 6, 1, 1, 20, 27, 2, 0, 'Particle', 36, 0, 24, 5, 0, 7, 9, 1, 'p;o3;', 0),
(363, 17, 1, 3, 6, 1, 2, 0, 'Particle', 96, 3, 0, 18, 0, 75, 21, 0, 'p;', 0),
(364, 18, 1, 3, 6, 1, 2, 0, 'Particle', 52, 3, 0, 17, 0, 32, 20, 0, 'p;', 0),
(365, 20, 1, 3, 6, 1, 2, 0, 'Particle', 49, 3, 0, 16, 0, 30, 19, 0, 'p;', 0),
(366, 17, 1, 3, 6, 7, 2, 0, 'Particle', 28, 3, 14, 11, 0, 0, 14, 0, 'p;', 0),
(367, 17, 1, 3, 6, 8, 2, 0, 'Particle', 28, 3, 16, 9, 0, 0, 12, 0, 'p;', 0),
(368, 17, 1, 3, 6, 9, 2, 0, 'Particle', 28, 3, 16, 9, 0, 0, 12, 0, 'p;', 0),
(369, 19, 1, 3, 6, 9, 2, 0, 'Particle', 51, 3, 39, 9, 0, 0, 12, 0, 'p;', 0),
(370, 17, 1, 3, 6, 10, 2, 0, 'Particle', 28, 3, 17, 8, 0, 0, 11, 0, 'p;', 0),
(371, 17, 1, 3, 6, 11, 2, 0, 'Particle', 28, 3, 14, 11, 0, 0, 14, 0, 'p;', 0),
(372, 24, 1, 4, 19, 1, 2, 0, 'Particle', 43, 0, 0, 18, 0, 25, 18, 0, 'p;', 0),
(373, 26, 1, 4, 19, 3, 2, 0, 'Particle', 50, 0, 20, 18, 0, 12, 18, 0, 'p;c;', 0);

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
(6, 1, 2, 3, 1, -325, -98, 7, 2, 62, '57;26;', 2, 1),
(7, 1, 2, 3, 1, -325, -98, 11, 2, 62, '64;72;', 0, 1),
(8, 1, 2, 3, 1, -325, -98, 13, 1, 91, '78;', 1, 1),
(9, 1, 2, 4, 1, -335, -101, 7, 2, 42, '74;20;', 1, 1),
(10, 1, 2, 4, 1, -335, -101, 11, 2, 42, '17;24;', 2, 1),
(11, 1, 2, 4, 1, -335, -101, 20, 1, 82, '3;', 1, 1),
(12, 1, 2, 5, 1, -330, -95, 7, 2, 56, '93;85;', 0, 1),
(13, 1, 2, 5, 1, -330, -95, 8, 2, 71, '33;99;', 1, 1),
(14, 1, 2, 5, 1, -330, -95, 9, 2, 56, '65;59;', 0, 1),
(15, 1, 2, 5, 1, -330, -95, 11, 1, 41, '86;', 0, 1),
(16, 1, 2, 5, 1, -330, -95, 12, 1, 41, '46;', 0, 1),
(17, 1, 2, 1, 3, 383, -107, 7, 1, 42, '37;', 6, 1),
(18, 1, 2, 1, 3, 376, -108, 22, 1, 71, '56;', 1, 1),
(19, 1, 2, 1, 3, 376, -108, 23, 1, 71, '27;', 1, 1),
(20, 1, 2, 1, 3, 376, -108, 24, 1, 71, '45;', 1, 1),
(21, 1, 2, 1, 3, 376, -108, 25, 1, 71, '82;', 0, 1),
(22, 1, 2, 2, 4, 416, 562, 21, 1, 46, '50;', 0, 1),
(23, 1, 2, 2, 4, 416, 562, 22, 1, 76, '79;', 0, 1),
(24, 1, 2, 2, 4, 416, 562, 23, 1, 76, '12;', 1, 1),
(25, 1, 2, 2, 4, 416, 562, 24, 1, 76, '85;', 0, 1),
(26, 1, 2, 2, 4, 416, 562, 25, 1, 76, '75;', 1, 1);

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
(1, 'myGame', 'active', 2, 3, 3000, 1500, 2, 2, 10),
(2, 'myGame', 'active', 2, 3, 3000, 1500, 11, 3, 10);

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
(3, 29, '2', 2, 27, -545, 65, 0);

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
(1, 1, 1, 2, 3, 'Minbari Federation', 1800, 1440, 360, 1080, 'waiting'),
(2, 2, 1, 2, 3, 'Earth Alliance', 1900, 1440, 360, 590, 'waiting'),
(3, 1, 2, 2, 3, 'Earth Alliance', 3064, 1680, 420, 1260, 'waiting'),
(4, 2, 2, 2, 3, 'Centauri Republic', 3783, 1200, 300, 900, 'waiting');

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
(116, 27, 34, 2, '-1', 0);

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
(14, 28, 4, 2, '-1.00', 110, 0);

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
(129, 1, 2, 2, 'Engine', 0, '15.00'),
(130, 1, 5, 2, 'Output', 0, '9.00'),
(131, 1, 5, 2, 'Overload', 0, '2.13'),
(132, 1, 8, 2, 'Damage', 0, '20.00'),
(133, 3, 8, 2, 'Accuracy', 0, '30.00'),
(134, 3, 10, 2, 'Damage', 0, '20.00'),
(135, 4, 3, 2, 'Output', 0, '11.00');

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
(1, 1, 1, 1, 0, 'Tigara', 'A', 'bought', 1, 1, 0, -485, -97, '0.00', 0, 155, 0, 0, 0, 1, 3, 0, ''),
(2, 1, 1, 1, 0, 'Tigara', 'B', 'bought', 0, 1, 0, -485, 649, '0.00', 0, 155, 0, 0, 0, 1, 3, 0, ''),
(3, 1, 2, 1, 0, 'Hyperion', '', 'bought', 0, 1, 0, 531, -142, '178.09', 0, 155, 0, 0, 0, 1, 3, 0, ''),
(4, 1, 2, 1, 0, 'Hyperion', '', 'bought', 1, 1, 0, 542, 661, '180.50', 0, 155, 0, 0, 0, 1, 3, 0, ''),
(5, 1, 2, 1, 0, 'Artemis', '', 'bought', 0, 1, 0, 519, 244, '180.00', 0, 165, 0, 0, 0, 1, 3, 0, ''),
(25, 1, 2, 0, 0, 'Flight', '', 'deployed', 0, 2, 0, 531, -142, '0.00', 0, 0, 0, 0, 0, 2, -1, 0, ''),
(26, 1, 2, 0, 0, 'Flight', '', 'deployed', 0, 2, 0, 542, 661, '0.00', 0, 0, 0, 0, 0, 2, -1, 0, ''),
(27, 2, 1, 1, 0, 'Omega', '', 'bought', 1, 1, 0, -545, 65, '0.00', 0, 140, 0, 0, 0, 1, 3, 0, ''),
(28, 2, 2, 1, 0, 'Altarian', '', 'bought', 1, 1, 0, 456, -46, '180.00', 0, 165, 0, 0, 0, 1, 3, 0, ''),
(29, 2, 1, 0, 0, 'Flight', '', 'deployed', 0, 2, 0, -545, 65, '0.00', 0, 0, 0, 0, 0, 2, -1, 0, '');

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
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;
--
-- AUTO_INCREMENT für Tabelle `chat`
--
ALTER TABLE `chat`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `damages`
--
ALTER TABLE `damages`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=374;
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
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
--
-- AUTO_INCREMENT für Tabelle `games`
--
ALTER TABLE `games`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT für Tabelle `loads`
--
ALTER TABLE `loads`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT für Tabelle `missions`
--
ALTER TABLE `missions`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT für Tabelle `playerstatus`
--
ALTER TABLE `playerstatus`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT für Tabelle `powers`
--
ALTER TABLE `powers`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=117;
--
-- AUTO_INCREMENT für Tabelle `reinforcements`
--
ALTER TABLE `reinforcements`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `sensors`
--
ALTER TABLE `sensors`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT für Tabelle `subunits`
--
ALTER TABLE `subunits`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT für Tabelle `systemcrits`
--
ALTER TABLE `systemcrits`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=136;
--
-- AUTO_INCREMENT für Tabelle `units`
--
ALTER TABLE `units`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

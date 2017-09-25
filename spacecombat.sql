-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 25. Sep 2017 um 20:01
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
(1, 5, 1, 'deploy', 0, 493, -321, 180, 0, 0, 1, 1),
(2, 6, 1, 'deploy', 0, 546, 169, 180, 0, 0, 1, 1),
(3, 7, 1, 'deploy', 0, 624, 364, 180, 0, 0, 1, 1),
(4, 8, 1, 'deploy', 0, 643, 586, 199, 0, 0, 1, 1),
(5, 1, 1, 'deploy', 0, -503, -434, 0, 0, 0, 1, 1),
(6, 2, 1, 'deploy', 0, -511, -352, 0, 0, 0, 1, 1),
(7, 3, 1, 'deploy', 0, -595, 105, 0, 0, 0, 1, 1),
(8, 4, 1, 'deploy', 0, -435, 300, 0, 0, 0, 1, 1),
(9, 1, 1, 'jump', 16, -493, -422, -15, 0, 0, 0, 1),
(10, 2, 1, 'jump', 10, -521, -352, 2, 0, 0, 0, 1),
(11, 3, 1, 'jump', 32, -610, 133, -7, 0, 0, 0, 1),
(12, 4, 1, 'jump', 10, -442, 307, -13, 0, 0, 0, 1),
(13, 5, 1, 'jump', 32, 485, -291, 3, 0, 0, 0, 1),
(14, 6, 1, 'jump', 20, 564, 162, 1, 0, 0, 0, 1),
(15, 7, 1, 'jump', 19, 642, 368, 0, 0, 0, 0, 1),
(16, 8, 1, 'jump', 27, 622, 570, 9, 0, 0, 0, 1),
(17, 1, 1, 'move', 134, -379, -493, 0, 0, 0, 1, 1),
(18, 1, 1, 'turn', 0, -379, -493, 14, 150, 26, 2, 1),
(19, 1, 1, 'move', 6, -373, -493, 0, 0, 0, 1, 1),
(20, 2, 1, 'turn', 0, -521, -352, 30, 37, 66, 1, 1),
(21, 2, 1, 'move', 66, -465, -317, 0, 0, 0, 1, 1),
(22, 2, 1, 'turn', 0, -465, -317, 30, 37, 66, 1, 1),
(23, 2, 1, 'move', 94, -421, -234, 0, 0, 0, 1, 1),
(24, 3, 1, 'turn', 0, -610, 133, 30, 8, 38, 1, 1),
(25, 3, 1, 'move', 170, -454, 199, 0, 0, 0, 1, 1),
(26, 4, 1, 'turn', 0, -442, 307, -30, 8, 37, 1, 1),
(27, 4, 1, 'move', 160, -368, 165, 0, 0, 0, 1, 1),
(28, 4, 1, 'turn', 0, -368, 165, 30, 16, 18, 2, 1),
(29, 4, 1, 'move', 10, -358, 163, 0, 0, 0, 1, 1),
(30, 5, 1, 'turn', 0, 485, -291, 30, 266, 52, 2, 1),
(31, 5, 1, 'move', 137, 389, -386, 0, 0, 0, 1, 1),
(32, 5, 1, 'turn', 0, 389, -386, -24, 210, 41, 2, 1),
(33, 5, 1, 'move', 3, 386, -386, 0, 0, 0, 1, 1),
(34, 6, 1, 'turn', 0, 564, 162, -13, 10, 25, 1, 1),
(35, 6, 1, 'move', 160, 407, 195, 0, 0, 0, 1, 1),
(36, 7, 1, 'move', 160, 482, 368, 0, 0, 0, 1, 1),
(37, 8, 1, 'turn', 0, 622, 570, -30, 27, 60, 1, 1),
(38, 8, 1, 'move', 157, 476, 628, 0, 0, 0, 1, 1),
(39, 8, 1, 'turn', 0, 476, 628, 30, 54, 30, 2, 1),
(40, 8, 1, 'move', 3, 473, 627, 0, 0, 0, 1, 1);

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
(1, 1, 1, 1, 7, 11, 1, 78, 'Particle', 51, 0, 34, 17, 0, 17, 0, 'pen', 0),
(2, 1, 1, 1, 7, -1, 1, 76, 'Particle', 53, 0, 29, 24, 0, 24, 0, 'pen', 0),
(3, 2, 1, 1, 7, -1, 1, 42, 'Particle', 50, 0, 27, 23, 0, 23, 0, 'pen', 0),
(4, 2, 1, 1, 7, 11, 1, 4, 'Particle', 63, 0, 16, 16, 31, 16, 1, 'pen', 0),
(5, 3, 1, 1, 7, -1, 1, 19, 'Particle', 61, 0, 39, 22, 0, 22, 0, 'pen', 0),
(6, 3, 1, 1, 7, -1, 1, 42, 'Particle', 54, 0, 32, 22, 0, 22, 0, 'pen', 0),
(7, 4, 1, 1, 7, -1, 1, 34, 'Particle', 59, 0, 38, 21, 0, 21, 0, 'pen', 0),
(8, 4, 1, 1, 7, 9, 1, 36, 'Particle', 49, 0, 34, 15, 0, 15, 0, 'pen', 0),
(9, 5, 1, 1, 7, -1, 1, 66, 'Particle', 58, 0, 37, 21, 0, 21, 0, 'pen', 0),
(10, 5, 1, 1, 7, -1, 1, 19, 'Particle', 55, 0, 35, 20, 0, 20, 0, 'pen', 0),
(11, 6, 1, 5, 7, 10, 1, 5, 'Laser', 208, 0, 55, 14, 0, 14, 0, 'pen', 0),
(12, 6, 1, 5, 7, -1, 1, 5, 'Laser', 208, 0, 43, 26, 0, 26, 0, 'pen', 0),
(13, 6, 1, 5, 7, 10, 1, 5, 'Laser', 208, 0, 9, 14, 46, 14, 1, 'pen', 0),
(14, 7, 1, 5, 7, -1, 1, 61, 'Laser', 195, 0, 41, 24, 0, 24, 0, 'pen', 0),
(15, 7, 1, 5, 7, -1, 1, 61, 'Laser', 195, 0, 41, 24, 0, 24, 0, 'pen', 0),
(16, 7, 1, 5, 7, 8, 1, 61, 'Laser', 195, 0, 52, 13, 0, 13, 0, 'pen', 0),
(17, 8, 1, 5, 7, -1, 1, 11, 'Pulse', 55, 0, 0, 29, 0, 23, 0, 'block', 0),
(18, 10, 1, 5, 7, -1, 1, 17, 'Pulse', 53, 0, 0, 27, 0, 22, 0, 'block', 0),
(19, 12, 1, 5, 7, -1, 1, 12, 'Pulse', 52, 0, 0, 26, 0, 21, 0, 'block', 0);

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
(1, 1, 1, 1, -1, -504, -422, 65),
(2, 1, 1, 1, -1, -511, -360, 39),
(3, 1, 1, 1, -1, -434, 299, 26),
(4, 1, 1, 1, -1, -599, 106, 26),
(5, 1, 2, 1, -1, 487, -319, 65),
(6, 1, 2, 1, -1, 541, 168, 33),
(7, 1, 2, 1, -1, 642, 581, 33),
(8, 1, 2, 1, -1, 624, 358, 33);

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
(1, 1, 1, 5, 1, 0, 0, 8, 1, 104, '78 76 ', 2, 1),
(2, 1, 1, 5, 1, 0, 0, 9, 1, 104, '42 4 ', 2, 1),
(3, 1, 1, 5, 1, 0, 0, 10, 1, 104, '19 42 ', 2, 1),
(4, 1, 1, 5, 1, 0, 0, 11, 1, 104, '34 36 ', 2, 1),
(5, 1, 1, 5, 1, 0, 0, 24, 1, 104, '66 19 ', 2, 1),
(6, 1, 1, 1, 5, 0, 0, 11, 1, 114, '5 ', 3, 1),
(7, 1, 1, 1, 5, 0, 0, 12, 1, 114, '61 ', 3, 1),
(8, 1, 1, 1, 5, 0, 0, 14, 1, 22, '11 ', 3, 1),
(9, 1, 1, 1, 5, 0, 0, 15, 1, 22, '79 ', 0, 1),
(10, 1, 1, 1, 5, 0, 0, 16, 1, 22, '17 ', 3, 1),
(11, 1, 1, 1, 5, 0, 0, 17, 1, 22, '87 ', 0, 1),
(12, 1, 1, 1, 5, 0, 0, 18, 1, 22, '12 ', 3, 1),
(13, 1, 1, 1, 5, 0, 0, 19, 1, 22, '44 ', 0, 1);

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
(1, 'myGame', 'active', 1, 3, 3000, 100);

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
(1, 1, 10, 'Aurora', 10),
(2, 1, 10, 'Thunderbolt', 4),
(3, 2, 9, 'Cyclops', 8),
(4, 2, 12, 'Cyclops', 6),
(5, 2, 13, 'Cyclops', 6),
(6, 2, 18, 'Cyclops', 6),
(7, 2, 19, 'Cyclops', 6),
(8, 5, 17, 'Sentri', 7),
(9, 5, 17, 'Sitara', 2),
(10, 5, 27, 'Sentri', 7),
(11, 5, 27, 'Sitara', 2),
(12, 6, 9, 'Javelin', 6),
(13, 7, 9, 'Javelin', 6);

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
(1, 1, 1, 1, 3, 'Earth Alliance', 94, 'waiting'),
(2, 2, 1, 1, 3, 'Centauri Republic', 32, 'waiting');

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
(1, 5, 14, 1, '0', 0),
(2, 5, 15, 1, '0', 0),
(3, 5, 16, 1, '0', 0),
(4, 5, 19, 1, '0', 0),
(5, 5, 20, 1, '0', 0),
(6, 5, 21, 1, '0', 0),
(7, 5, 23, 1, '0', 0),
(8, 5, 25, 1, '0', 0),
(9, 5, 26, 1, '0', 0),
(10, 5, 5, 1, '1', 6),
(11, 5, 5, 1, '1', 8),
(12, 1, 8, 1, '-1', 0),
(13, 1, 9, 1, '-1', 0),
(14, 1, 11, 1, '-1', 0),
(15, 1, 11, 1, '1', 4),
(16, 1, 12, 1, '-1', 0),
(17, 1, 12, 1, '1', 4),
(18, 1, 14, 1, '-1', 0),
(19, 1, 15, 1, '-1', 0),
(20, 1, 16, 1, '-1', 0),
(21, 1, 17, 1, '-1', 0),
(22, 1, 18, 1, '-1', 0),
(23, 1, 19, 1, '-1', 0),
(24, 1, 21, 1, '0', 0),
(25, 1, 22, 1, '0', 0),
(26, 1, 23, 1, '0', 0),
(27, 1, 24, 1, '0', 0),
(28, 1, 26, 1, '-1', 0),
(29, 1, 27, 1, '-1', 0),
(30, 1, 28, 1, '-1', 0),
(31, 1, 28, 1, '0', 0),
(32, 1, 29, 1, '-1', 0),
(33, 1, 30, 1, '-1', 0),
(34, 1, 30, 1, '0', 0),
(35, 1, 31, 1, '-1', 0),
(36, 1, 31, 1, '0', 0),
(37, 2, 8, 1, '-1', 0),
(38, 2, 10, 1, '-1', 0),
(39, 2, 15, 1, '-1', 0),
(40, 2, 16, 1, '-1', 0),
(41, 2, 16, 1, '0', 0);

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
  `angle` int(3) DEFAULT NULL,
  `dist` int(4) DEFAULT NULL,
  `type` int(3) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `sensors`
--

INSERT INTO `sensors` (`id`, `unitid`, `systemid`, `turn`, `angle`, `dist`, `type`) VALUES
(1, 5, 5, 1, 0, 905, 0),
(2, 6, 5, 1, -1, 1000, 3),
(3, 7, 5, 1, -1, 1000, 3),
(4, 8, 5, 1, -1, 153, 0),
(5, 1, 5, 1, 8, 888, 0),
(6, 2, 5, 1, -1, 1000, 3),
(7, 3, 5, 1, -1, 82, 0),
(8, 4, 5, 1, -1, 82, 0);

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
(1, 1, 9, 1, 'Damage', 0, '0.30'),
(2, 1, 9, 1, 'Accuracy', 0, '0.30'),
(3, 5, 8, 1, 'Disabled', 1, '0.00'),
(4, 5, 8, 1, 'Damage', 0, '0.40'),
(5, 5, 8, 1, 'Accuracy', 0, '0.40');

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
(1, 1, 1, 1, 0, 'Omega', 'bought', 1, 0, -493, -422, 345, 0, 140, 1, -1),
(2, 1, 1, 1, 0, 'Saggitarius', 'bought', 1, 0, -521, -352, 2, 0, 160, 1, -1),
(3, 1, 1, 1, 0, 'Tethys', 'bought', 1, 0, -610, 133, 353, 0, 170, 1, -1),
(4, 1, 1, 1, 0, 'Tethys', 'bought', 1, 0, -442, 307, 347, 0, 170, 1, -1),
(5, 1, 2, 1, 0, 'Primus', 'bought', 1, 0, 485, -291, 183, 0, 140, 1, -1),
(6, 1, 2, 1, 0, 'Demos', 'bought', 1, 0, 564, 162, 181, 0, 160, 1, -1),
(7, 1, 2, 1, 0, 'Demos', 'bought', 1, 0, 642, 368, 180, 0, 160, 1, -1),
(8, 1, 2, 1, 0, 'Darkner', 'bought', 1, 0, 622, 570, 208, 0, 160, 1, -1);

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
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;
--
-- AUTO_INCREMENT für Tabelle `damages`
--
ALTER TABLE `damages`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT für Tabelle `deploys`
--
ALTER TABLE `deploys`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT für Tabelle `dogfights`
--
ALTER TABLE `dogfights`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `fireorders`
--
ALTER TABLE `fireorders`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT für Tabelle `games`
--
ALTER TABLE `games`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT für Tabelle `loads`
--
ALTER TABLE `loads`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT für Tabelle `missions`
--
ALTER TABLE `missions`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `playerstatus`
--
ALTER TABLE `playerstatus`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT für Tabelle `powers`
--
ALTER TABLE `powers`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;
--
-- AUTO_INCREMENT für Tabelle `reinforcements`
--
ALTER TABLE `reinforcements`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `sensors`
--
ALTER TABLE `sensors`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT für Tabelle `subunits`
--
ALTER TABLE `subunits`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `systemcrits`
--
ALTER TABLE `systemcrits`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT für Tabelle `units`
--
ALTER TABLE `units`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

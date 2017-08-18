-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 18. Aug 2017 um 17:08
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
(1, 4, 1, 'deploy', 0, 414, -584, 180, 0, 0, 1, 1),
(2, 5, 1, 'deploy', 0, 551, -226, 180, 0, 0, 1, 1),
(3, 6, 1, 'deploy', 0, 424, 146, 180, 0, 0, 1, 1),
(4, 1, 1, 'deploy', 0, -498, -571, 0, 0, 0, 1, 1),
(5, 2, 1, 'deploy', 0, -575, 265, 0, 0, 0, 1, 1),
(6, 3, 1, 'deploy', 0, -567, 330, 0, 0, 0, 1, 1),
(7, 1, 1, 'jump', 30, -522, -553, 10, 0, 0, 0, 1),
(8, 2, 1, 'jump', 15, -570, 279, 14, 0, 0, 0, 1),
(9, 3, 1, 'jump', 26, -542, 333, 9, 0, 0, 0, 1),
(10, 4, 1, 'jump', 20, 420, -565, 6, 0, 0, 0, 1),
(11, 5, 1, 'jump', 23, 552, -248, 11, 0, 0, 0, 1),
(12, 6, 1, 'jump', 26, 427, 121, 11, 0, 0, 0, 1),
(13, 4, 1, 'turn', 0, 420, -565, -19, 22, 36, 1, 1),
(14, 4, 1, 'move', 180, 245, -525, 0, 0, 0, 1, 1),
(15, 5, 1, 'turn', 0, 552, -248, -10, 12, 19, 1, 1),
(16, 5, 1, 'move', 180, 372, -251, 0, 0, 0, 1, 1),
(17, 6, 1, 'turn', 0, 427, 121, 6, 7, 11, 1, 1),
(18, 6, 1, 'move', 180, 255, 68, 0, 0, 0, 1, 1),
(19, 1, 1, 'move', 170, -355, -523, 0, 0, 0, 1, 1),
(20, 2, 1, 'turn', 0, -570, 279, -30, 76, 77, 1, 1),
(21, 2, 1, 'move', 170, -407, 232, 0, 0, 0, 1, 1),
(22, 3, 1, 'turn', 0, -542, 333, -30, 27, 51, 1, 1),
(23, 3, 1, 'move', 180, -374, 268, 0, 0, 0, 1, 1),
(24, 7, 2, 'deploy', 0, 225, -525, 180, 0, 0, 1, 1),
(25, 8, 2, 'deploy', 0, 353, -258, -159, 0, 0, 1, 1),
(26, 9, 2, 'deploy', 0, -388, 227, -14, 0, 0, 1, 1),
(27, 10, 2, 'launch', 0, -366, 270, -18, 0, 0, 0, 1);

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
(1, 2, 1, 1, 7, -1, 1, 18, 'Particle', 49, 0, 27, 22, 0, 22, 0, 'pen', 0),
(2, 3, 1, 2, 7, -1, 1, 12, 'Particle', 53, 0, 31, 22, 0, 22, 0, 'pen', 0),
(3, 6, 1, 6, 17, -1, 1, 6, 'Laser', 166, 0, 37, 18, 0, 18, 0, 'pen', 0),
(4, 6, 1, 6, 17, -1, 1, 6, 'Laser', 166, 0, 38, 17, 0, 17, 0, 'pen', 0),
(5, 6, 1, 6, 17, -1, 1, 6, 'Laser', 166, 0, 38, 17, 0, 17, 0, 'pen', 0);

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
(1, 1, 1, 1, -1, -573, 272, 51),
(2, 1, 1, 1, -1, -490, -565, 69),
(3, 1, 1, 1, -1, -571, 306, 50),
(4, 1, 2, 1, -1, 415, 142, 50),
(5, 1, 2, 1, -1, 415, -596, 62),
(6, 1, 2, 1, -1, 551, -224, 55);

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
-- Tabellenstruktur für Tabelle `fighters`
--

CREATE TABLE `fighters` (
  `id` int(4) NOT NULL,
  `unitid` int(4) DEFAULT NULL,
  `amount` int(2) DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `fighters`
--

INSERT INTO `fighters` (`id`, `unitid`, `amount`, `name`) VALUES
(1, 7, 8, 'Sentri'),
(2, 8, 8, 'Sentri'),
(3, 9, 12, 'Aurora');

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
(1, 1, 1, 4, 1, 0, 0, 9, 1, 44, '52 87 ', 0, 1),
(2, 1, 1, 5, 1, 0, 0, 9, 1, 30, '18 58 ', 1, 1),
(3, 1, 1, 6, 2, 0, 0, 9, 1, 36, '72 12 ', 1, 1),
(4, 1, 1, 1, 5, 0, 0, 14, 1, 32, '86 ', 0, 1),
(5, 1, 1, 1, 4, 0, 0, 21, 1, 42, '94 ', 0, 1),
(6, 1, 1, 2, 6, 0, 0, 14, 1, 39, '6 ', 3, 1),
(7, 1, 1, 3, 6, 0, 0, 9, 1, 25, '72 60 ', 0, 1),
(8, 1, 2, 4, 0, 0, 0, 16, 0, 0, '', 0, 1),
(9, 1, 2, 5, 0, 0, 0, 16, 0, 0, '', 0, 1),
(10, 1, 2, 2, 0, 0, 0, 10, 0, 0, '', 0, 1),
(11, 1, 2, 3, 6, 0, 0, 14, 2, 0, '', 0, 1),
(12, 1, 2, 3, 6, 0, 0, 18, 2, 0, '', 0, 1);

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
(1, 'myGame', 'active', 2, 0, 3000, 50);

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
(1, 1, 10, 'Aurora', 12),
(3, 3, 14, 'Naga', 8),
(4, 3, 18, 'Naga', 8),
(7, 6, 16, 'Sentri', 8);

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
(1, 7, '2', 2, 1, -355, -523, 0),
(2, 8, '2', 2, 1, -355, -523, 0),
(3, 9, '2', 2, 6, 255, 68, 0);

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
(1, 1, 1, 2, 0, 'Earth Alliance', 236, 'waiting'),
(2, 2, 1, 2, 0, 'Centauri Republic', 971, 'waiting');

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
(1, 1, 9, 1, '-1', 0),
(2, 1, 11, 1, '-1', 0),
(3, 1, 15, 1, '-1', 0),
(4, 1, 16, 1, '-1', 0),
(5, 1, 19, 1, '0', 0),
(6, 1, 22, 1, '-1', 0),
(7, 1, 23, 1, '-1', 0),
(8, 2, 9, 1, '-1', 0),
(9, 2, 11, 1, '-1', 0),
(10, 2, 15, 1, '-1', 0),
(11, 2, 16, 1, '-1', 0),
(12, 2, 19, 1, '0', 0),
(13, 2, 22, 1, '-1', 0),
(14, 2, 23, 1, '-1', 0),
(15, 3, 12, 1, '-1', 0),
(16, 3, 13, 1, '-1', 0),
(17, 3, 13, 1, '0', 0),
(18, 3, 16, 1, '-1', 0),
(19, 3, 17, 1, '-1', 0),
(20, 4, 8, 2, '0', 0),
(21, 4, 9, 2, '1', 4),
(22, 4, 10, 2, '0', 0),
(23, 5, 8, 2, '0', 0),
(24, 5, 9, 2, '1', 4),
(25, 5, 10, 2, '0', 0),
(26, 6, 8, 2, '0', 0),
(27, 6, 10, 2, '0', 0),
(28, 1, 9, 2, '-1', 0),
(29, 1, 11, 2, '-1', 0),
(30, 1, 15, 2, '-1', 0),
(31, 1, 16, 2, '-1', 0),
(32, 1, 19, 2, '0', 0),
(33, 1, 22, 2, '-1', 0),
(34, 1, 23, 2, '-1', 0),
(35, 2, 9, 2, '-1', 0),
(36, 2, 11, 2, '-1', 0),
(37, 2, 15, 2, '-1', 0),
(38, 2, 16, 2, '-1', 0),
(39, 2, 19, 2, '0', 0),
(40, 2, 22, 2, '-1', 0),
(41, 2, 23, 2, '-1', 0),
(42, 3, 12, 2, '-1', 0),
(43, 3, 13, 2, '-1', 0),
(44, 3, 13, 2, '0', 0),
(45, 3, 14, 2, '1', 0),
(46, 3, 14, 2, '1', 0),
(47, 3, 16, 2, '-1', 0),
(48, 3, 17, 2, '-1', 0),
(49, 3, 18, 2, '1', 0),
(50, 3, 18, 2, '1', 0);

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
(1, 4, 5, 1, -1, 174, 0),
(2, 5, 5, 1, -1, 174, 0),
(3, 6, 5, 1, -1, 174, 0),
(4, 1, 5, 1, -1, 162, 0),
(5, 2, 5, 1, -1, 162, 0),
(6, 3, 5, 1, -1, 151, 0),
(7, 4, 5, 2, 13, 447, 0),
(8, 5, 5, 2, 356, 656, 0),
(9, 6, 5, 2, 5, 610, 0),
(10, 1, 5, 2, 7, 535, 0),
(11, 2, 5, 2, 1, 600, 0),
(12, 3, 5, 2, 1, 541, 0);

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
(1, 1, 1, 1, 0, 'Hyperion', 'bought', 1, 0, -355, -523, 10, 0, 170, 1, 3),
(2, 1, 1, 1, 0, 'Hyperion', 'bought', 1, 0, -407, 232, 344, 0, 170, 1, 3),
(3, 1, 1, 1, 0, 'Artemis', 'bought', 1, 0, -374, 268, 339, 0, 180, 1, 3),
(4, 1, 2, 1, 0, 'Altarian', 'bought', 1, 0, 245, -525, 167, 0, 180, 1, 3),
(5, 1, 2, 1, 0, 'Altarian', 'bought', 1, 0, 372, -251, 181, 0, 180, 1, 3),
(6, 1, 2, 1, 0, 'Altarian', 'bought', 1, 0, 255, 68, 197, 0, 180, 1, 3),
(7, 1, 2, 0, 0, 'Flight', 'deployed', 2, 0, 225, -525, 180, 0, 359, 2, -1),
(8, 1, 2, 0, 0, 'Flight', 'deployed', 2, 0, 353, -258, -159, 0, 359, 2, -1),
(9, 1, 1, 0, 0, 'Flight', 'deployed', 2, 0, -388, 227, -14, 0, 277, 2, -1),
(10, 1, 1, 6, 4, 'Naga', 'launched', 2, 0, -366, 270, -18, 0, 178, 2, -1);

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
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
--
-- AUTO_INCREMENT für Tabelle `damages`
--
ALTER TABLE `damages`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT für Tabelle `deploys`
--
ALTER TABLE `deploys`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT für Tabelle `dogfights`
--
ALTER TABLE `dogfights`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `fighters`
--
ALTER TABLE `fighters`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT für Tabelle `fireorders`
--
ALTER TABLE `fireorders`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT für Tabelle `games`
--
ALTER TABLE `games`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
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
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT für Tabelle `powers`
--
ALTER TABLE `powers`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;
--
-- AUTO_INCREMENT für Tabelle `reinforcements`
--
ALTER TABLE `reinforcements`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `sensors`
--
ALTER TABLE `sensors`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT für Tabelle `systemcrits`
--
ALTER TABLE `systemcrits`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `units`
--
ALTER TABLE `units`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

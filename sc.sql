-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 21. Jan 2018 um 20:59
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
(1, 2, 1, 'deploy', 0, 628, -40, 180, 0, 0, 1, 1),
(2, 3, 1, 'deploy', 0, 643, 295, 180, 0, 0, 1, 1),
(3, 1, 1, 'deploy', 0, -543, 133, 0, 0, 0, 1, 1),
(4, 1, 1, 'jump', 29, -517, 145, 10, 0, 0, 0, 1),
(5, 2, 1, 'jump', 31, 603, -58, 1, 0, 0, 0, 1),
(6, 3, 1, 'jump', 33, 623, 269, 10, 0, 0, 0, 1),
(7, 1, 1, 'move', 175, -345, 175, 0, 0, 0, 1, 1),
(8, 2, 1, 'move', 175, 428, -61, 0, 0, 0, 1, 1),
(9, 3, 1, 'turn', 0, 623, 269, 10, 11, 14, 1, 1),
(10, 3, 1, 'move', 190, 444, 204, 0, 0, 0, 1, 1),
(11, 2, 2, 'move', 156, 280, -111, 0, 0, 0, 1, 1),
(12, 2, 2, 'turn', 0, 280, -111, -20, 40, 24, 2, 1),
(13, 2, 2, 'move', 19, 262, -105, 0, 0, 0, 1, 1),
(14, 3, 2, 'move', 190, 265, 139, 0, 0, 0, 1, 1),
(15, 1, 2, 'turn', 0, -345, 175, -30, 30, 66, 1, 1),
(16, 1, 2, 'move', 175, -181, 115, 0, 0, 0, 1, 1),
(17, 4, 3, 'deploy', 0, 233, 139, -177, 0, 0, 0, 1),
(18, 1, 3, 'turn', 0, -181, 115, -30, 30, 66, 1, 1),
(19, 1, 3, 'move', 175, -69, -19, 0, 0, 0, 1, 1),
(20, 2, 3, 'turn', 0, 262, -105, 30, 30, 72, 1, 1),
(21, 2, 3, 'move', 171, 114, -192, 0, 0, 0, 1, 1),
(22, 2, 3, 'turn', 0, 114, -192, -30, 60, 36, 2, 1),
(23, 2, 3, 'move', 4, 110, -191, 0, 0, 0, 1, 1),
(24, 3, 3, 'turn', 0, 265, 139, -28, 28, 39, 1, 1),
(25, 3, 3, 'move', 156, 110, 162, 0, 0, 0, 1, 1),
(26, 3, 3, 'turn', 0, 110, 162, 30, 42, 30, 1.4, 1),
(27, 3, 3, 'move', 34, 78, 149, 0, 0, 0, 1, 1),
(28, 3, 3, 'turn', 0, 78, 149, 30, 30, 11, 2, 1),
(29, 4, 3, 'deploy', 0, 233, 139, -177, 0, 0, 0, 1),
(30, 4, 3, 'move', 341, 131, 86, 208, 0, 0, 0, 1),
(31, 1, 4, 'turn', 0, -69, -19, -30, 30, 66, 1, 1),
(32, 1, 4, 'move', 66, -58, -84, 0, 0, 0, 1, 1),
(33, 1, 4, 'turn', 0, -58, -84, -30, 30, 66, 1, 1),
(34, 1, 4, 'move', 66, -81, -146, 0, 0, 0, 1, 1),
(35, 1, 4, 'turn', 0, -81, -146, 20, 20, 44, 1, 1),
(36, 1, 4, 'move', 43, -81, -189, 0, 0, 0, 1, 1),
(37, 2, 4, 'turn', 0, 110, -191, 19, 19, 46, 1, 1),
(38, 2, 4, 'move', 175, -65, -191, 0, 0, 0, 1, 1),
(39, 3, 4, 'move', 190, -39, -1, 0, 0, 0, 1, 1),
(40, 4, 4, 'move', 348, -9, -96, 232, 0, 0, 0, 1),
(41, 4, 4, 'move', 118, -81, -189, 232, 0, 0, 0, 1);

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
(1, 4, 1, 1, 6, 1, 2, 11, 'Particle', 60, 0, 0, 14, 46, 14, 0, 'p;', 0),
(2, 3, 1, 3, 3, 3, 2, 7, 'Matter', 36, 0, 0, 8, 28, 15, 0, 'p;', 0),
(3, 11, 1, 1, 10, 1, 3, 47, 'Plasma', 29, 0, 0, 27, 16, 13, 0, 'pen;', 0),
(4, 10, 1, 1, 6, 1, 3, 15, 'Particle', 35, 0, 0, 13, 22, 13, 0, 'p;', 0);

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
(2, 1, 2, 1, 2, 251, -102, 7, 2, 19, '47;95;', 0, 1),
(3, 1, 2, 1, 3, 283, 152, 9, 2, 11, '7;88;', 1, 1),
(4, 1, 2, 2, 1, -191, 119, 8, 2, 34, '11;93;', 1, 1),
(5, 1, 3, 3, 1, -189, 112, 4, 2, 0, '', 0, 1),
(6, 1, 3, 3, 1, -189, 112, 8, 2, 0, '', 0, 1),
(7, 1, 3, 1, 0, 115, -47, 8, 0, 0, '', 0, 1),
(8, 1, 3, 1, 2, 111, -184, 11, 1, 26, '93;', 0, 1),
(9, 1, 3, 1, 3, 67, 146, 12, 1, 15, '24;', 0, 1),
(10, 1, 3, 2, 1, -77, -11, 18, 2, 36, '80;15;', 1, 1),
(11, 1, 3, 3, 1, -65, -16, 10, 1, 47, '47;', 1, 1),
(12, 1, 4, 1, 0, 10, -200, 8, 5, 0, '-50;-160;', 0, 0);

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
(1, 'myGame', 'active', 4, 2, 3000, 1500);

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
(1, 3, 4, 'Javelin', 2),
(2, 3, 8, 'Javelin', 2);

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
(1, 4, '2', 3, 1, -81, -189, 4);

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
(1, 1, 1, 4, 2, 'Array', 2510, 'waiting'),
(2, 2, 1, 4, 2, 'Array', 1815, 'waiting');

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
(1, 1, 11, 1, '-1', 0),
(2, 1, 12, 1, '-1', 0),
(3, 1, 17, 1, '-1', 0),
(4, 1, 18, 1, '-1', 0),
(5, 1, 11, 2, '-1', 0),
(6, 1, 12, 2, '-1', 0),
(7, 1, 17, 2, '-1', 0),
(8, 1, 18, 2, '-1', 0),
(9, 2, 11, 2, '0', 0),
(10, 2, 17, 2, '0', 0),
(11, 2, 4, 2, '1', 4),
(12, 3, 6, 2, '1', 2),
(13, 3, 9, 2, '0', 0),
(14, 2, 11, 3, '1', 3),
(15, 2, 12, 3, '0', 0),
(16, 3, 4, 3, '1', 0),
(17, 3, 4, 3, '1', 0),
(18, 3, 8, 3, '1', 0),
(19, 3, 8, 3, '1', 0),
(20, 1, 11, 3, '-1', 0),
(21, 1, 12, 3, '-1', 0),
(22, 1, 17, 3, '-1', 0),
(23, 1, 18, 3, '-1', 0),
(24, 2, 12, 4, '0', 0),
(25, 3, 4, 4, '0', 0),
(26, 3, 5, 4, '1', 2),
(27, 3, 6, 4, '1', 2),
(28, 3, 9, 4, '1', 2),
(29, 1, 11, 4, '-1', 0),
(30, 1, 12, 4, '-1', 0),
(31, 1, 17, 4, '-1', 0),
(32, 1, 18, 4, '-1', 0);

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
(1, 2, 4, 1, '-1.00', 110, 0),
(2, 3, 1, 1, '-1.00', 81, 0),
(3, 1, 4, 1, '-1.00', 95, 0),
(4, 1, 4, 2, '-1.00', 95, 0),
(5, 2, 4, 2, '0.57', 583, 0),
(6, 3, 1, 2, '-1.00', 81, 0),
(7, 2, 4, 3, '-1.00', 110, 0),
(8, 3, 1, 3, '0.31', 193, 0),
(9, 1, 4, 3, '-1.00', 95, 0),
(10, 2, 4, 4, '-1.00', 110, 0),
(11, 3, 1, 4, '0.23', 191, 0),
(12, 1, 4, 4, '-1.00', 95, 1);

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
(1, 3, 1, 'Vorchan'),
(2, 3, 1, 'Vorchan'),
(3, 4, 4, 'Javelin');

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
  `name` varchar(255) DEFAULT '""',
  `display` varchar(50) DEFAULT '',
  `status` varchar(255) DEFAULT '""',
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
  `phase` int(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `units`
--

INSERT INTO `units` (`id`, `gameid`, `userid`, `ship`, `ball`, `name`, `display`, `status`, `available`, `destroyed`, `x`, `y`, `facing`, `delay`, `thrust`, `rolling`, `rolled`, `turn`, `phase`) VALUES
(1, 1, 1, 1, 0, 'Artemis', '', 'bought', 1, 0, -69, -19, 310, 0, 175, 0, 0, 3, 3),
(2, 2, 2, 1, 0, 'Altarian', '', 'bought', 1, 0, 110, -191, 161, 32, 175, 0, 0, 3, 3),
(3, 1, 2, 1, 0, 'Squadron', '', 'bought', 1, 0, 78, 149, 232, 11, 190, 0, 0, 3, 3),
(4, 1, 2, 0, 1, 'Salvo', '', 'deployed', 3, 0, 131, 86, 208, 0, 230, 0, 0, 3, 3);

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
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;
--
-- AUTO_INCREMENT für Tabelle `chat`
--
ALTER TABLE `chat`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `damages`
--
ALTER TABLE `damages`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
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
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT für Tabelle `missions`
--
ALTER TABLE `missions`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT für Tabelle `playerstatus`
--
ALTER TABLE `playerstatus`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT für Tabelle `powers`
--
ALTER TABLE `powers`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
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
-- AUTO_INCREMENT für Tabelle `subunits`
--
ALTER TABLE `subunits`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT für Tabelle `systemcrits`
--
ALTER TABLE `systemcrits`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `units`
--
ALTER TABLE `units`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

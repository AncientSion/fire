-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 09. Aug 2018 um 16:27
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
(1, 1, 1, 'deploy', 0, -252, 155, '0.00', 0, 0, 1, 1),
(2, 2, 1, 'deploy', 0, 240, 167, '180.00', 0, 0, 1, 1),
(3, 2, 1, 'jumpIn', 0, 240, 167, '0.00', 0, 0, 0, 1),
(4, 1, 1, 'jumpIn', 0, -252, 155, '0.00', 0, 0, 0, 1),
(5, 2, 1, 'speed', -1, 240, 167, '0.00', 30, 0, 1, 1),
(6, 2, 1, 'speed', -1, 240, 167, '0.00', 30, 0, 1, 1),
(7, 2, 1, 'move', 117, 123, 167, '0.00', 0, 0, 1, 1),
(8, 1, 1, 'move', 175, -77, 155, '0.00', 0, 0, 1, 1),
(9, 4, 1, 'deploy', 0, 277, -1, '180.00', 0, 0, 1, 1),
(10, 5, 1, 'deploy', 0, 295, 325, '180.00', 0, 0, 1, 1),
(11, 3, 1, 'deploy', 0, -225, 311, '0.00', 0, 0, 1, 1),
(12, 3, 1, 'jumpIn', 0, -225, 311, '0.00', 0, 0, 0, 1),
(13, 4, 1, 'jumpIn', 0, 277, -1, '0.00', 0, 0, 0, 1),
(14, 5, 1, 'jumpIn', 0, 295, 325, '0.00', 0, 0, 0, 1),
(15, 3, 1, 'move', 140, -85, 311, '0.00', 0, 0, 1, 1),
(16, 4, 1, 'move', 165, 112, -1, '0.00', 0, 0, 1, 1),
(17, 5, 1, 'move', 175, 120, 325, '0.00', 0, 0, 1, 1);

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
(1, 9, 2, 3, 6, 1, 1, 0, 'Particle', 49, 0, 0, 43, 0, 30, 19, 0, 'p;', 0),
(2, 5, 2, 3, 26, 1, 1, 0, 'Particle', 35, 0, 0, 19, 0, 16, 19, 0, 'p;', 0),
(3, 6, 2, 3, 26, 1, 1, 0, 'Particle', 33, 0, 0, 18, 0, 15, 18, 0, 'p;', 0),
(4, 8, 2, 3, 6, 8, 1, 0, 'Particle', 60, 0, 45, 45, 0, 0, 15, 0, 'p;', 0),
(5, 10, 2, 3, 6, 9, 1, 0, 'Particle', 51, 0, 42, 34, 0, 0, 9, 0, 'p;', 0),
(6, 7, 2, 3, 6, 11, 1, 0, 'Particle', 45, 0, 29, 38, 0, 0, 16, 0, 'p;', 0),
(7, 5, 2, 3, 26, 28, 1, 0, 'Particle', 28, 0, 19, 9, 0, 0, 9, 0, 'p;', 0),
(8, 6, 2, 3, 26, 28, 1, 0, 'Particle', 35, 0, 9, 8, 0, 18, 8, 1, 'p;o2;', 0),
(9, 11, 2, 4, 16, 1, 1, 0, 'Pulse', 80, 0, 0, 40, 0, 0, 16, 0, 'b;v5;', 0),
(10, 12, 2, 4, 16, 1, 1, 0, 'Pulse', 80, 0, 0, 75, 0, 5, 15, 0, 'p;v5;', 0),
(11, 17, 2, 4, 16, 1, 1, 0, 'Pulse', 80, 0, 0, 60, 0, 20, 12, 0, 'p;v5;', 0),
(12, 18, 2, 4, 16, 1, 1, 0, 'Pulse', 80, 0, 0, 50, 0, 30, 10, 0, 'p;v5;', 0),
(13, 19, 2, 4, 16, 1, 1, 0, 'Pulse', 70, 0, 0, 45, 0, 25, 9, 0, 'p;v5;', 0),
(14, 20, 2, 4, 16, 1, 1, 0, 'Pulse', 80, 0, 0, 40, 0, 40, 8, 0, 'p;v5;', 0),
(15, 21, 2, 4, 16, 1, 1, 0, 'Pulse', 70, 0, 0, 30, 0, 40, 6, 0, 'p;v5;', 0),
(16, 22, 2, 4, 16, 1, 1, 0, 'Pulse', 70, 0, 0, 30, 0, 40, 6, 0, 'p;v5;', 0),
(17, 14, 2, 5, 4, 4, 1, 0, 'Pulse', 75, 0, 0, 55, 0, 20, 11, 0, 'p;v5;', 0),
(18, 15, 2, 5, 8, 4, 1, 0, 'Pulse', 68, 0, 0, 36, 0, 32, 9, 0, 'p;v4;', 0),
(19, 16, 2, 5, 4, 4, 1, 0, 'Pulse', 80, 0, 0, 40, 0, 40, 8, 0, 'p;v5;', 0),
(20, 13, 2, 5, 8, 8, 1, 0, 'Pulse', 75, 0, 0, 55, 0, 20, 11, 0, 'p;v5;', 0);

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
(4, 1, 1, 1, 2, 120, 161, 10, 0, 0, '', 0, 0),
(5, 2, 1, 4, 3, -85, 313, 17, 2, 117, '26;70;', 2, 1),
(6, 2, 1, 4, 3, -85, 313, 18, 2, 117, '25;63;', 2, 1),
(7, 2, 1, 5, 3, -90, 318, 6, 1, 118, '33;', 1, 1),
(8, 2, 1, 5, 3, -90, 318, 7, 1, 118, '63;', 1, 1),
(9, 2, 1, 5, 3, -90, 318, 10, 1, 118, '81;', 1, 1),
(10, 2, 1, 5, 3, -90, 318, 11, 1, 118, '37;', 1, 1),
(11, 2, 1, 3, 4, 115, -3, 13, 1, 203, '25;', 1, 1),
(12, 2, 1, 3, 4, 115, -3, 14, 1, 203, '17;', 1, 1),
(13, 2, 1, 3, 5, 112, 322, 15, 1, 153, '31;', 1, 1),
(14, 2, 1, 3, 5, 112, 322, 16, 1, 153, '27;', 1, 1),
(15, 2, 1, 3, 5, 112, 322, 17, 1, 153, '95;', 1, 1),
(16, 2, 1, 3, 5, 112, 322, 18, 1, 153, '47;', 1, 1),
(17, 2, 1, 3, 4, 115, -3, 27, 1, 203, '63;', 1, 1),
(18, 2, 1, 3, 4, 115, -3, 28, 1, 203, '34;', 1, 1),
(19, 2, 1, 3, 4, 115, -3, 29, 1, 203, '70;', 1, 1),
(20, 2, 1, 3, 4, 115, -3, 30, 1, 203, '24;', 1, 1),
(21, 2, 1, 3, 4, 115, -3, 31, 1, 203, '6;', 1, 1),
(22, 2, 1, 3, 4, 115, -3, 32, 1, 203, '27;', 1, 1);

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
(1, 'myGame', 'active', 1, 2, 3500, 1500, 11, 3, 10, 10),
(2, 'myGame', 'active', 1, 3, 3500, 1500, 11, 3, 10, 10);

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
(1, 2, 7, 'Vran', 10),
(2, 3, 9, 'Aurora', 12);

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
  `maxFocus` int(4) DEFAULT '0',
  `gainFocus` int(4) DEFAULT '0',
  `curFocus` int(4) DEFAULT '0',
  `status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `playerstatus`
--

INSERT INTO `playerstatus` (`id`, `userid`, `gameid`, `turn`, `phase`, `faction`, `value`, `maxFocus`, `gainFocus`, `curFocus`, `status`) VALUES
(1, 2, 1, 1, 2, 'Centauri Republic', 4440, 1120, 280, 280, 'ready'),
(2, 1, 1, 1, 2, 'Narn Regime', 4250, 1540, 385, 385, 'waiting'),
(3, 1, 2, 1, 3, 'Earth Alliance', 3564, 1680, 420, 420, 'waiting'),
(4, 2, 2, 1, 3, 'Centauri Republic', 3930, 1120, 280, 280, 'waiting');

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
(1, 1, 5, 1, '0', 0),
(2, 1, 9, 1, '0', 0),
(3, 2, 7, 1, '0', 0),
(4, 2, 9, 1, '0', 0),
(5, 3, 7, 1, '-1', 0),
(6, 3, 8, 1, '-1', 0),
(7, 3, 10, 1, '-1', 0),
(8, 3, 11, 1, '-1', 0),
(9, 3, 13, 1, '-1', 0),
(10, 3, 14, 1, '-1', 0),
(11, 3, 15, 1, '-1', 0),
(12, 3, 16, 1, '-1', 0),
(13, 3, 17, 1, '-1', 0),
(14, 3, 18, 1, '-1', 0),
(15, 3, 19, 1, '-1', 0),
(16, 3, 20, 1, '-1', 0),
(17, 3, 27, 1, '-1', 0),
(18, 3, 28, 1, '-1', 0),
(19, 3, 29, 1, '-1', 0),
(20, 3, 30, 1, '-1', 0),
(21, 3, 31, 1, '-1', 0),
(22, 3, 32, 1, '-1', 0),
(23, 3, 33, 1, '-1', 0),
(24, 3, 34, 1, '-1', 0);

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
(1, 1, 2, 1, '-1.00', 77, 0),
(2, 2, 4, 1, '-1.00', 110, 0),
(3, 4, 4, 1, '-1.00', 106, 0),
(4, 5, 2, 1, '-1.00', 77, 0),
(5, 3, 4, 1, '-1.00', 117, 0);

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
(1, 1, 1, 'Vorchan'),
(2, 1, 1, 'Vorchan'),
(3, 5, 1, 'Vorchan'),
(4, 5, 1, 'Vorchan');

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
(1, 3, 5, 1, 'Overload', 0, '1.48'),
(2, 5, 5, 1, 'Ammo Amount', 0, '15.00'),
(3, 5, 6, 1, 'Damage', 0, '30.00');

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
(1, 1, 2, 1, 0, 'Squadron', '', 'bought', 1, 1, 0, -252, 155, '0.00', 0, 175, 0, 0, 0, 1, -1, 0, ''),
(2, 1, 1, 1, 0, 'GSten', '', 'bought', 1, 1, 0, 240, 167, '0.00', 0, 155, 0, 0, 0, 1, -1, 0, ''),
(3, 2, 1, 1, 0, 'Omega', '', 'bought', 1, 1, 0, -225, 311, '0.00', 0, 140, 0, 0, 0, 1, -1, 0, ''),
(4, 2, 2, 1, 0, 'Altarian', '', 'bought', 0, 1, 0, 277, -1, '0.00', 0, 165, 0, 0, 0, 1, -1, 0, ''),
(5, 2, 2, 1, 0, 'Squadron', '', 'bought', 1, 1, 0, 295, 325, '0.00', 0, 175, 0, 0, 0, 1, -1, 0, 'm4;');

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
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT für Tabelle `chat`
--
ALTER TABLE `chat`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `damages`
--
ALTER TABLE `damages`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT für Tabelle `fireorders`
--
ALTER TABLE `fireorders`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT für Tabelle `games`
--
ALTER TABLE `games`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT für Tabelle `loads`
--
ALTER TABLE `loads`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT für Tabelle `missions`
--
ALTER TABLE `missions`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `playerstatus`
--
ALTER TABLE `playerstatus`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT für Tabelle `powers`
--
ALTER TABLE `powers`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
--
-- AUTO_INCREMENT für Tabelle `sensors`
--
ALTER TABLE `sensors`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT für Tabelle `subunits`
--
ALTER TABLE `subunits`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT für Tabelle `systemcrits`
--
ALTER TABLE `systemcrits`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT für Tabelle `units`
--
ALTER TABLE `units`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

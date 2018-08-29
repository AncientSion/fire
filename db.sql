-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 29. Aug 2018 um 20:49
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
(1, 6, 1, 'deploy', 0, 354, 372, '180.00', 0, 0, 1, 1),
(2, 7, 1, 'deploy', 0, 339, 566, '180.00', 0, 0, 1, 1),
(3, 4, 1, 'deploy', 0, 374, 19, '180.00', 0, 0, 1, 1),
(4, 5, 1, 'deploy', 0, 368, 148, '180.00', 0, 0, 1, 1),
(5, 2, 1, 'deploy', 0, -367, 345, '0.00', 0, 0, 1, 1),
(6, 3, 1, 'deploy', 0, -361, -3, '0.00', 0, 0, 1, 1),
(7, 1, 1, 'deploy', 0, -249, 227, '0.00', 0, 0, 1, 1),
(8, 1, 1, 'jumpIn', 0, -249, 227, '0.00', 0, 0, 0, 1),
(9, 2, 1, 'jumpIn', 0, -367, 345, '0.00', 0, 0, 0, 1),
(10, 3, 1, 'jumpIn', 0, -361, -3, '0.00', 0, 0, 0, 1),
(11, 4, 1, 'jumpIn', 0, 374, 19, '0.00', 0, 0, 0, 1),
(12, 5, 1, 'jumpIn', 0, 368, 148, '0.00', 0, 0, 0, 1),
(13, 6, 1, 'jumpIn', 0, 354, 372, '0.00', 0, 0, 0, 1),
(14, 7, 1, 'jumpIn', 0, 339, 566, '0.00', 0, 0, 0, 1),
(15, 2, 1, 'move', 165, -202, 345, '0.00', 0, 0, 1, 1),
(16, 3, 1, 'move', 165, -196, -3, '0.00', 0, 0, 1, 1),
(17, 1, 1, 'move', 185, -64, 227, '0.00', 0, 0, 1, 1),
(18, 6, 1, 'move', 165, 189, 372, '0.00', 0, 0, 1, 1),
(19, 7, 1, 'move', 165, 174, 566, '0.00', 0, 0, 1, 1),
(20, 4, 1, 'move', 165, 209, 19, '0.00', 0, 0, 1, 1),
(21, 5, 1, 'move', 165, 203, 148, '0.00', 0, 0, 1, 1);

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
(1, 2, 1, 5, 1, -71, 223, 18, 0, 0, '', 0, 0),
(2, 2, 1, 1, 5, 202, 144, 5, 0, 0, '', 0, 0),
(3, 2, 1, 1, 5, 202, 144, 9, 0, 0, '', 0, 0),
(4, 2, 1, 1, 6, 192, 375, 10, 0, 0, '', 0, 0),
(5, 2, 1, 1, 6, 192, 375, 11, 0, 0, '', 0, 0),
(6, 2, 1, 1, 5, 202, 144, 13, 0, 0, '', 0, 0),
(7, 2, 1, 1, 5, 202, 144, 17, 0, 0, '', 0, 0);

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
(2, 'myGame', 'active', 1, 2, 3500, 1500, 2, 2, 5, 10);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `globals`
--

CREATE TABLE `globals` (
  `id` int(4) NOT NULL,
  `playerstatusid` int(4) DEFAULT '0',
  `turn` int(4) DEFAULT '0',
  `type` varchar(20) DEFAULT '',
  `value` decimal(5,2) DEFAULT '0.00',
  `notes` varchar(20) NOT NULL DEFAULT ''
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

--
-- Daten für Tabelle `loads`
--

INSERT INTO `loads` (`id`, `shipid`, `systemid`, `name`, `amount`) VALUES
(1, 1, 1, 'Command', 3),
(2, 1, 1, 'Sensor', 3);

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
(2, 1, 2, 1, 2, 'Centauri Republic', 2253, 2747, 0, 0, 280, 'ready'),
(3, 2, 2, 1, 2, 'Narn Regime', 1900, 3100, 0, 0, 0, 'ready');

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
(1, 6, 11, 1, '-1', 0),
(2, 6, 12, 1, '-1', 0),
(3, 6, 17, 1, '-1', 0),
(4, 6, 18, 1, '-1', 0),
(5, 7, 11, 1, '-1', 0),
(6, 7, 12, 1, '-1', 0),
(7, 7, 17, 1, '-1', 0),
(8, 7, 18, 1, '-1', 0);

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
(1, 6, 4, 1, '-1.00', 95, 0),
(2, 7, 4, 1, '-1.00', 95, 0),
(3, 4, 4, 1, '-1.00', 102, 0),
(4, 5, 4, 1, '-1.00', 102, 0),
(5, 2, 4, 1, '-1.00', 106, 0),
(6, 3, 4, 1, '-1.00', 106, 0),
(7, 1, 2, 1, '-1.00', 66, 0);

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
(1, 1, 1, 'Haven'),
(2, 1, 1, 'Haven'),
(3, 1, 1, 'Haven'),
(4, 1, 1, 'Haven');

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
  `gameid` int(3) DEFAULT '0',
  `userid` int(3) DEFAULT '0',
  `ship` tinyint(1) DEFAULT '0',
  `ball` tinyint(1) DEFAULT '0',
  `name` varchar(255) DEFAULT '',
  `display` varchar(40) DEFAULT '',
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

INSERT INTO `units` (`id`, `gameid`, `userid`, `ship`, `ball`, `name`, `display`, `moraleCost`, `status`, `command`, `available`, `destroyed`, `x`, `y`, `facing`, `delay`, `thrust`, `rolling`, `rolled`, `flipped`, `turn`, `phase`, `focus`, `notes`) VALUES
(1, 2, 1, 1, 0, 'Squadron', 'Fibonacci', 1233, 'bought', 1, 1, 0, -249, 227, '0.00', 0, 185, 0, 0, 0, 1, -1, 0, '--R: 98, tMag: 105--'),
(2, 2, 1, 1, 0, 'Altarian', '', 510, 'bought', 0, 1, 0, -367, 345, '0.00', 0, 165, 0, 0, 0, 1, -1, 0, ''),
(3, 2, 1, 1, 0, 'Altarian', '', 510, 'bought', 0, 1, 0, -361, -3, '0.00', 0, 165, 0, 0, 0, 1, -1, 0, ''),
(4, 2, 2, 1, 0, 'KaToc', '', 460, 'bought', 0, 1, 0, 374, 19, '0.00', 0, 165, 0, 0, 0, 1, -1, 0, ''),
(5, 2, 2, 1, 0, 'KaToc', '', 460, 'bought', 1, 1, 0, 368, 148, '0.00', 0, 165, 0, 0, 0, 1, -1, 0, '--R: 70, tMag: 74--'),
(6, 2, 2, 1, 0, 'Artemis', '', 490, 'bought', 0, 1, 0, 354, 372, '0.00', 0, 165, 0, 0, 0, 1, -1, 0, ''),
(7, 2, 2, 1, 0, 'Artemis', '', 490, 'bought', 0, 1, 0, 339, 566, '0.00', 0, 165, 0, 0, 0, 1, -1, 0, '');

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
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
--
-- AUTO_INCREMENT für Tabelle `chat`
--
ALTER TABLE `chat`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `damages`
--
ALTER TABLE `damages`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=273;
--
-- AUTO_INCREMENT für Tabelle `fireorders`
--
ALTER TABLE `fireorders`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT für Tabelle `games`
--
ALTER TABLE `games`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT für Tabelle `globals`
--
ALTER TABLE `globals`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
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
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT für Tabelle `powers`
--
ALTER TABLE `powers`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT für Tabelle `sensors`
--
ALTER TABLE `sensors`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT für Tabelle `subunits`
--
ALTER TABLE `subunits`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT für Tabelle `systemcrits`
--
ALTER TABLE `systemcrits`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=95;
--
-- AUTO_INCREMENT für Tabelle `units`
--
ALTER TABLE `units`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 26. Feb 2017 um 18:38
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
(1, 4, 1, 'deploy', 0, 1287, 400, 180, 0, 0, 1, 1),
(2, 1, 1, 'deploy', 0, 369, 178, 0, 0, 0, 1, 1),
(3, 2, 1, 'deploy', 0, 365, 689, 0, 0, 0, 1, 1),
(4, 3, 1, 'deploy', 0, 338, 441, 0, 0, 0, 1, 1),
(5, 1, 1, 'move', 165, 535, 179, 0, 0, 0, 1, 1),
(6, 2, 1, 'move', 165, 531, 690, 0, 0, 0, 1, 1),
(7, 3, 1, 'move', 165, 504, 442, 0, 0, 0, 1, 1),
(8, 4, 1, 'move', 130, 1158, 400, 0, 0, 0, 1, 1),
(9, 1, 2, 'move', 82, 617, 189, 0, 0, 0, 1, 1),
(10, 1, 2, 'turn', 0, 617, 189, 30, 123, 141, 2, 1),
(11, 1, 2, 'move', 83, 688, 231, 0, 0, 0, 1, 1),
(12, 2, 2, 'turn', 0, 531, 690, -30, 123, 141, 1, 1),
(13, 2, 2, 'move', 141, 653, 620, 0, 0, 0, 1, 1),
(14, 2, 2, 'turn', 0, 653, 620, -30, 123, 141, 1, 1),
(15, 2, 2, 'move', 24, 665, 599, 0, 0, 0, 1, 1),
(16, 3, 2, 'move', 121, 625, 454, 0, 0, 0, 1, 1),
(17, 3, 2, 'turn', 0, 625, 454, -30, 123, 141, 2.2, 1),
(18, 3, 2, 'move', 44, 663, 432, 0, 0, 0, 1, 1),
(19, 4, 2, 'turn', 0, 1158, 400, 30, 473, 226, 1.8, 1),
(20, 4, 2, 'move', 130, 1045, 335, 0, 0, 0, 1, 1);

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
  `mitigation` decimal(10,0) DEFAULT NULL,
  `negation` int(4) DEFAULT NULL,
  `destroyed` tinyint(1) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `new` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `damages`
--

INSERT INTO `damages` (`id`, `fireid`, `gameid`, `shipid`, `structureid`, `systemid`, `turn`, `roll`, `type`, `totalDmg`, `shieldDmg`, `structDmg`, `armourDmg`, `mitigation`, `negation`, `destroyed`, `notes`, `new`) VALUES
(1, 11, 2, 1, 1, 3, 1, 69, 'Laser', 107, 0, 37, 16, '0', 16, 1, '', 0),
(2, 11, 2, 1, 1, -1, 1, 69, 'Laser', 107, 0, 21, 32, '0', 31, 0, '', 0),
(3, 10, 2, 1, 1, 6, 1, 2, 'Laser', 123, 0, 40, 21, '0', 21, 0, '', 0),
(4, 10, 2, 1, 1, -1, 1, 2, 'Laser', 123, 0, 32, 29, '0', 28, 0, '', 0),
(5, 12, 2, 1, 1, -1, 1, 40, 'Laser', 107, 0, 26, 27, '0', 27, 0, '', 0),
(6, 12, 2, 1, 1, 2, 1, 40, 'Laser', 107, 0, 35, 18, '0', 18, 0, '', 0),
(7, 13, 2, 1, 1, 23, 1, 37, 'Laser', 127, 0, 38, 25, '0', 25, 0, '', 0),
(8, 13, 2, 1, 1, 5, 1, 37, 'Laser', 127, 0, 51, 12, '0', 12, 1, '', 0),
(9, 2, 2, 4, 10, -1, 1, 49, 'Matter', 47, 0, 25, 22, '0', 44, 0, '', 0),
(10, 4, 2, 4, 1, 6, 1, 53, 'Matter', 47, 0, 32, 15, '0', 31, 0, '', 0),
(11, 7, 2, 4, 1, 3, 1, 41, 'Matter', 48, 0, 33, 15, '0', 31, 0, '', 0),
(12, 3, 2, 4, 10, -1, 1, 38, 'Laser', 225, 0, 31, 44, '0', 44, 0, '', 0),
(13, 3, 2, 4, 10, -1, 1, 38, 'Laser', 225, 0, 31, 44, '0', 43, 0, '', 0),
(14, 3, 2, 4, 10, -1, 1, 38, 'Laser', 225, 0, 32, 43, '0', 42, 0, '', 0),
(15, 6, 2, 4, 1, -1, 1, 68, 'Laser', 250, 0, 39, 44, '0', 44, 0, '', 0),
(16, 6, 2, 4, 1, -1, 1, 68, 'Laser', 250, 0, 40, 43, '0', 43, 0, '', 0),
(17, 6, 2, 4, 1, -1, 1, 68, 'Laser', 250, 0, 40, 43, '0', 42, 0, '', 0),
(18, 9, 2, 4, 1, -1, 1, 85, 'Laser', 204, 0, 26, 42, '0', 42, 0, '', 0),
(19, 9, 2, 4, 1, -1, 1, 85, 'Laser', 204, 0, 26, 42, '0', 41, 0, '', 0),
(20, 9, 2, 4, 1, 9, 1, 85, 'Laser', 204, 0, 39, 29, '0', 28, 0, '', 0);

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
  `classname` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  `shots` int(3) DEFAULT NULL,
  `req` int(3) NOT NULL DEFAULT '0',
  `notes` varchar(255) NOT NULL DEFAULT '0',
  `hits` int(3) NOT NULL DEFAULT '0',
  `resolved` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `fireorders`
--

INSERT INTO `fireorders` (`id`, `gameid`, `turn`, `shooterid`, `targetid`, `weaponid`, `shots`, `req`, `notes`, `hits`, `resolved`) VALUES
(1, 2, 1, 1, 4, 2, 1, 63, '0 100', 0, 1),
(2, 2, 1, 1, 4, 6, 1, 63, '0 49', 1, 1),
(3, 2, 1, 1, 4, 8, 1, 114, '038 ', 3, 1),
(4, 2, 1, 2, 4, 2, 1, 63, '0 53', 1, 1),
(5, 2, 1, 2, 4, 6, 1, 63, '0 93', 0, 1),
(6, 2, 1, 2, 4, 17, 1, 116, '068 ', 3, 1),
(7, 2, 1, 3, 4, 2, 1, 53, '0 41', 1, 1),
(8, 2, 1, 3, 4, 6, 1, 53, '0 63', 0, 1),
(9, 2, 1, 3, 4, 17, 1, 103, '085 ', 3, 1),
(10, 2, 1, 4, 1, 2, 1, 71, '02 ', 2, 1),
(11, 2, 1, 4, 1, 3, 1, 71, '069 ', 2, 1),
(12, 2, 1, 4, 1, 11, 1, 71, '040 ', 2, 1),
(13, 2, 1, 4, 1, 12, 1, 71, '037 ', 2, 1),
(14, 2, 2, 1, 4, 17, 1, 0, '0', 0, 0),
(15, 2, 2, 1, 4, 18, 3, 0, '0', 0, 0),
(16, 2, 2, 1, 4, 19, 3, 0, '0', 0, 0),
(17, 2, 2, 2, 4, 3, 3, 0, '0', 0, 0),
(18, 2, 2, 2, 4, 5, 3, 0, '0', 0, 0),
(19, 2, 2, 2, 4, 8, 1, 0, '0', 0, 0),
(20, 2, 2, 2, 4, 9, 3, 0, '0', 0, 0),
(21, 2, 2, 2, 4, 10, 3, 0, '0', 0, 0),
(22, 2, 2, 3, 4, 3, 3, 0, '0', 0, 0),
(23, 2, 2, 3, 4, 5, 3, 0, '0', 0, 0),
(24, 2, 2, 3, 4, 8, 1, 0, '0', 0, 0),
(25, 2, 2, 3, 4, 9, 3, 0, '0', 0, 0),
(26, 2, 2, 3, 4, 10, 3, 0, '0', 0, 0);

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
(1, 'test', 'open', -1, -1, 3, 0),
(2, 'test30', 'active', 2, 2, 3000, 300);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `loads`
--

CREATE TABLE `loads` (
  `id` int(4) NOT NULL,
  `shipid` int(5) DEFAULT NULL,
  `systemid` int(3) DEFAULT NULL,
  `classname` varchar(20) DEFAULT NULL,
  `amount` int(3) DEFAULT NULL
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
  `status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `playerstatus`
--

INSERT INTO `playerstatus` (`id`, `userid`, `gameid`, `turn`, `phase`, `status`) VALUES
(2, 1, 2, 2, 2, 'ready'),
(3, 2, 2, 2, 2, 'waiting');

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
(1, 1, 4, 2, '0', 0),
(2, 1, 9, 2, '0', 0),
(3, 1, 17, 2, '1', 4),
(4, 1, 17, 2, '1', 4),
(5, 3, 22, 2, '1', 10),
(6, 4, 4, 2, '1', 3),
(7, 4, 4, 2, '1', 3),
(8, 4, 4, 2, '1', 3),
(9, 4, 5, 2, '1', 3),
(10, 4, 11, 2, '0', 0),
(11, 4, 12, 2, '0', 0),
(12, 4, 25, 2, '0', 0),
(13, 4, 26, 2, '0', 0),
(14, 4, 29, 2, '1', 8),
(15, 4, 29, 2, '1', 8);

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
(1, 2, 1, 750, 'Earth Alliance'),
(2, 2, 2, 1300, 'Minbari Federation');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `reinforcements`
--

CREATE TABLE `reinforcements` (
  `id` int(3) NOT NULL,
  `gameid` int(3) DEFAULT NULL,
  `userid` int(5) DEFAULT NULL,
  `classname` varchar(255) DEFAULT NULL,
  `turn` int(3) DEFAULT NULL,
  `arrival` int(3) DEFAULT NULL,
  `cost` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `reinforcements`
--

INSERT INTO `reinforcements` (`id`, `gameid`, `userid`, `classname`, `turn`, `arrival`, `cost`) VALUES
(1, 2, 1, 'Artemis', 2, 2, 600),
(2, 2, 2, 'Sharlin', 2, 3, 2000);

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
  `duration` int(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `systemcrits`
--

INSERT INTO `systemcrits` (`id`, `shipid`, `systemid`, `turn`, `type`, `duration`) VALUES
(1, 1, 2, 1, 'damage2', 0),
(2, 1, 6, 1, 'range2', 0),
(3, 1, 23, 1, 'dmg25', 1),
(4, 4, 3, 1, 'damage2', 0),
(5, 4, 6, 1, 'disabled', 1),
(6, 4, 9, 1, 'disabled', 1);

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
  `classname` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `available` int(3) DEFAULT NULL,
  `destroyed` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `units`
--

INSERT INTO `units` (`id`, `gameid`, `userid`, `ship`, `ball`, `classname`, `status`, `available`, `destroyed`) VALUES
(1, 2, 1, 1, 0, 'Hyperion', 'deployed', 1, 0),
(2, 2, 1, 1, 0, 'Hyperion', 'deployed', 1, 0),
(3, 2, 1, 1, 0, 'Hyperion', 'deployed', 1, 0),
(4, 2, 2, 1, 0, 'Sharlin', 'deployed', 1, 0);

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
(1, 'Chris', '147147', 1),
(2, '1', '147147', 1);

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
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT für Tabelle `damages`
--
ALTER TABLE `damages`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT für Tabelle `dogfights`
--
ALTER TABLE `dogfights`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `fighters`
--
ALTER TABLE `fighters`
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
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT für Tabelle `reinforce`
--
ALTER TABLE `reinforce`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT für Tabelle `reinforcements`
--
ALTER TABLE `reinforcements`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT für Tabelle `systemcrits`
--
ALTER TABLE `systemcrits`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
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

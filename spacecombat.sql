-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 30. Okt 2016 um 21:19
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

INSERT INTO `damages` (`id`, `fireid`, `gameid`, `shipid`, `structureid`, `turn`, `type`, `totalDmg`, `shieldDmg`, `structDmg`, `armourDmg`, `mitigation`, `destroyed`, `notes`, `new`) VALUES
(1, 1, 2, 9, 1, 1, 'Laser', 35, 0, 5, 30, '85', 0, '', 0),
(2, 2, 2, 9, 1, 1, 'Laser', 35, 0, 6, 29, '84', 0, '', 0),
(3, 3, 2, 8, 1, 1, 'Laser', 35, 0, 5, 30, '85', 0, '', 0),
(4, 4, 2, 8, 1, 1, 'Laser', 35, 0, 6, 29, '84', 0, '', 0),
(5, 5, 2, 5, 6, 1, 'Laser', 30, 0, 9, 21, '70', 0, '', 0),
(6, 7, 2, 5, 6, 1, 'Laser', 25, 0, 7, 18, '70', 0, '', 0),
(7, 8, 2, 5, 6, 1, 'Laser', 32, 0, 10, 22, '69', 0, '', 0),
(8, 9, 2, 5, 1, 1, 'Laser', 30, 0, 6, 24, '80', 0, '', 0),
(9, 11, 2, 5, 6, 1, 'Laser', 32, 0, 10, 22, '69', 0, '', 0),
(10, 12, 2, 5, 1, 1, 'Laser', 35, 0, 7, 28, '79', 0, '', 0),
(11, 13, 2, 5, 1, 1, 'Laser', 34, 0, 7, 27, '79', 0, '', 0),
(12, 14, 2, 5, 1, 1, 'Laser', 28, 0, 6, 22, '78', 0, '', 0),
(13, 15, 2, 5, 1, 1, 'Laser', 29, 0, 7, 22, '77', 0, '', 0),
(14, 16, 2, 5, 6, 1, 'Laser', 26, 0, 8, 18, '68', 0, '', 0);

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
(1, 2, 1, 4, 9, 4, 127, '87,', 1, 1),
(2, 2, 1, 4, 9, 5, 127, '56,', 1, 1),
(3, 2, 1, 5, 8, 4, 112, '83,', 1, 1),
(4, 2, 1, 5, 8, 5, 112, '16,', 1, 1),
(5, 2, 1, 8, 5, 2, 73, '56,', 1, 1),
(6, 2, 1, 8, 5, 3, 73, '77,', 0, 1),
(7, 2, 1, 8, 5, 7, 73, '2,', 1, 1),
(8, 2, 1, 8, 5, 8, 73, '36,', 1, 1),
(9, 2, 1, 8, 5, 12, 73, '69,', 1, 1),
(10, 2, 1, 8, 5, 13, 73, '75,', 0, 1),
(11, 2, 1, 9, 5, 2, 84, '77,', 1, 1),
(12, 2, 1, 9, 5, 3, 84, '83,', 1, 1),
(13, 2, 1, 9, 5, 7, 84, '49,', 1, 1),
(14, 2, 1, 9, 5, 8, 84, '52,', 1, 1),
(15, 2, 1, 9, 5, 12, 84, '73,', 1, 1),
(16, 2, 1, 9, 5, 13, 84, '30,', 1, 1);

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
  `pv` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `games`
--

INSERT INTO `games` (`id`, `name`, `status`, `turn`, `phase`, `pv`) VALUES
(1, 'test1', 'active', 1, 1, 5000),
(2, 'zest2', 'active', 1, 3, 4000);

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
(1, 1, 1, 1, 1, 'waiting'),
(2, 2, 1, 1, 1, 'waiting'),
(3, 2, 2, 1, 3, 'waiting'),
(4, 1, 2, 1, 3, 'waiting');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `reinforcements`
--

CREATE TABLE `reinforcements` (
  `id` int(5) NOT NULL,
  `gameid` int(5) DEFAULT NULL,
  `userid` int(5) DEFAULT NULL,
  `points` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `reinforcements`
--

INSERT INTO `reinforcements` (`id`, `gameid`, `userid`, `points`) VALUES
(2, 2, 1, 1600),
(3, 2, 2, 1);

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
(2, 3, 1, 'deploy', 0, 958, 231, 180, 0, 0, 1, 1),
(3, 2, 1, 'deploy', 0, 98, 130, 0, 0, 0, 1, 1),
(4, 8, 1, 'deploy', 0, 973, 91, 180, 0, 0, 1, 1),
(5, 9, 1, 'deploy', 0, 1038, 295, 180, 0, 0, 1, 1),
(6, 4, 1, 'deploy', 0, 306, 719, -30, 0, 0, 1, 1),
(7, 5, 1, 'deploy', 0, 119, 639, -30, 0, 0, 1, 1),
(8, 4, 1, 'move', 163, 458, 658, 0, 0, 0, 1, 1),
(9, 4, 1, 'turn', 0, 458, 658, -30, 298, 123, 1.8, 1),
(10, 4, 1, 'move', 38, 477, 626, 0, 0, 0, 1, 1),
(11, 5, 1, 'turn', 0, 119, 639, -30, 298, 123, 1, 1),
(12, 5, 1, 'move', 200, 219, 466, 0, 0, 0, 1, 1),
(13, 8, 1, 'move', 200, 773, 91, 0, 0, 0, 1, 1),
(14, 8, 1, 'turn', 0, 773, 91, -30, 429, 138, 1.8, 1),
(15, 9, 1, 'turn', 0, 1038, 295, -30, 429, 138, 1, 1),
(16, 9, 1, 'move', 200, 865, 395, 0, 0, 0, 1, 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `ships`
--

CREATE TABLE `ships` (
  `id` int(3) NOT NULL,
  `gameid` int(3) DEFAULT NULL,
  `userid` int(3) DEFAULT NULL,
  `shipclass` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `available` int(3) DEFAULT NULL,
  `destroyed` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `ships`
--

INSERT INTO `ships` (`id`, `gameid`, `userid`, `shipclass`, `status`, `available`, `destroyed`) VALUES
(1, 1, 1, 'Omega', 'bought', 2, 0),
(2, 1, 1, 'Omega', 'deployed', 1, 0),
(3, 1, 2, 'Sharlin', 'deployed', 1, 0),
(4, 2, 1, 'Omega', 'deployed', 1, 0),
(5, 2, 1, 'Omega', 'deployed', 1, 0),
(8, 2, 2, 'Sharlin', 'deployed', 1, 0),
(9, 2, 2, 'Sharlin', 'deployed', 1, 0),
(10, 2, 1, 'Omega', 'bought', 2, 0);

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
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT für Tabelle `fireorders`
--
ALTER TABLE `fireorders`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
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
-- AUTO_INCREMENT für Tabelle `reinforcements`
--
ALTER TABLE `reinforcements`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT für Tabelle `shipactions`
--
ALTER TABLE `shipactions`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT für Tabelle `ships`
--
ALTER TABLE `ships`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

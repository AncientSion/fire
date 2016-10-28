-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 28. Okt 2016 um 17:44
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
  `gameid` int(5) DEFAULT NULL,
  `shipid` int(5) DEFAULT NULL,
  `structureid` int(5) DEFAULT NULL,
  `turn` int(3) DEFAULT NULL,
  `totalDmg` int(5) DEFAULT NULL,
  `structDmg` int(5) DEFAULT NULL,
  `armourDmg` int(3) DEFAULT NULL,
  `mitigation` decimal(10,0) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `damages`
--

INSERT INTO `damages` (`id`, `gameid`, `shipid`, `structureid`, `turn`, `totalDmg`, `structDmg`, `armourDmg`, `mitigation`) VALUES
(3, 19, 162, 1, 1, 39, 6, 33, '85'),
(4, 19, 161, 1, 1, 28, 6, 22, '80');

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
(80, 19, 1, 161, 162, 5, 133, '32,', 1, 1),
(81, 19, 1, 162, 161, 2, 92, '27,', 1, 1);

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
(19, 'New', 'active', 1, 3, 5000),
(20, 'new1', 'active', 1, -1, 11111),
(21, 'tzzz', 'open', -1, -1, 6666);

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
(52, 1, 19, 1, 3, 'waiting'),
(54, 2, 19, 1, 3, 'waiting'),
(55, 1, 20, 1, -1, 'waiting'),
(56, 2, 20, 1, -1, 'waiting');

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
(55, 144, 1, 'deploy', 0, 1045, 91, 150, 0, 0, 1, 0),
(56, 148, 1, 'deploy', 0, 1040, 78, 150, 0, 0, 1, 1),
(57, 146, 1, 'deploy', 0, 219, 75, 0, 0, 0, 1, 1),
(58, 147, 1, 'deploy', 0, 232, 489, -30, 0, 0, 1, 1),
(59, 148, 1, 'move', 181, 884, 168, 0, 0, 0, 1, 1),
(60, 146, 1, 'move', 159, 377, 51, 0, 0, 0, 1, 1),
(61, 146, 1, 'turn', 0, 377, 51, 30, 298, 123, 1, 1),
(62, 146, 1, 'move', 22, 395, 62, 0, 0, 0, 1, 1),
(63, 147, 1, 'move', 181, 392, 399, 0, 0, 0, 1, 1),
(64, 149, 1, 'deploy', 0, 111, 122, 0, 0, 0, 1, 1),
(65, 150, 1, 'deploy', 0, 463, 667, -60, 0, 0, 1, 1),
(66, 151, 1, 'deploy', 0, 927, 45, 150, 0, 0, 1, 1),
(67, 152, 1, 'deploy', 0, 1026, 150, 150, 0, 0, 1, 1),
(68, 149, 1, 'move', 180, 291, 122, 0, 0, 0, 1, 1),
(69, 150, 1, 'move', 119, 509, 557, 0, 0, 0, 1, 1),
(70, 150, 1, 'turn', 0, 509, 557, -30, 429, 138, 1, 1),
(71, 150, 1, 'move', 61, 509, 496, 0, 0, 0, 1, 1),
(72, 151, 1, 'move', 153, 794, 121, 0, 0, 0, 1, 1),
(73, 151, 1, 'turn', 0, 794, 121, 30, 298, 123, 1, 1),
(74, 151, 1, 'move', 27, 767, 121, 0, 0, 0, 1, 1),
(75, 152, 1, 'move', 181, 870, 240, 0, 0, 0, 1, 1),
(76, 160, 1, 'deploy', 0, 192, 676, -30, 0, 0, 1, 1),
(77, 161, 1, 'deploy', 0, 56, 577, -30, 0, 0, 1, 1),
(78, 162, 1, 'deploy', 0, 630, 103, 120, 0, 0, 1, 1),
(79, 160, 1, 'move', 200, 365, 576, 0, 0, 0, 1, 1),
(80, 160, 1, 'turn', 0, 365, 576, -30, 298, 123, 1, 1),
(81, 161, 1, 'turn', 0, 56, 577, -30, 298, 123, 1, 1),
(82, 161, 1, 'move', 200, 156, 404, 0, 0, 0, 1, 1),
(87, 162, 1, 'turn', 0, 630, 103, 30, 429, 138, 1.2, 1),
(88, 162, 1, 'move', 200, 457, 203, 0, 0, 0, 1, 1);

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
  `destroyed` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `ships`
--

INSERT INTO `ships` (`id`, `gameid`, `userid`, `shipclass`, `status`, `destroyed`) VALUES
(146, 15, 1, 'Omega', 'deployed', 0),
(147, 15, 1, 'Omega', 'deployed', 0),
(148, 15, 2, 'Sharlin', 'deployed', 0),
(149, 16, 1, 'Sharlin', 'deployed', 0),
(150, 16, 1, 'Sharlin', 'deployed', 0),
(151, 16, 2, 'Omega', 'deployed', 0),
(152, 16, 2, 'Omega', 'deployed', 0),
(157, 17, 1, 'Omega', 'bought', 0),
(158, 17, 1, 'Omega', 'bought', 0),
(159, 18, 2, 'Sharlin', 'bought', 0),
(160, 19, 1, 'Omega', 'deployed', 0),
(161, 19, 1, 'Omega', 'deployed', 0),
(162, 19, 2, 'Sharlin', 'deployed', 0),
(163, 20, 1, 'Omega', 'bought', 0),
(164, 20, 2, 'Sharlin', 'bought', 0);

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
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT für Tabelle `fireorders`
--
ALTER TABLE `fireorders`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;
--
-- AUTO_INCREMENT für Tabelle `games`
--
ALTER TABLE `games`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
--
-- AUTO_INCREMENT für Tabelle `playerstatus`
--
ALTER TABLE `playerstatus`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;
--
-- AUTO_INCREMENT für Tabelle `shipactions`
--
ALTER TABLE `shipactions`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;
--
-- AUTO_INCREMENT für Tabelle `ships`
--
ALTER TABLE `ships`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=165;
--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 09. Feb 2017 um 19:40
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
(1, 3, 1, 'deploy', 0, 964, 166, 180, 0, 0, 1, 1),
(2, 4, 1, 'deploy', 0, 956, 415, 180, 0, 0, 1, 1),
(3, 1, 1, 'deploy', 0, 329, 257, 0, 0, 0, 1, 1),
(4, 2, 1, 'deploy', 0, 395, 96, 0, 0, 0, 1, 1),
(5, 1, 1, 'speedChange', -1, 329, 257, 0, 117, 0, 1, 1),
(6, 1, 1, 'move', 150, 479, 257, 0, 0, 0, 1, 1),
(7, 2, 1, 'speedChange', -1, 395, 96, 0, 333, 0, 1, 1),
(8, 2, 1, 'move', 130, 525, 96, 0, 0, 0, 1, 1),
(9, 3, 1, 'speedChange', -1, 964, 166, 0, 265, 0, 1, 1),
(10, 3, 1, 'move', 130, 834, 166, 0, 0, 0, 1, 1),
(11, 4, 1, 'speedChange', -1, 956, 415, 0, 36, 0, 1, 1),
(12, 4, 1, 'move', 150, 806, 415, 0, 0, 0, 1, 1),
(13, 5, 2, 'deploy', 0, 581, 98, 2, 0, 0, 1, 1),
(14, 6, 2, 'deploy', 0, 801, 227, 118, 0, 0, 1, 1),
(15, 8, 2, 'launch', 0, 823, 421, 0, 0, 0, 0, 1),
(16, 9, 2, 'launch', 0, 508, 272, 0, 0, 0, 0, 1),
(17, 10, 2, 'launch', 0, 496, 261, 0, 0, 0, 0, 1),
(18, 3, 2, 'turn', 0, 834, 166, 30, 221, 161, 1, 1),
(19, 3, 2, 'move', 130, 721, 101, 0, 0, 0, 1, 1),
(20, 4, 2, 'move', 150, 656, 415, 0, 0, 0, 1, 1),
(21, 1, 2, 'turn', 0, 479, 257, 30, 81, 114, 1, 1),
(22, 1, 2, 'move', 114, 578, 314, 0, 0, 0, 1, 1),
(23, 1, 2, 'turn', 0, 578, 314, 30, 81, 114, 1, 1),
(24, 1, 2, 'move', 36, 596, 345, 0, 0, 0, 1, 1),
(25, 2, 2, 'turn', 0, 525, 96, 30, 294, 178, 1, 1),
(26, 2, 2, 'move', 130, 638, 161, 0, 0, 0, 1, 1),
(27, 12, 1, 'deploy', 0, 1521, 308, 180, 0, 0, 1, 1),
(28, 11, 1, 'deploy', 0, 377, 211, 0, 0, 0, 1, 1),
(29, 5, 2, 'speedChange', -1, 581, 98, 0, 19, 0, 1, 1),
(30, 5, 2, 'turn', 0, 581, 98, 30, 18, 36, 1, 1),
(31, 5, 2, 'turn', 0, 581, 98, 30, 18, 36, 1, 1),
(32, 5, 2, 'move', 235, 691, 305, 0, 0, 0, 1, 1),
(33, 5, 2, 'turn', 0, 691, 305, 30, 18, 36, 1, 1),
(34, 6, 2, 'turn', 0, 801, 227, 30, 16, 32, 1, 1),
(35, 6, 2, 'move', 32, 774, 244, 0, 0, 0, 1, 1),
(36, 6, 2, 'turn', 0, 774, 244, 30, 16, 32, 1, 1),
(37, 6, 2, 'move', 32, 742, 245, 0, 0, 0, 1, 1),
(38, 6, 2, 'turn', 0, 742, 245, 30, 16, 32, 1, 1),
(39, 6, 2, 'move', 104, 643, 211, 0, 0, 0, 1, 1),
(40, 6, 2, 'turn', 0, 643, 211, -30, 16, 32, 1, 1),
(41, 6, 2, 'move', 32, 611, 212, 0, 0, 0, 1, 1),
(42, 6, 2, 'turn', 0, 611, 212, -30, 16, 32, 1, 1),
(43, 6, 2, 'move', 50, 569, 238, 0, 0, 0, 1, 1);

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
(21, 5, 1, 1, 1, -1, 1, 3, 'Particle', 76, 0, 46, 30, '0', 30, 0, '', 0),
(22, 3, 1, 2, 1, 6, 1, 18, 'Particle', 82, 0, 42, 40, '0', 40, 0, '', 0),
(23, 3, 1, 2, 1, 4, 1, 36, 'Particle', 89, 0, 50, 39, '0', 39, 0, '', 0),
(24, 4, 1, 2, 1, -1, 1, 32, 'Particle', 80, 0, 38, 42, '0', 42, 0, '', 0),
(25, 4, 1, 2, 1, 26, 1, 10, 'Particle', 91, 0, 50, 41, '0', 40, 0, '', 0),
(26, 1, 1, 3, 1, -1, 1, 2, 'Laser', 214, 0, 36, 35, '0', 35, 0, '', 0),
(27, 1, 1, 3, 1, 2, 1, 2, 'Laser', 214, 0, 47, 24, '0', 24, 0, '', 0),
(28, 1, 1, 3, 1, -1, 1, 2, 'Laser', 214, 0, 37, 34, '0', 33, 0, '', 0);

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

--
-- Daten für Tabelle `fighters`
--

INSERT INTO `fighters` (`id`, `unitid`, `amount`, `classname`) VALUES
(1, 5, 6, 'Aurora'),
(2, 6, 6, 'Sentri');

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
(1, 1, 1, 2, 3, 5, 1, 86, '2 ', 3, 1),
(2, 1, 1, 2, 4, 6, 1, 29, '99 ', 0, 1),
(3, 1, 1, 3, 2, 2, 2, 93, '', 2, 1),
(4, 1, 1, 3, 2, 3, 2, 93, '', 2, 1),
(5, 1, 1, 3, 1, 4, 2, 53, '', 1, 1),
(6, 1, 1, 3, 1, 5, 2, 53, '', 0, 1),
(7, 1, 2, 1, 3, 3, 4, 0, '0', 0, 1),
(8, 1, 2, 1, 4, 4, 4, 0, '0', 0, 1),
(9, 1, 2, 4, 2, 3, 3, 0, '0', 0, 1),
(10, 1, 2, 2, 6, 8, 3, 0, '0', 0, 0),
(11, 1, 2, 2, 6, 9, 3, 0, '0', 0, 0),
(12, 1, 2, 2, 6, 10, 3, 0, '0', 0, 0),
(13, 1, 2, 5, 4, 2, 1, 0, '0', 0, 0),
(14, 1, 2, 5, 4, 4, 1, 0, '0', 0, 0),
(15, 1, 2, 5, 4, 6, 1, 0, '0', 0, 0),
(16, 1, 2, 5, 4, 8, 1, 0, '0', 0, 0),
(17, 1, 2, 5, 4, 10, 1, 0, '0', 0, 0),
(18, 1, 2, 5, 4, 12, 1, 0, '0', 0, 0),
(19, 1, 2, 4, 1, 2, 2, 0, '0', 0, 0),
(20, 1, 2, 4, 1, 4, 2, 0, '0', 0, 0),
(21, 1, 2, 6, 9, 2, 1, 0, '0', 0, 0),
(22, 1, 2, 6, 9, 4, 1, 0, '0', 0, 0),
(23, 1, 2, 6, 9, 6, 1, 0, '0', 0, 0),
(24, 1, 2, 6, 9, 8, 1, 0, '0', 0, 0),
(25, 1, 2, 6, 9, 10, 1, 0, '0', 0, 0),
(26, 1, 2, 6, 9, 12, 1, 0, '0', 0, 0);

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
(1, 'test', 'active', 2, 2, 3000, 300),
(2, '1', 'active', 1, 0, 2000, 200);

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

--
-- Daten für Tabelle `loads`
--

INSERT INTO `loads` (`id`, `shipid`, `systemid`, `classname`, `amount`) VALUES
(1, 2, 4, 'Aurora', 0),
(2, 2, 4, 'Thunderbolt', 6),
(3, 3, 10, 'Sentri', 6),
(4, 3, 19, 'Sentri', 0);

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
(1, 1, 1, 2, 2, 'ready'),
(2, 2, 1, 2, 2, 'ready'),
(3, 1, 2, 1, 0, 'waiting'),
(4, 2, 2, 1, 0, 'waiting');

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
(1, 1, 1, 956, 'Earth Alliance'),
(2, 1, 2, 684, 'Centauri Republic'),
(3, 2, 1, 1400, 'Centauri Republic'),
(4, 2, 2, 1000, 'Minbari Federation');

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
(1, 1, 1, 'Omega', 2, 2, 1200);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `systemcrits`
--

CREATE TABLE `systemcrits` (
  `id` int(4) NOT NULL,
  `gameid` int(4) DEFAULT NULL,
  `shipid` int(4) DEFAULT NULL,
  `systemid` int(4) DEFAULT NULL,
  `turn` int(3) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `duration` int(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `systemcrits`
--

INSERT INTO `systemcrits` (`id`, `gameid`, `shipid`, `systemid`, `turn`, `type`, `duration`) VALUES
(3, 1, 2, 2, 1, 'range2', 15),
(4, 1, 2, 3, 1, 'damage2', 15),
(5, 1, 2, 6, 1, 'range2', 15),
(6, 1, 3, 2, 1, 'destroyed', 15);

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
(1, 1, 1, 1, 0, 'Saggitarius', 'deployed', 1, 0),
(2, 1, 1, 1, 0, 'Omega', 'deployed', 1, 0),
(3, 1, 2, 1, 0, 'Primus', 'deployed', 1, 0),
(4, 1, 2, 1, 0, 'Demos', 'deployed', 1, 0),
(5, 1, 1, 0, 0, 'Flight', 'bought', 2, 0),
(6, 1, 2, 0, 0, 'Flight', 'bought', 2, 0),
(7, 1, 2, 1, 0, 'Demos', 'bought', 6, 0),
(8, 1, 2, 2, 1, 'BallisticTorpedo', 'launched', 3, 0),
(9, 1, 1, 3, 1, 'BallisticMissile', 'launched', 4, 0),
(10, 1, 1, 4, 1, 'BallisticMissile', 'launched', 4, 0),
(11, 2, 1, 1, 0, 'Demos', 'deployed', 1, 0),
(12, 2, 2, 1, 0, 'Tinashi', 'deployed', 1, 0);

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
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;
--
-- AUTO_INCREMENT für Tabelle `damages`
--
ALTER TABLE `damages`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
--
-- AUTO_INCREMENT für Tabelle `dogfights`
--
ALTER TABLE `dogfights`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `fighters`
--
ALTER TABLE `fighters`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
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
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT für Tabelle `playerstatus`
--
ALTER TABLE `playerstatus`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT für Tabelle `reinforce`
--
ALTER TABLE `reinforce`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
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
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

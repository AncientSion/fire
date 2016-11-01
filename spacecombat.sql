-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 01. Nov 2016 um 21:27
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
(87, 61, 2, 8, 1, 1, 'Laser', 40, 0, 6, 34, '85', 0, '', 0),
(88, 62, 2, 8, 1, 1, 'Laser', 40, 0, 8, 32, '81', 0, '', 0),
(89, 63, 2, 9, 1, 1, 'Laser', 40, 0, 6, 34, '85', 0, '', 0),
(90, 64, 2, 9, 1, 1, 'Laser', 40, 0, 8, 32, '81', 0, '', 0),
(91, 65, 2, 9, 1, 1, 'Particle', 7, 0, 2, 5, '77', 0, '', 0),
(92, 65, 2, 9, 1, 1, 'Particle', 7, 0, 2, 5, '76', 0, '', 0),
(93, 65, 2, 9, 1, 1, 'Particle', 7, 0, 2, 5, '75', 0, '', 0),
(94, 66, 2, 9, 1, 1, 'Particle', 7, 0, 2, 5, '75', 0, '', 0),
(95, 66, 2, 9, 1, 1, 'Particle', 7, 0, 2, 5, '74', 0, '', 0),
(96, 66, 2, 9, 1, 1, 'Particle', 7, 0, 2, 5, '73', 0, '', 0),
(97, 67, 2, 9, 1, 1, 'Particle', 7, 0, 2, 5, '72', 0, '', 0),
(98, 67, 2, 9, 1, 1, 'Particle', 7, 0, 2, 5, '72', 0, '', 0),
(99, 67, 2, 9, 1, 1, 'Particle', 7, 0, 2, 5, '71', 0, '', 0),
(100, 68, 2, 9, 1, 1, 'Particle', 8, 0, 2, 6, '70', 0, '', 0),
(101, 68, 2, 9, 1, 1, 'Particle', 8, 0, 2, 6, '69', 0, '', 0),
(102, 68, 2, 9, 1, 1, 'Particle', 8, 0, 3, 5, '68', 0, '', 0),
(103, 69, 2, 8, 1, 1, 'Particle', 7, 0, 2, 5, '77', 0, '', 0),
(104, 69, 2, 8, 1, 1, 'Particle', 7, 0, 2, 5, '76', 0, '', 0),
(105, 70, 2, 8, 1, 1, 'Particle', 7, 0, 2, 5, '75', 0, '', 0),
(106, 70, 2, 8, 1, 1, 'Particle', 7, 0, 2, 5, '75', 0, '', 0),
(107, 71, 2, 8, 1, 1, 'Particle', 8, 0, 2, 6, '74', 0, '', 0),
(108, 71, 2, 8, 1, 1, 'Particle', 8, 0, 2, 6, '73', 0, '', 0),
(109, 72, 2, 8, 1, 1, 'Particle', 8, 0, 2, 6, '72', 0, '', 0),
(110, 72, 2, 8, 1, 1, 'Particle', 8, 0, 2, 6, '71', 0, '', 0),
(111, 73, 2, 8, 1, 1, 'Laser', 40, 0, 12, 28, '70', 0, '', 0),
(112, 74, 2, 8, 1, 1, 'Laser', 40, 0, 14, 26, '66', 0, '', 0),
(113, 75, 2, 8, 1, 1, 'Particle', 6, 0, 2, 4, '62', 0, '', 0),
(114, 76, 2, 8, 1, 1, 'Particle', 7, 0, 3, 4, '61', 0, '', 0),
(115, 76, 2, 8, 1, 1, 'Particle', 7, 0, 3, 4, '61', 0, '', 0),
(116, 76, 2, 8, 1, 1, 'Particle', 7, 0, 3, 4, '60', 0, '', 0),
(117, 77, 2, 8, 1, 1, 'Particle', 8, 0, 3, 5, '59', 0, '', 0),
(118, 77, 2, 8, 1, 1, 'Particle', 8, 0, 3, 5, '58', 0, '', 0),
(119, 78, 2, 8, 1, 1, 'Particle', 7, 0, 3, 4, '57', 0, '', 0),
(120, 78, 2, 8, 1, 1, 'Particle', 7, 0, 3, 4, '57', 0, '', 0),
(121, 80, 2, 5, 1, 1, 'Laser', 35, 0, 10, 25, '70', 0, '', 0),
(122, 81, 2, 5, 1, 1, 'Laser', 35, 0, 12, 23, '65', 0, '', 0),
(123, 84, 2, 4, 1, 1, 'Particle', 11, 0, 3, 8, '70', 0, '', 0),
(124, 85, 2, 4, 1, 1, 'Laser', 35, 0, 11, 24, '69', 0, '', 0),
(125, 86, 2, 4, 1, 1, 'Laser', 35, 0, 13, 22, '64', 0, '', 0),
(126, 88, 2, 4, 1, 1, 'Particle', 11, 0, 4, 7, '60', 0, '', 0);

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
(61, 2, 1, 4, 8, 2, 113, '75,', 1, 1),
(62, 2, 1, 4, 8, 3, 113, '14,', 1, 1),
(63, 2, 1, 4, 9, 4, 127, '39,', 1, 1),
(64, 2, 1, 4, 9, 5, 127, '78,', 1, 1),
(65, 2, 1, 4, 9, 7, 91, '64,31,65,', 3, 1),
(66, 2, 1, 4, 9, 8, 91, '86,37,64,', 3, 1),
(67, 2, 1, 4, 9, 9, 91, '80,31,90,', 3, 1),
(68, 2, 1, 4, 9, 10, 91, '83,32,74,', 3, 1),
(69, 2, 1, 4, 8, 17, 64, '38,45,80,', 2, 1),
(70, 2, 1, 4, 8, 18, 64, '22,87,53,', 2, 1),
(71, 2, 1, 4, 8, 19, 64, '51,19,81,', 2, 1),
(72, 2, 1, 4, 8, 20, 64, '69,9,58,', 2, 1),
(73, 2, 1, 5, 8, 4, 112, '75,', 1, 1),
(74, 2, 1, 5, 8, 5, 112, '84,', 1, 1),
(75, 2, 1, 5, 8, 7, 58, '60,64,18,', 1, 1),
(76, 2, 1, 5, 8, 8, 58, '25,9,24,', 3, 1),
(77, 2, 1, 5, 8, 9, 58, '76,49,51,', 2, 1),
(78, 2, 1, 5, 8, 10, 58, '33,82,44,', 2, 1),
(79, 2, 1, 8, 5, 2, 73, '81,', 0, 1),
(80, 2, 1, 8, 5, 3, 73, '72,', 1, 1),
(81, 2, 1, 8, 5, 7, 73, '46,', 1, 1),
(82, 2, 1, 8, 5, 8, 73, '91,', 0, 1),
(83, 2, 1, 9, 4, 4, 56, '88,86,', 0, 1),
(84, 2, 1, 9, 4, 5, 56, '33,75,', 1, 1),
(85, 2, 1, 9, 4, 7, 87, '14,', 1, 1),
(86, 2, 1, 9, 4, 8, 87, '40,', 1, 1),
(87, 2, 1, 9, 4, 14, 56, '80,94,', 0, 1),
(88, 2, 1, 9, 4, 15, 56, '100,16,', 1, 1);

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
(2, 'zest2', 'active', 1, 3, 4000, 400);

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
(4, 1, 2, 1, 3, 'waiting'),
(8, 1, 3, -1, -1, 'ready'),
(11, 1, 4, -1, -1, 'ready'),
(12, 1, 5, 0, -1, 'joined');

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
(2, 2, 1, 2400, 'Earth Alliance'),
(3, 2, 2, 801, 'Minbari Federation'),
(7, 3, 1, 600, 'Earth Alliance'),
(8, 4, 1, 1600, 'Earth Alliance');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `reinforcements`
--

CREATE TABLE `reinforcements` (
  `id` int(3) NOT NULL,
  `gameid` int(3) DEFAULT NULL,
  `userid` int(5) DEFAULT NULL,
  `shipclass` varchar(255) DEFAULT NULL,
  `turn` int(3) DEFAULT NULL,
  `arrival` int(3) DEFAULT NULL,
  `cost` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
(10, 2, 1, 'Omega', 'bought', 2, 0),
(11, 4, 1, 'Hyperion', 'bought', 1, 0),
(12, 4, 1, 'Hyperion', 'bought', 1, 0),
(13, 4, 1, 'Hyperion', 'bought', 1, 0),
(14, 4, 1, 'Hyperion', 'bought', 1, 0);

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
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=127;
--
-- AUTO_INCREMENT für Tabelle `fireorders`
--
ALTER TABLE `fireorders`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;
--
-- AUTO_INCREMENT für Tabelle `games`
--
ALTER TABLE `games`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT für Tabelle `playerstatus`
--
ALTER TABLE `playerstatus`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT für Tabelle `reinforce`
--
ALTER TABLE `reinforce`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT für Tabelle `reinforcements`
--
ALTER TABLE `reinforcements`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT für Tabelle `shipactions`
--
ALTER TABLE `shipactions`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT für Tabelle `ships`
--
ALTER TABLE `ships`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

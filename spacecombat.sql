-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 10. Nov 2016 um 21:07
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
  `roll` int(3) DEFAULT NULL,
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

INSERT INTO `damages` (`id`, `fireid`, `gameid`, `shipid`, `structureid`, `turn`, `roll`, `type`, `totalDmg`, `shieldDmg`, `structDmg`, `armourDmg`, `mitigation`, `destroyed`, `notes`, `new`) VALUES
(98, 16, 1, 6, 1, 2, 17, 'Laser', 204, 0, 62, 142, '70', 0, '', 0),
(99, 17, 1, 6, 1, 2, 87, 'Particle', 58, 0, 20, 38, '65', 0, '', 0),
(100, 18, 1, 6, 1, 2, 25, 'Particle', 47, 0, 17, 30, '63', 0, '', 0),
(101, 18, 1, 6, 1, 2, 5, 'Particle', 48, 0, 18, 30, '62', 0, '', 0),
(102, 19, 1, 6, 1, 2, 24, 'Particle', 44, 0, 18, 26, '60', 0, '', 0),
(103, 20, 1, 5, 1, 2, 89, 'Particle', 42, 0, 13, 29, '70', 0, '', 0),
(104, 20, 1, 5, 1, 2, 11, 'Particle', 49, 0, 15, 34, '70', 0, '', 0),
(105, 21, 1, 5, 1, 2, 95, 'Particle', 59, 0, 18, 41, '69', 0, '', 0),
(106, 21, 1, 5, 1, 2, 27, 'Particle', 43, 0, 13, 30, '69', 0, '', 0),
(107, 22, 1, 5, 1, 2, 12, 'Particle', 49, 0, 16, 33, '68', 0, '', 0),
(108, 22, 1, 5, 1, 2, 62, 'Particle', 51, 0, 16, 35, '68', 0, '', 0),
(109, 23, 1, 5, 1, 2, 47, 'Particle', 40, 0, 13, 27, '67', 0, '', 0),
(110, 23, 1, 5, 1, 2, 22, 'Particle', 51, 0, 17, 34, '67', 0, '', 0),
(111, 24, 1, 5, 1, 2, 81, 'Particle', 49, 0, 17, 32, '66', 0, '', 0),
(112, 25, 1, 5, 1, 2, 28, 'Particle', 42, 0, 14, 28, '66', 0, '', 0),
(113, 26, 1, 3, 1, 2, 86, 'Particle', 69, 0, 21, 48, '70', 0, '', 0),
(114, 27, 1, 3, 1, 2, 87, 'Particle', 78, 0, 24, 54, '69', 0, '', 0),
(115, 28, 1, 3, 1, 2, 46, 'Particle', 78, 0, 25, 53, '68', 0, '', 0),
(116, 29, 1, 3, 1, 2, 28, 'Particle', 61, 0, 21, 40, '66', 0, '', 0),
(117, 30, 1, 3, 1, 2, 12, 'Particle', 60, 0, 21, 39, '65', 0, '', 0),
(118, 30, 1, 3, 1, 2, 2, 'Particle', 73, 0, 26, 47, '64', 0, '', 0),
(119, 31, 1, 3, 1, 2, 82, 'Particle', 63, 0, 24, 39, '62', 0, '', 0),
(120, 31, 1, 3, 1, 2, 3, 'Particle', 70, 0, 27, 43, '61', 0, '', 0),
(121, 32, 1, 3, 1, 2, 6, 'Particle', 41, 0, 17, 24, '59', 0, '', 0),
(122, 32, 1, 3, 1, 2, 6, 'Particle', 50, 0, 21, 29, '58', 0, '', 0),
(123, 32, 1, 3, 1, 2, 6, 'Particle', 47, 0, 20, 27, '57', 0, '', 0),
(124, 32, 1, 3, 1, 2, 6, 'Particle', 48, 0, 21, 27, '56', 0, '', 0),
(125, 32, 1, 3, 1, 2, 6, 'Particle', 47, 0, 22, 25, '54', 0, '', 0),
(126, 32, 1, 3, 1, 2, 6, 'Particle', 41, 0, 19, 22, '53', 0, '', 0),
(127, 33, 1, 3, 1, 2, 61, 'Particle', 50, 0, 24, 26, '51', 0, '', 0),
(128, 33, 1, 3, 1, 2, 61, 'Particle', 47, 0, 24, 23, '49', 0, '', 0),
(129, 33, 1, 3, 1, 2, 61, 'Particle', 44, 0, 23, 21, '48', 0, '', 0),
(130, 33, 1, 3, 1, 2, 61, 'Particle', 41, 0, 22, 19, '46', 0, '', 0),
(131, 33, 1, 3, 1, 2, 61, 'Particle', 42, 0, 24, 18, '44', 0, '', 0),
(132, 33, 1, 3, 1, 2, 61, 'Particle', 46, 0, 27, 19, '42', 0, '', 0),
(133, 34, 1, 5, 9, 3, 90, 'Particle', 47, 0, 16, 31, '65', 0, '', 0),
(134, 35, 1, 5, 9, 3, 14, 'Particle', 60, 0, 21, 39, '65', 0, '', 0),
(135, 35, 1, 5, 9, 3, 23, 'Particle', 47, 0, 17, 30, '64', 0, '', 0),
(136, 36, 1, 5, 9, 3, 69, 'Particle', 48, 0, 18, 30, '63', 0, '', 0),
(137, 37, 1, 5, 9, 3, 47, 'Laser', 198, 0, 73, 125, '63', 0, '', 0),
(138, 38, 1, 5, 1, 3, 35, 'Laser', 211, 0, 74, 137, '65', 0, '', 0),
(139, 39, 1, 5, 1, 3, 88, 'Particle', 49, 0, 18, 31, '63', 0, '', 0),
(140, 40, 1, 5, 1, 3, 76, 'Particle', 53, 0, 20, 33, '62', 0, '', 0),
(141, 40, 1, 5, 1, 3, 23, 'Particle', 49, 0, 19, 30, '62', 0, '', 0),
(142, 41, 1, 5, 1, 3, 70, 'Particle', 59, 0, 23, 36, '61', 0, '', 0),
(143, 42, 1, 4, 11, 3, 19, 'Particle', 68, 0, 27, 41, '60', 0, '', 0),
(144, 42, 1, 4, 11, 3, 54, 'Particle', 75, 0, 31, 44, '59', 0, '', 0),
(145, 43, 1, 4, 11, 3, 56, 'Particle', 77, 0, 32, 45, '59', 0, '', 0),
(146, 43, 1, 4, 11, 3, 2, 'Particle', 74, 0, 31, 43, '58', 0, '', 0);

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
(16, 1, 2, 3, 6, 3, 49, '17-', 1, 1),
(17, 1, 2, 3, 6, 5, 41, '5-', 1, 1),
(18, 1, 2, 3, 6, 6, 41, '25-5-', 2, 1),
(19, 1, 2, 3, 6, 7, 41, '24-', 1, 1),
(20, 1, 2, 3, 5, 12, 74, '11-40-', 2, 1),
(21, 1, 2, 3, 5, 13, 74, '27-15-', 2, 1),
(22, 1, 2, 3, 5, 14, 74, '12-62-', 2, 1),
(23, 1, 2, 4, 5, 12, 44, '22-17-', 2, 1),
(24, 1, 2, 4, 5, 13, 44, '5-', 1, 1),
(25, 1, 2, 4, 5, 14, 44, '28-', 1, 1),
(26, 1, 2, 5, 3, 3, 82, '15-', 1, 1),
(27, 1, 2, 5, 3, 4, 82, '77-', 1, 1),
(28, 1, 2, 5, 3, 10, 82, '46-', 1, 1),
(29, 1, 2, 5, 3, 11, 82, '28-', 1, 1),
(30, 1, 2, 5, 3, 12, 82, '12-2-', 2, 1),
(31, 1, 2, 5, 3, 13, 82, '82-3-', 2, 1),
(32, 1, 2, 6, 3, 8, 66, '36', 6, 1),
(33, 1, 2, 6, 3, 9, 66, '366', 6, 1),
(34, 1, 3, 3, 5, 5, 52, '34-', 1, 1),
(35, 1, 3, 3, 5, 6, 52, '14-23-', 2, 1),
(36, 1, 3, 3, 5, 7, 52, '51-', 1, 1),
(37, 1, 3, 3, 5, 9, 71, '47-', 1, 1),
(38, 1, 3, 4, 5, 10, 74, '35-', 1, 1),
(39, 1, 3, 4, 5, 12, 58, '36-', 1, 1),
(40, 1, 3, 4, 5, 13, 58, '23-7-', 2, 1),
(41, 1, 3, 4, 5, 14, 58, '50-', 1, 1),
(42, 1, 3, 5, 4, 3, 67, '19-54-', 2, 1),
(43, 1, 3, 5, 4, 4, 67, '56-2-', 2, 1);

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
(1, 'test', 'active', 3, 3, 5000, 500),
(2, '345', 'open', -1, 2, 0, 0);

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
(1, 1, 1, 3, 3, 'waiting'),
(2, 2, 1, 3, 3, 'waiting'),
(3, 1, 2, 0, 2, 'ready');

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
(1, 1, 1, 2800, 'Earth Alliance'),
(2, 1, 1, 2800, 'Earth Alliance'),
(3, 1, 2, 2300, 'Minbari Federation');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `reinforcements`
--

CREATE TABLE `reinforcements` (
  `id` int(3) NOT NULL,
  `gameid` int(3) DEFAULT NULL,
  `userid` int(5) DEFAULT NULL,
  `shipClass` varchar(255) DEFAULT NULL,
  `turn` int(3) DEFAULT NULL,
  `arrival` int(3) DEFAULT NULL,
  `cost` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `reinforcements`
--

INSERT INTO `reinforcements` (`id`, `gameid`, `userid`, `shipClass`, `turn`, `arrival`, `cost`) VALUES
(2, 1, 1, 'Hyperion', 2, 3, 850),
(5, 1, 2, 'Tinashi', 2, 3, 1000),
(6, 1, 2, 'WhiteStar', 2, 2, 600),
(7, 1, 1, 'Omega', 3, 2, 1200),
(8, 1, 1, 'Hyperion', 3, 2, 850),
(9, 1, 1, 'Tethys', 3, 3, 300),
(10, 1, 2, 'Sharlin', 3, 2, 2000),
(11, 1, 2, 'Tinashi', 3, 3, 1000),
(12, 1, 2, 'WhiteStar', 3, 2, 600);

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
(1, 3, 1, 'deploy', 0, 187, 45, 60, 0, 0, 1, 1),
(2, 4, 1, 'deploy', 0, 38, 240, 0, 0, 0, 1, 1),
(3, 5, 1, 'deploy', 0, 1044, 129, 180, 0, 0, 1, 1),
(4, 6, 1, 'deploy', 0, 922, 460, 210, 0, 0, 1, 1),
(5, 5, 1, 'move', 200, 844, 129, 0, 0, 0, 1, 1),
(6, 6, 1, 'move', 200, 749, 360, 0, 0, 0, 1, 1),
(7, 3, 1, 'turn', 0, 187, 45, -30, 113, 141, 1, 1),
(8, 3, 1, 'move', 200, 360, 145, 0, 0, 0, 1, 1),
(9, 4, 1, 'move', 185, 223, 254, 0, 0, 0, 1, 1),
(10, 4, 1, 'move', 15, 238, 254, 0, 0, 0, 1, 1),
(11, 3, 2, 'turn', 0, 360, 145, -30, 123, 141, 1, 1),
(12, 3, 2, 'move', 200, 560, 145, 0, 0, 0, 1, 1),
(13, 4, 2, 'move', 146, 383, 274, 0, 0, 0, 1, 1),
(14, 4, 2, 'turn', 0, 383, 274, 30, 123, 141, 1, 1),
(15, 4, 2, 'move', 55, 430, 301, 0, 0, 0, 1, 1),
(16, 5, 2, 'speedChange', -1, 844, 129, 0, 129, 0, 1, 1),
(17, 5, 2, 'speedChange', -1, 844, 129, 0, 116, 0, 1, 1),
(18, 5, 2, 'move', 160, 684, 129, 0, 0, 0, 1, 1),
(19, 6, 2, 'turn', 0, 749, 360, 30, 24, 78, 1, 1),
(20, 6, 2, 'move', 200, 649, 187, 0, 0, 0, 1, 1),
(21, 3, 3, 'turn', 0, 560, 145, 30, 123, 141, 1, 1),
(22, 3, 3, 'move', 141, 682, 216, 0, 0, 0, 1, 1),
(23, 3, 3, 'turn', 0, 682, 216, 30, 123, 141, 1, 1),
(24, 3, 3, 'move', 59, 712, 267, 0, 0, 0, 1, 1),
(25, 4, 3, 'move', 86, 504, 344, 0, 0, 0, 1, 1),
(26, 4, 3, 'turn', 0, 504, 344, -30, 123, 141, 1, 1),
(27, 4, 3, 'move', 114, 618, 344, 0, 0, 0, 1, 1),
(28, 5, 3, 'move', 72, 612, 121, 0, 0, 0, 1, 1),
(29, 5, 3, 'turn', 0, 612, 121, -30, 80, 163, 1, 1),
(30, 5, 3, 'move', 128, 501, 185, 0, 0, 0, 1, 1),
(31, 6, 3, 'turn', 0, 649, 187, -30, 24, 78, 1, 1),
(32, 6, 3, 'move', 78, 581, 148, 0, 0, 0, 1, 1),
(33, 6, 3, 'turn', 0, 581, 148, -30, 24, 78, 1, 1),
(34, 6, 3, 'move', 78, 503, 148, 0, 0, 0, 1, 1),
(35, 6, 3, 'turn', 0, 503, 148, -30, 24, 78, 1, 1),
(36, 6, 3, 'move', 44, 465, 170, 0, 0, 0, 1, 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `ships`
--

CREATE TABLE `ships` (
  `id` int(3) NOT NULL,
  `gameid` int(3) DEFAULT NULL,
  `userid` int(3) DEFAULT NULL,
  `shipClass` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `available` int(3) DEFAULT NULL,
  `destroyed` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `ships`
--

INSERT INTO `ships` (`id`, `gameid`, `userid`, `shipClass`, `status`, `available`, `destroyed`) VALUES
(3, 1, 1, 'Hyperion', 'deployed', 1, 0),
(4, 1, 1, 'Hyperion', 'deployed', 1, 0),
(5, 1, 2, 'Tinashi', 'deployed', 1, 0),
(6, 1, 2, 'WhiteStar', 'deployed', 1, 0),
(7, 1, 2, 'Sharlin', 'bought', 5, 0),
(8, 1, 1, 'Omega', 'bought', 5, 0),
(9, 1, 1, 'Tethys', 'bought', 4, 0);

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
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=147;
--
-- AUTO_INCREMENT für Tabelle `fireorders`
--
ALTER TABLE `fireorders`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;
--
-- AUTO_INCREMENT für Tabelle `games`
--
ALTER TABLE `games`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT für Tabelle `playerstatus`
--
ALTER TABLE `playerstatus`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT für Tabelle `reinforce`
--
ALTER TABLE `reinforce`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT für Tabelle `reinforcements`
--
ALTER TABLE `reinforcements`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT für Tabelle `shipactions`
--
ALTER TABLE `shipactions`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;
--
-- AUTO_INCREMENT für Tabelle `ships`
--
ALTER TABLE `ships`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

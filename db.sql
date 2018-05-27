-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 27. Mai 2018 um 22:27
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
(1, 10, 1, 'deploy', 0, 658, -117, 180, 0, 0, 1, 1),
(2, 11, 1, 'deploy', 0, 697, 178, 180, 0, 0, 1, 1),
(3, 7, 1, 'deploy', 0, -705, 14, 0, 0, 0, 1, 1),
(4, 8, 1, 'deploy', 0, -643, 435, 0, 0, 0, 1, 1),
(5, 9, 1, 'deploy', 0, -625, 530, 0, 0, 0, 1, 1),
(6, 7, 1, 'jumpIn', 0, -705, 14, 0, 0, 0, 0, 1),
(7, 8, 1, 'jumpIn', 0, -643, 435, 0, 0, 0, 0, 1),
(8, 9, 1, 'jumpIn', 0, -625, 530, 0, 0, 0, 0, 1),
(9, 10, 1, 'jumpIn', 0, 658, -117, 0, 0, 0, 0, 1),
(10, 11, 1, 'jumpIn', 0, 697, 178, 0, 0, 0, 0, 1),
(11, 7, 1, 'turn', 0, -705, 14, -6, 6, 20, 1, 1),
(12, 7, 1, 'move', 140, -566, -1, 0, 0, 0, 1, 1),
(13, 8, 1, 'turn', 0, -643, 435, -29, 30, 58, 1, 1),
(14, 8, 1, 'move', 165, -499, 355, 0, 0, 0, 1, 1),
(15, 8, 1, 'turn', 0, -499, 355, 4, 10, 0, 1, 1),
(16, 9, 1, 'turn', 0, -625, 530, -28, 28, 55, 1, 1),
(17, 9, 1, 'move', 165, -479, 453, 0, 0, 0, 1, 1),
(18, 10, 1, 'move', 155, 503, -117, 0, 0, 0, 1, 1),
(19, 10, 1, 'turn', 0, 503, -117, -9, 20, 0, 1, 1),
(20, 11, 1, 'move', 165, 532, 178, 0, 0, 0, 1, 1);

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
(1, 3, 2, 10, 6, 1, 1, 0, 'Laser', 144, 0, 0, 22, 0, 26, 22, 0, 'p;', 0),
(2, 3, 2, 10, 6, 1, 1, 0, 'Laser', 144, 0, 0, 21, 0, 27, 21, 0, 'p;', 0),
(3, 4, 2, 10, 6, 1, 1, 0, 'Laser', 128, 0, 0, 20, 0, 22, 20, 0, 'p;', 0),
(4, 4, 2, 10, 6, 3, 1, 0, 'Laser', 128, 0, 20, 21, 0, 1, 21, 0, 'p;c;', 0),
(5, 3, 2, 10, 6, 8, 1, 0, 'Laser', 144, 0, 35, 13, 0, 0, 13, 0, 'p;', 0),
(6, 4, 2, 10, 6, 11, 1, 0, 'Laser', 128, 0, 30, 12, 0, 0, 12, 0, 'p;', 0),
(7, 6, 2, 11, 6, 1, 1, 0, 'Laser', 128, 0, 0, 7, 0, 35, 7, 1, 'p;', 0),
(8, 5, 2, 11, 6, 4, 1, 0, 'Laser', 144, 0, 20, 13, 0, 15, 13, 0, 'p;c;', 0),
(9, 6, 2, 11, 6, 7, 1, 0, 'Laser', 128, 0, 34, 6, 0, 2, 6, 1, 'p;o2;', 0),
(10, 5, 2, 11, 6, 8, 1, 0, 'Laser', 144, 0, 34, 11, 0, 3, 11, 1, 'p;o2;', 0),
(11, 5, 2, 11, 6, 9, 1, 0, 'Laser', 144, 0, 24, 7, 0, 17, 7, 1, 'p;o3;', 0),
(12, 6, 2, 11, 6, 10, 1, 0, 'Laser', 128, 0, 37, 5, 0, 0, 5, 0, 'p;', 0);

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
(1, 2, 1, 11, 7, -578, 4, 10, 1, 26, '80;', 0, 1),
(2, 2, 1, 11, 7, -578, 4, 18, 1, 26, '55;', 0, 1),
(3, 2, 1, 7, 10, 501, -112, 7, 1, 77, '43;', 1, 1),
(4, 2, 1, 7, 10, 501, -112, 8, 1, 77, '42;', 1, 1),
(5, 2, 1, 7, 11, 529, 169, 10, 1, 107, '36;', 1, 1),
(6, 2, 1, 7, 11, 529, 169, 11, 1, 107, '8;', 1, 1);

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
  `focusMod` int(3) DEFAULT '100'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `games`
--

INSERT INTO `games` (`id`, `name`, `status`, `turn`, `phase`, `pv`, `reinforce`, `reinforceTurn`, `reinforceETA`, `focusMod`) VALUES
(1, 'myGame', 'active', 1, -1, 3000, 1500, 11, 3, 100),
(2, 'myGame', 'active', 1, 3, 3000, 1500, 11, 3, 10),
(4, 'myGame', 'open', -1, -1, 3000, 1500, 11, 3, 10);

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
(1, 5, 13, 'Needle', 5);

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
(1, 1, 1, 1, -1, 'Earth Alliance', 4045, 12000, 420, 6000, 'waiting'),
(2, 2, 1, 1, -1, 'Earth Alliance', 2955, 12000, 420, 6000, 'waiting'),
(3, 1, 2, 1, 3, 'Earth Alliance', 2420, 1200, 420, 600, 'waiting'),
(4, 2, 2, 1, 3, 'Minbari Federation', 2550, 1200, 300, 600, 'waiting'),
(6, 2, 4, 0, -1, '', 0, 0, 0, 0, 'joined');

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
(1, 11, 17, 1, '-1', 0),
(2, 7, 7, 1, '-1', 0),
(3, 7, 7, 1, '1', 4),
(4, 7, 8, 1, '-1', 0),
(5, 7, 10, 1, '-1', 0),
(6, 7, 11, 1, '-1', 0),
(7, 7, 13, 1, '-1', 0),
(8, 7, 14, 1, '-1', 0),
(9, 7, 15, 1, '-1', 0),
(10, 7, 16, 1, '-1', 0),
(11, 7, 17, 1, '-1', 0),
(12, 7, 18, 1, '-1', 0),
(13, 7, 19, 1, '-1', 0),
(14, 7, 20, 1, '-1', 0),
(15, 7, 27, 1, '-1', 0),
(16, 7, 28, 1, '-1', 0),
(17, 7, 29, 1, '-1', 0),
(18, 7, 30, 1, '-1', 0),
(19, 7, 31, 1, '-1', 0),
(20, 7, 32, 1, '-1', 0),
(21, 7, 33, 1, '-1', 0),
(22, 7, 34, 1, '-1', 0),
(23, 8, 6, 1, '1', 3),
(24, 8, 11, 1, '-1', 0),
(25, 8, 12, 1, '-1', 0),
(26, 8, 17, 1, '-1', 0),
(27, 8, 18, 1, '-1', 0),
(28, 9, 11, 1, '-1', 0),
(29, 9, 12, 1, '-1', 0),
(30, 9, 17, 1, '-1', 0),
(31, 9, 18, 1, '-1', 0);

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
(1, 10, 4, 1, '-1.00', 132, 0),
(2, 11, 4, 1, '0.57', 1316, 0),
(3, 7, 4, 1, '0.38', 1350, 0),
(4, 8, 4, 1, '0.47', 1211, 0),
(5, 9, 4, 1, '1.03', 1113, 0);

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
(1, 10, 3, 1, 'Output', 0, '9.00'),
(2, 10, 8, 1, 'Damage', 0, '20.00'),
(3, 10, 11, 1, 'Accuracy', 0, '30.00');

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
  `facing` int(3) DEFAULT '0',
  `delay` int(3) DEFAULT '0',
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
(1, 1, 1, 1, 0, 'Avenger', '', 'bought', 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ''),
(2, 1, 1, 1, 0, 'Omega', '', 'bought', 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ''),
(3, 1, 1, 1, 0, 'Hyperion', '', 'bought', 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ''),
(4, 1, 1, 1, 0, 'Omega', '', 'bought', 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ''),
(5, 1, 2, 1, 0, 'Olympus', '', 'bought', 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ''),
(6, 1, 2, 1, 0, 'Omega', 'God', 'bought', 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ''),
(7, 2, 1, 1, 0, 'Omega', 'Godslayer', 'bought', 1, 1, 0, -705, 14, 0, 0, 140, 0, 0, 0, 1, -1, 0, ''),
(8, 2, 1, 1, 0, 'Artemis', '', 'bought', 0, 1, 0, -643, 435, 0, 0, 165, 0, 0, 0, 1, -1, 0, ''),
(9, 2, 1, 1, 0, 'Artemis', '', 'bought', 0, 1, 0, -625, 530, 0, 0, 165, 0, 0, 0, 1, -1, 0, ''),
(10, 2, 2, 1, 0, 'Tigara', 'A', 'bought', 0, 1, 0, 658, -117, 0, 0, 155, 0, 0, 0, 1, -1, 0, ''),
(11, 2, 2, 1, 0, 'Tinashi', 'B', 'bought', 1, 1, 0, 697, 178, 0, 0, 165, 0, 0, 0, 1, -1, 0, '');

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
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT für Tabelle `chat`
--
ALTER TABLE `chat`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `damages`
--
ALTER TABLE `damages`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
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
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT für Tabelle `games`
--
ALTER TABLE `games`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT für Tabelle `loads`
--
ALTER TABLE `loads`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT für Tabelle `missions`
--
ALTER TABLE `missions`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `playerstatus`
--
ALTER TABLE `playerstatus`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT für Tabelle `powers`
--
ALTER TABLE `powers`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
--
-- AUTO_INCREMENT für Tabelle `reinforcements`
--
ALTER TABLE `reinforcements`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `sensors`
--
ALTER TABLE `sensors`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT für Tabelle `subunits`
--
ALTER TABLE `subunits`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `systemcrits`
--
ALTER TABLE `systemcrits`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT für Tabelle `units`
--
ALTER TABLE `units`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

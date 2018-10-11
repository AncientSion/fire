-- MySQL dump 10.16  Distrib 10.1.16-MariaDB, for Win32 (AMD64)
--
-- Host: localhost    Database: spacecombat
-- ------------------------------------------------------
-- Server version	10.1.16-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `actions`
--

DROP TABLE IF EXISTS `actions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `actions` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `shipid` int(3) DEFAULT NULL,
  `turn` int(3) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `forced` tinyint(4) NOT NULL DEFAULT '0',
  `dist` int(4) DEFAULT NULL,
  `x` int(4) DEFAULT NULL,
  `y` int(4) DEFAULT NULL,
  `a` decimal(5,2) NOT NULL DEFAULT '0.00',
  `cost` int(4) DEFAULT NULL,
  `delay` int(4) DEFAULT NULL,
  `costmod` float DEFAULT NULL,
  `resolved` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actions`
--

LOCK TABLES `actions` WRITE;
/*!40000 ALTER TABLE `actions` DISABLE KEYS */;
INSERT INTO `actions` VALUES (1,3,1,'deploy',0,0,452,-371,180.00,0,0,1,1),(2,4,1,'deploy',0,0,434,-479,180.00,0,0,1,1),(3,2,1,'deploy',0,0,-484,-377,0.00,0,0,1,1),(4,1,1,'deploy',0,0,-454,-493,0.00,0,0,1,1),(5,1,1,'jumpIn',0,0,-454,-493,0.00,0,0,0,1),(6,2,1,'jumpIn',0,0,-484,-377,0.00,0,0,0,1),(7,3,1,'jumpIn',0,0,452,-371,0.00,0,0,0,1),(8,4,1,'jumpIn',0,0,434,-479,0.00,0,0,0,1),(9,2,1,'move',0,165,-319,-377,0.00,0,0,1,1),(10,1,1,'move',0,185,-269,-493,0.00,0,0,1,1),(11,3,1,'move',0,155,297,-371,0.00,0,0,1,1),(12,4,1,'move',0,155,279,-479,0.00,0,0,1,1),(13,7,1,'deploy',0,0,558,-337,180.00,0,0,1,1),(14,5,1,'deploy',0,0,-436,-359,0.00,0,0,1,1),(15,6,1,'deploy',0,0,-556,-227,0.00,0,0,1,1),(16,5,1,'jumpIn',0,0,-436,-359,0.00,0,0,0,1),(17,6,1,'jumpIn',0,0,-556,-227,0.00,0,0,0,1),(18,7,1,'jumpIn',0,0,558,-337,0.00,0,0,0,1),(19,5,1,'move',0,140,-296,-359,0.00,0,0,1,1),(20,6,1,'move',0,185,-371,-227,0.00,0,0,1,1),(21,7,1,'move',0,165,393,-337,0.00,0,0,1,1),(22,8,2,'deploy',0,0,-296,-359,0.00,1,0,1,1),(23,9,2,'deploy',0,0,368,-337,-178.17,0,0,0,1),(24,7,2,'turn',0,0,393,-337,-30.00,30,66,1,1),(25,7,2,'move',0,165,250,-254,0.00,0,0,1,1),(26,5,2,'move',0,140,-156,-359,0.00,0,0,1,1),(27,6,2,'move',0,185,-186,-227,0.00,0,0,1,1),(28,8,2,'move',0,150,-149,-331,10.89,0,0,0,1),(29,9,2,'move',0,175,193,-344,182.40,0,0,0,1),(30,16,6,'deploy',0,0,609,-687,131.47,0,0,1,1),(31,13,6,'deploy',0,0,-803,-166,0.00,0,0,1,1),(32,5,3,'move',0,140,-16,-359,0.00,0,0,1,1),(33,6,3,'move',0,185,-1,-227,0.00,0,0,1,1),(34,7,3,'move',0,165,107,-171,0.00,0,0,1,1),(35,8,3,'move',0,300,105,-172,32.01,0,0,0,1),(36,9,3,'move',0,210,-16,-359,184.11,0,0,0,1),(37,24,1,'deploy',0,0,-211,-113,228.00,0,0,0,0),(38,25,1,'deploy',0,0,-142,-323,248.00,0,0,0,0),(39,26,1,'deploy',0,0,0,0,86.00,0,0,0,0);
/*!40000 ALTER TABLE `actions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat`
--

DROP TABLE IF EXISTS `chat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chat` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `username` varchar(30) DEFAULT NULL,
  `userid` int(3) DEFAULT NULL,
  `msg` varchar(255) DEFAULT NULL,
  `time` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat`
--

LOCK TABLES `chat` WRITE;
/*!40000 ALTER TABLE `chat` DISABLE KEYS */;
/*!40000 ALTER TABLE `chat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `damages`
--

DROP TABLE IF EXISTS `damages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `damages` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
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
  `new` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `damages`
--

LOCK TABLES `damages` WRITE;
/*!40000 ALTER TABLE `damages` DISABLE KEYS */;
INSERT INTO `damages` VALUES (1,4,1,2,7,1,1,0,'Particle',36,0,10,0,26,0,20,0,'p;',0),(2,4,1,2,7,1,1,0,'Particle',36,0,10,0,26,0,19,0,'p;',0),(3,3,1,2,7,8,1,0,'Particle',36,0,6,30,0,0,12,0,'p;',0),(4,3,1,2,7,9,1,0,'Particle',36,0,5,24,7,0,9,1,'p;o5;',0),(5,9,2,7,9,1,2,0,'Laser',297,0,15,0,59,0,15,0,'p;',0),(6,9,2,7,9,1,2,0,'Laser',297,0,14,0,60,0,14,0,'p;',0),(7,9,2,7,9,1,2,0,'Laser',297,0,14,0,60,0,14,0,'p;',0),(8,9,2,7,9,3,2,0,'Laser',297,0,15,20,39,0,15,0,'p;c;',0);
/*!40000 ALTER TABLE `damages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fireorders`
--

DROP TABLE IF EXISTS `fireorders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fireorders` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `gameid` int(3) DEFAULT '0',
  `turn` int(3) DEFAULT '0',
  `shooterid` int(5) DEFAULT '0',
  `targetid` int(5) DEFAULT '0',
  `x` int(3) DEFAULT '0',
  `y` int(3) DEFAULT '0',
  `weaponid` int(5) DEFAULT '0',
  `shots` int(3) NOT NULL DEFAULT '0',
  `req` int(3) NOT NULL DEFAULT '0',
  `notes` varchar(255) NOT NULL DEFAULT '',
  `hits` int(3) NOT NULL DEFAULT '0',
  `resolved` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fireorders`
--

LOCK TABLES `fireorders` WRITE;
/*!40000 ALTER TABLE `fireorders` DISABLE KEYS */;
INSERT INTO `fireorders` VALUES (3,1,1,3,2,-317,-375,7,2,72,'42;7;',2,1),(4,1,1,3,2,-317,-375,11,2,72,'22;5;',2,1),(5,1,1,4,1,-271,-493,7,2,65,'-32;-23;',0,1),(6,1,1,4,1,-271,-493,11,2,65,'97;-4;',0,1),(7,2,2,5,0,388,-339,30,0,0,'',0,2),(8,2,2,7,5,-295,-361,10,4,0,'',0,2),(9,2,2,5,7,252,-257,9,1,43,'2;',1,1),(10,2,2,6,7,254,-245,6,1,18,'73;',0,1),(11,2,2,6,7,254,-245,10,1,18,'21;',0,1);
/*!40000 ALTER TABLE `fireorders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `games`
--

DROP TABLE IF EXISTS `games`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `games` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `turn` int(3) DEFAULT NULL,
  `phase` int(3) DEFAULT NULL,
  `pv` int(5) DEFAULT NULL,
  `reinforce` int(5) DEFAULT NULL,
  `reinforceTurn` int(2) DEFAULT '11',
  `reinforceETA` int(2) DEFAULT '3',
  `reinforceAmount` int(2) NOT NULL DEFAULT '10',
  `focusMod` int(3) DEFAULT '100',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `games`
--

LOCK TABLES `games` WRITE;
/*!40000 ALTER TABLE `games` DISABLE KEYS */;
INSERT INTO `games` VALUES (1,'myGame','active',2,-1,3500,1500,11,3,10,10),(2,'myGame','active',3,2,3500,1500,3,3,10,10),(3,'myGame','active',1,-1,3500,1500,11,3,10,10),(4,'myGame','active',1,-1,3500,1500,11,3,10,10);
/*!40000 ALTER TABLE `games` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `globals`
--

DROP TABLE IF EXISTS `globals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `globals` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `playerstatusid` int(4) DEFAULT '0',
  `unitid` int(3) NOT NULL DEFAULT '0',
  `turn` int(4) DEFAULT '0',
  `type` varchar(20) DEFAULT '',
  `scope` int(11) NOT NULL DEFAULT '0',
  `value` decimal(5,2) DEFAULT '0.00',
  `notes` varchar(20) NOT NULL DEFAULT '',
  `text` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `globals`
--

LOCK TABLES `globals` WRITE;
/*!40000 ALTER TABLE `globals` DISABLE KEYS */;
INSERT INTO `globals` VALUES (1,1,0,0,'Morale',0,100.00,'',''),(2,2,0,0,'Morale',0,100.00,'',''),(3,3,0,0,'Morale',0,100.00,'',''),(4,4,0,0,'Morale',0,100.00,'',''),(5,5,0,0,'Morale',0,115.00,'',''),(6,6,0,0,'Morale',0,115.00,'',''),(7,7,0,0,'Morale',0,100.00,'',''),(8,8,0,0,'Morale',0,100.00,'','');
/*!40000 ALTER TABLE `globals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loads`
--

DROP TABLE IF EXISTS `loads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `loads` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `shipid` int(5) DEFAULT NULL,
  `systemid` int(3) DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL,
  `amount` int(3) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loads`
--

LOCK TABLES `loads` WRITE;
/*!40000 ALTER TABLE `loads` DISABLE KEYS */;
INSERT INTO `loads` VALUES (5,16,12,'Naga',4),(6,16,16,'Naga',4);
/*!40000 ALTER TABLE `loads` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `missions`
--

DROP TABLE IF EXISTS `missions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `missions` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `unitid` int(4) NOT NULL DEFAULT '0',
  `type` varchar(20) NOT NULL DEFAULT '1',
  `turn` int(1) NOT NULL DEFAULT '0',
  `targetid` int(4) NOT NULL DEFAULT '0',
  `x` int(4) NOT NULL DEFAULT '0',
  `y` int(4) NOT NULL DEFAULT '0',
  `arrived` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `missions`
--

LOCK TABLES `missions` WRITE;
/*!40000 ALTER TABLE `missions` DISABLE KEYS */;
INSERT INTO `missions` VALUES (1,8,'2',2,7,393,-337,0),(2,9,'2',2,5,-296,-359,3);
/*!40000 ALTER TABLE `missions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `playerstatus`
--

DROP TABLE IF EXISTS `playerstatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `playerstatus` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
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
  `status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playerstatus`
--

LOCK TABLES `playerstatus` WRITE;
/*!40000 ALTER TABLE `playerstatus` DISABLE KEYS */;
INSERT INTO `playerstatus` VALUES (1,1,1,2,-1,'Minbari Federation',1350,3650,1456,364,364,'waiting'),(2,2,1,2,-1,'Earth Alliance',1550,3450,1540,385,385,'waiting'),(3,1,2,3,2,'Minbari Federation',2020,2900,2184,546,1092,'waiting'),(4,2,2,3,2,'Earth Alliance',400,4154,1400,350,700,'waiting'),(5,2,3,1,-1,'Narn Regime',650,4350,0,0,0,'waiting'),(6,1,3,1,-1,'Narn Regime',650,4350,0,0,0,'waiting'),(7,1,4,1,-1,'Earth Alliance',400,4600,0,0,0,'waiting'),(8,2,4,1,-1,'Centauri Republic',510,4490,0,0,0,'waiting');
/*!40000 ALTER TABLE `playerstatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `powers`
--

DROP TABLE IF EXISTS `powers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `powers` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `unitid` int(5) DEFAULT NULL,
  `systemid` int(5) DEFAULT NULL,
  `turn` int(2) DEFAULT NULL,
  `type` varchar(10) DEFAULT NULL,
  `cost` int(3) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `powers`
--

LOCK TABLES `powers` WRITE;
/*!40000 ALTER TABLE `powers` DISABLE KEYS */;
INSERT INTO `powers` VALUES (1,3,14,1,'-1',0),(2,3,15,1,'-1',0),(3,3,21,1,'-1',0),(4,3,22,1,'-1',0),(5,4,14,1,'-1',0),(6,4,15,1,'-1',0),(7,4,21,1,'-1',0),(8,4,22,1,'-1',0),(9,7,11,1,'-1',0),(10,7,12,1,'0',0),(11,7,14,1,'-1',0),(12,7,15,1,'-1',0),(13,7,17,1,'0',0),(14,7,18,1,'-1',0),(15,7,19,1,'0',0),(16,5,8,1,'0',0),(17,5,10,1,'0',0),(18,5,22,1,'0',0),(19,5,23,1,'0',0),(20,5,39,1,'0',0),(21,5,40,1,'0',0),(22,5,6,1,'1',6),(23,5,6,1,'1',9),(24,5,8,2,'0',0),(25,5,10,2,'0',0),(26,5,22,2,'0',0),(27,5,23,2,'0',0),(28,5,39,2,'0',0),(29,5,40,2,'0',0),(30,7,10,2,'1',0),(31,7,10,2,'1',0),(32,7,10,2,'1',0),(33,7,10,2,'1',0),(34,7,11,2,'-1',0),(35,7,12,2,'0',0),(36,7,14,2,'-1',0),(37,7,15,2,'-1',0),(38,7,17,2,'0',0),(39,7,18,2,'-1',0),(40,7,19,2,'0',0),(41,7,9,3,'1',3),(42,7,10,3,'0',0),(43,7,11,3,'-1',0),(44,7,12,3,'0',0),(45,7,14,3,'-1',0),(46,7,15,3,'-1',0),(47,7,17,3,'0',0),(48,7,18,3,'-1',0),(49,7,19,3,'0',0),(50,-16,11,3,'-1',0),(51,-16,15,3,'-1',0),(52,5,8,3,'0',0),(53,5,10,3,'0',0),(54,5,22,3,'0',0),(55,5,23,3,'0',0),(56,5,39,3,'0',0),(57,5,40,3,'0',0),(58,5,6,3,'1',6);
/*!40000 ALTER TABLE `powers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sensors`
--

DROP TABLE IF EXISTS `sensors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sensors` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `unitid` int(5) DEFAULT NULL,
  `systemid` int(5) DEFAULT NULL,
  `turn` int(3) DEFAULT NULL,
  `angle` decimal(5,2) DEFAULT NULL,
  `dist` int(4) DEFAULT NULL,
  `type` int(3) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sensors`
--

LOCK TABLES `sensors` WRITE;
/*!40000 ALTER TABLE `sensors` DISABLE KEYS */;
INSERT INTO `sensors` VALUES (1,3,4,1,-1.00,102,0),(2,4,4,1,-1.00,102,0),(3,2,4,1,-1.00,110,0),(4,1,3,1,-1.00,102,0),(5,7,4,1,-1.00,95,0),(6,5,4,1,-1.00,146,0),(7,6,3,1,-1.00,81,0),(8,5,4,2,-1.00,146,0),(9,6,3,2,-1.00,81,0),(10,7,4,2,-1.00,95,0),(11,7,4,3,-1.00,95,0),(12,-16,4,3,-1.00,88,0),(13,5,4,3,-1.00,146,0),(14,6,3,3,-1.00,81,0),(15,-13,3,3,-1.00,88,0);
/*!40000 ALTER TABLE `sensors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subunits`
--

DROP TABLE IF EXISTS `subunits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subunits` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `unitid` int(4) DEFAULT NULL,
  `amount` int(2) DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subunits`
--

LOCK TABLES `subunits` WRITE;
/*!40000 ALTER TABLE `subunits` DISABLE KEYS */;
INSERT INTO `subunits` VALUES (1,1,1,'WhiteStar'),(2,1,1,'WhiteStar'),(3,6,1,'Shaveen'),(4,6,1,'Shaveen'),(5,8,2,'Nial'),(6,9,4,'Naga'),(7,13,1,'Torotha'),(8,13,1,'Torotha'),(12,21,1,'Thentus'),(13,21,1,'Thentus');
/*!40000 ALTER TABLE `subunits` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `systemcrits`
--

DROP TABLE IF EXISTS `systemcrits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `systemcrits` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `shipid` int(4) DEFAULT NULL,
  `systemid` int(4) DEFAULT NULL,
  `turn` int(3) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `duration` int(3) DEFAULT NULL,
  `value` decimal(5,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `systemcrits`
--

LOCK TABLES `systemcrits` WRITE;
/*!40000 ALTER TABLE `systemcrits` DISABLE KEYS */;
INSERT INTO `systemcrits` VALUES (1,2,5,1,'Overload',0,-2.46),(2,7,2,2,'Morale',-2,-5.00),(3,7,3,2,'Output',0,-15.00);
/*!40000 ALTER TABLE `systemcrits` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `units`
--

DROP TABLE IF EXISTS `units`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `units` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `gameid` int(3) DEFAULT '0',
  `userid` int(3) DEFAULT '0',
  `type` int(1) NOT NULL DEFAULT '0',
  `name` varchar(255) DEFAULT '',
  `callsign` varchar(40) NOT NULL DEFAULT '',
  `totalCost` int(4) NOT NULL DEFAULT '0',
  `moraleCost` int(4) NOT NULL DEFAULT '0',
  `status` varchar(255) DEFAULT '',
  `command` tinyint(4) DEFAULT '0',
  `available` int(3) DEFAULT '0',
  `withdraw` int(2) NOT NULL DEFAULT '0',
  `manual` tinyint(4) NOT NULL DEFAULT '0',
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
  `notes` varchar(50) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `units`
--

LOCK TABLES `units` WRITE;
/*!40000 ALTER TABLE `units` DISABLE KEYS */;
INSERT INTO `units` VALUES (1,1,1,3,'Squadron','',780,780,'bought',1,1,0,0,0,-269,-493,0.00,0,185,0,0,0,1,3,0,''),(2,1,1,4,'Tinashi','',570,570,'bought',0,1,0,0,0,-319,-377,0.00,0,165,0,0,0,1,3,0,''),(3,1,2,4,'Hyperion','',775,775,'bought',1,1,0,0,0,297,-371,180.00,0,155,0,0,0,1,3,0,''),(4,1,2,4,'Hyperion','',775,775,'bought',0,1,0,0,0,279,-479,180.00,0,155,0,0,0,1,3,0,''),(5,2,1,4,'Sharlin','',1580,1500,'bought',1,1,0,0,0,-156,-359,0.00,0,140,0,0,0,2,3,0,''),(6,2,1,3,'Squadron','',520,520,'bought',0,1,0,0,0,-186,-227,0.00,0,185,0,0,0,2,3,0,''),(7,2,2,4,'Saggitarius','',416,400,'bought',1,1,0,0,0,250,-254,150.00,0,165,0,0,0,2,3,0,''),(8,2,1,2,'Flight','yellow-Sigma',80,80,'deployed',0,2,0,0,0,-149,-331,10.89,0,300,0,0,0,2,3,0,''),(9,2,2,1,'Salvo','',0,0,'deployed',0,2,0,0,0,193,-344,182.40,0,350,0,0,0,2,3,0,''),(13,2,1,3,'Squadron','',600,600,'bought',0,6,0,0,0,0,0,0.00,0,0,0,0,0,3,-1,0,''),(16,2,2,4,'Olympus','',462,430,'bought',0,6,0,0,0,0,0,0.00,0,0,0,0,0,3,-1,0,''),(20,3,2,4,'Varnic','',650,650,'bought',1,1,0,0,0,0,0,0.00,0,0,0,0,0,0,0,0,''),(21,3,1,3,'Squadron','',650,650,'bought',1,1,0,0,0,0,0,0.00,0,0,0,0,0,0,0,0,''),(22,4,1,4,'Saggitarius','',400,400,'bought',1,1,0,0,0,0,0,0.00,0,0,0,0,0,0,0,0,''),(23,4,2,4,'Altarian','',510,510,'bought',1,1,0,0,0,0,0,0.00,0,0,0,0,0,0,0,0,''),(24,4,0,0,'Obstacle','',0,0,'deployed',0,1,0,0,0,0,0,0.00,0,0,0,0,0,0,0,0,''),(25,4,0,0,'Obstacle','',0,0,'deployed',0,1,0,0,0,0,0,0.00,0,0,0,0,0,0,0,0,''),(26,4,0,0,'Obstacle','',0,0,'deployed',0,1,0,0,0,0,0,0.00,0,0,0,0,0,0,0,0,'');
/*!40000 ALTER TABLE `units` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `access` int(3) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Chris','1',0),(2,'1','1',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-10-11 23:09:43

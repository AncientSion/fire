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
  `unitid` int(3) DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actions`
--

LOCK TABLES `actions` WRITE;
/*!40000 ALTER TABLE `actions` DISABLE KEYS */;
INSERT INTO `actions` VALUES (1,10,1,'move',0,53,-227,-142,0.00,0,0,0,1),(2,9,1,'move',0,31,-231,-475,0.00,0,0,0,1),(3,8,1,'move',0,36,-284,-247,0.00,0,0,0,1),(4,7,1,'move',0,57,395,215,0.00,0,0,0,1),(5,6,1,'move',0,47,242,282,0.00,0,0,0,1),(6,5,1,'move',0,42,300,291,0.00,0,0,0,1),(7,4,1,'move',0,31,259,415,0.00,0,0,0,1),(8,3,1,'deploy',0,0,476,-384,180.00,0,0,1,1),(9,1,1,'deploy',0,0,-440,376,0.00,0,0,1,1),(10,2,1,'deploy',0,0,-426,-374,0.00,0,0,1,1),(11,2,1,'jumpIn',0,0,-426,-374,0.00,0,0,0,1),(12,1,1,'jumpIn',0,0,-440,376,0.00,0,0,0,1),(13,3,1,'jumpIn',0,0,476,-384,0.00,0,0,0,1),(14,1,1,'move',0,140,-300,376,0.00,0,0,1,1),(15,2,1,'move',0,165,-261,-374,0.00,0,0,1,1),(16,3,1,'move',0,155,321,-384,0.00,0,0,1,1),(17,10,2,'move',0,53,-278,-157,0.00,0,0,0,1),(18,9,2,'move',0,31,-252,-498,0.00,0,0,0,1),(19,8,2,'move',0,36,-317,-233,0.00,0,0,0,1),(20,7,2,'move',0,57,401,158,0.00,0,0,0,1),(21,6,2,'move',0,47,286,264,0.00,0,0,0,1),(22,5,2,'move',0,42,333,317,0.00,0,0,0,1),(23,4,2,'move',0,31,284,396,0.00,0,0,0,1),(24,12,5,'deploy',0,0,-627,435,0.00,0,0,1,1),(25,19,5,'deploy',0,0,466,531,180.00,0,0,1,1),(26,20,5,'deploy',0,0,464,449,180.00,0,0,1,1),(27,3,2,'move',0,155,166,-384,0.00,0,0,1,1),(28,1,2,'move',0,140,-160,376,0.00,0,0,1,1),(29,2,2,'move',0,165,-96,-374,0.00,0,0,1,1),(30,2,2,'jumpOut',1,0,-96,-374,0.00,0,0,0,1),(31,7,3,'move',0,57,407,101,0.00,0,0,0,1),(32,10,3,'move',0,53,-329,-172,0.00,0,0,0,1),(33,4,3,'move',0,31,309,377,0.00,0,0,0,1),(34,5,3,'move',0,42,366,343,0.00,0,0,0,1),(35,6,3,'move',0,47,330,246,0.00,0,0,0,1),(36,9,3,'move',0,31,-273,-521,0.00,0,0,0,1),(37,8,3,'move',0,36,-350,-219,0.00,0,0,0,1),(38,3,3,'move',0,155,11,-384,0.00,0,0,1,1),(39,1,3,'move',0,140,-20,376,0.00,0,0,1,1),(40,2,3,'speed',0,-1,-96,-374,0.00,30,0,1,1),(41,2,3,'speed',0,-1,-96,-374,0.00,30,0,1,1),(42,2,3,'move',0,125,29,-374,0.00,0,0,1,1);
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
  `unitid` int(5) DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `damages`
--

LOCK TABLES `damages` WRITE;
/*!40000 ALTER TABLE `damages` DISABLE KEYS */;
INSERT INTO `damages` VALUES (1,1,1,2,6,1,2,0,'Particle',145,0,15,0,130,0,15,0,'p;',0),(2,3,1,2,6,1,2,0,'Particle',145,0,14,0,131,0,14,0,'p;',0),(3,2,1,2,6,8,2,0,'Particle',156,0,8,56,92,0,8,1,'p;o6;',0),(4,4,1,2,6,9,2,0,'Particle',149,0,8,44,97,0,8,1,'p;o3;',0);
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fireorders`
--

LOCK TABLES `fireorders` WRITE;
/*!40000 ALTER TABLE `fireorders` DISABLE KEYS */;
INSERT INTO `fireorders` VALUES (1,1,2,3,2,0,0,23,1,99,'73;',1,1),(2,1,2,3,2,0,0,24,1,99,'68;',1,1),(3,1,2,3,2,0,0,25,1,99,'98;',1,1),(4,1,2,3,2,0,0,26,1,99,'71;',1,1);
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
  `obstaclesAmount` int(3) NOT NULL DEFAULT '0',
  `obstaclesSizeMin` int(3) NOT NULL DEFAULT '0',
  `obstaclesSizeMax` int(3) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `games`
--

LOCK TABLES `games` WRITE;
/*!40000 ALTER TABLE `games` DISABLE KEYS */;
INSERT INTO `games` VALUES (1,'myGame','active',3,2,3500,1500,2,3,10,10,4,75,200);
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `globals`
--

LOCK TABLES `globals` WRITE;
/*!40000 ALTER TABLE `globals` DISABLE KEYS */;
INSERT INTO `globals` VALUES (1,1,0,0,'Morale',0,100.00,'',''),(2,2,0,0,'Morale',0,100.00,'','');
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
  `unitid` int(5) DEFAULT NULL,
  `systemid` int(3) DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL,
  `amount` int(3) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loads`
--

LOCK TABLES `loads` WRITE;
/*!40000 ALTER TABLE `loads` DISABLE KEYS */;
INSERT INTO `loads` VALUES (1,1,2,'Command',2),(4,12,12,'Aurora',24),(5,12,21,'Aurora',24);
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
  `phase` int(1) DEFAULT '0',
  `targetid` int(4) NOT NULL DEFAULT '0',
  `x` int(4) NOT NULL DEFAULT '0',
  `y` int(4) NOT NULL DEFAULT '0',
  `arrived` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `missions`
--

LOCK TABLES `missions` WRITE;
/*!40000 ALTER TABLE `missions` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playerstatus`
--

LOCK TABLES `playerstatus` WRITE;
/*!40000 ALTER TABLE `playerstatus` DISABLE KEYS */;
INSERT INTO `playerstatus` VALUES (1,1,1,3,2,'Earth Alliance',1800,2750,1848,462,1386,'ready'),(2,2,1,3,2,'Minbari Federation',975,2845,2000,500,0,'waiting');
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
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `powers`
--

LOCK TABLES `powers` WRITE;
/*!40000 ALTER TABLE `powers` DISABLE KEYS */;
INSERT INTO `powers` VALUES (1,1,7,1,'-1',0),(2,1,8,1,'-1',0),(3,1,10,1,'-1',0),(4,1,11,1,'-1',0),(5,1,13,1,'-1',0),(6,1,14,1,'-1',0),(7,1,15,1,'-1',0),(8,1,16,1,'-1',0),(9,1,17,1,'-1',0),(10,1,18,1,'-1',0),(11,1,19,1,'-1',0),(12,1,20,1,'-1',0),(13,1,27,1,'-1',0),(14,1,28,1,'-1',0),(15,1,29,1,'-1',0),(16,1,30,1,'-1',0),(17,1,31,1,'-1',0),(18,1,32,1,'-1',0),(19,1,33,1,'-1',0),(20,1,34,1,'-1',0),(21,2,11,1,'-1',0),(22,2,12,1,'-1',0),(23,2,17,1,'-1',0),(24,2,18,1,'-1',0),(25,1,7,2,'-1',0),(26,1,8,2,'-1',0),(27,1,10,2,'-1',0),(28,1,11,2,'-1',0),(29,1,13,2,'-1',0),(30,1,14,2,'-1',0),(31,1,15,2,'-1',0),(32,1,16,2,'-1',0),(33,1,17,2,'-1',0),(34,1,18,2,'-1',0),(35,1,19,2,'-1',0),(36,1,20,2,'-1',0),(37,1,27,2,'-1',0),(38,1,28,2,'-1',0),(39,1,29,2,'-1',0),(40,1,30,2,'-1',0),(41,1,31,2,'-1',0),(42,1,32,2,'-1',0),(43,1,33,2,'-1',0),(44,1,34,2,'-1',0),(45,2,11,2,'-1',0),(46,2,12,2,'-1',0),(47,2,17,2,'-1',0),(48,2,18,2,'-1',0),(49,-12,7,2,'-1',0),(50,-12,8,2,'-1',0),(51,-12,10,2,'-1',0),(52,-12,11,2,'-1',0),(53,-12,13,2,'-1',0),(54,-12,14,2,'-1',0),(55,-12,16,2,'-1',0),(56,-12,17,2,'-1',0),(57,-12,19,2,'-1',0),(58,-12,20,2,'-1',0),(59,-12,22,2,'-1',0),(60,-12,23,2,'-1',0),(61,1,7,3,'-1',0),(62,1,8,3,'-1',0),(63,1,10,3,'-1',0),(64,1,11,3,'-1',0),(65,1,13,3,'-1',0),(66,1,14,3,'-1',0),(67,1,15,3,'-1',0),(68,1,16,3,'-1',0),(69,1,17,3,'-1',0),(70,1,18,3,'-1',0),(71,1,19,3,'-1',0),(72,1,20,3,'-1',0),(73,1,27,3,'-1',0),(74,1,28,3,'-1',0),(75,1,29,3,'-1',0),(76,1,30,3,'-1',0),(77,1,31,3,'-1',0),(78,1,32,3,'-1',0),(79,1,33,3,'-1',0),(80,1,34,3,'-1',0),(81,2,11,3,'-1',0),(82,2,12,3,'-1',0),(83,2,17,3,'-1',0),(84,2,18,3,'-1',0);
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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sensors`
--

LOCK TABLES `sensors` WRITE;
/*!40000 ALTER TABLE `sensors` DISABLE KEYS */;
INSERT INTO `sensors` VALUES (1,3,4,1,-1.00,124,0),(2,1,4,1,-1.00,117,0),(3,2,4,1,-1.00,95,0),(4,1,4,2,-1.00,117,0),(5,2,4,2,-1.00,95,0),(6,-12,4,2,-1.00,88,0),(7,3,4,2,-1.00,124,0),(8,-19,4,2,-1.00,110,0),(9,-20,4,2,-1.00,110,0),(10,1,4,3,-1.00,117,0),(11,2,4,3,-1.00,95,0),(12,3,4,3,-1.00,124,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subunits`
--

LOCK TABLES `subunits` WRITE;
/*!40000 ALTER TABLE `subunits` DISABLE KEYS */;
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
  `unitid` int(4) DEFAULT NULL,
  `systemid` int(4) DEFAULT NULL,
  `turn` int(3) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `duration` int(3) DEFAULT NULL,
  `value` decimal(5,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `systemcrits`
--

LOCK TABLES `systemcrits` WRITE;
/*!40000 ALTER TABLE `systemcrits` DISABLE KEYS */;
INSERT INTO `systemcrits` VALUES (1,2,5,2,'Overload',0,-13.19);
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
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `units`
--

LOCK TABLES `units` WRITE;
/*!40000 ALTER TABLE `units` DISABLE KEYS */;
INSERT INTO `units` VALUES (1,1,1,4,'Omega','',1310,1310,'bought',1,1,0,0,0,-160,376,0.00,0,140,0,0,0,2,3,0,''),(2,1,1,4,'Artemis','',490,490,'bought',0,1,4,0,0,-96,-374,0.00,0,165,0,0,0,2,3,0,''),(3,1,2,4,'Tigara','',975,975,'bought',3,1,0,0,0,166,-384,180.00,0,155,0,0,0,2,3,0,''),(4,1,0,0,'Obstacle','',72,94,'deployed',0,0,0,0,0,309,377,323.00,89,31,26,6,0,3,-1,0,''),(5,1,0,0,'Obstacle','',84,109,'deployed',0,0,0,0,0,366,343,38.00,89,42,15,7,0,3,-1,0,''),(6,1,0,0,'Obstacle','',117,152,'deployed',0,0,0,0,0,330,246,338.00,84,47,34,9,0,3,-1,0,''),(7,1,0,0,'Obstacle','',78,101,'deployed',0,0,0,0,0,407,101,276.00,177,57,26,6,0,3,-1,0,''),(8,1,0,0,'Obstacle','',60,78,'deployed',0,0,0,0,0,-350,-219,157.00,89,36,23,6,0,3,-1,0,''),(9,1,0,0,'Obstacle','',70,91,'deployed',0,0,0,0,0,-273,-521,228.00,89,31,19,7,0,3,-1,0,''),(10,1,0,0,'Obstacle','',108,140,'deployed',0,0,0,0,0,-329,-172,197.00,84,53,15,9,0,3,-1,0,''),(12,1,1,4,'Avenger','',1794,450,'bought',0,5,0,0,0,0,0,0.00,0,0,0,0,0,2,-1,0,''),(19,1,2,4,'Tinashi','',590,590,'bought',0,5,0,0,0,0,0,0.00,0,0,0,0,0,2,-1,0,''),(20,1,2,4,'Tinashi','',590,590,'bought',0,5,0,0,0,0,0,0.00,0,0,0,0,0,2,-1,0,'');
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

-- Dump completed on 2018-11-21 14:45:47

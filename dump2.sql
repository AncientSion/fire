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
  `h` decimal(5,2) NOT NULL DEFAULT '0.00',
  `f` decimal(5,2) NOT NULL DEFAULT '0.00',
  `cost` int(4) DEFAULT NULL,
  `delay` int(4) DEFAULT NULL,
  `costmod` float DEFAULT NULL,
  `resolved` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actions`
--

LOCK TABLES `actions` WRITE;
/*!40000 ALTER TABLE `actions` DISABLE KEYS */;
INSERT INTO `actions` VALUES (1,1,1,'deploy',0,0,-547,308,-6.07,-6.07,0,0,1,1),(2,4,1,'deploy',0,0,-487,-266,0.00,0.00,0,0,1,1),(3,2,1,'deploy',0,0,-548,-94,0.00,0.00,0,0,1,1),(4,3,1,'deploy',0,0,-429,524,0.00,0.00,0,0,1,1),(5,7,1,'deploy',0,0,427,625,180.00,180.00,0,0,1,1),(6,6,1,'deploy',0,0,432,484,180.00,180.00,0,0,1,1),(7,5,1,'deploy',0,0,643,7,180.00,180.00,0,0,1,1),(8,8,1,'deploy',0,0,531,223,180.00,180.00,0,0,1,1),(9,1,1,'jumpIn',0,56,-500,337,17.00,17.00,0,0,0,1),(10,4,1,'jumpIn',0,70,-549,-297,-6.00,-6.00,0,0,0,1),(11,3,1,'jumpIn',0,55,-444,472,27.00,27.00,0,0,0,1),(12,2,1,'jumpIn',0,91,-625,-47,9.00,9.00,0,0,0,1),(13,7,1,'jumpIn',0,15,440,619,-25.00,-25.00,0,0,0,1),(14,6,1,'jumpIn',0,80,460,558,-22.00,-22.00,0,0,0,1),(15,5,1,'jumpIn',0,123,741,80,-14.00,-14.00,0,0,0,1),(16,8,1,'jumpIn',0,109,623,280,-3.00,-3.00,0,0,0,1),(17,1,1,'turn',0,0,-500,337,-13.00,-13.00,13,41,1,1),(18,1,1,'move',0,155,-350,377,0.00,0.00,0,0,1,1),(19,4,1,'speed',0,1,-549,-297,0.00,0.00,30,0,1,1),(20,4,1,'speed',0,1,-549,-297,0.00,0.00,30,0,1,1),(21,4,1,'turn',0,0,-549,-297,15.65,15.65,20,56,1,1),(22,4,1,'move',0,193,-356,-285,0.00,0.00,0,0,1,1),(23,2,1,'speed',0,1,-625,-47,0.00,0.00,30,0,1,1),(24,2,1,'turn',0,0,-625,-47,-30.00,-30.00,34,96,1,1),(25,2,1,'move',0,174,-455,-83,0.00,0.00,0,0,1,1),(26,3,1,'turn',0,0,-444,472,-45.00,-45.00,45,59,1,1),(27,3,1,'move',0,59,-386,481,0.00,0.00,0,0,1,1),(28,3,1,'turn',0,0,-386,481,-45.00,-45.00,45,59,1,1),(29,3,1,'move',0,126,-284,407,0.00,0.00,0,0,1,1),(30,3,1,'turn',0,0,-284,407,20.00,20.00,20,26,1,1),(31,7,1,'turn',0,0,440,619,30.00,30.00,30,75,1,1),(32,7,1,'move',0,149,314,700,0.00,0.00,0,0,1,1),(33,7,1,'turn',0,0,314,700,30.00,30.00,50,25,1,1),(34,7,1,'move',0,6,308,699,0.00,0.00,0,0,1,1),(35,6,1,'turn',0,0,460,558,30.00,30.00,30,75,1,1),(36,6,1,'move',0,75,387,576,0.00,0.00,0,0,1,1),(37,6,1,'turn',0,0,387,576,18.91,18.91,19,48,1,1),(38,6,1,'move',0,80,310,552,0.00,0.00,0,0,1,1),(39,5,1,'turn',0,0,741,80,-30.00,-30.00,30,81,1,1),(40,5,1,'move',0,155,705,230,0.00,0.00,0,0,1,1),(41,8,1,'speed',0,-1,623,280,0.00,0.00,30,0,1,1),(42,8,1,'move',0,162,462,297,0.00,0.00,0,0,1,1),(57,15,2,'deploy',0,0,705,230,0.00,0.00,0,0,0,1),(58,16,2,'deploy',0,0,705,230,0.00,0.00,0,0,0,1),(70,1,2,'turn',0,0,-350,377,-7.83,-7.83,8,25,1,1),(71,1,2,'move',0,155,-196,396,0.00,0.00,0,0,1,1),(72,4,2,'turn',0,0,-356,-285,19.37,19.37,25,69,1,1),(73,4,2,'move',0,193,-178,-210,0.00,0.00,0,0,1,1),(74,4,2,'turn',0,0,-178,-210,13.77,13.77,36,0,1,1),(75,2,2,'turn',0,0,-455,-83,30.00,30.00,34,96,1,1),(76,2,2,'move',0,174,-290,-29,0.00,0.00,0,0,1,1),(77,2,2,'turn',0,0,-290,-29,11.64,11.64,28,0,1,1),(78,3,2,'speed',0,-1,-284,407,0.00,0.00,30,0,1,1),(79,3,2,'move',0,162,-123,385,0.00,0.00,0,0,1,1),(80,3,2,'turn',0,0,-123,385,20.37,20.37,36,0,1,1),(81,7,2,'speed',0,1,308,699,0.00,0.00,30,0,1,1),(82,7,2,'speed',0,1,308,699,0.00,0.00,30,0,1,1),(83,7,2,'move',0,19,289,696,0.00,0.00,0,0,1,1),(84,7,2,'turn',0,0,289,696,-16.00,-16.00,20,50,1,1),(85,7,2,'move',0,174,116,714,0.00,0.00,0,0,1,1),(86,6,2,'turn',0,0,310,552,23.39,23.39,24,59,1,1),(87,6,2,'move',0,155,174,479,0.00,0.00,0,0,1,1),(88,5,2,'turn',0,0,705,230,-20.50,-20.50,21,56,1,1),(89,5,2,'move',0,56,694,285,0.00,0.00,0,0,1,1),(90,5,2,'turn',0,0,694,285,30.00,30.00,30,81,1,1),(91,5,2,'move',0,99,628,359,0.00,0.00,0,0,1,1),(92,5,2,'turn',0,0,628,359,19.00,19.00,19,52,1,1),(93,8,2,'turn',0,0,462,297,45.00,45.00,40,48,1,1),(94,8,2,'move',0,162,336,195,0.00,0.00,0,0,1,1),(95,15,2,'move',0,120,598,176,206.49,206.49,0,0,0,1),(96,16,2,'move',0,120,598,176,206.49,206.49,0,0,0,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `damages`
--

LOCK TABLES `damages` WRITE;
/*!40000 ALTER TABLE `damages` DISABLE KEYS */;
INSERT INTO `damages` VALUES (1,1,1,1,15,18,1,0,'Particle',10,0,8,2,0,0,8,0,'p;',0),(2,2,1,6,7,1,1,0,'Beam',276,0,16,0,76,0,16,0,'p;',0),(3,2,1,6,7,1,1,0,'Beam',276,0,16,0,76,0,16,0,'p;',0),(4,2,1,6,26,26,1,0,'Beam',276,0,12,80,0,0,12,0,'p;',0),(5,6,1,1,15,17,2,0,'Particle',12,0,6,0,0,0,17,0,'b;',0);
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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fireorders`
--

LOCK TABLES `fireorders` WRITE;
/*!40000 ALTER TABLE `fireorders` DISABLE KEYS */;
INSERT INTO `fireorders` VALUES (1,1,1,12,1,0,0,2,7,19,'85;15;19;28;54;49;31;9;88;63;',1,1),(2,1,1,1,6,305,554,9,1,43,'38;',1,1),(3,1,2,5,0,-352,-288,13,0,0,'',0,2),(4,1,2,5,0,-353,-282,21,0,0,'',0,2),(5,1,2,1,0,156,646,8,1,0,'156;646;',0,1),(6,1,2,12,1,0,0,2,2,19,'20;15;19;7;40;',1,1),(7,1,2,7,1,-203,396,27,0,0,'',0,0),(8,1,2,7,1,-203,396,28,0,0,'',0,0),(9,1,2,6,3,-119,382,8,0,0,'',0,0),(10,1,2,6,3,-119,382,10,0,0,'',0,0),(11,1,2,6,3,-119,382,27,0,0,'',0,0),(12,1,2,6,3,-119,382,28,0,0,'',0,0);
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
  `nebulaAmount` int(2) NOT NULL DEFAULT '0',
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
INSERT INTO `games` VALUES (1,'myGame','active',2,2,3500,1500,11,3,10,10,3,0,75,175);
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
INSERT INTO `globals` VALUES (1,1,0,0,'Morale',0,115.00,'',''),(2,2,0,0,'Morale',0,100.00,'','');
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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loads`
--

LOCK TABLES `loads` WRITE;
/*!40000 ALTER TABLE `loads` DISABLE KEYS */;
INSERT INTO `loads` VALUES (1,1,2,'Command',1),(2,1,2,'Engine',1),(3,1,2,'Sensor',1),(4,1,17,'Gorith',12),(5,2,7,'Vranoth',12),(6,2,9,'Vranoth',12),(7,4,7,'Vranoth',12),(8,4,9,'Vranoth',12),(9,5,13,'Zorth',12),(11,5,21,'Zorth',12);
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `missions`
--

LOCK TABLES `missions` WRITE;
/*!40000 ALTER TABLE `missions` DISABLE KEYS */;
INSERT INTO `missions` VALUES (1,15,'2',2,-1,4,-356,-285,0),(2,16,'2',2,-1,4,-356,-285,0),(3,-18,'2',2,-1,4,-356,-285,0),(4,-91,'2',2,-1,4,-356,-285,0);
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
INSERT INTO `playerstatus` VALUES (1,1,1,2,2,'Narn Regime',3210,1510,1616,404,808,'waiting'),(2,2,1,2,2,'Vree Conglomerate',2630,1554,1540,385,770,'ready');
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
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `powers`
--

LOCK TABLES `powers` WRITE;
/*!40000 ALTER TABLE `powers` DISABLE KEYS */;
INSERT INTO `powers` VALUES (1,1,7,1,'1',5),(2,1,9,1,'1',5),(3,1,13,1,'0',0),(4,1,14,1,'0',0),(5,1,16,1,'0',0),(6,1,18,1,'0',0),(7,1,22,1,'0',0),(8,1,23,1,'0',0),(9,7,9,2,'0',0),(10,7,13,2,'0',0),(11,7,17,2,'0',0),(12,7,21,2,'0',0),(13,7,27,2,'1',4),(14,7,28,2,'1',4),(15,7,4,2,'1',4),(16,1,11,2,'1',3),(17,1,14,2,'0',0),(18,1,16,2,'0',0),(19,1,18,2,'0',0),(20,1,22,2,'0',0),(21,1,23,2,'0',0),(22,1,4,2,'1',4),(23,2,11,2,'1',3),(24,2,12,2,'1',3),(25,2,13,2,'0',0),(26,2,14,2,'0',0),(27,2,16,2,'0',0),(28,2,17,2,'0',0),(29,2,21,2,'0',0),(30,2,22,2,'0',0),(31,2,4,2,'1',4),(32,3,7,2,'1',3),(33,3,9,2,'0',0),(34,3,10,2,'0',0),(35,3,13,2,'1',3),(36,3,15,2,'0',0),(37,3,16,2,'0',0);
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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sensors`
--

LOCK TABLES `sensors` WRITE;
/*!40000 ALTER TABLE `sensors` DISABLE KEYS */;
INSERT INTO `sensors` VALUES (1,1,4,1,0.63,928,0),(2,4,4,1,-1.00,110,0),(3,2,4,1,-1.00,110,0),(4,3,3,1,-1.00,73,0),(5,7,4,1,8.25,843,1),(6,6,4,1,7.80,861,1),(7,5,4,1,359.64,1106,1),(8,8,3,1,-1.00,66,0),(9,7,4,2,39.80,560,0),(10,6,4,2,342.10,481,0),(11,5,4,2,27.22,881,1),(12,8,3,2,342.34,741,1),(13,1,4,2,17.23,470,1),(14,4,4,2,-1.00,110,0),(15,2,4,2,358.48,742,0),(16,3,3,2,21.99,380,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subunits`
--

LOCK TABLES `subunits` WRITE;
/*!40000 ALTER TABLE `subunits` DISABLE KEYS */;
INSERT INTO `subunits` VALUES (1,3,1,'Thentus'),(2,3,1,'Thentus'),(3,8,1,'Xvell'),(4,8,1,'Xvell'),(5,15,6,'Tzymm'),(6,16,6,'Tzymm');
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
INSERT INTO `systemcrits` VALUES (1,6,2,1,'Morale',-2,-15.00);
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
  `heading` decimal(5,2) NOT NULL DEFAULT '0.00',
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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `units`
--

LOCK TABLES `units` WRITE;
/*!40000 ALTER TABLE `units` DISABLE KEYS */;
INSERT INTO `units` VALUES (1,1,1,4,'GQuan','',1336,1060,'bought',1,1,0,0,0,-350,377,14.93,14.93,0,155,0,0,0,1,3,0,''),(2,1,1,4,'GSten','',752,750,'bought',0,1,0,0,0,-455,-83,348.00,348.00,0,174,0,0,0,1,3,0,''),(3,1,1,3,'Squadron','',650,650,'bought',0,1,0,0,0,-284,407,344.00,344.00,26,185,0,0,0,1,3,0,''),(4,1,1,4,'GSten','',752,750,'bought',0,1,0,0,0,-356,-285,3.65,3.65,0,193,0,0,0,1,3,0,''),(5,1,2,4,'Zitomm','',1416,600,'bought',1,1,0,0,0,705,230,122.00,122.00,0,155,0,0,0,1,3,0,''),(6,1,2,4,'Xill','',775,775,'bought',0,1,0,0,0,310,552,184.91,184.91,0,155,0,0,0,1,3,0,''),(7,1,2,4,'Xill','',775,775,'bought',0,1,0,0,0,308,699,190.00,190.00,19,155,0,0,0,1,3,0,''),(8,1,2,3,'Squadron','',480,480,'bought',0,1,0,0,0,462,297,174.00,174.00,0,162,0,0,0,1,3,0,''),(9,1,0,0,'Obstacle','',36,47,'deployed',0,0,0,0,0,80,356,0.00,0.00,106,0,14,4,0,1,3,0,''),(10,1,0,0,'Obstacle','',64,83,'deployed',0,0,0,0,0,-218,-141,0.00,0.00,134,0,21,8,0,1,3,0,''),(11,1,0,0,'Obstacle','',24,31,'deployed',0,0,0,0,0,-116,431,0.00,0.00,88,0,28,3,0,1,3,0,''),(12,1,0,0,'Obstacle','',9,12,'deployed',0,0,0,0,0,-382,371,0.00,0.00,105,0,15,1,0,1,3,0,''),(13,1,0,0,'Obstacle','',9,12,'deployed',0,0,0,0,0,-443,-33,0.00,0.00,76,0,13,1,0,1,3,0,''),(14,1,0,0,'Obstacle','',20,26,'deployed',0,0,0,0,0,-299,-379,0.00,0.00,171,0,11,2,0,1,3,0,''),(15,1,2,2,'Flight','Dragon-Sigma',216,216,'deployed',0,2,0,0,0,705,230,0.00,0.00,0,120,0,0,0,2,-1,0,''),(16,1,2,2,'Flight','Assault-Alpha',216,216,'deployed',0,2,0,0,0,705,230,0.00,0.00,0,120,0,0,0,2,-1,0,'');
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

-- Dump completed on 2019-01-08 17:07:45

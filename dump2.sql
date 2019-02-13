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
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actions`
--

LOCK TABLES `actions` WRITE;
/*!40000 ALTER TABLE `actions` DISABLE KEYS */;
INSERT INTO `actions` VALUES (1,3,1,'deploy',0,0,-429,-491,0.00,0.00,0,0,1,1),(2,2,1,'deploy',0,0,-471,-323,0.00,0.00,0,0,1,1),(3,1,1,'deploy',0,0,-513,243,0.00,0.00,0,0,1,1),(4,6,1,'deploy',0,0,450,377,180.00,180.00,0,0,1,1),(5,5,1,'deploy',0,0,430,641,180.00,180.00,0,0,1,1),(6,4,1,'deploy',0,0,546,-117,180.00,180.00,0,0,1,1),(7,3,1,'jumpIn',0,107,-372,-581,-14.00,-14.00,0,0,0,1),(8,2,1,'jumpIn',0,34,-505,-319,-5.00,-5.00,0,0,0,1),(9,1,1,'jumpIn',0,51,-563,254,-15.00,-15.00,0,0,0,1),(10,6,1,'jumpIn',0,81,400,441,-20.00,-20.00,0,0,0,1),(11,5,1,'jumpIn',0,68,426,709,-22.00,-22.00,0,0,0,1),(12,4,1,'jumpIn',0,19,533,-131,2.00,2.00,0,0,0,1),(13,6,1,'turn',0,0,400,441,30.00,30.00,30,86,1,1),(14,6,1,'move',0,86,315,456,0.00,0.00,0,0,1,1),(15,6,1,'turn',0,0,315,456,15.44,15.44,16,45,1,1),(16,6,1,'move',0,69,246,449,0.00,0.00,0,0,1,1),(17,6,1,'turn',0,0,246,449,2.76,2.76,6,0,1,1),(18,5,1,'turn',0,0,426,709,30.00,30.00,30,86,1,1),(19,5,1,'move',0,86,343,730,0.00,0.00,0,0,1,1),(20,5,1,'turn',0,0,343,730,25.84,25.84,28,69,1,1),(21,5,1,'move',0,69,275,716,0.00,0.00,0,0,1,1),(22,5,1,'turn',0,0,275,716,12.00,12.00,12,35,1,1),(23,4,1,'turn',0,0,533,-131,-9.60,-9.60,10,28,1,1),(24,4,1,'move',0,152,388,-83,0.00,0.00,0,0,1,1),(25,4,1,'turn',0,0,388,-83,-20.04,-20.04,41,3,1,1),(26,4,1,'move',0,3,385,-82,0.00,0.00,0,0,1,1),(27,3,1,'turn',0,0,-372,-581,23.08,23.08,24,58,1,1),(28,3,1,'move',0,141,-232,-558,0.00,0.00,0,0,1,1),(29,3,1,'turn',0,0,-232,-558,30.00,30.00,55,14,1,1),(30,3,1,'move',0,14,-219,-552,0.00,0.00,0,0,1,1),(31,2,1,'move',0,155,-352,-346,0.00,0.00,0,0,1,1),(32,2,1,'turn',0,0,-352,-346,24.12,24.12,50,0,1,1),(33,1,1,'turn',0,0,-563,254,-30.00,-30.00,30,75,1,1),(34,1,1,'move',0,149,-540,106,0.00,0.00,0,0,1,1),(35,1,1,'turn',0,0,-540,106,30.00,30.00,50,25,1,1),(36,1,1,'move',0,6,-535,103,0.00,0.00,0,0,1,1),(57,3,2,'turn',0,0,-219,-552,30.00,30.00,30,75,1,1),(58,3,2,'move',0,147,-180,-410,0.00,0.00,0,0,1,1),(59,3,2,'move',0,8,-175,-403,0.00,0.00,0,0,1,1),(60,2,2,'turn',0,0,-352,-346,30.00,30.00,30,75,1,1),(61,2,2,'move',0,75,-338,-272,0.00,0.00,0,0,1,1),(62,2,2,'turn',0,0,-338,-272,30.00,30.00,30,75,1,1),(63,2,2,'move',0,79,-363,-197,0.00,0.00,0,0,1,1),(64,2,2,'turn',0,0,-363,-197,-20.00,-20.00,20,50,1,1),(65,2,2,'move',0,1,-362,-196,0.00,0.00,0,0,1,1),(66,1,2,'move',0,19,-519,93,0.00,0.00,0,0,1,1),(67,1,2,'move',0,136,-401,25,0.00,0.00,0,0,1,1),(68,1,2,'turn',0,0,-401,25,30.00,30.00,60,0,1,1),(69,6,2,'turn',0,0,246,449,30.00,30.00,30,86,1,1),(70,6,2,'move',0,86,178,396,0.00,0.00,0,0,1,1),(71,6,2,'turn',0,0,178,396,30.00,30.00,36,69,1,1),(72,6,2,'move',0,69,152,332,0.00,0.00,0,0,1,1),(73,6,2,'turn',0,0,152,332,-4.00,-4.00,4,12,1,1),(74,5,2,'move',0,35,243,702,0.00,0.00,0,0,1,1),(75,5,2,'turn',0,0,243,702,27.06,27.06,28,78,1,1),(76,5,2,'move',0,120,167,609,0.00,0.00,0,0,1,1),(77,4,2,'move',0,86,317,-29,0.00,0.00,0,0,1,1),(78,4,2,'turn',0,0,317,-29,30.00,30.00,36,69,1,1),(79,4,2,'move',0,69,248,-34,0.00,0.00,0,0,1,1),(80,6,3,'move',0,12,147,321,0.00,0.00,0,0,1,0),(81,6,3,'turn',0,0,147,321,-30.00,-30.00,30,86,1,0),(82,6,3,'move',0,86,76,273,0.00,0.00,0,0,1,0),(83,6,3,'turn',0,0,76,273,-30.00,-30.00,40,58,1,0),(84,6,3,'move',0,57,19,269,0.00,0.00,0,0,1,0),(85,5,3,'speed',0,1,167,609,0.00,0.00,30,0,1,0),(86,5,3,'speed',0,1,167,609,0.00,0.00,30,0,1,0),(87,5,3,'turn',0,0,167,609,-8.00,-8.00,10,29,1,0),(88,5,3,'move',0,193,26,478,0.00,0.00,0,0,1,0),(89,4,3,'speed',0,-1,248,-34,0.00,0.00,30,0,1,0),(90,4,3,'speed',0,-1,248,-34,0.00,0.00,30,0,1,0),(91,4,3,'turn',0,0,248,-34,13.00,13.00,10,28,1,0),(92,4,3,'move',0,116,149,-96,0.00,0.00,0,0,1,0),(93,4,3,'move',0,1,148,-96,0.00,0.00,0,0,1,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `damages`
--

LOCK TABLES `damages` WRITE;
/*!40000 ALTER TABLE `damages` DISABLE KEYS */;
INSERT INTO `damages` VALUES (1,17,1,1,11,1,2,0,'Beam',168,0,16,0,40,0,16,0,'p;',0),(2,12,1,1,7,1,2,0,'Beam',172,0,16,0,41,0,16,0,'p;',0),(3,11,1,1,7,1,2,0,'Particle',32,0,15,0,17,0,15,0,'p;',0),(4,12,1,1,7,4,2,0,'Beam',172,0,16,20,21,0,16,0,'p;c;',0),(5,16,1,1,11,12,2,0,'Particle',33,0,10,23,0,0,10,0,'p;',0),(6,17,1,1,23,23,2,0,'Beam',168,0,14,42,0,0,14,0,'p;',0),(7,12,1,1,23,23,2,0,'Beam',172,0,13,44,0,0,13,0,'p;',0),(8,16,1,1,23,23,2,0,'Particle',34,0,12,22,0,0,12,0,'p;',0),(9,17,1,1,26,26,2,0,'Beam',168,0,14,42,0,0,14,0,'p;',0),(10,14,1,1,26,26,2,0,'Beam',28,0,13,15,0,0,13,0,'p;',0),(11,7,1,4,6,1,2,0,'Particle',66,0,19,0,47,0,19,0,'p;',0),(12,8,1,4,6,1,2,0,'Particle',68,0,18,0,50,0,18,0,'p;',0),(13,9,1,4,6,1,2,0,'Particle',53,0,18,0,35,0,18,0,'p;',0),(14,5,1,4,12,1,2,0,'Particle',65,3,17,0,45,0,20,0,'p;',0),(15,5,1,4,12,1,2,0,'Particle',59,3,17,0,39,0,20,0,'p;',0),(16,6,1,4,12,1,2,0,'Particle',68,3,17,0,48,0,20,0,'p;',0),(17,8,1,4,6,7,2,0,'Particle',67,0,11,44,12,0,11,1,'p;o3;',0),(18,9,1,4,6,9,2,0,'Particle',72,0,18,54,0,0,18,0,'p;',0),(19,10,1,4,6,10,2,0,'Particle',66,0,8,40,18,0,8,1,'p;o4;',0),(20,3,1,4,12,13,2,0,'Particle',62,3,14,45,0,0,17,0,'p;',0),(21,4,1,4,12,13,2,0,'Particle',66,3,14,15,34,0,17,1,'p;o6;',0);
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
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fireorders`
--

LOCK TABLES `fireorders` WRITE;
/*!40000 ALTER TABLE `fireorders` DISABLE KEYS */;
INSERT INTO `fireorders` VALUES (1,1,1,6,1,-540,103,13,1,32,'46;',0,1),(2,1,1,5,1,-539,101,13,1,23,'46;',0,1),(3,1,2,3,4,255,-33,24,2,82,'27;87;',1,1),(4,1,2,3,4,255,-33,25,2,82,'31;96;',1,1),(5,1,2,3,4,255,-33,27,2,82,'20;18;',2,1),(6,1,2,3,4,255,-33,28,2,82,'59;100;',1,1),(7,1,2,2,4,255,-32,24,2,67,'99;30;',1,1),(8,1,2,2,4,255,-32,25,2,67,'47;37;',2,1),(9,1,2,2,4,255,-32,27,2,67,'62;18;',2,1),(10,1,2,2,4,255,-32,28,2,67,'25;76;',1,1),(11,1,2,6,1,-409,21,11,2,67,'-84;61;',1,1),(12,1,2,6,1,-409,21,20,1,93,'28;',1,1),(13,1,2,6,1,-409,21,21,1,55,'94;',0,1),(14,1,2,6,1,-409,21,22,1,55,'39;',1,1),(15,1,2,5,1,-405,31,7,2,49,'83;76;',0,1),(16,1,2,5,1,-405,31,11,2,49,'27;44;',2,1),(17,1,2,5,1,-405,31,20,1,82,'34;',1,1),(18,1,2,4,3,-171,-403,13,1,50,'85;',0,1);
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
INSERT INTO `games` VALUES (1,'myGame','active',3,-1,3500,1500,11,3,10,10,5,3,75,150);
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loads`
--

LOCK TABLES `loads` WRITE;
/*!40000 ALTER TABLE `loads` DISABLE KEYS */;
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
INSERT INTO `playerstatus` VALUES (1,1,1,3,-1,'Vree Conglomerate',2325,2675,1540,385,1155,'waiting'),(2,2,1,3,-1,'Earth Alliance',2325,2675,1540,385,1155,'ready');
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
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `powers`
--

LOCK TABLES `powers` WRITE;
/*!40000 ALTER TABLE `powers` DISABLE KEYS */;
INSERT INTO `powers` VALUES (1,6,10,1,'0',0),(2,6,13,1,'1',4),(3,6,14,1,'-1',0),(4,6,15,1,'-1',0),(5,6,21,1,'-1',0),(6,6,22,1,'-1',0),(7,6,4,1,'1',4),(8,5,8,1,'0',0),(9,5,13,1,'1',4),(10,5,14,1,'-1',0),(11,5,15,1,'-1',0),(12,5,21,1,'-1',0),(13,5,22,1,'-1',0),(14,5,4,1,'1',4),(15,4,10,1,'0',0),(16,4,13,1,'1',4),(17,4,14,1,'-1',0),(18,4,15,1,'-1',0),(19,4,21,1,'-1',0),(20,4,22,1,'-1',0),(21,4,4,1,'1',4),(22,6,14,2,'-2',0),(23,6,15,2,'-2',0),(24,6,19,2,'1',4),(25,6,21,2,'-2',0),(26,6,22,2,'-2',0),(27,5,6,2,'1',4),(28,5,14,2,'-1',0),(29,5,15,2,'-1',0),(30,5,21,2,'-1',0),(31,5,22,2,'-1',0),(32,4,12,2,'1',4),(33,4,14,2,'-1',0),(34,4,15,2,'-1',0),(35,4,21,2,'-1',0),(36,4,22,2,'-1',0),(37,2,9,2,'0',0),(38,2,13,2,'0',0),(39,2,17,2,'0',0),(40,2,21,2,'0',0),(41,2,6,2,'1',8),(42,6,6,3,'1',4),(43,6,14,3,'-2',0),(44,6,15,3,'-2',0),(45,6,21,3,'-2',0),(46,6,22,3,'-2',0),(47,5,14,3,'-2',0),(48,5,15,3,'-2',0),(49,5,21,3,'-2',0),(50,5,22,3,'-2',0),(51,5,4,3,'1',4),(52,4,14,3,'-2',0),(53,4,15,3,'-2',0),(54,4,20,3,'1',4),(55,4,21,3,'-2',0),(56,4,22,3,'-2',0);
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
INSERT INTO `sensors` VALUES (1,3,4,1,0.29,800,1),(2,2,4,1,359.52,844,1),(3,1,4,1,359.40,959,1),(4,6,4,1,8.43,846,0),(5,5,4,1,9.23,854,0),(6,4,4,1,7.32,926,0),(7,6,4,2,318.10,679,0),(8,5,4,2,349.88,846,0),(9,4,4,2,23.50,594,0),(10,3,4,2,346.99,692,0),(11,2,4,2,321.57,680,0),(12,1,4,2,-1.00,106,0),(13,6,4,3,27.36,431,0),(14,5,4,3,6.47,585,0),(15,4,4,3,326.91,516,0);
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `systemcrits`
--

LOCK TABLES `systemcrits` WRITE;
/*!40000 ALTER TABLE `systemcrits` DISABLE KEYS */;
INSERT INTO `systemcrits` VALUES (1,1,2,2,'',0,0.00),(2,1,4,2,'Output',0,-15.00),(3,1,12,2,'Accuracy',0,-25.00),(4,1,24,2,'Damage',0,-25.00),(5,1,25,2,'Damage',0,-25.00),(6,4,2,2,'Morale',-2,-15.00),(7,4,5,2,'Overload',0,-10.72);
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
  `name` varchar(255) NOT NULL DEFAULT '',
  `callsign` varchar(40) NOT NULL DEFAULT '',
  `totalCost` int(4) NOT NULL DEFAULT '0',
  `moraleCost` int(4) NOT NULL DEFAULT '0',
  `status` varchar(255) NOT NULL DEFAULT '',
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
  `notes` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `units`
--

LOCK TABLES `units` WRITE;
/*!40000 ALTER TABLE `units` DISABLE KEYS */;
INSERT INTO `units` VALUES (1,1,1,4,'Xill','A',775,775,'bought',1,1,0,0,0,-401,25,360.00,360.00,0,155,0,0,0,2,3,0,''),(2,1,1,4,'Xill','B',775,775,'bought',0,1,0,0,0,-362,-196,54.12,54.12,49,155,0,0,0,2,3,0,''),(3,1,1,4,'Xill','C',775,775,'bought',0,1,0,0,0,-175,-403,55.08,55.08,0,155,0,0,0,2,3,0,''),(4,1,2,4,'Hyperion','',775,775,'bought',1,1,0,0,0,248,-34,184.36,184.36,0,155,0,0,0,2,3,0,''),(5,1,2,4,'Hyperion','',775,775,'bought',0,1,0,0,0,167,609,230.90,230.90,0,155,0,0,0,2,3,0,''),(6,1,2,4,'Hyperion','',775,775,'bought',0,1,0,0,0,152,332,244.20,244.20,12,155,0,0,0,2,3,0,''),(7,1,0,0,'NebulaCloud','',0,0,'deployed',0,0,0,0,0,-279,-411,0.00,0.00,0,0,0,0,0,1,-1,0,'102;18;87;5'),(8,1,0,0,'NebulaCloud','',0,0,'deployed',0,0,0,0,0,53,-307,0.00,0.00,0,0,0,0,0,1,-1,0,'106;17;17;6'),(9,1,0,0,'NebulaCloud','',0,0,'deployed',0,0,0,0,0,-133,-16,0.00,0.00,0,0,0,0,0,1,-1,0,'114;19;272;6'),(10,1,0,0,'AsteroidField','',0,0,'deployed',0,0,0,0,0,-64,59,0.00,0.00,0,0,0,0,0,1,-1,0,'0;25;132;56;168;2;15'),(11,1,0,0,'AsteroidField','',0,0,'deployed',0,0,0,0,0,304,224,0.00,0.00,0,0,0,0,0,1,-1,0,'0;20;310;47;188;1;12'),(12,1,0,0,'AsteroidField','',0,0,'deployed',0,0,0,0,0,-565,-349,0.00,0.00,0,0,0,0,0,1,-1,0,'0;15;333;46;138;3;16'),(13,1,0,0,'AsteroidField','',0,0,'deployed',0,0,0,0,0,-170,-477,0.00,0.00,0,0,0,0,0,1,-1,0,'0;25;349;66;198;2;15'),(14,1,0,0,'AsteroidField','',0,0,'deployed',0,0,0,0,0,615,-434,0.00,0.00,0,0,0,0,0,1,-1,0,'0;15;182;44;132;3;14');
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

-- Dump completed on 2019-02-13 16:52:06

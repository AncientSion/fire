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
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actions`
--

LOCK TABLES `actions` WRITE;
/*!40000 ALTER TABLE `actions` DISABLE KEYS */;
INSERT INTO `actions` VALUES (1,3,1,'move',0,16,194,418,0.00,0,0,0,1),(2,4,1,'move',0,36,432,336,0.00,0,0,0,1),(3,5,1,'move',0,38,427,-301,0.00,0,0,0,1),(4,6,1,'move',0,30,-276,223,0.00,0,0,0,1),(5,7,1,'move',0,37,-426,316,0.00,0,0,0,1),(6,8,1,'move',0,33,-442,-251,0.00,0,0,0,1),(7,2,1,'deploy',0,0,589,-14,180.00,0,0,1,1),(8,1,1,'deploy',0,0,-566,-16,0.00,0,0,1,1),(9,1,1,'jumpIn',0,85,-482,-27,-21.00,0,0,0,1),(10,2,1,'jumpIn',0,90,663,37,4.00,0,0,0,1),(11,1,1,'turn',0,0,-482,-27,26.79,27,77,1,1),(12,1,1,'move',0,155,-332,-68,0.00,0,0,1,1),(13,2,1,'move',0,140,524,18,0.00,0,0,1,1),(14,3,2,'move',0,16,183,406,0.00,0,0,0,1),(15,4,2,'move',0,36,396,340,0.00,0,0,0,1),(16,5,2,'move',0,38,395,-281,0.00,0,0,0,1),(17,6,2,'move',0,30,-251,207,0.00,0,0,0,1),(18,7,2,'move',0,37,-405,285,0.00,0,0,0,1),(19,8,2,'move',0,33,-409,-254,0.00,0,0,0,1),(20,9,2,'deploy',0,0,524,18,0.00,0,0,0,1),(21,10,2,'deploy',0,0,-332,-68,0.00,0,0,0,1),(22,1,2,'turn',0,0,-332,-68,-30.00,30,86,1,1),(23,1,2,'move',0,155,-223,-178,0.00,0,0,1,1),(24,2,2,'turn',0,0,524,18,-30.00,30,105,1,1),(25,2,2,'move',0,140,394,70,0.00,0,0,1,1),(26,10,2,'move',0,393,-209,-90,349.75,0,0,0,1),(27,9,2,'move',0,316,385,31,174.74,0,0,0,1),(28,6,3,'move',0,30,-226,191,0.00,0,0,0,1),(29,8,3,'move',0,33,-376,-257,0.00,0,0,0,1),(30,3,3,'move',0,16,172,394,0.00,0,0,0,1),(31,4,3,'move',0,36,360,344,0.00,0,0,0,1),(32,5,3,'move',0,38,363,-261,0.00,0,0,0,1),(33,7,3,'move',0,37,-384,254,0.00,0,0,0,1),(34,11,3,'deploy',0,0,-223,-178,0.00,0,0,0,1),(35,12,3,'deploy',0,0,394,70,0.00,0,0,0,1),(36,2,3,'move',0,140,264,122,0.00,0,0,1,1),(37,1,3,'turn',0,0,-223,-178,4.90,5,14,1,1),(38,1,3,'move',0,155,-105,-278,0.00,0,0,1,1),(39,11,3,'move',0,150,-90,-109,27.51,0,0,0,1),(40,10,3,'move',0,440,-161,-74,18.15,0,0,0,1),(41,9,3,'move',0,177,209,47,174.81,0,0,0,1),(42,12,3,'move',0,608,279,-10,214.89,0,0,0,1),(43,1,3,'jumpOut',1,0,-105,-278,0.00,0,0,0,1),(44,7,4,'move',0,37,-363,223,0.00,0,0,0,1),(45,3,4,'move',0,16,161,382,0.00,0,0,0,1),(46,4,4,'move',0,36,324,348,0.00,0,0,0,1),(47,5,4,'move',0,38,331,-241,0.00,0,0,0,1),(48,6,4,'move',0,30,-201,175,0.00,0,0,0,1),(49,8,4,'move',0,33,-343,-260,0.00,0,0,0,1),(50,2,4,'turn',0,0,264,122,20.39,21,72,1,1),(51,2,4,'move',0,140,124,126,0.00,0,0,1,1),(52,11,4,'move',0,300,176,30,27.55,0,0,0,1),(53,10,4,'move',0,389,-66,-43,18.11,0,0,0,1),(54,9,4,'patrol',0,0,209,47,0.00,0,0,0,1),(55,12,4,'patrol',0,0,279,-10,0.00,0,0,0,1),(56,16,1,'move',0,28,302,51,0.00,0,0,0,1),(57,17,1,'move',0,31,271,-286,0.00,0,0,0,1),(58,18,1,'move',0,37,170,179,0.00,0,0,0,1),(59,19,1,'move',0,22,-318,-268,0.00,0,0,0,1),(60,20,1,'move',0,20,-301,82,0.00,0,0,0,1),(61,21,1,'move',0,36,-206,398,0.00,0,0,0,1),(62,13,1,'deploy',0,0,-445,-361,0.00,0,0,1,1),(63,14,1,'deploy',0,0,-433,352,339.46,0,0,1,1),(64,15,1,'deploy',0,0,585,-39,180.00,0,0,1,1),(65,13,1,'jumpIn',0,32,-424,-338,-26.00,0,0,0,1),(66,14,1,'jumpIn',0,153,-320,249,2.00,0,0,0,1),(67,15,1,'jumpIn',0,101,515,33,-4.00,0,0,0,1),(68,15,1,'turn',0,0,515,33,20.42,21,59,1,1),(69,15,1,'move',0,155,364,0,0.00,0,0,1,1),(70,15,1,'turn',0,0,364,0,4.60,10,0,1,1),(71,13,1,'turn',0,0,-424,-338,30.00,30,81,1,1),(72,13,1,'move',0,81,-349,-368,0.00,0,0,1,1),(73,13,1,'turn',0,0,-349,-368,30.00,33,74,1,1),(74,13,1,'move',0,74,-276,-358,0.00,0,0,1,1),(75,13,1,'turn',0,0,-276,-358,17.00,17,46,1,1),(76,14,1,'turn',0,0,-320,249,15.64,16,18,1,1),(77,14,1,'move',0,185,-135,246,0.00,0,0,1,1),(78,14,1,'turn',0,0,-135,246,-45.00,90,0,1,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `damages`
--

LOCK TABLES `damages` WRITE;
/*!40000 ALTER TABLE `damages` DISABLE KEYS */;
INSERT INTO `damages` VALUES (1,5,1,1,12,1,3,0,'Particle',165,0,18,0,147,0,18,0,'p;',0),(2,5,1,1,12,1,3,0,'Particle',167,0,18,0,149,0,18,0,'p;',0),(3,6,1,1,12,1,3,0,'Particle',155,0,17,0,138,0,17,0,'p;',0),(4,6,1,1,12,13,3,0,'Particle',164,0,13,60,91,0,13,1,'p;o6;',0),(5,8,2,15,6,1,1,0,'Particle',49,0,19,0,30,0,19,0,'p;',0),(6,15,2,15,19,1,1,0,'Particle',17,0,9,0,0,0,18,0,'b;',0),(7,7,2,15,6,9,1,0,'Particle',17,0,9,8,0,0,9,0,'p;',0),(8,8,2,15,6,10,1,0,'Particle',59,0,9,40,10,0,9,1,'p;o4;',0),(9,11,2,15,19,20,1,0,'Particle',21,0,14,7,0,0,14,0,'p;',0);
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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fireorders`
--

LOCK TABLES `fireorders` WRITE;
/*!40000 ALTER TABLE `fireorders` DISABLE KEYS */;
INSERT INTO `fireorders` VALUES (1,1,2,2,0,209,47,9,0,0,'',0,2),(2,1,2,1,0,55,-138,9,0,0,'',0,2),(3,1,3,1,0,380,25,9,0,0,'',0,2),(4,1,3,2,0,-218,-171,9,0,0,'',0,2),(5,1,3,2,1,-102,-275,13,2,251,'40;22;',2,1),(6,1,3,2,1,-102,-275,15,2,251,'4;53;',2,1),(7,2,1,13,15,364,3,7,2,42,'99;13;',1,1),(8,2,1,13,15,364,3,8,3,42,'24;58;21;',2,1),(9,2,1,13,15,364,3,9,2,42,'76;91;',0,1),(10,2,1,14,15,365,-2,6,2,23,'79;45;',0,1),(11,2,1,14,15,365,-2,7,2,23,'26;16;',1,1),(12,2,1,14,15,365,-2,8,2,23,'60;27;',0,1),(13,2,1,14,15,365,-2,10,2,23,'37;93;',0,1),(14,2,1,14,15,365,-2,11,2,23,'-77;27;',0,1),(15,2,1,14,15,365,-2,12,2,23,'60;19;',1,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `games`
--

LOCK TABLES `games` WRITE;
/*!40000 ALTER TABLE `games` DISABLE KEYS */;
INSERT INTO `games` VALUES (1,'myGame','active',4,3,3500,1500,11,3,10,10,3,75,175),(2,'myGame','active',1,3,3500,1500,11,3,10,10,3,75,175);
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `globals`
--

LOCK TABLES `globals` WRITE;
/*!40000 ALTER TABLE `globals` DISABLE KEYS */;
INSERT INTO `globals` VALUES (1,1,0,0,'Morale',0,100.00,'',''),(2,2,0,0,'Morale',0,100.00,'',''),(3,1,1,3,'Morale',1,-75.00,'f;86;38;23;75','Hyperion #1 routed'),(4,1,0,3,'Morale',2,-25.00,'f;100;42;48;123',''),(5,3,0,0,'Morale',0,100.00,'',''),(6,4,0,0,'Morale',0,100.00,'','');
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `missions`
--

LOCK TABLES `missions` WRITE;
/*!40000 ALTER TABLE `missions` DISABLE KEYS */;
INSERT INTO `missions` VALUES (1,9,'1',2,-1,0,209,47,3),(2,-60,'1',2,-1,0,209,47,0),(3,10,'1',2,-1,0,55,-138,0),(4,-82,'1',2,-1,0,55,-138,0),(5,11,'2',3,-1,9,209,47,0),(6,10,'2',3,-1,9,209,47,0),(7,-82,'2',3,-1,9,209,47,0),(8,12,'1',3,-1,0,279,-10,3),(9,-46,'2',3,-1,1,-223,-178,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playerstatus`
--

LOCK TABLES `playerstatus` WRITE;
/*!40000 ALTER TABLE `playerstatus` DISABLE KEYS */;
INSERT INTO `playerstatus` VALUES (1,1,1,4,3,'Earth Alliance',775,3945,0,0,0,'waiting'),(2,2,1,4,3,'Centauri Republic',1040,3596,1680,420,1680,'waiting'),(3,1,2,1,3,'Vree Conglomerate',1215,3785,1540,385,385,'waiting'),(4,2,2,1,3,'Earth Alliance',775,4225,1540,385,385,'ready');
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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `powers`
--

LOCK TABLES `powers` WRITE;
/*!40000 ALTER TABLE `powers` DISABLE KEYS */;
INSERT INTO `powers` VALUES (1,1,14,1,'-1',0),(2,1,15,1,'-1',0),(3,1,21,1,'-1',0),(4,1,22,1,'-1',0),(5,1,14,2,'-1',0),(6,1,15,2,'-1',0),(7,1,21,2,'-1',0),(8,1,22,2,'-1',0),(9,1,14,3,'-1',0),(10,1,15,3,'-1',0),(11,1,21,3,'-1',0),(12,1,22,3,'-1',0),(13,1,14,4,'-1',0),(14,1,15,4,'-1',0),(15,1,21,4,'-1',0),(16,1,22,4,'-1',0),(17,15,13,1,'1',4),(18,15,14,1,'-1',0),(19,15,15,1,'-1',0),(20,15,21,1,'-1',0),(21,15,22,1,'-1',0);
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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sensors`
--

LOCK TABLES `sensors` WRITE;
/*!40000 ALTER TABLE `sensors` DISABLE KEYS */;
INSERT INTO `sensors` VALUES (1,2,4,1,-1.00,124,0),(2,1,4,1,-1.00,102,0),(3,2,4,2,-1.00,124,0),(4,1,4,2,-1.00,102,0),(5,1,4,3,-1.00,102,0),(6,2,4,3,-1.00,124,0),(7,1,4,4,-1.00,102,1),(8,2,4,4,-1.00,124,0),(9,13,4,1,0.07,840,0),(10,14,3,1,-1.00,59,0),(11,15,4,1,6.21,970,0);
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
INSERT INTO `subunits` VALUES (1,9,14,'Sentri'),(2,10,10,'Aurora'),(3,11,4,'Naga'),(4,12,10,'Sentri'),(5,14,1,'Xvell'),(6,14,1,'Xvell');
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `systemcrits`
--

LOCK TABLES `systemcrits` WRITE;
/*!40000 ALTER TABLE `systemcrits` DISABLE KEYS */;
INSERT INTO `systemcrits` VALUES (1,1,5,3,'Overload',0,-5.63),(2,15,5,1,'Overload',0,-3.31);
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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `units`
--

LOCK TABLES `units` WRITE;
/*!40000 ALTER TABLE `units` DISABLE KEYS */;
INSERT INTO `units` VALUES (1,1,1,4,'Hyperion','',1055,775,'jumpOut',1,1,4,0,1,-105,-278,319.69,0,155,0,0,0,3,3,0,''),(2,1,2,4,'Primus','',1404,1040,'bought',1,1,0,0,0,264,122,158.00,0,140,0,0,0,3,3,0,''),(3,1,0,0,'Obstacle','',40,52,'deployed',0,0,0,0,0,161,382,-134.00,137,16,13,4,0,4,-1,0,''),(4,1,0,0,'Obstacle','',63,82,'deployed',0,0,0,0,0,324,348,-186.00,94,36,18,7,0,4,-1,0,''),(5,1,0,0,'Obstacle','',40,52,'deployed',0,0,0,0,0,331,-241,148.00,157,38,15,4,0,4,-1,0,''),(6,1,0,0,'Obstacle','',9,12,'deployed',0,0,0,0,0,-201,175,-33.00,188,30,8,1,0,4,-1,0,''),(7,1,0,0,'Obstacle','',70,91,'deployed',0,0,0,0,0,-363,223,-56.00,85,37,18,7,0,4,-1,0,''),(8,1,0,0,'Obstacle','',27,35,'deployed',0,0,0,0,0,-343,-260,-6.00,191,33,14,3,0,4,-1,0,''),(9,1,2,2,'Flight','Onslaught-Alpha',364,364,'deployed',0,2,0,0,0,209,47,0.00,0,280,0,0,0,3,3,0,''),(10,1,1,2,'Flight','Dragon-Gamma',280,280,'deployed',0,2,0,0,0,-161,-74,0.00,0,100,0,0,0,3,3,0,''),(11,1,1,1,'Salvo','Blue-Sigma',280,280,'deployed',0,3,0,0,0,-90,-109,0.00,0,300,0,0,0,3,3,0,''),(12,1,2,2,'Flight','Assault-Beta',260,260,'deployed',0,3,0,0,0,279,-10,0.00,0,140,0,0,0,3,3,0,''),(13,2,1,4,'Xill','',775,775,'bought',1,1,0,0,0,-424,-338,-26.00,0,155,0,0,0,1,-1,0,''),(14,2,1,3,'Squadron','',440,440,'bought',0,1,0,0,0,-320,249,2.00,0,185,0,0,0,1,-1,0,''),(15,2,2,4,'Hyperion','',775,775,'bought',1,1,0,0,0,515,33,-4.00,0,155,0,0,0,1,-1,0,''),(16,2,0,0,'Obstacle','',48,62,'deployed',0,0,0,0,0,302,51,-207.00,86,28,6,6,0,1,-1,0,''),(17,2,0,0,'Obstacle','',10,13,'deployed',0,0,0,0,0,271,-286,127.00,189,31,17,1,0,1,-1,0,''),(18,2,0,0,'Obstacle','',40,52,'deployed',0,0,0,0,0,170,179,-184.00,161,37,16,5,0,1,-1,0,''),(19,2,0,0,'Obstacle','',72,94,'deployed',0,0,0,0,0,-318,-268,48.00,96,22,8,8,0,1,-1,0,''),(20,2,0,0,'Obstacle','',20,26,'deployed',0,0,0,0,0,-301,82,-11.00,155,20,20,2,0,1,-1,0,''),(21,2,0,0,'Obstacle','',24,31,'deployed',0,0,0,0,0,-206,398,-67.00,175,36,12,3,0,1,-1,0,'');
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

-- Dump completed on 2018-12-02 19:37:56

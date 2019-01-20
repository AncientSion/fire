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
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actions`
--

LOCK TABLES `actions` WRITE;
/*!40000 ALTER TABLE `actions` DISABLE KEYS */;
INSERT INTO `actions` VALUES (1,1,1,'deploy',0,0,-561,15,0.00,0.00,0,0,1,1),(2,4,1,'deploy',0,0,-433,390,0.00,0.00,0,0,1,1),(3,3,1,'deploy',0,0,-468,-311,0.00,0.00,0,0,1,1),(4,2,1,'deploy',0,0,-438,-360,0.00,0.00,0,0,1,1),(5,6,1,'deploy',0,0,450,480,180.00,180.00,0,0,1,1),(6,5,1,'deploy',0,0,522,-238,180.00,180.00,0,0,1,1),(7,8,1,'deploy',0,0,737,-8,180.00,180.00,0,0,1,1),(8,7,1,'deploy',0,0,432,-465,180.00,180.00,0,0,1,1),(9,4,1,'jumpIn',0,53,-432,443,10.00,10.00,0,0,0,1),(10,3,1,'jumpIn',0,101,-556,-360,-21.00,-21.00,0,0,0,1),(11,2,1,'jumpIn',0,129,-519,-460,6.00,6.00,0,0,0,1),(12,1,1,'jumpIn',0,29,-582,-5,10.00,10.00,0,0,0,1),(13,8,1,'jumpIn',0,94,822,32,-27.00,-27.00,0,0,0,1),(14,7,1,'jumpIn',0,70,380,-418,14.00,14.00,0,0,0,1),(15,6,1,'jumpIn',0,46,481,446,-2.00,-2.00,0,0,0,1),(16,5,1,'jumpIn',0,64,579,-208,17.00,17.00,0,0,0,1),(17,6,1,'turn',0,0,481,446,18.94,18.94,19,54,1,1),(18,6,1,'move',0,155,331,406,0.00,0.00,0,0,1,1),(19,5,1,'move',0,91,493,-239,0.00,0.00,0,0,1,1),(20,5,1,'turn',0,0,493,-239,-30.00,-30.00,38,64,1,1),(21,5,1,'move',0,64,429,-243,0.00,0.00,0,0,1,1),(22,5,1,'turn',0,0,429,-243,-18.88,-18.88,32,18,1,1),(23,8,1,'turn',0,0,822,32,30.00,30.00,30,66,1,1),(24,8,1,'move',0,66,762,59,0.00,0.00,0,0,1,1),(25,8,1,'turn',0,0,762,59,18.14,18.14,19,40,1,1),(26,8,1,'move',0,99,664,69,0.00,0.00,0,0,1,1),(27,7,1,'move',0,185,217,-505,0.00,0.00,0,0,1,1),(28,1,1,'move',0,140,-450,43,0.00,0.00,0,0,1,1),(29,1,1,'turn',0,0,-450,43,5.01,5.01,12,0,1,1),(30,4,1,'turn',0,0,-432,443,-30.00,-30.00,30,75,1,1),(31,4,1,'move',0,150,-298,375,0.00,0.00,0,0,1,1),(32,4,1,'turn',0,0,-298,375,14.07,14.07,28,5,1,1),(33,4,1,'move',0,5,-293,375,0.00,0.00,0,0,1,1),(34,3,1,'speed',0,1,-556,-360,0.00,0.00,30,0,1,1),(35,3,1,'speed',0,1,-556,-360,0.00,0.00,30,0,1,1),(36,3,1,'move',0,205,-404,-497,0.00,0.00,0,0,1,1),(37,3,1,'turn',0,0,-404,-497,30.00,30.00,45,58,1,1),(38,2,1,'speed',0,1,-519,-460,0.00,0.00,30,0,1,1),(39,2,1,'speed',0,1,-519,-460,0.00,0.00,30,0,1,1),(40,2,1,'turn',0,0,-519,-460,-24.00,-24.00,30,39,1,1),(41,2,1,'move',0,230,-325,-585,0.00,0.00,0,0,1,1),(42,2,1,'move',0,1,-324,-585,0.00,0.00,0,0,1,1),(52,17,2,'deploy',0,0,429,-243,0.00,0.00,0,0,0,1),(53,18,2,'deploy',0,0,331,406,0.00,0.00,0,0,0,1),(65,19,2,'deploy',0,0,664,69,213.50,0.00,0,0,0,1),(66,1,2,'speed',0,1,-450,43,0.00,0.00,30,0,1,1),(67,1,2,'turn',0,0,-450,43,-30.00,-30.00,34,115,1,1),(68,1,2,'move',0,157,-294,29,0.00,0.00,0,0,1,1),(69,4,2,'turn',0,0,-293,375,30.00,30.00,30,75,1,1),(70,4,2,'move',0,152,-241,518,0.00,0.00,0,0,1,1),(71,4,2,'turn',0,0,-241,518,-30.00,-30.00,50,25,1,1),(72,4,2,'move',0,3,-238,518,0.00,0.00,0,0,1,1),(73,3,2,'move',0,202,-204,-466,0.00,0.00,0,0,1,1),(74,3,2,'move',0,3,-201,-467,0.00,0.00,0,0,1,1),(75,2,2,'turn',0,0,-324,-585,16.84,16.84,21,28,1,1),(76,2,2,'move',0,231,-94,-566,0.00,0.00,0,0,1,1),(77,5,2,'move',0,155,279,-203,0.00,0.00,0,0,1,1),(78,5,2,'turn',0,0,279,-203,9.90,9.90,20,0,1,1),(79,6,2,'turn',0,0,331,406,9.51,9.51,10,28,1,1),(80,6,2,'move',0,155,190,342,0.00,0.00,0,0,1,1),(81,6,2,'turn',0,0,190,342,20.64,20.64,42,0,1,1),(82,8,2,'turn',0,0,664,69,30.00,30.00,30,66,1,1),(83,8,2,'move',0,66,604,42,0.00,0.00,0,0,1,1),(84,8,2,'turn',0,0,604,42,30.00,30.00,30,66,1,1),(85,8,2,'move',0,99,546,-38,0.00,0.00,0,0,1,1),(86,7,2,'turn',0,0,217,-505,-45.00,-45.00,45,59,1,1),(87,7,2,'move',0,59,161,-488,0.00,0.00,0,0,1,1),(88,7,2,'turn',0,0,161,-488,-35.00,-35.00,35,46,1,1),(89,7,2,'move',0,126,83,-389,0.00,0.00,0,0,1,1),(90,18,2,'move',0,125,217,354,204.41,204.41,0,0,0,1),(91,17,2,'move',0,125,308,-211,165.07,165.07,0,0,0,1),(92,19,2,'move',0,175,530,-43,219.95,219.95,0,0,0,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `damages`
--

LOCK TABLES `damages` WRITE;
/*!40000 ALTER TABLE `damages` DISABLE KEYS */;
INSERT INTO `damages` VALUES (1,4,2,1,7,1,1,0,'Beam',194,0,18,0,46,0,18,0,'p;',0),(2,4,2,1,7,1,1,0,'Beam',194,0,18,0,46,0,18,0,'p;',0),(3,1,2,1,7,1,1,0,'Beam',211,0,17,0,53,0,17,0,'p;',0),(4,2,2,1,7,5,1,0,'Particle',32,0,17,15,0,0,17,0,'p;',0),(5,1,2,1,29,29,1,0,'Beam',211,0,14,56,0,0,14,0,'p;',0),(6,3,2,1,29,29,1,0,'Particle',36,0,13,23,0,0,13,0,'p;',0),(7,4,2,1,36,36,1,0,'Beam',194,0,14,50,0,0,14,0,'p;',0),(8,1,2,1,36,36,1,0,'Beam',211,0,13,57,0,0,13,0,'p;',0);
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fireorders`
--

LOCK TABLES `fireorders` WRITE;
/*!40000 ALTER TABLE `fireorders` DISABLE KEYS */;
INSERT INTO `fireorders` VALUES (1,2,1,6,1,-453,46,13,1,42,'28;',1,1),(2,2,1,5,1,-447,41,7,2,63,'-86;43;',1,1),(3,2,1,5,1,-447,41,11,2,63,'33;-48;',1,1),(4,2,1,5,1,-447,41,20,1,100,'19;',1,1),(5,2,2,6,0,331,406,9,0,0,'',0,2),(6,2,2,5,0,421,-250,9,0,0,'',0,2),(7,2,2,8,2,-319,-582,10,4,0,'',0,2),(8,2,2,8,2,-319,-582,12,4,0,'',0,2);
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `games`
--

LOCK TABLES `games` WRITE;
/*!40000 ALTER TABLE `games` DISABLE KEYS */;
INSERT INTO `games` VALUES (2,'myGame','active',2,2,3500,1500,11,3,10,10,5,3,75,150);
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
INSERT INTO `globals` VALUES (1,2,0,0,'Morale',0,100.00,'',''),(2,3,0,0,'Morale',0,100.00,'','');
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
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loads`
--

LOCK TABLES `loads` WRITE;
/*!40000 ALTER TABLE `loads` DISABLE KEYS */;
INSERT INTO `loads` VALUES (1,1,2,'Command',1),(2,1,21,'Zorth',12),(3,1,34,'Ullt',20),(4,1,35,'Ullt',20),(5,2,2,'Sensor',1),(6,3,2,'Engine',1),(7,4,2,'Command',1),(8,4,2,'Sensor',1),(9,5,2,'Command',1),(10,5,2,'Sensor',1),(13,8,2,'Sensor',1),(14,8,10,'Naga',16),(15,8,12,'Naga',16),(16,8,17,'Naga',20),(17,8,19,'Naga',16);
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `missions`
--

LOCK TABLES `missions` WRITE;
/*!40000 ALTER TABLE `missions` DISABLE KEYS */;
INSERT INTO `missions` VALUES (1,17,'2',2,-1,5,279,-203,0),(2,18,'2',2,-1,6,190,342,0),(3,-22,'2',2,-1,5,279,-203,0),(4,-3,'2',2,-1,6,190,342,0),(5,19,'2',2,-1,2,-324,-585,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playerstatus`
--

LOCK TABLES `playerstatus` WRITE;
/*!40000 ALTER TABLE `playerstatus` DISABLE KEYS */;
INSERT INTO `playerstatus` VALUES (2,1,2,2,2,'Vree Conglomerate',3286,1520,1764,441,882,'waiting'),(3,2,2,2,2,'Earth Alliance',2691,1501,1616,404,808,'waiting');
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
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `powers`
--

LOCK TABLES `powers` WRITE;
/*!40000 ALTER TABLE `powers` DISABLE KEYS */;
INSERT INTO `powers` VALUES (1,1,8,1,'0',0),(2,1,12,1,'0',0),(3,1,14,1,'0',0),(4,1,18,1,'0',0),(5,1,24,1,'0',0),(6,1,28,1,'0',0),(7,1,4,1,'1',4),(8,1,4,1,'1',6),(9,1,4,1,'1',7),(10,4,9,1,'0',0),(11,4,13,1,'0',0),(12,4,17,1,'0',0),(13,4,21,1,'0',0),(14,4,4,1,'1',4),(15,4,4,1,'1',6),(16,6,13,1,'1',4),(17,6,14,1,'-1',0),(18,6,15,1,'-1',0),(19,6,17,1,'0',0),(20,6,18,1,'0',0),(21,6,21,1,'-1',0),(22,6,22,1,'-1',0),(23,6,4,1,'1',4),(24,6,4,1,'1',6),(25,5,6,1,'1',4),(26,5,13,1,'1',4),(27,5,14,1,'-1',0),(28,5,14,1,'0',0),(29,5,15,1,'-1',0),(30,5,15,1,'0',0),(31,5,17,1,'0',0),(32,5,18,1,'0',0),(33,5,20,1,'1',4),(34,5,21,1,'-1',0),(35,5,21,1,'0',0),(36,5,22,1,'-1',0),(37,5,22,1,'0',0),(38,5,4,1,'1',4),(39,5,4,1,'1',6),(40,8,11,1,'-1',0),(41,8,14,1,'-1',0),(42,8,15,1,'-1',0),(43,8,18,1,'-1',0),(44,7,7,1,'-1',0),(45,7,8,1,'-1',0),(46,7,9,1,'-1',0),(47,7,10,1,'-1',0),(48,7,13,1,'-1',0),(49,7,14,1,'-1',0),(50,7,15,1,'-1',0),(51,7,16,1,'-1',0),(52,6,14,2,'-1',0),(53,6,15,2,'-1',0),(54,6,19,2,'1',4),(55,6,21,2,'-1',0),(56,6,22,2,'-1',0),(57,5,6,2,'1',4),(58,5,12,2,'1',4),(59,5,13,2,'1',4),(60,5,14,2,'-1',0),(61,5,15,2,'-1',0),(62,5,17,2,'0',0),(63,5,18,2,'0',0),(64,5,21,2,'-1',0),(65,5,22,2,'-1',0),(66,5,4,2,'1',4),(67,8,10,2,'1',0),(68,8,10,2,'1',0),(69,8,10,2,'1',0),(70,8,10,2,'1',0),(71,8,11,2,'-1',0),(72,8,12,2,'1',0),(73,8,12,2,'1',0),(74,8,12,2,'1',0),(75,8,12,2,'1',0),(76,8,14,2,'-1',0),(77,8,15,2,'-1',0),(78,8,18,2,'-1',0),(79,7,7,2,'-1',0),(80,7,8,2,'-1',0),(81,7,9,2,'-1',0),(82,7,10,2,'-1',0),(83,7,13,2,'-1',0),(84,7,14,2,'-1',0),(85,7,15,2,'-1',0),(86,7,16,2,'-1',0),(87,4,13,2,'0',0),(88,4,17,2,'0',0),(89,4,21,2,'0',0),(90,4,6,2,'1',8);
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
INSERT INTO `sensors` VALUES (1,1,4,1,359.60,994,1),(2,4,4,1,359.13,855,1),(3,3,4,1,-1.00,95,0),(4,2,3,1,-1.00,86,0),(5,6,4,1,8.65,963,0),(6,5,4,1,0.90,952,0),(7,8,4,1,-1.00,106,0),(8,7,3,1,-1.00,73,0),(9,6,4,2,342.98,646,0),(10,5,4,2,33.11,640,0),(11,8,4,2,-1.00,106,0),(12,7,3,2,83.29,304,1),(13,1,4,2,39.56,722,0),(14,4,4,2,340.71,552,1),(15,3,4,2,15.47,346,0),(16,2,3,2,0.44,250,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subunits`
--

LOCK TABLES `subunits` WRITE;
/*!40000 ALTER TABLE `subunits` DISABLE KEYS */;
INSERT INTO `subunits` VALUES (1,2,1,'Xorr'),(2,2,1,'Xorr'),(3,7,1,'Crius'),(4,7,1,'Crius'),(5,17,9,'Aurora'),(6,18,9,'Aurora'),(7,19,8,'Naga');
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
INSERT INTO `systemcrits` VALUES (1,1,30,1,'Damage',0,-25.00),(2,1,32,1,'Accuracy',0,-25.00);
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
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `units`
--

LOCK TABLES `units` WRITE;
/*!40000 ALTER TABLE `units` DISABLE KEYS */;
INSERT INTO `units` VALUES (1,2,1,4,'Xonn','Traveller',1537,1343,'bought',1,1,0,0,0,-450,43,25.01,25.01,0,140,0,0,0,1,3,0,''),(2,2,1,3,'Squadron','',585,585,'bought',0,1,0,0,0,-324,-585,348.00,348.00,0,231,0,0,0,1,3,0,''),(3,2,1,4,'Zaatrr','A',455,455,'bought',0,1,0,0,0,-404,-497,348.00,348.00,58,205,0,0,0,1,3,0,''),(4,2,1,4,'Xill','B',903,903,'bought',0,1,0,0,0,-293,375,4.07,4.07,0,155,0,0,0,1,3,0,''),(5,2,2,4,'Hyperion','A',1155,903,'bought',1,1,0,0,0,429,-243,165.12,165.12,18,155,0,0,0,1,3,0,''),(6,2,2,4,'Hyperion','B',1027,775,'bought',0,1,0,0,0,331,406,194.94,194.94,0,155,0,0,0,1,3,0,''),(7,2,2,3,'Squadron','Sharks',580,580,'bought',0,1,0,0,0,217,-505,208.00,208.00,0,185,0,0,0,1,3,0,''),(8,2,2,4,'Saggitarius','',737,433,'bought',0,1,0,0,0,664,69,174.14,174.14,0,165,0,0,0,1,3,0,''),(9,2,0,0,'NebulaCloud','',0,0,'deployed',0,0,0,0,0,152,-433,0.00,0.00,0,0,0,0,0,1,-1,0,'112;24;233;3'),(10,2,0,0,'NebulaCloud','',0,0,'deployed',0,0,0,0,0,-182,-13,0.00,0.00,0,0,0,0,0,1,-1,0,'94;22;166;2'),(11,2,0,0,'NebulaCloud','',0,0,'deployed',0,0,0,0,0,-180,388,0.00,0.00,0,0,0,0,0,1,-1,0,'80;21;222;2'),(12,2,0,0,'AsteroidField','',0,0,'deployed',0,0,0,0,0,-576,100,0.00,0.00,0,0,0,0,0,1,-1,0,'0;20;159;46;138;3;30'),(13,2,0,0,'AsteroidField','',0,0,'deployed',0,0,0,0,0,288,-392,0.00,0.00,0,0,0,0,0,1,-1,0,'0;25;35;53;212;5;48'),(14,2,0,0,'AsteroidField','',0,0,'deployed',0,0,0,0,0,-630,-225,0.00,0.00,0,0,0,0,0,1,-1,0,'0;25;115;41;164;5;48'),(15,2,0,0,'AsteroidField','',0,0,'deployed',0,0,0,0,0,262,149,0.00,0.00,0,0,0,0,0,1,-1,0,'0;15;137;59;177;4;39'),(16,2,0,0,'AsteroidField','',0,0,'deployed',0,0,0,0,0,49,-10,0.00,0.00,0,0,0,0,0,1,-1,0,'0;15;261;53;265;3;30'),(17,2,2,2,'Flight','Onslaught-Phi',252,252,'deployed',0,2,0,0,0,429,-243,0.00,0.00,0,125,0,0,0,2,-1,0,''),(18,2,2,2,'Flight','Phoenix-Sigma',252,252,'deployed',0,2,0,0,0,331,406,0.00,0.00,0,125,0,0,0,2,-1,0,''),(19,2,2,1,'Salvo','',0,0,'deployed',0,2,0,0,0,664,69,213.50,213.50,0,0,0,0,0,2,-1,0,'');
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

-- Dump completed on 2019-01-20 20:41:27

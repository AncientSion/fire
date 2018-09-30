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
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actions`
--

LOCK TABLES `actions` WRITE;
/*!40000 ALTER TABLE `actions` DISABLE KEYS */;
INSERT INTO `actions` VALUES (1,3,1,'deploy',0,0,484,-366,180.00,0,0,1,1),(2,4,1,'deploy',0,0,578,-255,180.00,0,0,1,1),(3,5,1,'deploy',0,0,567,-125,180.00,0,0,1,1),(4,1,1,'deploy',0,0,-461,-353,0.00,0,0,1,1),(5,2,1,'deploy',0,0,-621,-197,0.00,0,0,1,1),(6,1,1,'jumpIn',0,0,-461,-353,0.00,0,0,0,1),(7,2,1,'jumpIn',0,0,-621,-197,0.00,0,0,0,1),(8,3,1,'jumpIn',0,0,484,-366,0.00,0,0,0,1),(9,4,1,'jumpIn',0,0,578,-255,0.00,0,0,0,1),(10,5,1,'jumpIn',0,0,567,-125,0.00,0,0,0,1),(11,1,1,'move',0,155,-306,-353,0.00,0,0,1,1),(12,2,1,'move',0,185,-436,-197,0.00,0,0,1,1),(13,3,1,'move',0,155,329,-366,0.00,0,0,1,1),(14,4,1,'move',0,165,413,-255,0.00,0,0,1,1),(15,5,1,'move',0,185,382,-125,0.00,0,0,1,1),(16,11,4,'deploy',0,0,-661,-528,0.00,0,0,1,1),(17,12,4,'deploy',0,0,-711,-213,0.00,0,0,1,1),(18,16,4,'deploy',0,0,854,-274,0.00,0,0,1,1),(19,3,2,'speed',0,-1,329,-366,0.00,30,0,1,1),(20,3,2,'speed',0,-1,329,-366,0.00,28,0,1,1),(21,3,2,'move',0,117,212,-366,0.00,0,0,1,1),(22,4,2,'speed',0,-1,413,-255,0.00,30,0,1,1),(23,4,2,'speed',0,-1,413,-255,0.00,28,0,1,1),(24,4,2,'move',0,125,288,-255,0.00,0,0,1,1),(25,5,2,'speed',0,-1,382,-125,0.00,30,0,1,1),(26,5,2,'move',0,162,220,-125,0.00,0,0,1,1),(27,1,2,'speed',0,-1,-306,-353,0.00,30,0,1,1),(28,1,2,'move',0,136,-170,-353,0.00,0,0,1,1),(29,2,2,'speed',0,-1,-436,-197,0.00,30,0,1,1),(30,2,2,'speed',0,-1,-436,-197,0.00,28,0,1,1),(31,2,2,'move',0,139,-297,-197,0.00,0,0,1,1),(32,3,2,'jumpOut',1,117,212,-366,0.00,0,0,1,1),(33,2,2,'jumpOut',0,0,-297,-197,0.00,0,0,1,0),(34,1,3,'move',0,136,-34,-353,0.00,0,0,1,1),(35,4,3,'move',0,125,163,-255,0.00,0,0,1,1),(36,5,3,'move',0,162,58,-125,0.00,0,0,1,1),(37,11,4,'jumpIn',0,176,-817,-609,21.00,0,0,0,1),(38,12,4,'jumpIn',0,62,-705,-152,-14.00,0,0,0,1),(39,16,4,'jumpIn',0,59,796,-266,-5.00,0,0,0,1),(40,16,4,'move',0,140,935,-278,0.00,0,0,1,1),(41,4,4,'move',0,125,38,-255,0.00,0,0,1,1),(42,5,4,'move',0,162,-104,-125,0.00,0,0,1,1),(43,1,4,'move',0,136,102,-353,0.00,0,0,1,1),(44,12,4,'move',0,165,-545,-192,0.00,0,0,1,1),(45,11,4,'move',0,185,-644,-543,0.00,0,0,1,1),(46,1,5,'move',0,136,238,-353,0.00,0,0,1,0),(47,12,5,'move',0,165,-385,-232,0.00,0,0,1,0),(48,11,5,'move',0,185,-471,-477,0.00,0,0,1,0),(49,20,1,'deploy',0,0,521,-242,180.00,0,0,1,1),(50,21,1,'deploy',0,0,548,199,180.00,0,0,1,1),(51,23,1,'deploy',0,0,429,371,180.00,0,0,1,1),(52,22,1,'deploy',0,0,514,-515,180.00,0,0,1,1),(53,17,1,'deploy',0,0,-573,-5,0.00,0,0,1,1),(54,18,1,'deploy',0,0,-555,-245,0.00,0,0,1,1),(55,19,1,'deploy',0,0,-433,371,0.00,0,0,1,1),(56,17,1,'jumpIn',0,0,-573,-5,0.00,0,0,0,1),(57,18,1,'jumpIn',0,0,-555,-245,0.00,0,0,0,1),(58,19,1,'jumpIn',0,0,-433,371,0.00,0,0,0,1),(59,20,1,'jumpIn',0,0,521,-242,0.00,0,0,0,1),(60,21,1,'jumpIn',0,0,548,199,0.00,0,0,0,1),(61,22,1,'jumpIn',0,0,514,-515,0.00,0,0,0,1),(62,23,1,'jumpIn',0,0,429,371,0.00,0,0,0,1),(63,17,1,'move',0,140,-433,-5,0.00,0,0,1,1),(64,17,1,'turn',0,0,-433,-5,-14.52,30,0,1,1),(65,18,1,'move',0,165,-390,-245,0.00,0,0,1,1),(66,19,1,'turn',0,0,-433,371,-9.48,10,14,1,1),(67,19,1,'move',0,185,-251,341,0.00,0,0,1,1),(68,19,1,'turn',0,0,-251,341,-0.99,2,0,1,1),(69,20,1,'move',0,155,366,-242,0.00,0,0,1,1),(70,20,1,'turn',0,0,366,-242,-14.92,30,0,1,1),(71,21,1,'move',0,155,393,199,0.00,0,0,1,1),(72,21,1,'turn',0,0,393,199,11.81,24,0,1,1),(73,23,1,'move',0,165,264,371,0.00,0,0,1,1),(74,22,1,'turn',0,0,514,-515,-30.00,30,53,1,1),(75,22,1,'move',0,165,371,-432,0.00,0,0,1,1),(76,22,1,'turn',0,0,371,-432,17.85,36,0,1,1),(77,17,2,'move',0,140,-297,-40,0.00,0,0,1,0),(78,18,2,'turn',0,0,-390,-245,-30.00,30,65,1,0),(79,18,2,'move',0,165,-247,-327,0.00,0,0,1,0),(80,18,2,'turn',0,0,-247,-327,26.85,54,0,1,0),(81,19,2,'turn',0,0,-251,341,36.44,37,51,1,0),(82,19,2,'move',0,185,-85,422,0.00,0,0,1,0),(83,19,2,'turn',0,0,-85,422,-45.00,53,52,1,0),(84,24,2,'deploy',0,0,-433,-5,0.00,1,0,1,1),(85,20,2,'move',0,155,216,-202,0.00,0,0,1,0),(86,21,2,'turn',0,0,393,199,30.00,30,86,1,0),(87,21,2,'move',0,86,329,142,0.00,0,0,1,0),(88,21,2,'turn',0,0,329,142,12.78,13,37,1,0),(89,21,2,'move',0,69,289,86,0.00,0,0,1,0),(90,23,2,'turn',0,0,264,371,30.00,30,60,1,0),(91,23,2,'move',0,60,212,341,0.00,0,0,1,0),(92,23,2,'turn',0,0,212,341,30.00,30,60,1,0),(93,23,2,'move',0,105,159,250,0.00,0,0,1,0),(94,22,2,'turn',0,0,371,-432,30.00,30,53,1,0),(95,22,2,'move',0,165,214,-483,0.00,0,0,1,0),(96,22,2,'turn',0,0,214,-483,-30.00,50,18,1,0),(97,25,2,'deploy',0,0,393,199,0.00,1,0,1,1),(98,26,2,'deploy',0,0,366,-242,0.00,1,0,1,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=132 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `damages`
--

LOCK TABLES `damages` WRITE;
/*!40000 ALTER TABLE `damages` DISABLE KEYS */;
INSERT INTO `damages` VALUES (1,1,1,5,10,10,4,0,'Pulse',179,0,122,0,146,0,11,0,'p;v4;',0),(95,28,2,17,6,1,1,0,'Laser',173,0,25,0,32,0,25,0,'p;',0),(96,28,2,17,6,1,1,0,'Laser',173,0,25,0,32,0,25,0,'p;',0),(97,23,2,17,6,1,1,0,'Particle',36,0,12,0,24,0,24,0,'p;',0),(98,24,2,17,6,1,1,0,'Particle',36,0,12,0,24,0,24,0,'p;',0),(99,26,2,17,6,1,1,0,'Particle',36,0,12,0,24,0,24,0,'p;',0),(100,27,2,17,6,1,1,0,'Particle',36,0,12,0,24,0,24,0,'p;',0),(101,24,2,17,6,5,1,0,'Particle',36,0,12,20,4,0,24,0,'p;c;',0),(102,25,2,17,6,7,1,0,'Laser',170,0,12,24,20,0,12,1,'p;o3;',0),(103,25,2,17,6,8,1,0,'Laser',170,0,16,40,0,0,16,0,'p;',0),(104,23,2,17,6,8,1,0,'Particle',36,0,8,22,6,0,15,1,'p;o14;',0),(105,25,2,17,6,10,1,0,'Laser',170,0,16,40,0,0,16,1,'p;o2;',0),(106,28,2,17,6,12,1,0,'Laser',173,0,15,40,2,0,15,1,'p;o2;',0),(107,32,2,18,6,1,1,0,'Laser',75,0,20,0,5,0,20,0,'p;',0),(108,32,2,18,6,1,1,0,'Laser',75,0,19,0,6,0,19,0,'p;',0),(109,32,2,18,6,7,1,0,'Laser',75,0,12,13,0,0,12,0,'p;',0),(110,31,2,19,14,4,1,0,'Particle',36,0,7,0,29,0,13,0,'p;',0),(111,2,2,20,6,1,1,0,'Laser',394,0,19,0,79,0,19,0,'p;',0),(112,2,2,20,6,1,1,0,'Laser',394,0,18,0,80,0,18,0,'p;',0),(113,7,2,20,6,1,1,0,'Laser',91,0,18,0,27,0,18,0,'p;',0),(114,11,2,20,6,1,1,0,'Laser',96,0,17,0,31,0,17,0,'p;',0),(115,14,2,20,6,1,1,0,'Laser',116,0,16,0,42,0,16,0,'p;',0),(116,16,2,20,6,1,1,0,'Laser',104,0,15,0,37,0,15,0,'p;',0),(117,4,2,20,6,1,1,0,'Particle',34,0,15,0,19,0,15,0,'p;',0),(118,6,2,20,6,1,1,0,'Particle',37,0,14,0,23,0,14,0,'p;',0),(119,10,2,20,6,4,1,0,'Laser',97,0,17,20,11,0,17,0,'p;c;',0),(120,16,2,20,6,4,1,0,'Laser',104,0,15,20,17,0,15,0,'p;c;',0),(121,11,2,20,6,5,1,0,'Laser',96,0,16,20,12,0,16,0,'p;c;',0),(122,14,2,20,6,8,1,0,'Laser',116,0,7,40,11,0,7,1,'p;o4;',0),(124,7,2,20,6,10,1,0,'Laser',91,0,8,37,0,0,8,0,'p;',0),(125,10,2,20,6,10,1,0,'Laser',97,0,8,3,37,0,8,1,'p;o4;',0),(126,2,2,20,6,11,1,0,'Laser',394,0,11,44,43,0,11,1,'p;o3;',0),(127,18,2,21,6,1,1,0,'Particle',37,0,19,0,18,0,19,0,'p;',0),(128,21,2,21,6,1,1,0,'Particle',37,0,18,0,19,0,18,0,'p;',0),(129,17,2,21,6,4,1,0,'Particle',40,0,19,20,1,0,19,0,'p;c;',0),(130,19,2,21,6,11,1,0,'Particle',36,0,11,25,0,0,11,0,'p;',0),(131,22,2,21,6,11,1,0,'Particle',41,0,11,19,11,0,11,1,'p;o3;',0);
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
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fireorders`
--

LOCK TABLES `fireorders` WRITE;
/*!40000 ALTER TABLE `fireorders` DISABLE KEYS */;
INSERT INTO `fireorders` VALUES (1,1,4,12,5,-103,-131,8,1,129,'84;',1,1),(2,2,1,17,20,368,-250,8,1,92,'58;',1,1),(3,2,1,17,20,368,-250,10,1,33,'76;',0,1),(4,2,1,17,20,368,-250,11,1,33,'24;',1,1),(5,2,1,17,20,368,-250,12,1,33,'77;',0,1),(6,2,1,17,20,368,-250,13,1,33,'29;',1,1),(7,2,1,17,20,368,-250,15,1,83,'71;',1,1),(8,2,1,17,20,368,-250,16,1,83,'89;',0,1),(9,2,1,17,20,368,-250,24,1,33,'46;',0,1),(10,2,1,17,20,368,-250,32,1,83,'68;',1,1),(11,2,1,17,20,368,-250,33,1,83,'17;',1,1),(12,2,1,18,20,365,-244,7,1,38,'40;',0,1),(13,2,1,18,20,365,-244,9,1,38,'65;',0,1),(14,2,1,18,20,365,-244,11,1,83,'55;',1,1),(15,2,1,18,20,365,-244,12,1,38,'89;',0,1),(16,2,1,18,20,365,-244,16,1,83,'10;',1,1),(17,2,1,19,21,395,192,5,1,47,'45;',1,1),(18,2,1,19,21,395,192,6,1,47,'13;',1,1),(19,2,1,19,21,395,192,10,1,47,'1;',1,1),(20,2,1,19,21,395,192,11,1,47,'77;',0,1),(21,2,1,19,21,395,192,15,1,47,'40;',1,1),(22,2,1,19,21,395,192,16,1,47,'3;',1,1),(23,2,1,20,17,-424,0,7,2,56,'4;46;',2,1),(24,2,1,20,17,-424,0,11,2,56,'42;50;',2,1),(25,2,1,20,17,-424,0,20,1,89,'36;',1,1),(26,2,1,21,17,-435,2,7,2,63,'95;30;',1,1),(27,2,1,21,17,-435,2,11,2,63,'40;98;',1,1),(28,2,1,21,17,-435,2,13,1,97,'94;',1,1),(29,2,1,23,19,-240,340,7,2,37,'83;52;',0,1),(30,2,1,23,17,-425,-6,8,2,35,'56;87;',0,1),(31,2,1,23,19,-240,340,9,2,37,'43;31;',1,1),(32,2,1,22,18,-387,-249,7,1,54,'11;',1,1),(33,2,1,22,18,-387,-249,8,1,54,'65;',0,1),(34,2,2,17,0,262,370,29,0,0,'',0,1),(35,2,2,20,0,-388,-245,9,0,0,'',0,1),(36,2,2,21,0,-393,-251,9,0,0,'',0,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `games`
--

LOCK TABLES `games` WRITE;
/*!40000 ALTER TABLE `games` DISABLE KEYS */;
INSERT INTO `games` VALUES (1,'myGame','active',5,0,3500,1500,2,2,10,10),(2,'myGame','active',2,0,3500,1500,11,3,10,10);
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `globals`
--

LOCK TABLES `globals` WRITE;
/*!40000 ALTER TABLE `globals` DISABLE KEYS */;
INSERT INTO `globals` VALUES (1,1,0,0,'Morale',0,115.00,'',''),(2,2,0,0,'Morale',0,100.00,'',''),(3,2,0,0,'Morale',1,-10.00,'','hyp routed'),(4,1,2,3,'Morale',1,-21.00,'','Squadron #2 withdrawn'),(5,1,0,3,'Morale',2,-15.00,'f;33;15;63;84',''),(6,1,11,4,'Morale',1,22.00,'','Squadron #11 reinforcing'),(7,1,12,4,'Morale',1,15.00,'','Rongoth #12 reinforcing'),(8,2,16,4,'Morale',1,30.00,'','Omega #16 reinforcing'),(9,3,0,0,'Morale',0,100.00,'',''),(10,4,0,0,'Morale',0,100.00,'','');
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
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loads`
--

LOCK TABLES `loads` WRITE;
/*!40000 ALTER TABLE `loads` DISABLE KEYS */;
INSERT INTO `loads` VALUES (6,16,9,'Aurora',24),(7,17,2,'Command',1),(8,17,2,'Sensor',1),(10,18,2,'Command',1),(11,20,2,'Command',1),(12,20,2,'Sensor',1),(14,21,2,'Command',1),(16,22,12,'Needle',10),(17,22,16,'Needle',10),(18,23,2,'Command',1),(19,23,2,'Engine',1),(20,23,2,'Sensor',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `missions`
--

LOCK TABLES `missions` WRITE;
/*!40000 ALTER TABLE `missions` DISABLE KEYS */;
INSERT INTO `missions` VALUES (1,24,'2',2,23,264,371,0),(2,25,'2',2,18,-390,-245,0),(3,26,'2',2,18,-390,-245,0);
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
INSERT INTO `playerstatus` VALUES (1,1,1,5,0,'Narn Regime',1500,2420,1540,385,1540,'ready'),(2,2,1,5,0,'Earth Alliance',1845,2055,0,0,0,'waiting'),(3,1,2,2,0,'Minbari Federation',3271,1525,2292,573,993,'waiting'),(4,2,2,2,0,'Earth Alliance',2782,1598,1616,404,789,'waiting');
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
) ENGINE=InnoDB AUTO_INCREMENT=169 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `powers`
--

LOCK TABLES `powers` WRITE;
/*!40000 ALTER TABLE `powers` DISABLE KEYS */;
INSERT INTO `powers` VALUES (1,3,14,1,'-1',0),(2,3,15,1,'-1',0),(3,3,21,1,'-1',0),(4,3,22,1,'-1',0),(5,4,11,1,'-1',0),(6,4,12,1,'-1',0),(7,4,17,1,'-1',0),(8,4,18,1,'-1',0),(9,5,6,1,'-1',0),(10,5,7,1,'-1',0),(11,5,8,1,'-1',0),(12,5,9,1,'-1',0),(13,5,12,1,'-1',0),(14,5,13,1,'-1',0),(15,5,14,1,'-1',0),(16,5,15,1,'-1',0),(17,1,8,1,'0',0),(18,1,8,2,'0',0),(19,3,14,2,'-1',0),(20,3,15,2,'-1',0),(21,3,21,2,'-1',0),(22,3,22,2,'-1',0),(23,4,11,2,'-1',0),(24,4,12,2,'-1',0),(25,4,17,2,'-1',0),(26,4,18,2,'-1',0),(27,5,6,2,'-1',0),(28,5,7,2,'-1',0),(29,5,8,2,'-1',0),(30,5,9,2,'-1',0),(31,5,12,2,'-1',0),(32,5,13,2,'-1',0),(33,5,14,2,'-1',0),(34,5,15,2,'-1',0),(35,-16,7,2,'-1',0),(36,-16,8,2,'-1',0),(37,-16,10,2,'-1',0),(38,-16,11,2,'-1',0),(39,-16,13,2,'-1',0),(40,-16,14,2,'-1',0),(41,-16,15,2,'-1',0),(42,-16,16,2,'-1',0),(43,-16,17,2,'-1',0),(44,-16,18,2,'-1',0),(45,-16,19,2,'-1',0),(46,-16,20,2,'-1',0),(47,-16,27,2,'-1',0),(48,-16,28,2,'-1',0),(49,-16,29,2,'-1',0),(50,-16,30,2,'-1',0),(51,-16,31,2,'-1',0),(52,-16,32,2,'-1',0),(53,-16,33,2,'-1',0),(54,-16,34,2,'-1',0),(55,3,14,3,'-1',0),(56,3,15,3,'-1',0),(57,3,21,3,'-1',0),(58,3,22,3,'-1',0),(59,4,11,3,'-1',0),(60,4,12,3,'-1',0),(61,4,17,3,'-1',0),(62,4,18,3,'-1',0),(63,5,6,3,'-1',0),(64,5,7,3,'-1',0),(65,5,8,3,'-1',0),(66,5,9,3,'-1',0),(67,5,12,3,'-1',0),(68,5,13,3,'-1',0),(69,5,14,3,'-1',0),(70,5,15,3,'-1',0),(71,1,8,3,'0',0),(72,1,8,4,'0',0),(73,16,7,4,'-1',0),(74,16,8,4,'-1',0),(75,16,10,4,'-1',0),(76,16,11,4,'-1',0),(77,16,13,4,'-1',0),(78,16,14,4,'-1',0),(79,16,15,4,'-1',0),(80,16,16,4,'-1',0),(81,16,17,4,'-1',0),(82,16,18,4,'-1',0),(83,16,19,4,'-1',0),(84,16,20,4,'-1',0),(85,16,27,4,'-1',0),(86,16,28,4,'-1',0),(87,16,29,4,'-1',0),(88,16,30,4,'-1',0),(89,16,31,4,'-1',0),(90,16,32,4,'-1',0),(91,16,33,4,'-1',0),(92,16,34,4,'-1',0),(93,4,11,4,'-1',0),(94,4,12,4,'-1',0),(95,4,17,4,'-1',0),(96,4,18,4,'-1',0),(97,5,6,4,'-1',0),(98,5,7,4,'-1',0),(99,5,8,4,'-1',0),(100,5,9,4,'-1',0),(101,5,12,4,'-1',0),(102,5,13,4,'-1',0),(103,5,14,4,'-1',0),(104,5,15,4,'-1',0),(105,16,7,5,'-1',0),(106,16,8,5,'-1',0),(107,16,10,5,'-1',0),(108,16,11,5,'-1',0),(109,16,13,5,'-1',0),(110,16,14,5,'-1',0),(111,16,15,5,'-1',0),(112,16,16,5,'-1',0),(113,16,17,5,'-1',0),(114,16,18,5,'-1',0),(115,16,19,5,'-1',0),(116,16,20,5,'-1',0),(117,16,27,5,'-1',0),(118,16,28,5,'-1',0),(119,16,29,5,'-1',0),(120,16,30,5,'-1',0),(121,16,31,5,'-1',0),(122,16,32,5,'-1',0),(123,16,33,5,'-1',0),(124,16,34,5,'-1',0),(125,4,11,5,'-1',0),(126,4,12,5,'-1',0),(127,4,17,5,'-1',0),(128,4,18,5,'-1',0),(129,5,6,5,'-1',0),(130,5,7,5,'-1',0),(131,5,8,5,'-1',0),(132,5,9,5,'-1',0),(133,1,8,5,'0',0),(134,20,14,1,'-1',0),(135,20,15,1,'-1',0),(136,20,21,1,'-1',0),(137,20,22,1,'-1',0),(138,21,14,1,'-1',0),(139,21,15,1,'-1',0),(140,21,21,1,'-1',0),(141,21,22,1,'-1',0),(142,23,11,1,'-1',0),(143,23,12,1,'-1',0),(144,23,17,1,'-1',0),(145,23,18,1,'-1',0),(146,22,11,1,'-1',0),(147,22,15,1,'-1',0),(148,17,26,2,'0',0),(149,17,4,2,'1',3),(150,17,4,2,'1',5),(151,20,13,2,'1',4),(152,20,14,2,'-2',0),(153,20,15,2,'-2',0),(154,20,21,2,'-2',0),(155,20,22,2,'-2',0),(156,20,4,2,'1',3),(157,21,14,2,'-2',0),(158,21,15,2,'-2',0),(159,21,20,2,'1',4),(160,21,21,2,'-2',0),(161,21,22,2,'-2',0),(162,23,11,2,'-2',0),(163,23,12,2,'-2',0),(164,23,17,2,'-2',0),(165,23,18,2,'-2',0),(166,23,4,2,'1',3),(167,22,11,2,'-1',0),(168,22,15,2,'-1',0);
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
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sensors`
--

LOCK TABLES `sensors` WRITE;
/*!40000 ALTER TABLE `sensors` DISABLE KEYS */;
INSERT INTO `sensors` VALUES (1,3,4,1,-1.00,102,0),(2,4,4,1,-1.00,95,0),(3,5,2,1,-1.00,73,0),(4,1,4,1,-1.00,113,0),(5,2,2,1,-1.00,73,0),(6,1,4,2,-1.00,113,0),(7,2,2,2,-1.00,73,0),(8,-11,2,2,-1.00,59,0),(9,-12,4,2,-1.00,95,0),(10,3,4,2,-1.00,102,0),(11,4,4,2,-1.00,95,0),(12,5,2,2,-1.00,73,0),(13,-16,4,2,-1.00,117,0),(14,3,4,3,-1.00,102,0),(15,4,4,3,-1.00,95,0),(16,5,2,3,-1.00,73,0),(17,1,4,3,-1.00,113,0),(18,2,2,3,-1.00,73,0),(19,1,4,4,-1.00,113,0),(20,12,4,4,-1.00,95,0),(21,11,2,4,-1.00,59,0),(22,16,4,4,-1.00,117,0),(23,4,4,4,-1.00,95,0),(24,5,2,4,-1.00,73,0),(25,16,4,5,-1.00,117,0),(26,4,4,5,-1.00,95,0),(27,5,2,5,-1.00,73,0),(28,1,4,5,-1.00,113,0),(29,12,4,5,-1.00,95,0),(30,11,2,5,-1.00,59,0),(31,20,4,1,0.00,900,0),(32,21,4,1,0.00,900,0),(33,23,4,1,0.00,900,0),(34,22,4,1,0.00,900,0),(35,17,4,1,0.00,900,0),(36,18,4,1,0.00,900,0),(37,19,2,1,0.00,900,0),(38,17,4,2,14.98,627,1),(39,18,4,2,1.64,532,1),(40,19,2,2,8.51,312,1),(41,20,4,2,18.00,521,0),(42,21,4,2,337.17,657,0),(43,23,4,2,286.37,343,0),(44,22,4,2,-1.00,88,0);
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
INSERT INTO `subunits` VALUES (1,2,1,'Thentus'),(2,2,1,'Thentus'),(3,5,1,'Crius'),(4,5,1,'Crius'),(5,11,1,'Shokos'),(6,11,1,'Shokos'),(7,11,1,'Shokos'),(8,19,1,'Torotha'),(9,19,1,'Torotha'),(10,19,1,'Torotha'),(11,24,6,'Tishat'),(12,25,10,'Aurora'),(13,26,10,'Aurora');
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
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `systemcrits`
--

LOCK TABLES `systemcrits` WRITE;
/*!40000 ALTER TABLE `systemcrits` DISABLE KEYS */;
INSERT INTO `systemcrits` VALUES (1,5,1,4,'',0,0.00),(2,5,10,4,'Disabled',0,0.00),(29,17,5,1,'Overload',0,-10.14),(30,20,2,1,'Morale',-2,-15.00),(31,20,4,1,'Output',0,-15.00),(32,20,5,1,'Overload',0,-6.57),(33,21,4,1,'Output',0,-15.00),(34,21,5,1,'Overload',0,-2.78);
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
  `ship` tinyint(1) DEFAULT '0',
  `ball` tinyint(1) DEFAULT '0',
  `name` varchar(255) DEFAULT '',
  `display` varchar(40) DEFAULT '',
  `totalCost` int(4) NOT NULL DEFAULT '0',
  `moraleCost` int(4) NOT NULL DEFAULT '0',
  `status` varchar(255) DEFAULT '',
  `command` tinyint(4) DEFAULT '0',
  `available` int(3) DEFAULT '0',
  `withdraw` int(2) NOT NULL DEFAULT '0',
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
INSERT INTO `units` VALUES (1,1,1,1,0,'GQuan','',850,850,'bought',1,1,0,0,102,-353,0.00,0,136,0,0,0,4,3,0,''),(2,1,1,1,0,'Squadron','',650,650,'jumpOut',0,1,0,1,-297,-197,0.00,0,139,0,0,0,2,3,0,''),(3,1,2,1,0,'Hyperion','',775,775,'jumpOut',1,1,0,1,212,-366,180.00,0,117,0,0,0,2,3,0,''),(4,1,2,1,0,'Artemis','',490,490,'bought',0,1,0,0,38,-255,180.00,0,125,0,0,0,4,3,0,''),(5,1,2,1,0,'Squadron','',580,580,'bought',0,1,0,0,-104,-125,180.00,0,162,0,0,0,4,3,0,''),(11,1,1,1,0,'Squadron','',660,660,'bought',0,4,0,0,-644,-543,21.00,0,185,0,0,0,4,3,0,''),(12,1,1,1,0,'Rongoth','',420,420,'bought',0,4,0,0,-545,-192,346.00,0,165,0,0,0,4,3,0,''),(16,1,2,1,0,'Omega','',1772,1100,'bought',0,4,0,0,935,-278,355.00,0,140,0,0,0,4,3,0,''),(17,2,1,1,0,'Sharlin','',1880,1676,'bought',1,1,0,0,-433,-5,345.48,0,140,0,0,0,1,3,0,''),(18,2,1,1,0,'Tinashi','',635,635,'bought',0,1,0,0,-390,-245,0.00,0,165,0,0,0,1,3,0,''),(19,2,1,1,0,'Squadron','',960,960,'bought',0,1,0,0,-251,341,349.53,0,185,0,0,0,1,3,0,''),(20,2,2,1,0,'Hyperion','',1183,903,'bought',1,1,0,0,366,-242,165.08,0,155,0,0,0,1,3,0,''),(21,2,2,1,0,'Hyperion','',1119,839,'bought',0,1,0,0,393,199,191.81,0,155,0,0,0,1,3,0,''),(22,2,2,1,0,'Olympus','',490,430,'bought',0,1,0,0,371,-432,167.85,0,165,0,0,0,1,3,0,''),(23,2,2,1,0,'Artemis','',610,610,'bought',0,1,0,0,264,371,180.00,0,165,0,0,0,1,3,0,''),(24,2,1,0,0,'Flight','',204,204,'deployed',0,2,0,0,-433,-5,0.00,0,0,0,0,0,2,-1,0,''),(25,2,2,0,0,'Flight','',280,280,'deployed',0,2,0,0,393,199,0.00,0,100,0,0,0,2,-1,0,''),(26,2,2,0,0,'Flight','',280,280,'deployed',0,2,0,0,366,-242,0.00,0,100,0,0,0,2,-1,0,'');
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

-- Dump completed on 2018-09-30 20:35:07

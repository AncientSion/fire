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
) ENGINE=InnoDB AUTO_INCREMENT=260 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actions`
--

LOCK TABLES `actions` WRITE;
/*!40000 ALTER TABLE `actions` DISABLE KEYS */;
INSERT INTO `actions` VALUES (1,1,1,'deploy',0,0,-568,-117,0.00,0,0,1,1),(2,2,1,'deploy',0,0,629,-64,180.00,0,0,1,1),(3,1,1,'jumpIn',0,0,-568,-117,0.00,0,0,0,1),(4,2,1,'jumpIn',0,0,629,-64,0.00,0,0,0,1),(5,2,1,'move',0,155,474,-64,0.00,0,0,1,1),(6,1,1,'move',0,185,-383,-117,0.00,0,0,1,1),(7,10,1,'move',0,20,138,-309,0.00,0,0,0,1),(8,9,1,'move',0,33,-169,-430,0.00,0,0,0,1),(9,8,1,'move',0,55,-324,219,0.00,0,0,0,1),(10,7,1,'move',0,60,200,-351,0.00,0,0,0,1),(11,6,1,'move',0,13,-106,369,0.00,0,0,0,1),(12,5,1,'move',0,19,228,-179,0.00,0,0,0,1),(13,4,1,'move',0,57,-289,-376,0.00,0,0,0,1),(14,3,1,'move',0,41,184,128,0.00,0,0,0,1),(15,2,2,'move',0,155,319,-64,0.00,0,0,1,1),(16,1,2,'move',0,185,-198,-117,0.00,0,0,1,1),(17,10,2,'move',0,20,119,-316,0.00,0,0,0,1),(18,9,2,'move',0,33,-186,-401,0.00,0,0,0,1),(19,8,2,'move',0,55,-316,273,0.00,0,0,0,1),(20,7,2,'move',0,60,140,-350,0.00,0,0,0,1),(21,6,2,'move',0,13,-102,357,0.00,0,0,0,1),(22,5,2,'move',0,19,225,-160,0.00,0,0,0,1),(23,4,2,'move',0,57,-235,-357,0.00,0,0,0,1),(24,3,2,'move',0,41,150,104,0.00,0,0,0,1),(25,12,1,'deploy',0,0,428,-362,180.00,0,0,1,1),(26,11,1,'deploy',0,0,-616,18,0.00,0,0,1,1),(27,11,1,'jumpIn',0,0,-616,18,0.00,0,0,0,1),(28,12,1,'jumpIn',0,0,428,-362,0.00,0,0,0,1),(29,11,1,'move',0,140,-476,18,0.00,0,0,1,1),(30,12,1,'move',0,185,243,-362,0.00,0,0,1,1),(31,13,2,'move',0,42,78,-322,0.00,0,0,0,1),(32,14,2,'move',0,43,-375,-406,0.00,0,0,0,1),(33,15,2,'move',0,76,47,417,0.00,0,0,0,1),(34,16,2,'move',0,28,128,150,0.00,0,0,0,1),(35,13,2,'move',0,42,78,-322,0.00,0,0,0,1),(36,14,2,'move',0,43,-375,-406,0.00,0,0,0,1),(37,15,2,'move',0,76,47,417,0.00,0,0,0,1),(38,16,2,'move',0,28,128,150,0.00,0,0,0,1),(39,12,2,'turn',0,0,243,-362,-15.77,16,21,1,1),(40,12,2,'move',0,185,65,-312,0.00,0,0,1,1),(41,11,2,'move',0,140,-336,18,0.00,0,0,1,1),(42,13,3,'move',0,42,37,-331,0.00,0,0,0,1),(43,14,3,'move',0,43,-403,-438,0.00,0,0,0,1),(44,15,3,'move',0,76,-11,368,0.00,0,0,0,1),(45,16,3,'move',0,28,114,126,0.00,0,0,0,1),(46,11,3,'turn',0,0,-336,18,-30.00,30,111,1,0),(47,11,3,'move',0,140,-215,-52,0.00,0,0,1,0),(48,18,1,'deploy',0,0,599,-37,180.00,0,0,1,1),(49,17,1,'deploy',0,0,-507,387,0.00,0,0,1,1),(50,17,1,'jumpIn',0,0,-507,387,0.00,0,0,0,1),(51,18,1,'jumpIn',0,0,599,-37,0.00,0,0,0,1),(52,17,1,'move',0,155,-352,387,0.00,0,0,1,1),(53,18,1,'turn',0,0,599,-37,2.05,3,8,1,1),(54,18,1,'move',0,140,459,-42,0.00,0,0,1,1),(55,19,2,'move',0,51,-345,-294,0.00,0,0,0,1),(56,20,2,'move',0,21,-216,427,0.00,0,0,0,1),(57,21,2,'move',0,13,303,-157,0.00,0,0,0,1),(58,22,2,'move',0,30,-100,-210,0.00,0,0,0,1),(59,24,1,'deploy',0,0,694,142,180.00,0,0,1,1),(60,23,1,'deploy',0,0,-541,157,0.00,0,0,1,1),(61,23,1,'jumpIn',0,0,-541,157,0.00,0,0,0,1),(62,24,1,'jumpIn',0,0,694,142,0.00,0,0,0,1),(63,23,1,'move',0,165,-376,157,0.00,0,0,1,1),(64,24,1,'move',0,165,529,142,0.00,0,0,1,1),(65,25,2,'move',0,21,288,252,0.00,0,0,0,1),(66,26,2,'move',0,61,-135,201,0.00,0,0,0,1),(67,27,2,'move',0,20,212,361,0.00,0,0,0,1),(68,28,2,'move',0,23,258,-350,0.00,0,0,0,1),(69,23,2,'speed',0,1,-376,157,0.00,24,0,1,1),(70,23,2,'speed',0,1,-376,157,0.00,24,0,1,1),(71,23,2,'move',0,205,-171,157,0.00,0,0,1,1),(72,24,2,'turn',0,0,529,142,-20.67,21,44,1,1),(73,24,2,'move',0,165,375,200,0.00,0,0,1,1),(74,25,3,'move',0,21,306,241,0.00,0,0,0,1),(75,26,3,'move',0,61,-74,207,0.00,0,0,0,1),(76,27,3,'move',0,20,212,341,0.00,0,0,0,1),(77,28,3,'move',0,23,239,-363,0.00,0,0,0,1),(78,23,3,'move',0,205,34,157,0.00,0,0,1,1),(79,24,3,'turn',0,0,375,200,30.00,30,63,1,1),(80,24,3,'move',0,165,212,173,0.00,0,0,1,1),(81,25,4,'move',0,21,324,230,0.00,0,0,0,1),(82,26,4,'move',0,61,-13,213,0.00,0,0,0,1),(83,27,4,'move',0,20,212,321,0.00,0,0,0,1),(84,28,4,'move',0,23,220,-376,0.00,0,0,0,1),(85,23,4,'move',0,124,154,125,0.00,0,0,1,1),(86,23,4,'turn',0,0,154,125,30.00,38,66,1,1),(87,23,4,'move',0,81,224,166,0.00,0,0,1,1),(88,23,4,'turn',0,0,224,166,30.00,65,20,1,1),(89,24,4,'move',0,85,134,138,0.00,0,0,1,1),(90,24,4,'turn',0,0,134,138,-30.00,30,63,1,1),(91,24,4,'move',0,80,59,166,0.00,0,0,1,1),(92,24,4,'turn',0,0,59,166,-30.00,55,11,1,1),(93,34,1,'deploy',0,0,474,-357,159.96,0,0,1,1),(94,33,1,'deploy',0,0,435,543,202.75,0,0,1,1),(95,32,1,'deploy',0,0,431,643,204.52,0,0,1,1),(96,35,1,'deploy',0,0,532,-251,180.00,0,0,1,1),(97,29,1,'deploy',0,0,-432,366,345.84,0,0,1,1),(98,30,1,'deploy',0,0,-438,-433,0.00,0,0,1,1),(99,31,1,'deploy',0,0,-558,154,0.00,0,0,1,1),(100,29,1,'jumpIn',0,0,-432,366,0.00,0,0,0,1),(101,31,1,'jumpIn',0,0,-558,154,0.00,0,0,0,1),(102,30,1,'jumpIn',0,0,-438,-433,0.00,0,0,0,1),(103,33,1,'jumpIn',0,0,435,543,0.00,0,0,0,1),(104,35,1,'jumpIn',0,0,532,-251,0.00,0,0,0,1),(105,32,1,'jumpIn',0,0,431,643,0.00,0,0,0,1),(106,34,1,'jumpIn',0,0,474,-357,0.00,0,0,0,1),(107,29,1,'turn',0,0,-432,366,27.90,28,103,1,1),(108,29,1,'move',0,140,-296,399,0.00,0,0,1,1),(109,30,1,'turn',0,0,-438,-433,23.54,24,31,1,1),(110,30,1,'move',0,185,-268,-359,0.00,0,0,1,1),(111,30,1,'turn',0,0,-268,-359,-45.00,90,0,1,1),(112,31,1,'turn',0,0,-558,154,-45.00,45,54,1,1),(113,31,1,'move',0,54,-520,116,0.00,0,0,1,1),(114,31,1,'turn',0,0,-520,116,-45.00,45,54,1,1),(115,31,1,'move',0,131,-520,-15,0.00,0,0,1,1),(116,34,1,'speed',0,1,474,-357,0.00,30,0,1,1),(117,34,1,'move',0,173,301,-339,0.00,0,0,1,1),(118,34,1,'turn',0,0,301,-339,-27.03,43,59,1,1),(119,34,1,'move',0,1,300,-338,0.00,0,0,1,1),(120,33,1,'move',0,155,292,483,0.00,0,0,1,1),(121,32,1,'move',0,155,290,579,0.00,0,0,1,1),(122,35,1,'move',0,185,347,-251,0.00,0,0,1,1),(123,39,2,'move',0,78,271,254,0.00,0,0,0,1),(124,38,2,'move',0,83,142,-59,0.00,0,0,0,1),(125,37,2,'move',0,20,-128,-322,0.00,0,0,0,1),(126,36,2,'move',0,20,101,-412,0.00,0,0,0,1),(139,40,2,'deploy',0,0,-296,399,0.00,1,0,1,1),(157,41,2,'deploy',0,0,300,-338,0.00,1,0,1,1),(158,29,2,'turn',0,0,-296,399,-30.00,30,111,1,1),(159,29,2,'move',0,111,-189,368,0.00,0,0,1,1),(160,29,2,'turn',0,0,-189,368,-20.00,20,74,1,1),(161,29,2,'move',0,29,-166,351,0.00,0,0,1,1),(162,30,2,'speed',0,1,-268,-359,0.00,30,0,1,1),(163,30,2,'speed',0,1,-268,-359,0.00,30,0,1,1),(164,30,2,'move',0,133,-146,-413,0.00,0,0,1,1),(165,30,2,'turn',0,0,-146,-413,45.00,56,73,1,1),(166,30,2,'move',0,98,-49,-392,0.00,0,0,1,1),(167,31,2,'turn',0,0,-520,-15,45.00,45,54,1,1),(168,31,2,'move',0,185,-389,-146,0.00,0,0,1,1),(169,31,2,'turn',0,0,-389,-146,34.69,70,0,1,1),(170,34,2,'move',0,58,260,-296,0.00,0,0,1,1),(171,34,2,'turn',0,0,260,-296,30.00,34,106,1,1),(172,34,2,'move',0,116,149,-262,0.00,0,0,1,1),(173,33,2,'speed',0,1,292,483,0.00,30,0,1,1),(174,33,2,'speed',0,1,292,483,0.00,30,0,1,1),(175,33,2,'move',0,193,114,408,0.00,0,0,1,1),(176,33,2,'turn',0,0,114,408,-14.94,24,37,1,1),(177,32,2,'turn',0,0,290,579,-30.00,30,78,1,1),(178,32,2,'move',0,78,212,586,0.00,0,0,1,1),(179,32,2,'turn',0,0,212,586,-27.09,28,71,1,1),(180,32,2,'move',0,77,147,627,0.00,0,0,1,1),(181,35,2,'speed',0,1,347,-251,0.00,30,0,1,1),(182,35,2,'speed',0,1,347,-251,0.00,30,0,1,1),(183,35,2,'speed',0,1,347,-251,0.00,30,0,1,1),(184,35,2,'speed',0,1,347,-251,0.00,30,0,1,1),(185,35,2,'turn',0,0,347,-251,6.00,9,10,1,1),(186,35,2,'move',0,277,86,-344,0.00,0,0,1,1),(187,40,2,'move',0,150,-163,468,27.23,0,0,0,1),(188,41,2,'move',0,125,176,-357,188.80,0,0,0,1),(189,39,3,'move',0,78,215,200,0.00,0,0,0,1),(190,38,3,'move',0,83,93,8,0.00,0,0,0,1),(191,37,3,'move',0,20,-110,-314,0.00,0,0,0,1),(192,36,3,'move',0,20,94,-431,0.00,0,0,0,1),(223,42,3,'deploy',0,0,116,608,-152.85,0,0,0,1),(224,43,3,'deploy',0,0,81,395,-168.49,0,0,0,1),(225,29,3,'move',0,140,-53,268,0.00,0,0,1,1),(226,29,3,'turn',0,0,-53,268,-30.00,50,37,1,1),(227,30,3,'speed',0,-1,-49,-392,0.00,30,0,1,1),(228,30,3,'move',0,78,28,-378,0.00,0,0,1,1),(229,30,3,'turn',0,0,28,-378,45.00,51,66,1,1),(230,30,3,'move',0,66,52,-317,0.00,0,0,1,1),(231,30,3,'turn',0,0,52,-317,45.00,53,64,1,1),(232,30,3,'move',0,64,26,-258,0.00,0,0,1,1),(233,30,3,'turn',0,0,26,-258,5.00,6,8,1,1),(234,31,3,'speed',0,1,-389,-146,0.00,30,0,1,1),(235,31,3,'speed',0,1,-389,-146,0.00,30,0,1,1),(236,31,3,'speed',0,1,-389,-146,0.00,30,0,1,1),(237,31,3,'speed',0,1,-389,-146,0.00,30,0,1,1),(238,31,3,'move',0,277,-116,-196,0.00,0,0,1,1),(239,34,3,'turn',0,0,149,-262,-30.00,34,106,1,1),(240,34,3,'move',0,174,30,-135,0.00,0,0,1,1),(241,34,3,'turn',0,0,30,-135,22.85,29,72,1,1),(242,33,3,'speed',0,-1,114,408,0.00,30,0,1,1),(243,33,3,'speed',0,-1,114,408,0.00,30,0,1,1),(244,33,3,'move',0,37,77,403,0.00,0,0,1,1),(245,33,3,'turn',0,0,77,403,25.00,25,65,1,1),(246,33,3,'move',0,118,-22,339,0.00,0,0,1,1),(247,32,3,'turn',0,0,147,627,30.00,30,78,1,1),(248,32,3,'move',0,78,69,630,0.00,0,0,1,1),(249,32,3,'turn',0,0,69,630,30.00,31,77,1,1),(250,32,3,'move',0,77,1,595,0.00,0,0,1,1),(251,32,3,'turn',0,0,1,595,24.00,24,63,1,1),(252,35,3,'speed',0,-1,86,-344,0.00,30,0,1,1),(253,35,3,'turn',0,0,86,-344,-45.00,62,68,1,1),(254,35,3,'move',0,254,-111,-184,0.00,0,0,1,1),(255,35,3,'turn',0,0,-111,-184,-27.00,38,40,1,1),(256,40,3,'move',0,207,1,595,37.75,0,0,0,1),(257,41,3,'move',0,180,26,-258,146.58,0,0,0,1),(258,42,3,'move',0,116,1,595,0.00,0,0,0,1),(259,43,3,'move',0,185,-53,268,223.46,0,0,0,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `damages`
--

LOCK TABLES `damages` WRITE;
/*!40000 ALTER TABLE `damages` DISABLE KEYS */;
INSERT INTO `damages` VALUES (1,1,1,1,0,5,1,0,'Laser',161,0,12,0,41,0,12,0,'p;',0),(2,1,1,1,0,5,1,0,'Laser',161,0,12,0,41,0,12,0,'p;',0),(3,1,1,1,0,5,1,0,'Laser',161,0,11,0,42,0,11,0,'p;',0),(4,4,1,1,0,10,2,0,'Particle',36,0,6,0,30,0,12,0,'p;',0),(5,4,1,1,0,10,2,0,'Particle',36,0,6,0,30,0,12,0,'p;',0),(6,3,1,1,0,10,2,0,'Pulse',50,0,24,0,26,0,12,0,'p;v2;',0),(7,5,2,12,0,5,2,0,'Particle',57,0,12,0,45,0,12,0,'p;',0),(8,5,2,12,0,10,2,0,'Particle',65,0,12,0,53,0,12,0,'p;',0),(9,5,2,12,0,10,2,0,'Particle',60,0,12,0,48,0,12,0,'p;',0),(10,6,4,23,13,15,2,0,'Particle',16,0,7,9,0,0,7,0,'p;',0),(11,8,4,23,10,1,3,0,'Particle',17,0,15,0,2,0,15,0,'p;',0),(12,8,4,23,13,1,3,0,'Particle',21,0,15,0,6,0,15,0,'p;',0),(13,8,4,23,10,1,3,0,'Particle',20,0,15,0,5,0,15,0,'p;',0),(14,8,4,23,6,1,3,0,'Particle',17,0,9,0,0,0,17,0,'b;',0),(15,8,4,23,6,9,3,0,'Particle',19,0,10,9,0,0,10,0,'p;',0),(16,7,4,24,10,12,3,0,'Particle',52,0,15,37,0,0,15,0,'p;',0),(17,7,4,24,14,16,3,0,'Particle',45,0,9,36,0,0,9,0,'p;',0),(18,9,4,23,10,1,4,0,'Particle',20,0,14,0,6,0,14,0,'p;',0),(19,10,4,23,10,1,4,0,'Particle',11,0,12,0,0,0,14,0,'b;',0),(20,11,4,23,10,12,4,0,'Particle',10,0,12,8,0,0,6,0,'p;',0),(21,13,4,24,17,1,4,0,'Particle',12,0,6,0,0,0,14,0,'b;',0),(22,12,4,24,17,18,4,0,'Pulse',79,0,27,50,2,0,9,1,'p;v3;o4;',0),(23,13,4,24,17,19,4,0,'Particle',12,0,6,0,0,0,14,0,'b;',0),(24,15,5,29,32,1,1,0,'Laser',208,0,24,0,45,0,24,0,'p;',0),(25,15,5,29,32,1,1,0,'Laser',208,0,23,0,46,0,23,0,'p;',0),(26,18,5,29,7,1,1,0,'Laser',74,0,12,0,0,0,26,0,'b;',0),(27,19,5,29,7,1,1,0,'Laser',91,0,25,0,5,0,25,0,'p;',0),(28,19,5,29,7,1,1,0,'Laser',91,0,25,0,5,0,25,0,'p;',0),(29,17,5,29,7,1,1,0,'Laser',77,0,13,0,0,0,25,0,'b;',0),(30,17,5,29,7,8,1,0,'Laser',77,0,11,14,0,0,11,0,'p;',0),(31,18,5,29,7,9,1,0,'Laser',74,0,16,8,0,0,16,0,'p;',0),(32,19,5,29,7,11,1,0,'Laser',91,0,15,15,0,0,15,0,'p;',0),(33,18,5,29,7,12,1,0,'Laser',74,0,16,8,0,0,16,0,'p;',0),(34,17,5,29,7,14,1,0,'Laser',77,0,14,11,0,0,14,0,'p;',0),(35,15,5,29,32,37,1,0,'Laser',208,0,14,40,15,0,14,1,'p;o3;',0),(36,20,5,33,6,1,1,0,'Laser',322,0,17,0,63,0,17,0,'p;',0),(37,22,5,33,6,1,1,0,'Particle',43,0,16,0,27,0,16,0,'p;',0),(38,23,5,33,6,1,1,0,'Particle',40,0,15,0,25,0,15,0,'p;',0),(39,20,5,33,6,3,1,0,'Laser',322,0,17,20,43,0,17,0,'p;c;',0),(40,20,5,33,6,4,1,0,'Laser',322,0,17,20,43,0,17,0,'p;c;',0),(41,20,5,33,6,5,1,0,'Laser',322,0,18,20,42,0,18,0,'p;c;',0),(42,24,5,33,6,5,1,0,'Particle',36,0,15,20,1,0,15,0,'p;c;',0),(43,21,5,33,6,8,1,0,'Particle',41,0,10,31,0,0,10,0,'p;',0),(44,27,5,32,6,1,1,0,'Laser',119,0,17,0,42,0,17,0,'p;',0),(45,28,5,32,6,1,1,0,'Laser',124,0,16,0,46,0,16,0,'p;',0),(46,28,5,32,6,1,1,0,'Laser',124,0,16,0,46,0,16,0,'p;',0),(47,26,5,32,6,5,1,0,'Laser',114,0,18,20,19,0,18,0,'p;c;',0),(48,27,5,32,6,7,1,0,'Laser',119,0,10,40,9,0,10,1,'p;o4;',0),(49,26,5,32,6,8,1,0,'Laser',114,0,11,40,6,0,11,1,'p;o4;',0),(50,32,5,29,15,1,2,0,'Area',120,0,24,0,96,0,24,0,'p;',0),(51,32,5,29,15,16,2,0,'Area',26,0,14,12,0,0,14,0,'p;',0),(52,32,5,29,15,17,2,0,'Area',22,0,14,8,0,0,14,0,'p;',0),(53,32,5,29,15,18,2,0,'Area',21,0,14,7,0,0,14,0,'p;',0),(54,32,5,29,15,19,2,0,'Area',19,0,14,5,0,0,14,0,'p;',0),(55,32,5,29,15,20,2,0,'Area',22,0,14,8,0,0,14,0,'p;',0),(56,32,5,29,15,21,2,0,'Area',24,0,14,10,0,0,14,0,'p;',0),(57,32,5,29,15,22,2,0,'Area',19,0,10,9,0,0,10,0,'p;',0),(58,32,5,29,15,23,2,0,'Area',26,0,10,16,0,0,10,0,'p;',0),(59,45,5,29,15,1,2,0,'Pulse',43,0,43,0,0,0,21,0,'b;v4;',0),(60,44,5,29,15,21,2,0,'Pulse',61,0,82,9,0,0,13,0,'p;v4;',0),(61,49,5,30,0,5,2,0,'Particle',9,0,10,0,0,0,16,0,'b;',0),(62,47,5,30,0,11,2,0,'Particle',12,0,12,0,0,0,16,0,'b;',0),(63,48,5,30,0,11,2,0,'Particle',9,0,10,0,0,0,16,0,'b;',0),(64,38,5,34,10,1,2,0,'Pulse',89,0,54,0,35,0,18,0,'p;v3;',0),(65,37,5,34,10,3,2,0,'Laser',103,0,5,20,26,0,18,0,'p;c;',0),(66,39,5,34,10,4,2,0,'Pulse',62,0,34,20,8,0,17,0,'p;v2;c;',0),(67,37,5,34,10,11,2,0,'Laser',103,0,3,48,0,0,11,0,'p;',0),(68,41,5,34,10,11,2,0,'Pulse',116,0,40,2,74,0,10,1,'p;v4;o4;',0),(69,36,5,33,6,1,2,0,'Particle',36,0,14,0,22,0,14,0,'p;',0),(70,34,5,33,6,4,2,0,'Particle',38,0,14,20,4,0,14,0,'p;c;',0);
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
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fireorders`
--

LOCK TABLES `fireorders` WRITE;
/*!40000 ALTER TABLE `fireorders` DISABLE KEYS */;
INSERT INTO `fireorders` VALUES (1,1,1,2,1,-381,-118,13,1,39,'18;',1,1),(2,1,2,1,2,317,-64,12,2,19,'42;97;',0,1),(3,1,2,2,1,-197,-115,10,1,31,'24;',1,1),(4,1,2,2,1,-197,-115,11,2,42,'3;35;',2,1),(5,2,2,13,12,0,0,2,3,50,'73;71;50;2;',3,1),(6,4,2,26,23,0,0,2,4,39,'33;39;39;45;62;18;79;',1,1),(7,4,3,25,24,0,0,2,6,43,'130;43;43;79;36;58;58;45;28;',2,1),(8,4,3,26,23,0,0,2,15,39,'129;39;39;68;45;41;100;88;6;13;81;79;53;71;15;35;38;93;',5,1),(9,4,4,26,23,0,0,2,2,39,'10;39;39;15;44;',1,1),(10,4,4,24,23,225,168,15,2,34,'35;20;',1,1),(11,4,4,24,23,225,168,20,2,34,'79;2;',1,1),(12,4,4,23,24,56,169,11,1,58,'20;',1,1),(13,4,4,23,24,56,169,12,4,48,'22;57;66;21;',2,1),(14,5,1,34,29,-295,404,7,1,159,'-120;',0,1),(15,5,1,34,29,-295,404,9,1,159,'97;',1,1),(16,5,1,33,29,-304,403,17,1,89,'-145;',0,1),(17,5,1,33,29,-304,403,18,1,89,'67;',1,1),(18,5,1,32,29,-294,398,17,1,87,'81;',1,1),(19,5,1,32,29,-294,398,18,1,87,'23;',1,1),(20,5,1,29,33,290,486,9,1,106,'72;',1,1),(21,5,1,29,33,290,486,11,1,58,'57;',1,1),(22,5,1,29,33,290,486,12,1,58,'30;',1,1),(23,5,1,29,33,290,486,13,1,58,'25;',1,1),(24,5,1,29,33,290,486,14,1,58,'48;',1,1),(25,5,1,29,32,286,584,16,1,91,'97;',0,1),(26,5,1,29,32,286,584,17,1,91,'21;',1,1),(27,5,1,29,32,286,584,33,1,91,'61;',1,1),(28,5,1,29,32,286,584,34,1,91,'34;',1,1),(29,5,2,29,0,298,574,30,0,0,'',0,2),(30,5,2,34,0,-150,376,8,1,0,'-150;376;29;',1,1),(31,5,2,34,0,-266,-365,17,0,0,'',0,2),(32,5,2,34,29,-150,376,8,0,0,'-150;376;',1,1),(33,5,2,29,33,111,414,18,1,34,'35;',0,1),(34,5,2,29,33,111,414,19,1,34,'17;',1,1),(35,5,2,29,33,111,414,20,1,34,'75;',0,1),(36,5,2,29,33,111,414,21,1,34,'30;',1,1),(37,5,2,30,34,153,-256,6,1,64,'58;',1,1),(38,5,2,30,34,147,-253,7,1,50,'23;',1,1),(39,5,2,30,34,147,-253,8,1,50,'36;',1,1),(40,5,2,30,34,153,-256,12,1,64,'80;',0,1),(41,5,2,30,34,147,-253,13,1,50,'2;',1,1),(42,5,2,30,34,147,-253,14,1,50,'68;',0,1),(43,5,2,34,30,-49,-390,11,1,50,'59;',0,1),(44,5,2,33,29,-167,360,7,1,63,'12;',1,1),(45,5,2,33,29,-167,360,8,1,63,'18;',1,1),(46,5,2,33,29,-167,360,10,1,46,'72;',0,1),(47,5,2,35,30,-46,-393,7,2,27,'64;20;',1,1),(48,5,2,35,30,-46,-393,8,2,27,'-177;9;',1,1),(49,5,2,35,30,-46,-393,11,2,27,'22;29;',1,1),(50,5,2,35,30,-46,-393,12,2,27,'51;42;',0,1),(51,5,2,35,30,-46,-393,15,2,27,'52;55;',0,1),(52,5,2,35,30,-46,-393,16,2,27,'91;96;',0,1),(53,5,3,33,29,-162,350,11,4,0,'',0,2),(54,5,3,32,40,-154,473,11,4,0,'',0,2),(55,5,3,34,30,27,-264,13,0,0,'',0,0),(56,5,3,34,30,27,-264,14,0,0,'',0,0),(57,5,3,34,30,27,-264,16,0,0,'',0,0),(58,5,3,34,29,-54,271,20,0,0,'',0,0),(59,5,3,34,29,-56,262,22,0,0,'',0,0),(60,5,3,34,29,-56,262,23,0,0,'',0,0),(61,5,3,32,40,0,0,14,0,0,'',0,0),(62,5,3,32,40,0,0,15,0,0,'',0,0),(63,5,3,41,30,26,-258,2,0,0,'',0,0),(64,5,3,41,30,26,-258,4,0,0,'',0,0),(65,5,3,41,30,26,-258,6,0,0,'',0,0),(66,5,3,41,30,26,-258,8,0,0,'',0,0),(67,5,3,41,30,26,-258,10,0,0,'',0,0),(68,5,3,41,30,26,-258,12,0,0,'',0,0),(69,5,3,41,30,26,-258,14,0,0,'',0,0),(70,5,3,41,30,26,-258,16,0,0,'',0,0),(71,5,3,41,30,26,-258,18,0,0,'',0,0),(72,5,3,41,30,0,0,20,0,0,'',0,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `games`
--

LOCK TABLES `games` WRITE;
/*!40000 ALTER TABLE `games` DISABLE KEYS */;
INSERT INTO `games` VALUES (1,'myGame','active',3,-1,3500,1500,11,3,10,10,8,75,200),(2,'myGame','active',3,0,3500,1500,11,3,10,10,4,75,200),(3,'myGame','active',2,-1,3500,1500,11,3,10,10,4,75,200),(4,'myGame','active',4,3,3500,1500,11,3,10,10,4,75,200),(5,'myGame','active',3,2,3500,1500,11,3,10,10,4,75,200);
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
INSERT INTO `globals` VALUES (1,1,0,0,'Morale',0,100.00,'',''),(2,2,0,0,'Morale',0,115.00,'',''),(3,3,0,0,'Morale',0,100.00,'',''),(4,4,0,0,'Morale',0,100.00,'',''),(5,5,0,0,'Morale',0,100.00,'',''),(6,6,0,0,'Morale',0,100.00,'',''),(7,7,0,0,'Morale',0,100.00,'',''),(8,8,0,0,'Morale',0,115.00,'',''),(9,9,0,0,'Morale',0,100.00,'',''),(10,10,0,0,'Morale',0,115.00,'','');
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loads`
--

LOCK TABLES `loads` WRITE;
/*!40000 ALTER TABLE `loads` DISABLE KEYS */;
INSERT INTO `loads` VALUES (1,29,2,'Command',1),(2,29,2,'Reactor',1),(4,34,2,'Command',1),(5,34,2,'Reactor',1),(6,32,11,'Vran',8),(7,33,11,'Vran',8);
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `missions`
--

LOCK TABLES `missions` WRITE;
/*!40000 ALTER TABLE `missions` DISABLE KEYS */;
INSERT INTO `missions` VALUES (1,40,'2',2,32,290,579,3),(2,41,'2',2,30,-268,-359,3),(3,42,'2',3,40,-163,468,3),(4,43,'2',3,29,-166,351,3);
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playerstatus`
--

LOCK TABLES `playerstatus` WRITE;
/*!40000 ALTER TABLE `playerstatus` DISABLE KEYS */;
INSERT INTO `playerstatus` VALUES (1,1,1,3,-1,'Centauri Republic',680,4320,1120,280,560,'ready'),(2,2,1,3,-1,'Narn Regime',850,4150,1540,385,770,'waiting'),(3,1,2,3,0,'Minbari Federation',1500,3500,2184,546,1092,'ready'),(4,2,2,3,0,'Centauri Republic',680,4320,1120,280,560,'waiting'),(5,1,3,2,-1,'Centauri Republic',740,4260,1540,385,385,'waiting'),(6,2,3,2,-1,'Earth Alliance',1100,3900,1680,420,420,'ready'),(7,1,4,4,3,'Centauri Republic',450,4550,1400,350,1050,'waiting'),(8,2,4,4,3,'Narn Regime',460,4540,1400,350,1050,'waiting'),(9,1,5,3,2,'Minbari Federation',2976,1544,2292,573,1146,'waiting'),(10,2,5,3,2,'Narn Regime',2950,1820,1616,404,808,'ready');
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
) ENGINE=InnoDB AUTO_INCREMENT=123 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `powers`
--

LOCK TABLES `powers` WRITE;
/*!40000 ALTER TABLE `powers` DISABLE KEYS */;
INSERT INTO `powers` VALUES (1,2,14,1,'-1',0),(2,2,15,1,'-1',0),(3,2,21,1,'-1',0),(4,2,22,1,'-1',0),(5,2,14,2,'-1',0),(6,2,15,2,'-1',0),(7,2,21,2,'-1',0),(8,2,22,2,'-1',0),(9,18,7,1,'-1',0),(10,18,8,1,'-1',0),(11,18,10,1,'-1',0),(12,18,11,1,'-1',0),(13,18,13,1,'-1',0),(14,18,14,1,'-1',0),(15,18,15,1,'-1',0),(16,18,16,1,'-1',0),(17,18,17,1,'-1',0),(18,18,18,1,'-1',0),(19,18,19,1,'-1',0),(20,18,20,1,'-1',0),(21,18,27,1,'-1',0),(22,18,28,1,'-1',0),(23,18,29,1,'-1',0),(24,18,30,1,'-1',0),(25,18,31,1,'-1',0),(26,18,32,1,'-1',0),(27,18,33,1,'-1',0),(28,18,34,1,'-1',0),(29,17,13,1,'0',0),(30,17,20,1,'0',0),(31,18,7,2,'-1',0),(32,18,8,2,'-1',0),(33,18,10,2,'-1',0),(34,18,11,2,'-1',0),(35,18,13,2,'-1',0),(36,18,14,2,'-1',0),(37,18,15,2,'-1',0),(38,18,16,2,'-1',0),(39,18,17,2,'-1',0),(40,18,18,2,'-1',0),(41,18,19,2,'-1',0),(42,18,20,2,'-1',0),(43,18,27,2,'-1',0),(44,18,28,2,'-1',0),(45,18,29,2,'-1',0),(46,18,30,2,'-1',0),(47,18,31,2,'-1',0),(48,18,32,2,'-1',0),(49,18,33,2,'-1',0),(50,18,34,2,'-1',0),(51,23,8,1,'0',0),(52,23,8,2,'0',0),(53,23,8,3,'0',0),(54,23,8,4,'0',0),(55,34,18,1,'0',0),(56,33,11,1,'0',0),(57,32,11,1,'0',0),(58,29,25,1,'0',0),(59,29,26,1,'0',0),(60,29,27,1,'0',0),(61,29,28,1,'0',0),(62,29,4,1,'1',3),(63,29,6,1,'1',6),(64,29,6,1,'1',9),(65,30,7,1,'-1',0),(66,30,8,1,'-1',0),(67,30,9,1,'-1',0),(68,30,10,1,'-1',0),(69,30,13,1,'-1',0),(70,30,14,1,'-1',0),(71,30,15,1,'-1',0),(72,30,16,1,'-1',0),(73,29,6,2,'1',6),(74,30,7,2,'-1',0),(75,30,8,2,'-1',0),(76,30,9,2,'-1',0),(77,30,10,2,'-1',0),(78,30,13,2,'-1',0),(79,30,14,2,'-1',0),(80,30,15,2,'-1',0),(81,30,16,2,'-1',0),(82,34,18,2,'0',0),(83,33,11,2,'0',0),(84,33,15,2,'0',0),(85,32,10,2,'0',0),(86,32,11,2,'0',0),(87,29,29,3,'1',3),(88,29,31,3,'1',3),(89,30,7,3,'-1',0),(90,30,8,3,'-1',0),(91,30,9,3,'-2',0),(92,30,10,3,'-2',0),(93,30,13,3,'-1',0),(94,30,14,3,'-1',0),(95,30,15,3,'-2',0),(96,30,16,3,'-2',0),(97,31,6,3,'0',0),(98,31,7,3,'1',3),(99,31,10,3,'0',0),(100,31,11,3,'1',3),(101,33,11,3,'1',0),(102,33,11,3,'1',0),(103,33,11,3,'1',0),(104,33,11,3,'1',0),(105,32,11,3,'1',0),(106,32,11,3,'1',0),(107,32,11,3,'1',0),(108,32,11,3,'1',0),(109,32,18,3,'0',0),(110,35,6,3,'1',2),(111,35,10,3,'1',2),(112,35,14,3,'1',2),(113,41,2,3,'-2',0),(114,41,4,3,'-2',0),(115,41,6,3,'-2',0),(116,41,8,3,'-2',0),(117,41,10,3,'-2',0),(118,41,12,3,'-2',0),(119,41,14,3,'-2',0),(120,41,16,3,'-2',0),(121,41,18,3,'-2',0),(122,41,20,3,'-2',0);
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
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sensors`
--

LOCK TABLES `sensors` WRITE;
/*!40000 ALTER TABLE `sensors` DISABLE KEYS */;
INSERT INTO `sensors` VALUES (1,1,3,1,-1.00,77,0),(2,2,4,1,-1.00,102,0),(3,1,3,2,-1.00,77,0),(4,2,4,2,3.61,761,0),(5,1,3,3,-1.00,77,0),(6,12,3,1,-1.00,77,0),(7,11,4,1,-1.00,146,0),(8,12,3,2,-1.00,77,0),(9,11,4,2,-1.00,146,0),(10,12,3,3,-1.00,77,0),(11,11,4,3,-1.00,146,0),(12,18,4,1,-1.00,117,0),(13,17,4,1,-1.00,117,0),(14,18,4,2,-1.00,117,0),(15,24,4,1,-1.00,102,0),(16,23,4,1,-1.00,102,0),(17,24,4,2,-1.00,102,0),(18,23,4,2,-1.00,102,0),(19,24,4,3,-1.00,102,0),(20,23,4,3,-1.00,102,0),(21,24,4,4,-1.00,102,0),(22,23,4,4,-1.00,102,0),(23,34,4,1,359.79,999,0),(24,33,4,1,-1.00,102,0),(25,32,4,1,-1.00,102,0),(26,35,3,1,-1.00,59,0),(27,29,4,1,359.83,989,0),(28,30,3,1,-1.00,102,0),(29,31,3,1,-1.00,81,0),(30,29,4,2,60.74,393,1),(31,30,3,2,0.54,433,0),(32,31,3,2,1.09,624,1),(33,34,4,2,59.08,352,1),(34,33,4,2,0.43,298,0),(35,32,4,2,67.11,432,1),(36,35,3,2,24.35,209,1),(37,29,4,3,153.50,457,0),(38,30,3,3,-1.00,102,0),(39,31,3,3,348.95,167,0),(40,34,4,3,315.11,457,0),(41,33,4,3,-1.00,72,0),(42,32,4,3,-1.00,102,0),(43,35,3,3,46.32,145,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subunits`
--

LOCK TABLES `subunits` WRITE;
/*!40000 ALTER TABLE `subunits` DISABLE KEYS */;
INSERT INTO `subunits` VALUES (1,1,1,'Mograth'),(2,1,1,'Mograth'),(3,12,1,'Mograth'),(4,12,1,'Mograth'),(5,30,1,'WhiteStar'),(6,30,1,'WhiteStar'),(7,31,1,'Shaveen'),(8,31,1,'Shaveen'),(9,35,1,'Shokos'),(10,35,1,'Shokos'),(11,35,1,'Shokos'),(12,40,12,'Nial'),(13,41,10,'Gorith'),(14,42,4,'Vran'),(15,43,4,'Vran');
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
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `systemcrits`
--

LOCK TABLES `systemcrits` WRITE;
/*!40000 ALTER TABLE `systemcrits` DISABLE KEYS */;
INSERT INTO `systemcrits` VALUES (1,1,6,1,'Damage',0,-30.00),(2,1,7,1,'Damage',0,-30.00),(3,1,8,1,'Damage',0,-30.00),(4,1,9,1,'Destroyed',0,-30.00),(5,1,11,2,'Damage',0,-30.00),(6,1,13,2,'Damage',0,-30.00),(7,12,6,2,'Accuracy',0,-30.00),(8,12,7,2,'Accuracy',0,-30.00),(9,12,11,2,'Damage',0,-30.00),(10,12,12,2,'Damage',0,-30.00),(11,12,14,2,'Destroyed',0,-30.00),(12,24,16,3,'Damage',0,-30.00),(13,24,5,4,'Overload',0,-4.63),(14,29,5,1,'Overload',0,-1.09),(15,29,8,1,'Accuracy',0,-30.00),(16,29,11,1,'Damage',0,-30.00),(17,33,2,1,'Morale',-2,-25.00),(18,33,4,1,'Output',0,-15.00),(19,33,5,1,'Output',0,-10.00),(20,33,8,1,'Damage',0,-30.00),(21,32,2,1,'Morale',-2,-15.00),(22,32,5,1,'Output',0,-10.00),(23,32,5,1,'Overload',0,-11.64),(24,29,23,2,'Accuracy',0,-30.00),(25,34,2,2,'',0,0.00),(26,34,3,2,'Output',0,-15.00),(27,34,5,2,'Overload',0,-1.98),(28,33,4,2,'Output',0,-15.00);
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
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `units`
--

LOCK TABLES `units` WRITE;
/*!40000 ALTER TABLE `units` DISABLE KEYS */;
INSERT INTO `units` VALUES (1,1,1,3,'Squadron','',680,680,'bought',1,1,0,0,0,-198,-117,0.00,0,185,0,0,0,2,3,0,''),(2,1,2,4,'Hyperion','',850,850,'bought',1,1,0,0,0,319,-64,180.00,0,155,0,0,0,2,3,0,''),(3,1,0,0,'Obstacle','',18,23,'deployed',0,0,0,0,0,150,104,215.00,194,41,23,1,0,2,3,0,''),(4,1,0,0,'Obstacle','',22,29,'deployed',0,0,0,0,0,-235,-357,19.00,136,57,32,1,0,2,3,0,''),(5,1,0,0,'Obstacle','',60,78,'deployed',0,0,0,0,0,225,-160,98.00,116,19,31,4,0,2,3,0,''),(6,1,0,0,'Obstacle','',92,120,'deployed',0,0,0,0,0,-102,357,289.00,181,13,29,4,0,2,3,0,''),(7,1,0,0,'Obstacle','',17,22,'deployed',0,0,0,0,0,140,-350,179.00,145,60,29,1,0,2,3,0,''),(8,1,0,0,'Obstacle','',30,39,'deployed',0,0,0,0,0,-316,273,82.00,91,55,18,2,0,2,3,0,''),(9,1,0,0,'Obstacle','',30,39,'deployed',0,0,0,0,0,-186,-401,120.00,169,33,35,2,0,2,3,0,''),(10,1,0,0,'Obstacle','',48,62,'deployed',0,0,0,0,0,119,-316,199.00,186,20,26,3,0,2,3,0,''),(11,2,1,4,'Sharlin','',1500,1500,'bought',1,1,0,0,0,-336,18,0.00,0,140,0,0,0,2,3,0,''),(12,2,2,3,'Squadron','',680,680,'bought',1,1,0,0,0,65,-312,164.23,0,185,0,0,0,2,3,0,''),(13,2,0,0,'Obstacle','',57,74,'deployed',0,0,0,0,0,119,-313,193.00,78,42,28,3,0,2,3,0,''),(14,2,0,0,'Obstacle','',34,44,'deployed',0,0,0,0,0,-347,-374,229.00,125,43,19,2,0,2,3,0,''),(15,2,0,0,'Obstacle','',24,31,'deployed',0,0,0,0,0,105,466,220.00,109,76,28,1,0,2,3,0,''),(16,2,0,0,'Obstacle','',51,66,'deployed',0,0,0,0,0,142,174,241.00,100,28,17,3,0,2,3,0,''),(17,3,1,4,'Centurion','',740,740,'bought',1,1,0,0,0,-352,387,0.00,0,155,0,0,0,1,3,0,''),(18,3,2,4,'Omega','',1100,1100,'bought',1,1,0,0,0,459,-42,182.05,0,140,0,0,0,1,3,0,''),(19,3,0,0,'Obstacle','',22,29,'deployed',0,0,0,0,0,-309,-258,225.00,171,51,22,1,0,1,3,0,''),(20,3,0,0,'Obstacle','',100,130,'deployed',0,0,0,0,0,-201,412,134.00,100,21,32,4,0,1,3,0,''),(21,3,0,0,'Obstacle','',63,82,'deployed',0,0,0,0,0,298,-169,65.00,195,13,20,3,0,1,3,0,''),(22,3,0,0,'Obstacle','',38,49,'deployed',0,0,0,0,0,-125,-193,325.00,186,30,25,2,0,1,3,0,''),(23,4,1,4,'Demos','',450,450,'bought',1,1,0,0,0,34,157,0.00,0,205,0,0,0,3,3,0,''),(24,4,2,4,'KaToc','',460,460,'bought',1,1,0,0,0,212,173,189.33,0,165,0,0,0,3,3,0,''),(25,4,0,0,'Obstacle','',45,59,'deployed',0,0,0,0,0,324,230,328.00,172,21,34,3,0,4,-1,0,''),(26,4,0,0,'Obstacle','',16,21,'deployed',0,0,0,0,0,-13,213,6.00,163,61,32,1,0,4,-1,0,''),(27,4,0,0,'Obstacle','',66,86,'deployed',0,0,0,0,0,212,321,270.00,183,20,34,3,0,4,-1,0,''),(28,4,0,0,'Obstacle','',45,59,'deployed',0,0,0,0,0,220,-376,214.00,141,23,26,3,0,4,-1,0,''),(29,5,1,4,'Sharlin','',2156,1676,'bought',1,1,0,0,0,-166,351,323.74,45,140,0,0,0,2,3,0,''),(30,5,1,3,'Squadron','',780,780,'bought',0,1,0,0,0,-49,-392,23.54,0,231,0,0,0,2,3,0,''),(31,5,1,3,'Squadron','',520,520,'bought',0,1,0,0,0,-389,-146,-10.31,0,185,0,0,0,2,3,0,''),(32,5,2,4,'Varnic','',650,650,'bought',0,1,0,0,0,147,627,147.43,0,155,0,0,0,2,3,0,''),(33,5,2,4,'Varnic','',650,650,'bought',0,1,0,0,0,114,408,187.81,37,193,0,0,0,2,3,0,''),(34,5,2,4,'GQuan','',1220,990,'bought',1,1,0,0,0,149,-262,162.93,0,174,0,0,0,2,3,0,''),(35,5,2,3,'Squadron','',660,660,'bought',0,1,0,0,0,86,-344,186.00,0,277,0,0,0,2,3,0,''),(36,5,0,0,'Obstacle','',57,74,'deployed',0,0,0,0,0,94,-431,250.00,75,20,32,3,0,3,-1,0,''),(37,5,0,0,'Obstacle','',51,66,'deployed',0,0,0,0,0,-110,-314,24.00,167,20,17,3,0,3,-1,0,''),(38,5,0,0,'Obstacle','',18,23,'deployed',0,0,0,0,0,93,8,126.00,126,83,31,1,0,3,-1,0,''),(39,5,0,0,'Obstacle','',18,23,'deployed',0,0,0,0,0,215,200,224.00,118,78,34,1,0,3,-1,0,''),(40,5,1,2,'Flight','Onslaught-Phi',480,480,'deployed',0,2,0,0,0,-163,468,27.23,0,300,0,0,0,2,3,0,''),(41,5,2,2,'Flight','Silver-Alpha',230,230,'deployed',0,2,0,0,0,176,-357,188.80,0,250,0,0,0,2,3,0,''),(42,5,2,1,'Salvo','',0,0,'deployed',0,3,0,0,0,116,608,-168.49,0,0,0,0,0,3,-1,0,''),(43,5,2,1,'Salvo','',0,0,'deployed',0,3,0,0,0,81,395,-168.49,0,0,0,0,0,3,-1,0,'');
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

-- Dump completed on 2018-10-28 20:22:16

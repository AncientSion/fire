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
) ENGINE=InnoDB AUTO_INCREMENT=205 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actions`
--

LOCK TABLES `actions` WRITE;
/*!40000 ALTER TABLE `actions` DISABLE KEYS */;
INSERT INTO `actions` VALUES (1,3,1,'deploy',0,0,574,69,180.00,0,0,1,1),(2,2,1,'deploy',0,0,534,-411,180.00,0,0,1,1),(3,1,1,'deploy',0,0,-577,-71,0.00,0,0,1,1),(4,1,1,'jumpIn',0,0,-577,-71,0.00,0,0,0,1),(5,2,1,'jumpIn',0,0,534,-411,0.00,0,0,0,1),(6,3,1,'jumpIn',0,0,574,69,0.00,0,0,0,1),(7,1,1,'move',0,155,-422,-71,0.00,0,0,1,1),(8,3,1,'move',0,155,419,69,0.00,0,0,1,1),(9,2,1,'move',0,185,349,-411,0.00,0,0,1,1),(10,4,2,'move',0,21,-127,205,0.00,0,0,0,1),(11,5,2,'move',0,40,308,-281,0.00,0,0,0,1),(12,6,2,'move',0,69,-248,156,0.00,0,0,0,1),(13,7,2,'move',0,53,275,-522,0.00,0,0,0,1),(14,9,2,'deploy',0,0,-422,-71,0.00,0,0,0,1),(15,3,2,'turn',0,0,419,69,-30.00,30,78,1,1),(16,3,2,'move',0,78,351,108,0.00,0,0,1,1),(17,3,2,'turn',0,0,351,108,-16.43,17,43,1,1),(18,3,2,'move',0,77,298,164,0.00,0,0,1,1),(19,2,2,'move',0,185,164,-411,0.00,0,0,1,1),(20,2,2,'turn',0,0,164,-411,-39.34,80,0,1,1),(21,1,2,'turn',0,0,-422,-71,-30.00,30,86,1,1),(22,1,2,'move',0,155,-288,-148,0.00,0,0,1,1),(23,9,2,'move',0,125,-303,-32,18.08,0,0,0,1),(24,4,3,'move',0,21,-109,194,0.00,0,0,0,1),(25,5,3,'move',0,40,284,-249,0.00,0,0,0,1),(26,6,3,'move',0,69,-226,91,0.00,0,0,0,1),(27,7,3,'move',0,53,274,-575,0.00,0,0,0,1),(31,10,3,'deploy',0,0,281,155,-151.97,0,0,0,1),(32,1,3,'move',0,155,-154,-226,0.00,0,0,1,1),(33,3,3,'turn',0,0,298,164,30.00,30,78,1,1),(34,3,3,'move',0,78,223,186,0.00,0,0,1,1),(35,3,3,'turn',0,0,223,186,30.00,31,77,1,1),(36,3,3,'move',0,77,148,168,0.00,0,0,1,1),(37,3,3,'turn',0,0,148,168,24.00,24,63,1,1),(38,2,3,'move',0,185,21,-294,0.00,0,0,1,1),(39,2,3,'turn',0,0,21,-294,13.26,28,0,1,1),(40,9,3,'move',0,225,-128,-173,321.04,0,0,0,1),(41,10,3,'move',0,578,-154,-226,221.21,0,0,0,1),(42,4,4,'move',0,21,-91,183,0.00,0,0,0,1),(43,5,4,'move',0,40,260,-217,0.00,0,0,0,1),(44,6,4,'move',0,69,-204,26,0.00,0,0,0,1),(45,7,4,'move',0,53,273,-628,0.00,0,0,0,1),(57,11,4,'deploy',0,0,132,154,-127.47,0,0,0,1),(58,1,4,'turn',0,0,-154,-226,30.00,30,86,1,1),(59,1,4,'move',0,86,-68,-226,0.00,0,0,1,1),(60,1,4,'turn',0,0,-68,-226,30.00,36,69,1,1),(61,1,4,'move',0,69,-8,-192,0.00,0,0,1,1),(62,1,4,'turn',0,0,-8,-192,4.00,4,12,1,1),(63,3,4,'move',0,63,98,130,0.00,0,0,1,1),(64,3,4,'turn',0,0,98,130,30.00,30,78,1,1),(65,3,4,'move',0,92,63,45,0.00,0,0,1,1),(66,3,4,'turn',0,0,63,45,28.23,55,8,1,1),(67,2,4,'move',0,185,-145,-213,0.00,0,0,1,1),(68,2,4,'turn',0,0,-145,-213,-45.00,90,0,1,1),(69,9,4,'move',0,43,-145,-213,246.97,0,0,0,1),(70,11,4,'move',0,373,-8,-192,247.97,0,0,0,1),(71,4,5,'move',0,21,-73,172,0.00,0,0,0,1),(72,5,5,'move',0,40,236,-185,0.00,0,0,0,1),(73,6,5,'move',0,69,-182,-39,0.00,0,0,0,1),(74,7,5,'move',0,53,272,-681,0.00,0,0,0,1),(91,3,5,'move',0,8,64,37,0.00,0,0,1,1),(92,3,5,'turn',0,0,64,37,-30.00,30,78,1,1),(93,3,5,'move',0,78,32,-34,0.00,0,0,1,1),(94,3,5,'turn',0,0,32,-34,-30.00,34,69,1,1),(95,3,5,'move',0,69,-24,-74,0.00,0,0,1,1),(96,3,5,'turn',0,0,-24,-74,-21.00,21,55,1,1),(97,2,5,'speed',0,1,-145,-213,0.00,30,0,1,1),(98,2,5,'speed',0,1,-145,-213,0.00,30,0,1,1),(99,2,5,'move',0,184,-222,-45,0.00,0,0,1,1),(100,2,5,'turn',0,0,-222,-45,-45.00,76,47,1,1),(101,2,5,'move',0,47,-201,-3,0.00,0,0,1,1),(102,2,5,'turn',0,0,-201,-3,-4.00,5,7,1,1),(103,1,5,'move',0,12,2,-185,0.00,0,0,1,1),(104,1,5,'turn',0,0,2,-185,30.00,30,86,1,1),(105,1,5,'move',0,143,65,-56,0.00,0,0,1,1),(106,1,5,'turn',0,0,65,-56,21.72,40,12,1,1),(107,9,5,'move',0,217,-201,-3,104.93,0,0,0,1),(108,4,6,'move',0,21,-55,161,0.00,0,0,0,1),(109,5,6,'move',0,40,212,-153,0.00,0,0,0,1),(110,6,6,'move',0,69,-160,-104,0.00,0,0,0,1),(111,7,6,'move',0,53,271,-734,0.00,0,0,0,1),(117,12,6,'deploy',0,0,9,-72,11.43,0,0,0,1),(118,3,6,'move',0,92,-110,-105,0.00,0,0,1,1),(119,3,6,'turn',0,0,-110,-105,-30.00,36,63,1,1),(120,3,6,'move',0,63,-171,-88,0.00,0,0,1,1),(121,3,6,'turn',0,0,-171,-88,-30.00,49,29,1,1),(122,2,6,'move',0,150,-141,135,0.00,0,0,1,1),(123,2,6,'turn',0,0,-141,135,-45.00,56,73,1,1),(124,2,6,'move',0,73,-70,154,0.00,0,0,1,1),(125,2,6,'turn',0,0,-70,154,-45.00,79,44,1,1),(126,2,6,'move',0,8,-63,150,0.00,0,0,1,1),(127,1,6,'move',0,12,66,-44,0.00,0,0,1,1),(128,1,6,'turn',0,0,66,-44,30.00,30,86,1,1),(129,1,6,'move',0,86,29,33,0.00,0,0,1,1),(130,1,6,'turn',0,0,29,33,30.00,40,58,1,1),(131,1,6,'move',0,57,-18,65,0.00,0,0,1,1),(132,9,6,'move',0,206,-63,150,47.95,0,0,0,1),(133,12,6,'move',0,140,-18,65,101.15,0,0,0,1),(134,22,1,'move',0,93,-310,-241,0.00,0,0,0,1),(135,23,1,'move',0,16,336,-295,0.00,0,0,0,1),(136,24,1,'move',0,14,143,-292,0.00,0,0,0,1),(137,25,1,'move',0,21,-325,320,0.00,0,0,0,1),(138,21,1,'deploy',0,0,433,-395,180.00,0,0,1,1),(139,19,1,'deploy',0,0,-608,-233,0.00,0,0,1,1),(140,20,1,'deploy',0,0,-666,397,0.00,0,0,1,1),(141,19,1,'jumpIn',0,0,-608,-233,0.00,0,0,0,1),(142,20,1,'jumpIn',0,0,-666,397,0.00,0,0,0,1),(143,21,1,'jumpIn',0,0,433,-395,0.00,0,0,0,1),(144,19,1,'speed',0,-1,-608,-233,0.00,30,0,1,1),(145,19,1,'turn',0,0,-608,-233,30.00,27,75,1,1),(146,19,1,'move',0,136,-490,-165,0.00,0,0,1,1),(147,19,1,'turn',0,0,-490,-165,-15.00,14,38,1,1),(148,20,1,'speed',0,-1,-666,397,0.00,30,0,1,1),(149,20,1,'speed',0,-1,-666,397,0.00,30,0,1,1),(150,20,1,'speed',0,-1,-666,397,0.00,30,0,1,1),(151,20,1,'speed',0,-1,-666,397,0.00,30,0,1,1),(152,20,1,'move',0,93,-573,397,0.00,0,0,1,1),(153,21,1,'speed',0,-1,433,-395,0.00,30,0,1,1),(154,21,1,'speed',0,-1,433,-395,0.00,30,0,1,1),(155,21,1,'turn',0,0,433,-395,-20.00,15,48,1,1),(156,21,1,'move',0,117,323,-355,0.00,0,0,1,1),(157,22,2,'move',0,93,-362,-164,0.00,0,0,0,1),(158,23,2,'move',0,16,348,-285,0.00,0,0,0,1),(159,24,2,'move',0,14,156,-288,0.00,0,0,0,1),(160,25,2,'move',0,21,-346,319,0.00,0,0,0,1),(161,26,2,'deploy',0,0,323,-355,0.00,0,0,0,1),(162,27,2,'deploy',0,0,-490,-165,0.00,0,0,0,1),(163,28,2,'deploy',0,0,-573,397,-40.01,0,0,0,1),(164,21,2,'turn',0,0,323,-355,30.00,23,72,1,1),(165,21,2,'move',0,117,208,-375,0.00,0,0,1,1),(166,19,2,'move',0,38,-453,-155,0.00,0,0,1,1),(167,19,2,'turn',0,0,-453,-155,30.00,27,75,1,1),(168,19,2,'move',0,98,-384,-86,0.00,0,0,1,1),(169,20,2,'move',0,93,-480,397,0.00,0,0,1,1),(170,20,2,'turn',0,0,-480,397,-45.00,46,0,1,1),(171,27,2,'move',0,360,-344,-336,310.50,0,0,0,1),(172,28,2,'move',0,175,-449,274,315.33,0,0,0,1),(173,26,2,'move',0,125,232,-270,136.88,0,0,0,1),(174,24,3,'move',0,14,169,-284,0.00,0,0,0,1),(175,25,3,'move',0,21,-367,248,0.00,0,0,0,1),(176,22,3,'move',0,93,-414,-87,0.00,0,0,0,1),(177,23,3,'move',0,16,360,-275,0.00,0,0,0,1),(187,29,3,'deploy',0,0,-384,-86,0.00,0,0,0,1),(192,19,3,'turn',0,0,-384,-86,-30.00,27,75,1,1),(193,19,3,'move',0,75,-312,-67,0.00,0,0,1,1),(194,19,3,'turn',0,0,-312,-67,-30.00,33,61,1,1),(195,19,3,'move',0,61,-253,-83,0.00,0,0,1,1),(196,19,3,'turn',0,0,-253,-83,-11.00,10,28,1,1),(197,20,3,'speed',0,1,-480,397,0.00,30,0,1,1),(198,20,3,'speed',0,1,-480,397,0.00,30,0,1,1),(199,20,3,'speed',0,1,-480,397,0.00,30,0,1,1),(200,20,3,'move',0,162,-365,282,0.00,0,0,1,1),(201,21,3,'turn',0,0,208,-375,-30.00,23,72,1,1),(202,21,3,'move',0,72,140,-350,0.00,0,0,1,1),(203,21,3,'turn',0,0,140,-350,-30.00,32,45,1,1),(204,21,3,'move',0,45,111,-316,0.00,0,0,1,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `damages`
--

LOCK TABLES `damages` WRITE;
/*!40000 ALTER TABLE `damages` DISABLE KEYS */;
INSERT INTO `damages` VALUES (1,10,1,1,6,1,3,0,'Beam',91,0,19,0,26,0,19,0,'p;',0),(2,10,1,1,6,1,3,0,'Beam',91,0,19,0,26,0,19,0,'p;',0),(3,13,1,1,6,1,3,0,'Beam',107,0,18,0,35,0,18,0,'p;',0),(4,12,1,1,6,1,3,0,'Pulse',36,0,64,0,8,0,16,0,'p;v4;',0),(5,14,1,1,6,1,3,0,'Pulse',108,0,150,0,66,0,15,0,'p;v10;',0),(6,16,1,1,12,1,3,0,'Warhead',28,0,17,0,11,0,17,0,'p;',0),(7,11,1,1,6,5,3,0,'Pulse',48,0,72,20,4,0,18,0,'p;v4;c;',0),(8,13,1,1,6,8,3,0,'Beam',107,0,8,40,5,0,8,1,'p;o4;',0),(9,15,1,1,6,9,3,0,'Pulse',68,0,36,80,20,0,6,1,'p;v6;',0),(10,16,1,1,12,13,3,0,'Warhead',29,0,14,15,0,0,14,0,'p;',0),(11,16,1,1,12,13,3,0,'Warhead',29,0,14,15,0,0,14,0,'p;',0),(12,16,1,1,12,13,3,0,'Warhead',29,0,13,16,0,0,13,0,'p;',0),(13,3,1,2,0,5,3,0,'Particle',36,0,8,0,28,0,16,0,'p;',0),(14,6,1,2,0,5,3,0,'Particle',36,0,8,0,28,0,16,0,'p;',0),(15,9,1,2,0,5,3,0,'Pulse',29,0,22,0,1,0,15,0,'p;v2;',0),(16,3,1,2,0,10,3,0,'Particle',36,0,8,0,28,0,16,0,'p;',0),(17,8,1,2,0,10,3,0,'Pulse',44,0,30,0,1,0,16,0,'b;v3;',0),(18,19,1,1,12,1,4,0,'Pulse',48,9,39,0,0,0,19,0,'b;v3;',0),(19,20,1,1,12,1,4,0,'Beam',93,3,15,0,13,0,18,0,'p;',0),(20,20,1,1,12,1,4,0,'Beam',93,3,15,0,13,0,18,0,'p;',0),(21,21,1,1,12,1,4,0,'Beam',106,3,14,0,18,0,17,0,'p;',0),(22,21,1,1,12,1,4,0,'Beam',106,3,14,0,18,0,17,0,'p;',0),(23,21,1,1,12,13,4,0,'Beam',106,3,11,14,7,0,14,1,'p;o6;',0),(24,18,1,1,12,15,4,0,'Pulse',45,9,42,12,0,0,11,0,'p;v3;',0),(25,20,1,1,12,15,4,0,'Beam',93,3,7,16,5,0,10,1,'p;o2;',0),(26,26,1,2,0,5,4,0,'Pulse',27,0,28,0,0,0,15,0,'b;v4;',0),(27,29,1,2,0,5,4,0,'Pulse',12,0,12,0,0,0,13,0,'b;v2;',0),(28,32,1,2,0,5,4,0,'Pulse',28,0,38,0,6,0,13,0,'p;v4;',0),(29,24,1,2,0,10,4,0,'Pulse',13,0,14,0,0,0,15,0,'b;v2;',0),(30,27,1,2,0,10,4,0,'Pulse',12,0,12,0,0,0,14,0,'b;v2;',0),(31,30,1,2,0,10,4,0,'Pulse',26,0,26,0,0,0,14,0,'b;v4;',0),(32,34,1,9,0,5,5,0,'Particle',32,0,4,0,26,0,4,1,'p;',0),(33,34,1,9,0,9,5,0,'Particle',29,0,4,0,25,0,4,0,'p;',0),(34,34,1,9,0,11,5,0,'Particle',33,0,4,0,26,0,4,1,'p;',0),(35,34,1,9,0,19,5,0,'Particle',29,0,4,0,25,0,4,0,'p;',0),(36,35,1,2,0,5,5,0,'Particle',32,0,12,0,20,0,12,0,'p;',0),(37,35,1,2,0,10,5,0,'Particle',27,0,13,0,14,0,13,0,'p;',0),(38,45,1,1,12,1,5,0,'Particle',10,0,10,0,0,0,13,0,'b;',0),(39,45,1,1,12,1,5,0,'Particle',10,0,10,0,0,0,13,0,'b;',0),(40,46,1,1,12,1,5,0,'Particle',10,0,10,0,0,0,13,0,'b;',0),(41,46,1,1,12,14,5,0,'Particle',13,0,12,14,0,0,6,0,'p;',0),(42,39,1,2,0,5,5,0,'Pulse',11,0,12,0,0,0,11,0,'b;v2;',0),(43,37,1,2,0,10,5,0,'Pulse',12,0,12,0,0,0,12,0,'b;v2;',0),(44,40,1,2,0,10,5,0,'Pulse',10,0,10,0,0,0,12,0,'b;v2;',0),(45,42,1,2,0,10,5,0,'Pulse',12,0,22,0,2,0,11,0,'p;v2;',0),(46,43,1,2,0,10,5,0,'Pulse',11,0,20,0,2,0,10,0,'p;v2;',0),(47,36,1,3,12,1,5,0,'Pulse',31,0,23,0,1,0,15,0,'p;v2;',0),(48,48,1,9,0,1,6,0,'Particle',38,0,4,0,26,0,4,1,'p;',0),(49,48,1,9,0,15,6,0,'Particle',36,0,4,0,26,0,4,1,'p;',0),(50,49,1,2,0,10,6,0,'Particle',43,0,10,0,33,0,10,0,'p;',0),(51,50,1,3,6,1,6,0,'Particle',29,0,18,0,11,0,18,0,'p;',0),(52,50,1,3,16,2,6,0,'Particle',31,0,16,15,0,0,16,0,'p;',0),(53,62,1,1,12,1,6,0,'Warhead',31,3,13,0,15,0,16,0,'p;',0),(54,62,1,1,12,1,6,0,'Warhead',31,3,12,0,16,0,15,0,'p;',0),(55,62,1,1,12,4,6,0,'Warhead',31,3,12,16,0,0,15,0,'p;',0),(56,54,1,2,0,5,6,0,'Beam',194,0,11,0,53,0,11,0,'p;',0),(57,54,1,2,0,5,6,0,'Beam',194,0,10,0,54,0,10,0,'p;',0),(58,54,1,2,0,5,6,0,'Beam',194,0,10,0,54,0,10,0,'p;',0),(59,55,1,2,0,5,6,0,'Pulse',43,0,30,0,13,0,10,0,'p;v3;',0),(60,51,1,2,0,10,6,0,'Particle',36,0,5,0,31,0,9,0,'p;',0),(61,56,1,2,0,10,6,0,'Pulse',28,0,18,0,10,0,9,0,'p;v2;',0),(62,58,1,2,0,10,6,0,'Pulse',25,0,36,0,14,0,9,0,'p;v4;',0),(63,59,1,2,0,10,6,0,'Pulse',12,0,14,0,10,0,7,0,'p;v2;',0),(64,60,1,2,0,10,6,0,'Pulse',13,0,14,0,12,0,7,0,'p;v2;',0),(65,61,1,2,0,10,6,0,'Pulse',22,0,24,0,20,0,6,0,'p;v4;',0),(66,63,3,21,15,1,1,0,'Particle',63,0,17,0,46,0,17,0,'p;',0),(67,64,3,19,6,1,1,0,'Beam',220,0,19,0,54,0,19,0,'p;',0),(68,64,3,19,6,1,1,0,'Beam',220,0,19,0,54,0,19,0,'p;',0),(69,65,3,19,6,1,1,0,'Beam',60,0,18,0,2,0,18,0,'p;',0),(70,65,3,19,6,1,1,0,'Beam',60,0,18,0,2,0,18,0,'p;',0),(71,64,3,19,6,7,1,0,'Beam',220,0,11,44,18,0,11,1,'p;o3;',0),(72,65,3,19,6,10,1,0,'Beam',60,0,8,12,0,0,8,0,'p;',0),(73,77,3,19,19,1,2,0,'Area',135,0,18,0,117,0,18,0,'p;',0),(74,77,3,19,19,20,2,0,'Area',26,0,14,12,0,0,14,0,'p;',0),(75,77,3,19,19,21,2,0,'Area',22,0,8,14,0,0,8,0,'p;',0),(76,77,3,19,19,22,2,0,'Area',26,0,8,18,0,0,8,0,'p;',0),(77,75,3,21,6,1,2,0,'Particle',68,0,20,0,48,0,20,0,'p;',0),(78,76,3,26,0,5,2,0,'Particle',60,0,3,0,22,0,3,1,'p;',0),(79,76,3,26,0,17,2,0,'Particle',76,0,3,0,22,0,3,1,'p;',0),(80,76,3,26,0,19,2,0,'Particle',71,0,3,0,22,0,3,1,'p;',0),(81,78,3,19,19,1,2,0,'Beam',94,0,17,0,14,0,17,0,'p;',0),(82,78,3,19,19,1,2,0,'Beam',94,0,17,0,14,0,17,0,'p;',0),(83,78,3,19,19,1,2,0,'Beam',94,0,16,0,15,0,16,0,'p;',0);
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
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fireorders`
--

LOCK TABLES `fireorders` WRITE;
/*!40000 ALTER TABLE `fireorders` DISABLE KEYS */;
INSERT INTO `fireorders` VALUES (1,1,2,1,0,424,63,9,0,0,'',0,2),(2,1,3,3,1,-282,-143,11,4,0,'',0,2),(3,1,3,1,2,19,-293,7,2,75,'7;42;',2,1),(4,1,3,1,2,19,-293,8,1,71,'96;',0,1),(5,1,3,1,2,19,-293,10,1,71,'-148;',0,1),(6,1,3,1,2,19,-293,11,2,75,'79;5;',1,1),(7,1,3,1,2,19,-293,13,1,73,'86;',0,1),(8,1,3,1,2,24,-294,14,1,60,'24;',1,1),(9,1,3,1,2,24,-294,15,1,60,'60;',1,1),(10,1,3,2,1,-155,-224,6,1,107,'45;',1,1),(11,1,3,2,1,-155,-224,7,1,96,'94;',1,1),(12,1,3,2,1,-155,-224,8,1,96,'96;',1,1),(13,1,3,2,1,-155,-224,11,1,107,'31;',1,1),(14,1,3,2,1,-155,-224,12,1,96,'29;',1,1),(15,1,3,2,1,-155,-224,13,1,96,'58;',1,1),(16,1,3,10,1,0,0,2,4,80,'55;22;63;65;',4,1),(17,1,4,3,1,-159,-228,11,4,0,'',0,2),(18,1,4,3,1,-10,-189,7,1,59,'32;',1,1),(19,1,4,3,1,-10,-189,8,1,59,'32;',1,1),(20,1,4,3,1,-10,-189,17,1,86,'57;',1,1),(21,1,4,3,1,-10,-189,18,1,86,'50;',1,1),(22,1,4,1,2,-145,-208,18,1,46,'67;',0,1),(23,1,4,9,2,-145,-213,2,1,60,'84;',0,1),(24,1,4,9,2,-145,-213,4,1,60,'49;',1,1),(25,1,4,9,2,-145,-213,6,1,60,'64;',0,1),(26,1,4,9,2,-145,-213,8,1,60,'26;',1,1),(27,1,4,9,2,-145,-213,10,1,60,'41;',1,1),(28,1,4,9,2,-145,-213,12,1,60,'76;',0,1),(29,1,4,9,2,-145,-213,14,1,60,'35;',1,1),(30,1,4,9,2,-145,-213,16,1,60,'10;',1,1),(31,1,4,9,2,-145,-213,18,1,60,'90;',0,1),(32,1,4,9,2,-145,-213,20,1,60,'26;',1,1),(33,1,4,11,1,0,0,2,4,40,'52;47;53;81;',0,1),(34,1,5,6,9,0,0,2,70,9,'115;23;9;7;',4,1),(35,1,5,6,2,0,0,2,16,18,'124;23;18;8;',2,1),(36,1,5,1,3,-31,-70,14,1,105,'94;',1,1),(37,1,5,9,2,-201,-3,2,1,60,'60;',1,1),(38,1,5,9,2,-201,-3,4,1,60,'73;',0,1),(39,1,5,9,2,-201,-3,8,1,60,'32;',1,1),(40,1,5,9,2,-201,-3,10,1,60,'32;',1,1),(41,1,5,9,2,-201,-3,14,1,60,'83;',0,1),(42,1,5,9,2,-201,-3,16,1,60,'57;',1,1),(43,1,5,9,2,-201,-3,18,1,60,'40;',1,1),(44,1,5,9,2,-201,-3,20,1,60,'99;',0,1),(45,1,5,3,1,69,-54,14,2,133,'62;48;',2,1),(46,1,5,3,1,69,-54,15,2,133,'6;7;',2,1),(47,1,6,3,1,60,-53,11,4,0,'',0,2),(48,1,6,4,9,0,0,2,35,8,'84;21;8;5;',2,1),(49,1,7,4,2,0,0,2,10,17,'92;21;17;5;',1,1),(50,1,7,6,3,0,0,2,6,28,'90;23;28;2;93;21;78;78;73;',2,1),(51,1,6,1,2,0,0,7,2,76,'9;-91;',1,1),(52,1,6,1,2,0,0,10,1,74,'77;',0,1),(53,1,6,1,2,0,0,11,2,76,'93;-125;',0,1),(54,1,6,1,2,0,0,20,1,68,'1;',1,1),(55,1,6,1,2,0,0,21,1,68,'37;',1,1),(56,1,6,1,2,0,0,22,1,68,'55;',1,1),(57,1,6,9,2,-63,150,4,1,60,'91;',0,1),(58,1,6,9,2,-63,150,8,1,60,'14;',1,1),(59,1,6,9,2,-63,150,14,1,60,'54;',1,1),(60,1,6,9,2,-63,150,18,1,60,'47;',1,1),(61,1,6,9,2,-63,150,20,1,60,'14;',1,1),(62,1,6,12,1,0,0,2,4,80,'59;69;17;93;',3,1),(63,3,1,23,21,0,0,2,2,37,'52;31;37;94;10;',1,1),(64,3,1,21,19,-489,-157,9,1,83,'81;',1,1),(65,3,1,21,19,-489,-157,11,1,83,'2;',1,1),(66,3,1,19,21,329,-351,7,2,89,'-78;92;',0,1),(67,3,1,19,21,329,-351,11,2,89,'-27;-28;',0,1),(68,3,1,19,21,329,-351,20,1,89,'-69;',0,1),(69,3,2,21,0,-370,-112,8,1,0,'-370;-112;19;',1,1),(70,3,2,21,0,-486,-166,17,0,0,'',0,2),(71,3,2,19,0,-256,-439,9,0,0,'',0,2),(72,3,2,20,21,320,-361,7,3,0,'',0,2),(73,3,2,20,21,320,-361,11,3,0,'',0,2),(74,3,2,24,26,0,0,2,10,9,'15;22;9;1;',0,1),(75,3,2,23,21,0,0,2,1,37,'19;31;37;34;',1,1),(76,3,2,23,26,0,0,2,20,12,'81;31;12;2;',3,1),(77,3,2,21,19,-370,-112,8,0,0,'-370;-112;',1,1),(78,3,2,21,19,-389,-89,20,1,94,'18;',1,1),(79,3,3,19,0,-343,-341,9,0,0,'',0,2);
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `games`
--

LOCK TABLES `games` WRITE;
/*!40000 ALTER TABLE `games` DISABLE KEYS */;
INSERT INTO `games` VALUES (1,'myGame','active',6,3,3500,1500,11,3,10,10,4,75,200),(2,'myGame','active',-1,0,3500,1500,11,3,10,10,4,75,200),(3,'myGame','active',3,0,3500,1500,11,3,10,10,4,75,200),(4,'myGame','open',0,3,3500,1500,11,3,10,10,4,75,200);
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `globals`
--

LOCK TABLES `globals` WRITE;
/*!40000 ALTER TABLE `globals` DISABLE KEYS */;
INSERT INTO `globals` VALUES (1,1,0,0,'Morale',0,100.00,'',''),(2,2,0,0,'Morale',0,100.00,'',''),(3,3,0,0,'Morale',0,100.00,'',''),(4,5,0,0,'Morale',0,100.00,'',''),(5,6,0,0,'Morale',0,115.00,'','');
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loads`
--

LOCK TABLES `loads` WRITE;
/*!40000 ALTER TABLE `loads` DISABLE KEYS */;
INSERT INTO `loads` VALUES (1,13,15,'Sentri',8),(2,14,13,'Javelin',4),(3,14,20,'Javelin',4);
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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `missions`
--

LOCK TABLES `missions` WRITE;
/*!40000 ALTER TABLE `missions` DISABLE KEYS */;
INSERT INTO `missions` VALUES (1,8,'2',2,2,349,-411,0),(2,9,'2',2,3,419,69,0),(3,9,'2',3,2,164,-411,6),(4,10,'2',3,1,-288,-148,3),(5,11,'2',4,1,-154,-226,4),(6,12,'2',6,1,65,-56,6),(7,26,'2',2,20,-573,397,0),(8,27,'2',1,21,-256,-439,0),(9,28,'2',2,21,323,-355,0),(10,29,'2',3,27,-256,-439,0),(11,-48,'2',3,27,-256,-439,0),(12,26,'1',3,0,232,-270,3);
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playerstatus`
--

LOCK TABLES `playerstatus` WRITE;
/*!40000 ALTER TABLE `playerstatus` DISABLE KEYS */;
INSERT INTO `playerstatus` VALUES (1,1,1,6,3,'Earth Alliance',775,3945,1540,385,1150,'waiting'),(2,2,1,6,3,'Minbari Federation',1450,3411,1456,364,1456,'waiting'),(3,1,2,-1,0,'Centauri Republic',1250,2010,0,0,0,'waiting'),(4,2,2,-1,0,'',0,3500,0,0,0,'waiting'),(5,1,3,3,1,'Earth Alliance',1235,1961,1540,385,770,'waiting'),(6,2,3,3,1,'Narn Regime',850,2420,1540,385,770,'ready'),(7,1,4,0,3,'',0,3500,0,0,0,'joined');
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
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `powers`
--

LOCK TABLES `powers` WRITE;
/*!40000 ALTER TABLE `powers` DISABLE KEYS */;
INSERT INTO `powers` VALUES (1,2,7,1,'-1',0),(2,2,8,1,'-1',0),(3,2,11,1,'-1',0),(4,2,12,1,'-1',0),(5,1,14,1,'-1',0),(6,1,15,1,'-1',0),(7,1,21,1,'-1',0),(8,1,22,1,'-1',0),(9,1,14,2,'-1',0),(10,1,15,2,'-1',0),(11,1,21,2,'-1',0),(12,1,22,2,'-1',0),(13,2,7,2,'-1',0),(14,2,8,2,'-1',0),(15,2,11,2,'-1',0),(16,2,12,2,'-1',0),(17,1,14,3,'-1',0),(18,1,15,3,'-1',0),(19,1,21,3,'-1',0),(20,1,22,3,'-1',0),(21,1,4,3,'1',3),(22,3,11,3,'1',0),(23,3,11,3,'1',0),(24,3,11,3,'1',0),(25,3,11,3,'1',0),(26,2,7,3,'-1',0),(27,2,8,3,'-1',0),(28,2,11,3,'-1',0),(29,2,12,3,'-1',0),(30,3,11,4,'1',0),(31,3,11,4,'1',0),(32,3,11,4,'1',0),(33,3,11,4,'1',0),(34,2,7,4,'-1',0),(35,2,8,4,'-1',0),(36,2,11,4,'-1',0),(37,2,12,4,'-1',0),(38,1,12,4,'1',4),(39,1,14,4,'-1',0),(40,1,15,4,'-1',0),(41,1,21,4,'-1',0),(42,1,22,4,'-1',0),(43,9,2,4,'-2',0),(44,9,4,4,'-2',0),(45,9,6,4,'-2',0),(46,9,8,4,'-2',0),(47,9,10,4,'-2',0),(48,9,12,4,'-2',0),(49,9,14,4,'-2',0),(50,9,16,4,'-2',0),(51,9,18,4,'-2',0),(52,9,20,4,'-2',0),(53,1,14,5,'-1',0),(54,1,21,5,'-1',0),(55,1,22,5,'-1',0),(56,2,7,5,'-1',0),(57,2,8,5,'-1',0),(58,2,11,5,'-1',0),(59,2,12,5,'-1',0),(60,9,2,5,'-2',0),(61,9,4,5,'-2',0),(62,9,8,5,'-2',0),(63,9,10,5,'-2',0),(64,9,14,5,'-2',0),(65,9,16,5,'-2',0),(66,9,18,5,'-2',0),(67,9,20,5,'-2',0),(68,1,12,6,'1',4),(69,1,14,6,'-1',0),(70,1,15,6,'-1',0),(71,1,21,6,'-1',0),(72,1,22,6,'-1',0),(73,3,11,6,'1',0),(74,3,11,6,'1',0),(75,3,11,6,'1',0),(76,3,11,6,'1',0),(77,2,7,6,'-1',0),(78,2,8,6,'-1',0),(79,2,11,6,'-1',0),(80,2,12,6,'-1',0),(81,9,4,6,'-2',0),(82,9,8,6,'-2',0),(83,9,14,6,'-2',0),(84,9,18,6,'-2',0),(85,9,20,6,'-2',0),(86,21,13,1,'0',0),(87,19,14,1,'-1',0),(88,19,15,1,'-1',0),(89,19,21,1,'-1',0),(90,19,22,1,'-1',0),(91,21,13,2,'0',0),(92,19,14,2,'-1',0),(93,19,15,2,'-1',0),(94,19,21,2,'-1',0),(95,19,22,2,'-1',0),(96,20,7,2,'1',0),(97,20,7,2,'1',0),(98,20,7,2,'1',0),(99,20,11,2,'1',0),(100,20,11,2,'1',0),(101,20,11,2,'1',0),(102,19,14,3,'-1',0),(103,19,15,3,'-1',0),(104,19,21,3,'-1',0),(105,19,22,3,'-1',0),(106,20,7,3,'0',0),(107,20,11,3,'0',0),(108,21,13,3,'0',0);
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
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sensors`
--

LOCK TABLES `sensors` WRITE;
/*!40000 ALTER TABLE `sensors` DISABLE KEYS */;
INSERT INTO `sensors` VALUES (1,3,4,1,-1.00,102,0),(2,2,3,1,-1.00,102,0),(3,1,4,1,-1.00,102,0),(4,1,4,2,-1.00,102,0),(5,3,4,2,-1.00,102,0),(6,2,3,2,-1.00,102,0),(7,1,4,3,0.56,276,0),(8,3,4,3,-1.00,102,0),(9,2,3,3,0.58,264,0),(10,3,4,4,338.50,458,0),(11,2,3,4,-1.00,102,0),(12,1,4,4,40.34,418,1),(13,1,4,5,-1.00,102,0),(14,3,4,5,-1.00,102,0),(15,2,3,5,-1.00,102,0),(16,1,4,6,-1.00,102,0),(17,3,4,6,-1.00,102,0),(18,2,3,6,-1.00,102,0),(19,21,4,1,-1.00,113,0),(20,19,4,1,-1.00,102,0),(21,20,3,1,-1.00,62,0),(22,21,4,2,-1.00,113,0),(23,19,4,2,-1.00,102,0),(24,20,3,2,-1.00,62,0),(25,19,4,3,-1.00,102,0),(26,20,3,3,-1.00,62,0),(27,21,4,3,-1.00,113,0);
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
INSERT INTO `subunits` VALUES (1,2,1,'WhiteStar'),(2,2,1,'WhiteStar'),(3,8,6,'Gorith'),(4,9,10,'Aurora'),(5,10,4,'Vran'),(6,11,4,'Vran'),(7,12,4,'Vran'),(8,20,1,'Hermes'),(9,20,1,'Hermes'),(10,26,10,'Gorith'),(11,27,5,'Aurora'),(12,28,8,'Naga'),(13,29,5,'Aurora');
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
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `systemcrits`
--

LOCK TABLES `systemcrits` WRITE;
/*!40000 ALTER TABLE `systemcrits` DISABLE KEYS */;
INSERT INTO `systemcrits` VALUES (1,1,2,3,'Morale',-2,-5.00),(2,1,5,3,'Overload',0,-4.00),(3,1,13,3,'Damage',0,-30.00),(4,2,6,3,'Damage',0,-30.00),(5,2,8,3,'Damage',0,-30.00),(6,2,9,3,'Output',0,-15.00),(7,1,5,4,'Overload',0,-5.43),(8,1,14,5,'Damage',0,-30.00),(9,9,9,5,'Disabled',0,0.00),(10,1,4,6,'Output',0,-15.00),(11,2,5,6,'Disabled',0,0.00),(12,2,11,6,'Damage',0,-30.00),(13,2,13,6,'Destroyed',0,-30.00),(14,2,14,6,'Output',0,-15.00),(15,3,2,6,'Reactor',0,-7.50),(16,19,2,1,'Morale',-2,-5.00),(17,19,5,1,'Overload',0,-3.41);
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
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `units`
--

LOCK TABLES `units` WRITE;
/*!40000 ALTER TABLE `units` DISABLE KEYS */;
INSERT INTO `units` VALUES (1,1,1,4,'Hyperion','',1055,775,'bought',1,1,0,0,0,65,-56,85.72,12,155,0,0,0,5,3,0,''),(2,1,2,3,'Squadron','',800,800,'bought',1,1,0,0,0,-201,-3,59.92,0,231,0,0,0,5,3,0,''),(3,1,2,4,'Varnic','',789,650,'bought',0,1,0,0,0,-24,-74,194.80,55,155,0,0,0,5,3,0,''),(4,1,0,0,'Obstacle','',36,47,'deployed',0,0,0,0,0,-55,161,327.00,195,21,30,2,0,6,-1,0,''),(5,1,0,0,'Obstacle','',21,27,'deployed',0,0,0,0,0,212,-153,127.00,189,40,24,1,0,6,-1,0,''),(6,1,0,0,'Obstacle','',25,33,'deployed',0,0,0,0,0,-160,-104,289.00,152,69,18,1,0,6,-1,0,''),(7,1,0,0,'Obstacle','',17,22,'deployed',0,0,0,0,0,271,-734,269.00,178,53,19,1,0,6,-1,0,''),(9,1,1,2,'Flight','Wyvern-Phi',280,280,'deployed',0,2,0,0,0,-201,-3,691.02,0,675,0,0,0,5,3,0,''),(10,1,2,1,'Salvo','',0,0,'deployed',0,3,0,0,1,-154,-226,-82.73,0,700,0,0,0,3,3,0,''),(11,1,2,1,'Salvo','',0,0,'deployed',0,4,0,0,1,-8,-192,-6.97,0,700,0,0,0,4,3,0,''),(12,1,2,1,'Salvo','',0,0,'deployed',0,6,0,0,0,9,-72,11.43,0,0,0,0,0,6,-1,0,''),(13,2,1,4,'Altarian','',718,510,'bought',0,1,0,0,0,0,0,0.00,0,0,0,0,0,0,0,0,''),(14,2,1,4,'Centurion','',772,740,'bought',1,1,0,0,0,0,0,0.00,0,0,0,0,0,0,0,0,''),(15,2,0,0,'Obstacle','',46,60,'deployed',0,0,0,0,0,-290,-207,199.00,134,29,15,2,0,-1,-1,0,''),(16,2,0,0,'Obstacle','',16,21,'deployed',0,0,0,0,0,-288,270,32.00,138,76,21,1,0,-1,-1,0,''),(17,2,0,0,'Obstacle','',84,109,'deployed',0,0,0,0,0,-104,203,172.00,152,14,30,4,0,-1,-1,0,''),(18,2,0,0,'Obstacle','',84,109,'deployed',0,0,0,0,0,305,-225,1.00,191,14,28,4,0,-1,-1,0,''),(19,3,1,4,'Hyperion','',1055,775,'bought',1,1,0,0,0,-384,-86,45.00,0,136,0,0,0,2,3,0,''),(20,3,1,3,'Squadron','',484,460,'bought',0,1,0,0,0,-480,397,315.00,0,93,0,0,0,2,3,0,''),(21,3,2,4,'GQuan','',1080,850,'bought',1,1,0,0,0,208,-375,190.00,0,117,0,0,0,2,3,0,''),(22,3,0,0,'Obstacle','',25,33,'deployed',0,0,0,0,0,-414,-87,124.00,91,93,16,1,0,3,-1,0,''),(23,3,0,0,'Obstacle','',60,78,'deployed',0,0,0,0,0,360,-275,40.00,171,16,29,4,0,3,-1,0,''),(24,3,0,0,'Obstacle','',69,90,'deployed',0,0,0,0,0,169,-284,16.00,174,14,32,3,0,3,-1,0,''),(25,3,0,0,'Obstacle','',88,114,'deployed',0,0,0,0,0,-367,248,184.00,134,21,31,4,0,3,-1,0,''),(26,3,2,2,'Flight','yellow-Alpha',230,230,'deployed',0,2,0,0,0,232,-270,136.88,0,250,0,0,0,2,3,0,''),(27,3,1,2,'Flight','Eagle-Alpha',140,140,'deployed',0,2,0,0,0,-344,-336,310.50,0,450,0,0,0,2,3,0,''),(28,3,1,1,'Salvo','',0,0,'deployed',0,2,0,0,0,-449,274,235.31,0,350,0,0,0,2,3,0,''),(29,3,1,2,'Flight','Dragon-Phi',140,140,'deployed',0,3,0,0,0,-384,-86,0.00,0,0,0,0,0,3,-1,0,'');
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

-- Dump completed on 2018-11-11 22:03:12

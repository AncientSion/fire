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
) ENGINE=InnoDB AUTO_INCREMENT=229 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actions`
--

LOCK TABLES `actions` WRITE;
/*!40000 ALTER TABLE `actions` DISABLE KEYS */;
INSERT INTO `actions` VALUES (1,1,1,'deploy',0,0,-561,15,0.00,0.00,0,0,1,1),(2,4,1,'deploy',0,0,-433,390,0.00,0.00,0,0,1,1),(3,3,1,'deploy',0,0,-468,-311,0.00,0.00,0,0,1,1),(4,2,1,'deploy',0,0,-438,-360,0.00,0.00,0,0,1,1),(5,6,1,'deploy',0,0,450,480,180.00,180.00,0,0,1,1),(6,5,1,'deploy',0,0,522,-238,180.00,180.00,0,0,1,1),(7,8,1,'deploy',0,0,737,-8,180.00,180.00,0,0,1,1),(8,7,1,'deploy',0,0,432,-465,180.00,180.00,0,0,1,1),(9,4,1,'jumpIn',0,53,-432,443,10.00,10.00,0,0,0,1),(10,3,1,'jumpIn',0,101,-556,-360,-21.00,-21.00,0,0,0,1),(11,2,1,'jumpIn',0,129,-519,-460,6.00,6.00,0,0,0,1),(12,1,1,'jumpIn',0,29,-582,-5,10.00,10.00,0,0,0,1),(13,8,1,'jumpIn',0,94,822,32,-27.00,-27.00,0,0,0,1),(14,7,1,'jumpIn',0,70,380,-418,14.00,14.00,0,0,0,1),(15,6,1,'jumpIn',0,46,481,446,-2.00,-2.00,0,0,0,1),(16,5,1,'jumpIn',0,64,579,-208,17.00,17.00,0,0,0,1),(17,6,1,'turn',0,0,481,446,18.94,18.94,19,54,1,1),(18,6,1,'move',0,155,331,406,0.00,0.00,0,0,1,1),(19,5,1,'move',0,91,493,-239,0.00,0.00,0,0,1,1),(20,5,1,'turn',0,0,493,-239,-30.00,-30.00,38,64,1,1),(21,5,1,'move',0,64,429,-243,0.00,0.00,0,0,1,1),(22,5,1,'turn',0,0,429,-243,-18.88,-18.88,32,18,1,1),(23,8,1,'turn',0,0,822,32,30.00,30.00,30,66,1,1),(24,8,1,'move',0,66,762,59,0.00,0.00,0,0,1,1),(25,8,1,'turn',0,0,762,59,18.14,18.14,19,40,1,1),(26,8,1,'move',0,99,664,69,0.00,0.00,0,0,1,1),(27,7,1,'move',0,185,217,-505,0.00,0.00,0,0,1,1),(28,1,1,'move',0,140,-450,43,0.00,0.00,0,0,1,1),(29,1,1,'turn',0,0,-450,43,5.01,5.01,12,0,1,1),(30,4,1,'turn',0,0,-432,443,-30.00,-30.00,30,75,1,1),(31,4,1,'move',0,150,-298,375,0.00,0.00,0,0,1,1),(32,4,1,'turn',0,0,-298,375,14.07,14.07,28,5,1,1),(33,4,1,'move',0,5,-293,375,0.00,0.00,0,0,1,1),(34,3,1,'speed',0,1,-556,-360,0.00,0.00,30,0,1,1),(35,3,1,'speed',0,1,-556,-360,0.00,0.00,30,0,1,1),(36,3,1,'move',0,205,-404,-497,0.00,0.00,0,0,1,1),(37,3,1,'turn',0,0,-404,-497,30.00,30.00,45,58,1,1),(38,2,1,'speed',0,1,-519,-460,0.00,0.00,30,0,1,1),(39,2,1,'speed',0,1,-519,-460,0.00,0.00,30,0,1,1),(40,2,1,'turn',0,0,-519,-460,-24.00,-24.00,30,39,1,1),(41,2,1,'move',0,230,-325,-585,0.00,0.00,0,0,1,1),(42,2,1,'move',0,1,-324,-585,0.00,0.00,0,0,1,1),(52,17,2,'deploy',0,0,429,-243,0.00,0.00,0,0,0,1),(53,18,2,'deploy',0,0,331,406,0.00,0.00,0,0,0,1),(65,19,2,'deploy',0,0,664,69,213.50,0.00,0,0,0,1),(66,1,2,'speed',0,1,-450,43,0.00,0.00,30,0,1,1),(67,1,2,'turn',0,0,-450,43,-30.00,-30.00,34,115,1,1),(68,1,2,'move',0,157,-294,29,0.00,0.00,0,0,1,1),(69,4,2,'turn',0,0,-293,375,30.00,30.00,30,75,1,1),(70,4,2,'move',0,152,-241,518,0.00,0.00,0,0,1,1),(71,4,2,'turn',0,0,-241,518,-30.00,-30.00,50,25,1,1),(72,4,2,'move',0,3,-238,518,0.00,0.00,0,0,1,1),(73,3,2,'move',0,202,-204,-466,0.00,0.00,0,0,1,1),(74,3,2,'move',0,3,-201,-467,0.00,0.00,0,0,1,1),(75,2,2,'turn',0,0,-324,-585,16.84,16.84,21,28,1,1),(76,2,2,'move',0,231,-94,-566,0.00,0.00,0,0,1,1),(77,5,2,'move',0,155,279,-203,0.00,0.00,0,0,1,1),(78,5,2,'turn',0,0,279,-203,9.90,9.90,20,0,1,1),(79,6,2,'turn',0,0,331,406,9.51,9.51,10,28,1,1),(80,6,2,'move',0,155,190,342,0.00,0.00,0,0,1,1),(81,6,2,'turn',0,0,190,342,20.64,20.64,42,0,1,1),(82,8,2,'turn',0,0,664,69,30.00,30.00,30,66,1,1),(83,8,2,'move',0,66,604,42,0.00,0.00,0,0,1,1),(84,8,2,'turn',0,0,604,42,30.00,30.00,30,66,1,1),(85,8,2,'move',0,99,546,-38,0.00,0.00,0,0,1,1),(86,7,2,'turn',0,0,217,-505,-45.00,-45.00,45,59,1,1),(87,7,2,'move',0,59,161,-488,0.00,0.00,0,0,1,1),(88,7,2,'turn',0,0,161,-488,-35.00,-35.00,35,46,1,1),(89,7,2,'move',0,126,83,-389,0.00,0.00,0,0,1,1),(90,18,2,'move',0,125,217,354,204.41,204.41,0,0,0,1),(91,17,2,'move',0,125,308,-211,165.07,165.07,0,0,0,1),(92,19,2,'move',0,175,530,-43,219.95,219.95,0,0,0,1),(113,20,3,'deploy',0,0,-294,29,0.00,0.00,0,0,0,1),(125,21,3,'deploy',0,0,546,-38,219.52,0.00,0,0,0,1),(126,1,3,'turn',0,0,-294,29,-19.95,-19.95,23,77,1,1),(127,1,3,'move',0,157,-152,-37,0.00,0.00,0,0,1,1),(128,4,3,'move',0,22,-216,520,0.00,0.00,0,0,1,1),(129,4,3,'turn',0,0,-216,520,-30.00,-30.00,30,75,1,1),(130,4,3,'move',0,75,-149,487,0.00,0.00,0,0,1,1),(131,4,3,'turn',0,0,-149,487,-30.00,-30.00,37,58,1,1),(132,4,3,'move',0,58,-117,439,0.00,0.00,0,0,1,1),(133,4,3,'turn',0,0,-117,439,-13.00,-13.00,13,33,1,1),(134,2,3,'speed',0,-1,-94,-566,0.00,0.00,30,0,1,1),(135,2,3,'move',0,163,51,-490,0.00,0.00,0,0,1,1),(136,2,3,'turn',0,0,51,-490,45.00,45.00,59,56,1,1),(137,2,3,'move',0,45,80,-456,0.00,0.00,0,0,1,1),(138,5,3,'turn',0,0,279,-203,30.00,30.00,30,86,1,1),(139,5,3,'move',0,155,139,-269,0.00,0.00,0,0,1,1),(140,5,3,'turn',0,0,139,-269,16.94,16.94,34,0,1,1),(141,8,3,'speed',0,-1,546,-38,0.00,0.00,30,0,1,1),(142,8,3,'turn',0,0,546,-38,-30.00,-30.00,27,58,1,1),(143,8,3,'move',0,58,493,-62,0.00,0.00,0,0,1,1),(144,8,3,'turn',0,0,493,-62,-9.00,-9.00,8,18,1,1),(145,8,3,'move',0,87,409,-85,0.00,0.00,0,0,1,1),(146,7,3,'turn',0,0,83,-389,25.30,25.30,26,33,1,1),(147,7,3,'move',0,185,-82,-306,0.00,0.00,0,0,1,1),(148,7,3,'turn',0,0,-82,-306,-45.00,-45.00,54,48,1,1),(149,6,3,'move',0,76,141,283,0.00,0.00,0,0,1,1),(150,6,3,'turn',0,0,141,283,-30.00,-30.00,33,79,1,1),(151,6,3,'move',0,79,65,262,0.00,0.00,0,0,1,1),(152,6,3,'turn',0,0,65,262,-30.00,-30.00,37,66,1,1),(153,3,3,'speed',0,1,-201,-467,0.00,0.00,30,0,1,1),(154,3,3,'turn',0,0,-201,-467,30.00,30.00,41,78,1,1),(155,3,3,'move',0,223,-28,-326,0.00,0.00,0,0,1,1),(156,3,3,'move',0,2,-26,-325,0.00,0.00,0,0,1,1),(157,20,3,'move',0,160,-160,116,32.98,32.98,0,0,0,1),(158,19,3,'move',0,350,272,-280,222.55,222.55,0,0,0,1),(159,18,3,'move',0,178,65,262,211.18,211.18,0,0,0,1),(160,17,3,'move',0,179,139,-269,198.94,198.94,0,0,0,1),(161,21,3,'move',0,175,416,-155,221.89,221.89,0,0,0,1),(192,22,4,'deploy',0,0,-152,-37,54.03,0.00,0,0,0,1),(193,1,4,'speed',0,-1,-152,-37,0.00,0.00,30,0,1,1),(194,1,4,'turn',0,0,-152,-37,22.00,22.00,22,76,1,1),(195,1,4,'move',0,140,-12,-44,0.00,0.00,0,0,1,1),(196,4,4,'move',0,33,-105,408,0.00,0.00,0,0,1,1),(197,4,4,'turn',0,0,-105,408,-30.00,-30.00,30,75,1,1),(198,4,4,'move',0,121,-191,322,0.00,0.00,0,0,1,1),(199,4,4,'move',0,1,-191,321,0.00,0.00,0,0,1,1),(200,3,4,'speed',0,-1,-26,-325,0.00,0.00,30,0,1,1),(201,3,4,'speed',0,-1,-26,-325,0.00,0.00,30,0,1,1),(202,3,4,'speed',0,-1,-26,-325,0.00,0.00,30,0,1,1),(203,3,4,'move',0,165,131,-274,0.00,0.00,0,0,1,1),(204,2,4,'speed',0,-1,80,-456,0.00,0.00,30,0,1,1),(205,2,4,'move',0,173,242,-395,0.00,0.00,0,0,1,1),(206,2,4,'turn',0,0,242,-395,30.09,30.09,53,12,1,1),(207,2,4,'move',0,12,244,-383,0.00,0.00,0,0,1,1),(208,5,4,'turn',0,0,139,-269,-30.00,-30.00,30,86,1,1),(209,5,4,'move',0,155,-13,-301,0.00,0.00,0,0,1,1),(210,5,4,'turn',0,0,-13,-301,-30.00,-30.00,40,58,1,1),(211,6,4,'move',0,66,1,279,0.00,0.00,0,0,1,1),(212,6,4,'turn',0,0,1,279,30.00,30.00,30,86,1,1),(213,6,4,'move',0,86,-82,257,0.00,0.00,0,0,1,1),(214,6,4,'move',0,3,-85,256,0.00,0.00,0,0,1,1),(215,6,4,'turn',0,0,-85,256,30.00,30.00,40,58,1,1),(216,8,4,'speed',0,-1,409,-85,0.00,0.00,30,0,1,1),(217,8,4,'turn',0,0,409,-85,-30.00,-30.00,23,50,1,1),(218,8,4,'move',0,125,288,-53,0.00,0.00,0,0,1,1),(219,8,4,'turn',0,0,288,-53,-16.00,-16.00,12,27,1,1),(220,7,4,'speed',0,-1,-82,-306,0.00,0.00,30,0,1,1),(221,7,4,'move',0,162,-133,-152,0.00,0.00,0,0,1,1),(222,7,4,'turn',0,0,-133,-152,-45.00,-45.00,52,36,1,1),(223,20,4,'move',0,159,-85,256,61.82,61.82,0,0,0,1),(224,22,4,'move',0,301,-85,256,77.12,77.12,0,0,0,1),(225,21,4,'move',0,286,244,-383,232.97,232.97,0,0,0,1),(226,19,4,'move',0,107,244,-383,254.79,254.79,0,0,0,1),(227,18,4,'move',0,150,-85,256,182.29,182.29,0,0,0,1),(228,17,4,'move',0,125,224,-361,312.65,312.65,0,0,0,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `damages`
--

LOCK TABLES `damages` WRITE;
/*!40000 ALTER TABLE `damages` DISABLE KEYS */;
INSERT INTO `damages` VALUES (1,4,2,1,7,1,1,0,'Beam',194,0,18,0,46,0,18,0,'p;',0),(2,4,2,1,7,1,1,0,'Beam',194,0,18,0,46,0,18,0,'p;',0),(3,1,2,1,7,1,1,0,'Beam',211,0,17,0,53,0,17,0,'p;',0),(4,2,2,1,7,5,1,0,'Particle',32,0,17,15,0,0,17,0,'p;',0),(5,1,2,1,29,29,1,0,'Beam',211,0,14,56,0,0,14,0,'p;',0),(6,3,2,1,29,29,1,0,'Particle',36,0,13,23,0,0,13,0,'p;',0),(7,4,2,1,36,36,1,0,'Beam',194,0,14,50,0,0,14,0,'p;',0),(8,1,2,1,36,36,1,0,'Beam',211,0,13,57,0,0,13,0,'p;',0),(9,31,2,1,7,1,2,0,'Beam',170,0,17,0,39,0,17,0,'p;',0),(10,31,2,1,7,1,2,0,'Beam',170,0,17,0,39,0,17,0,'p;',0),(11,27,2,1,7,1,2,0,'Particle',36,0,16,0,20,0,16,0,'p;',0),(12,30,2,1,7,3,2,0,'Particle',38,0,16,20,2,0,16,0,'p;c;',0),(13,32,2,1,7,9,2,0,'Pulse',56,0,36,20,0,0,9,0,'p;v4;',0),(14,29,2,1,7,10,2,0,'Pulse',141,0,50,38,53,0,10,1,'p;v5;o4;',0),(15,30,2,1,7,11,2,0,'Particle',32,0,10,22,0,0,10,0,'p;',0),(16,27,2,1,29,29,2,0,'Particle',37,0,14,23,0,0,14,0,'p;',0),(17,31,2,1,36,36,2,0,'Beam',170,0,14,42,0,0,14,0,'p;',0),(18,26,2,3,7,1,2,0,'Beam',201,0,14,0,53,0,14,0,'p;',0),(19,26,2,3,7,1,2,0,'Beam',201,0,14,0,53,0,14,0,'p;',0),(20,26,2,3,19,19,2,0,'Beam',201,0,12,55,0,0,12,0,'p;',0),(21,25,2,5,12,1,2,0,'Particle',40,3,18,0,19,0,21,0,'p;',0),(22,21,2,6,19,1,2,0,'Particle',51,3,18,0,30,0,21,0,'p;',0),(23,12,2,6,6,1,2,0,'Pulse',87,0,72,0,7,0,16,0,'b;v5;',0),(24,13,2,6,6,1,2,0,'Pulse',52,0,42,0,10,0,14,0,'p;v3;',0),(25,16,2,6,6,7,2,0,'Particle',44,0,11,33,0,0,11,0,'p;',0),(26,17,2,6,6,7,2,0,'Particle',52,0,11,11,30,0,11,1,'p;o3;',0),(27,15,2,6,6,8,2,0,'Particle',44,0,9,35,0,0,9,0,'p;',0),(28,9,2,6,6,9,2,0,'Pulse',86,0,52,1,0,0,18,0,'b;v5;',0),(29,10,2,6,6,9,2,0,'Pulse',66,0,42,2,0,0,17,0,'b;v4;',0),(30,11,2,6,6,10,2,0,'Pulse',82,0,35,40,7,0,7,1,'p;v5;o4;',0),(31,14,2,6,6,11,2,0,'Pulse',34,0,16,18,0,0,8,0,'p;v2;',0),(32,20,2,6,19,20,2,0,'Particle',50,3,14,33,0,0,17,0,'p;',0),(33,59,2,1,23,1,3,0,'Particle',35,0,18,0,17,0,18,0,'p;',0),(34,67,2,1,23,1,3,0,'Beam',31,0,17,0,14,0,17,0,'p;',0),(35,64,2,1,23,3,3,0,'Particle',34,0,18,16,0,0,18,0,'p;',0),(36,59,2,1,29,29,3,0,'Particle',34,0,13,21,0,0,13,0,'p;',0),(37,58,2,1,29,29,3,0,'Beam',26,0,12,14,0,0,12,0,'p;',0),(38,65,2,1,36,36,3,0,'Beam',25,0,13,12,0,0,13,0,'p;',0),(39,66,2,3,11,1,3,0,'Pulse',30,0,21,0,2,0,14,0,'b;v2;',0),(40,52,2,3,7,3,3,0,'Pulse',128,0,55,20,53,0,11,0,'p;v5;c;',0),(41,56,2,3,7,5,3,0,'Beam',27,0,13,14,0,0,13,0,'p;',0),(42,51,2,3,7,10,3,0,'Pulse',133,0,40,38,55,0,8,1,'p;v5;o4;',0),(43,61,2,3,11,13,3,0,'Pulse',28,0,12,16,0,0,6,0,'p;v2;',0),(44,68,2,3,11,13,3,0,'Pulse',46,0,18,12,16,0,6,1,'p;v3;o2;',0),(45,37,2,5,19,1,3,0,'Particle',14,0,7,0,0,0,18,0,'b;',0),(46,39,2,5,19,1,3,0,'Particle',17,0,9,0,0,0,17,0,'b;',0),(47,40,2,5,19,1,3,0,'Particle',16,0,8,0,0,0,17,0,'b;',0),(48,40,2,5,19,1,3,0,'Particle',13,0,7,0,0,0,17,0,'b;',0),(49,42,2,5,19,1,3,0,'Particle',37,0,16,0,21,0,16,0,'p;',0),(50,49,2,5,12,1,3,0,'Particle',56,0,17,0,39,0,17,0,'p;',0),(51,47,2,5,6,1,3,0,'Particle',101,3,19,0,79,0,22,0,'p;',0),(52,48,2,5,6,1,3,0,'Particle',94,3,17,0,74,0,20,0,'p;',0),(53,39,2,5,19,3,3,0,'Particle',16,0,8,0,0,0,18,0,'b;',0),(54,41,2,5,19,5,3,0,'Particle',38,0,17,20,1,0,17,0,'p;c;',0),(55,47,2,5,6,7,3,0,'Particle',31,3,11,17,0,0,14,0,'p;',0),(56,48,2,5,6,7,3,0,'Particle',19,3,10,6,0,0,13,0,'p;',0),(57,47,2,5,6,8,3,0,'Particle',51,3,9,39,0,0,12,0,'p;',0),(58,48,2,5,6,8,3,0,'Particle',47,3,8,1,0,0,11,1,'p;o4;',0),(59,47,2,5,6,9,3,0,'Particle',142,3,18,80,0,0,21,1,'p;',0),(60,47,2,5,6,10,3,0,'Particle',21,3,8,10,0,0,11,0,'p;',0),(61,48,2,5,6,10,3,0,'Particle',132,3,7,30,0,0,10,1,'p;o4;',0),(62,47,2,5,6,11,3,0,'Particle',51,3,11,37,0,0,14,0,'p;',0),(63,48,2,5,6,11,3,0,'Particle',29,3,10,7,0,0,13,1,'p;o3;',0),(64,49,2,5,12,13,3,0,'Particle',60,0,14,46,0,0,14,0,'p;',0),(65,50,2,5,12,13,3,0,'Particle',37,0,13,14,10,0,13,1,'p;o6;',0),(66,43,2,5,19,20,3,0,'Particle',56,0,12,44,0,0,12,0,'p;',0),(67,43,2,5,19,20,3,0,'Particle',59,0,12,16,31,0,12,1,'p;o6;',0),(68,42,2,5,19,21,3,0,'Particle',47,0,7,28,12,0,7,1,'p;o2;',0),(69,37,2,5,19,22,3,0,'Particle',17,0,8,9,0,0,8,0,'p;',0),(70,41,2,5,19,22,3,0,'Particle',39,0,8,19,12,0,8,1,'p;o2;',0),(71,44,2,6,6,1,3,0,'Particle',71,6,13,0,52,0,19,0,'p;',0),(72,45,2,6,6,1,3,0,'Particle',77,6,12,0,59,0,18,0,'p;',0),(73,44,2,6,6,2,3,0,'Particle',84,6,13,20,45,0,19,0,'p;c;',0),(74,45,2,6,6,9,3,0,'Particle',64,6,12,46,0,0,18,0,'p;',0),(75,46,2,7,11,11,3,0,'Pulse',54,6,33,0,15,0,13,0,'p;v3;',0);
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
) ENGINE=InnoDB AUTO_INCREMENT=113 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fireorders`
--

LOCK TABLES `fireorders` WRITE;
/*!40000 ALTER TABLE `fireorders` DISABLE KEYS */;
INSERT INTO `fireorders` VALUES (1,2,1,6,1,-453,46,13,1,42,'28;',1,1),(2,2,1,5,1,-447,41,7,2,63,'-86;43;',1,1),(3,2,1,5,1,-447,41,11,2,63,'33;-48;',1,1),(4,2,1,5,1,-447,41,20,1,100,'19;',1,1),(5,2,2,6,0,331,406,9,0,0,'',0,2),(6,2,2,5,0,421,-250,9,0,0,'',0,2),(7,2,2,8,2,-319,-582,10,4,0,'',0,2),(8,2,2,8,2,-319,-582,12,4,0,'',0,2),(9,2,2,1,6,188,349,9,1,95,'34;',1,1),(10,2,2,1,6,188,349,10,1,95,'42;',1,1),(11,2,2,1,6,188,349,11,1,95,'28;',1,1),(12,2,2,1,6,188,349,15,1,95,'33;',1,1),(13,2,2,1,6,188,349,16,1,95,'72;',1,1),(14,2,2,1,6,188,349,17,1,95,'95;',1,1),(15,2,2,1,6,188,349,37,2,84,'96;58;',1,1),(16,2,2,1,6,188,349,38,2,84,'86;80;',1,1),(17,2,2,1,6,188,349,39,2,84,'21;90;',1,1),(18,2,2,4,6,184,344,8,1,47,'95;',0,1),(19,2,2,4,6,184,344,10,1,47,'63;',0,1),(20,2,2,4,6,184,344,24,2,38,'10;95;',1,1),(21,2,2,4,6,184,344,25,2,38,'79;3;',1,1),(22,2,2,3,5,271,-197,8,1,43,'93;',0,1),(23,2,2,3,5,271,-197,10,1,43,'57;',0,1),(24,2,2,2,5,276,-195,11,2,37,'95;87;',0,1),(25,2,2,2,5,276,-195,12,2,37,'73;28;',1,1),(26,2,2,5,3,-200,-468,13,1,72,'41;',1,1),(27,2,2,6,1,-283,37,7,2,92,'50;35;',2,1),(28,2,2,6,1,-283,37,8,1,80,'95;',0,1),(29,2,2,6,1,-283,37,10,1,80,'13;',1,1),(30,2,2,6,1,-283,37,11,2,92,'32;76;',2,1),(31,2,2,6,1,-283,37,20,1,115,'78;',1,1),(32,2,2,6,1,-283,37,21,1,46,'4;',1,1),(33,2,2,6,1,-283,37,22,1,46,'51;',0,1),(34,2,3,1,0,-222,240,21,0,0,'',0,2),(35,2,3,8,2,-93,-569,17,4,0,'',0,2),(36,2,3,8,2,-93,-569,19,4,0,'',0,2),(37,2,3,1,5,140,-263,8,3,77,'3;90;44;',2,1),(38,2,3,1,5,140,-263,12,3,77,'78;95;-99;',0,1),(39,2,3,1,5,140,-263,24,3,77,'20;61;94;',2,1),(40,2,3,1,5,140,-263,28,3,77,'5;-77;34;',2,1),(41,2,3,1,5,140,-263,30,2,106,'51;82;',2,1),(42,2,3,1,5,140,-263,31,2,106,'91;97;',2,1),(43,2,3,1,5,140,-263,32,2,97,'46;53;',2,1),(44,2,3,4,6,55,266,27,2,114,'72;18;',2,1),(45,2,3,4,6,55,266,28,2,114,'97;41;',2,1),(46,2,3,3,7,-80,-298,12,1,55,'32;',1,1),(47,2,3,3,5,148,-267,18,1,102,'76;',1,1),(48,2,3,3,5,148,-267,20,1,102,'84;',1,1),(49,2,3,2,5,147,-259,7,2,75,'23;33;',2,1),(50,2,3,2,5,147,-259,8,2,75,'91;71;',1,1),(51,2,3,5,3,-33,-328,8,1,80,'18;',1,1),(52,2,3,5,3,-33,-328,10,1,80,'19;',1,1),(53,2,3,5,2,84,-456,14,1,39,'69;',0,1),(54,2,3,5,2,84,-456,15,1,39,'68;',0,1),(55,2,3,5,3,-33,-328,21,1,80,'90;',0,1),(56,2,3,5,3,-33,-328,22,1,80,'48;',1,1),(57,2,3,6,1,-146,-40,14,1,49,'51;',0,1),(58,2,3,6,1,-146,-40,15,1,49,'41;',1,1),(59,2,3,7,1,-156,-40,6,2,66,'29;30;',2,1),(60,2,3,7,1,-156,-40,7,1,60,'66;',0,1),(61,2,3,7,3,-30,-326,8,1,49,'35;',1,1),(62,2,3,7,1,-156,-40,9,1,60,'98;',0,1),(63,2,3,7,3,-30,-326,10,1,49,'61;',0,1),(64,2,3,7,1,-156,-40,12,2,66,'66;90;',1,1),(65,2,3,7,1,-156,-40,13,1,60,'7;',1,1),(66,2,3,7,3,-30,-326,14,1,49,'31;',1,1),(67,2,3,7,1,-156,-40,15,1,60,'41;',1,1),(68,2,3,7,3,-30,-326,16,1,49,'24;',1,1),(69,2,4,1,6,68,267,34,5,0,'',0,2),(70,2,4,1,6,68,267,35,5,0,'',0,2),(71,2,4,1,7,-128,-146,20,0,0,'',0,0),(72,2,4,1,7,-128,-146,22,0,0,'',0,0),(73,2,4,1,7,-128,-146,25,0,0,'',0,0),(74,2,4,1,7,-128,-146,26,0,0,'',0,0),(75,2,4,1,7,-128,-146,27,0,0,'',0,0),(76,2,4,4,6,0,0,12,0,0,'',0,0),(77,2,4,4,6,0,0,14,0,0,'',0,0),(78,2,4,20,18,0,0,2,0,0,'',0,0),(79,2,4,20,18,0,0,4,0,0,'',0,0),(80,2,4,20,18,0,0,6,0,0,'',0,0),(81,2,4,20,18,0,0,8,0,0,'',0,0),(82,2,4,20,18,0,0,10,0,0,'',0,0),(83,2,4,20,18,0,0,12,0,0,'',0,0),(84,2,4,20,18,0,0,14,0,0,'',0,0),(85,2,4,20,18,0,0,16,0,0,'',0,0),(86,2,4,20,18,0,0,18,0,0,'',0,0),(87,2,4,20,18,0,0,20,0,0,'',0,0),(88,2,4,20,18,0,0,22,0,0,'',0,0),(89,2,4,20,18,0,0,24,0,0,'',0,0),(90,2,4,6,20,0,0,21,0,0,'',0,0),(91,2,4,6,20,0,0,22,0,0,'',0,0),(92,2,4,8,1,-10,-40,7,0,0,'',0,0),(93,2,4,8,1,-10,-40,8,0,0,'',0,0),(94,2,4,8,1,-10,-40,11,0,0,'',0,0),(95,2,4,18,22,0,0,2,0,0,'',0,0),(96,2,4,18,22,0,0,4,0,0,'',0,0),(97,2,4,18,22,0,0,6,0,0,'',0,0),(98,2,4,18,22,0,0,8,0,0,'',0,0),(99,2,4,18,22,0,0,10,0,0,'',0,0),(100,2,4,18,22,0,0,12,0,0,'',0,0),(101,2,4,18,22,0,0,14,0,0,'',0,0),(102,2,4,18,22,0,0,16,0,0,'',0,0),(103,2,4,18,22,0,0,18,0,0,'',0,0),(104,2,4,17,2,246,-383,2,0,0,'',0,0),(105,2,4,17,2,246,-383,4,0,0,'',0,0),(106,2,4,17,2,246,-383,6,0,0,'',0,0),(107,2,4,17,2,246,-383,8,0,0,'',0,0),(108,2,4,17,2,246,-383,10,0,0,'',0,0),(109,2,4,17,2,246,-383,12,0,0,'',0,0),(110,2,4,17,2,246,-383,14,0,0,'',0,0),(111,2,4,17,2,246,-383,16,0,0,'',0,0),(112,2,4,17,2,246,-383,18,0,0,'',0,0);
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
INSERT INTO `games` VALUES (2,'myGame','active',4,2,3500,1500,11,3,10,10,5,3,75,150);
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
INSERT INTO `loads` VALUES (1,1,2,'Command',1),(3,1,34,'Ullt',15),(4,1,35,'Ullt',15),(5,2,2,'Sensor',1),(6,3,2,'Engine',1),(7,4,2,'Command',1),(8,4,2,'Sensor',1),(9,5,2,'Command',1),(10,5,2,'Sensor',1),(13,8,2,'Sensor',1),(14,8,10,'Naga',16),(15,8,12,'Naga',16),(16,8,17,'Naga',16),(17,8,19,'Naga',12);
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `missions`
--

LOCK TABLES `missions` WRITE;
/*!40000 ALTER TABLE `missions` DISABLE KEYS */;
INSERT INTO `missions` VALUES (1,17,'2',2,-1,5,279,-203,3),(2,18,'2',2,-1,6,190,342,4),(3,-22,'2',2,-1,5,279,-203,0),(4,-3,'2',2,-1,6,190,342,0),(5,19,'2',2,-1,2,-324,-585,4),(6,20,'2',3,-1,18,190,342,4),(7,-49,'2',3,-1,18,190,342,0),(8,21,'2',3,-1,2,-94,-566,4),(9,17,'2',4,-1,2,80,-456,0),(10,22,'2',4,-1,6,65,262,4);
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
INSERT INTO `playerstatus` VALUES (2,1,2,4,2,'Vree Conglomerate',3286,1520,1764,441,1309,'ready'),(3,2,2,4,2,'Earth Alliance',2691,1501,1616,404,841,'ready');
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
) ENGINE=InnoDB AUTO_INCREMENT=207 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `powers`
--

LOCK TABLES `powers` WRITE;
/*!40000 ALTER TABLE `powers` DISABLE KEYS */;
INSERT INTO `powers` VALUES (1,1,8,1,'0',0),(2,1,12,1,'0',0),(3,1,14,1,'0',0),(4,1,18,1,'0',0),(5,1,24,1,'0',0),(6,1,28,1,'0',0),(7,1,4,1,'1',4),(8,1,4,1,'1',6),(9,1,4,1,'1',7),(10,4,9,1,'0',0),(11,4,13,1,'0',0),(12,4,17,1,'0',0),(13,4,21,1,'0',0),(14,4,4,1,'1',4),(15,4,4,1,'1',6),(16,6,13,1,'1',4),(17,6,14,1,'-1',0),(18,6,15,1,'-1',0),(19,6,17,1,'0',0),(20,6,18,1,'0',0),(21,6,21,1,'-1',0),(22,6,22,1,'-1',0),(23,6,4,1,'1',4),(24,6,4,1,'1',6),(25,5,6,1,'1',4),(26,5,13,1,'1',4),(27,5,14,1,'-1',0),(28,5,14,1,'0',0),(29,5,15,1,'-1',0),(30,5,15,1,'0',0),(31,5,17,1,'0',0),(32,5,18,1,'0',0),(33,5,20,1,'1',4),(34,5,21,1,'-1',0),(35,5,21,1,'0',0),(36,5,22,1,'-1',0),(37,5,22,1,'0',0),(38,5,4,1,'1',4),(39,5,4,1,'1',6),(40,8,11,1,'-1',0),(41,8,14,1,'-1',0),(42,8,15,1,'-1',0),(43,8,18,1,'-1',0),(44,7,7,1,'-1',0),(45,7,8,1,'-1',0),(46,7,9,1,'-1',0),(47,7,10,1,'-1',0),(48,7,13,1,'-1',0),(49,7,14,1,'-1',0),(50,7,15,1,'-1',0),(51,7,16,1,'-1',0),(52,6,14,2,'-1',0),(53,6,15,2,'-1',0),(54,6,19,2,'1',4),(55,6,21,2,'-1',0),(56,6,22,2,'-1',0),(57,5,6,2,'1',4),(58,5,12,2,'1',4),(59,5,13,2,'1',4),(60,5,14,2,'-1',0),(61,5,15,2,'-1',0),(62,5,17,2,'0',0),(63,5,18,2,'0',0),(64,5,21,2,'-1',0),(65,5,22,2,'-1',0),(66,5,4,2,'1',4),(67,8,10,2,'1',0),(68,8,10,2,'1',0),(69,8,10,2,'1',0),(70,8,10,2,'1',0),(71,8,11,2,'-1',0),(72,8,12,2,'1',0),(73,8,12,2,'1',0),(74,8,12,2,'1',0),(75,8,12,2,'1',0),(76,8,14,2,'-1',0),(77,8,15,2,'-1',0),(78,8,18,2,'-1',0),(79,7,7,2,'-1',0),(80,7,8,2,'-1',0),(81,7,9,2,'-1',0),(82,7,10,2,'-1',0),(83,7,13,2,'-1',0),(84,7,14,2,'-1',0),(85,7,15,2,'-1',0),(86,7,16,2,'-1',0),(87,4,13,2,'0',0),(88,4,17,2,'0',0),(89,4,21,2,'0',0),(90,4,6,2,'1',8),(91,4,9,3,'0',0),(92,4,13,3,'0',0),(93,4,17,3,'0',0),(94,4,21,3,'0',0),(95,4,27,3,'1',4),(96,4,28,3,'1',4),(97,5,6,3,'1',4),(98,5,14,3,'-2',0),(99,5,15,3,'-2',0),(100,5,21,3,'-2',0),(101,5,22,3,'-2',0),(102,6,6,3,'1',4),(103,6,6,3,'1',6),(104,6,8,3,'0',0),(105,6,12,3,'1',4),(106,6,14,3,'-2',0),(107,6,15,3,'-2',0),(108,6,20,3,'0',0),(109,6,21,3,'-1',0),(110,6,22,3,'-1',0),(111,8,11,3,'-1',0),(112,8,14,3,'-1',0),(113,8,15,3,'-1',0),(114,8,17,3,'1',0),(115,8,17,3,'1',0),(116,8,17,3,'1',0),(117,8,17,3,'1',0),(118,8,18,3,'-1',0),(119,8,19,3,'1',0),(120,8,19,3,'1',0),(121,8,19,3,'1',0),(122,8,19,3,'1',0),(123,7,5,3,'1',2),(124,7,7,3,'-2',0),(125,7,8,3,'-1',0),(126,7,9,3,'-2',0),(127,7,10,3,'-1',0),(128,7,11,3,'1',2),(129,7,13,3,'-2',0),(130,7,14,3,'-1',0),(131,7,15,3,'-2',0),(132,7,16,3,'-1',0),(133,5,6,4,'1',4),(134,5,12,4,'1',4),(135,5,14,4,'-2',0),(136,5,15,4,'-2',0),(137,5,16,4,'1',4),(138,5,19,4,'1',4),(139,6,8,4,'0',0),(140,6,12,4,'1',4),(141,6,14,4,'-2',0),(142,6,15,4,'-2',0),(143,6,16,4,'1',4),(144,6,21,4,'-1',0),(145,6,22,4,'-1',0),(146,8,6,4,'1',3),(147,8,11,4,'-1',0),(148,8,14,4,'-1',0),(149,8,15,4,'-1',0),(150,8,18,4,'-1',0),(151,7,5,4,'1',2),(152,7,7,4,'-2',0),(153,7,8,4,'-1',0),(154,7,9,4,'-2',0),(155,7,10,4,'-1',0),(156,7,11,4,'1',2),(157,7,13,4,'-2',0),(158,7,14,4,'-1',0),(159,7,15,4,'-2',0),(160,7,16,4,'-1',0),(161,1,34,4,'1',0),(162,1,34,4,'1',0),(163,1,34,4,'1',0),(164,1,34,4,'1',0),(165,1,34,4,'1',0),(166,1,35,4,'1',0),(167,1,35,4,'1',0),(168,1,35,4,'1',0),(169,1,35,4,'1',0),(170,1,35,4,'1',0),(171,4,9,4,'0',0),(172,4,13,4,'0',0),(173,4,17,4,'0',0),(174,4,21,4,'0',0),(175,4,6,4,'1',8),(176,3,9,4,'0',0),(177,20,2,4,'-1',0),(178,20,4,4,'-1',0),(179,20,6,4,'-1',0),(180,20,8,4,'-1',0),(181,20,10,4,'-1',0),(182,20,12,4,'-1',0),(183,20,14,4,'-1',0),(184,20,16,4,'-1',0),(185,20,18,4,'-1',0),(186,20,20,4,'-1',0),(187,20,22,4,'-1',0),(188,20,24,4,'-1',0),(189,18,2,4,'-1',0),(190,18,4,4,'-1',0),(191,18,6,4,'-1',0),(192,18,8,4,'-1',0),(193,18,10,4,'-1',0),(194,18,12,4,'-1',0),(195,18,14,4,'-1',0),(196,18,16,4,'-1',0),(197,18,18,4,'-1',0),(198,17,2,4,'-1',0),(199,17,4,4,'-1',0),(200,17,6,4,'-1',0),(201,17,8,4,'-1',0),(202,17,10,4,'-1',0),(203,17,12,4,'-1',0),(204,17,14,4,'-1',0),(205,17,16,4,'-1',0),(206,17,18,4,'-1',0);
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
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sensors`
--

LOCK TABLES `sensors` WRITE;
/*!40000 ALTER TABLE `sensors` DISABLE KEYS */;
INSERT INTO `sensors` VALUES (1,1,4,1,359.60,994,1),(2,4,4,1,359.13,855,1),(3,3,4,1,-1.00,95,0),(4,2,3,1,-1.00,86,0),(5,6,4,1,8.65,963,0),(6,5,4,1,0.90,952,0),(7,8,4,1,-1.00,106,0),(8,7,3,1,-1.00,73,0),(9,6,4,2,342.98,646,0),(10,5,4,2,33.11,640,0),(11,8,4,2,-1.00,106,0),(12,7,3,2,83.29,304,1),(13,1,4,2,39.56,722,0),(14,4,4,2,340.71,552,1),(15,3,4,2,15.47,346,0),(16,2,3,2,0.44,250,0),(17,1,4,3,6.76,410,0),(18,4,4,3,26.46,416,0),(19,3,4,3,349.12,361,0),(20,2,3,3,19.35,419,1),(21,5,4,3,1.52,319,0),(22,6,4,3,63.00,400,1),(23,8,4,3,-1.00,106,0),(24,7,3,3,153.86,139,1),(25,5,4,4,300.11,310,1),(26,6,4,4,-1.00,102,0),(27,8,4,4,30.16,412,0),(28,7,3,4,-1.00,73,0),(29,1,4,4,252.30,312,0),(30,4,4,4,86.12,238,0),(31,3,4,4,20.05,309,1),(32,2,3,4,355.23,292,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subunits`
--

LOCK TABLES `subunits` WRITE;
/*!40000 ALTER TABLE `subunits` DISABLE KEYS */;
INSERT INTO `subunits` VALUES (1,2,1,'Xorr'),(2,2,1,'Xorr'),(3,7,1,'Crius'),(4,7,1,'Crius'),(5,17,9,'Aurora'),(6,18,9,'Aurora'),(7,19,8,'Naga'),(8,20,12,'Zorth'),(9,21,8,'Naga'),(10,22,10,'Ullt');
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
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `systemcrits`
--

LOCK TABLES `systemcrits` WRITE;
/*!40000 ALTER TABLE `systemcrits` DISABLE KEYS */;
INSERT INTO `systemcrits` VALUES (1,1,30,1,'Damage',0,-25.00),(2,1,32,1,'Accuracy',0,-25.00),(3,1,2,2,'Morale',-2,-15.00),(4,1,3,2,'Output',0,-15.00),(5,1,5,2,'Overload',0,-1.74),(6,1,11,2,'Damage',0,-25.00),(7,3,2,2,'',0,0.00),(8,6,5,2,'Overload',0,-6.30),(9,6,8,2,'Damage',0,-25.00),(10,1,3,3,'Output',0,-15.00),(11,1,32,3,'Accuracy',0,-25.00),(12,3,2,3,'Morale',-2,-15.00),(13,3,3,3,'Output',0,-15.00),(14,3,5,3,'Output',0,-10.00),(15,3,5,3,'Overload',0,-3.81),(16,5,2,3,'Morale',-2,-15.00),(17,5,5,3,'Overload',0,-13.94),(18,5,7,3,'Damage',0,-25.00),(19,6,2,3,'Morale',0,-10.00),(20,6,2,3,'Morale',-2,-25.00);
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
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `units`
--

LOCK TABLES `units` WRITE;
/*!40000 ALTER TABLE `units` DISABLE KEYS */;
INSERT INTO `units` VALUES (1,2,1,4,'Xonn','Traveller',1537,1343,'bought',1,1,0,0,0,-152,-37,335.06,335.06,0,157,0,0,0,3,3,0,''),(2,2,1,3,'Squadron','',585,585,'bought',0,1,0,0,0,80,-456,49.84,49.84,11,208,0,0,0,3,3,0,''),(3,2,1,4,'Zaatrr','A',455,455,'bought',0,1,0,0,0,-26,-325,18.00,18.00,0,225,0,0,0,3,3,0,''),(4,2,1,4,'Xill','B',903,903,'bought',0,1,0,0,0,-117,439,291.07,291.07,33,155,0,0,0,3,3,0,''),(5,2,2,4,'Hyperion','A',1155,903,'bought',1,1,0,0,0,139,-269,221.96,221.96,0,155,0,0,0,3,3,0,''),(6,2,2,4,'Hyperion','B',1027,775,'bought',0,1,0,0,0,65,262,165.09,165.09,66,155,0,0,0,3,3,0,''),(7,2,2,3,'Squadron','Sharks',580,580,'bought',0,1,0,0,0,-82,-306,108.30,108.30,48,185,0,0,0,3,3,0,''),(8,2,2,4,'Saggitarius','',737,433,'bought',0,1,0,0,0,409,-85,195.14,195.14,0,145,0,0,0,3,3,0,''),(9,2,0,0,'NebulaCloud','',0,0,'deployed',0,0,0,0,0,152,-433,0.00,0.00,0,0,0,0,0,1,-1,0,'112;24;233;3'),(10,2,0,0,'NebulaCloud','',0,0,'deployed',0,0,0,0,0,-182,-13,0.00,0.00,0,0,0,0,0,1,-1,0,'94;22;166;6'),(11,2,0,0,'NebulaCloud','',0,0,'deployed',0,0,0,0,0,-180,388,0.00,0.00,0,0,0,0,0,1,-1,0,'80;21;222;2'),(12,2,0,0,'AsteroidField','',0,0,'deployed',0,0,0,0,0,-576,100,0.00,0.00,0,0,0,0,0,1,-1,0,'0;20;159;46;138;3;30'),(13,2,0,0,'AsteroidField','',0,0,'deployed',0,0,0,0,0,288,-392,0.00,0.00,0,0,0,0,0,1,-1,0,'0;25;35;53;212;5;48'),(14,2,0,0,'AsteroidField','',0,0,'deployed',0,0,0,0,0,-630,-225,0.00,0.00,0,0,0,0,0,1,-1,0,'0;25;115;41;164;5;48'),(15,2,0,0,'AsteroidField','',0,0,'deployed',0,0,0,0,0,262,149,0.00,0.00,0,0,0,0,0,1,-1,0,'0;15;137;59;177;4;39'),(16,2,0,0,'AsteroidField','',0,0,'deployed',0,0,0,0,0,49,-10,0.00,0.00,0,0,0,0,0,1,-1,0,'0;15;261;53;265;3;30'),(17,2,2,2,'Flight','Onslaught-Phi',252,252,'deployed',0,2,0,0,0,139,-269,0.00,0.00,0,375,0,0,0,3,3,0,''),(18,2,2,2,'Flight','Phoenix-Sigma',252,252,'deployed',0,2,0,0,0,65,262,0.00,0.00,0,375,0,0,0,3,3,0,''),(19,2,2,1,'Salvo','',0,0,'deployed',0,2,0,0,0,272,-280,213.50,213.50,0,525,0,0,0,3,3,0,''),(20,2,1,2,'Flight','Dragon-Epsilon',192,192,'deployed',0,3,0,0,0,-160,116,0.00,0.00,0,320,0,0,0,3,3,0,''),(21,2,2,1,'Salvo','',0,0,'deployed',0,3,0,0,0,416,-155,219.52,219.52,0,350,0,0,0,3,3,0,''),(22,2,1,1,'Salvo','',0,0,'deployed',0,4,0,0,0,-152,-37,54.03,54.03,0,0,0,0,0,4,-1,0,'');
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

-- Dump completed on 2019-01-25 12:51:35

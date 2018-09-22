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
) ENGINE=InnoDB AUTO_INCREMENT=118 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actions`
--

LOCK TABLES `actions` WRITE;
/*!40000 ALTER TABLE `actions` DISABLE KEYS */;
INSERT INTO `actions` VALUES (1,6,1,'deploy',0,0,414,196,180.00,0,0,1,1),(2,5,1,'deploy',0,0,528,-23,180.00,0,0,1,1),(3,7,1,'deploy',0,0,495,488,180.00,0,0,1,1),(4,4,1,'deploy',0,0,-547,237,0.00,0,0,1,1),(5,1,1,'deploy',0,0,-471,-89,0.00,0,0,1,1),(6,2,1,'deploy',0,0,-503,576,0.00,0,0,1,1),(7,3,1,'deploy',0,0,-446,673,0.00,0,0,1,1),(8,1,1,'jumpIn',0,0,-471,-89,0.00,0,0,0,1),(9,2,1,'jumpIn',0,0,-503,576,0.00,0,0,0,1),(10,3,1,'jumpIn',0,0,-446,673,0.00,0,0,0,1),(11,4,1,'jumpIn',0,0,-547,237,0.00,0,0,0,1),(12,5,1,'jumpIn',0,0,528,-23,0.00,0,0,0,1),(13,6,1,'jumpIn',0,0,414,196,0.00,0,0,0,1),(14,7,1,'jumpIn',0,0,495,488,0.00,0,0,0,1),(15,4,1,'turn',0,0,-547,237,-1.51,2,5,1,1),(16,4,1,'move',0,155,-392,233,0.00,0,0,1,1),(17,1,1,'turn',0,0,-471,-89,-13.35,14,39,1,1),(18,1,1,'move',0,151,-336,-157,0.00,0,0,1,1),(19,1,1,'turn',0,0,-336,-157,30.00,56,12,1,1),(20,1,1,'move',0,4,-332,-156,0.00,0,0,1,1),(21,2,1,'move',0,165,-339,556,0.00,0,0,1,1),(22,3,1,'move',0,165,-285,709,0.00,0,0,1,1),(23,6,1,'move',0,155,259,196,0.00,0,0,1,1),(24,5,1,'turn',0,0,528,-23,-30.00,30,65,1,1),(25,5,1,'move',0,65,472,9,0.00,0,0,1,1),(26,5,1,'turn',0,0,472,9,20.30,21,44,1,1),(27,5,1,'move',0,100,373,26,0.00,0,0,1,1),(28,7,1,'turn',0,0,495,488,-8.30,9,13,1,1),(29,7,1,'move',0,185,312,515,0.00,0,0,1,1),(35,20,2,'deploy',0,0,-332,-156,0.00,1,0,1,1),(36,13,5,'deploy',0,0,274,981,229.39,0,0,1,1),(42,4,2,'turn',0,0,-392,233,-13.34,14,43,1,1),(43,4,2,'move',0,155,-242,193,0.00,0,0,1,1),(44,1,2,'move',0,155,-183,-112,0.00,0,0,1,1),(45,2,2,'move',0,165,-174,556,0.00,0,0,1,1),(46,3,2,'move',0,165,-120,709,0.00,0,0,1,1),(47,3,2,'turn',0,0,-120,709,-21.67,44,0,1,1),(48,6,2,'move',0,155,104,196,0.00,0,0,1,1),(49,6,2,'turn',0,0,104,196,-5.98,12,0,1,1),(50,5,2,'turn',0,0,373,26,25.91,26,56,1,1),(51,5,2,'move',0,165,215,-20,0.00,0,0,1,1),(52,7,2,'move',0,185,129,542,0.00,0,0,1,1),(53,20,2,'move',0,100,-235,-132,13.96,0,0,0,1),(54,20,2,'move',0,100,-235,-132,13.96,0,0,0,1),(72,4,3,'turn',0,0,-242,193,30.00,30,95,1,1),(73,4,3,'move',0,95,-150,218,0.00,0,0,1,1),(74,4,3,'turn',0,0,-150,218,30.00,42,60,1,1),(75,4,3,'move',0,60,-108,261,0.00,0,0,1,1),(76,1,3,'turn',0,0,-183,-112,30.00,30,86,1,1),(77,1,3,'move',0,155,-77,1,0.00,0,0,1,1),(78,1,3,'turn',0,0,-77,1,30.00,40,58,1,1),(79,2,3,'move',0,165,-9,556,0.00,0,0,1,1),(80,2,3,'turn',0,0,-9,556,-30.00,60,0,1,1),(81,6,3,'turn',0,0,104,196,30.00,30,97,1,1),(82,6,3,'move',0,155,-38,133,0.00,0,0,1,1),(83,6,3,'turn',0,0,-38,133,-9.38,20,0,1,1),(84,5,3,'turn',0,0,215,-20,-30.00,30,65,1,1),(85,5,3,'move',0,165,55,19,0.00,0,0,1,1),(86,7,3,'turn',0,0,129,542,45.00,45,66,1,1),(87,7,3,'move',0,185,-19,431,0.00,0,0,1,1),(88,7,3,'turn',0,0,-19,431,45.00,90,0,1,1),(89,20,3,'move',0,200,-58,-40,27.51,0,0,0,1),(90,20,3,'move',0,200,-58,-40,27.51,0,0,0,1),(91,22,1,'deploy',0,0,-499,-365,0.00,0,0,1,1),(92,29,1,'deploy',0,0,-495,335,0.00,0,0,1,1),(93,21,1,'deploy',0,0,501,-439,180.00,0,0,1,1),(94,30,1,'deploy',0,0,561,-189,180.00,0,0,1,1),(95,31,1,'deploy',0,0,621,-47,180.00,0,0,1,1),(96,22,1,'jumpIn',0,0,-499,-365,0.00,0,0,0,1),(97,29,1,'jumpIn',0,0,-495,335,0.00,0,0,0,1),(98,21,1,'jumpIn',0,0,501,-439,0.00,0,0,0,1),(99,30,1,'jumpIn',0,0,561,-189,0.00,0,0,0,1),(100,31,1,'jumpIn',0,0,621,-47,0.00,0,0,0,1),(101,22,1,'move',0,155,-344,-365,0.00,0,0,1,1),(102,29,1,'move',0,155,-340,335,0.00,0,0,1,1),(103,21,1,'move',0,155,346,-439,0.00,0,0,1,1),(104,30,1,'move',0,165,396,-189,0.00,0,0,1,1),(105,31,1,'move',0,185,436,-47,0.00,0,0,1,1),(106,32,2,'deploy',0,0,396,-189,0.00,1,0,1,1),(107,22,2,'move',0,155,-189,-365,0.00,0,0,1,1),(108,33,2,'deploy',0,0,420,-51,-157.82,0,0,0,1),(111,21,2,'move',0,155,191,-439,0.00,0,0,1,1),(112,31,2,'move',0,185,251,-47,0.00,0,0,1,1),(113,29,2,'move',0,10,-240,335,0.00,0,0,1,1),(114,30,2,'turn',0,0,396,-189,25.20,26,55,1,1),(115,30,2,'move',0,165,247,-259,0.00,0,0,1,1),(116,32,2,'move',0,110,311,-119,140.51,0,0,0,1),(117,33,2,'move',0,142,294,-116,207.28,0,0,0,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=154 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `damages`
--

LOCK TABLES `damages` WRITE;
/*!40000 ALTER TABLE `damages` DISABLE KEYS */;
INSERT INTO `damages` VALUES (50,11,2,4,6,1,2,0,'Particle',49,0,20,0,29,0,20,0,'p;',0),(51,12,2,4,6,9,2,0,'Particle',46,0,15,31,0,0,15,0,'p;',0),(52,14,2,6,6,1,2,0,'Laser',178,0,23,0,36,0,23,0,'p;',0),(53,17,2,6,6,1,2,0,'Particle',36,0,11,0,25,0,22,0,'p;',0),(54,14,2,6,6,2,2,0,'Laser',178,0,23,20,16,0,23,0,'p;c;',0),(55,14,2,6,6,4,2,0,'Laser',178,0,22,20,17,0,22,0,'p;c;',0),(56,18,2,6,6,4,2,0,'Particle',36,0,11,20,5,0,22,0,'p;c;',0),(57,15,2,6,6,8,2,0,'Laser',115,0,13,25,0,0,13,0,'p;',0),(58,15,2,6,6,9,2,0,'Laser',115,0,13,25,0,0,13,0,'p;',0),(59,15,2,6,6,10,2,0,'Laser',115,0,13,25,0,0,13,0,'p;',0),(60,20,2,6,6,10,2,0,'Pulse',29,0,20,3,0,0,13,0,'b;v2;',0),(131,30,2,1,19,1,3,0,'Particle',40,0,18,0,22,0,18,0,'p;',0),(132,32,2,1,19,1,3,0,'Particle',37,0,18,0,19,0,18,0,'p;',0),(133,33,2,1,19,1,3,0,'Particle',38,0,17,0,21,0,17,0,'p;',0),(134,34,2,1,19,4,3,0,'Particle',13,0,0,0,0,0,18,0,'',0),(135,31,2,1,19,21,3,0,'Particle',14,0,0,0,0,12,8,0,'',0),(136,35,2,4,6,1,3,0,'Laser',84,0,19,0,23,0,19,0,'p;',0),(137,39,2,4,6,1,3,0,'Laser',98,0,19,0,30,0,19,0,'p;',0),(138,27,2,4,19,1,3,0,'Particle',49,0,18,0,31,0,18,0,'p;',0),(139,29,2,4,19,1,3,0,'Particle',46,0,18,0,28,0,18,0,'p;',0),(140,37,2,4,6,1,3,0,'Pulse',121,0,72,0,49,0,18,0,'p;v4;',0),(141,35,2,4,6,4,3,0,'Laser',84,0,19,20,3,0,19,0,'p;c;',0),(142,39,2,4,6,7,3,0,'Laser',98,0,14,35,0,0,14,0,'p;',0),(143,38,2,4,6,7,3,0,'Pulse',94,0,39,35,20,0,13,1,'p;v3;o8;',0),(144,47,2,6,6,1,3,0,'Laser',224,0,21,0,53,0,21,0,'p;',0),(145,47,2,6,6,1,3,0,'Laser',224,0,21,0,53,0,21,0,'p;',0),(146,47,2,6,6,1,3,0,'Laser',224,0,20,0,54,0,20,0,'p;',0),(147,43,2,6,20,1,3,0,'Laser',81,0,23,0,4,0,23,0,'p;',0),(148,45,2,6,6,1,3,0,'Pulse',59,0,40,0,19,0,20,0,'p;v2;',0),(149,46,2,6,6,1,3,0,'Pulse',126,0,95,0,31,0,19,0,'p;v5;',0),(150,43,2,6,20,22,3,0,'Laser',81,0,14,13,0,0,14,0,'p;',0),(151,43,2,6,20,26,3,0,'Laser',81,0,10,17,0,0,10,0,'p;',0),(152,50,2,7,4,4,3,0,'Particle',36,0,8,0,28,0,16,0,'p;',0),(153,50,2,7,4,4,3,0,'Particle',36,0,8,0,28,0,16,0,'p;',0);
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
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fireorders`
--

LOCK TABLES `fireorders` WRITE;
/*!40000 ALTER TABLE `fireorders` DISABLE KEYS */;
INSERT INTO `fireorders` VALUES (1,2,1,4,6,252,197,7,1,33,'63;',0,1),(2,2,1,1,6,252,193,13,1,47,'15;',1,1),(3,2,1,2,6,248,200,8,2,33,'52;49;',0,1),(4,2,1,3,6,253,196,8,2,31,'44;6;',1,1),(5,2,1,5,4,-397,237,11,1,88,'86;',1,1),(6,2,1,5,4,-397,237,16,1,88,'21;',1,1),(7,2,1,7,2,-337,558,5,1,60,'52;',1,1),(8,2,1,7,2,-337,558,10,1,60,'99;',0,1),(9,2,2,1,0,373,24,9,0,0,'',0,1),(10,2,2,6,4,-239,202,8,1,53,'85;',0,1),(11,2,2,6,4,-239,202,9,1,53,'1;',1,1),(12,2,2,6,4,-239,202,10,1,53,'25;',1,1),(13,2,2,6,4,-239,202,11,1,53,'95;',0,1),(14,2,2,4,6,100,200,9,1,63,'50;',1,1),(15,2,2,4,6,101,197,11,1,63,'58;',1,1),(16,2,2,4,6,101,197,13,1,42,'86;',0,1),(17,2,2,1,6,103,197,7,2,50,'47;70;',1,1),(18,2,2,1,6,103,197,11,2,50,'93;49;',1,1),(19,2,2,1,6,103,197,14,1,17,'18;',0,1),(20,2,2,1,6,103,197,15,1,17,'14;',1,1),(21,2,2,2,7,128,539,7,2,27,'76;82;',0,1),(22,2,2,2,7,128,539,9,2,27,'71;33;',0,1),(23,2,2,3,7,131,543,7,2,28,'69;40;',0,1),(24,2,2,3,7,131,543,9,2,28,'64;66;',0,1),(25,2,3,4,0,8,213,8,0,0,'',0,1),(26,2,3,6,4,-116,265,22,1,25,'26;',0,1),(27,2,3,6,4,-116,265,23,1,25,'16;',1,1),(28,2,3,6,4,-116,265,24,1,25,'67;',0,1),(29,2,3,6,4,-116,265,25,1,25,'25;',1,1),(30,2,3,5,1,-80,3,7,1,128,'14;',1,1),(31,2,3,5,1,-80,3,8,1,112,'17;',1,1),(32,2,3,5,1,-80,3,9,1,128,'66;',1,1),(33,2,3,5,1,-80,3,12,1,128,'1;',1,1),(34,2,3,5,1,-80,3,14,1,112,'46;',1,1),(35,2,3,7,4,-109,262,5,1,73,'1;',1,1),(36,2,3,7,4,-109,262,6,1,38,'61;',0,1),(37,2,3,7,4,-109,262,7,1,58,'13;',1,1),(38,2,3,7,4,-109,262,8,1,58,'33;',1,1),(39,2,3,7,4,-109,262,10,1,73,'40;',1,1),(40,2,3,7,4,-109,262,11,1,38,'62;',0,1),(41,2,3,7,4,-109,262,12,1,58,'89;',0,1),(42,2,3,7,4,-109,262,13,1,58,'68;',0,1),(43,2,3,4,6,-37,132,20,1,89,'57;',1,1),(44,2,3,4,6,-37,132,22,1,80,'89;',0,1),(45,2,3,1,6,-34,138,8,1,77,'63;',1,1),(46,2,3,1,6,-34,138,10,1,77,'12;',1,1),(47,2,3,1,6,-34,138,20,1,85,'13;',1,1),(48,2,3,1,6,-34,138,21,1,69,'87;',0,1),(49,2,3,1,6,-34,138,22,1,69,'77;',0,1),(50,2,3,2,7,-18,427,14,2,79,'62;17;',2,1),(51,2,3,2,7,-18,427,17,1,69,'96;',0,1),(52,2,3,2,7,-18,427,18,1,69,'75;',0,1),(53,4,2,30,0,-348,339,15,0,0,'',0,1),(54,4,2,31,22,-346,-370,9,3,0,'',0,1);
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
INSERT INTO `games` VALUES (2,'myGame','active',3,3,3500,1500,2,3,5,10),(3,'myGame','active',1,-1,3500,1500,11,3,10,10),(4,'myGame','active',2,2,3500,1500,11,3,10,10);
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
INSERT INTO `globals` VALUES (2,2,0,0,'Morale',0,100.00,'',''),(3,3,0,0,'Morale',0,110.00,'',''),(4,13,0,0,'Morale',0,110.00,'',''),(5,4,0,0,'Morale',0,115.00,'',''),(6,5,0,0,'Morale',0,100.00,'','');
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loads`
--

LOCK TABLES `loads` WRITE;
/*!40000 ALTER TABLE `loads` DISABLE KEYS */;
INSERT INTO `loads` VALUES (1,29,2,'Command',2),(3,31,5,'Javelin',3),(5,31,13,'Javelin',3);
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
INSERT INTO `missions` VALUES (1,20,'2',2,5,373,26,0),(2,32,'2',2,29,-340,335,0),(3,33,'2',2,22,-344,-365,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playerstatus`
--

LOCK TABLES `playerstatus` WRITE;
/*!40000 ALTER TABLE `playerstatus` DISABLE KEYS */;
INSERT INTO `playerstatus` VALUES (2,1,2,3,3,'Earth Alliance',2605,2115,1540,385,1155,'ready'),(3,2,2,3,3,'Minbari Federation',2530,1690,2000,500,1385,'waiting'),(4,1,4,2,2,'Narn Regime',1011,3989,1540,385,1540,'waiting'),(5,2,4,2,2,'Centauri Republic',1224,3537,1540,385,1225,'waiting');
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
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `powers`
--

LOCK TABLES `powers` WRITE;
/*!40000 ALTER TABLE `powers` DISABLE KEYS */;
INSERT INTO `powers` VALUES (1,7,5,1,'1',3),(2,7,10,1,'1',3),(3,4,14,1,'0',0),(4,4,16,1,'0',0),(5,4,18,1,'0',0),(6,4,23,1,'0',0),(7,1,14,1,'-1',0),(8,1,15,1,'-1',0),(9,1,21,1,'-1',0),(10,1,22,1,'-1',0),(11,2,11,1,'-1',0),(12,2,12,1,'-1',0),(13,2,17,1,'-1',0),(14,2,18,1,'-1',0),(15,3,11,1,'-1',0),(16,3,12,1,'-1',0),(17,3,17,1,'-1',0),(18,3,18,1,'-1',0),(19,4,9,2,'1',5),(20,4,11,2,'1',3),(21,4,13,2,'1',3),(22,4,14,2,'0',0),(23,4,16,2,'0',0),(24,4,18,2,'0',0),(25,4,23,2,'0',0),(26,1,14,2,'-1',0),(27,1,15,2,'-1',0),(28,1,20,2,'1',4),(29,1,21,2,'-1',0),(30,1,22,2,'-1',0),(31,2,11,2,'-1',0),(32,2,12,2,'-1',0),(33,2,17,2,'-1',0),(34,2,18,2,'-1',0),(35,2,4,2,'1',3),(36,3,11,2,'-1',0),(37,3,12,2,'-1',0),(38,3,17,2,'-1',0),(39,3,18,2,'-1',0),(40,3,4,2,'1',3),(41,6,15,3,'0',0),(42,6,16,3,'0',0),(43,6,18,3,'0',0),(44,6,19,3,'0',0),(45,4,9,3,'0',0),(46,4,14,3,'0',0),(47,4,16,3,'0',0),(48,4,18,3,'0',0),(49,4,22,3,'1',3),(50,4,23,3,'0',0),(51,4,4,3,'1',3),(52,4,4,3,'1',5),(53,1,14,3,'-1',0),(54,1,15,3,'-1',0),(55,1,20,3,'1',4),(56,1,21,3,'-1',0),(57,1,22,3,'-1',0),(58,2,11,3,'-1',0),(59,2,12,3,'-1',0),(60,2,17,3,'-1',0),(61,2,18,3,'-1',0),(62,3,11,3,'-1',0),(63,3,12,3,'-1',0),(64,3,17,3,'-1',0),(65,3,18,3,'-1',0),(66,31,9,2,'1',0),(67,31,9,2,'1',0),(68,31,9,2,'1',0);
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
INSERT INTO `sensors` VALUES (1,6,4,1,0.08,702,1),(2,5,4,1,360.00,801,0),(3,7,2,1,359.71,788,0),(4,4,4,1,358.70,880,0),(5,1,4,1,-1.00,102,0),(6,2,4,1,-1.00,95,0),(7,3,4,1,-1.00,95,0),(8,4,4,2,22.96,439,1),(9,1,4,2,-1.00,102,0),(10,2,4,2,359.54,377,0),(11,3,4,2,359.19,354,0),(12,6,4,2,0.58,445,0),(13,5,4,2,0.21,459,1),(14,7,2,2,358.92,337,1),(15,-13,2,2,-1.00,102,0),(16,6,4,3,-1.00,112,0),(17,5,4,3,50.71,251,0),(18,7,2,3,349.68,397,0),(19,4,4,3,323.53,251,1),(20,1,4,3,327.84,316,1),(21,2,4,3,259.61,149,0),(22,3,4,3,-1.00,95,0),(23,22,4,1,-1.00,113,0),(24,29,4,1,-1.00,113,0),(25,21,4,1,-1.00,113,0),(26,30,4,1,-1.00,106,0),(27,31,2,1,-1.00,77,0),(28,21,4,2,-1.00,113,0),(29,30,4,2,-1.00,106,0),(30,31,2,2,-1.00,77,0),(31,22,4,2,-1.00,113,0),(32,29,4,2,-1.00,113,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subunits`
--

LOCK TABLES `subunits` WRITE;
/*!40000 ALTER TABLE `subunits` DISABLE KEYS */;
INSERT INTO `subunits` VALUES (1,7,1,'WhiteStar'),(2,7,1,'WhiteStar'),(11,13,1,'WhiteStar'),(12,13,1,'WhiteStar'),(15,20,10,'Aurora'),(16,31,1,'Vorchan'),(17,31,1,'Vorchan'),(18,31,1,'Vorchan'),(19,32,8,'Sentri'),(20,33,3,'Javelin');
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
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `systemcrits`
--

LOCK TABLES `systemcrits` WRITE;
/*!40000 ALTER TABLE `systemcrits` DISABLE KEYS */;
INSERT INTO `systemcrits` VALUES (1,2,9,1,'Damage',0,-30.00),(2,4,5,1,'Overload',0,-0.12),(3,4,9,1,'Damage',0,-30.00),(4,6,2,1,'',0,0.00),(5,6,5,1,'Overload',0,-6.47),(6,6,11,1,'Damage',0,-30.00),(14,6,2,2,'Morale',0,-10.00),(15,6,4,2,'Output',0,-15.00),(16,6,10,2,'Damage',0,-30.00),(38,1,21,3,'Damage',0,-30.00),(39,4,2,3,'',0,0.00),(40,4,5,3,'Overload',0,-4.89),(41,6,2,3,'',0,0.00),(42,6,26,3,'Damage',0,-30.00);
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
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `units`
--

LOCK TABLES `units` WRITE;
/*!40000 ALTER TABLE `units` DISABLE KEYS */;
INSERT INTO `units` VALUES (1,2,1,1,0,'Hyperion','',1055,775,'bought',1,1,0,-183,-112,16.65,0,155,0,0,0,2,3,0,''),(2,2,1,1,0,'Artemis','',490,490,'bought',0,1,0,-174,556,0.00,0,165,0,0,0,2,3,0,''),(3,2,1,1,0,'Artemis','',490,490,'jumpOut',0,1,1,-120,709,338.33,0,165,0,0,0,2,3,0,''),(4,2,1,1,0,'GQuan','',850,850,'bought',0,1,0,-242,193,345.15,0,155,0,0,0,2,3,0,'p;34;91'),(5,2,2,1,0,'Tinashi','',600,600,'bought',0,1,0,215,-20,196.21,0,165,0,0,0,2,3,0,''),(6,2,2,1,0,'Tigara','',1150,1150,'bought',1,1,0,104,196,174.02,0,155,0,0,0,2,3,0,'p;42;100'),(7,2,2,1,0,'Squadron','',780,780,'bought',0,1,0,129,542,171.70,0,185,0,0,0,2,3,0,''),(13,2,2,1,0,'Squadron','',780,0,'bought',0,5,0,0,0,0.00,0,0,0,0,0,2,-1,0,''),(18,3,2,1,0,'GQuan','',850,850,'bought',1,1,0,0,0,0.00,0,0,0,0,0,0,0,0,''),(19,3,1,1,0,'Tigara','',1150,1150,'bought',1,1,0,0,0,0.00,0,0,0,0,0,0,0,0,''),(20,2,1,0,0,'Flight','',280,280,'deployed',0,2,0,-235,-132,13.96,0,200,0,0,0,2,3,0,''),(21,4,2,1,0,'GQuan','',850,850,'bought',1,1,0,346,-439,180.00,0,155,0,0,0,1,3,0,''),(22,4,1,1,0,'GQuan','',850,850,'bought',1,1,0,-344,-365,0.00,0,155,0,0,0,1,3,0,''),(23,5,1,1,0,'GQuan','',850,850,'bought',1,1,0,0,0,0.00,0,0,0,0,0,0,0,0,''),(24,6,1,1,0,'GQuan','',850,850,'bought',1,1,0,0,0,0.00,0,0,0,0,0,0,0,0,''),(25,7,1,1,0,'Sharlin','',1700,1700,'bought',1,1,0,0,0,0.00,0,0,0,0,0,0,0,0,''),(26,8,1,1,0,'GSten','',750,750,'bought',1,1,0,0,0,0.00,0,0,0,0,0,0,0,0,''),(27,9,1,1,0,'KaToc','',460,460,'bought',1,1,0,0,0,0.00,0,0,0,0,0,0,0,0,''),(28,10,1,1,0,'GQuan','',850,850,'bought',1,1,0,0,0,0.00,0,0,0,0,0,0,0,0,''),(29,4,1,1,0,'GQuan','',1011,1011,'bought',1,1,0,-340,335,0.00,0,155,0,0,0,1,3,0,''),(30,4,2,1,0,'Altarian','',718,510,'bought',1,1,0,396,-189,180.00,0,165,0,0,0,1,3,1,''),(31,4,2,1,0,'Squadron','',745,714,'bought',0,1,0,436,-47,180.00,0,185,0,0,0,1,3,0,''),(32,4,2,0,0,'Flight','',208,208,'deployed',0,2,0,396,-189,0.00,0,0,0,0,0,2,-1,0,''),(33,4,2,0,1,'Salvo','',0,0,'deployed',0,2,0,420,-51,0.00,0,0,0,0,0,2,-1,0,'');
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

-- Dump completed on 2018-09-21 21:53:36

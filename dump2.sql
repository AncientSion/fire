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
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actions`
--

LOCK TABLES `actions` WRITE;
/*!40000 ALTER TABLE `actions` DISABLE KEYS */;
INSERT INTO `actions` VALUES (1,2,1,'deploy',0,0,551,-34,180.00,0,0,1,1),(2,1,1,'deploy',0,0,-431,-367,0.00,0,0,1,1),(3,1,1,'jumpIn',0,0,-431,-367,0.00,0,0,0,1),(4,2,1,'jumpIn',0,0,551,-34,0.00,0,0,0,1),(5,1,1,'move',0,165,-266,-367,0.00,0,0,1,1),(6,2,1,'turn',0,0,551,-34,22.01,23,63,1,1),(7,2,1,'move',0,155,407,-92,0.00,0,0,1,1),(8,5,1,'deploy',0,0,454,-364,180.00,0,0,1,1),(9,6,1,'deploy',0,0,581,-119,180.00,0,0,1,1),(10,7,1,'deploy',0,0,552,-239,180.00,0,0,1,1),(11,3,1,'deploy',0,0,-443,-337,0.00,0,0,1,1),(12,4,1,'deploy',0,0,-518,-241,0.00,0,0,1,1),(13,3,1,'jumpIn',0,0,-443,-337,0.00,0,0,0,1),(14,4,1,'jumpIn',0,0,-518,-241,0.00,0,0,0,1),(15,5,1,'jumpIn',0,0,454,-364,0.00,0,0,0,1),(16,6,1,'jumpIn',0,0,581,-119,0.00,0,0,0,1),(17,7,1,'jumpIn',0,0,552,-239,0.00,0,0,0,1),(18,3,1,'turn',0,0,-443,-337,-30.00,30,86,1,1),(19,3,1,'move',0,152,-518,-470,0.00,0,0,1,1),(20,3,1,'turn',0,0,-518,-470,30.00,59,3,1,1),(21,3,1,'move',0,3,-515,-470,0.00,0,0,1,1),(22,4,1,'turn',0,0,-518,-241,-20.31,21,58,1,1),(23,4,1,'move',0,155,-373,-295,0.00,0,0,1,1),(24,5,1,'move',0,154,304,-399,0.00,0,0,1,1),(25,5,1,'turn',0,0,304,-399,1.72,4,1,1,1),(26,5,1,'move',0,1,303,-399,0.00,0,0,1,1),(27,6,1,'turn',0,0,581,-119,13.39,14,39,1,1),(28,6,1,'move',0,155,430,-155,0.00,0,0,1,1),(29,7,1,'turn',0,0,552,-239,10.82,11,31,1,1),(30,7,1,'move',0,155,400,-268,0.00,0,0,1,1),(44,5,2,'move',0,155,148,-404,0.00,0,0,1,1),(45,5,2,'turn',0,0,148,-404,-15.72,32,0,1,1),(46,6,2,'speed',0,1,430,-155,0.00,30,0,1,1),(47,6,2,'turn',0,0,430,-155,-5.86,7,19,1,1),(48,6,2,'move',0,174,258,-178,0.00,0,0,1,1),(49,7,2,'move',0,155,248,-297,0.00,0,0,1,1),(50,3,2,'turn',0,0,-515,-470,30.00,30,86,1,1),(51,3,2,'move',0,89,-558,-391,0.00,0,0,1,1),(52,3,2,'turn',0,0,-558,-391,30.00,37,66,1,1),(53,3,2,'move',0,66,-612,-355,0.00,0,0,1,1),(54,3,2,'turn',0,0,-612,-355,28.00,28,80,1,1),(55,4,2,'turn',0,0,-373,-295,26.11,27,75,1,1),(56,4,2,'move',0,155,-219,-279,0.00,0,0,1,1),(57,11,1,'deploy',0,0,554,-245,180.00,0,0,1,1),(58,10,1,'deploy',0,0,442,-361,180.00,0,0,1,1),(59,8,1,'deploy',0,0,-452,-468,35.60,0,0,1,1),(60,9,1,'deploy',0,0,-608,-373,35.00,0,0,1,1),(61,8,1,'jumpIn',0,0,-452,-468,0.00,0,0,0,1),(62,9,1,'jumpIn',0,0,-608,-373,0.00,0,0,0,1),(63,10,1,'jumpIn',0,0,442,-361,0.00,0,0,0,1),(64,11,1,'jumpIn',0,0,554,-245,0.00,0,0,0,1),(65,8,1,'move',0,155,-326,-378,0.00,0,0,1,1),(66,9,1,'move',0,155,-481,-284,0.00,0,0,1,1),(67,11,1,'move',0,165,389,-245,0.00,0,0,1,1),(68,10,1,'move',0,185,257,-361,0.00,0,0,1,1),(69,17,5,'deploy',0,0,787,-351,180.00,0,0,1,1),(70,12,5,'deploy',0,0,-817,-235,0.00,0,0,1,1),(71,11,2,'move',0,165,224,-245,0.00,0,0,1,1),(72,10,2,'move',0,185,72,-361,0.00,0,0,1,1),(73,8,2,'move',0,155,-200,-288,0.00,0,0,1,1),(74,9,2,'turn',0,0,-481,-284,-30.00,30,78,1,1),(75,9,2,'move',0,155,-327,-270,0.00,0,0,1,1),(80,22,3,'deploy',0,0,-200,-288,0.00,1,0,1,1),(81,23,3,'deploy',0,0,-327,-270,0.00,1,0,1,1),(85,8,3,'turn',0,0,-200,-288,-30.00,30,78,1,1),(86,8,3,'move',0,155,-45,-272,0.00,0,0,1,1),(87,8,3,'turn',0,0,-45,-272,-20.75,42,0,1,1),(88,10,3,'move',0,185,-113,-361,0.00,0,0,1,1),(89,10,3,'turn',0,0,-113,-361,-45.00,90,0,1,1),(90,11,3,'move',0,165,59,-245,0.00,0,0,1,1),(91,9,3,'move',0,153,-177,-236,0.00,0,0,1,1),(92,9,3,'turn',0,0,-177,-236,-15.12,32,2,1,1),(93,9,3,'move',0,2,-175,-236,0.00,0,0,1,1),(94,22,3,'move',0,114,-113,-361,320.00,0,0,0,1),(95,23,3,'move',0,125,-212,-319,336.96,0,0,0,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `damages`
--

LOCK TABLES `damages` WRITE;
/*!40000 ALTER TABLE `damages` DISABLE KEYS */;
INSERT INTO `damages` VALUES (1,8,2,5,6,1,1,0,'Particle',36,0,12,0,24,0,23,0,'p;',0),(2,4,2,5,6,7,1,0,'Particle',36,0,7,29,0,0,14,0,'p;',0),(3,9,2,5,6,7,1,0,'Particle',36,0,7,29,0,0,14,0,'p;',0),(4,11,2,5,6,8,1,0,'Particle',36,0,7,29,0,0,14,0,'p;',0),(5,1,2,5,6,13,1,0,'Particle',36,0,5,24,7,0,10,1,'p;o3;',0),(6,28,2,3,18,1,2,0,'Laser',66,0,18,0,4,0,18,0,'p;',0),(7,28,2,3,18,19,2,0,'Laser',66,0,11,11,0,0,11,0,'p;',0),(8,28,2,3,18,21,2,0,'Laser',66,0,10,12,0,0,10,0,'p;',0),(23,17,2,6,6,1,2,0,'Laser',200,0,18,0,48,0,18,0,'p;',0),(24,17,2,6,6,7,2,0,'Laser',200,0,14,52,0,0,14,0,'p;',0),(25,17,2,6,6,9,2,0,'Laser',200,0,14,52,0,0,14,0,'p;',0),(26,18,2,7,6,1,2,0,'Laser',177,0,18,0,41,0,18,0,'p;',0),(27,15,2,7,6,1,2,0,'Pulse',102,0,64,0,38,0,16,0,'p;v4;',0),(28,16,2,7,6,2,2,0,'Particle',36,0,8,20,8,0,16,0,'p;c;',0),(29,18,2,7,6,7,2,0,'Laser',177,0,14,45,0,0,14,0,'p;',0),(30,13,2,7,6,7,2,0,'Particle',36,0,7,15,14,0,14,1,'p;',0),(31,18,2,7,6,8,2,0,'Laser',177,0,18,41,0,0,18,0,'p;',0),(32,13,2,7,6,8,2,0,'Particle',36,0,9,27,0,0,17,0,'p;',0),(33,16,2,7,6,9,2,0,'Particle',36,0,7,29,0,0,13,0,'p;',0),(34,29,3,8,6,1,1,0,'Laser',91,0,18,0,27,0,18,0,'p;',0),(35,30,3,8,6,1,1,0,'Laser',105,0,17,0,35,0,17,0,'p;',0),(36,30,3,8,6,7,1,0,'Laser',105,0,10,40,2,0,10,1,'p;o4;',0),(37,29,3,8,6,8,1,0,'Laser',91,0,11,34,0,0,11,0,'p;',0),(38,32,3,10,9,5,1,0,'Laser',99,0,12,0,21,0,12,0,'p;',0),(39,32,3,10,9,5,1,0,'Laser',99,0,12,0,21,0,12,0,'p;',0),(40,32,3,10,9,5,1,0,'Laser',99,0,11,0,22,0,11,0,'p;',0),(41,34,3,11,6,1,1,0,'Laser',68,0,19,0,3,0,19,0,'p;',0),(42,34,3,11,6,4,1,0,'Laser',68,0,20,2,0,0,20,0,'p;',0),(43,34,3,11,6,7,1,0,'Laser',68,0,12,10,0,0,12,0,'p;',0),(44,36,3,8,16,1,2,0,'Particle',30,0,16,0,14,0,16,0,'p;',0),(45,38,3,8,16,17,2,0,'Particle',39,0,9,30,0,0,9,0,'p;',0),(46,35,3,8,16,19,2,0,'Particle',42,0,16,26,0,0,16,0,'p;',0);
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
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fireorders`
--

LOCK TABLES `fireorders` WRITE;
/*!40000 ALTER TABLE `fireorders` DISABLE KEYS */;
INSERT INTO `fireorders` VALUES (1,2,1,3,5,295,-395,7,2,5,'93;4;',1,1),(2,2,1,3,5,295,-395,8,2,5,'41;8;',0,1),(3,2,1,3,5,295,-395,9,2,5,'31;29;',0,1),(4,2,1,3,5,295,-395,11,2,5,'3;27;',1,1),(5,2,1,3,5,295,-395,12,2,5,'7;52;',0,1),(6,2,1,3,5,295,-395,13,2,5,'55;75;',0,1),(7,2,1,3,5,295,-395,15,2,5,'41;9;',0,1),(8,2,1,3,5,295,-395,16,2,5,'1;93;',1,1),(9,2,1,3,5,295,-395,17,2,5,'4;66;',1,1),(10,2,1,3,5,295,-395,19,2,5,'34;44;',0,1),(11,2,1,3,5,295,-395,20,2,5,'4;17;',1,1),(12,2,1,3,5,295,-395,21,2,5,'65;17;',0,1),(27,2,2,7,3,-609,-360,19,1,46,'79;',0,1),(28,2,2,7,3,-609,-360,20,1,46,'31;',1,1),(29,3,1,11,8,-327,-380,11,1,34,'8;',1,1),(30,3,1,11,8,-327,-380,16,1,34,'4;',1,1),(31,3,1,8,10,259,-361,17,1,50,'55;',0,1),(32,3,1,8,10,259,-361,18,1,50,'8;',1,1),(33,3,1,9,11,394,-243,17,1,51,'82;',0,1),(34,3,1,9,11,394,-243,18,1,51,'39;',1,1),(35,3,2,10,8,-199,-287,7,1,39,'37;',1,1),(36,3,2,10,8,-199,-287,8,1,49,'36;',1,1),(37,3,2,10,8,-199,-287,11,1,49,'80;',0,1),(38,3,2,10,8,-199,-287,12,1,49,'4;',1,1),(39,3,3,8,0,72,-360,13,0,0,'',0,2),(40,3,3,9,0,70,-363,13,0,0,'',0,2),(41,3,3,8,10,-108,-353,14,0,0,'',0,0),(42,3,3,8,10,-108,-353,15,0,0,'',0,0),(43,3,3,9,10,-113,-361,7,0,0,'',0,0),(44,3,3,9,10,-113,-361,8,0,0,'',0,0),(45,3,3,22,10,-113,-361,2,0,0,'',0,0),(46,3,3,22,10,-113,-361,4,0,0,'',0,0),(47,3,3,22,10,-113,-361,6,0,0,'',0,0),(48,3,3,22,10,-113,-361,8,0,0,'',0,0),(49,3,3,22,10,-113,-361,10,0,0,'',0,0),(50,3,3,22,10,-113,-361,12,0,0,'',0,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `games`
--

LOCK TABLES `games` WRITE;
/*!40000 ALTER TABLE `games` DISABLE KEYS */;
INSERT INTO `games` VALUES (1,'myGame','active',2,-1,3500,1500,11,3,10,10),(2,'myGame','active',3,-1,3500,1500,11,3,10,10),(3,'myGame','active',3,2,3500,1500,2,3,10,10);
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
INSERT INTO `globals` VALUES (1,1,0,0,'Morale',0,100.00,'',''),(2,2,0,0,'Morale',0,100.00,'',''),(3,3,0,0,'Morale',0,100.00,'',''),(4,4,0,0,'Morale',0,100.00,'',''),(5,5,0,0,'Morale',0,115.00,'',''),(6,6,0,0,'Morale',0,100.00,'','');
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
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loads`
--

LOCK TABLES `loads` WRITE;
/*!40000 ALTER TABLE `loads` DISABLE KEYS */;
INSERT INTO `loads` VALUES (1,1,2,'Command',2),(2,1,2,'Engine',2),(3,1,2,'Sensor',2),(4,3,2,'Command',3),(5,3,2,'Engine',3),(6,3,2,'Sensor',3),(7,3,2,'Reactor',3),(8,8,11,'Vran',12),(10,9,11,'Vran',12),(12,11,2,'Command',2),(13,12,7,'Vran',12),(14,12,9,'Vran',12);
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `missions`
--

LOCK TABLES `missions` WRITE;
/*!40000 ALTER TABLE `missions` DISABLE KEYS */;
INSERT INTO `missions` VALUES (1,22,'2',3,10,72,-361,3),(2,23,'2',3,10,72,-361,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playerstatus`
--

LOCK TABLES `playerstatus` WRITE;
/*!40000 ALTER TABLE `playerstatus` DISABLE KEYS */;
INSERT INTO `playerstatus` VALUES (1,1,1,2,-1,'Minbari Federation',843,4157,2000,500,850,'waiting'),(2,2,1,2,-1,'Earth Alliance',775,4225,1540,385,770,'waiting'),(3,1,2,3,-1,'Vree Conglomerate',2550,2450,1768,442,1269,'waiting'),(4,2,2,3,-1,'Minbari Federation',2650,2350,2000,500,1385,'waiting'),(5,1,3,3,2,'Narn Regime',1300,2672,1540,385,505,'ready'),(6,2,3,3,2,'Minbari Federation',1206,3234,2000,500,704,'waiting');
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
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `powers`
--

LOCK TABLES `powers` WRITE;
/*!40000 ALTER TABLE `powers` DISABLE KEYS */;
INSERT INTO `powers` VALUES (1,2,14,1,'-1',0),(2,2,15,1,'-1',0),(3,2,21,1,'-1',0),(4,2,22,1,'-1',0),(5,6,7,1,'0',0),(6,6,9,1,'0',0),(7,7,7,1,'0',0),(8,7,9,1,'0',0),(23,5,12,2,'1',3),(24,5,15,2,'0',0),(25,5,16,2,'0',0),(26,5,18,2,'0',0),(27,5,19,2,'0',0),(28,5,26,2,'1',3),(29,5,27,2,'1',3),(30,5,4,2,'1',3),(31,6,7,2,'0',0),(32,6,9,2,'0',0),(33,7,7,2,'0',0),(34,7,9,2,'0',0),(35,8,10,3,'1',2),(36,9,7,3,'1',3),(37,9,8,3,'1',3),(38,9,10,3,'0',0),(39,9,14,3,'0',0),(40,9,15,3,'0',0),(41,11,8,3,'1',3),(42,11,14,3,'0',0),(43,22,2,3,'-2',0),(44,22,4,3,'-2',0),(45,22,6,3,'-2',0),(46,22,8,3,'-2',0),(47,22,10,3,'-2',0),(48,22,12,3,'-2',0);
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
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sensors`
--

LOCK TABLES `sensors` WRITE;
/*!40000 ALTER TABLE `sensors` DISABLE KEYS */;
INSERT INTO `sensors` VALUES (1,2,4,1,-1.00,102,0),(2,1,4,1,-1.00,118,0),(3,5,4,1,-1.00,132,0),(4,6,4,1,-1.00,110,0),(5,7,4,1,-1.00,110,0),(6,3,4,1,-1.00,139,0),(7,4,4,1,-1.00,102,0),(8,3,4,2,-1.00,139,0),(9,4,4,2,349.84,512,0),(10,5,4,2,20.96,676,0),(11,6,4,2,1.46,614,0),(12,7,4,2,351.71,588,0),(13,11,4,1,-1.00,110,0),(14,10,3,1,-1.00,73,0),(15,8,4,1,329.63,965,0),(16,9,4,1,330.19,1049,0),(17,11,4,2,-1.00,110,0),(18,10,3,2,-1.00,73,0),(19,-17,3,2,-1.00,73,0),(20,8,4,2,-1.00,102,0),(21,9,4,2,-1.00,102,0),(22,-12,4,2,-1.00,110,0),(23,8,4,3,28.50,264,1),(24,9,4,3,342.28,286,0),(25,11,4,3,359.58,274,1),(26,10,3,3,0.29,137,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subunits`
--

LOCK TABLES `subunits` WRITE;
/*!40000 ALTER TABLE `subunits` DISABLE KEYS */;
INSERT INTO `subunits` VALUES (1,4,1,'Xvell'),(2,4,1,'Xvell'),(3,10,1,'Shaveen'),(4,10,1,'Shaveen'),(5,17,1,'Shaveen'),(6,17,1,'Shaveen'),(11,22,6,'Gorith'),(12,23,6,'Gorith');
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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `systemcrits`
--

LOCK TABLES `systemcrits` WRITE;
/*!40000 ALTER TABLE `systemcrits` DISABLE KEYS */;
INSERT INTO `systemcrits` VALUES (1,5,5,1,'Overload',0,-2.40),(2,5,7,1,'Damage',0,-30.00),(3,4,10,2,'Accuracy',0,-30.00),(4,6,7,2,'Max Range',0,-30.00),(5,6,9,2,'Ammo Amount',0,-30.00),(6,7,2,2,'Engine',0,-7.50),(7,8,5,1,'Overload',0,-3.21),(8,8,8,1,'Damage',0,-30.00),(9,10,7,1,'Accuracy',0,-30.00),(10,10,8,1,'Damage',0,-30.00),(11,8,17,2,'Accuracy',0,-30.00);
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
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `units`
--

LOCK TABLES `units` WRITE;
/*!40000 ALTER TABLE `units` DISABLE KEYS */;
INSERT INTO `units` VALUES (1,1,1,1,0,'Esharan','sdfsdf',843,843,'bought',1,1,0,0,0,-266,-367,0.00,0,165,0,0,0,1,3,0,''),(2,1,2,1,0,'Hyperion','sdfsdf',775,775,'bought',1,1,0,0,0,407,-92,202.01,0,155,0,0,0,1,3,0,''),(3,2,1,1,0,'Xill','',1775,1775,'bought',1,1,0,0,0,-612,-355,88.00,80,155,0,0,0,2,3,0,''),(4,2,1,0,0,'Squadron','',775,775,'bought',0,1,0,0,0,-219,-279,5.80,0,155,0,0,0,2,3,0,''),(5,2,2,1,0,'Tigara','',1150,1150,'bought',1,1,0,0,0,148,-404,166.00,0,155,0,0,0,2,3,0,''),(6,2,2,1,0,'GSten','',750,750,'bought',0,1,0,0,0,258,-178,187.53,0,174,0,0,0,2,3,0,''),(7,2,2,1,0,'GSten','',750,750,'bought',0,1,0,0,0,248,-297,190.82,0,155,0,0,0,2,3,0,''),(8,3,1,1,0,'Varnic','111',789,650,'bought',1,1,0,0,0,-200,-288,35.60,0,155,0,0,0,2,3,0,''),(9,3,1,1,0,'Varnic','222',789,650,'bought',0,1,0,0,0,-327,-270,5.00,0,155,0,0,0,2,3,1,''),(10,3,2,1,0,'Squadron','ye',560,560,'bought',0,1,0,0,0,72,-361,180.00,0,185,0,0,0,2,3,0,''),(11,3,2,1,0,'Tinashi','d',646,646,'bought',1,1,0,0,0,224,-245,180.00,0,165,0,0,0,2,3,1,''),(12,3,1,1,0,'GSten','',750,750,'bought',0,5,0,0,0,0,0,0.00,0,0,0,0,0,2,-1,0,''),(17,3,2,1,0,'Squadron','',560,560,'bought',0,5,0,0,0,0,0,0.00,0,0,0,0,0,2,-1,0,''),(22,3,1,0,0,'Flight','Green-Sigma',138,138,'deployed',0,3,0,0,0,-200,-288,0.00,0,0,0,0,0,3,-1,0,''),(23,3,1,0,0,'Flight','Dragon-Alpha',138,138,'deployed',0,3,0,0,0,-327,-270,0.00,0,0,0,0,0,3,-1,0,'');
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

-- Dump completed on 2018-10-09 19:45:11

CREATE DATABASE  IF NOT EXISTS `ag_first` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `ag_first`;
-- MySQL dump 10.13  Distrib 5.5.49, for debian-linux-gnu (x86_64)
--
-- Host: 127.0.0.1    Database: ag_first
-- ------------------------------------------------------
-- Server version	5.5.49-0ubuntu0.14.04.1

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
-- Table structure for table `card`
--

DROP TABLE IF EXISTS `card`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `card` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `project` int(10) unsigned NOT NULL,
  `proj_number` int(5) unsigned NOT NULL,
  `name` varchar(45) NOT NULL,
  `type` int(10) unsigned NOT NULL,
  `epic` int(10) unsigned DEFAULT NULL,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  `status` int(10) unsigned NOT NULL,
  `poc` int(10) unsigned DEFAULT NULL,
  `points` int(11) DEFAULT NULL,
  `sprint` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_status_idx` (`status`),
  KEY `fk_epic_idx` (`epic`),
  KEY `fk_card_project_idx` (`project`),
  CONSTRAINT `fk_card_project` FOREIGN KEY (`project`) REFERENCES `project` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_epic` FOREIGN KEY (`epic`) REFERENCES `epic` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `card`
--

LOCK TABLES `card` WRITE;
/*!40000 ALTER TABLE `card` DISABLE KEYS */;
INSERT INTO `card` VALUES (6,1,123,'New Card',0,6,'2016-08-03 12:13:55','2016-08-10 11:58:02',0,2,3,1),(11,2,124,'A Brand New Card',0,2,'2016-08-04 13:47:08','2016-08-09 23:10:29',0,2,1,1),(12,1,125,'A Brand New Card With Options!',0,1,'2016-08-04 21:37:21','2016-08-10 12:02:39',1,1,1,3),(14,1,126,'Yet another Card With A Very Long Title that ',0,6,'2016-08-06 19:42:20','2016-08-12 21:02:56',0,8,2,4),(15,1,127,'Build App',1,1,'2016-08-06 19:42:20','2016-08-12 21:58:32',0,1,NULL,NULL),(16,2,128,'Refactor App',1,2,'2016-08-06 19:42:20','2016-08-09 13:47:59',0,2,0,NULL),(17,1,129,'Refactored Card',0,6,'2016-08-06 23:25:27','2016-08-10 12:02:59',0,2,3,4),(20,2,130,'A New Name For You',0,2,'2016-08-07 18:08:02','2016-08-10 12:02:25',0,NULL,1,NULL),(21,1,131,'Refactored Create',0,1,'2016-08-09 14:51:15','2016-08-10 23:03:29',0,1,1,NULL),(22,2,132,'Another Test',0,2,'2016-08-09 14:59:35','2016-08-09 15:07:12',3,1,1,NULL),(39,1,133,'A New Epic',1,6,'2016-08-09 20:06:26','2016-08-09 20:06:26',0,0,14,NULL),(40,2,134,'Assign this to the new epic!!',0,7,'2016-08-09 20:09:08','2016-08-10 12:07:25',1,2,1,5),(41,1,134,'First Card with a Project!!',0,6,'2016-08-10 10:30:18','2016-08-12 15:50:23',1,1,2,4),(42,2,135,'A Project Epic',1,7,'2016-08-10 12:06:33','2016-08-10 12:06:33',0,0,0,NULL),(43,2,136,'One more test... for good measure',0,7,'2016-08-10 12:08:11','2016-08-10 12:14:57',0,2,1,NULL),(46,7,1,'First Card',0,NULL,'2016-08-10 22:39:50','2016-08-10 22:39:50',1,2,1,6),(47,7,2,'First Epic',1,9,'2016-08-10 22:42:01','2016-08-10 22:42:01',0,0,0,NULL),(49,16,1,'First Card',0,0,'2016-08-12 18:06:46','2016-08-12 18:10:33',1,8,1,NULL),(50,16,2,'A new epic!',1,11,'2016-08-12 18:11:18','2016-08-12 18:11:18',0,0,0,NULL),(51,16,3,'We are on a role now',0,11,'2016-08-12 18:12:53','2016-08-12 21:59:14',0,0,1,8),(52,16,4,'Fill up some space!',0,11,'2016-08-12 22:00:12','2016-08-12 22:00:12',1,8,1,NULL),(53,16,5,'Number 5',1,12,'2016-08-12 22:01:01','2016-08-12 22:01:11',0,8,0,NULL),(54,16,6,'Close This',0,12,'2016-08-12 22:01:50','2016-08-12 22:01:50',3,8,2,NULL);
/*!40000 ALTER TABLE `card` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `card_description`
--

DROP TABLE IF EXISTS `card_description`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `card_description` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `card_id` int(10) unsigned DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `card_id_UNIQUE` (`card_id`),
  CONSTRAINT `fk_card_description` FOREIGN KEY (`card_id`) REFERENCES `card` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `card_description`
--

LOCK TABLES `card_description` WRITE;
/*!40000 ALTER TABLE `card_description` DISABLE KEYS */;
INSERT INTO `card_description` VALUES (5,6,'A New Description for the new Feature!! Wahwahwewa'),(7,11,'Lorem ipsum dolor sit amet, in eum sale noluisse. Ne homero instructior delicatissimi nam, qui solum posidonium in, illum facilisis nec cu. No vis exerci tempor assentior, has ei menandri gloriatur. Cum elitr eligendi consectetuer ne, posse menandri voluptatum mel no. Amet ubique sententiae eu mel. Discere petentium cu vix, tollit splendide quo id.'),(8,12,'Lorem ipsum dolor sit amet, no posse elaboraret usu, ex paulo perfecto vel. Duo eu vide tibique recteque. Sed fuisset abhorreant ne. Numquam molestiae pri in. Est ex solet postulant assueverit, ea per prompta saperet. Mea in mentitum pericula similique, per quaestio conceptam posidonium no.'),(10,14,'Lorem ipsum dolor sit amet, at labitur eruditi per, \n\nad noster accumsan vix. Mei meliore appellantur eu. Detr\n\naxit accusamus splendide ex pri, nostrum petentium mnesarchum cu vix, ex tollit dolore indoctum vel. Et per dictas voluptua patrioque. At cum apeirian accommodare delicatissimi, integre deleniti et eum. Te ius sonet integre praesent.\n\nNe expetenda similique complectitur usu, duo et aeterno euripidis. Cu ius essent sadipscing, \n\nNe expetenda similique complectitur usu, duo et aeterno euripidis. Cu ius essent sadipscing, ad eam diam omnis noster. Ne erat summo epicurei has, est ne exerci putent suavitate. Brute graeco deterruisset pri ea. Pro et munere splendide, his an munere inciderint. An duo vitae voluptaria.\n\nLorem ipsum dolor sit amet, at labitur eruditi per, ad noster accumsan vix. Mei meliore appellantur eu. Detraxit accusamus splendide ex pri, nostrum petentium mnesarchum cu vix, ex tollit dolore indoctum vel. Et per dictas voluptua patrioque. At cum apeirian accommodare delicatissimi, integre deleniti et eum. Te ius sonet integre praesent.\n\nNe expetenda similique complectitur usu, duo et aeterno euripidis. Cu ius essent sadipscing, \n\nNe expetenda similique complectitur usu, duo et aeterno euripidis. Cu ius essent sadipscing, ad eam diam omnis noster. Ne erat summo epicurei has, est ne exerci putent suavitate. Brute graeco deterruisset pri ea. Pro et munere splendide, his an munere inciderint. An duo vitae voluptaria.\n\nLorem ipsum dolor sit amet, at labitur eruditi per, ad noster accumsan vix. Mei meliore appellantur eu. Detraxit accusamus splendide ex pri, nostrum petentium mnesarchum cu vix, ex tollit dolore indoctum vel. Et per dictas voluptua patrioque. At cum apeirian accommodare delicatissimi, integre deleniti et eum. Te ius sonet integre praesent.\n\nNe expetenda similique complectitur usu, duo et aeterno euripidis. Cu ius essent sadipscing, \n\nNe expetenda similique complectitur usu, duo et aeterno euripidis. Cu ius essent sadipscing, ad eam diam omnis noster. Ne erat summo epicurei has, est ne exerci putent suavitate. Brute graeco deterruisset pri ea. Pro et munere splendide, his an munere inciderint. An duo vitae voluptaria.'),(11,17,'This was made using the card and epic refactor! Now the same method can be used to push to and from the database. WoW!!'),(12,15,'Build the thing'),(13,16,'Refactor the app so it doesnt suck!! KTHANKS!!!'),(16,20,'A short description'),(17,21,'Another Refactor!'),(18,22,'Nopew'),(21,39,'This is simply a test'),(22,40,'There isnt any!!'),(23,41,'I hope this works on the first try! I am authorized!'),(24,42,'This is to test to new project system'),(25,43,'That was a long title. It probably wont fit'),(26,46,'This is a card. Please work. I dont want to debug stuff'),(27,47,'Blue, If I Were Green I Would Die.'),(29,49,'A description for the card'),(30,50,'Colors are fun'),(31,51,'I dont want to'),(32,52,'Here is a description.\n\nWith som espace..\n\n\n\n\n\nAnd moe\n\n\n\n\n\n\n\nPeople do wierd thinds\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nReally Wierd'),(33,53,'This is an epic'),(34,54,'This should be in the archive');
/*!40000 ALTER TABLE `card_description` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `card_steps`
--

DROP TABLE IF EXISTS `card_steps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `card_steps` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `card_id` int(10) unsigned DEFAULT NULL,
  `task` varchar(1024) DEFAULT NULL,
  `assigned` varchar(256) DEFAULT NULL,
  `status` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_step_status_idx` (`status`),
  KEY `fk_card_steps_idx` (`card_id`),
  CONSTRAINT `fk_card_steps` FOREIGN KEY (`card_id`) REFERENCES `card` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `card_steps`
--

LOCK TABLES `card_steps` WRITE;
/*!40000 ALTER TABLE `card_steps` DISABLE KEYS */;
INSERT INTO `card_steps` VALUES (1,6,'A Taks','0',3),(2,6,'Another Task','0',3),(3,11,'A Brand New Task!!','1',3),(4,12,'Make the thing','2',1),(5,12,'Review the thing','1',0),(6,12,'Test the thing','2',0),(7,14,'I am not typeing all that out again','2',3),(8,20,'A task for you','0',0),(16,6,'A second task for ABC-123','0',1),(17,6,'That was actually the third. Oops!','7',2),(18,6,'That was actually the third. Oops!','0',3),(19,21,'See if tihs works','1',0),(20,22,'Here We go',NULL,2),(21,22,'FIx the null assigned!','0',0),(22,40,'Does tall this work?','2',2),(23,41,'I bet it doesnt','1',1),(24,43,'Here is a task','0',0),(25,43,'And another one!','1',0),(26,46,'Here goes nothing','1',1),(27,17,'My first task','8',0),(28,49,'Testinf a bit of everything','0',3),(29,51,'Okay','8',2),(30,51,'Test it bro','0',0),(31,52,'Hello','0',0),(32,54,'Check the archive','0',3);
/*!40000 ALTER TABLE `card_steps` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `epic`
--

DROP TABLE IF EXISTS `epic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `epic` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `background_color` varchar(45) DEFAULT NULL,
  `foreground_color` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `epic`
--

LOCK TABLES `epic` WRITE;
/*!40000 ALTER TABLE `epic` DISABLE KEYS */;
INSERT INTO `epic` VALUES (0,NULL,NULL),(1,'#5A8A5C','#FFFFFF'),(2,'#666BB9','#FFE2B6'),(6,'#00f4ff','#7104ff'),(7,'#ff0000','#ffe700'),(9,'#000000','#ff0000'),(11,'#ffef00','#0019e3'),(12,'#971414','#ffffff');
/*!40000 ALTER TABLE `epic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `project` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `designator` varchar(5) NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
INSERT INTO `project` VALUES (1,'abc','Agility'),(2,'def','Part Deux'),(7,'TST','A Test Project'),(14,'REF','Refactored Project'),(16,'SPR','Test Sprints Here');
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_image`
--

DROP TABLE IF EXISTS `project_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `project_image` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `project_id` int(10) unsigned NOT NULL,
  `folder` varchar(45) DEFAULT NULL,
  `file_name` varchar(45) DEFAULT NULL,
  `file_type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_project_image_idx` (`project_id`),
  CONSTRAINT `fk_project_image` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_image`
--

LOCK TABLES `project_image` WRITE;
/*!40000 ALTER TABLE `project_image` DISABLE KEYS */;
INSERT INTO `project_image` VALUES (1,1,'1','agility','jpg'),(5,7,'0','7','jpeg'),(10,14,'0','14','jpeg'),(12,16,'0','16','jpeg');
/*!40000 ALTER TABLE `project_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sprint`
--

DROP TABLE IF EXISTS `sprint`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sprint` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(256) NOT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `open` tinyint(1) NOT NULL,
  `closed_date` varchar(45) DEFAULT NULL,
  `project` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sprint`
--

LOCK TABLES `sprint` WRITE;
/*!40000 ALTER TABLE `sprint` DISABLE KEYS */;
INSERT INTO `sprint` VALUES (1,'First Sprint',NULL,NULL,0,'2016-08-05 21:47:05',1),(2,'Sprint for August','2016-08-06 12:15:34',NULL,0,'2016-08-06 18:59:02',1),(3,'Sprint for August','2016-08-06 19:04:31','2016-09-03 19:04:31',0,'2016-08-06 19:08:29',1),(4,'Sprint for August','2016-08-06 19:10:24','2016-09-03 19:10:24',1,NULL,1),(5,'Sprint for Project','2016-08-10 12:17:10','2016-08-24 12:17:10',1,NULL,2),(6,'Sprint for a New Project','2016-08-10 23:06:15','2016-09-07 23:06:15',1,NULL,7),(7,'Sprint for Testing','2016-08-12 18:26:57','2016-09-09 18:26:57',0,'2016-08-12 19:17:13',16),(8,'Test the backlog fool!','2016-08-12 19:27:33','2016-09-09 19:27:33',0,'2016-08-12 19:27:59',16);
/*!40000 ALTER TABLE `sprint` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(254) DEFAULT NULL,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `password` varchar(160) DEFAULT NULL,
  `token` varchar(45) DEFAULT NULL,
  `token_exp` datetime DEFAULT NULL,
  `permissions` tinyint(3) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (7,'email@email.com','Bob','McBoberson','pbkdf2:sha1:1000$bH3pEDir$def20e79be301d6e346ff00dcc9f9320e3dd0088','LR0UCFFDUKXGD2VN2VHCFZ7ONH0ZMV0A','2016-08-13 03:54:54',NULL),(8,'user@email.com','User','Cooldude','pbkdf2:sha1:1000$86geOy44$14517b055bbb283ed98185709bdc98c450b2cc87','FCC97FH4AQ3GRK058JFKPQQVSMF1P1BP','2016-08-13 04:02:28',NULL),(9,'new@email.com','New','Guy','pbkdf2:sha1:1000$c6LFIp5z$69eb3e65e0fc04ddaeabcb132dc2b9c55df98d8f','RL8DO7SXXTSBNUYSRPMT1RQWEKBD4EY8','2016-08-13 01:56:35',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_projects`
--

DROP TABLE IF EXISTS `user_projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_projects` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `project_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_user_projects_idx` (`user_id`),
  KEY `fk_projects_user_idx` (`project_id`),
  CONSTRAINT `fk_user_projects` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_projects_user` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_projects`
--

LOCK TABLES `user_projects` WRITE;
/*!40000 ALTER TABLE `user_projects` DISABLE KEYS */;
INSERT INTO `user_projects` VALUES (1,7,1),(2,8,1),(3,8,2),(9,8,16);
/*!40000 ALTER TABLE `user_projects` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-08-13  0:04:18

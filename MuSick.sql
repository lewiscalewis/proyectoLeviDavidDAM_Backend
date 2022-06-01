CREATE DATABASE  IF NOT EXISTS `proyecto` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `proyecto`;
-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: proyecto
-- ------------------------------------------------------
-- Server version	8.0.29-0ubuntu0.20.04.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Chats`
--

DROP TABLE IF EXISTS `Chats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Chats` (
  `username1` varchar(45) NOT NULL,
  `username2` varchar(45) NOT NULL,
  `id_chat` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id_chat`),
  KEY `emisor` (`username1`) /*!80000 INVISIBLE */,
  KEY `receptor` (`username2`),
  CONSTRAINT `usuario1` FOREIGN KEY (`username1`) REFERENCES `Users` (`username`),
  CONSTRAINT `usuario2` FOREIGN KEY (`username2`) REFERENCES `Users` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Chats`
--

LOCK TABLES `Chats` WRITE;
/*!40000 ALTER TABLE `Chats` DISABLE KEYS */;
INSERT INTO `Chats` VALUES ('test','elias',2),('example','test',3),('dubi','test',4),('david','example',5),('hola','test',6),('test','david',7),('holawtfxd','hola',8),('test','test',9),('prueba','test',10),('elias','hola',11),('test','z',12),('test','BigBoss',13);
/*!40000 ALTER TABLE `Chats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Friend_Requests`
--

DROP TABLE IF EXISTS `Friend_Requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Friend_Requests` (
  `id` int NOT NULL AUTO_INCREMENT,
  `emisor` varchar(45) NOT NULL,
  `receptor` varchar(45) NOT NULL,
  `state` varchar(45) DEFAULT 'on hold',
  PRIMARY KEY (`id`),
  KEY `emisor_idx` (`emisor`),
  KEY `receptor_idx` (`receptor`),
  CONSTRAINT `emisorRequester` FOREIGN KEY (`emisor`) REFERENCES `Users` (`username`),
  CONSTRAINT `receptorRequester` FOREIGN KEY (`receptor`) REFERENCES `Users` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Friend_Requests`
--

LOCK TABLES `Friend_Requests` WRITE;
/*!40000 ALTER TABLE `Friend_Requests` DISABLE KEYS */;
INSERT INTO `Friend_Requests` VALUES (9,'test','majimbo','on hold'),(11,'elias','holawtfxd','on hold'),(13,'BigBoss','elias','on hold'),(15,'elias','aaron','on hold'),(16,'elias','david','on hold'),(17,'elias','default','on hold'),(18,'elias','default2','on hold'),(19,'elias','dubi','on hold'),(20,'elias','example1','on hold'),(21,'elias','hola','on hold'),(22,'elias','lewiscalewis','on hold'),(23,'test','BigBoss','on hold'),(24,'test','aaron','on hold');
/*!40000 ALTER TABLE `Friend_Requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Genres`
--

DROP TABLE IF EXISTS `Genres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Genres` (
  `genre` varchar(45) NOT NULL,
  PRIMARY KEY (`genre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Genres`
--

LOCK TABLES `Genres` WRITE;
/*!40000 ALTER TABLE `Genres` DISABLE KEYS */;
INSERT INTO `Genres` VALUES ('drill'),('drum and bass'),('metal'),('pop'),('rap'),('reggae'),('reggaeton'),('rock'),('trap');
/*!40000 ALTER TABLE `Genres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Items`
--

DROP TABLE IF EXISTS `Items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Items` (
  `name` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `item` varchar(150) NOT NULL,
  `genre` varchar(20) DEFAULT NULL,
  `image` varchar(150) DEFAULT NULL,
  `description` varchar(150) DEFAULT NULL,
  `copyright` tinyint DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `uploadDate` varchar(15) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `itemsUsername_idx` (`username`),
  KEY `item_genre_idx` (`genre`),
  CONSTRAINT `item_genre` FOREIGN KEY (`genre`) REFERENCES `Genres` (`genre`),
  CONSTRAINT `itemsUsername` FOREIGN KEY (`username`) REFERENCES `Users` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Items`
--

LOCK TABLES `Items` WRITE;
/*!40000 ALTER TABLE `Items` DISABLE KEYS */;
INSERT INTO `Items` VALUES ('Say so','elias','song.mp3',NULL,NULL,NULL,NULL,1,''),('CANSION','elias','song.mp3',NULL,NULL,NULL,NULL,2,''),('KillKa Playa Fonk','test','1653435674235_yt1s.com - KILLKA  Ghostface Playa fkbambam  phonk for training.mp3','drill','Modelo E_R.drawio.png','chingona',0,18,'3/4/2022'),('Under the influence - Eminem','test','1653435674235_yt1s.com - Under The Influence.mp3','rap','Intel-ARC-Alchemist-Reference-Graphics-Card-Final-Design-Renders-_8-2060x1299.png','uuuuUUUU',1,19,'3/4/2022'),('A real horror - Suicide boys','test','1653594857226_yt1s.com - Madara Uchiha A REAL HORROR HOW.mp3','rap','Captura de pantalla 2022-05-03 174959.png','www',1,20,'4/4/2022'),('ONI INC - DOOM COVER','test','1653594857226_yt1s.com - ONI INC  IN THIS SONG EVERYONE DIES DOOM OST COVER.mp3','metal','Captura de pantalla 2022-05-03 174959.png','wwwFER',1,21,'4/4/2022'),('Wardruna Lyfjaberg ','test','1653594857226_yt1s.com - Wardruna  Lyfjaberg Healingmountain Official music video.mp3','pop','Captura de pantalla 2022-05-03 174959.png','wwwFER',1,22,'4/4/2022'),('Aaron Smith - Dancin KRONO remix','test','1653594857226_yt1s.com - Aaron Smith  Dancin KRONO Remix.mp3','pop','cd-1293235_960_720.png','ew3e',1,23,'4/4/2022'),('uwu','elias','1653666807161_fatwith x flexprods beat v5.mp3','drill','cd-1293235_960_720.png','wwww',0,24,'5/4/2022'),('Revenge at all Costs  Article 5 Meme','test','1653925758780_yt1s.com - Revenge at all Costs  Article 5 Meme.mp3','pop','cd-1293235_960_720.png','meme',0,25,'1/4/2022');
/*!40000 ALTER TABLE `Items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Messages`
--

DROP TABLE IF EXISTS `Messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `body` varchar(600) NOT NULL,
  `date` varchar(30) NOT NULL,
  `receptor` varchar(45) NOT NULL,
  `emisor` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `emisor_idx` (`emisor`),
  KEY `receptor_idx` (`receptor`),
  CONSTRAINT `emisor` FOREIGN KEY (`emisor`) REFERENCES `Users` (`username`),
  CONSTRAINT `receptor` FOREIGN KEY (`receptor`) REFERENCES `Users` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=264 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Messages`
--

LOCK TABLES `Messages` WRITE;
/*!40000 ALTER TABLE `Messages` DISABLE KEYS */;
INSERT INTO `Messages` VALUES (250,'hola','27-05-2022 13:00:20','test','elias'),(251,'xd','27-05-2022 13:00:25','test','elias'),(252,'hola','27-05-2022 13:09:12','example','test'),(253,'hola','27-05-2022 13:13:55','elias','test'),(254,'que tal','27-05-2022 13:14:45','elias','test'),(255,'hola','27-05-2022 13:15:44','test','elias'),(256,'lets goooo','27-05-2022 13:15:59','test','elias'),(257,'que tal illo','30-05-2022 18:47:29','elias','test'),(258,'como va la vida','30-05-2022 18:47:36','elias','test'),(259,'va bien todo?','30-05-2022 18:47:50','elias','test'),(260,'si ahi vamos','30-05-2022 18:50:00','test','elias'),(261,'y tu que ?','30-05-2022 18:50:05','test','elias'),(262,'puesss bien ahi vamos','30-05-2022 18:50:54','elias','test'),(263,'tirando','30-05-2022 18:50:57','elias','test');
/*!40000 ALTER TABLE `Messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Notifications`
--

DROP TABLE IF EXISTS `Notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Notifications` (
  `idNotifications` int NOT NULL AUTO_INCREMENT,
  `emisor` varchar(100) NOT NULL,
  `receptor` varchar(100) NOT NULL,
  `notifications` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`idNotifications`),
  KEY `notif_emisor_idx` (`emisor`),
  KEY `notif_receptor_idx` (`receptor`),
  CONSTRAINT `notif_emisor` FOREIGN KEY (`emisor`) REFERENCES `Users` (`username`),
  CONSTRAINT `notif_receptor` FOREIGN KEY (`receptor`) REFERENCES `Users` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Notifications`
--

LOCK TABLES `Notifications` WRITE;
/*!40000 ALTER TABLE `Notifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `Notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Sessions`
--

DROP TABLE IF EXISTS `Sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Sessions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date_start` date NOT NULL,
  `date_end` date DEFAULT NULL,
  `token` varchar(300) NOT NULL,
  `username` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `token_UNIQUE` (`token`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  CONSTRAINT `username` FOREIGN KEY (`username`) REFERENCES `Users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2628 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Sessions`
--

LOCK TABLES `Sessions` WRITE;
/*!40000 ALTER TABLE `Sessions` DISABLE KEYS */;
INSERT INTO `Sessions` VALUES (2,'2022-05-13',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhvbGEiLCJwYXNzd29yZCI6IjRkMTg2MzIxYzFhN2YwZjM1NGIyOTdlODkxNGFiMjQwIiwiZGF0ZXRpbWUiOiJMYXN0IFN5bmM6IDEzLzUvMjAyMiBAIDE1OjUyOjQ2IiwiY2hlY2siOnRydWUsImlhdCI6MTY1MjQ0OTk2NiwiZXhwIjoxNjUyNTM2MzY2fQ.ASIwXqWPUhOhJB8mpkzlcMa2yfF5pEQn8861V5FV6Go','hola'),(19,'2022-05-31',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJwYXNzd29yZCI6IjA5OGY2YmNkNDYyMWQzNzNjYWRlNGU4MzI2MjdiNGY2IiwiZGF0ZXRpbWUiOiJMYXN0IFN5bmM6IDMxLzUvMjAyMiBAIDEzOjQyOjQ0IiwiY2hlY2siOnRydWUsImlhdCI6MTY1Mzk5NzM2NCwiZXhwIjoxNjU0MDgzNzY0fQ.6Fp5Qir8HmMnIbPE6YiSt7vMYiVXNHjtDLis8Lj1iVc','test'),(265,'2022-04-24',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImR1YmkiLCJwYXNzd29yZCI6IjdiM2I0OGViOTQwYWQwYWEzOTc3ZTgzZjQwMDlhYTZiIiwiZGF0ZXRpbWUiOiJMYXN0IFN5bmM6IDI0LzQvMjAyMiBAIDQ6NDE6MTIiLCJjaGVjayI6dHJ1ZSwiaWF0IjoxNjUwNzY4MDcyLCJleHAiOjE2NTA4NTQ0NzJ9.aRt0mnPSLArR9i5EX-955bo3lV54tXzOD7_WMSc4cTw','dubi'),(302,'2022-04-15',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRpb3MiLCJwYXNzd29yZCI6ImE2OTIzZjZlMjkxNzA2NmI5ODdlYmUwMDYxMDE4ZjIyIiwiZGF0ZXRpbWUiOiJMYXN0IFN5bmM6IDE1LzQvMjAyMiBAIDIxOjExOjQzIiwiY2hlY2siOnRydWUsImlhdCI6MTY1MDA0OTkwMywiZXhwIjoxNjUwMDUxMzQzfQ.QtwS5Vywqyw0j61qMppmwpfote4g77XGyXikgZU82O0','dios'),(309,'2022-04-15',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ind0Zm1hbiIsInBhc3N3b3JkIjoiZDI0MDNjMGJlMWYxMjNiN2M5Y2Q1NGMwOWVkMmZhYTYiLCJkYXRldGltZSI6Ikxhc3QgU3luYzogMTUvNC8yMDIyIEAgMjE6Mjc6NSIsImNoZWNrIjp0cnVlLCJpYXQiOjE2NTAwNTA4MjUsImV4cCI6MTY1MDA1MjI2NX0.o5wm9d7V2a8JU-3yCxo5rY956dAii3lT48knSCNRYTc','wtfman'),(322,'2022-04-24',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhvbGF3dGZ4ZCIsInBhc3N3b3JkIjoiOGM1Zjk3ZDg3YWJlODBlMjk5YzBhYjE4YzViZTBlN2IiLCJkYXRldGltZSI6Ikxhc3QgU3luYzogMjQvNC8yMDIyIEAgMTo1OTo0OSIsImNoZWNrIjp0cnVlLCJpYXQiOjE2NTA3NTgzODksImV4cCI6MTY1MDg0NDc4OX0.GdhncXqXj3YY_N-z1GWFdyCqI4Ove2welqgVu0YmSKM','holawtfxd'),(613,'2022-04-23',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImV4YW1wbGUiLCJwYXNzd29yZCI6IjFhNzlhNGQ2MGRlNjcxOGU4ZTViMzI2ZTMzOGFlNTMzIiwiZGF0ZXRpbWUiOiJMYXN0IFN5bmM6IDIzLzQvMjAyMiBAIDIzOjE5OjIyIiwiY2hlY2siOnRydWUsImlhdCI6MTY1MDc0ODc2MiwiZXhwIjoxNjUwODM1MTYyfQ.vD6hlUF0g7zGMocdVOHFRw4unQvI4_L6Ch1aXG3uYgs','example'),(705,'2022-04-24',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRhdmlkIiwicGFzc3dvcmQiOiIxNzI1MjJlYzEwMjhhYjc4MWQ5ZGZkMTdlYWNhNDQyNyIsImRhdGV0aW1lIjoiTGFzdCBTeW5jOiAyNC80LzIwMjIgQCAxOjE3OjAiLCJjaGVjayI6dHJ1ZSwiaWF0IjoxNjUwNzU1ODIwLCJleHAiOjE2NTA4NDIyMjB9.UpSrxLgP-TorD7LblcM1Neh1gGDgDA-3dT_C65ywiBk','david'),(1076,'2022-04-28',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBydWViYSIsInBhc3N3b3JkIjoiYzg5M2JhZDY4OTI3YjQ1N2RiZWQzOTQ2MGU2YWZkNjIiLCJkYXRldGltZSI6Ikxhc3QgU3luYzogMjgvNC8yMDIyIEAgMDo0OTo1NCIsImNoZWNrIjp0cnVlLCJpYXQiOjE2NTEwOTk3OTQsImV4cCI6MTY1MTE4NjE5NH0.bIMgBY1o5Z_1uarviYVN0RdqfOmSXxV2ydWreIGV8_o','prueba'),(1473,'2022-05-27',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkJpZ0Jvc3MiLCJwYXNzd29yZCI6IjhlMDdkYWZkMTM0OTU1NjFkYjkwNjNlYmU0ZGI0YjI3IiwiZGF0ZXRpbWUiOiJMYXN0IFN5bmM6IDI3LzUvMjAyMiBAIDEzOjI2OjI2IiwiY2hlY2siOnRydWUsImlhdCI6MTY1MzY1MDc4NiwiZXhwIjoxNjUzNzM3MTg2fQ.fu_wHchjKtYOAhflBhpx5Z3YCQYrI4ePXHMgKxanu6c','BigBoss'),(1983,'2022-05-18',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InoiLCJwYXNzd29yZCI6ImZiYWRlOWUzNmEzZjM2ZDNkNjc2YzFiODA4NDUxZGQ3IiwiZGF0ZXRpbWUiOiJMYXN0IFN5bmM6IDE4LzUvMjAyMiBAIDE6Mzc6NTIiLCJjaGVjayI6dHJ1ZSwiaWF0IjoxNjUyODMwNjcyLCJleHAiOjE2NTI5MTcwNzJ9.5MyQQYUJWSiTsCQHJ6y2ItFtqb5sppw988K5j0Kzm20','z'),(2034,'2022-05-30',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVsaWFzIiwicGFzc3dvcmQiOiIyOWEyYjJlMTg0OTQ3NGQ5NGQxMjA1MTMwOWM3YjRkNyIsImRhdGV0aW1lIjoiTGFzdCBTeW5jOiAzMC81LzIwMjIgQCAyMDozNjo3IiwiY2hlY2siOnRydWUsImlhdCI6MTY1MzkzNTc2NywiZXhwIjoxNjU0MDIyMTY3fQ.t4FdDm1fcW_voMz531LprfXut6mB1FecWKgapsT1sGs','elias'),(2567,'2022-05-30',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJ1YmkiLCJwYXNzd29yZCI6IjUyMGU3ZGQwNmFhNTJjZDBjODliOGMwMzE0NjEyMGQzIiwiZGF0ZXRpbWUiOiJMYXN0IFN5bmM6IDMwLzUvMjAyMiBAIDE5OjE1OjI3IiwiY2hlY2siOnRydWUsImlhdCI6MTY1MzkzMDkyNywiZXhwIjoxNjU0MDE3MzI3fQ.TtwvxSUTMQkyqaCdML4gbx31OylDWM7r1dkLiddVasY','bubi');
/*!40000 ALTER TABLE `Sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `username` varchar(45) NOT NULL,
  `name` varchar(20) DEFAULT NULL,
  `surname` varchar(45) DEFAULT NULL,
  `password` varchar(150) NOT NULL,
  `email` varchar(60) NOT NULL,
  `state` text,
  `profileimage` text NOT NULL,
  `online` tinyint DEFAULT '0',
  `admin` tinyint DEFAULT '0',
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES ('aaron','aaron','aaron','449a36b6689d841d7d27f31b4b7cc73a','aaron','online','1651613964659_putin.jpg',0,0),('BigBoss','levi','vicente','8e07dafd13495561db9063ebe4db4b27','lewisvicna@gmail.com','EL ADMIN','1651613964659_putin.jpg',0,0),('bubi','bubi','bubi','520e7dd06aa52cd0c89b8c03146120d3','bubi@bubi.bubi',NULL,'default.png',0,0),('david','david','david','172522ec1028ab781d9dfd17eaca4427','david','online','1651613964659_putin.jpg',0,0),('ddddd','','','50f84daf3a6dfd6a9f20c9f8ef428942','ddddd@ddddd.ddddd','online','1651613964659_putin.jpg',0,0),('default','default','default','c21f969b5f03d33d43e04f8f136e7682','default@def.es',NULL,'default.png',0,0),('default1','default','default','c89feeb47bb697c7cb7f46b1e8186fef','default',NULL,'default.png',0,0),('default2','default2','default2','3f84c0d23228173b493bdd7ae5bd720f','default2',NULL,'default.png',0,0),('dios','dios','dios','a6923f6e2917066b987ebe0061018f22','dios@dios.dios','online','1651613964659_putin.jpg',0,0),('dubi','dubi','dubi','7b3b48eb940ad0aa3977e83f4009aa6b','dubi@dubi.dubi','online','1651613964659_putin.jpg',0,0),('elias','elias','heredia','29a2b2e1849474d94d12051309c7b4d7','eliasaronzin@gmail.com','online','1653927691086_Screenshot (2).png',1,0),('example','example','example','1a79a4d60de6718e8e5b326e338ae533','example','online','1651613964659_putin.jpg',0,0),('example1','example1','example1','c1285a470f0fc8f14f54851c5d8eb32f','example1','online','1651613964659_putin.jpg',0,0),('example2','example2','example2','66b375b08fc869632935c9e6a9c7f8da','example2','online','1651613964659_putin.jpg',0,0),('hola','hola','hola','4d186321c1a7f0f354b297e8914ab240','hola@hola.hola','online','1651356424934_Screenshot (2).png',0,0),('holawtfxd','holawtfxd','holawtfxd','8c5f97d87abe80e299c0ab18c5be0e7b','holawtfxd@gmail.com','online','1651613964659_putin.jpg',0,0),('lewiscalewis','levi','vicente','usuario','lewiscalewis@gmail.com','online','1651613964659_putin.jpg',0,0),('lvicnav','levi','vicente','babcc7f1b6de1440b5a8c3f8a218d3a8','ranama443@gmail.com','online','1651613964659_putin.jpg',0,0),('majimbo','maji','mbo','827ccb0eea8a706c4c34a16891f84e7b','tumadre@gmail.com','online','1651613964659_putin.jpg',0,0),('prueba','prueba','prueba','c893bad68927b457dbed39460e6afd62','prueba@g.es','online','1651613964659_putin.jpg',0,0),('test','test','test','098f6bcd4621d373cade4e832627b4f6','test','david es gay','1653932334096_Captura de pantalla 2022-05-03 174959.png',1,0),('wtf','wtf','wtf','aadce520e20c2899f4ced228a79a3083','wtf@wtf.wtf','online','1651613964659_putin.jpg',0,0),('wtfman','wtfman','wtfman','d2403c0be1f123b7c9cd54c09ed2faa6','wtfman@wtfman.wtfman','online','1651613964659_putin.jpg',0,0),('xdxd','xdxd','xdxd','0903a189cbe112bce4b75bbc7c50357c','xdxd@xdxd.xdxd','online','1651613964659_putin.jpg',0,0),('xdxdxdxd','xdxdxdxd','xdxdxdxd','be5fcbeb3b27d3b315a628035c610b90','xdxd@xdxdxdxd.xdxd','online','1651613964659_putin.jpg',0,0),('xdxdxdxdxdxd','xdxdxdxdxdxd','xdxdxdxdxdxd','a078f2437eeddabe2663e782c91a4400','xdxdxdxdxdxd@xdxdxdxdxdxd.xdxdxdxdxdxd','online','1651613964659_putin.jpg',0,0),('xdxdxdxdxdxdxdxd','xdxdxdxdxdxdxdxd','xdxdxdxdxdxdxdxd','3cc8c230811f9d7ae7c1a2b21e15ee21','xdxdxdxdxdxdxdxd@xdxd.xdxd','online','1651613964659_putin.jpg',0,0),('z','z','z','fbade9e36a3f36d3d676c1b808451dd7','z',NULL,'default.png',0,0);
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-01 18:57:16

-- MySQL dump 10.16  Distrib 10.1.48-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: db
-- ------------------------------------------------------
-- Server version	10.1.48-MariaDB-0+deb9u2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `access_log`
--

DROP DATABASE IF EXISTS `url_mapping_db`;
CREATE DATABASE `url_mapping_db`;
USE `url_mapping_db`;

DROP TABLE IF EXISTS `access_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `access_log` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `shorten_url` varchar(6) DEFAULT NULL,
  `ip_addr` varchar(12) DEFAULT NULL,
  `access_time` varchar(19) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `access_log`
--

LOCK TABLES `access_log` WRITE;
/*!40000 ALTER TABLE `access_log` DISABLE KEYS */;
INSERT INTO `access_log` VALUES (1,'EtNsGv','127.0.0.1','2023-09-22 09:07:16'),(2,'n2t1Ry','10.109.9.212','2023-09-22 09:29:59'),(3,'EtNsGv','127.0.0.1','2023-09-22 10:38:55'),(4,'EtNsGv','127.0.0.1','2023-09-22 10:38:57'),(5,'EtNsGv','127.0.0.1','2023-09-22 10:38:59'),(6,'3VIHf4','10.109.9.212','2023-09-22 10:48:28'),(7,'wk8EK8','10.109.9.212','2023-09-22 14:12:52'),(8,'GHBvp4','127.0.0.1','2023-09-22 21:58:52'),(9,'WwtCiw','127.0.0.1','2023-09-22 22:28:52'),(10,'33QSdS','127.0.0.1','2023-09-25 09:03:45');
/*!40000 ALTER TABLE `access_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `url_map`
--

DROP TABLE IF EXISTS `url_map`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `url_map` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `shorten_url` varchar(6) DEFAULT NULL,
  `original_url` varchar(117) DEFAULT NULL,
  `created_date` varchar(19) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `url_map`
--

LOCK TABLES `url_map` WRITE;
/*!40000 ALTER TABLE `url_map` DISABLE KEYS */;
INSERT INTO `url_map` VALUES (1,'9UfBUr','https://www.google.com/','2023-09-21 15:11:58'),(2,'NuqQsG','https://www.google.com/','2023-09-21 16:11:49'),(3,'bFZwGd','https://www.google.com/','2023-09-21 16:20:18'),(4,'EtNsGv','https://stackoverflow.com/questions/69567381/getting-cannot-read-property-pickalgorithm-of-null-error-in-react-native','2023-09-22 09:03:14'),(5,'n2t1Ry','https://www.google.com/','2023-09-22 09:29:55'),(6,'3VIHf4','https://www.google.com/','2023-09-22 10:48:24'),(7,'wk8EK8','https://www.google.com','2023-09-22 14:12:49'),(8,'GHBvp4','https://www.google.com/','2023-09-22 21:58:18'),(9,'WwtCiw','https://www.google.com/','2023-09-22 22:28:49'),(10,'33QSdS','https://www.google.com/','2023-09-25 09:03:42');
/*!40000 ALTER TABLE `url_map` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-18 10:46:24

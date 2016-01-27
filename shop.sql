-- MySQL dump 10.13  Distrib 5.6.25, for osx10.10 (x86_64)
--
-- Host: localhost    Database: shop
-- ------------------------------------------------------
-- Server version	5.6.25

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
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `address` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned NOT NULL DEFAULT '0',
  `primary` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `location` varchar(255) NOT NULL DEFAULT '',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `carts` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned NOT NULL DEFAULT '0',
  `good_id` int(11) unsigned NOT NULL DEFAULT '0',
  `amount` int(11) unsigned NOT NULL DEFAULT '0',
  `invalid` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cats`
--

DROP TABLE IF EXISTS `cats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cats` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `cat_name` varchar(30) NOT NULL DEFAULT '',
  `cat_pic` varchar(255) NOT NULL DEFAULT '',
  `parent_id` int(11) unsigned NOT NULL DEFAULT '0',
  `sort` int(11) unsigned NOT NULL DEFAULT '0',
  `is_show` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cats`
--

LOCK TABLES `cats` WRITE;
/*!40000 ALTER TABLE `cats` DISABLE KEYS */;
INSERT INTO `cats` VALUES (1,'代购香烟 烟标','',0,0,0,'2015-12-08 07:35:37','2015-12-08 07:35:37'),(2,'水/饮料','',0,0,0,'2015-12-08 07:35:37','2015-12-08 07:35:37'),(3,'乳制品','',2,0,0,'2015-12-08 07:35:37','2015-12-08 07:35:37'),(4,'冲饮','',2,0,0,'2015-12-08 07:35:37','2015-12-08 07:35:37'),(5,'休闲零食','',0,0,0,'2015-12-08 07:35:37','2015-12-08 07:35:37'),(6,'雪糕、冷饮','',0,0,0,'2015-12-08 07:35:37','2015-12-08 07:35:37'),(7,'饼干糕点','',0,0,0,'2015-12-08 07:35:37','2015-12-08 07:35:37'),(8,'方便速食','',0,0,0,'2015-12-08 07:35:37','2015-12-08 07:35:37'),(9,'酒水','',0,0,0,'2015-12-08 07:35:37','2015-12-08 07:35:37'),(10,'糖果/巧克力','',0,0,0,'2015-12-08 07:35:37','2015-12-08 07:35:37'),(11,'粮油副食','',0,0,0,'2015-12-08 07:35:37','2015-12-08 07:35:37'),(12,'调料、酱','',0,0,0,'2015-12-08 07:35:37','2015-12-08 07:35:37'),(13,'家居清洁','',0,0,0,'2015-12-08 07:35:37','2015-12-08 07:35:37'),(14,'美容洗护','',0,0,0,'2015-12-08 07:35:37','2015-12-08 07:35:37'),(15,'个人护理','',0,0,0,'2015-12-08 07:35:37','2015-12-08 07:35:37'),(17,'小百货','',0,0,0,'2015-12-08 07:36:05','2015-12-08 07:36:05'),(18,'进口食品','',0,0,0,'2015-12-08 07:36:05','2015-12-08 07:36:05'),(19,'婴幼儿童','',0,0,0,'2015-12-08 07:36:06','2015-12-08 07:36:06');
/*!40000 ALTER TABLE `cats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cms_fragments`
--

DROP TABLE IF EXISTS `cms_fragments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cms_fragments` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `cms_module_id` int(11) unsigned NOT NULL DEFAULT '0',
  `title` varchar(255) NOT NULL DEFAULT '',
  `subtitle` varchar(255) NOT NULL DEFAULT '',
  `abstract` mediumtext,
  `content` mediumtext,
  `sort` int(11) unsigned NOT NULL DEFAULT '0',
  `is_show` tinyint(11) unsigned NOT NULL DEFAULT '0',
  `ext1` varchar(255) NOT NULL DEFAULT '',
  `ext2` varchar(255) NOT NULL DEFAULT '',
  `ext3` varchar(255) NOT NULL DEFAULT '',
  `ext4` varchar(255) NOT NULL DEFAULT '',
  `ext5` varchar(255) NOT NULL DEFAULT '',
  `ext6` varchar(255) NOT NULL DEFAULT '',
  `ext7` varchar(255) NOT NULL DEFAULT '',
  `ext8` varchar(255) NOT NULL DEFAULT '',
  `ext9` varchar(255) NOT NULL DEFAULT '',
  `ext10` varchar(255) NOT NULL DEFAULT '',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cms_fragments`
--

LOCK TABLES `cms_fragments` WRITE;
/*!40000 ALTER TABLE `cms_fragments` DISABLE KEYS */;
INSERT INTO `cms_fragments` VALUES (5,2,'腾讯','',NULL,NULL,0,0,'http://www.qq.com','','','','','','','','','','2015-12-18 06:04:27','2015-12-18 06:04:27'),(9,1,'绿色出行，从我做起－陈坤','','','',11,0,'http://www.cleanair.net.cn/upfiles/file/haibao-chenkun.jpg','100','','','','','','','','','2016-01-15 06:40:13','2016-01-15 06:40:13'),(10,1,'周迅“低碳世博 绿色出行”','2016-02-18','','',12,0,'http://www.cleanair.net.cn/upfiles/image/2010/04/01/201004010728284433.jpg','6889','','','','','','','','','2016-01-15 06:41:33','2016-01-18 07:56:03'),(17,2,'百度','',NULL,NULL,0,0,'http://www.baidu.com/www','','','','','','','','','','2016-01-15 10:08:58','2016-01-15 10:08:58'),(19,1,'孙俪倡导绿色出行 公益广告登陆上海','',NULL,NULL,0,0,'http://photocdn.sohu.com/20100823/Img274397211.jpg','2101','','','','','','','','','2016-01-18 07:48:11','2016-01-18 07:55:56'),(25,4,'人事/HR','http://www.lagou.com/jobs/1421757.html','%3Cp%20style%3D%22outline%3A%200px%3B%20margin%3A%201em%200px%3B%20color%3A%20rgb(119%2C%20119%2C%20119)%3B%20font-family%3A%20\'Hiragino%20Sans%20GB\'%2C%20\'Microsoft%20Yahei\'%2C%20SimSun%2C%20Arial%2C%20\'Helvetica%20Neue\'%2C%20Helvetica%3B%20font-size%3A%2014px%3B%20line-height%3A%2022px%3B%20background-color%3A%20rgb(250%2C%20250%2C%20250)%3B%22%3E%E3%80%90%E5%B2%97%E4%BD%8D%E8%81%8C%E8%B4%A3%E3%80%91%3C%2Fp%3E%0A%0A%3Cp%20style%3D%22outline%3A%200px%3B%20margin%3A%201em%200px%3B%20color%3A%20rgb(119%2C%20119%2C%20119)%3B%20font-family%3A%20\'Hiragino%20Sans%20GB\'%2C%20\'Microsoft%20Yahei\'%2C%20SimSun%2C%20Arial%2C%20\'Helvetica%20Neue\'%2C%20Helvetica%3B%20font-size%3A%2014px%3B%20line-height%3A%2022px%3B%20background-color%3A%20rgb(250%2C%20250%2C%20250)%3B%22%3E%3Cstrike%3E1%E3%80%81%E6%8B%9B%E8%81%98%E6%B4%BB%E5%8A%A8%E7%AD%96%E5%88%92%E3%80%81%E7%BB%84%E7%BB%87%E5%AE%9E%E6%96%BD%EF%BC%9B%E5%BA%94%E8%81%98%E6%8E%A5%E5%BE%85%EF%BC%8C%E5%BA%94%E8%81%98%E8%80%85%E8%B5%84%E6%96%99%E7%AE%A1%E7%90%86%E7%AD%892%EF%BC%9B%3C%2Fstrike%3E%3C%2Fp%3E%0A%0A%3Cp%20style%3D%22outline%3A%200px%3B%20margin%3A%201em%200px%3B%20color%3A%20rgb(119%2C%20119%2C%20119)%3B%20font-family%3A%20\'Hiragino%20Sans%20GB\'%2C%20\'Microsoft%20Yahei\'%2C%20SimSun%2C%20Arial%2C%20\'Helvetica%20Neue\'%2C%20Helvetica%3B%20font-size%3A%2014px%3B%20line-height%3A%2022px%3B%20background-color%3A%20rgb(250%2C%20250%2C%20250)%3B%22%3E2%E3%80%81%E6%8B%9B%E8%81%98%E6%B8%A0%E9%81%93%E6%8B%93%E5%B1%95%E4%B8%8E%E4%BE%9B%E5%BA%94%E5%95%86%E6%B2%9F%E9%80%9A%E6%8E%A5%E6%B4%BD%EF%BC%9B%3C%2Fp%3E%0A%0A%3Cp%20style%3D%22outline%3A%200px%3B%20margin%3A%201em%200px%3B%20color%3A%20rgb(119%2C%20119%2C%20119)%3B%20font-family%3A%20\'Hiragino%20Sans%20GB\'%2C%20\'Microsoft%20Yahei\'%2C%20SimSun%2C%20Arial%2C%20\'Helvetica%20Neue\'%2C%20Helvetica%3B%20font-size%3A%2014px%3B%20line-height%3A%2022px%3B%20background-color%3A%20rgb(250%2C%20250%2C%20250)%3B%22%3E3%E3%80%81%E5%91%98%E5%B7%A5%E5%9B%A2%E5%BB%BA%E6%B4%BB%E5%8A%A8%E7%AD%96%E5%88%92%E3%80%81%E7%BB%84%E7%BB%87%E5%AE%9E%E6%96%BD%EF%BC%9B%3C%2Fp%3E%0A%0A%3Cp%20style%3D%22outline%3A%200px%3B%20margin%3A%201em%200px%3B%20color%3A%20rgb(119%2C%20119%2C%20119)%3B%20font-family%3A%20\'Hiragino%20Sans%20GB\'%2C%20\'Microsoft%20Yahei\'%2C%20SimSun%2C%20Arial%2C%20\'Helvetica%20Neue\'%2C%20Helvetica%3B%20font-size%3A%2014px%3B%20line-height%3A%2022px%3B%20background-color%3A%20rgb(250%2C%20250%2C%20250)%3B%22%3E4%E3%80%81%E5%9C%A8%E4%B8%8A%E7%BA%A7%E6%8C%87%E5%AF%BC%E4%B8%8B%EF%BC%8C%E7%BB%84%E7%BB%87%E5%AE%9E%E6%96%BD%E5%86%85%E9%83%A8%E8%BD%AC%E6%AD%A3%E3%80%81%E6%99%8B%E5%8D%87%E8%BF%B0%E8%81%8C%E4%BC%9A%EF%BC%9B%3C%2Fp%3E%0A%0A%3Cp%20style%3D%22outline%3A%200px%3B%20margin%3A%201em%200px%3B%20color%3A%20rgb(119%2C%20119%2C%20119)%3B%20font-family%3A%20\'Hiragino%20Sans%20GB\'%2C%20\'Microsoft%20Yahei\'%2C%20SimSun%2C%20Arial%2C%20\'Helvetica%20Neue\'%2C%20Helvetica%3B%20font-size%3A%2014px%3B%20line-height%3A%2022px%3B%20background-color%3A%20rgb(250%2C%20250%2C%20250)%3B%22%3E5%E3%80%81%E6%9C%89%E6%9C%BA%E4%BC%9A%E7%BB%9F%E7%AD%B9%E5%85%A8%E9%9B%86%E5%9B%A2%E5%90%84%E7%B1%BB%E5%A4%A7%E5%9E%8B%E6%B4%BB%E5%8A%A8%E3%80%81%E5%8F%82%E4%B8%8E%E9%AB%98%E7%AE%A1%E4%BC%9A%E8%AE%AE%E3%80%82%3C%2Fp%3E%0A','',0,0,'10000','杭州','','','','','','','','','2016-01-18 08:00:14','2016-01-18 08:27:25'),(26,4,'运营','http://www.lagou.com/jobs/1421757.html','%3Cp%20style%3D%22outline%3A%200px%3B%20margin%3A%201em%200px%3B%20color%3A%20rgb(119%2C%20119%2C%20119)%3B%20font-family%3A%20\'Hiragino%20Sans%20GB\'%2C%20\'Microsoft%20Yahei\'%2C%20SimSun%2C%20Arial%2C%20\'Helvetica%20Neue\'%2C%20Helvetica%3B%20font-size%3A%2014px%3B%20line-height%3A%2022px%3B%20background-color%3A%20rgb(250%2C%20250%2C%20250)%3B%22%3E%E3%80%90%E4%BB%BB%E8%81%8C%E8%A6%81%E6%B1%82%E3%80%91%3C%2Fp%3E%0A%0A%3Cp%20style%3D%22outline%3A%200px%3B%20margin%3A%201em%200px%3B%20color%3A%20rgb(119%2C%20119%2C%20119)%3B%20font-family%3A%20\'Hiragino%20Sans%20GB\'%2C%20\'Microsoft%20Yahei\'%2C%20SimSun%2C%20Arial%2C%20\'Helvetica%20Neue\'%2C%20Helvetica%3B%20font-size%3A%2014px%3B%20line-height%3A%2022px%3B%20background-color%3A%20rgb(250%2C%20250%2C%20250)%3B%22%3E1%E3%80%81%E6%84%8F%E5%90%91%E4%BA%BA%E5%8A%9B%E8%B5%84%E6%BA%90%E6%96%B9%E5%90%91%E5%8F%91%E5%B1%95%EF%BC%8C%E4%BA%B2%E5%92%8C%E5%8A%9B%E5%BC%BA%E3%80%81%E5%BD%A2%E8%B1%A1%E6%B0%94%E8%B4%A8%E4%BD%B3%EF%BC%8C%E6%8B%85%E4%BB%BB%E8%BF%87%E6%A0%A1%E9%99%A2%E7%BA%A7%E5%B9%B2%E9%83%A8%E7%BB%8F%E5%8E%86%E4%BC%98%E5%85%88%E8%80%83%E8%99%91%EF%BC%9B%3C%2Fp%3E%0A%0A%3Cp%20style%3D%22outline%3A%200px%3B%20margin%3A%201em%200px%3B%20color%3A%20rgb(119%2C%20119%2C%20119)%3B%20font-family%3A%20\'Hiragino%20Sans%20GB\'%2C%20\'Microsoft%20Yahei\'%2C%20SimSun%2C%20Arial%2C%20\'Helvetica%20Neue\'%2C%20Helvetica%3B%20font-size%3A%2014px%3B%20line-height%3A%2022px%3B%20background-color%3A%20rgb(250%2C%20250%2C%20250)%3B%22%3E2%E3%80%81%E7%BB%86%E5%BF%83%E3%80%81%E8%80%90%E5%BF%83%E3%80%81%E7%81%B5%E6%B4%BB%EF%BC%8C%E6%9C%89%E8%B4%A3%E4%BB%BB%E5%BF%83%EF%BC%8C%E5%AD%A6%E4%B9%A0%E5%8A%9B%E5%BC%BA%EF%BC%9B%E6%80%A7%E6%A0%BC%E5%A4%96%E5%90%91%EF%BC%8C%E5%96%84%E4%BA%8E%E4%B8%8E%E4%BA%BA%E5%BB%BA%E7%AB%8B%E5%85%B3%E7%B3%BB%EF%BC%8C%E6%B2%9F%E9%80%9A%E8%83%BD%E5%8A%9B%E5%BC%BA%EF%BC%9B%3C%2Fp%3E%0A%0A%3Cp%20style%3D%22outline%3A%200px%3B%20margin%3A%201em%200px%3B%20color%3A%20rgb(119%2C%20119%2C%20119)%3B%20font-family%3A%20\'Hiragino%20Sans%20GB\'%2C%20\'Microsoft%20Yahei\'%2C%20SimSun%2C%20Arial%2C%20\'Helvetica%20Neue\'%2C%20Helvetica%3B%20font-size%3A%2014px%3B%20line-height%3A%2022px%3B%20background-color%3A%20rgb(250%2C%20250%2C%20250)%3B%22%3E3%E3%80%81%E5%85%B7%E5%A4%87%E4%B8%80%E5%AE%9A%E7%9A%84%E6%9C%8D%E5%8A%A1%E6%84%8F%E8%AF%86%EF%BC%8C%E5%B7%A5%E4%BD%9C%E5%BF%AB%E9%80%9F%E5%BC%BA%E5%8A%BF%E3%80%81%E4%B8%8D%E6%8B%96%E6%8B%89%EF%BC%9B%3C%2Fp%3E%0A%0A%3Cp%20style%3D%22outline%3A%200px%3B%20margin%3A%201em%200px%3B%20color%3A%20rgb(119%2C%20119%2C%20119)%3B%20font-family%3A%20\'Hiragino%20Sans%20GB\'%2C%20\'Microsoft%20Yahei\'%2C%20SimSun%2C%20Arial%2C%20\'Helvetica%20Neue\'%2C%20Helvetica%3B%20font-size%3A%2014px%3B%20line-height%3A%2022px%3B%20background-color%3A%20rgb(250%2C%20250%2C%20250)%3B%22%3E4%E3%80%81%E6%9C%AC%E7%A7%91%E5%8F%8A%E4%BB%A5%E4%B8%8A%E5%AD%A6%E5%8E%86%EF%BC%8C%E4%BC%98%E7%A7%80%E7%9A%84%E5%BA%94%E5%B1%8A%E6%AF%95%E4%B8%9A%E6%9C%AC%E7%A7%91%E7%94%9F%E6%88%96%E7%A1%95%E5%A3%AB%E4%BA%A6%E5%8F%AF%E3%80%82%3C%2Fp%3E%0A',NULL,0,0,'','','','','','','','','','','2016-01-18 08:28:43','2016-01-18 08:28:43'),(28,1,'','',NULL,NULL,0,0,'','','','','','','','','','','2016-01-18 09:19:42','2016-01-18 09:19:42');
/*!40000 ALTER TABLE `cms_fragments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cms_modules`
--

DROP TABLE IF EXISTS `cms_modules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cms_modules` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(30) NOT NULL DEFAULT '',
  `name` varchar(30) NOT NULL DEFAULT '',
  `sort` int(11) unsigned NOT NULL DEFAULT '0',
  `is_show` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `link` varchar(255) NOT NULL DEFAULT '',
  `ext1` mediumtext,
  `ext2` varchar(255) NOT NULL DEFAULT '',
  `ext3` varchar(255) NOT NULL DEFAULT '',
  `ext4` varchar(255) NOT NULL DEFAULT '',
  `ext5` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cms_modules`
--

LOCK TABLES `cms_modules` WRITE;
/*!40000 ALTER TABLE `cms_modules` DISABLE KEYS */;
INSERT INTO `cms_modules` VALUES (1,'banner','banner闪图模块',0,0,'','[{\"key\":\"title\",\"label\":\"标题\",\"type\":\"text\",\"validate\":{}},{\"key\":\"ext1\",\"label\":\"闪图图片\",\"type\":\"image\",\"validate\":{}},{\"key\":\"ext2\",\"label\":\"浏览次数\",\"type\":\"number\",\"validate\":{}}]','','','',''),(2,'friend_links','友情链接',0,0,'','[{\"key\":\"title\",\"label\":\"友情链接名称\",\"type\":\"text\",\"validate\":{}},{\"key\":\"ext1\",\"label\":\"跳转链接\",\"type\":\"link\",\"validate\":{}}]','','','',''),(3,'home_ads','首页广告',0,0,'','[{\"key\":\"title\",\"label\":\"标题\",\"type\":\"text\",\"validate\":{}},{\"key\":\"subtitle\",\"label\":\"广告图片\",\"type\":\"image\",\"validate\":{}},{\"key\":\"abstract\",\"label\":\"广告文案\",\"type\":\"text\",\"validate\":{}},{\"key\":\"ext1\",\"label\":\"跳转链接\",\"type\":\"text\",\"validate\":{}},{\"key\":\"ext2\",\"label\":\"浏览次数\",\"type\":\"number\",\"validate\":{}}]','','','',''),(4,'hr','招聘信息',0,0,'','[{\"key\":\"title\",\"label\":\"标题\",\"type\":\"text\",\"validate\":{}},{\"key\":\"subtitle\",\"label\":\"链接\",\"type\":\"link\",\"validate\":{}},{\"key\":\"abstract\",\"label\":\"职位描述\",\"type\":\"mtext\",\"validate\":{}}]','','','',''),(5,'kefu','在线客服',0,0,'','','','','',''),(6,'activity','活动信息',0,0,'','[{\"key\":\"title\",\"label\":\"标题\",\"type\":\"text\",\"validate\":{}},{\"key\":\"subtitle\",\"label\":\"图片\",\"type\":\"image\",\"validate\":{}},{\"key\":\"abstract\",\"label\":\"简介\",\"type\":\"mtext\",\"validate\":{}},{\"key\":\"content\",\"label\":\"正文\",\"type\":\"mtext\",\"validate\":{}},{\"key\":\"sort\",\"label\":\"排序\",\"type\":\"number\",\"validate\":{}},{\"key\":\"is_show\",\"label\":\"显示/隐藏\",\"type\":\"text\",\"validate\":{}},{\"key\":\"ext1\",\"label\":\"跳转链接\",\"type\":\"text\",\"validate\":{}},{\"key\":\"ext2\",\"label\":\"浏览次数\",\"type\":\"number\",\"validate\":{}}]','','','',''),(7,'system_msg','公告消息',0,0,'','','','','',''),(8,'news','公司新闻',0,0,'','','','','',''),(9,'products','产品介绍',0,0,'','[{\"key\":\"title\",\"label\":\"产品名称\",\"type\":\"text\",\"validate\":{}},{\"key\":\"ext1\",\"label\":\"产品链接\",\"type\":\"text\",\"validate\":{}},{\"key\":\"content\",\"label\":\"产品介绍\",\"type\":\"mtext\",\"validate\":{}}]','','','',''),(10,'services','服务',0,0,'','','','','',''),(23,'测试模块','测试模块',0,1,'',NULL,'','','','');
/*!40000 ALTER TABLE `cms_modules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coupons`
--

DROP TABLE IF EXISTS `coupons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `coupons` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned NOT NULL DEFAULT '0',
  `type` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `amount` int(11) unsigned NOT NULL DEFAULT '0',
  `condition` varchar(255) NOT NULL DEFAULT '',
  `expires` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coupons`
--

LOCK TABLES `coupons` WRITE;
/*!40000 ALTER TABLE `coupons` DISABLE KEYS */;
/*!40000 ALTER TABLE `coupons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `goods`
--

DROP TABLE IF EXISTS `goods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `goods` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `cat_id` int(11) unsigned NOT NULL DEFAULT '0',
  `spec_id` int(11) unsigned NOT NULL DEFAULT '0',
  `store_id` int(11) unsigned NOT NULL DEFAULT '0',
  `name` varchar(30) NOT NULL DEFAULT '',
  `brand_name` varchar(30) NOT NULL DEFAULT '',
  `tags` varchar(60) NOT NULL DEFAULT '',
  `default_image` varchar(255) NOT NULL DEFAULT '',
  `description` mediumtext,
  `price` float unsigned NOT NULL DEFAULT '0',
  `market_price` float unsigned NOT NULL DEFAULT '0',
  `sales` int(11) unsigned NOT NULL DEFAULT '0',
  `stock` int(11) unsigned NOT NULL DEFAULT '0',
  `unit` varchar(30) NOT NULL DEFAULT '',
  `sku` varchar(30) NOT NULL DEFAULT '',
  `type` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `recommended` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `hot` int(11) unsigned NOT NULL DEFAULT '0',
  `is_show` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `goods`
--

LOCK TABLES `goods` WRITE;
/*!40000 ALTER TABLE `goods` DISABLE KEYS */;
INSERT INTO `goods` VALUES (1,1,0,1,'南京高级佳品香烟','南京','南京 香烟','http://img.bqmart.cn/data/files/store/355bfd662c3d156e4f7c490ef80a1415.jpg','南京高级佳品香烟',10,17,0,99999,'条','',0,0,0,1,'2015-12-07 23:44:17','2015-12-07 23:44:17'),(2,1,0,1,'七匹狼（蓝）','七匹狼','七匹狼 香烟','http://img.bqmart.cn/data/files/store/0d2537f5f86ff49cf90f2ed6344e1b0a.jpg','七匹狼高级佳香烟',10,17,0,99999,'条','',0,0,0,1,'2015-12-07 23:44:17','2015-12-07 23:44:17'),(3,1,0,1,'泰山（心悦）','泰山','泰山 香烟','http://img.bqmart.cn/data/files/store/09d81349144a84f6269024e34e9ff0b1.jpg','泰山（心悦）高级佳香烟',10,17,0,99999,'条','',0,0,0,1,'2015-12-07 23:44:17','2015-12-07 23:44:17'),(5,13,0,2,'立白新金桔洗洁精500g','立白','立白 新金桔 洗洁精','http://img.bqmart.cn/data/files/store/5281f9c2b9994927b9178425cb34585c.jpg','立白新金桔洗洁精500g',10,17,0,99999,'瓶','',0,0,0,1,'2015-12-07 23:44:44','2015-12-07 23:44:44');
/*!40000 ALTER TABLE `goods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `goods_tags`
--

DROP TABLE IF EXISTS `goods_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `goods_tags` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `good_id` int(11) unsigned NOT NULL DEFAULT '0',
  `tag_id` int(11) unsigned NOT NULL DEFAULT '0',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `goods_tags`
--

LOCK TABLES `goods_tags` WRITE;
/*!40000 ALTER TABLE `goods_tags` DISABLE KEYS */;
INSERT INTO `goods_tags` VALUES (54,1,56,'2015-12-24 08:49:08','2015-12-24 08:49:08'),(55,1,57,'2015-12-24 08:49:08','2015-12-24 08:49:08'),(56,1,58,'2015-12-24 08:49:39','2015-12-24 08:49:39');
/*!40000 ALTER TABLE `goods_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_details`
--

DROP TABLE IF EXISTS `order_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order_details` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `order_id` int(11) unsigned NOT NULL DEFAULT '0',
  `good_id` int(11) unsigned NOT NULL DEFAULT '0',
  `amount` int(11) unsigned NOT NULL DEFAULT '0',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_details`
--

LOCK TABLES `order_details` WRITE;
/*!40000 ALTER TABLE `order_details` DISABLE KEYS */;
INSERT INTO `order_details` VALUES (1,1,1,2,'2015-12-17 01:00:30','2015-12-17 01:00:30'),(2,1,2,1,'2015-12-17 01:00:30','2015-12-17 01:00:30'),(3,1,3,5,'2015-12-17 01:00:31','2015-12-17 01:00:31'),(4,2,1,2,'2015-12-17 02:56:33','2015-12-17 02:56:33'),(5,2,2,1,'2015-12-17 02:56:40','2015-12-17 02:56:40'),(6,5,2,2,'2015-12-17 04:26:52','2015-12-17 04:26:52'),(7,5,1,2,'2015-12-17 04:26:52','2015-12-17 04:26:52');
/*!40000 ALTER TABLE `order_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned NOT NULL DEFAULT '0',
  `sn` varchar(30) NOT NULL DEFAULT '',
  `amount` double unsigned NOT NULL DEFAULT '0',
  `status` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `from` varchar(30) NOT NULL DEFAULT '',
  `payment` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,1,'2015121708581115000',20000,1,'',1,'2015-12-17 01:00:36','2015-12-17 01:00:36'),(2,1,'2015121615301115000',15000,5,'',1,'2015-12-17 02:56:45','2015-12-17 02:56:45'),(5,1,'201512171226524323527',0,0,'unknown',0,'2015-12-17 04:26:52','2015-12-17 04:26:52');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sessions` (
  `session_id` varchar(255) COLLATE utf8_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` text COLLATE utf8_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('A283it-38Xb-0QlAZJMEajrOIDZYpPp5',1453263711,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":2},\"flash\":{},\"user\":{\"username\":\"15824121675\",\"id\":2,\"password\":\"6e518c33699ee724e45a02456e1f3666bdceb5cd\",\"nickname\":\"jackchoon\",\"email\":\"jackchoon@163.com\",\"phone\":\"15824121675\",\"avatar\":\"http://www.placehold.it/200x150/EFEFEF/AAAAAA&amp;text=avatar\",\"active\":1,\"role\":3,\"last_login_time\":\"2015-12-08T07:34:22.000Z\",\"created\":\"2015-12-08T07:34:22.000Z\",\"modified\":\"2016-01-11T09:44:55.000Z\",\"salt\":\"59605678287\"}}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `specs`
--

DROP TABLE IF EXISTS `specs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `specs` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `spec_name` varchar(30) NOT NULL DEFAULT '',
  `cat_id` varchar(255) NOT NULL DEFAULT '',
  `parent_id` int(11) unsigned NOT NULL DEFAULT '0',
  `sort` int(11) unsigned NOT NULL DEFAULT '0',
  `is_show` tinyint(11) unsigned NOT NULL DEFAULT '0',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `specs`
--

LOCK TABLES `specs` WRITE;
/*!40000 ALTER TABLE `specs` DISABLE KEYS */;
INSERT INTO `specs` VALUES (1,'衣物清洁类','13',0,0,0,'2015-12-08 07:38:35','2015-12-08 07:38:35'),(2,'厨房清洁类','13',0,0,0,'2015-12-08 07:38:35','2015-12-08 07:38:35'),(3,'纸类','13',0,0,0,'2015-12-08 07:38:35','2015-12-08 07:38:35'),(4,'奶粉类','19',0,0,0,'2015-12-08 07:38:35','2015-12-08 07:38:35'),(5,'服装类','19',0,0,0,'2015-12-08 07:38:35','2015-12-08 07:38:35'),(6,'玩具类','19',0,0,0,'2015-12-08 07:38:37','2015-12-08 07:38:37');
/*!40000 ALTER TABLE `specs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stores`
--

DROP TABLE IF EXISTS `stores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stores` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned NOT NULL DEFAULT '0',
  `type` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `name` varchar(60) NOT NULL DEFAULT '',
  `phone` varchar(11) NOT NULL DEFAULT '0',
  `scale` varchar(255) NOT NULL DEFAULT '',
  `business_scope` varchar(255) NOT NULL DEFAULT '',
  `location` varchar(255) NOT NULL DEFAULT '',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stores`
--

LOCK TABLES `stores` WRITE;
/*!40000 ALTER TABLE `stores` DISABLE KEYS */;
INSERT INTO `stores` VALUES (1,2,2,'长沙市湘华香烟批发商行','15824121675','','','长沙市开福区高桥大市场','2015-12-16 02:23:53','2015-12-16 02:23:53'),(2,3,2,'长沙景和食品贸易有限公司','18974861169','','','湖南省长沙市雨花区韶山南路红星糖酒城10栋173号','2015-12-16 02:23:53','2015-12-16 02:23:53'),(3,3,2,'长沙翔盛商贸有限公司','13667329234','','','湖南省长沙市芙蓉区农科服装市场','2015-12-16 02:23:55','2015-12-16 02:23:55');
/*!40000 ALTER TABLE `stores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tags` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL DEFAULT '0',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
INSERT INTO `tags` VALUES (1,'香烟','2015-12-16 01:49:07','2015-12-16 01:49:07'),(2,'烟标','2015-12-16 01:49:08','2015-12-16 01:49:08'),(56,'tag1','2015-12-24 08:49:08','2015-12-24 08:49:08'),(57,'tag2','2015-12-24 08:49:08','2015-12-24 08:49:08'),(58,'tag3','2015-12-24 08:49:39','2015-12-24 08:49:39');
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL DEFAULT '',
  `password` varchar(60) NOT NULL DEFAULT '',
  `nickname` varchar(30) NOT NULL DEFAULT '',
  `email` varchar(30) NOT NULL DEFAULT '',
  `phone` varchar(11) NOT NULL DEFAULT '',
  `avatar` varchar(255) NOT NULL DEFAULT '',
  `active` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `role` tinyint(3) unsigned NOT NULL DEFAULT '2',
  `last_login_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `salt` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'18073181682','65f1a8a409859720c666ab17e1ff3355ebed0df2','genie88','genie88@163.com','18073181682','http://localhost:3000/upload/avatar副本.jpg',1,2,'2015-12-08 07:34:04','2015-12-08 07:34:04','2016-01-18 04:51:14','635520681477'),(2,'15824121675','6e518c33699ee724e45a02456e1f3666bdceb5cd','jackchoon','jackchoon@163.com','15824121675','http://localhost:3000/upload/avatar副本.jpg',1,3,'2015-12-08 07:34:22','2015-12-08 07:34:22','2016-01-18 07:41:24','59605678287'),(10,'darral','','darral','darral@123','18756889980','http://www.placehold.it/200x150/EFEFEF/AAAAAA&amp;text=avatar',1,2,'2016-01-11 10:18:56','2016-01-11 10:18:56','2016-01-11 10:18:56','');
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

-- Dump completed on 2016-01-19 13:06:23

/** OAuth2 相关数据表 **/
CREATE TABLE `oauth_refresh_tokens` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned NOT NULL DEFAULT '0',
  `client_id` varchar(255) NOT NULL DEFAULT '',
  `refresh_token` varchar(255) NOT NULL DEFAULT '',
  `expires` timestamp,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

CREATE TABLE `oauth_access_tokens` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned NOT NULL DEFAULT '0',
  `client_id` varchar(255) NOT NULL DEFAULT '',
  `access_token` varchar(255) NOT NULL DEFAULT '',
  `expires` timestamp,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

CREATE TABLE `oauth_clients` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `client_id` varchar(255) NOT NULL DEFAULT '',
  `client_secret` varchar(255) NOT NULL DEFAULT '',
  `redirect_uri` varchar(255) NOT NULL DEFAULT '',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
INSERT INTO oauth_clients(client_id, client_secret, redirect_uri) VALUES("s6BhdRkqt3", "gX1fBat3bV", ""); 

CREATE TABLE `oauth_auth_codes` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned NOT NULL DEFAULT '0',
  `client_id` varchar(255) NOT NULL DEFAULT '',
  `auth_code` varchar(255) NOT NULL DEFAULT '',
  `expires` timestamp,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;


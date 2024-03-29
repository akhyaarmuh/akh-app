CREATE TABLE `bizmeta` (
  `meta_id`    INT          NOT NULL AUTO_INCREMENT,
  `biz_id`     INT          NOT NULL,
  `meta_key`   VARCHAR(255) NOT NULL,  
  `meta_value` TEXT     NOT NULL,
  `meta_extra` TEXT,
  PRIMARY KEY (`meta_id`),
  CONSTRAINT `fk_bizmeta_biz` FOREIGN KEY (`biz_id`) REFERENCES biz(`id`) ON DELETE CASCADE
) ENGINE = InnoDB;
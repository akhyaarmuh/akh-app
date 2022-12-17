CREATE TABLE `datameta` (
  `meta_id`    INT          NOT NULL AUTO_INCREMENT,
  `data_id`    INT          NOT NULL,
  `meta_key`   VARCHAR(255) NOT NULL,  
  `meta_value` LONGTEXT     NOT NULL,
  `meta_extra` LONGTEXT,
  PRIMARY KEY (`meta_id`),
  CONSTRAINT `fk_datameta_data` FOREIGN KEY (`data_id`) REFERENCES data(`id`)
) ENGINE = InnoDB;
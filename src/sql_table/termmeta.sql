CREATE TABLE `termmeta` (
  `meta_id`    INT          NOT NULL AUTO_INCREMENT,
  `term_id`    INT          NOT NULL,
  `meta_key`   VARCHAR(255) NOT NULL,  
  `meta_value` TEXT     NOT NULL,
  `meta_extra` TEXT,
  PRIMARY KEY (`meta_id`),
  CONSTRAINT `fk_termmeta_term` FOREIGN KEY (`term_id`) REFERENCES terms(`id`) ON DELETE CASCADE
) ENGINE = InnoDB;
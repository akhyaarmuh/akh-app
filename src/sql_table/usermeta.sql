CREATE TABLE `usermeta` (
  `meta_id`   INT          NOT NULL AUTO_INCREMENT,
  `user_id`    INT          NOT NULL,
  `meta_key`   VARCHAR(255) NOT NULL,  
  `meta_value` TEXT     NOT NULL,
  `meta_extra` TEXT,
  PRIMARY KEY (`meta_id`),
  CONSTRAINT `fk_usermeta_user` FOREIGN KEY (`user_id`) REFERENCES users(`id`) ON DELETE CASCADE
) ENGINE = InnoDB;
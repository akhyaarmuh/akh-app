CREATE TABLE `usermeta` (
  `umeta_id`   INT          NOT NULL AUTO_INCREMENT,
  `user_id`    INT          NOT NULL,
  `meta_key`   VARCHAR(255) NOT NULL,  
  `meta_value` LONGTEXT     NOT NULL,
  `meta_extra` LONGTEXT,
  PRIMARY KEY (`umeta_id`),
  CONSTRAINT `fk_usermeta_user` FOREIGN KEY (`user_id`) REFERENCES users(`id`)
) ENGINE = InnoDB;
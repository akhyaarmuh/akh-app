CREATE TABLE `term_taxonomy` (
  `term_taxonomy_id` INT NOT NULL AUTO_INCREMENT,
  `term_id`          INT NOT NULL,
  `taxonomy`         VARCHAR(250),
  `description`      TEXT,
  `parent`           INT,
  `count`            INT,
  `author`           INT NOT NULL,
  `biz`              INT NOT NULL,
  `status`           INT NOT NULL DEFAULT 1,
  PRIMARY KEY (`term_taxonomy_id`),
  CONSTRAINT `fk_term_taxonomy_term` FOREIGN KEY (`term_id`) REFERENCES terms(`term_id`),
  CONSTRAINT `fk_term_taxonomy_user` FOREIGN KEY (`author`) REFERENCES users(`id`),
  CONSTRAINT `fk_term_taxonomy_biz` FOREIGN KEY (`biz`) REFERENCES biz(`id`)
) ENGINE = InnoDB;
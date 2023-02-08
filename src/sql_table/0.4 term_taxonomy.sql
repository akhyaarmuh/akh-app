CREATE TABLE `term_taxonomy` (
  `id`          INT NOT NULL AUTO_INCREMENT,
  `term_id`     INT NOT NULL,
  `taxonomy`    VARCHAR(250),
  `description` TEXT,
  `parent`      INT NOT NULL DEFAULT 0,
  `count`       INT NOT NULL DEFAULT 0,
  `author`      INT NOT NULL,
  `biz`         INT NOT NULL,
  `status`      INT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_term_taxonomy_term` FOREIGN KEY (`term_id`) REFERENCES terms(`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_term_taxonomy_user` FOREIGN KEY (`author`) REFERENCES users(`id`),
  CONSTRAINT `fk_term_taxonomy_biz` FOREIGN KEY (`biz`) REFERENCES biz(`id`)
) ENGINE = InnoDB;
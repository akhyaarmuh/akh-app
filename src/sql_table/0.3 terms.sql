CREATE TABLE `terms` (
  `id`         INT           NOT NULL AUTO_INCREMENT,
  `name`       VARCHAR(100)  NOT NULL,
  `slug`       VARCHAR(125)  NOT NULL,
  `term_group` INT           NOT NULL DEFAULT 0,
  `biz`        INT           NOT NULL,
  `created_at` TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `term_unique` (`name`, `biz`),
  CONSTRAINT `fk_term_biz` FOREIGN KEY (`biz`) REFERENCES biz(`id`) ON DELETE CASCADE
) ENGINE = InnoDB;
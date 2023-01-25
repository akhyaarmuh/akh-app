CREATE TABLE `terms` (
  `term_id`    INT           NOT NULL AUTO_INCREMENT,
  `name`       VARCHAR(100)  NOT NULL,
  `slug`       VARCHAR(125)  NOT NULL,
  `term_group` INT           NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`term_id`),
  UNIQUE KEY name_unique (name)
) ENGINE = InnoDB;
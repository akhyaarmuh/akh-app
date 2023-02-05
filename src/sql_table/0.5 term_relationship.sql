CREATE TABLE `term_relationship` (
  `data_id`          INT NOT NULL,
  `term_taxonomy_id` INT NOT NULL,
  `term_order`       INT NOT NULL DEFAULT 0,
  CONSTRAINT `fk_term_relationship_data` FOREIGN KEY (`data_id`) REFERENCES data(`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_term_relationship_term_taxonomy` FOREIGN KEY (`term_taxonomy_id`) REFERENCES term_taxonomy(`id`)
) ENGINE = InnoDB;
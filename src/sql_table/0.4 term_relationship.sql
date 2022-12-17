CREATE TABLE `term_relationship` (
  `data_id`          INT NOT NULL,
  `term_id`          INT NOT NULL,
  `term_order`       INT NOT NULL DEFAULT 0,
  CONSTRAINT `fk_term_relationship_data` FOREIGN KEY (`data_id`) REFERENCES data(`id`),
  CONSTRAINT `fk_term_relationship_term` FOREIGN KEY (`term_id`) REFERENCES terms(`term_id`)
) ENGINE = InnoDB;
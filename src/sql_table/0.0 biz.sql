CREATE TABLE `biz` (
  `id`         INT          NOT NULL AUTO_INCREMENT,
  `name`       VARCHAR(100) NOT NULL,
  `slug`       VARCHAR(125) NOT NULL,
  `status`     INT NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY slug_unique (slug)
) ENGINE = InnoDB;
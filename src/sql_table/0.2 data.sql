CREATE TABLE `data` (
  `id`         INT          NOT NULL AUTO_INCREMENT,
  `name`       VARCHAR(100) NOT NULL,
  `data_type`  VARCHAR(100) NOT NULL,
  `slug`       VARCHAR(125) NOT NULL,
  `status`     INT          NOT NULL DEFAULT 1,
  `author`     INT          NOT NULL,
  `biz`        INT          NOT NULL,
  `created_at` TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `data_unique` (`name`, `data_type`, `biz`),
  CONSTRAINT `fk_data_user` FOREIGN KEY (`author`) REFERENCES users(`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_data_biz` FOREIGN KEY (`biz`) REFERENCES biz(`id`) ON DELETE CASCADE
) ENGINE = InnoDB;
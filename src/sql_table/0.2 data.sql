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
  CONSTRAINT `fk_data_user` FOREIGN KEY (`author`) REFERENCES users(`id`),
  CONSTRAINT `fk_data_biz` FOREIGN KEY (`biz`) REFERENCES biz(`id`)
) ENGINE = InnoDB;
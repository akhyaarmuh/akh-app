CREATE TABLE `users` (
  `id`         INT          NOT NULL AUTO_INCREMENT,
  `username`   VARCHAR(100) NOT NULL,
  `password`   TEXT         NOT NULL,
  `nicename`   VARCHAR(255),
  `email`      VARCHAR(150) NOT NULL,
  `url`        TEXT,
  `registered` TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `type`       VARCHAR(100) NOT NULL,
  `status`     INT          NOT NULL DEFAULT 1,
  `full_name`  VARCHAR(255) NOT NULL,
  `biz`        INT          NOT NULL,
  `created_at` TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY username_unique (username),
  UNIQUE KEY email_unique (email),
  CONSTRAINT `fk_user_biz` FOREIGN KEY (`biz`) REFERENCES biz(`id`) ON DELETE CASCADE
) ENGINE = InnoDB;
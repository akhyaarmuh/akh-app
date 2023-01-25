CREATE TABLE `users` (
  `id`              INT          NOT NULL AUTO_INCREMENT,
  `user_login`      VARCHAR(100) NOT NULL,
  `user_pass`       TEXT         NOT NULL,
  `user_nicename`   VARCHAR(255) NOT NULL,
  `user_email`      VARCHAR(150) NOT NULL,
  `user_url`        TEXT         NOT NULL,
  `user_registered` TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_type`       VARCHAR(100) NOT NULL,
  `user_status`     INT          NOT NULL DEFAULT 1,
  `display_name`    VARCHAR(255) NOT NULL,
  `biz`             INT          NOT NULL,
  `created_at`      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY user_login_unique (user_login),
  UNIQUE KEY user_email_unique (user_email),
  CONSTRAINT `fk_user_biz` FOREIGN KEY (`biz`) REFERENCES biz(`id`)
) ENGINE = InnoDB;
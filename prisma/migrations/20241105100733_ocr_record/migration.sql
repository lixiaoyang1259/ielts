-- CreateTable
CREATE TABLE `ocr_record` (
    `md5` VARCHAR(191) NOT NULL,
    `url` TEXT NOT NULL,

    PRIMARY KEY (`md5`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

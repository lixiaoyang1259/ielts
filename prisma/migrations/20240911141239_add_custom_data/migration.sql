-- CreateTable
CREATE TABLE `custom_question` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `user_id` VARCHAR(191) NOT NULL,
    `question` VARCHAR(191) NOT NULL,
    `images` VARCHAR(191) NULL,
    `level` VARCHAR(191) NOT NULL,
    `answer` VARCHAR(191) NOT NULL,
    `comments` VARCHAR(191) NULL,
    `score` INTEGER NOT NULL DEFAULT -1,
    `reviewDate` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `custom_question` ADD CONSTRAINT `custom_question_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

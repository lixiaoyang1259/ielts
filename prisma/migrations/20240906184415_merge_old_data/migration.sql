-- AlterTable
ALTER TABLE `User` ADD COLUMN `point` INTEGER NOT NULL DEFAULT 99;

-- CreateTable
CREATE TABLE `ielts_task` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `part` ENUM('part1', 'part2') NOT NULL,
    `type` ENUM('academic', 'general') NOT NULL,
    `time` INTEGER NOT NULL,
    `words` INTEGER NOT NULL,
    `question` TEXT NOT NULL,
    `image` VARCHAR(1000) NULL,
    `image_backup` VARCHAR(1000) NULL,
    `model_answer` TEXT NOT NULL,
    `version` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ielts_record` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `answer` TEXT NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `score` INTEGER NOT NULL DEFAULT -1,
    `review` TEXT NULL,
    `task_id` INTEGER NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `version` INTEGER NOT NULL DEFAULT 1,
    `is_custom_task` BOOLEAN NOT NULL DEFAULT false,

    INDEX `ielts_record_task_id_idx`(`task_id`),
    INDEX `ielts_record_user_id_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `point` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `user_id` VARCHAR(191) NOT NULL,
    `source` VARCHAR(191) NOT NULL DEFAULT '',
    `order_id` VARCHAR(191) NOT NULL DEFAULT '',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `suggestion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `message` VARCHAR(2000) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ielts_record` ADD CONSTRAINT `ielts_record_task_id_fkey` FOREIGN KEY (`task_id`) REFERENCES `ielts_task`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ielts_record` ADD CONSTRAINT `ielts_record_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payment` ADD CONSTRAINT `payment_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateNotificationSettings1629966168850 implements MigrationInterface {
    name = 'updateNotificationSettings1629966168850';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP INDEX "IDX_b14f346658f14defe5e349827c"');
        await queryRunner.query('ALTER TYPE "notification_settings_notificationtype_enum" RENAME TO "notification_settings_notificationtype_enum_old"');
        await queryRunner.query('CREATE TYPE "notification_settings_notificationtype_enum" AS ENUM(\'team\', \'teamEmail\', \'comment\', \'commentEmail\', \'page\', \'pageEmail\')');
        await queryRunner.query('ALTER TABLE "notification_settings" ALTER COLUMN "notificationType" TYPE "notification_settings_notificationtype_enum" USING "notificationType"::"text"::"notification_settings_notificationtype_enum"');
        await queryRunner.query('DROP TYPE "notification_settings_notificationtype_enum_old"');
        await queryRunner.query('CREATE UNIQUE INDEX "IDX_b14f346658f14defe5e349827c" ON "notification_settings" ("userId", "notificationType") ');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP INDEX "IDX_b14f346658f14defe5e349827c"');
        await queryRunner.query('CREATE TYPE "notification_settings_notificationtype_enum_old" AS ENUM(\'team\', \'teamEmail\', \'comment\', \'commentEmail\')');
        await queryRunner.query('ALTER TABLE "notification_settings" ALTER COLUMN "notificationType" TYPE "notification_settings_notificationtype_enum_old" USING "notificationType"::"text"::"notification_settings_notificationtype_enum_old"');
        await queryRunner.query('DROP TYPE "notification_settings_notificationtype_enum"');
        await queryRunner.query('ALTER TYPE "notification_settings_notificationtype_enum_old" RENAME TO "notification_settings_notificationtype_enum"');
        await queryRunner.query('CREATE UNIQUE INDEX "IDX_b14f346658f14defe5e349827c" ON "notification_settings" ("userId", "notificationType") ');
    }

}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class addNotificationsSettings1629807729515
  implements MigrationInterface
{
  name = 'addNotificationsSettings1629807729515';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TYPE "notification_settings_notificationtype_enum" AS ENUM(\'team\', \'teamEmail\', \'comment\', \'commentEmail\')',
    );
    await queryRunner.query(
      'CREATE TABLE "notification_settings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" uuid NOT NULL, "notificationType" "notification_settings_notificationtype_enum" NOT NULL, CONSTRAINT "PK_55650b3389b1bfbb05ddad26b80" PRIMARY KEY ("id", "userId", "notificationType"))',
    );
    await queryRunner.query(
      'CREATE UNIQUE INDEX "IDX_b14f346658f14defe5e349827c" ON "notification_settings" ("userId", "notificationType") ',
    );
    await queryRunner.query(
      'ALTER TABLE "notification_settings" ADD CONSTRAINT "FK_5a8ffc3b89343043c9440d631e2" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "notification_settings" DROP CONSTRAINT "FK_5a8ffc3b89343043c9440d631e2"',
    );
    await queryRunner.query('DROP INDEX "IDX_b14f346658f14defe5e349827c"');
    await queryRunner.query('DROP TABLE "notification_settings"');
    await queryRunner.query(
      'DROP TYPE "notification_settings_notificationtype_enum"',
    );
  }
}

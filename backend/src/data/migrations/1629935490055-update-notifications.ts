import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateNotifications1629935490055 implements MigrationInterface {
  name = 'updateNotifications1629935490055';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TYPE "notification_type_enum" RENAME TO "notification_type_enum_old"',
    );
    await queryRunner.query(
      'CREATE TYPE "notification_type_enum" AS ENUM(\'comment\', \'team\', \'page\')',
    );
    await queryRunner.query(
      'ALTER TABLE "notification" ALTER COLUMN "type" DROP DEFAULT',
    );
    await queryRunner.query(
      'ALTER TABLE "notification" ALTER COLUMN "type" TYPE "notification_type_enum" USING "type"::"text"::"notification_type_enum"',
    );
    await queryRunner.query(
      'ALTER TABLE "notification" ALTER COLUMN "type" SET DEFAULT \'comment\'',
    );
    await queryRunner.query('DROP TYPE "notification_type_enum_old"');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TYPE "notification_type_enum_old" AS ENUM(\'comment\', \'team\')',
    );
    await queryRunner.query(
      'ALTER TABLE "notification" ALTER COLUMN "type" DROP DEFAULT',
    );
    await queryRunner.query(
      'ALTER TABLE "notification" ALTER COLUMN "type" TYPE "notification_type_enum_old" USING "type"::"text"::"notification_type_enum_old"',
    );
    await queryRunner.query(
      'ALTER TABLE "notification" ALTER COLUMN "type" SET DEFAULT \'comment\'',
    );
    await queryRunner.query('DROP TYPE "notification_type_enum"');
    await queryRunner.query(
      'ALTER TYPE "notification_type_enum_old" RENAME TO "notification_type_enum"',
    );
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class addNotifications1629138247028 implements MigrationInterface {
  name = 'addNotifications1629138247028';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TYPE "notification_type_enum" AS ENUM(\'comment\')',
    );
    await queryRunner.query(
      'CREATE TABLE "notification" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "title" character varying NOT NULL, "body" character varying NOT NULL, "type" "notification_type_enum" NOT NULL DEFAULT \'comment\', "entityTypeId" character varying NOT NULL, "read" boolean NOT NULL, CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'ALTER TABLE "user_workspace" DROP COLUMN "status"',
    );
    await queryRunner.query(
      'CREATE TYPE "user_workspace_status_enum" AS ENUM(\'Joined\', \'Declined\', \'Pending\')',
    );
    await queryRunner.query(
      'ALTER TABLE "user_workspace" ADD "status" "user_workspace_status_enum"',
    );
    await queryRunner.query('ALTER TABLE "user" DROP COLUMN "title"');
    await queryRunner.query(
      'ALTER TABLE "user" ADD "title" character varying(200)',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "user" DROP COLUMN "title"');
    await queryRunner.query('ALTER TABLE "user" ADD "title" character varying');
    await queryRunner.query(
      'ALTER TABLE "user_workspace" DROP COLUMN "status"',
    );
    await queryRunner.query('DROP TYPE "user_workspace_status_enum"');
    await queryRunner.query(
      'ALTER TABLE "user_workspace" ADD "status" character varying NOT NULL DEFAULT \'Joined\'',
    );
    await queryRunner.query('DROP TABLE "notification"');
    await queryRunner.query('DROP TYPE "notification_type_enum"');
  }
}

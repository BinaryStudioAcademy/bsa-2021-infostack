import { MigrationInterface, QueryRunner } from 'typeorm';

export class addNotification1629140541040 implements MigrationInterface {
  name = 'addNotification1629140541040';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "notification" DROP COLUMN "body"');
    await queryRunner.query(
      'ALTER TABLE "notification" ADD "body" character varying(100) NOT NULL',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "notification" DROP COLUMN "body"');
    await queryRunner.query(
      'ALTER TABLE "notification" ADD "body" character varying NOT NULL',
    );
  }
}

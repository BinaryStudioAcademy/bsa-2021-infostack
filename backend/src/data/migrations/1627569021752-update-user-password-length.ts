import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateUserPasswordLength1627569021752 implements MigrationInterface {
  name = 'updateUserPasswordLength1627569021752';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "user" DROP COLUMN "password"');
    await queryRunner.query('ALTER TABLE "user" ADD "password" character varying(200)');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "user" DROP COLUMN "password"');
    await queryRunner.query('ALTER TABLE "user" ADD "password" character varying(100)');
  }

}

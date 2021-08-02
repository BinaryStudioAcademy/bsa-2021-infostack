import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateUserAddAvatarColumn1627897596559 implements MigrationInterface {
  name = 'updateUserAddAvatarColumn1627897596559';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "user" ADD "avatar" character varying');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "user" DROP COLUMN "avatar"');
  }

}

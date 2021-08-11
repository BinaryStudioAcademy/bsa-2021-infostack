import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateUserAddTitleColumn1628057787684
  implements MigrationInterface
{
  name = 'updateUserAddTitleColumn1628057787684';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "user" ADD "title" character varying');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "user" DROP COLUMN "title"');
  }
}

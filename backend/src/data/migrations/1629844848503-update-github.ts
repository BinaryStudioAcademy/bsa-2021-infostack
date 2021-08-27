import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateGithub1629844848503 implements MigrationInterface {
  name = 'updateGithub1629844848503';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "github" ALTER COLUMN "username" DROP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "github" ALTER COLUMN "repo" DROP NOT NULL',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "github" ALTER COLUMN "repo" SET NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "github" ALTER COLUMN "username" SET NOT NULL',
    );
  }
}

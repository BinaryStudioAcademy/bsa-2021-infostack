import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateGithub1629844520191 implements MigrationInterface {
  name = 'updateGithub1629844520191';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "github" DROP CONSTRAINT "FK_41b1c578dedc3cdd83b55d03a6e"',
    );
    await queryRunner.query('ALTER TABLE "github" DROP COLUMN "workspaceId"');
    await queryRunner.query(
      'ALTER TABLE "github" ADD "workspaceId" character varying NOT NULL',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "github" DROP COLUMN "workspaceId"');
    await queryRunner.query(
      'ALTER TABLE "github" ADD "workspaceId" uuid NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "github" ADD CONSTRAINT "FK_41b1c578dedc3cdd83b55d03a6e" FOREIGN KEY ("workspaceId") REFERENCES "workspace"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }
}

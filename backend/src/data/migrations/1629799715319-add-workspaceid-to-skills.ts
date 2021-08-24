import { MigrationInterface, QueryRunner } from 'typeorm';

export class addWorkspaceidToSkills1629799715319 implements MigrationInterface {
  name = 'addWorkspaceidToSkills1629799715319';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "skill" ADD "workspaceId" uuid NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "skill" ADD CONSTRAINT "FK_b832ffda9048fae83e52fbe48a7" FOREIGN KEY ("workspaceId") REFERENCES "workspace"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "skill" DROP CONSTRAINT "FK_b832ffda9048fae83e52fbe48a7"',
    );
    await queryRunner.query('ALTER TABLE "skill" DROP COLUMN "workspaceId"');
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class addWorkspaceidToSkills1629818873436 implements MigrationInterface {
  name = 'addWorkspaceidToSkills1629818873436';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "skill" ADD "workspaceId" uuid NOT NULL DEFAULT \'b6e959fd-09b3-42cd-8a30-90c31054198a\'',
    );
    await queryRunner.query(
      'ALTER TABLE "skill" ADD CONSTRAINT "FK_b832ffda9048fae83e52fbe48a7" FOREIGN KEY ("workspaceId") REFERENCES "workspace"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "skill" ALTER COLUMN "workspaceId" DROP DEFAULT',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "skill" DROP CONSTRAINT "FK_b832ffda9048fae83e52fbe48a7"',
    );
    await queryRunner.query(
      'ALTER TABLE "skill" ALTER COLUMN "workspaceId" SET DEFAULT \'b6e959fd-09b3-42cd-8a30-90c31054198a\'',
    );
    await queryRunner.query('ALTER TABLE "skill" DROP COLUMN "workspaceId"');
  }
}

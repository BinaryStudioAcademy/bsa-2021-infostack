import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateWorkspaceAddStatusColumn1628495016124
  implements MigrationInterface
{
  name = 'updateWorkspaceAddStatusColumn1628495016124';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "user_workspace" ADD "status" character varying NOT NULL DEFAULT \'Joined\'',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "user_workspace" DROP COLUMN "status"',
    );
  }
}

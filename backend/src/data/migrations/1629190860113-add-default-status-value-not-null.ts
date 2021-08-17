import { MigrationInterface, QueryRunner } from 'typeorm';

export class addDefaultStatusValueNotNull1629190860113
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      'ALTER TABLE "user_workspace" DROP COLUMN "status"',
    );
    await queryRunner.query(
      'ALTER TABLE "user_workspace" ADD "status" "user_workspace_status_enum" NOT NULL DEFAULT \'Joined\'',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      'ALTER TABLE "user_workspace" DROP COLUMN "status"',
    );
    await queryRunner.query(
      "CREATE TYPE \"user_workspace_status_enum\" AS ENUM('Joined', 'Declined', 'Pending')",
    );
    await queryRunner.query(
      'ALTER TABLE "user_workspace" ADD "status" "user_workspace_status_enum"',
    );
  }
}

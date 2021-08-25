import { MigrationInterface, QueryRunner } from 'typeorm';

export class addedDeletedStatus1629195023370 implements MigrationInterface {
  name = 'addedDeletedStatus1629195023370';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TYPE "user_workspace_status_enum" RENAME TO "user_workspace_status_enum_old"',
    );
    await queryRunner.query(
      'CREATE TYPE "user_workspace_status_enum" AS ENUM(\'Joined\', \'Declined\', \'Pending\', \'Deleted\')',
    );
    await queryRunner.query(
      'ALTER TABLE "user_workspace" ALTER COLUMN "status" DROP DEFAULT',
    );
    await queryRunner.query(
      'ALTER TABLE "user_workspace" ALTER COLUMN "status" TYPE "user_workspace_status_enum" USING "status"::"text"::"user_workspace_status_enum"',
    );
    await queryRunner.query(
      'ALTER TABLE "user_workspace" ALTER COLUMN "status" SET DEFAULT \'Joined\'',
    );
    await queryRunner.query('DROP TYPE "user_workspace_status_enum_old"');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TYPE "user_workspace_status_enum_old" AS ENUM(\'Joined\', \'Declined\', \'Pending\')',
    );
    await queryRunner.query(
      'ALTER TABLE "user_workspace" ALTER COLUMN "status" DROP DEFAULT',
    );
    await queryRunner.query(
      'ALTER TABLE "user_workspace" ALTER COLUMN "status" TYPE "user_workspace_status_enum_old" USING "status"::"text"::"user_workspace_status_enum_old"',
    );
    await queryRunner.query(
      'ALTER TABLE "user_workspace" ALTER COLUMN "status" SET DEFAULT \'Joined\'',
    );
    await queryRunner.query('DROP TYPE "user_workspace_status_enum"');
    await queryRunner.query(
      'ALTER TYPE "user_workspace_status_enum_old" RENAME TO "user_workspace_status_enum"',
    );
  }
}

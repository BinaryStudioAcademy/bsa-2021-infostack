import { MigrationInterface, QueryRunner } from 'typeorm';

export class addNullableBodyNotification1629145540635
  implements MigrationInterface
{
  name = 'addNullableBodyNotification1629145540635';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "notification" ADD "userId" character varying NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "notification" ALTER COLUMN "body" DROP NOT NULL',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "notification" ALTER COLUMN "body" SET NOT NULL',
    );
    await queryRunner.query('ALTER TABLE "notification" DROP COLUMN "userId"');
  }
}

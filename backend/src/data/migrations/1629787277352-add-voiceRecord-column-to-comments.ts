import { MigrationInterface, QueryRunner } from 'typeorm';

export class addVoiceRecordColumnToComments1629787277352
  implements MigrationInterface
{
  name = 'addVoiceRecordColumnToComments1629787277352';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "comment" DROP CONSTRAINT "FK_73aac6035a70c5f0313c939f237"',
    );
    await queryRunner.query(
      'ALTER TABLE "comment" ADD "voiceRecord" character varying',
    );
    await queryRunner.query(
      'ALTER TABLE "comment" ADD CONSTRAINT "FK_73aac6035a70c5f0313c939f237" FOREIGN KEY ("parentCommentId") REFERENCES "comment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "comment" DROP CONSTRAINT "FK_73aac6035a70c5f0313c939f237"',
    );
    await queryRunner.query('ALTER TABLE "comment" DROP COLUMN "voiceRecord"');
    await queryRunner.query(
      'ALTER TABLE "comment" ADD CONSTRAINT "FK_73aac6035a70c5f0313c939f237" FOREIGN KEY ("parentCommentId") REFERENCES "comment"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
  }
}

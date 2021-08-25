import { MigrationInterface, QueryRunner } from 'typeorm';

export class createDraftTable1629555194389 implements MigrationInterface {
  name = 'createDraftTable1629555194389';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "comment" DROP CONSTRAINT "FK_73aac6035a70c5f0313c939f237"',
    );
    await queryRunner.query(
      'CREATE TABLE "draft" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "title" character varying NOT NULL, "content" character varying NOT NULL, "pageId" uuid NOT NULL, CONSTRAINT "UQ_4cd6d3e3472858e7e27a7263cb0" UNIQUE ("pageId"), CONSTRAINT "REL_4cd6d3e3472858e7e27a7263cb" UNIQUE ("pageId"), CONSTRAINT "PK_0b2b03d3f2c998450423648bc65" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'ALTER TABLE "draft" ADD CONSTRAINT "FK_4cd6d3e3472858e7e27a7263cb0" FOREIGN KEY ("pageId") REFERENCES "page"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "comment" ADD CONSTRAINT "FK_73aac6035a70c5f0313c939f237" FOREIGN KEY ("parentCommentId") REFERENCES "comment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "comment" DROP CONSTRAINT "FK_73aac6035a70c5f0313c939f237"',
    );
    await queryRunner.query(
      'ALTER TABLE "draft" DROP CONSTRAINT "FK_4cd6d3e3472858e7e27a7263cb0"',
    );
    await queryRunner.query('DROP TABLE "draft"');
    await queryRunner.query(
      'ALTER TABLE "comment" ADD CONSTRAINT "FK_73aac6035a70c5f0313c939f237" FOREIGN KEY ("parentCommentId") REFERENCES "comment"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
  }
}

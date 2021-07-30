import { MigrationInterface, QueryRunner } from 'typeorm';

export class updatePageParentPagesNullable1627574836790 implements MigrationInterface {
  name = 'updatePageParentPagesNullable1627574836790';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "page" DROP CONSTRAINT "FK_b85a31f0bff1e857156d27ea152"');
    await queryRunner.query('ALTER TABLE "page" ALTER COLUMN "parentPageId" DROP NOT NULL');
    await queryRunner.query('ALTER TABLE "comment" DROP CONSTRAINT "FK_73aac6035a70c5f0313c939f237"');
    await queryRunner.query('ALTER TABLE "comment" ALTER COLUMN "parentCommentId" DROP NOT NULL');
    await queryRunner.query('ALTER TABLE "page" ADD CONSTRAINT "FK_b85a31f0bff1e857156d27ea152" FOREIGN KEY ("parentPageId") REFERENCES "page"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE "comment" ADD CONSTRAINT "FK_73aac6035a70c5f0313c939f237" FOREIGN KEY ("parentCommentId") REFERENCES "comment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "comment" DROP CONSTRAINT "FK_73aac6035a70c5f0313c939f237"');
    await queryRunner.query('ALTER TABLE "page" DROP CONSTRAINT "FK_b85a31f0bff1e857156d27ea152"');
    await queryRunner.query('ALTER TABLE "comment" ALTER COLUMN "parentCommentId" SET NOT NULL');
    await queryRunner.query('ALTER TABLE "comment" ADD CONSTRAINT "FK_73aac6035a70c5f0313c939f237" FOREIGN KEY ("parentCommentId") REFERENCES "comment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE "page" ALTER COLUMN "parentPageId" SET NOT NULL');
    await queryRunner.query('ALTER TABLE "page" ADD CONSTRAINT "FK_b85a31f0bff1e857156d27ea152" FOREIGN KEY ("parentPageId") REFERENCES "page"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
  }

}

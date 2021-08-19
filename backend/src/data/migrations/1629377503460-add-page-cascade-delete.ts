import { MigrationInterface, QueryRunner } from 'typeorm';

export class addPageCascadeDelete1629377503460 implements MigrationInterface {
  name = 'addPageCascadeDelete1629377503460';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "user_permission" DROP CONSTRAINT "FK_e982197299cd20c387005700848"',
    );
    await queryRunner.query(
      'ALTER TABLE "page_content" DROP CONSTRAINT "FK_4e28fda8b4d802c7e7a3e8c03e2"',
    );
    await queryRunner.query(
      'ALTER TABLE "page" DROP CONSTRAINT "FK_b85a31f0bff1e857156d27ea152"',
    );
    await queryRunner.query(
      'ALTER TABLE "comment" DROP CONSTRAINT "FK_6e81e056d491bd203f29f09a3a0"',
    );
    await queryRunner.query(
      'ALTER TABLE "user_permission" ADD CONSTRAINT "FK_e982197299cd20c387005700848" FOREIGN KEY ("pageId") REFERENCES "page"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "page_content" ADD CONSTRAINT "FK_4e28fda8b4d802c7e7a3e8c03e2" FOREIGN KEY ("pageId") REFERENCES "page"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "page" ADD CONSTRAINT "FK_b85a31f0bff1e857156d27ea152" FOREIGN KEY ("parentPageId") REFERENCES "page"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "comment" ADD CONSTRAINT "FK_6e81e056d491bd203f29f09a3a0" FOREIGN KEY ("pageId") REFERENCES "page"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "comment" DROP CONSTRAINT "FK_6e81e056d491bd203f29f09a3a0"',
    );
    await queryRunner.query(
      'ALTER TABLE "page" DROP CONSTRAINT "FK_b85a31f0bff1e857156d27ea152"',
    );
    await queryRunner.query(
      'ALTER TABLE "page_content" DROP CONSTRAINT "FK_4e28fda8b4d802c7e7a3e8c03e2"',
    );
    await queryRunner.query(
      'ALTER TABLE "user_permission" DROP CONSTRAINT "FK_e982197299cd20c387005700848"',
    );
    await queryRunner.query(
      'ALTER TABLE "comment" ADD CONSTRAINT "FK_6e81e056d491bd203f29f09a3a0" FOREIGN KEY ("pageId") REFERENCES "page"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "page" ADD CONSTRAINT "FK_b85a31f0bff1e857156d27ea152" FOREIGN KEY ("parentPageId") REFERENCES "page"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "page_content" ADD CONSTRAINT "FK_4e28fda8b4d802c7e7a3e8c03e2" FOREIGN KEY ("pageId") REFERENCES "page"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "user_permission" ADD CONSTRAINT "FK_e982197299cd20c387005700848" FOREIGN KEY ("pageId") REFERENCES "page"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }
}

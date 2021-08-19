import { MigrationInterface, QueryRunner } from 'typeorm';

export class addPageCascadeDelete1629217720682 implements MigrationInterface {
  name = 'addPageCascadeDelete1629217720682';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "page" DROP CONSTRAINT "FK_b85a31f0bff1e857156d27ea152"`,
    );
    await queryRunner.query(
      `ALTER TABLE "page" ADD CONSTRAINT "FK_b85a31f0bff1e857156d27ea152" FOREIGN KEY ("parentPageId") REFERENCES "page"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "page" DROP CONSTRAINT "FK_b85a31f0bff1e857156d27ea152"`,
    );
    await queryRunner.query(
      `ALTER TABLE "page" ADD CONSTRAINT "FK_b85a31f0bff1e857156d27ea152" FOREIGN KEY ("parentPageId") REFERENCES "page"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}

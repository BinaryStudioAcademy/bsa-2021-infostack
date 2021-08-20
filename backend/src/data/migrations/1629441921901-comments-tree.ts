import { MigrationInterface, QueryRunner } from 'typeorm';

export class commentsTree1629441921901 implements MigrationInterface {
  name = 'commentsTree1629441921901';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "comment_closure" ("id_ancestor" uuid NOT NULL, "id_descendant" uuid NOT NULL, CONSTRAINT "PK_39195b1bd8eac2b5087e226824c" PRIMARY KEY ("id_ancestor", "id_descendant"))',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_cbfcbcc9274de7f5608b8ae23d" ON "comment_closure" ("id_ancestor") ',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_aa8fb74dcdb101a8d80cb2256d" ON "comment_closure" ("id_descendant") ',
    );
    await queryRunner.query(
      'ALTER TABLE "comment_closure" ADD CONSTRAINT "FK_cbfcbcc9274de7f5608b8ae23d9" FOREIGN KEY ("id_ancestor") REFERENCES "comment"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "comment_closure" ADD CONSTRAINT "FK_aa8fb74dcdb101a8d80cb2256de" FOREIGN KEY ("id_descendant") REFERENCES "comment"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "comment_closure" DROP CONSTRAINT "FK_aa8fb74dcdb101a8d80cb2256de"',
    );
    await queryRunner.query(
      'ALTER TABLE "comment_closure" DROP CONSTRAINT "FK_cbfcbcc9274de7f5608b8ae23d9"',
    );
    await queryRunner.query('DROP INDEX "IDX_aa8fb74dcdb101a8d80cb2256d"');
    await queryRunner.query('DROP INDEX "IDX_cbfcbcc9274de7f5608b8ae23d"');
    await queryRunner.query('DROP TABLE "comment_closure"');
  }
}

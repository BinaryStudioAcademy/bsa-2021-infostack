import { MigrationInterface, QueryRunner } from 'typeorm';

export class addFollowingPages1628242667822 implements MigrationInterface {
  name = 'addFollowingPages1628242667822';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "user_followedPages" ("pageId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_7d187b2b169cd2359369709ec6d" PRIMARY KEY ("pageId", "userId"))',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_a51ba349a632c6fb7eb1865d4d" ON "user_followedPages" ("pageId") ',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_1005248f0773a844c0ea81e7d0" ON "user_followedPages" ("userId") ',
    );
    await queryRunner.query(
      'ALTER TABLE "user_followedPages" ADD CONSTRAINT "FK_a51ba349a632c6fb7eb1865d4d9" FOREIGN KEY ("pageId") REFERENCES "page"("id") ON DELETE CASCADE ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE "user_followedPages" ADD CONSTRAINT "FK_1005248f0773a844c0ea81e7d0c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "user_followedPages" DROP CONSTRAINT "FK_1005248f0773a844c0ea81e7d0c"',
    );
    await queryRunner.query(
      'ALTER TABLE "user_followedPages" DROP CONSTRAINT "FK_a51ba349a632c6fb7eb1865d4d9"',
    );
    await queryRunner.query('DROP INDEX "IDX_1005248f0773a844c0ea81e7d0"');
    await queryRunner.query('DROP INDEX "IDX_a51ba349a632c6fb7eb1865d4d"');
    await queryRunner.query('DROP TABLE "user_followedPages"');
  }
}

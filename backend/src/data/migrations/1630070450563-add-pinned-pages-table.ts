import {MigrationInterface, QueryRunner} from "typeorm";

export class addPinnedPagesTable1630070450563 implements MigrationInterface {
    name = 'addPinnedPagesTable1630070450563'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_73aac6035a70c5f0313c939f237"`);
        await queryRunner.query(`CREATE TABLE "user_pinnedPages" ("pageId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_23449e5c63a6594528a3edce68b" PRIMARY KEY ("pageId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_30fcce251ce4ed05796fa66735" ON "user_pinnedPages" ("pageId") `);
        await queryRunner.query(`CREATE INDEX "IDX_518dfc2dc262e6cd83ac22044e" ON "user_pinnedPages" ("userId") `);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_73aac6035a70c5f0313c939f237" FOREIGN KEY ("parentCommentId") REFERENCES "comment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_pinnedPages" ADD CONSTRAINT "FK_30fcce251ce4ed05796fa667359" FOREIGN KEY ("pageId") REFERENCES "page"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_pinnedPages" ADD CONSTRAINT "FK_518dfc2dc262e6cd83ac22044e1" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_pinnedPages" DROP CONSTRAINT "FK_518dfc2dc262e6cd83ac22044e1"`);
        await queryRunner.query(`ALTER TABLE "user_pinnedPages" DROP CONSTRAINT "FK_30fcce251ce4ed05796fa667359"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_73aac6035a70c5f0313c939f237"`);
        await queryRunner.query(`DROP INDEX "IDX_518dfc2dc262e6cd83ac22044e"`);
        await queryRunner.query(`DROP INDEX "IDX_30fcce251ce4ed05796fa66735"`);
        await queryRunner.query(`DROP TABLE "user_pinnedPages"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_73aac6035a70c5f0313c939f237" FOREIGN KEY ("parentCommentId") REFERENCES "comment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

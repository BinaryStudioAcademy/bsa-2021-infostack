import {MigrationInterface, QueryRunner} from "typeorm";

export class createPageEditorTable1630739812213 implements MigrationInterface {
    name = 'createPageEditorTable1630739812213'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "page_editor" ("pageId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_71d89287768811987c141aa9b1b" PRIMARY KEY ("pageId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_59d09fcb9dcf99d4fadfebe896" ON "page_editor" ("pageId") `);
        await queryRunner.query(`CREATE INDEX "IDX_7c3486905525d3daa7ed9d1f7f" ON "page_editor" ("userId") `);
        await queryRunner.query(`ALTER TABLE "page_editor" ADD CONSTRAINT "FK_59d09fcb9dcf99d4fadfebe8968" FOREIGN KEY ("pageId") REFERENCES "page"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "page_editor" ADD CONSTRAINT "FK_7c3486905525d3daa7ed9d1f7f2" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "page_editor" DROP CONSTRAINT "FK_7c3486905525d3daa7ed9d1f7f2"`);
        await queryRunner.query(`ALTER TABLE "page_editor" DROP CONSTRAINT "FK_59d09fcb9dcf99d4fadfebe8968"`);
        await queryRunner.query(`DROP INDEX "IDX_7c3486905525d3daa7ed9d1f7f"`);
        await queryRunner.query(`DROP INDEX "IDX_59d09fcb9dcf99d4fadfebe896"`);
        await queryRunner.query(`DROP TABLE "page_editor"`);
    }

}

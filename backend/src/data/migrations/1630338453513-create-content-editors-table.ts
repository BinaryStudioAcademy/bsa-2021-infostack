import {MigrationInterface, QueryRunner} from "typeorm";

export class createContentEditorsTable1630338453513 implements MigrationInterface {
    name = 'createContentEditorsTable1630338453513'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "content_editor" ("pageContentId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_9032b637381603ee19419929d07" PRIMARY KEY ("pageContentId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d9d4b33d1d6f95cb706bb1e38b" ON "content_editor" ("pageContentId") `);
        await queryRunner.query(`CREATE INDEX "IDX_89774d1464b57e585b895e01d7" ON "content_editor" ("userId") `);
        await queryRunner.query(`ALTER TABLE "content_editor" ADD CONSTRAINT "FK_d9d4b33d1d6f95cb706bb1e38b9" FOREIGN KEY ("pageContentId") REFERENCES "page_content"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "content_editor" ADD CONSTRAINT "FK_89774d1464b57e585b895e01d75" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "content_editor" DROP CONSTRAINT "FK_89774d1464b57e585b895e01d75"`);
        await queryRunner.query(`ALTER TABLE "content_editor" DROP CONSTRAINT "FK_d9d4b33d1d6f95cb706bb1e38b9"`);
        await queryRunner.query(`DROP INDEX "IDX_89774d1464b57e585b895e01d7"`);
        await queryRunner.query(`DROP INDEX "IDX_d9d4b33d1d6f95cb706bb1e38b"`);
        await queryRunner.query(`DROP TABLE "content_editor"`);
    }

}

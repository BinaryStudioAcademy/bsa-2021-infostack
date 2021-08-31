import {MigrationInterface, QueryRunner} from "typeorm";

export class createContentEditorsTable1630337467287 implements MigrationInterface {
    name = 'createContentEditorsTable1630337467287'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "editingContentId" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_d66226137bffcd1efbe0e83af25" FOREIGN KEY ("editingContentId") REFERENCES "page_content"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_d66226137bffcd1efbe0e83af25"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "editingContentId"`);
    }

}

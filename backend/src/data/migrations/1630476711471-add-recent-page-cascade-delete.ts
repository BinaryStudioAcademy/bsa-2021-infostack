import { MigrationInterface, QueryRunner } from 'typeorm';

export class addRecentPageCascadeDelete1630476711471 implements MigrationInterface {
    name = 'addRecentPageCascadeDelete1630476711471';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "recent_page" DROP CONSTRAINT "FK_a9f401a3220a973ea6fae2b4f23"');
        await queryRunner.query('ALTER TABLE "recent_page" ADD CONSTRAINT "FK_a9f401a3220a973ea6fae2b4f23" FOREIGN KEY ("pageId") REFERENCES "page"("id") ON DELETE CASCADE ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "recent_page" DROP CONSTRAINT "FK_a9f401a3220a973ea6fae2b4f23"');
        await queryRunner.query('ALTER TABLE "recent_page" ADD CONSTRAINT "FK_a9f401a3220a973ea6fae2b4f23" FOREIGN KEY ("pageId") REFERENCES "page"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

}

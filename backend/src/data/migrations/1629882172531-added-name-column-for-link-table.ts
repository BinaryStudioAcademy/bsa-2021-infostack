import { MigrationInterface, QueryRunner } from 'typeorm';

export class addedNameColumnForLinkTable1629882172531 implements MigrationInterface {
    name = 'addedNameColumnForLinkTable1629882172531';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "page_share_link" ADD "name" character varying');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "page_share_link" DROP COLUMN "name"');
    }

}

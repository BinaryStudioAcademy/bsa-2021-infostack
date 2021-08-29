import { MigrationInterface, QueryRunner } from 'typeorm';

export class addLogoToWorkspace1629976079703 implements MigrationInterface {
    name = 'addLogoToWorkspace1629976079703';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "workspace" ADD "logo" character varying');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "workspace" DROP COLUMN "logo"');
    }

}

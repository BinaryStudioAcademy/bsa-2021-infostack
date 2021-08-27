import { MigrationInterface, QueryRunner } from 'typeorm';

export class addTeamOwnerColumn1629922719215 implements MigrationInterface {
    name = 'addTeamOwnerColumn1629922719215';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "team" ADD "owner" character varying NOT NULL DEFAULT \'c5fa3b2f-c4de-4dda-84e7-714ee852627e\'');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "team" DROP COLUMN "owner"');
    }

}

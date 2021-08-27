import { MigrationInterface, QueryRunner } from 'typeorm';

export class removeDefaultTeamOwner1629923016275 implements MigrationInterface {
    name = 'removeDefaultTeamOwner1629923016275';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "team" ALTER COLUMN "owner" DROP DEFAULT');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "team" ALTER COLUMN "owner" SET DEFAULT \'c5fa3b2f-c4de-4dda-84e7-714ee852627e\'');
    }

}

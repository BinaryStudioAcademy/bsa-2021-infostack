import {MigrationInterface, QueryRunner} from "typeorm";

export class addRecentPages1630329237325 implements MigrationInterface {
    name = 'addRecentPages1630329237325'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "recent_page" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" character varying NOT NULL, "pageId" character varying NOT NULL, CONSTRAINT "PK_f5fa6eed5429e8d23d9e4c518f4" PRIMARY KEY ("userId", "pageId"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "recent_page"`);
    }

}

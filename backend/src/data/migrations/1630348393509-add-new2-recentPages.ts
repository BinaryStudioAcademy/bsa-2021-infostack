import {MigrationInterface, QueryRunner} from "typeorm";

export class addNew2RecentPages1630348393509 implements MigrationInterface {
    name = 'addNew2RecentPages1630348393509'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recent_page" DROP CONSTRAINT "PK_f5fa6eed5429e8d23d9e4c518f4"`);
        await queryRunner.query(`ALTER TABLE "recent_page" ADD CONSTRAINT "PK_a9f401a3220a973ea6fae2b4f23" PRIMARY KEY ("pageId")`);
        await queryRunner.query(`ALTER TABLE "recent_page" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "recent_page" ADD "userId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "recent_page" DROP CONSTRAINT "PK_a9f401a3220a973ea6fae2b4f23"`);
        await queryRunner.query(`ALTER TABLE "recent_page" ADD CONSTRAINT "PK_f5fa6eed5429e8d23d9e4c518f4" PRIMARY KEY ("pageId", "userId")`);
        await queryRunner.query(`ALTER TABLE "recent_page" DROP CONSTRAINT "PK_f5fa6eed5429e8d23d9e4c518f4"`);
        await queryRunner.query(`ALTER TABLE "recent_page" ADD CONSTRAINT "PK_bd00cd5c32a124267da4a70f5dc" PRIMARY KEY ("userId")`);
        await queryRunner.query(`ALTER TABLE "recent_page" DROP COLUMN "pageId"`);
        await queryRunner.query(`ALTER TABLE "recent_page" ADD "pageId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "recent_page" DROP CONSTRAINT "PK_bd00cd5c32a124267da4a70f5dc"`);
        await queryRunner.query(`ALTER TABLE "recent_page" ADD CONSTRAINT "PK_f5fa6eed5429e8d23d9e4c518f4" PRIMARY KEY ("userId", "pageId")`);
        await queryRunner.query(`ALTER TABLE "recent_page" ADD CONSTRAINT "FK_bd00cd5c32a124267da4a70f5dc" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recent_page" ADD CONSTRAINT "FK_a9f401a3220a973ea6fae2b4f23" FOREIGN KEY ("pageId") REFERENCES "page"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recent_page" DROP CONSTRAINT "FK_a9f401a3220a973ea6fae2b4f23"`);
        await queryRunner.query(`ALTER TABLE "recent_page" DROP CONSTRAINT "FK_bd00cd5c32a124267da4a70f5dc"`);
        await queryRunner.query(`ALTER TABLE "recent_page" DROP CONSTRAINT "PK_f5fa6eed5429e8d23d9e4c518f4"`);
        await queryRunner.query(`ALTER TABLE "recent_page" ADD CONSTRAINT "PK_bd00cd5c32a124267da4a70f5dc" PRIMARY KEY ("userId")`);
        await queryRunner.query(`ALTER TABLE "recent_page" DROP COLUMN "pageId"`);
        await queryRunner.query(`ALTER TABLE "recent_page" ADD "pageId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "recent_page" DROP CONSTRAINT "PK_bd00cd5c32a124267da4a70f5dc"`);
        await queryRunner.query(`ALTER TABLE "recent_page" ADD CONSTRAINT "PK_f5fa6eed5429e8d23d9e4c518f4" PRIMARY KEY ("pageId", "userId")`);
        await queryRunner.query(`ALTER TABLE "recent_page" DROP CONSTRAINT "PK_f5fa6eed5429e8d23d9e4c518f4"`);
        await queryRunner.query(`ALTER TABLE "recent_page" ADD CONSTRAINT "PK_a9f401a3220a973ea6fae2b4f23" PRIMARY KEY ("pageId")`);
        await queryRunner.query(`ALTER TABLE "recent_page" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "recent_page" ADD "userId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "recent_page" DROP CONSTRAINT "PK_a9f401a3220a973ea6fae2b4f23"`);
        await queryRunner.query(`ALTER TABLE "recent_page" ADD CONSTRAINT "PK_f5fa6eed5429e8d23d9e4c518f4" PRIMARY KEY ("userId", "pageId")`);
    }

}

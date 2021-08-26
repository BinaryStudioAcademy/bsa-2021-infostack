import { MigrationInterface, QueryRunner } from 'typeorm';

export class addShareLinkTable1629718845109 implements MigrationInterface {
    name = 'addShareLinkTable1629718845109';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE "page_share_link" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "pageId" uuid NOT NULL, "userId" uuid NOT NULL, "expireAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_a7452f68090aead79a6bfd362b5" PRIMARY KEY ("id"))');
        await queryRunner.query('ALTER TABLE "page_share_link" ADD CONSTRAINT "FK_21c939a6b603df3d881831dff30" FOREIGN KEY ("pageId") REFERENCES "page"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "page_share_link" ADD CONSTRAINT "FK_cae191bb472ae1c9799f345f58a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "page_share_link" DROP CONSTRAINT "FK_cae191bb472ae1c9799f345f58a"');
        await queryRunner.query('ALTER TABLE "page_share_link" DROP CONSTRAINT "FK_21c939a6b603df3d881831dff30"');
        await queryRunner.query('DROP TABLE "page_share_link"');
    }

}

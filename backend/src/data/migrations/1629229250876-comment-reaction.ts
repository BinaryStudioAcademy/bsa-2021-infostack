import { MigrationInterface, QueryRunner } from 'typeorm';

export class commentReaction1629229250876 implements MigrationInterface {
  name = 'commentReaction1629229250876';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "reaction" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "reaction" character varying(50) NOT NULL, "userId" uuid NOT NULL, "commentId" uuid NOT NULL, CONSTRAINT "PK_41fbb346da22da4df129f14b11e" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'ALTER TABLE "reaction" ADD CONSTRAINT "FK_e58a09ab17e3ce4c47a1a330ae1" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "reaction" ADD CONSTRAINT "FK_4584f851fc6471f517d9dad8966" FOREIGN KEY ("commentId") REFERENCES "comment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "reaction" DROP CONSTRAINT "FK_4584f851fc6471f517d9dad8966"',
    );
    await queryRunner.query(
      'ALTER TABLE "reaction" DROP CONSTRAINT "FK_e58a09ab17e3ce4c47a1a330ae1"',
    );
    await queryRunner.query('DROP TABLE "reaction"');
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class userSkill1628279270779 implements MigrationInterface {
  name = 'userSkill1628279270779';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "skill" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying(50) NOT NULL, CONSTRAINT "PK_a0d33334424e64fb78dc3ce7196" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "user_skills" ("skillId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_060bea7fd45868588324719de3c" PRIMARY KEY ("skillId", "userId"))',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_b19f190afaada3852e0f56566b" ON "user_skills" ("skillId") ',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_60177dd93dcdc055e4eaa93bad" ON "user_skills" ("userId") ',
    );
    await queryRunner.query(
      'ALTER TABLE "user_skills" ADD CONSTRAINT "FK_b19f190afaada3852e0f56566bc" FOREIGN KEY ("skillId") REFERENCES "skill"("id") ON DELETE CASCADE ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE "user_skills" ADD CONSTRAINT "FK_60177dd93dcdc055e4eaa93bade" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "user_skills" DROP CONSTRAINT "FK_60177dd93dcdc055e4eaa93bade"',
    );
    await queryRunner.query(
      'ALTER TABLE "user_skills" DROP CONSTRAINT "FK_b19f190afaada3852e0f56566bc"',
    );
    await queryRunner.query('DROP INDEX "IDX_60177dd93dcdc055e4eaa93bad"');
    await queryRunner.query('DROP INDEX "IDX_b19f190afaada3852e0f56566b"');
    await queryRunner.query('DROP TABLE "user_skills"');
    await queryRunner.query('DROP TABLE "skill"');
  }
}

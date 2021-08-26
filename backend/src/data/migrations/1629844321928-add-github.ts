import { MigrationInterface, QueryRunner } from 'typeorm';

export class addGithub1629844321928 implements MigrationInterface {
  name = 'addGithub1629844321928';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "comment" DROP CONSTRAINT "FK_73aac6035a70c5f0313c939f237"',
    );
    await queryRunner.query(
      'CREATE TABLE "github" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "workspaceId" uuid NOT NULL, "username" character varying NOT NULL, "repo" character varying NOT NULL, "token" character varying NOT NULL, CONSTRAINT "PK_d56780d391da316e085474c73c3" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TYPE "tag_type_enum" AS ENUM(\'github\', \'app\')',
    );
    await queryRunner.query(
      'ALTER TABLE "tag" ADD "type" "tag_type_enum" NOT NULL DEFAULT \'app\'',
    );
    await queryRunner.query(
      'ALTER TABLE "comment" ADD CONSTRAINT "FK_73aac6035a70c5f0313c939f237" FOREIGN KEY ("parentCommentId") REFERENCES "comment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "github" ADD CONSTRAINT "FK_41b1c578dedc3cdd83b55d03a6e" FOREIGN KEY ("workspaceId") REFERENCES "workspace"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "github" DROP CONSTRAINT "FK_41b1c578dedc3cdd83b55d03a6e"',
    );
    await queryRunner.query(
      'ALTER TABLE "comment" DROP CONSTRAINT "FK_73aac6035a70c5f0313c939f237"',
    );
    await queryRunner.query('ALTER TABLE "tag" DROP COLUMN "type"');
    await queryRunner.query('DROP TYPE "tag_type_enum"');
    await queryRunner.query('DROP TABLE "github"');
    await queryRunner.query(
      'ALTER TABLE "comment" ADD CONSTRAINT "FK_73aac6035a70c5f0313c939f237" FOREIGN KEY ("parentCommentId") REFERENCES "comment"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
  }
}

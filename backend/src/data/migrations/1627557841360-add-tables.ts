import { MigrationInterface, QueryRunner } from 'typeorm';

export class addTables1627557841360 implements MigrationInterface {
  name = 'addTables1627557841360';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "refresh_token" ("token" character varying NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_c31d0a2f38e6e99110df62ab0af" PRIMARY KEY ("token"))',
    );
    await queryRunner.query(
      'CREATE TYPE "team_permission_option_enum" AS ENUM(\'read\', \'write\', \'admin\')',
    );
    await queryRunner.query(
      'CREATE TABLE "team_permission" ("option" "team_permission_option_enum" NOT NULL DEFAULT \'read\', "teamId" uuid NOT NULL, "pageId" uuid NOT NULL, CONSTRAINT "PK_2228dc613c3b121533089d3fc47" PRIMARY KEY ("teamId", "pageId"))',
    );
    await queryRunner.query(
      'CREATE TABLE "team" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "workspaceId" uuid NOT NULL, "name" character varying(50) NOT NULL, CONSTRAINT "PK_f57d8293406df4af348402e4b74" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "tag" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "workspaceId" uuid NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "workspace" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying(50) NOT NULL, CONSTRAINT "PK_ca86b6f9b3be5fe26d307d09b49" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TYPE "user_workspace_role_enum" AS ENUM(\'admin\', \'user\')',
    );
    await queryRunner.query(
      'CREATE TABLE "user_workspace" ("role" "user_workspace_role_enum" NOT NULL DEFAULT \'user\', "userId" uuid NOT NULL, "workspaceId" uuid NOT NULL, CONSTRAINT "PK_c395920dbb9ba8840eaa0278bf8" PRIMARY KEY ("userId", "workspaceId"))',
    );
    await queryRunner.query(
      'CREATE TYPE "user_permission_option_enum" AS ENUM(\'read\', \'write\', \'admin\')',
    );
    await queryRunner.query(
      'CREATE TABLE "user_permission" ("option" "user_permission_option_enum" NOT NULL DEFAULT \'read\', "userId" uuid NOT NULL, "pageId" uuid NOT NULL, CONSTRAINT "PK_c0f3fe7d55775ca79ee3be65910" PRIMARY KEY ("userId", "pageId"))',
    );
    await queryRunner.query(
      'CREATE TABLE "page_content" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "pageId" uuid NOT NULL, "title" character varying(50) NOT NULL, "content" character varying NOT NULL, "authorId" uuid NOT NULL, CONSTRAINT "PK_c2b7b56ba057b319ed037ed878b" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "fullName" character varying(200) NOT NULL, "email" character varying(50) NOT NULL, "password" character varying(100), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "page" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "authorId" uuid NOT NULL, "workspaceId" uuid NOT NULL, "parentPageId" uuid NOT NULL, CONSTRAINT "PK_742f4117e065c5b6ad21b37ba1f" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "comment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "text" character varying NOT NULL, "authorId" uuid NOT NULL, "pageId" uuid NOT NULL, "parentCommentId" uuid NOT NULL, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "team_member" ("teamId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_bd2b3ef7569d75642e091853771" PRIMARY KEY ("teamId", "userId"))',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_74da8f612921485e1005dc8e22" ON "team_member" ("teamId") ',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_d2be3e8fc9ab0f69673721c7fc" ON "team_member" ("userId") ',
    );
    await queryRunner.query(
      'CREATE TABLE "page_tag" ("pageId" uuid NOT NULL, "tagId" uuid NOT NULL, CONSTRAINT "PK_304d2445cb4945352663af8b46e" PRIMARY KEY ("pageId", "tagId"))',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_b85cf1a46834974757cd5a8ffb" ON "page_tag" ("pageId") ',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_80fea419139bdd499b5af9c233" ON "page_tag" ("tagId") ',
    );
    await queryRunner.query(
      'ALTER TABLE "refresh_token" ADD CONSTRAINT "FK_8e913e288156c133999341156ad" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "team_permission" ADD CONSTRAINT "FK_af80c749a9119f49934218cdb97" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "team_permission" ADD CONSTRAINT "FK_d825ec8e4859c0d7f50251752e3" FOREIGN KEY ("pageId") REFERENCES "page"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "team" ADD CONSTRAINT "FK_66f4adf2b7982a24c835d60e399" FOREIGN KEY ("workspaceId") REFERENCES "workspace"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "tag" ADD CONSTRAINT "FK_8516872e5b1ff7d97b6245f6ef6" FOREIGN KEY ("workspaceId") REFERENCES "workspace"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "user_workspace" ADD CONSTRAINT "FK_4ea12fabb12c08c3dc8839d0932" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "user_workspace" ADD CONSTRAINT "FK_46438fa9a476521c49324b59843" FOREIGN KEY ("workspaceId") REFERENCES "workspace"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "user_permission" ADD CONSTRAINT "FK_deb59c09715314aed1866e18a81" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "user_permission" ADD CONSTRAINT "FK_e982197299cd20c387005700848" FOREIGN KEY ("pageId") REFERENCES "page"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "page_content" ADD CONSTRAINT "FK_4e28fda8b4d802c7e7a3e8c03e2" FOREIGN KEY ("pageId") REFERENCES "page"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "page_content" ADD CONSTRAINT "FK_4330e0c2aa9589f3830bfc73336" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "page" ADD CONSTRAINT "FK_8810ba4cc4eac84c9c750eaf9e1" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "page" ADD CONSTRAINT "FK_3e419598ba888095f081633c512" FOREIGN KEY ("workspaceId") REFERENCES "workspace"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "page" ADD CONSTRAINT "FK_b85a31f0bff1e857156d27ea152" FOREIGN KEY ("parentPageId") REFERENCES "page"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "comment" ADD CONSTRAINT "FK_276779da446413a0d79598d4fbd" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "comment" ADD CONSTRAINT "FK_6e81e056d491bd203f29f09a3a0" FOREIGN KEY ("pageId") REFERENCES "page"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "comment" ADD CONSTRAINT "FK_73aac6035a70c5f0313c939f237" FOREIGN KEY ("parentCommentId") REFERENCES "comment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "team_member" ADD CONSTRAINT "FK_74da8f612921485e1005dc8e225" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE CASCADE ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE "team_member" ADD CONSTRAINT "FK_d2be3e8fc9ab0f69673721c7fc3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "page_tag" ADD CONSTRAINT "FK_b85cf1a46834974757cd5a8ffbb" FOREIGN KEY ("pageId") REFERENCES "page"("id") ON DELETE CASCADE ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE "page_tag" ADD CONSTRAINT "FK_80fea419139bdd499b5af9c2335" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "page_tag" DROP CONSTRAINT "FK_80fea419139bdd499b5af9c2335"',
    );
    await queryRunner.query(
      'ALTER TABLE "page_tag" DROP CONSTRAINT "FK_b85cf1a46834974757cd5a8ffbb"',
    );
    await queryRunner.query(
      'ALTER TABLE "team_member" DROP CONSTRAINT "FK_d2be3e8fc9ab0f69673721c7fc3"',
    );
    await queryRunner.query(
      'ALTER TABLE "team_member" DROP CONSTRAINT "FK_74da8f612921485e1005dc8e225"',
    );
    await queryRunner.query(
      'ALTER TABLE "comment" DROP CONSTRAINT "FK_73aac6035a70c5f0313c939f237"',
    );
    await queryRunner.query(
      'ALTER TABLE "comment" DROP CONSTRAINT "FK_6e81e056d491bd203f29f09a3a0"',
    );
    await queryRunner.query(
      'ALTER TABLE "comment" DROP CONSTRAINT "FK_276779da446413a0d79598d4fbd"',
    );
    await queryRunner.query(
      'ALTER TABLE "page" DROP CONSTRAINT "FK_b85a31f0bff1e857156d27ea152"',
    );
    await queryRunner.query(
      'ALTER TABLE "page" DROP CONSTRAINT "FK_3e419598ba888095f081633c512"',
    );
    await queryRunner.query(
      'ALTER TABLE "page" DROP CONSTRAINT "FK_8810ba4cc4eac84c9c750eaf9e1"',
    );
    await queryRunner.query(
      'ALTER TABLE "page_content" DROP CONSTRAINT "FK_4330e0c2aa9589f3830bfc73336"',
    );
    await queryRunner.query(
      'ALTER TABLE "page_content" DROP CONSTRAINT "FK_4e28fda8b4d802c7e7a3e8c03e2"',
    );
    await queryRunner.query(
      'ALTER TABLE "user_permission" DROP CONSTRAINT "FK_e982197299cd20c387005700848"',
    );
    await queryRunner.query(
      'ALTER TABLE "user_permission" DROP CONSTRAINT "FK_deb59c09715314aed1866e18a81"',
    );
    await queryRunner.query(
      'ALTER TABLE "user_workspace" DROP CONSTRAINT "FK_46438fa9a476521c49324b59843"',
    );
    await queryRunner.query(
      'ALTER TABLE "user_workspace" DROP CONSTRAINT "FK_4ea12fabb12c08c3dc8839d0932"',
    );
    await queryRunner.query(
      'ALTER TABLE "tag" DROP CONSTRAINT "FK_8516872e5b1ff7d97b6245f6ef6"',
    );
    await queryRunner.query(
      'ALTER TABLE "team" DROP CONSTRAINT "FK_66f4adf2b7982a24c835d60e399"',
    );
    await queryRunner.query(
      'ALTER TABLE "team_permission" DROP CONSTRAINT "FK_d825ec8e4859c0d7f50251752e3"',
    );
    await queryRunner.query(
      'ALTER TABLE "team_permission" DROP CONSTRAINT "FK_af80c749a9119f49934218cdb97"',
    );
    await queryRunner.query(
      'ALTER TABLE "refresh_token" DROP CONSTRAINT "FK_8e913e288156c133999341156ad"',
    );
    await queryRunner.query('DROP INDEX "IDX_80fea419139bdd499b5af9c233"');
    await queryRunner.query('DROP INDEX "IDX_b85cf1a46834974757cd5a8ffb"');
    await queryRunner.query('DROP TABLE "page_tag"');
    await queryRunner.query('DROP INDEX "IDX_d2be3e8fc9ab0f69673721c7fc"');
    await queryRunner.query('DROP INDEX "IDX_74da8f612921485e1005dc8e22"');
    await queryRunner.query('DROP TABLE "team_member"');
    await queryRunner.query('DROP TABLE "comment"');
    await queryRunner.query('DROP TABLE "page"');
    await queryRunner.query('DROP TABLE "user"');
    await queryRunner.query('DROP TABLE "page_content"');
    await queryRunner.query('DROP TABLE "user_permission"');
    await queryRunner.query('DROP TYPE "user_permission_option_enum"');
    await queryRunner.query('DROP TABLE "user_workspace"');
    await queryRunner.query('DROP TYPE "user_workspace_role_enum"');
    await queryRunner.query('DROP TABLE "workspace"');
    await queryRunner.query('DROP TABLE "tag"');
    await queryRunner.query('DROP TABLE "team"');
    await queryRunner.query('DROP TABLE "team_permission"');
    await queryRunner.query('DROP TYPE "team_permission_option_enum"');
    await queryRunner.query('DROP TABLE "refresh_token"');
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateNotifications1630273802357 implements MigrationInterface {
    name = 'updateNotifications1630273802357';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "notification" ADD "workspaceId" uuid NOT NULL');
        await queryRunner.query('ALTER TABLE "notification" ADD CONSTRAINT "FK_972838d477a2be7879a8cfda49a" FOREIGN KEY ("workspaceId") REFERENCES "workspace"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "notification" DROP CONSTRAINT "FK_972838d477a2be7879a8cfda49a"');
        await queryRunner.query('ALTER TABLE "notification" DROP COLUMN "workspaceId"');
    }

}

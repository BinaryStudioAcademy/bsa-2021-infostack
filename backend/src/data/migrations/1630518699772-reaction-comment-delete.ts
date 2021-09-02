import { MigrationInterface, QueryRunner } from 'typeorm';

export class reactionCommentDelete1630518699772 implements MigrationInterface {
    name = 'reactionCommentDelete1630518699772';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "reaction" DROP CONSTRAINT "FK_4584f851fc6471f517d9dad8966"');
        await queryRunner.query('ALTER TABLE "reaction" ADD CONSTRAINT "FK_4584f851fc6471f517d9dad8966" FOREIGN KEY ("commentId") REFERENCES "comment"("id") ON DELETE CASCADE ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "reaction" DROP CONSTRAINT "FK_4584f851fc6471f517d9dad8966"');
        await queryRunner.query('ALTER TABLE "reaction" ADD CONSTRAINT "FK_4584f851fc6471f517d9dad8966" FOREIGN KEY ("commentId") REFERENCES "comment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

}

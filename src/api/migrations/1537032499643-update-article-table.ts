import {MigrationInterface, QueryRunner} from "typeorm";

export class updateArticleTable1537032499643 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "article" ADD "threadId" integer`);
        await queryRunner.query(`ALTER TABLE "article" ADD CONSTRAINT "UQ_8a25bb91a25f0c7d8bad5662a3d" UNIQUE ("threadId")`);
        await queryRunner.query(`ALTER TABLE "article" ADD CONSTRAINT "FK_8a25bb91a25f0c7d8bad5662a3d" FOREIGN KEY ("threadId") REFERENCES "forum_thread"("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "article" DROP CONSTRAINT "FK_8a25bb91a25f0c7d8bad5662a3d"`);
        await queryRunner.query(`ALTER TABLE "article" DROP CONSTRAINT "UQ_8a25bb91a25f0c7d8bad5662a3d"`);
        await queryRunner.query(`ALTER TABLE "article" DROP COLUMN "threadId"`);
    }

}

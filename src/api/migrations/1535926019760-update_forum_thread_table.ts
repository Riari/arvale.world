import {MigrationInterface, QueryRunner} from "typeorm";

export class updateForumThreadTable1535926019760 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "forum_thread" ADD "postCount" integer NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE "forum_thread" ADD "latestPostId" integer`);
        await queryRunner.query(`ALTER TABLE "forum_thread" ADD CONSTRAINT "UQ_eb9d876af2958f85f3ceb9fe9c9" UNIQUE ("latestPostId")`);
        await queryRunner.query(`ALTER TABLE "forum_thread" ADD CONSTRAINT "FK_eb9d876af2958f85f3ceb9fe9c9" FOREIGN KEY ("latestPostId") REFERENCES "forum_post"("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "forum_thread" DROP CONSTRAINT "FK_eb9d876af2958f85f3ceb9fe9c9"`);
        await queryRunner.query(`ALTER TABLE "forum_thread" DROP CONSTRAINT "UQ_eb9d876af2958f85f3ceb9fe9c9"`);
        await queryRunner.query(`ALTER TABLE "forum_thread" DROP COLUMN "latestPostId"`);
        await queryRunner.query(`ALTER TABLE "forum_thread" DROP COLUMN "postCount"`);
    }

}

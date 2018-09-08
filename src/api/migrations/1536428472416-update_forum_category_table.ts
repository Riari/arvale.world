import {MigrationInterface, QueryRunner} from "typeorm";

export class updateForumCategoryTable1536428472416 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "forum_post" ADD "categoryId" integer`);
        await queryRunner.query(`ALTER TABLE "forum_category" ADD "threadCount" integer NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "forum_category" ADD "postCount" integer NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "forum_thread" ADD "postCount" integer NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE "forum_thread" ADD "latestPostId" integer`);
        await queryRunner.query(`ALTER TABLE "forum_thread" ADD CONSTRAINT "UQ_eb9d876af2958f85f3ceb9fe9c9" UNIQUE ("latestPostId")`);
        await queryRunner.query(`ALTER TABLE "forum_thread" ALTER COLUMN "lockedAt" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "forum_thread" ALTER COLUMN "stickiedAt" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "forum_post" ADD CONSTRAINT "FK_8bd965dd438fde106f7b14314a1" FOREIGN KEY ("categoryId") REFERENCES "forum_category"("id")`);
        await queryRunner.query(`ALTER TABLE "forum_thread" ADD CONSTRAINT "FK_eb9d876af2958f85f3ceb9fe9c9" FOREIGN KEY ("latestPostId") REFERENCES "forum_post"("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "forum_thread" DROP CONSTRAINT "FK_eb9d876af2958f85f3ceb9fe9c9"`);
        await queryRunner.query(`ALTER TABLE "forum_post" DROP CONSTRAINT "FK_8bd965dd438fde106f7b14314a1"`);
        await queryRunner.query(`ALTER TABLE "forum_thread" ALTER COLUMN "stickiedAt" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "forum_thread" ALTER COLUMN "lockedAt" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "forum_thread" DROP CONSTRAINT "UQ_eb9d876af2958f85f3ceb9fe9c9"`);
        await queryRunner.query(`ALTER TABLE "forum_thread" DROP COLUMN "latestPostId"`);
        await queryRunner.query(`ALTER TABLE "forum_thread" DROP COLUMN "postCount"`);
        await queryRunner.query(`ALTER TABLE "forum_category" DROP COLUMN "postCount"`);
        await queryRunner.query(`ALTER TABLE "forum_category" DROP COLUMN "threadCount"`);
        await queryRunner.query(`ALTER TABLE "forum_post" DROP COLUMN "categoryId"`);
    }

}

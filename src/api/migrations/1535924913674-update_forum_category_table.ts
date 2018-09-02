import {MigrationInterface, QueryRunner} from "typeorm";

export class updateForumCategoryTable1535924913674 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "forum_category" ADD "threadCount" integer NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "forum_category" ADD "postCount" integer NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "forum_category" ADD "latestThreadId" integer`);
        await queryRunner.query(`ALTER TABLE "forum_category" ADD CONSTRAINT "UQ_c20ebc3b3623b3e2fffa6e58c24" UNIQUE ("latestThreadId")`);
        await queryRunner.query(`ALTER TABLE "forum_category" ADD "latestPostId" integer`);
        await queryRunner.query(`ALTER TABLE "forum_category" ADD CONSTRAINT "UQ_dcdd96c1dbf15dfd9d782bc0d37" UNIQUE ("latestPostId")`);
        await queryRunner.query(`ALTER TABLE "forum_thread" ALTER COLUMN "lockedAt" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "forum_thread" ALTER COLUMN "stickiedAt" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "forum_category" ADD CONSTRAINT "FK_c20ebc3b3623b3e2fffa6e58c24" FOREIGN KEY ("latestThreadId") REFERENCES "forum_thread"("id")`);
        await queryRunner.query(`ALTER TABLE "forum_category" ADD CONSTRAINT "FK_dcdd96c1dbf15dfd9d782bc0d37" FOREIGN KEY ("latestPostId") REFERENCES "forum_post"("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "forum_category" DROP CONSTRAINT "FK_dcdd96c1dbf15dfd9d782bc0d37"`);
        await queryRunner.query(`ALTER TABLE "forum_category" DROP CONSTRAINT "FK_c20ebc3b3623b3e2fffa6e58c24"`);
        await queryRunner.query(`ALTER TABLE "forum_thread" ALTER COLUMN "stickiedAt" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "forum_thread" ALTER COLUMN "lockedAt" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "forum_category" DROP CONSTRAINT "UQ_dcdd96c1dbf15dfd9d782bc0d37"`);
        await queryRunner.query(`ALTER TABLE "forum_category" DROP COLUMN "latestPostId"`);
        await queryRunner.query(`ALTER TABLE "forum_category" DROP CONSTRAINT "UQ_c20ebc3b3623b3e2fffa6e58c24"`);
        await queryRunner.query(`ALTER TABLE "forum_category" DROP COLUMN "latestThreadId"`);
        await queryRunner.query(`ALTER TABLE "forum_category" DROP COLUMN "postCount"`);
        await queryRunner.query(`ALTER TABLE "forum_category" DROP COLUMN "threadCount"`);
    }

}

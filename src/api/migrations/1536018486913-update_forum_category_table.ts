import {MigrationInterface, QueryRunner} from "typeorm";

export class updateForumCategoryTable1536018486913 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "forum_category" ADD "latestThreadId" integer`);
        await queryRunner.query(`ALTER TABLE "forum_category" ADD "latestThreadTitle" character varying`);
        await queryRunner.query(`ALTER TABLE "forum_category" ADD "latestThreadAuthor" character varying`);
        await queryRunner.query(`ALTER TABLE "forum_category" ADD "latestPostId" integer`);
        await queryRunner.query(`ALTER TABLE "forum_category" ADD "latestPostAuthor" character varying`);
        await queryRunner.query(`ALTER TABLE "forum_category" ADD "latestPostThreadId" integer`);
        await queryRunner.query(`ALTER TABLE "forum_category" ADD "latestPostThreadTitle" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "forum_category" DROP COLUMN "latestPostThreadTitle"`);
        await queryRunner.query(`ALTER TABLE "forum_category" DROP COLUMN "latestPostThreadId"`);
        await queryRunner.query(`ALTER TABLE "forum_category" DROP COLUMN "latestPostAuthor"`);
        await queryRunner.query(`ALTER TABLE "forum_category" DROP COLUMN "latestPostId"`);
        await queryRunner.query(`ALTER TABLE "forum_category" DROP COLUMN "latestThreadAuthor"`);
        await queryRunner.query(`ALTER TABLE "forum_category" DROP COLUMN "latestThreadTitle"`);
        await queryRunner.query(`ALTER TABLE "forum_category" DROP COLUMN "latestThreadId"`);
    }

}

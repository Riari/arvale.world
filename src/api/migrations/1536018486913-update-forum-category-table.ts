import {MigrationInterface, QueryRunner} from "typeorm";

export class updateForumCategoryTable1536018486913 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "forum_category" ADD "latestPostAuthor" character varying`);
        await queryRunner.query(`ALTER TABLE "forum_category" ADD "latestPostThreadId" integer`);
        await queryRunner.query(`ALTER TABLE "forum_category" ADD "latestPostThreadTitle" character varying`);
        await queryRunner.query(`ALTER TABLE "forum_category" ADD "latestPostThreadSize" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "forum_category" DROP COLUMN "latestThreadAuthor"`);
        await queryRunner.query(`ALTER TABLE "forum_category" DROP COLUMN "latestThreadTitle"`);
        await queryRunner.query(`ALTER TABLE "forum_category" DROP COLUMN "latestThreadId"`);
        await queryRunner.query(`ALTER TABLE "forum_category" DROP COLUMN "latestPostThreadSize"`);
    }

}

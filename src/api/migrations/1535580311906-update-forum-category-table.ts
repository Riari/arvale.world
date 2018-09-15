import {MigrationInterface, QueryRunner} from "typeorm";

export class updateForumCategoryTable1535580311906 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "forum_category" DROP COLUMN "modelId"`);
        await queryRunner.query(`ALTER TABLE "forum_category" ADD "acceptsThreads" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "forum_category" DROP COLUMN "acceptsThreads"`);
        await queryRunner.query(`ALTER TABLE "forum_category" ADD "modelId" integer NOT NULL`);
    }

}

import {MigrationInterface, QueryRunner} from "typeorm";

export class updateForumCategoryTable1536795667651 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "forum_category" ADD "weight" integer NOT NULL DEFAULT 1`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "forum_category" DROP COLUMN "weight"`);
    }

}

import {MigrationInterface, QueryRunner} from "typeorm";

export class updateForumPostTable1535929165942 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "forum_post" ADD "categoryId" integer`);
        await queryRunner.query(`ALTER TABLE "forum_post" ADD CONSTRAINT "FK_8bd965dd438fde106f7b14314a1" FOREIGN KEY ("categoryId") REFERENCES "forum_category"("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "forum_post" DROP CONSTRAINT "FK_8bd965dd438fde106f7b14314a1"`);
        await queryRunner.query(`ALTER TABLE "forum_post" DROP COLUMN "categoryId"`);
    }

}

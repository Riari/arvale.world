import {MigrationInterface, QueryRunner} from "typeorm";

export class updateArticleTable1534889820834 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "article" ADD "published" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "article" DROP COLUMN "published"`);
    }

}

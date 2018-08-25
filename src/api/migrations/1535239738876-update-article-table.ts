import {MigrationInterface, QueryRunner} from "typeorm";

export class updateArticleTable1535239738876 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "article" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "article" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "article" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "article" DROP COLUMN "createdAt"`);
    }

}

import {MigrationInterface, QueryRunner} from "typeorm";

export class updateUserTable1534784478777 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "verified" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "verified" DROP DEFAULT`);
    }

}

import {MigrationInterface, QueryRunner} from "typeorm";

export class createForumTables1535579356448 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "forum_category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "modelId" integer NOT NULL, "mpath" character varying DEFAULT '', "parentId" integer, CONSTRAINT "PK_c2da35d6b1460edf3e241bb16f7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "forum_post" ("id" SERIAL NOT NULL, "body" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "threadId" integer, "authorId" integer, CONSTRAINT "PK_35363fad61a4ba1fb0ba562b444" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "forum_thread" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "lockedAt" TIMESTAMP DEFAULT NULL, "pinnedAt" TIMESTAMP DEFAULT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "categoryId" integer, "authorId" integer, CONSTRAINT "PK_a531f692372aac738265f6dff13" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "forum_category" ADD CONSTRAINT "FK_eb61ba6a078895db99331fa6739" FOREIGN KEY ("parentId") REFERENCES "forum_category"("id")`);
        await queryRunner.query(`ALTER TABLE "forum_post" ADD CONSTRAINT "FK_843ac34e55e7c541f89ef1e9852" FOREIGN KEY ("threadId") REFERENCES "forum_thread"("id")`);
        await queryRunner.query(`ALTER TABLE "forum_post" ADD CONSTRAINT "FK_25a59022a9c95eb1016ad24e775" FOREIGN KEY ("authorId") REFERENCES "user"("id")`);
        await queryRunner.query(`ALTER TABLE "forum_thread" ADD CONSTRAINT "FK_bc5793f185ba1e2634152157d22" FOREIGN KEY ("categoryId") REFERENCES "forum_category"("id")`);
        await queryRunner.query(`ALTER TABLE "forum_thread" ADD CONSTRAINT "FK_e52dbe4056c19c1482fc051f014" FOREIGN KEY ("authorId") REFERENCES "user"("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "forum_thread" DROP CONSTRAINT "FK_e52dbe4056c19c1482fc051f014"`);
        await queryRunner.query(`ALTER TABLE "forum_thread" DROP CONSTRAINT "FK_bc5793f185ba1e2634152157d22"`);
        await queryRunner.query(`ALTER TABLE "forum_post" DROP CONSTRAINT "FK_25a59022a9c95eb1016ad24e775"`);
        await queryRunner.query(`ALTER TABLE "forum_post" DROP CONSTRAINT "FK_843ac34e55e7c541f89ef1e9852"`);
        await queryRunner.query(`ALTER TABLE "forum_category" DROP CONSTRAINT "FK_eb61ba6a078895db99331fa6739"`);
        await queryRunner.query(`DROP TABLE "forum_thread"`);
        await queryRunner.query(`DROP TABLE "forum_post"`);
        await queryRunner.query(`DROP TABLE "forum_category"`);
    }

}

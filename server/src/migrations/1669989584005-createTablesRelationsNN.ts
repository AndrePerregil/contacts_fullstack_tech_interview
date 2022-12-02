import { MigrationInterface, QueryRunner } from "typeorm";

export class createTablesRelationsNN1669989584005 implements MigrationInterface {
    name = 'createTablesRelationsNN1669989584005'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "emails_user_users" ("emailsId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_df4b112629c7fcb58e658fb95f3" PRIMARY KEY ("emailsId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_dd4129dce522eaa30b6f3f28fe" ON "emails_user_users" ("emailsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_4787cc29ea734e12c839dffe01" ON "emails_user_users" ("usersId") `);
        await queryRunner.query(`CREATE TABLE "emails_contacts_contacts" ("emailsId" uuid NOT NULL, "contactsId" uuid NOT NULL, CONSTRAINT "PK_659f91a14482735d4319d020f3c" PRIMARY KEY ("emailsId", "contactsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7351503d1ed34c57770a34bd05" ON "emails_contacts_contacts" ("emailsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0fafbfbd40a17853c39aac166c" ON "emails_contacts_contacts" ("contactsId") `);
        await queryRunner.query(`CREATE TABLE "phone_numbers_users_users" ("phoneNumbersId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_d565b54e8ab570a807194aa5ff0" PRIMARY KEY ("phoneNumbersId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_08295e8cc6d8dea5eac735709f" ON "phone_numbers_users_users" ("phoneNumbersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b849192f49ca66ccb4f0ac3e3a" ON "phone_numbers_users_users" ("usersId") `);
        await queryRunner.query(`CREATE TABLE "phone_numbers_contacts_contacts" ("phoneNumbersId" uuid NOT NULL, "contactsId" uuid NOT NULL, CONSTRAINT "PK_346e9ea5858cb49f97f4b225ec0" PRIMARY KEY ("phoneNumbersId", "contactsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_748d29283f47bdfc6db14ef562" ON "phone_numbers_contacts_contacts" ("phoneNumbersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_89fac99cc335df169ce822e8e8" ON "phone_numbers_contacts_contacts" ("contactsId") `);
        await queryRunner.query(`ALTER TABLE "emails_user_users" ADD CONSTRAINT "FK_dd4129dce522eaa30b6f3f28fe2" FOREIGN KEY ("emailsId") REFERENCES "emails"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "emails_user_users" ADD CONSTRAINT "FK_4787cc29ea734e12c839dffe018" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "emails_contacts_contacts" ADD CONSTRAINT "FK_7351503d1ed34c57770a34bd050" FOREIGN KEY ("emailsId") REFERENCES "emails"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "emails_contacts_contacts" ADD CONSTRAINT "FK_0fafbfbd40a17853c39aac166c5" FOREIGN KEY ("contactsId") REFERENCES "contacts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "phone_numbers_users_users" ADD CONSTRAINT "FK_08295e8cc6d8dea5eac735709f9" FOREIGN KEY ("phoneNumbersId") REFERENCES "phone_numbers"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "phone_numbers_users_users" ADD CONSTRAINT "FK_b849192f49ca66ccb4f0ac3e3a7" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "phone_numbers_contacts_contacts" ADD CONSTRAINT "FK_748d29283f47bdfc6db14ef5622" FOREIGN KEY ("phoneNumbersId") REFERENCES "phone_numbers"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "phone_numbers_contacts_contacts" ADD CONSTRAINT "FK_89fac99cc335df169ce822e8e8d" FOREIGN KEY ("contactsId") REFERENCES "contacts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "phone_numbers_contacts_contacts" DROP CONSTRAINT "FK_89fac99cc335df169ce822e8e8d"`);
        await queryRunner.query(`ALTER TABLE "phone_numbers_contacts_contacts" DROP CONSTRAINT "FK_748d29283f47bdfc6db14ef5622"`);
        await queryRunner.query(`ALTER TABLE "phone_numbers_users_users" DROP CONSTRAINT "FK_b849192f49ca66ccb4f0ac3e3a7"`);
        await queryRunner.query(`ALTER TABLE "phone_numbers_users_users" DROP CONSTRAINT "FK_08295e8cc6d8dea5eac735709f9"`);
        await queryRunner.query(`ALTER TABLE "emails_contacts_contacts" DROP CONSTRAINT "FK_0fafbfbd40a17853c39aac166c5"`);
        await queryRunner.query(`ALTER TABLE "emails_contacts_contacts" DROP CONSTRAINT "FK_7351503d1ed34c57770a34bd050"`);
        await queryRunner.query(`ALTER TABLE "emails_user_users" DROP CONSTRAINT "FK_4787cc29ea734e12c839dffe018"`);
        await queryRunner.query(`ALTER TABLE "emails_user_users" DROP CONSTRAINT "FK_dd4129dce522eaa30b6f3f28fe2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_89fac99cc335df169ce822e8e8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_748d29283f47bdfc6db14ef562"`);
        await queryRunner.query(`DROP TABLE "phone_numbers_contacts_contacts"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b849192f49ca66ccb4f0ac3e3a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_08295e8cc6d8dea5eac735709f"`);
        await queryRunner.query(`DROP TABLE "phone_numbers_users_users"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0fafbfbd40a17853c39aac166c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7351503d1ed34c57770a34bd05"`);
        await queryRunner.query(`DROP TABLE "emails_contacts_contacts"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4787cc29ea734e12c839dffe01"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dd4129dce522eaa30b6f3f28fe"`);
        await queryRunner.query(`DROP TABLE "emails_user_users"`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class makingNNRelations2sided1670087024124 implements MigrationInterface {
    name = 'makingNNRelations2sided1670087024124'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "emails" ("id" uuid NOT NULL, "content" character varying(50) NOT NULL, CONSTRAINT "UQ_4ab8424b9c88d3b2a3e3902ffd0" UNIQUE ("content"), CONSTRAINT "PK_a54dcebef8d05dca7e839749571" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "phone_numbers" ("id" uuid NOT NULL, "content" character varying(50) NOT NULL, CONSTRAINT "UQ_e8d2509cb4c25c43f369525fcad" UNIQUE ("content"), CONSTRAINT "PK_a72cf9a1834a1417e195fdd2c02" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL, "username" character varying(15) NOT NULL, "password" character varying(500) NOT NULL, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contacts" ("id" uuid NOT NULL, "name" character varying(20) NOT NULL, "userId" uuid, CONSTRAINT "PK_b99cd40cfd66a99f1571f4f72e6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_phones_phone_numbers" ("usersId" uuid NOT NULL, "phoneNumbersId" uuid NOT NULL, CONSTRAINT "PK_25c506dd2b67702f9acd57346d1" PRIMARY KEY ("usersId", "phoneNumbersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1d7491c96ae76f338be25c55b4" ON "users_phones_phone_numbers" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ea50ef4d2e11893c06afb2fb01" ON "users_phones_phone_numbers" ("phoneNumbersId") `);
        await queryRunner.query(`CREATE TABLE "users_emails_emails" ("usersId" uuid NOT NULL, "emailsId" uuid NOT NULL, CONSTRAINT "PK_9822f3b025a584a9280fbb8767e" PRIMARY KEY ("usersId", "emailsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6e0caf0f04eedaa732dd095806" ON "users_emails_emails" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_dc64743967014e2a8345015976" ON "users_emails_emails" ("emailsId") `);
        await queryRunner.query(`CREATE TABLE "contacts_phones_phone_numbers" ("contactsId" uuid NOT NULL, "phoneNumbersId" uuid NOT NULL, CONSTRAINT "PK_97f5c0050f411312e0009b69c4c" PRIMARY KEY ("contactsId", "phoneNumbersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b2f16a5068a7c1d643b75400d9" ON "contacts_phones_phone_numbers" ("contactsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_1dd0496942b08a019e73bdd1e6" ON "contacts_phones_phone_numbers" ("phoneNumbersId") `);
        await queryRunner.query(`CREATE TABLE "contacts_emails_emails" ("contactsId" uuid NOT NULL, "emailsId" uuid NOT NULL, CONSTRAINT "PK_faeda8326882fc0b028b5da25de" PRIMARY KEY ("contactsId", "emailsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_714c652ce187e875759842af40" ON "contacts_emails_emails" ("contactsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_087c04d66d11fb8dd8cbee5943" ON "contacts_emails_emails" ("emailsId") `);
        await queryRunner.query(`ALTER TABLE "contacts" ADD CONSTRAINT "FK_30ef77942fc8c05fcb829dcc61d" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_phones_phone_numbers" ADD CONSTRAINT "FK_1d7491c96ae76f338be25c55b40" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_phones_phone_numbers" ADD CONSTRAINT "FK_ea50ef4d2e11893c06afb2fb010" FOREIGN KEY ("phoneNumbersId") REFERENCES "phone_numbers"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_emails_emails" ADD CONSTRAINT "FK_6e0caf0f04eedaa732dd0958066" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_emails_emails" ADD CONSTRAINT "FK_dc64743967014e2a83450159764" FOREIGN KEY ("emailsId") REFERENCES "emails"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "contacts_phones_phone_numbers" ADD CONSTRAINT "FK_b2f16a5068a7c1d643b75400d96" FOREIGN KEY ("contactsId") REFERENCES "contacts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "contacts_phones_phone_numbers" ADD CONSTRAINT "FK_1dd0496942b08a019e73bdd1e6d" FOREIGN KEY ("phoneNumbersId") REFERENCES "phone_numbers"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "contacts_emails_emails" ADD CONSTRAINT "FK_714c652ce187e875759842af40f" FOREIGN KEY ("contactsId") REFERENCES "contacts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "contacts_emails_emails" ADD CONSTRAINT "FK_087c04d66d11fb8dd8cbee59431" FOREIGN KEY ("emailsId") REFERENCES "emails"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts_emails_emails" DROP CONSTRAINT "FK_087c04d66d11fb8dd8cbee59431"`);
        await queryRunner.query(`ALTER TABLE "contacts_emails_emails" DROP CONSTRAINT "FK_714c652ce187e875759842af40f"`);
        await queryRunner.query(`ALTER TABLE "contacts_phones_phone_numbers" DROP CONSTRAINT "FK_1dd0496942b08a019e73bdd1e6d"`);
        await queryRunner.query(`ALTER TABLE "contacts_phones_phone_numbers" DROP CONSTRAINT "FK_b2f16a5068a7c1d643b75400d96"`);
        await queryRunner.query(`ALTER TABLE "users_emails_emails" DROP CONSTRAINT "FK_dc64743967014e2a83450159764"`);
        await queryRunner.query(`ALTER TABLE "users_emails_emails" DROP CONSTRAINT "FK_6e0caf0f04eedaa732dd0958066"`);
        await queryRunner.query(`ALTER TABLE "users_phones_phone_numbers" DROP CONSTRAINT "FK_ea50ef4d2e11893c06afb2fb010"`);
        await queryRunner.query(`ALTER TABLE "users_phones_phone_numbers" DROP CONSTRAINT "FK_1d7491c96ae76f338be25c55b40"`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP CONSTRAINT "FK_30ef77942fc8c05fcb829dcc61d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_087c04d66d11fb8dd8cbee5943"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_714c652ce187e875759842af40"`);
        await queryRunner.query(`DROP TABLE "contacts_emails_emails"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1dd0496942b08a019e73bdd1e6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b2f16a5068a7c1d643b75400d9"`);
        await queryRunner.query(`DROP TABLE "contacts_phones_phone_numbers"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dc64743967014e2a8345015976"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6e0caf0f04eedaa732dd095806"`);
        await queryRunner.query(`DROP TABLE "users_emails_emails"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ea50ef4d2e11893c06afb2fb01"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1d7491c96ae76f338be25c55b4"`);
        await queryRunner.query(`DROP TABLE "users_phones_phone_numbers"`);
        await queryRunner.query(`DROP TABLE "contacts"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "phone_numbers"`);
        await queryRunner.query(`DROP TABLE "emails"`);
    }

}

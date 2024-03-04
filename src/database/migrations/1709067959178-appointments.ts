import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Appointments1709067959178 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("appointments");
    }

}

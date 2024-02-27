import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Users1709066205859 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "name",
                        type: "varchar",
                        length: "255"
                    },
                    {
                        name: "lastname",
                        type: "varchar",
                        length: "255"
                    },
                    {
                        name: "email",
                        type: "varchar",
                        length: "255"
                    },
                    {
                        name: "password",
                        type: "varchar",
                        length: "255"
                    },
                    {
                        name: "role_id",
                        type: "number",
                        isNullable: false
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }

}

import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateTodosTable1689417580570 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> { //The up method is executed when applying the migration. It takes a queryRunner object as a parameter and returns a Promise that resolves to void.
        queryRunner.query(`
        CREATE TABLE todos (
            id BIGINT AUTO_INCREMENT PRIMARY KEY,
            name TEXT,
            completed BOOLEAN NOT NULL DEFAULT FALSE
        );
        `); //a SQL query is executed using the queryRunner.query method to create the "todos" table with three columns: id, name, and completed.
    }

    public async down(queryRunner: QueryRunner): Promise<void> { //down method is executed when reverting the migration. It takes a queryRunner object as a parameter and returns a Promise that resolves to void
        queryRunner.query(`DROP TABLE todos;`)  //a SQL query is executed to drop the "todos" table.
    }

}

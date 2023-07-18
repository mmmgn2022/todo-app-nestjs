import { Entity, PrimaryGeneratedColumn, Column } from "typeorm" // imports necessary decorators from the TypeORM library. These decorators are used to define and configure the properties of the entity class

@Entity("todos") //@Entity() decorator is used to mark the class as an entity and associate it with a database table. the entity is named "todos", it corresponds to a table named "todos" in the database.
export class Todo {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ default: false })
    completed: boolean 
}

//The todo.entity.ts file represents an entity class in a NestJS application that is used to define the structure and behavior of the "todos" table in a database using the TypeORM library.

//the Todo class represents the entity structure for a "todos" table in the database. It has properties such as id, name, and completed, which are mapped to the corresponding columns in the table. By defining the entity in this way, you can use TypeORM's features to interact with the "todos" table, perform CRUD operations, and manage data within your NestJS application.
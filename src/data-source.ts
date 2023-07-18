import "reflect-metadata";
import { DataSource } from "typeorm"; //DataSource class is a way to connect to a database in TypeORM
import dotenv from 'dotenv';

const AppDataSource = new DataSource({
  type: "mysql",
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'Admin123',
  database: 'todo-app-nestjs',
  synchronize: false,
  logging: false,
  entities: [],
  migrations: ["./src/migration/*.ts"],
  subscribers: [],
})

export default AppDataSource;
import { Module } from '@nestjs/common'; //define a module in NestJS
import { TodoService } from './todo.service'; // service class for the Todo module
import { TodoController } from './todo.controller'; // controller class for the Todo module
import { TypeOrmModule } from '@nestjs/typeorm'; // orm
import { Todo } from './entities/todo.entity'; // entity (data model) for the Todo module

@Module({ //@Module() decorator is applied to the TodoModule class, indicating that it is a NestJS module
  imports: [TypeOrmModule.forFeature([Todo])], //imports: An array that specifies the modules required by the TodoModule. In this case, it imports the TypeOrmModule.forFeature() method and passes an array with the Todo entity. This means that the TypeOrmModule is configured to provide access to the Todo entity for other components in the module
  controllers: [TodoController], //controllers: An array that lists the controllers to be associated with the module. Here, it includes the TodoController, which handles incoming HTTP requests related to todo
  providers: [TodoService] //providers: An array that lists the providers (services) required by the module. It includes the TodoService, which contains the business logic for the Todo module. TodoService as a provider for dependency injection within the module
})
export class TodoModule { } //TodoModule class is exported to make it available for other modules or the application's main module

//todo.module.ts file is a module file in a NestJS application that defines and configures the Todo module.

//this module sets up the dependencies, controllers, and providers required for the Todo module
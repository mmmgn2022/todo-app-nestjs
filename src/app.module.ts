import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule , ConfigService } from "@nestjs/config"; // nanti dia auto import pas kita ketik di imports
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './todo/entities/todo.entity';

 //This section defines the AppModule class and uses the @Module decorator to define the module. The @Module decorator is used to annotate the class as a module and specify its properties.
@Module({
  imports: [TypeOrmModule.forRootAsync({ //imports: It specifies the list of modules that are imported into the current module. In this case, it includes TypeOrmModule, ConfigModule, and TodoModule.
    imports: [ConfigModule], //The TypeOrmModule.forRootAsync() method is used to configure the TypeORM module asynchronously.
    useFactory: (configService: ConfigService) => ({ //useFactory: It is a factory function that returns the TypeORM configuration object.  It takes configService as an argument, which is an instance of ConfigService from the @nestjs/config module.  This allows you to access the environment variables (configurations) defined in the .env file or provided directly in the code.
      type: 'mysql',
      host: 'localhost', 
      port: 3306, 
      username: 'root', 
      password: 'Admin123', 
      database: 'todo-app-nestjs', 
      entities: [Todo],
      synchronize: true,
    }),
    inject: [ConfigService] //inject: It specifies the list of providers (services) that should be injected into the useFactory function. In this case, it injects the ConfigService.
  }), TodoModule, ConfigModule.forRoot({ envFilePath: ['.env'] }), ConfigModule ],
  controllers: [AppController], //The controllers property is an array that specifies the controllers associated with this module. In this case, it includes the AppController class.
  providers: [AppService], //The providers property is an array that specifies the providers (services) associated with this module. In this case, it includes the AppService class.
})
export class AppModule { }

// In NestJS, the app.module.ts file is the root module that defines the structure and configuration of the application. 
// Overall, this code sets up the root module for a NestJS application, imports necessary modules including the ConfigModule for environment variable loading, and specifies the controllers and providers associated with this module.


/*
Penjelasan imports: [ConfigModule, ConfigModule.forRoot({ envFilePath: ['.env'] })],

Inside the decorator, the imports property is an array that specifies the modules that this module depends on. In this case, it includes the ConfigModule twice. The first ConfigModule is imported as is, while the second one is imported using the forRoot() method. The forRoot() method is provided by the ConfigModule and allows specifying configuration options. In this case, it specifies the envFilePath property as ['.env'], indicating that the module should load environment variables from the .env file in the project's root directory.

 */
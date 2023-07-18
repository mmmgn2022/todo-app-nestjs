import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable() //TodoService class is annotated with @Injectable(), indicating that it can be injected with dependencies
export class TodoService {
  constructor(
    @InjectRepository(Todo) //The @InjectRepository(Todo) decorator is used to inject the Repository for the Todo entity from the TypeORM library. This allows the service to interact with the underlying database table for todos
    private todoRepository: Repository<Todo>, //The constructor takes the injected todoRepository and assigns it to a private property for later use
  ) { }

  create(createTodoDto: CreateTodoDto) { //The create method takes a createTodoDto object, which is an instance of the CreateTodoDto class.
    return this.todoRepository.save(createTodoDto) //It saves the data from the DTO object into the database using the todoRepository.save() method and returns the newly created todo
  }

  findAll(completed?: boolean) { //The findAll method retrieves all the todo items from the database. It accepts an optional parameter completed, which can be used to filter the todos based on their completion status.
    if (!completed) { 
      //If completed is not provided or is falsy (e.g., undefined), it retrieves all the todos using the todoRepository.find() method
      return this.todoRepository.find();
    } else {
      //If completed is truthy (e.g., true), it retrieves the todos that match the specified completion status using the todoRepository.findBy() method.
      return this.todoRepository.findBy({ completed });
    }
  }

  findOne(id: number) { //The findOne method retrieves a specific todo item from the database based on its id. 
    return this.todoRepository.findOneBy({ id }); //It uses the todoRepository.findOneBy() method, passing an object with the id property to specify the search condition.
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) { //The update method updates an existing todo item in the database. It takes the id of the todo to be updated and an updateTodoDto object, which is an instance of the UpdateTodoDto class.
    const todo = await this.todoRepository.findOneBy({ id }); //It first retrieves the todo item using the todoRepository.findOneBy() method based on the provided id
    if (!todo) {
      // If the todo is not found, it throws a NotFoundException.
      throw new NotFoundException("to do not found");
    }
    // If the todo item is found, it updates the name and completed properties of the todo using the values from the updateTodoDto.
    todo.name = updateTodoDto.name;
    todo.completed = updateTodoDto.completed;
    return this.todoRepository.save(todo); //Finally, it saves the updated todo item using the todoRepository.save() method and returns the updated todo
  }

  remove(id: number) { //The remove method deletes a todo item from the database based on its id. It uses the todoRepository.delete() method to perform the deletion.
    this.todoRepository.delete(id);
  }
}

//The TodoService class is a service in a NestJS application responsible for handling the business logic related to managing todo items.
//Overall, the TodoService class provides methods to create, retrieve, update, and delete todo items by interacting with the underlying database table through the injected todoRepository object.
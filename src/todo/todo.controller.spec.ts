import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity'; //The imports include the testing utilities, the Todo entity, the TodoController, and the TodoService classes.
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

describe('TodoController', () => { //describe function is used to define a test suite for the TodoController
  let controller: TodoController; //TodoController class that will be used for testing
  let mockTodo: Todo = new Todo(); // is used as a mock object for testing purposes
  let todoService: TodoService; //represents an instance of the TodoService class

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({ //Test.createTestingModule function is used to create a testing module that includes the TodoController and TodoService
      controllers: [TodoController],
      providers: [TodoService, {
        provide: getRepositoryToken(Todo),
        useValue: {
          save: jest.fn().mockResolvedValue(mockTodo),
          find: jest.fn().mockResolvedValue([mockTodo])
        }
      }],
    }).compile();

    controller = module.get<TodoController>(TodoController); //module.get method is used to retrieve instances of TodoController and TodoService from the testing module and assign them to the respective variables
    todoService = module.get<TodoService>(TodoService);
  });
  // first test case 
  it('should be defined', () => { //This test case checks if the controller instance is defined. If it is defined, the test passes; otherwise, it fails.
    expect(controller).toBeDefined();
  });

  describe('findAll', () => { // This is another nested describe block inside the describe block that defines another test case for the findAll method of the TodoController. The test case checks if the findAll method of the todoService returns an array of todos.
    it('should return array of todos', async () => { //Inside the it function of the findAll test case, there is the actual test implementation
      const result = [
        {
          "id": 1,
          "name": "write full stack book",
          "completed": false
        }
      ];
      jest.spyOn(todoService, 'findAll').mockImplementation(() => Promise.resolve(result)); //jest.spyOn function is used to create a spy on the findAll method of the todoService to mock its implementation
      //mockImplementation method sets the mocked behavior for the findAll method, returning a resolved promise with the result array
      
      expect(await controller.findAll()).toBe(result); //expect statement asserts that the result of calling the findAll method on the controller is equal to the result array
    })
  })
});

//This is a test file for the TodoController class in a NestJS application. It uses the testing utilities provided by NestJS (Test, TestingModule) and external libraries like jest to write unit tests for the controller.

//this test file sets up a testing environment, creates instances of the TodoController and TodoService, and tests the behavior of the findAll method of the TodoController
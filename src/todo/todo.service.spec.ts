import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { TodoService } from './todo.service';

describe('TodoService', () => { //describe function is used to group related tests. In this case, the tests are for the TodoService class.

  // Inside the describe block, two variables are declared: service and mockTodo
  let service: TodoService; //service: will hold an instance of the TodoService
  let mockTodo: Todo = new Todo(); //mockTodo: an instance of the Todo entity used for mocking purposes in the tests.

  //Set up the test environment and mock dependencies:
  beforeEach(async () => { //beforeEach function is called before each test case to set up the test environment
    const module: TestingModule = await Test.createTestingModule({ //a testing module is created using Test.createTestingModule()
      providers: [TodoService, { //providers array specifies the providers (services) to be used in the testing module. In this case, TodoService is included as a provider
        //a mock repository object is provided using the provide and useValue properties.
        provide: getRepositoryToken(Todo),
        useValue: {
          //This mock repository object has save and find methods that are mocked using jest.fn(). The save method is mocked to resolve with the mockTodo object, and the find method is mocked to resolve with an array containing the mockTodo object.
          save: jest.fn().mockResolvedValue(mockTodo),
          find: jest.fn().mockResolvedValue([mockTodo])
        }
      }],
    }).compile(); //Finally, the testing module is compiled

    service = module.get<TodoService>(TodoService); //the TodoService instance is obtained using module.get<TodoService>(TodoService) and assigned to the service variable.
  });

  //first test case:
  it('should be defined', () => { //it function defines an individual test case. In this test case, it is checking whether the service instance is defined or not
    expect(service).toBeDefined(); //The expect function is used to assert that the service variable is defined.
  });

  describe('findAll', () => { //Inside the describe block, another test case is defined, this time for the findAll method of the TodoService class.
    //second test case:
    it('should return array of todos', async () => { //The it function defines the test case, which checks whether the findAll method returns an array of todos. 
      const todos = await service.findAll(); // The await keyword is used to wait for the asynchronous findAll method to resolve
      expect(todos).toStrictEqual([mockTodo]); //the expect function is used to assert that the todos variable is equal to an array containing the mockTodo object.
    })
  })
});

//This a unit test file (todo.service.spec.ts) for the TodoService class in a NestJS application. This test file is written using the Jest testing framework, which is commonly used for testing NestJS applications.

//That's a basic overview of what the code does. It sets up the test environment, mocks the repository object, and tests the TodoService class by asserting expected behaviors.
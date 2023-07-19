import { Controller, Get, Post, Body, Put, Patch, Param, Delete, Query } from '@nestjs/common'; //import necessary decorators to define routes and HTTP methods in the controller
import { TodoService } from './todo.service'; //TodoService class, which is responsible for handling business logic related to Todo operations
import { CreateTodoDto } from './dto/create-todo.dto'; //CreateTodoDto and UpdateTodoDto are imported, which represent the data transfer objects for creating and updating a Todo item respectively.
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todos') //The TodoController class is defined and decorated with @Controller('todos'). This decorator specifies the base route path for all the routes defined within this controller.
export class TodoController {
  constructor(private readonly todoService: TodoService) { }

  @Post() //is a decorator used to define a route for handling HTTP POST requests to create a new Todo item
  create(@Body() createTodoDto: CreateTodoDto) { //The create() method is invoked when this route is accessed. It accepts the request body (createTodoDto) containing the data for creating a Todo item. 
    return this.todoService.create(createTodoDto); //The create() method calls the create() method of the TodoService and passes the createTodoDto to it
  }

  @Get() //@Get() is a decorator used to define a route for handling HTTP GET requests to retrieve all Todo items.
  findAll(@Query('completed') completed?: boolean) { //The findAll() method is invoked when this route is accessed. It optionally accepts a query parameter named completed of type boolean, which is used to filter Todo items based on their completion status
    return this.todoService.findAll(completed);//The findAll() method calls the findAll() method of the TodoService and passes the completed parameter to it.
  }

  @Get(':id') //@Get(':id') is a decorator used to define a route for handling HTTP GET requests to retrieve a specific Todo item by its ID.
  findOne(@Param('id') id: string) { //The findOne() method is invoked when this route is accessed. It accepts a route parameter named id, which represents the ID of the Todo item to be retrieved.
    return this.todoService.findOne(+id); //The findOne() method calls the findOne() method of the TodoService and passes the parsed integer value of id to it.
  }

  @Put(':id') //@Put(':id') is a decorator used to define a route for handling HTTP PUT requests to update a specific Todo item by its ID.
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) { //The update() method is invoked when this route is accessed. It accepts a route parameter named id and the request body (updateTodoDto), which contains the updated data for the Todo item.
    return this.todoService.update(+id, updateTodoDto); //The update() method calls the update() method of the TodoService and passes the parsed integer value of id and the updateTodoDto to it
  }

  @Delete(':id') //@Delete(':id') is a decorator used to define a route for handling HTTP DELETE requests to remove a specific Todo item by its ID
  remove(@Param('id') id: string) { //The remove() method is invoked when this route is accessed. It accepts a route parameter named id, representing the ID of the Todo item to be deleted
    return this.todoService.remove(+id); //The remove() method calls the remove() method of the TodoService and passes the parsed integer value of id to it.
  }

  @Patch(':id') // it will handle PATCH requests to the URL /todos/:id 
  updatePartial(@Param('id') id: string, @Body() updateTodoDto: Partial<UpdateTodoDto>) { //Partial<UpdateTodoDto> for the updateTodoDto parameter. This allows us to send only the fields we want to update in the request body, instead of the entire UpdateTodoDto.
    //updateTodoDto: updateTodoDto is the parameter passed to the update() method. It contains the data that needs to be used for updating the Todo item. The exact structure of updateTodoDto is defined in the UpdateTodoDto class.
    return this.todoService.update(+id, updateTodoDto); //the result of the update() method is returned to the caller of the TodoController's update() method, and that result will be sent back as the response to the HTTP request.
  }
}

//Overall, this code defines routes forcreating, retrieving, updating, and deleting Todo items using the respective HTTP methods and delegates the actual processing of these operations to the TodoService class.

// @Body = req body , @Query = req query , @Param = req param 

//(+id): The + symbol is a shortcut to convert the id parameter, which is a string, into a numeric value. In the context of this code, it ensures that the id passed to the update() method is a number.
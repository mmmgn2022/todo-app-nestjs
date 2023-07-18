export class CreateTodoDto {  //CreateTodoDto class is created, the name and completed properties are assigned values. This object can then be passed to a function or API endpoint that expects a CreateTodoDto object to create a new todo item with the provided data.
    name: string;
    completed: boolean;
}

/**
The CreateTodoDto is a Data Transfer Object (DTO) class typically used in the context of building APIs or web applications. DTOs are used to transfer data between different layers or components of an application, such as between the client and server.

In this case, the CreateTodoDto class represents the data structure used to create a new todo item. It has two properties: name and completed

By using this DTO, you can encapsulate the data related to creating a new todo item in a structured manner. It helps to ensure that the data is properly validated and formatted before being processed further. The DTO class can also provide a clear contract between the client and server, specifying what data is required and what types are expected.

 */
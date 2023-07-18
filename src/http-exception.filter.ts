import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common'; // imports from the @nestjs/common package
import { Request, Response } from 'express'; //imports Request and Response from the express package.

@Catch(HttpException) // The HttpExceptionFilter class is defined and marked with the @Catch(HttpException) decorator. This decorator specifies that the filter should be used to catch exceptions of type HttpException. 
export class HttpExceptionFilter implements ExceptionFilter { //The class also implements the ExceptionFilter interface, which requires implementing the catch method.
  private readonly logger = new Logger(HttpExceptionFilter.name); //Logger Initialization. initializes a logger object using the Logger class from Nest.js. The logger will be used to log error messages when exceptions occur.

  catch(exception: HttpException, host: ArgumentsHost) { //catch method is responsible for handling the caught exception. It takes two parameters: exception of type HttpException, which represents the caught exception, and host of type ArgumentsHost, which provides access to the execution context.
    const ctx = host.switchToHttp(); //is called to switch the context to the HTTP platform-specific context.
    const response = ctx.getResponse<Response>(); //get the response objects 
    const request = ctx.getRequest<Request>(); //get the request objects 
    const status = exception.getStatus(); //retrieves the HTTP status code associated with the exception.
    const res = exception.getResponse(); //gets the response object associated with the exception.
    this.logger.error(res); // logs the error message from the exception using the initialized logger.
    response //response is sent back to the client with the appropriate status code and a JSON object containing the status code, timestamp, request path, and the message extracted from the exception's response object.
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: res['message']
      });
  }
}

//Overall, this code defines a Nest.js exception filter that catches and handles HttpException instances, logging the error and returning a JSON response to the client with the relevant information.
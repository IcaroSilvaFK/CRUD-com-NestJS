import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException>
  implements ExceptionFilter
{
  //                   request/response;
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const statusResquest = exception.getStatus();
    const statusResponse = exception.getResponse();

    const error =
      typeof response === 'string'
        ? { message: statusResponse }
        : (statusResponse as object);

    response.status(statusResquest).json({
      ...error,
      timestamp: new Date().toISOString(),
    });
  }
}

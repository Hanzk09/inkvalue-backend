import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class ExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    response.status(status).json({
      status,
      error: exception.response.error,
      message: exception.response.message,
    });
  }
}

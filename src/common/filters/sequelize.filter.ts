import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { BaseError } from 'sequelize';
import { Response } from 'express';

@Catch(BaseError)
export class SequelizeFilter implements ExceptionFilter {
  catch(error: BaseError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: HttpStatus.BAD_REQUEST,
      message: error.message,
    });
  }
}

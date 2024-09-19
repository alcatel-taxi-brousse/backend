import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { AxiosError } from 'axios';
import { RainbowHttpError } from '../models/rainbow-http.error';
import { Response } from 'express';

@Catch(AxiosError)
export class RainbowHttpFilter implements ExceptionFilter {
  catch(exception: AxiosError<RainbowHttpError>, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.response?.status || 500;
    const errorDetailsCode = exception.response?.data.errorDetailsCode;
    const error = exception.response?.data.errorDetails || exception.message;

    response.status(status).json({
      statusCode: status,
      error: error,
      errorDetailsCode,
    });
  }
}

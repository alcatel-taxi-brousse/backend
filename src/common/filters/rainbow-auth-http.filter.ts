import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { AxiosError } from 'axios';
import { RainbowAuthHttpError } from '../errors/rainbow-auth-http.error';
import { Response } from 'express';

@Catch(AxiosError)
export class RainbowAuthHttpFilter implements ExceptionFilter {
  catch(
    exception: AxiosError<RainbowAuthHttpError>,
    host: ArgumentsHost,
  ): void {
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

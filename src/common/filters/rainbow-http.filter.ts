import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { RainbowHttpError } from '../errors/rainbow-http.error';
import { code } from 'rainbow-node-sdk/lib/common/ErrorManager';

@Catch()
export class RainbowHttpFilter implements ExceptionFilter {
  catch(exception: RainbowHttpError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const rainbowErrorCode = exception.code;
    const error = exception.msg;
    const status = this.getHttpStatusCode(rainbowErrorCode);

    response.status(status).json({
      statusCode: status,
      error: error,
      rainbowErrorCode,
    });
  }

  private getHttpStatusCode(rainbowErrorCode: number): HttpStatus {
    switch (rainbowErrorCode) {
      case code.OK:
        return HttpStatus.OK;
      case code.ERRORUNAUTHORIZED:
        return HttpStatus.UNAUTHORIZED;
      case code.ERRORBADREQUEST:
        return HttpStatus.BAD_REQUEST;
      case code.ERRORFORBIDDEN:
        return HttpStatus.FORBIDDEN;
      case code.ERRORNOTFOUND:
        return HttpStatus.NOT_FOUND;
      case code.ERRORUNSUPPORTED:
        return HttpStatus.UNSUPPORTED_MEDIA_TYPE;
      default:
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }
}

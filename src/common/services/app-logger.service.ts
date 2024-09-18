import { ConsoleLogger, Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class AppLogger extends ConsoleLogger implements LoggerService {
  constructor(context?: string) {
    super();
    this.setContext(context);
  }

  log(message: any, context?: string) {
    super.log(message, context ?? this.context);
  }

  verbose(message: any, context?: string) {
    super.verbose(message, context ?? this.context);
  }

  warn(message: any, context?: string) {
    super.warn(message, context ?? this.context);
  }

  debug(message: any, context?: string) {
    super.debug(message, context ?? this.context);
  }

  fatal(message: any, context?: string) {
    super.fatal(message, context ?? this.context);
  }

  error(message: any, stack?: string, context?: string) {
    super.error(message, stack, context ?? this.context);
  }
}

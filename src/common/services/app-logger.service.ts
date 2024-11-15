import { ConsoleLogger, Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class AppLogger extends ConsoleLogger implements LoggerService {
  constructor(context?: string) {
    super();
    this.setContext(context);
  }

  log(message: any, context?: string): void {
    super.log(message, context ?? this.context);
  }

  verbose(message: any, context?: string): void {
    super.verbose(message, context ?? this.context);
  }

  warn(message: any, context?: string): void {
    super.warn(message, context ?? this.context);
  }

  debug(message: any, context?: string): void {
    super.debug(message, context ?? this.context);
  }

  fatal(message: any, context?: string): void {
    super.fatal(message, context ?? this.context);
  }

  error(message: any, stack?: string, context?: string): void {
    super.error(message, stack, context ?? this.context);
  }
}

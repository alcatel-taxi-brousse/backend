import { ConsoleLogger, Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class AppLogger extends ConsoleLogger implements LoggerService {
  constructor(context?: string) {
    super();
    this.setContext(context);
  }

  log(message: unknown, context?: string): void {
    super.log(message, context ?? this.context);
  }

  verbose(message: unknown, context?: string): void {
    super.verbose(message, context ?? this.context);
  }

  warn(message: unknown, context?: string): void {
    super.warn(message, context ?? this.context);
  }

  debug(message: unknown, context?: string): void {
    super.debug(message, context ?? this.context);
  }

  fatal(message: unknown, context?: string): void {
    super.fatal(message, context ?? this.context);
  }

  error(message: unknown, stack?: string, context?: string): void {
    super.error(message, stack, context ?? this.context);
  }
}

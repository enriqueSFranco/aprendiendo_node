import winston from "winston";
import { LoggerAdapter } from "./LoggerAdapter";

enum LevelKey {
  LOG = "log",
  INFO = "info",
  WARN = "warn",
  ERROR = "error",
  DEBUG = "debug",
}

class WinstonLoggerAdapter implements LoggerAdapter {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: LevelKey.DEBUG,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      transports: [new winston.transports.Console()],
    });
  }
  debug(message: string, meta?: any): void {
    this.logger.debug(message, { meta });
  }
  info(message: string, meta?: any): void {
    this.logger.info(message, { meta });
  }
  warn(message: string, meta?: any): void {
    this.logger.warn(message, { meta });
  }
  error(message: string, meta?: any): void {
    this.logger.error(message, { meta });
  }
}

const winstonLoggerAdapter = new WinstonLoggerAdapter();
export default winstonLoggerAdapter;

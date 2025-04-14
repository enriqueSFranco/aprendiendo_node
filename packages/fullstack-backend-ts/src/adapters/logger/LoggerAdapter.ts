interface LogMeta {
  userId?: string;
  requestId?: string;
  ip?: string;
  [key: string]: any;
}

export interface LoggerAdapter {
  debug(message: string, meta?: LogMeta): void;
  info(message: string, meta?: LogMeta): void;
  warn(message: string, meta?: LogMeta): void;
  error(message: string, meta?: LogMeta): void;
}

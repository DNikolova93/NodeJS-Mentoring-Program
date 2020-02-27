import path from 'path';
import { createLogger, format, Logger, transports } from 'winston';

export default (config: any): Logger => {
  let logger: Logger;

    // tslint:disable-next-line: no-shadowed-variable
  const consoleLogger = new transports.Console({
    format: format.combine(
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      format.simple(),
      format.errors({ stack: true }),
      format.colorize(),
    ),
  });

  logger = createLogger({
    transports: [
      consoleLogger,
    ],
    exitOnError: false,
  });

  if (config.env === config.prod) {
    const dirname = path.join(__dirname, '../logs');
    const fileErrorLogger = new transports.File({ filename: 'error-logs.txt', dirname, level: 'error'});
    const fileLogger = new transports.File({ filename: 'combined-logs.txt', dirname });

    logger.add(fileErrorLogger);
    logger.add(fileLogger);
  }

  return logger;
};

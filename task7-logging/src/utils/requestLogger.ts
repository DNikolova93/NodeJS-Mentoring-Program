import { RequestHandler } from 'express';
import morgan from 'morgan';
import { Logger } from 'winston';

export default (logger: Logger): RequestHandler => {
  const format = ':requestId :method :url :status :response-time ms';

  morgan.token('requestId', (request: any) => request.id);

  const options = {
    stream: {
      write: (message: string) => logger.info(message.trim()),
    },
  };

  return morgan(format, options);
};

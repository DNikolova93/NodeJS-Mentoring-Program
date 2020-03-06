import { NextFunction, Request, Response } from 'express';
import { Logger } from 'winston';

export default class ErrorController {
  public logger: Logger;
  constructor(logger: any) {
    this.logger = logger;
  }

  public handleError(err: any, req: Request, res: Response, next: NextFunction) {
    let error: { message: string, code: number };

    try {
      error = JSON.parse(err.message);
    } catch (e) {
      this.logger.error(err);

      return res.send(err.message);
    }

    const message = error.message;
    const code = +error.code;

    this.logger.error(message);

    if (code === 401) {
      return res.status(code).send(message);
    }

    if (code === 404) {
      this.logger.error(err);
      return res.status(code).send(message);
    }

    if (code === 500) {
      return res.status(code).json(error);
    }

    return res.status(500).send('Internal Server Error');
  }
}

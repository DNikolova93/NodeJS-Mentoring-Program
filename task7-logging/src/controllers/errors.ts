import { NextFunction, Request, Response } from 'express';

export default class ErrorController {
  public logger: any;
  constructor(logger: any) {
    this.logger = logger;
  }

  public handleError(err: any, req: Request, res: Response, next: NextFunction) {
    let error: { message: string, code: number };

    try {
      error = JSON.parse(err.message);
    } catch (e) {
      this.logger.log(err.message);

      return res.send(err.message);
    }

    const message = error.message;
    const code = +error.code;

    this.logger.log(message);

    if (code === 401) {
      return res.status(code).send(message);
    }

    if (code === 500) {
      return res.status(code).json(error);
    }

    return res.status(500).send('Internal Server Error');
  }
}

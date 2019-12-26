import { NextFunction, Request, Response } from 'express';
import { RequestType } from '../types/requestType';

const validatorConfigApp = (schema: any, reqPropery: RequestType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[reqPropery]);

    if (!error) {
      return next();
    } else {
      const { details } = error;
      const message = details[0].message;

      res.status(400).json({ error: message });
    }
  };
};

export default validatorConfigApp;

import { NextFunction, Request, Response } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import config from '../config';

export default (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers['authorization'];
  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, config.jwt.secret, (err: VerifyErrors, decoded: object) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: 'Forbidden error',
        });
      } else {
        next();
      }
    });
  } else {
    return res.status(401).json({
      success: false,
      message: 'Authot token is not supplied',
    });
  }
};

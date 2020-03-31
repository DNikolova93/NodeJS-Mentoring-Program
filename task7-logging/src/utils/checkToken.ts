import { NextFunction, Request, Response } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';

export default (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers['authorization'];
  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  if (token) {
    const jwtSecret: string = process.env.JWT_SECRET || '';
    jwt.verify(token, jwtSecret, (err: VerifyErrors, decoded: object) => {
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

import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import passport = require('passport');
import { User } from '../types/user';
import { timer } from '../utils';

export default class AuthController {
  public data: any;
  public config: any;
  constructor(data: any, config: any) {
    this.data = data.user;
    this.config = config;
  }

  @timer
  async login(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('local',
      { session: false },
      (err: Error, user: User, info: { message: string }) => {
        console.log('auth', user);
        if (err || !user) {
          return res.status(400).json({ message: 'Something is not right', user });
        }

        req.login(user, { session: false }, (error: Error) => {
          if (error) {
            res.send(error);
          }
        });

        const token = jwt.sign(user, this.config.jwt.secret);
        return res.json({ user, token });
    });
  }
}

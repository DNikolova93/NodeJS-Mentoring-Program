import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import sha256 from 'sha256';
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
    const { username, password } = req.body;

    try {
      const user = await this.data.getByUsername(username);

      if (!user) {
        return res.status(401).send(`Couldn't find user!`);
      }
      const isValid = user.password === sha256(password);

      if (isValid) {
        const token = this.issueJWT(user);

        return res.status(200).json({ token, expiresIn: token.expires });
      } else {
        return res.status(401).send(`You entered the wrong password!`);
      }
    } catch (err) {
      return next(err);
    }
  }

  private issueJWT(user: User) {
    const { id } = user;
    const expiresIn = '1d';

    const payload = {
      sub: id,
      iat: Date.now(),
    };

    const jwtSecret: string = process.env.JWT_SECRET || '';
    const signedToken = jwt.sign(payload, jwtSecret, { expiresIn });
    return {
      token: 'Bearer ' + signedToken,
      expires: expiresIn,
    };
  }
}

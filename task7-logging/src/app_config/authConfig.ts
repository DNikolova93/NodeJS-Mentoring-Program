import { Express } from 'express';
import passport from 'passport';
import { ExtractJwt, Strategy as JWTStrategy, StrategyOptions } from 'passport-jwt';

const authConfig = (app: Express, data: any) => {
  const jwtOptions: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET || '',
  };

  app.use(passport.initialize());

  passport.use(new JWTStrategy(jwtOptions, async (jwtPayload: any, done: any) => {
    const userData = data.user;
    try {
      const user = await userData.get(jwtPayload.sub);
      return done(null, user);
    } catch (error) {
      return done(null, error, { message: 'Invalid user credentials' });
    }
  }));
};

export default authConfig;

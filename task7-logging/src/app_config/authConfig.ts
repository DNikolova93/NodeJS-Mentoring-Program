import { Express } from 'express';
import passport from 'passport';
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt';

const authConfig = (app: Express, data: any, config: any) => {
  // app.use(passport.initialize());
  // app.use(passport.session());

  passport.use(new JWTStrategy({
    secretOrKey: config.jwt.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  }, async (jwtPayload, done) => {
    const userData = data.user;
    try {
      const user = await userData.get(jwtPayload.id);
      return done(null, user);
    } catch (error) {
      return done(null, error, { message: 'Invalid user credentials' });
    }
  }));
};

export default authConfig;

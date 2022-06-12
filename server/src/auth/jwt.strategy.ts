import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // secretOrKey: process.env.AUTHENTICATION_SECRET,
      secretOrKey: 'super-secret',
      logging: true,
    });
  }

  async validate(payload: any) {
    console.log("*****************", process.env.AUTEHNTICATION_SECRET);
    return {
      email: payload.email,
    };
  }
}
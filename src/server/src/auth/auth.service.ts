import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {

    if (email === process.env.LIEVEN_EMAIL && password === process.env.LIEVEN_PASSWORD) {
      return email;
    }

    return null;
  }

  async login(user: String) {
    return {
      access_token: this.jwtService.sign({
        email: user,
      }),
      user,
    };
  }
}

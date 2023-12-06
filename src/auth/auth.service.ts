import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersServices: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(userName: string, pass: string) {
    const user = await this.usersServices.findOne(userName);
    if (user?.password !== pass) {
      throw new UnauthorizedException('No user with those credentials');
    }

    const payload = { userName: user?.userName };
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Users } from 'src/users/schemas/users.schema';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersServices: UsersService) {}

  async signIn(userName: string, pass: string): Promise<Users> {
    const user = await this.usersServices.findOne(userName);
    if (user.password !== pass) {
      throw new UnauthorizedException('No user with those credentials');
    }

    return user;
  }
}

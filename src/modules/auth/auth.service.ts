import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '../users/users.entity';
import { UsersService } from '../users/users.service';
import { CreateSessionDto } from './dto/createSession.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(createSessionDto: CreateSessionDto) {
    const user = await this.validateUser(createSessionDto);
    const payload = {
      name: user.name,
      userId: user.id,
      isAdmin: user.isAdmin,
      email: user.email,
    };
    return {
      name: user.name,
      userId: user.id,
      email: user.email,
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(createSessionDto: CreateSessionDto): Promise<User> {
    const { email, password } = createSessionDto;
    const user = await this.usersService.findOneByEmail(email);
    const passwordMatch = await user?.validatePassword(password);
    if (!passwordMatch) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

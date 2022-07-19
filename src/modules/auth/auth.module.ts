import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '..//users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { envConfig } from '../../config/env.load';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    AuthModule,
    JwtModule.register({
      secret: envConfig.jwt.secret,
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}

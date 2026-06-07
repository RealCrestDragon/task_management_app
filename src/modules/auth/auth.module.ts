import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { authConfig } from 'src/config/auth.config';
import { JwtStrategy } from './jwt.strategy';
import { UserRepository } from '../user/repositories/user.repository';

const { JWT_KEY } = authConfig;
@Module({
  imports: [
    ConfigModule,
    JwtModule.register({
      secret: JWT_KEY,
      signOptions: { expiresIn: '6000s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, JwtStrategy],
})
export class AuthModule {}

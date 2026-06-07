import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { authConfig } from 'src/config/auth.config';
import { UserRepository } from './repositories/user.repository';

const { JWT_KEY } = authConfig;
@Module({
  imports: [
    ConfigModule,
    JwtModule.register({
      secret: JWT_KEY,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository],
})
export class AuthModule {}

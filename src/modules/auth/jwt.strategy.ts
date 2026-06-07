import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { UserRepository } from '../user/repositories/user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_KEY') || '',
    });
  }

  async validate(payload: { id: number }) {
    const { id } = payload;
    const cachedUser = await this.cacheManager.get(`user:${id}`);
    if (cachedUser) return cachedUser;
    const user = await this.userRepository.findUserById(id);
    if (!user) throw new UnauthorizedException('Email does not exist');
    return user;
  }
}

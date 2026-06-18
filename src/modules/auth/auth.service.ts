import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthResponse } from './auth.type';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { PublicUser } from 'src/common/types/user.type';
import { hashPassword, comparePassword } from 'src/common/utils/bcrypt.util';
import { Prisma } from 'generated/prisma/client';
import { getP2002Fields } from 'src/common/helpers/prisma-error.helper';
import { UserRepository } from '../user/repositories/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  private _generateToken(payload: PublicUser): string {
    return this.jwtService.sign(payload);
  }

  private async _setUserCache(
    id: number,
    user: PublicUser,
  ): Promise<PublicUser> {
    return this.cacheManager.set(`user:${id}`, user);
  }

  async register(registerDto: RegisterDto): Promise<AuthResponse> {
    const { email, password, fullName } = registerDto;
    const hash = await hashPassword(password);
    while (true) {
      try {
        const emailBase = email.split('@')[0];
        const suffix = Math.floor(Math.random() * 10000);
        const username = `${emailBase}_${suffix}`;
        const newUser = await this.userRepository.createUser(
          { ...registerDto, password: hash },
          username,
        );
        const plainUserWithoutPassword = {
          id: newUser.id,
          username,
          email,
          fullName,
        };
        const accessToken = this._generateToken(plainUserWithoutPassword);

        this._setUserCache(newUser.id, plainUserWithoutPassword).catch(
          (error) => console.log(`Catching for user ${newUser.id} fail`, error),
        );

        return { user: plainUserWithoutPassword, accessToken };
      } catch (error) {
        if (
          error instanceof Prisma.PrismaClientKnownRequestError &&
          error.code === 'P2002'
        ) {
          const fields = getP2002Fields(error);
          if (fields.includes('email')) {
            throw new ConflictException('User already exists');
          }
          if (fields.includes('username')) continue;
        }
        throw error;
      }
    }
  }

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const { emailOrUsername, password } = loginDto;
    const user =
      await this.userRepository.findByEmailOrUsername(emailOrUsername);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const { id, username, email, fullName } = user;

    const isCorrectPassword = await comparePassword(password, user.password);
    if (!isCorrectPassword)
      throw new UnauthorizedException('Invalid credentials');

    const plainUserWithoutPassword = { id, username, email, fullName };
    const accessToken = this._generateToken(plainUserWithoutPassword);

    this._setUserCache(id, plainUserWithoutPassword).catch((error) =>
      console.log(`Caching for user ${id} fail`, error),
    );

    return { user: plainUserWithoutPassword, accessToken };
  }
}

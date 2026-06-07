import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserRepository } from './repositories/user.repository';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthResponse, PlainUserWithoutPassword } from './auth.type';
import { PrismaClientKnownRequestError } from 'generated/prisma/internal/prismaNamespace';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  private _generateToken(payload: PlainUserWithoutPassword): string {
    console.log(payload);
    return this.jwtService.sign(payload);
  }

  private async _setUserCache(
    id: number,
    accessToken: string,
  ): Promise<string> {
    return this.cacheManager.set(`user:${id}`, accessToken);
  }

  async register(registerDto: RegisterDto): Promise<AuthResponse> {
    const { email, password, fullName } = registerDto;
    const hash = await bcrypt.hash(password, 10);
    while (true) {
      try {
        const emailBase = email.split('@')[0];
        const suffix = Math.floor(Math.random() * 10000);
        const username = `${emailBase}_${suffix}`;
        const newUser = await this.userRepository.createUser({
          username,
          email,
          password: hash,
          fullName,
        });
        const plainUserWithoutPassword = {
          id: newUser.id,
          username,
          email,
          fullName,
        };
        const accessToken = this._generateToken(plainUserWithoutPassword);

        this._setUserCache(newUser.id, accessToken).catch((error) =>
          console.log(`Catching for user ${newUser.id} fail`, error),
        );

        return { user: plainUserWithoutPassword, accessToken };
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002') {
          const fields = e.meta?.target as string[];
          if (fields.includes('email')) {
            throw new ConflictException('User already exists');
          }
          if (fields.includes('username')) continue;
        }
        throw e;
      }
    }
  }

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const { emailOrUsername, password } = loginDto;
    const user =
      await this.userRepository.findByEmailOrUsername(emailOrUsername);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const { id, username, email, fullName } = user;

    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword)
      throw new UnauthorizedException('Invalid credentials');

    const plainUserWithoutPassword = { id, username, email, fullName };
    const accessToken = this._generateToken(plainUserWithoutPassword);

    this._setUserCache(id, accessToken).catch((error) =>
      console.log(`Catching for user ${id} fail`, error),
    );

    return { user: plainUserWithoutPassword, accessToken };
  }
}

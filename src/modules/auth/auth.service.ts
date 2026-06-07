import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserRepository } from './repositories/user.repository';
import { UniqueConstraintError } from 'sequelize';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthResponse, PlainUserWithoutPassword } from './auth.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  private _generateUsername(email: string): string {
    const emailBase = email.split('@')[0];
    const suffix = Math.floor(Math.random() * 10000);
    return `${emailBase}_${suffix}`;
  }

  private async _hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
  private async _comparePassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  private _generateToken(payload: PlainUserWithoutPassword): string {
    console.log(payload);
    return this.jwtService.sign(payload);
  }

  async register(registerDto: RegisterDto): Promise<AuthResponse> {
    const { email, password, fullName } = registerDto;
    const hash = await this._hashPassword(password);
    while (true) {
      try {
        const username = this._generateUsername(email);
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

        return { user: plainUserWithoutPassword, accessToken };
      } catch (e) {
        if (e instanceof UniqueConstraintError) {
          const { fields } = e;
          if (fields['email']) {
            throw new ConflictException('User already exists');
          }
          if (fields['username']) continue;
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
    const plainUserWithoutPassword = { id, username, email, fullName };
    const isCorrectPassword = await this._comparePassword(
      password,
      user.password,
    );
    if (!isCorrectPassword)
      throw new UnauthorizedException('Invalid credentials');

    const accessToken = this._generateToken(plainUserWithoutPassword);

    return { user: plainUserWithoutPassword, accessToken };
  }
}

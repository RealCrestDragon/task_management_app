import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  getHello(): string {
    return 'Hello World!';
  }
  async login(): Promise<string> {
    return 'good';
  }
}

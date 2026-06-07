import { PublicUser } from 'src/common/types/user.type';

export interface AuthResponse {
  user: PublicUser;
  accessToken: string;
}

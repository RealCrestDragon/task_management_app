import { IsEmail, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  username: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  fullName: string;
}

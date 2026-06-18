import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ description: 'Username. Must be unique' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ description: 'Email. Must be unique', format: 'email' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Password', minLength: 8 })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({ description: 'Full name' })
  @IsNotEmpty()
  @IsString()
  fullName: string;
}

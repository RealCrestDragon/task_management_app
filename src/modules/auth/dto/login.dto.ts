import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Email or username',
    examples: ['john@gmail.com', 'John25433'],
  })
  @IsNotEmpty()
  @IsString()
  emailOrUsername: string;

  @ApiProperty({ description: 'Password', minLength: 8 })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}

import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { UserService } from './user.service';
import type { PublicUser } from 'src/common/types/user.type';
import { UpdateUserDto } from './dto/updateUser.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get user detail' })
  @ApiResponse({ status: 200, description: 'User detail' })
  async getUser(@Param('id') id: number): Promise<PublicUser> {
    return this.userService.getUser(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, description: 'User updated' })
  async updateUser(
    @Param('id') id: number,
    @Body() payload: UpdateUserDto,
  ): Promise<PublicUser> {
    return this.userService.updateUser(id, payload);
  }
}

import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { UserService } from './user.service';
import type { PublicUser } from 'src/common/types/user.type';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getUser(@Param('id') id: number): Promise<PublicUser> {
    return this.userService.getUser(id);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() payload: UpdateUserDto,
  ): Promise<PublicUser> {
    return this.userService.updateUser(id, payload);
  }
}

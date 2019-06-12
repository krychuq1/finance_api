import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@ApiUseTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UsersService) {}
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}

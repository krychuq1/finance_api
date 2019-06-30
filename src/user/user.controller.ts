import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { IMetalSummary } from '../metal/interfaces/IMetalSummary';

@ApiUseTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UsersService) {}
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  @ApiBearerAuth()
  @Get('/total')
  @UseGuards(AuthGuard())
  async getTotal(@Req() request): Promise<IMetalSummary> {
    return this.userService.findAll(request.user.userId);
  }
}

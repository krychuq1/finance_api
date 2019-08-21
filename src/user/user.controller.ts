import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { IMetalSummary } from '../metal/interfaces/IMetalSummary';
import { MetalDto } from '../metal/dto/metal.dto';

@ApiBearerAuth()
@ApiUseTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UsersService) {}
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  // @ApiBearerAuth()
  // @Get('/total')
  // @UseGuards(AuthGuard())
  // async getTotal(@Req() request): Promise<IMetalSummary> {
  //   return this.userService.findAll(request.user.userId);
  // }
  @Get('/info')
  @UseGuards(AuthGuard())
  async getUser(@Req() request) {
    return await this.userService.findAll(request.user.userId);
  }

  @Post('/addMetal')
  @UseGuards(AuthGuard())
  async addMetal(@Body() metalDto: MetalDto, @Req() request) {
    metalDto.userId = request.user.userId;
    return await this.userService.addMetal(metalDto);
  }

}

import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { metal, MetalService } from './metal.service';
import { ISilver } from './interfaces/ISilver';
import { CreateSilverDto } from './dto/create-silver.dto';
import { AuthGuard } from '@nestjs/passport';
@ApiUseTags('metal')
@ApiBearerAuth()
@Controller('metal')
export class MetalController {
  constructor(private readonly metalService: MetalService) {}
  @Get('/silver')
  async getSilverPrice(): Promise<object> {
    const res = await this.metalService.getMetalPrice(metal.silver);
    return res.data;
  }
  @Post('/silver')
  @UseGuards(AuthGuard())
  async addSilver(@Body() createSilverDto: CreateSilverDto, @Req() request): Promise<any> {
    // console.log(createSilverDto);
    return await this.metalService.addSilver(createSilverDto.oz, request.user.userId);
  }

  @Get('/gold')
  async getGoldPrice(): Promise<object> {
    const res = await this.metalService.getMetalPrice(metal.gold);
    return res.data;
  }
}

import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { metal, MetalService } from './metal.service';

// import { AuthGuard } from '@nestjs/passport';
@ApiUseTags('metal')
@ApiBearerAuth()
@Controller('metal')
export class MetalController {
  constructor(private readonly metalService: MetalService) {}
  @Get('/silver')
  async getSilverPrice(): Promise<any> {
    const res = await this.metalService.getMetalPrice(metal.silver);
    console.log(res);
    return res;
  }
  @Get('/all')
  async getAllMetalPrices(): Promise<any> {
    const array = [metal.silver, metal.gold];
    return await this.metalService.getMultiPricesForMetals(array);
  }
  // @Post('/silver')
  // @UseGuards(AuthGuard())
  // async addSilver(@Body() metalDto: MetalDto, @Req() request): Promise<any> {
  //   return {};
  //  // return await this.metalService.addMetal(metal.silver, metalDto.oz, request.user.userId);
  //
  // }

  @Get('/gold')
  async getGoldPrice(): Promise<object> {
    const res = await this.metalService.getMetalPrice(metal.gold);
    // return res.data[0].spreadProfilePrices[0].ask;
    return {};
  }
  // @Post('/gold')
  // @UseGuards(AuthGuard())
  // async addGold(@Body() metalDto: MetalDto, @Req() request): Promise<any> {
  //   // return this.metalService.addMetal(metal.gold, metalDto.oz, request.user.userId);
  //   return {};
  // }
}

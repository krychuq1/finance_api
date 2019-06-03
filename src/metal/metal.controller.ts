import { Controller, Get } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { metal, MetalService } from './metal.service';

@ApiUseTags('metal')
@Controller('metal')
export class MetalController {
  constructor(private readonly metalService: MetalService) {}
  @Get('/silver')
  async getSilverPrice(): Promise<object> {
    const res = await this.metalService.getMetalPrice(metal.silver);
    return res.data;
  }
  @Get('/gold')
  async getGoldPrice(): Promise<object> {
    const res = await this.metalService.getMetalPrice(metal.gold);
    return res.data;
  }
}

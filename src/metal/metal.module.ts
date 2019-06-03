import { HttpModule, Module } from '@nestjs/common';
import { MetalController } from './metal.controller';
import { MetalService } from './metal.service';

@Module({
  imports: [HttpModule],
  controllers: [MetalController],
  providers: [MetalService],
})
export class MetalModule {

}

import { Controller, Get, Param } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { ApiUseTags } from '@nestjs/swagger';
import { ICrypto } from './ICrypto';

// https://min-api.cryptocompare.com/documentation
@ApiUseTags('crypto')
@Controller('crypto')
export class CryptoController {
  constructor(private readonly cryptoService: CryptoService ) {}
  @Get('/:fsym/:tsyms')
  async getPriceForCoin(@Param('fsym') fsym: string, @Param('tsyms') tsyms: string): Promise<ICrypto> {
    return await this.cryptoService.getPrice(fsym, tsyms);
  }

}

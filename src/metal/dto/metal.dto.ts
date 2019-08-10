import { ApiBearerAuth, ApiModelProperty } from '@nestjs/swagger';
import { IMetal } from '../interfaces/IMetal';

export class MetalDto implements IMetal {
  @ApiModelProperty()
  oz: number;
  @ApiModelProperty()
  price: number;
  @ApiModelProperty()
  type: string;
  constructor(oz: number, price: number, type: string) {
    this.oz = oz;
    this.price = price;
    this.type = type;
  }
  roundTotal(fixTo: number) {
    this.price = Number(this.price.toFixed(fixTo));
  }
}

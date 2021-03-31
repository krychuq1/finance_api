import { ApiBearerAuth, ApiModelProperty } from '@nestjs/swagger';
import { IMetal } from '../interfaces/IMetal';
import { Schema } from 'mongoose';

export class MetalDto  {
  @ApiModelProperty()
  oz: number;
  @ApiModelProperty()
  type: string;
  userId?: string;
  price: string;
  constructor(oz: number, price: string, type: Schema.Types.ObjectId) {
    this.oz = oz;
    this.price = price;
    this.type = type;
  }
}

import { ApiBearerAuth, ApiModelProperty } from '@nestjs/swagger';
import { IMetal } from '../interfaces/IMetal';
import { Schema } from 'mongoose';

export class MetalDto  {
  @ApiModelProperty()
  oz: number;
  @ApiModelProperty()
  type: string;
  userId: string;

  constructor(oz: number, type: string, userId: Schema.Types.ObjectId) {
    this.oz = oz;
    this.type = type;
    this.userId = userId;
  }
}

import { ApiBearerAuth, ApiModelProperty } from '@nestjs/swagger';

export class MetalDto {
  @ApiModelProperty()
  readonly oz: number;
}

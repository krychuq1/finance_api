import { ApiBearerAuth, ApiModelProperty } from '@nestjs/swagger';

export class CreateSilverDto {
  @ApiModelProperty()
  readonly oz: number;


}

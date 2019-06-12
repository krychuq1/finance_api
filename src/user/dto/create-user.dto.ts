import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiModelProperty()
  readonly login: string;
  @ApiModelProperty()
  public password: string;
}

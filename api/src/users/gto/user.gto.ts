import { ApiModelProperty } from '@nestjs/swagger';

export class UserGTO {
  @ApiModelProperty({ example: 'test', description: 'username' })
  username: string;
  @ApiModelProperty({ example: 1, description: 'user id' })
  userId: number;
}

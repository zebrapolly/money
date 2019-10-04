import { CurrencyModel } from './CurrencyModel';
import { ApiModelProperty } from '@nestjs/swagger';

export class GetCurrencyModel {
  @ApiModelProperty({
    description: 'array if currencies',
    type: CurrencyModel,
    isArray: true,
  })
  currencies: CurrencyModel[];
  @ApiModelProperty({ example: 21, description: 'Count of all currencies' })
  count: number;
}

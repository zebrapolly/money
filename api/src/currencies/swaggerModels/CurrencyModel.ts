import { ApiModelProperty } from '@nestjs/swagger';

export class CurrencyModel {
  @ApiModelProperty({ example: 'R01010', description: 'currency ID' })
  ID: string;
  @ApiModelProperty({ example: '036', description: 'numeric currency code' })
  NumCode: string;
  @ApiModelProperty({ example: 'AUD', description: 'char code' })
  CharCode: string;
  @ApiModelProperty({ example: '1', description: 'Currency nominal' })
  Nominal: string;
  @ApiModelProperty({
    example: 'Австралийский доллар',
    description: 'currency name',
  })
  Name: string;
  @ApiModelProperty({ example: '43,7924', description: 'currency value' })
  Value: string;
  @ApiModelProperty({
    example: 1570100580196,
    description: 'Unix date of updation currency',
  })
  UpdatedAt: number;
}

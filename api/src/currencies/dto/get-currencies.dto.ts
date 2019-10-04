import { Currency } from '../interfaces/currency.interface';

export class GetCurrenciesDto {
  readonly currencies: Currency[];
  readonly count: number;
}

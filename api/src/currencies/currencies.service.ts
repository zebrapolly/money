import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Currency } from './interfaces/currency.interface';
import { GetCurrenciesDto } from './dto/get-currencies.dto';

@Injectable()
export class CurrenciesService {
  constructor(
    @Inject('CURRENCY_MODEL') private readonly currencyModel: Model<Currency>,
  ) {}

  async findAll({ skip = 0, limit = 10 }): Promise<GetCurrenciesDto> {
    const query = this.currencyModel
      .find()
      .skip(+skip)
      .limit(+limit)
      .sort('-updatedOn');
    const count = this.currencyModel.count({});

    return await Promise.all([query.exec(), count.exec()]).then(res => ({
      currencies: res[0],
      count: res[1],
    }));
  }

  async findOne(ID): Promise<Currency> {
    const currency = await this.currencyModel.findOne({ ID }).exec();
    if (!currency) {
      throw new NotFoundException();
    }
    return currency;
  }
}

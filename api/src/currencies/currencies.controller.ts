import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrenciesService } from './currencies.service';
import { Currency } from './interfaces/currency.interface';
import { GetCurrenciesDto } from './dto/get-currencies.dto';
import {
  ApiNotFoundResponse,
  ApiResponse,
  ApiUnauthorizedResponse,
  ApiImplicitParam,
} from '@nestjs/swagger';
import { CurrencyModel } from './swaggerModels/CurrencyModel';
import { GetCurrencyModel } from './swaggerModels/GetCurrencyModel';

@Controller('currencies')
@UseGuards(AuthGuard('jwt'))
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'currencies',
    type: GetCurrencyModel,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiImplicitParam({
    name: 'limit',
    description: 'count currencies to return',
    required: false,
  })
  @ApiImplicitParam({
    name: 'skip',
    description: 'skip currencies to return',
    required: false,
  })
  async findAll(@Query() params: { limit: number; skip: number }): Promise<
    GetCurrenciesDto
  > {
    return this.currenciesService.findAll(params);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: CurrencyModel,
  })
  @ApiImplicitParam({ name: 'id', description: 'currency id' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiNotFoundResponse({ description: 'Not found: ' })
  findOne(@Param('id') id: string): Promise<Currency> {
    return this.currenciesService.findOne(id);
  }
}

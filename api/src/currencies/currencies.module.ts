import { Module } from '@nestjs/common';
import { CurrenciesController } from './currencies.controller';
import { CurrenciesService } from './currencies.service';
import { currencyProviders } from './currencies.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CurrenciesController],
  providers: [CurrenciesService, ...currencyProviders],
})
export class CurrenciesModule {}

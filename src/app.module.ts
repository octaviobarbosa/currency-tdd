import { Module } from '@nestjs/common';
import { PrismaService } from './database/prismaService';
import { CurrencyService } from './modules/currency/currency.service';
import { CurrencyRepository } from './modules/currency/currency.repository';
import { CurrencyModule } from './modules/currency/currency.module';
import { ExchangeModule } from './modules/exchange/exchange.module';

@Module({
  imports: [CurrencyModule, ExchangeModule],
  controllers: [],
  providers: [CurrencyService, CurrencyRepository, PrismaService],
})
export class AppModule {}

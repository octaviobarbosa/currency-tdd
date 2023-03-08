import { Module } from '@nestjs/common';
import { ExchangeService } from './exchange.service';
import { ExchangeController } from './exchange.controller';
import { CurrencyModule } from '../currency/currency.module';

@Module({
  imports: [CurrencyModule],
  providers: [ExchangeService],
  controllers: [ExchangeController],
})
export class ExchangeModule {}

import { Module } from '@nestjs/common';
import { CurrencyRepository } from './currency.repository';
import { CurrencyService } from './currency.service';
import { CurrencyController } from './currency.controller';
import { PrismaService } from '../../database/prismaService';

@Module({
  controllers: [CurrencyController],
  providers: [CurrencyService, CurrencyRepository, PrismaService],
  exports: [CurrencyService],
})
export class CurrencyModule {}

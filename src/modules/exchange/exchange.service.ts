import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CurrencyService } from '../currency/currency.service';
import { ConvertAmountInput } from './dto/convertAmountInput.dto';

@Injectable()
export class ExchangeService {
  constructor(private readonly currencyService: CurrencyService) {}

  async convertAmount(data: ConvertAmountInput) {
    const from = await this.currencyService.findCurrency(data.from);
    if (!from) throw new NotFoundException('From currency not found!');
    const to = await this.currencyService.findCurrency(data.to);
    if (!to) throw new NotFoundException('To currency not found!');
    const fromValue = new Prisma.Decimal(from.value).toNumber();
    const toValue = new Prisma.Decimal(to.value).toNumber();
    return (fromValue / toValue) * data.amount;
  }
}

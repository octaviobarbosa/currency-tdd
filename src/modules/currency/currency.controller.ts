import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CurrencyInputDto } from './dto/currencyInput.dto';

@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Post()
  @HttpCode(201)
  createCurrency(@Body() data: CurrencyInputDto) {
    return this.currencyService.createCurrency(data);
  }
}

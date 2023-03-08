import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ConvertAmountInput } from './dto/convertAmountInput.dto';
import { ExchangeService } from './exchange.service';

@Controller('exchange')
export class ExchangeController {
  constructor(private readonly exchangeService: ExchangeService) {}

  @Post()
  @HttpCode(200)
  async calculate(@Body() data: ConvertAmountInput) {
    return this.exchangeService.convertAmount(data);
  }
}

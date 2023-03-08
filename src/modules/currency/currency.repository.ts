import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prismaService';
import { CurrencyInputDto } from './dto/currencyInput.dto';

@Injectable()
export class CurrencyRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async create(data: CurrencyInputDto) {
    const currencyExists = await this.prismaService.currency.findUnique({
      where: {
        currency: data.currency,
      },
    });
    if (currencyExists) {
      throw new BadRequestException('Currency already exists!');
    }
    if (data.value <= 0) {
      throw new BadRequestException('Value must be greater then 0');
    }
    const createdCurrency = await this.prismaService.currency.create({
      data,
    });
    return createdCurrency;
  }

  async find(currency: string) {
    const findCurrency = await this.prismaService.currency.findUnique({
      where: {
        currency,
      },
    });
    return findCurrency;
  }
}

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CurrencyRepository } from './currency.repository';

@Injectable()
export class CurrencyService {
  constructor(private readonly currencyRepository: CurrencyRepository) {}
  async createCurrency(data: { currency: string; value: number }) {
    const currencyExists = await this.currencyRepository.find(data.currency);
    if (currencyExists) {
      throw new BadRequestException('Currency already exists!');
    }
    if (data.value <= 0) {
      throw new BadRequestException('Value must be greater then 0');
    }

    return await this.currencyRepository.create(data);
  }

  async findCurrency(currency: string) {
    const currencyExists = await this.currencyRepository.find(currency);
    if (!currencyExists) {
      throw new NotFoundException('Currency not found!');
    }
    return currencyExists;
  }
}

import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyRepository } from '../currency/currency.repository';
import { CurrencyService } from '../currency/currency.service';
import { ExchangeService } from './exchange.service';

describe('ExchangeService', () => {
  let service: ExchangeService;
  let currencyService: CurrencyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExchangeService,
        CurrencyService,
        { provide: CurrencyRepository, useFactory: () => ({}) },
      ],
    }).compile();

    service = module.get<ExchangeService>(ExchangeService);
    currencyService = module.get<CurrencyService>(CurrencyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('convertAmount()', () => {
    test('should be able to convert currency', async () => {
      currencyService.findCurrency = jest
        .fn()
        .mockResolvedValueOnce({ currenc: 'USD', value: 5.18 })
        .mockResolvedValueOnce({ currenc: 'BRL', value: 1 });
      expect(
        await service.convertAmount({ from: 'USD', to: 'BRL', amount: 2 }),
      ).toEqual(10.36);
    });

    test('should not be able to convert currency when from is not found', async () => {
      currencyService.findCurrency = jest
        .fn()
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce({ currenc: 'BRL', value: 1 });
      await expect(
        service.convertAmount({ from: 'USD', to: 'BRL', amount: 2 }),
      ).rejects.toThrow(new NotFoundException('From currency not found!'));
    });

    test('should not be able to convert currency when to is not found', async () => {
      currencyService.findCurrency = jest
        .fn()
        .mockResolvedValueOnce({ currenc: 'USD', value: 5.18 })
        .mockResolvedValueOnce(null);
      await expect(
        service.convertAmount({ from: 'USD', to: 'BRL', amount: 2 }),
      ).rejects.toThrow(new NotFoundException('To currency not found!'));
    });

    test('should be able to return 0 when amount value is 0', async () => {
      currencyService.findCurrency = jest
        .fn()
        .mockResolvedValueOnce({ currenc: 'USD', value: 5.18 })
        .mockResolvedValueOnce({ currenc: 'BRL', value: 1 });
      expect(
        await service.convertAmount({ from: 'USD', to: 'BRL', amount: 0 }),
      ).toEqual(0);
    });
  });
});

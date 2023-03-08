import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyRepository } from './currency.repository';
import { CurrencyService } from './currency.service';

describe('CurrencyService', () => {
  let service: CurrencyService;
  let currencyRepository: CurrencyRepository;
  let mockData;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CurrencyService,
        {
          provide: CurrencyRepository,
          useFactory: () => ({
            create: jest.fn().mockResolvedValue(mockData),
            find: jest.fn(),
          }),
        },
      ],
    }).compile();

    service = module.get<CurrencyService>(CurrencyService);
    currencyRepository = module.get<CurrencyRepository>(CurrencyRepository);
    mockData = { currency: 'USD', value: 5.18 };
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createCurrency', () => {
    test('should be able to create a new currency', async () => {
      // triple AAA
      // Arrange - configuracao
      const input = {
        currency: 'USD',
        value: 5.18,
      };
      // Act - execucao
      const result = await service.createCurrency(input);
      // Assert - verifica o resultado
      expect(result).toEqual(mockData);
    });

    test('should not be able to create a new currency when currency exists', async () => {
      // triple AAA
      // Arrange - configuracao
      const input = {
        currency: 'BRL',
        value: 1,
      };
      currencyRepository.find = jest.fn().mockResolvedValueOnce(mockData);
      // Act - execucao
      // Assert - verifica o resultado
      await expect(service.createCurrency(input)).rejects.toThrow(
        new BadRequestException('Currency already exists!'),
      );
    });

    test('should not be able to create a new currency when value is equal or less then 0', async () => {
      // triple AAA
      // Arrange - configuracao
      const input = {
        currency: 'USD',
        value: 0,
      };
      // Act - execucao
      // Assert - verifica o resultado
      await expect(service.createCurrency(input)).rejects.toThrow(
        new BadRequestException('Value must be greater then 0'),
      );
    });

    test('should not be able to create a new currency when throw', async () => {
      // triple AAA
      // Arrange - configuracao
      const input = {
        currency: 'USD',
        value: 5.18,
      };
      service.createCurrency = jest.fn().mockRejectedValueOnce(new Error());
      // Act - execucao
      // Assert - verifica o resultado
      await expect(service.createCurrency(input)).rejects.toThrow();
    });
  });

  describe('findCurrency', () => {
    test('should be able to find a currency', async () => {
      // triple AAA
      // Arrange - configuracao
      mockData.currency = 'BRL';
      mockData.value = 1;
      currencyRepository.find = jest.fn().mockResolvedValueOnce(mockData);
      // Act - execucao
      const result = await service.findCurrency('BRL');
      // Assert - verifica o resultado
      expect(result).toEqual(mockData);
    });

    test('should not be able to find a currency when currency exists', async () => {
      // triple AAA
      // Arrange - configuracao
      // Act - execucao
      // Assert - verifica o resultado
      await expect(service.findCurrency('USD')).rejects.toThrow(
        new NotFoundException('Currency not found!'),
      );
    });

    test('should not be able to find a currency when throw', async () => {
      // triple AAA
      // Arrange - configuracao
      service.findCurrency = jest.fn().mockRejectedValueOnce(new Error());
      // Act - execucao
      // Assert - verifica o resultado
      await expect(service.findCurrency('USD')).rejects.toThrow();
    });
  });
});

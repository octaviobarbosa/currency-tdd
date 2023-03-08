import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../database/prismaService';
import { CurrencyRepository } from './currency.repository';

describe('CurrencyRepository', () => {
  let provider: CurrencyRepository;
  let prismaService: PrismaService;
  let mockData;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CurrencyRepository,
        {
          provide: PrismaService,
          useFactory: () => ({
            currency: {
              create: jest.fn().mockResolvedValue(mockData),
              findUnique: jest.fn(),
            },
          }),
        },
      ],
    }).compile();

    provider = module.get<CurrencyRepository>(CurrencyRepository);
    prismaService = module.get<PrismaService>(PrismaService);
    mockData = { currency: 'USD', value: 5.18 };
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  describe('create()', () => {
    test('should be able to create a new currency', async () => {
      expect(await provider.create({ currency: 'USD', value: 5.18 })).toEqual(
        mockData,
      );
    });

    test('should not be able to create a new currency when currency exists', async () => {
      prismaService.currency.findUnique = jest
        .fn()
        .mockResolvedValueOnce(mockData);
      await expect(
        provider.create({ currency: 'USD', value: 5.18 }),
      ).rejects.toThrow(new BadRequestException('Currency already exists!'));
    });

    test('should not be able to create a new currency when value is equal or less then 0', async () => {
      await expect(
        provider.create({ currency: 'USD', value: 0 }),
      ).rejects.toThrow(
        new BadRequestException('Value must be greater then 0'),
      );
    });

    test('should not be able to create a new currency when throw', async () => {
      prismaService.currency.create = jest
        .fn()
        .mockRejectedValueOnce(new Error());
      await expect(
        provider.create({ currency: 'USD', value: 0 }),
      ).rejects.toThrow();
    });
  });

  describe('find()', () => {
    test('should be able to find a currency', async () => {
      prismaService.currency.findUnique = jest
        .fn()
        .mockResolvedValueOnce(mockData);
      expect(await provider.find('USD')).toEqual(mockData);
    });

    test('should be return a emprty obnject when currency not found', async () => {
      prismaService.currency.findUnique = jest.fn().mockResolvedValueOnce(null);
      expect(await provider.find('USD')).toEqual(null);
    });

    test('should not be able to return a currency when throw', async () => {
      prismaService.currency.findUnique = jest
        .fn()
        .mockRejectedValueOnce(new Error());
      await expect(provider.find('USD')).rejects.toThrow();
    });
  });
});

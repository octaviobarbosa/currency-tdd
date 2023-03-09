import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyController } from './currency.controller';
import { CurrencyService } from './currency.service';

describe('CurrencyController', () => {
  let controller: CurrencyController;
  let service: CurrencyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CurrencyController],
      providers: [
        {
          provide: CurrencyService,
          useFactory: () => ({
            createCurrency: jest.fn(),
          }),
        },
      ],
    }).compile();

    controller = module.get<CurrencyController>(CurrencyController);
    service = module.get<CurrencyService>(CurrencyService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('createCurrency()', () => {
    test('should be able to call service convertAmount', async () => {
      await controller.createCurrency({ currency: 'USD', value: 1 });
      expect(service.createCurrency).toBeCalledTimes(1);
      expect(service.createCurrency).toHaveBeenCalledWith({
        currency: 'USD',
        value: 1,
      });
    });

    test('should throw when service convertAmount throw', async () => {
      service.createCurrency = jest.fn().mockRejectedValueOnce(new Error());
      await expect(
        controller.createCurrency({ currency: 'USD', value: 1 }),
      ).rejects.toThrow();
    });
  });
});

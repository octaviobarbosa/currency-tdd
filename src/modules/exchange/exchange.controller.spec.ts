import { Test, TestingModule } from '@nestjs/testing';
import { ExchangeController } from './exchange.controller';
import { ExchangeService } from './exchange.service';

describe('ExchangeController', () => {
  let controller: ExchangeController;
  let service: ExchangeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExchangeController],
      providers: [
        {
          provide: ExchangeService,
          useFactory: () => ({
            convertAmount: jest.fn(),
          }),
        },
      ],
    }).compile();

    controller = module.get<ExchangeController>(ExchangeController);
    service = module.get<ExchangeService>(ExchangeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('calculate()', () => {
    test('should be able to call service convertAmount', async () => {
      await controller.calculate({ from: 'USD', to: 'BRL', amount: 1 });
      expect(service.convertAmount).toBeCalledTimes(1);
      expect(service.convertAmount).toHaveBeenCalledWith({
        from: 'USD',
        to: 'BRL',
        amount: 1,
      });
    });

    test('should throw when service convertAmount throw', async () => {
      service.convertAmount = jest.fn().mockRejectedValueOnce(new Error());
      await expect(
        controller.calculate({ from: 'USD', to: 'BRL', amount: 1 }),
      ).rejects.toThrow();
    });
  });
});

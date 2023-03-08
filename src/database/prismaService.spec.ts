import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prismaService';

describe('PrismaService', () => {
  let provider: PrismaService;
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    provider = module.get<PrismaService>(PrismaService);
    app = module.createNestApplication();
    app.init = jest.fn();
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  test('should be able to call $connect', async () => {
    provider.$connect = jest.fn();
    await provider.onModuleInit();
    expect(provider.$connect).toBeCalled();
  });

  test('should be able to call $on in enableShutdownHooks', async () => {
    provider.$on = jest
      .fn()
      .mockImplementationOnce(async (event, cb) => cb(() => Promise.resolve()));
    await provider.enableShutdownHooks(app);
    expect(provider.$on).toBeCalled();
  });
});

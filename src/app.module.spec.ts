import { Test } from '@nestjs/testing';
import { AppModule } from './app.module';

describe('MyModule', () => {
  let myModule: AppModule;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    myModule = moduleRef.get<AppModule>(AppModule);
  });

  it('should be defined', () => {
    expect(myModule).toBeDefined();
  });
});

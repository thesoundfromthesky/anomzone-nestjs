import { Test, TestingModule } from '@nestjs/testing';
import { ApiConfigController } from './api-config.controller';

describe('ApiConfigController', () => {
  let controller: ApiConfigController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiConfigController],
    }).compile();

    controller = module.get<ApiConfigController>(ApiConfigController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

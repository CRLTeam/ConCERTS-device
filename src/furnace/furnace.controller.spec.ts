import { Test, TestingModule } from '@nestjs/testing';
import { FurnaceController } from './furnace.controller';

describe('FurnaceController', () => {
  let controller: FurnaceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FurnaceController],
    }).compile();

    controller = module.get<FurnaceController>(FurnaceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

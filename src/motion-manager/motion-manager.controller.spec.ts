import { Test, TestingModule } from '@nestjs/testing';
import { MotionManagerController } from './motion-manager.controller';

describe('MotionManagerController', () => {
  let controller: MotionManagerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MotionManagerController],
    }).compile();

    controller = module.get<MotionManagerController>(MotionManagerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

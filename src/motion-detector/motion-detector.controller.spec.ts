import { Test, TestingModule } from '@nestjs/testing';
import { MotionDetectorController } from './motion-detector.controller';

describe('MotionDetectorController', () => {
  let controller: MotionDetectorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MotionDetectorController],
    }).compile();

    controller = module.get<MotionDetectorController>(MotionDetectorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

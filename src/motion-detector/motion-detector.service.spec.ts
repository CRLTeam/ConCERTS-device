import { Test, TestingModule } from '@nestjs/testing';
import { MotionDetectorService } from './motion-detector.service';

describe('MotionDetectorService', () => {
  let service: MotionDetectorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MotionDetectorService],
    }).compile();

    service = module.get<MotionDetectorService>(MotionDetectorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { MotionManagerService } from './motion-manager.service';

describe('MotionManagerService', () => {
  let service: MotionManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MotionManagerService],
    }).compile();

    service = module.get<MotionManagerService>(MotionManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

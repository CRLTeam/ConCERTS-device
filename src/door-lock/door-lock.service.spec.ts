import { Test, TestingModule } from '@nestjs/testing';
import { DoorLockService } from './door-lock.service';

describe('DoorLockService', () => {
  let service: DoorLockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DoorLockService],
    }).compile();

    service = module.get<DoorLockService>(DoorLockService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { FurnaceService } from './furnace.service';

describe('FurnaceService', () => {
  let service: FurnaceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FurnaceService],
    }).compile();

    service = module.get<FurnaceService>(FurnaceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

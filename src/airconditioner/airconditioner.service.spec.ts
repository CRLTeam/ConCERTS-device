import { Test, TestingModule } from '@nestjs/testing';
import { AirconditionerService } from './airconditioner.service';

describe('AirconditionerService', () => {
  let service: AirconditionerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AirconditionerService],
    }).compile();

    service = module.get<AirconditionerService>(AirconditionerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

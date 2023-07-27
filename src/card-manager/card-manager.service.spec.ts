import { Test, TestingModule } from '@nestjs/testing';
import { CardManagerService } from './card-manager.service';

describe('CardManagerService', () => {
  let service: CardManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CardManagerService],
    }).compile();

    service = module.get<CardManagerService>(CardManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

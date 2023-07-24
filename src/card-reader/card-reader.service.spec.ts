import { Test, TestingModule } from '@nestjs/testing';
import { CardReaderService } from './card-reader.service';

describe('CardReaderService', () => {
  let service: CardReaderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CardReaderService],
    }).compile();

    service = module.get<CardReaderService>(CardReaderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

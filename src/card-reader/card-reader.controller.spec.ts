import { Test, TestingModule } from '@nestjs/testing';
import { CardReaderController } from './card-reader.controller';

describe('CardReaderController', () => {
  let controller: CardReaderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardReaderController],
    }).compile();

    controller = module.get<CardReaderController>(CardReaderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

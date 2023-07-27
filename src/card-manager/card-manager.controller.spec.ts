import { Test, TestingModule } from '@nestjs/testing';
import { CardManagerController } from './card-manager.controller';

describe('CardManagerController', () => {
  let controller: CardManagerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardManagerController],
    }).compile();

    controller = module.get<CardManagerController>(CardManagerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

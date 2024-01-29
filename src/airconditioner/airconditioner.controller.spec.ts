import { Test, TestingModule } from '@nestjs/testing';
import { AirconditionerController } from './airconditioner.controller';

describe('AirconditionerController', () => {
  let controller: AirconditionerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AirconditionerController],
    }).compile();

    controller = module.get<AirconditionerController>(AirconditionerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

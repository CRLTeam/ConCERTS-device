import { Test, TestingModule } from '@nestjs/testing';
import { DoorLockController } from './door-lock.controller';

describe('DoorLockController', () => {
  let controller: DoorLockController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoorLockController],
    }).compile();

    controller = module.get<DoorLockController>(DoorLockController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

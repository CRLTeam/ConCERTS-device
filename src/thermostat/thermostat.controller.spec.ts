import { Test, TestingModule } from '@nestjs/testing';
import { ThermostatController } from './thermostat.controller';

describe('ThermostatController', () => {
  let controller: ThermostatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ThermostatController],
    }).compile();

    controller = module.get<ThermostatController>(ThermostatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

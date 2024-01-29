import { Test, TestingModule } from '@nestjs/testing';
import { ThermostatService } from './thermostat.service';

describe('ThermostatService', () => {
  let service: ThermostatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ThermostatService],
    }).compile();

    service = module.get<ThermostatService>(ThermostatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

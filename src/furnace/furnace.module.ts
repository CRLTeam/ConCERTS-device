import { Module } from '@nestjs/common';
import { FurnaceController } from './furnace.controller';
import { FurnaceService } from './furnace.service';

@Module({
  controllers: [FurnaceController],
  providers: [FurnaceService]
})
export class FurnaceModule {}

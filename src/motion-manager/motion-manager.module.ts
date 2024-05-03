import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'
import { MotionManagerController } from './motion-manager.controller';
import { MotionManagerService } from './motion-manager.service';

@Module({
  imports: [HttpModule],
  controllers: [MotionManagerController],
  providers: [MotionManagerService]
})
export class MotionManagerModule {}

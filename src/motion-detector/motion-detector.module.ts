import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'
import { MotionDetectorController } from './motion-detector.controller';
import { MotionDetectorService } from './motion-detector.service';

@Module({
  imports: [HttpModule],
  controllers: [MotionDetectorController],
  providers: [MotionDetectorService]
})
export class MotionDetectorModule {}

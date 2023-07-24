import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CardReaderController } from './card-reader.controller';
import { CardReaderService } from './card-reader.service';

@Module({
  imports: [HttpModule],
  controllers: [CardReaderController],
  providers: [CardReaderService]
})
export class CardReaderModule {}

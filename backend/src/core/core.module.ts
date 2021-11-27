import { Module } from '@nestjs/common';
import { HashService } from './hash/hash.service';
import { ConfigService } from './config/config.service';

@Module({
  providers: [HashService, ConfigService],
  exports: [HashService, ConfigService],
})
export class CoreModule {}

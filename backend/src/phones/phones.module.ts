import { Module } from '@nestjs/common';
import { PhonesController } from './phones.controller';
import { PhonesService } from './phones.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Phone } from './phone.entity';

@Module({
  controllers: [PhonesController],
  providers: [PhonesService],
  imports: [TypeOrmModule.forFeature([Phone])],
})
export class PhonesModule {}

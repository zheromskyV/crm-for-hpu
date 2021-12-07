import { Injectable } from '@nestjs/common';
import { Type } from './type.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '../../core/config/config.service';
import { isEmpty } from 'lodash';
import { GetTypesConfigDto } from './types.dto';
import { ConfigServiceConsumer } from '../../core/config/config.interface';

@Injectable()
export class TypesService implements ConfigServiceConsumer {
  private types: Type[] = [];

  constructor(
    @InjectRepository(Type) private readonly typeRepo: Repository<Type>,
    private readonly configService: ConfigService
  ) {}

  async getConfig(): Promise<GetTypesConfigDto> {
    await this.sync();

    return {
      types: this.configService.map(this.types),
    };
  }

  async getById(typeId: string): Promise<Type> {
    await this.sync();

    return this.types.find(({ id }: Type) => id === typeId);
  }

  async sync(): Promise<void> {
    if (isEmpty(this.types)) {
      this.types = await this.typeRepo.find();
    }
  }
}

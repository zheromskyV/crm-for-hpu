import { Injectable } from '@nestjs/common';
import { ConfigMappable, GetConfigDto } from './config.interface';

@Injectable()
export class ConfigService {
  map(mappable: ConfigMappable): GetConfigDto {
    return mappable.map(({ id, title }) => ({ title, key: id }));
  }
}

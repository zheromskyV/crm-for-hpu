import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { SALT_ROUNDS } from './hash.constants';

@Injectable()
export class HashService {
  async hash(data: string): Promise<string> {
    return hash(data, SALT_ROUNDS);
  }

  async compare(toCheck: string, encrypted: string): Promise<boolean> {
    return compare(toCheck, encrypted);
  }
}

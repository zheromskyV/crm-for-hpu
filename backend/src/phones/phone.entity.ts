import { BaseEntity } from '../base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'phone' })
export class Phone extends BaseEntity {
  @Column({ type: 'varchar', length: 30, nullable: false })
  info: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  number: string;
}

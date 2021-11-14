import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../base.entity';

@Entity({ name: 'profile' })
export class Profile extends BaseEntity {
  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  surname: string;

  @Column({ type: 'date', nullable: false })
  birthday: Date;

  @Column({ type: 'boolean', default: false, nullable: false })
  isVip: boolean;

  @Column({ type: 'varchar', length: 100, nullable: false })
  address: string;
}

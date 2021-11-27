import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../base.entity';
import { Request } from '../request.entity';

@Entity({ name: 'request-type' })
export class Type extends BaseEntity {
  @Column({ type: 'varchar', length: 30, unique: true, nullable: false })
  title: string;

  @OneToMany(() => Request, (req) => req.type)
  requests: Request[];
}

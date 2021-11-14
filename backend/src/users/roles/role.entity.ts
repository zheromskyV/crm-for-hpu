import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../base.entity';
import { User } from '../user.entity';

@Entity({ name: 'role' })
export class Role extends BaseEntity {
  @Column({ type: 'varchar', length: 30, unique: true, nullable: false })
  title: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}

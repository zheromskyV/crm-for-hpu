import { Entity, Column, JoinColumn, OneToOne, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { Profile } from './profiles/profile.entity';
import { Role } from './roles/role.entity';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  password: string;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;
}

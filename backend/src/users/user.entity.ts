import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { Profile } from './profiles/profile.entity';
import { Role } from './roles/role.entity';
import { Request } from '../requests/request.entity';
import { Feed } from '../requests/feeds/feed.entity';

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

  @OneToMany(() => Request, (request) => request.createdBy)
  createdRequests: Request[];

  @OneToMany(() => Request, (request) => request.assignedTo)
  assignedRequests: Request[];

  @OneToMany(() => Feed, (feed) => feed.createdBy)
  createdFeeds: Feed[];
}

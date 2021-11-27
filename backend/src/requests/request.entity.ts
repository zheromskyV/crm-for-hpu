import { Entity, Column, ManyToOne, Generated, OneToMany } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { Type } from './types/type.entity';
import { Status } from './statuses/status.entity';
import { User } from '../users/user.entity';
import { Feed } from './feeds/feed.entity';

@Entity({ name: 'request' })
export class Request extends BaseEntity {
  @Column()
  @Generated('increment')
  code: number;

  @Column({ type: 'text', nullable: false })
  message: string;

  @Column({ type: 'integer', nullable: false })
  urgency: number;

  @ManyToOne(() => Type, (type) => type.requests)
  type: Type;

  @ManyToOne(() => Status, (status) => status.requests)
  status: Status;

  @ManyToOne(() => User, (user) => user.createdRequests)
  createdBy: User;

  @ManyToOne(() => User, (user) => user.assignedRequests)
  assignedTo: User;

  @OneToMany(() => Feed, (feed) => feed.request)
  feeds: Feed[];

  @Column({ type: 'varchar', length: 100, nullable: true })
  mailTo?: string; // email

  @Column({ type: 'varchar', length: 100, nullable: true })
  subject?: string; // email

  @Column({ type: 'integer', nullable: true })
  linkedRequestCode?: number; // email

  @Column({ type: 'boolean', nullable: true })
  researchParticipation?: boolean; // feedback

  @Column({ type: 'integer', nullable: true })
  rating?: number; // feedback

  @Column({ type: 'integer', nullable: true })
  numberOfAffected?: number; // bug
}

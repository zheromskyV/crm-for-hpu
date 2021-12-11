import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../base.entity';
import { Request } from '../request.entity';
import { User } from '../../users/user.entity';

@Entity({ name: 'request-feed' })
export class Feed extends BaseEntity {
  @Column({ type: 'text', nullable: false })
  message: string;

  @ManyToOne(() => Request, (req) => req.feeds, { onDelete: 'CASCADE' })
  request: Request;

  @ManyToOne(() => User, (user) => user.createdFeeds)
  createdBy: User;
}

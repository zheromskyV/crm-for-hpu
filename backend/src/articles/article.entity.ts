import { BaseEntity } from '../base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'article' })
export class Article extends BaseEntity {
  @Column({ type: 'varchar', length: 100, nullable: false })
  title: string;

  @Column({ type: 'text', nullable: false })
  summary: string;

  @Column({ type: 'text', nullable: false })
  body: string;
}

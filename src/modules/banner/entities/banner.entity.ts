import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { BannerType } from './type.status';

@Entity('banner')
export class Banner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => BannerType, { eager: true })
  type: BannerType;

  @Column({ type: 'enum', enum: BannerType })
  typeId: BannerType;

  @Column({ nullable: true })
  image: string;
}

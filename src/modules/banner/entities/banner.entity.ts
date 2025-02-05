import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BannerType } from './type.status';

@Entity('banner')
export class Banner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;


  @ManyToOne(() => BannerType, (type) => type.type,{ eager: true })
  @JoinColumn({ name: 'type_id' }) 
  type: BannerType;

  @Column({ nullable: true })
  image: string;
}

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum BannerTypeEnum {
  CATEGORY = 'category',
  PRODUCT = 'product',
}

@Entity('banner_type')
export class BannerType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: BannerTypeEnum })
  type: BannerTypeEnum; // 'category' or 'product'
}

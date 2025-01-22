import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'modules/product/entities/product.entity';
import banner from '..';

@Entity()
export class Banner {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: 'Bannerning unikal identifikatori',
    example: 1,
  })
  id: number;

  @Column()
  @ApiProperty({
    description: 'Banner nomi',
    example: 'Product Banner',
  })
  title: string;

  @Column({ nullable: true })
  @ApiProperty({
    description: 'Banner haqida qisqacha tavsif',
    example: 'This is a special banner for our product.',
    required: false,
  })
  description: string;

  @Column()
  @ApiProperty({
    description: 'Banner turi (product yoki category)',
    example: 1,
  })
  type_id: number;

  @Column({ nullable: true })
  @ApiProperty({
    description: 'Banner rasmi URL yoki fayl nomi',
    example: '1636545646365-banner.jpg',
    required: false,
  })
  image: string;

  @ManyToOne(()=> Product,(product) => product.banner)
  product: Product
}

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

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
    example: 1, // Misol uchun, 1 - product, 2 - category
  })
  type_id: number;

  @Column({ nullable: true })
  @ApiProperty({
    description: 'Banner rasmi URL yoki fayl nomi',
    example: '1636545646365-banner.jpg',
    required: false,
  })
  image: string;
}

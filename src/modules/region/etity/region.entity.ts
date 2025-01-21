import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Region {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: 'Region unikal identifikatori',
    example: 1,
  })
  id: number;

  @Column()
  @ApiProperty({
    description: 'Region nomi',
    example: 'Region name',
  })
  name: string;
}

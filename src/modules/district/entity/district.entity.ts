import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class District {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: 'Distract unikal identifikatori',
    example: 1,
  })
  id: number;

  @Column()
  @ApiProperty({
    description: 'Distract nomi',
    example: 'Distract name',
  })
  name: string;

  @Column()
  @ApiProperty({
    description: 'Re',
    example: 1,
  })
  region_id: number;
}

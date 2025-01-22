import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Type {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Type ID', example: 1 })
  id: number;

  @Column()
  @ApiProperty({ description: 'Type nomi', example: 'Product' })
  name: string;

  //   @OneToMany(() => Banner, (banner) => banner.type)
  //   banners: Banner[];
}

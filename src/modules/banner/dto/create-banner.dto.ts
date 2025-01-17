import { IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBannerDto {
  @ApiProperty({
    description: 'Banner rasmi URL manzili',
    example: 'https://example.com/banner.jpg',
  })
  @IsString()
  image: string;

  @ApiProperty({
    description: 'Banner nomi',
    example: 'Product Banner',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Banner haqida qisqacha tavsif',
    example: 'This is a special banner for our product.',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Banner turi (product yoki category)',
    example: 1,
  })
  @IsInt()
  type_id: number;

  @ApiProperty({
    description: 'Brand nomi',
    example: 'Product Brand',
    required: true,
  })
  @IsString()
  name: string;
}

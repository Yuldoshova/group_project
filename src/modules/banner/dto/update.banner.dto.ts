import { IsString, IsInt, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBannerDto {
  @ApiProperty({
    description: 'Banner rasmi URL manzili',
    example: 'https://example.com/banner-updated.jpg',
    required: false,
  })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({
    description: 'Banner nomi',
    example: 'Updated Product Banner',
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    description: 'Banner haqida qisqacha tavsif',
    example: 'Updated description for our product banner.',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Banner turi (product yoki category)',
    example: 2,
    required: false,
  })
  @IsOptional()
  @IsInt()
  type_id?: number;
}

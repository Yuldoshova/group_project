import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateBannerDto {
  @ApiProperty({
    description: 'Banner sarlavhasi',
    example: 'Yangi aksiya',
    required: true,
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Banner tavsifi',
    example: 'Aksiya haqida batafsil malumot',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Banner turi ID si',
    example: 1,
    required: true,
  })
  @IsNumber()
  @Transform(({ value }) => Number(value))
  typeId: number;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Banner rasmi',
    required: false,
  })
  @IsOptional()
  image?: any;
}

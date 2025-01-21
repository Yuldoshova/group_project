import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateVariationDto {
  @ApiProperty({
    example: 'Size',
    description: 'Name of the variation',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 1,
    description: 'Category ID that the variation belongs to',
    required: true,
  })
  @IsInt()
  @IsNotEmpty()
  category_id: number;
}

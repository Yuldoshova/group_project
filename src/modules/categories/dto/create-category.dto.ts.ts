import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

@ApiSchema({ name: 'CreateCategoryRequest' })
export class CreateCategoryDto {
  @ApiProperty({
    type: 'string',
    required: true,
    example: 'example category',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: 'number',
    required: false,
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  brend_id?: number;

  @ApiProperty({
    type: 'number',
    required: false,
    example: 2,
  })
  @IsOptional()
  @IsNumber()
  parent_id?: number;

  @ApiProperty({
    type: 'string',
    required: false,
    example: 'image-url.jpg',
  })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({
    type: 'string',
    required: false,
    example: '📱',
  })
  @IsOptional()
  @IsString()
  icon?: string;
}

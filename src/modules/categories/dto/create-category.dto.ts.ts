import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@ApiSchema({ name: 'CareteCategoryRequest' })
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
    required: true,
    example: 1,
  })
  // @IsNumber()
  // @IsNotEmpty()
  brend_id?: number;

  @ApiProperty({
    type: 'number',
    required: true,
    example: 2,
  })
  // @IsNumber()
  // @IsNotEmpty()
  parent_id?: number;

  @ApiProperty({
    type: 'string',
    required: true,
  })
  // @IsString()
  // @IsNotEmpty()
  image?: string;

  @ApiProperty({
    type: 'string',
    required: true,
    example: '📱',
  })
  // @IsString()
  // @IsNotEmpty()
  icon?: string;
}

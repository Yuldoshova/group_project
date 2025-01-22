import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

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
    required: false,
    example: 2,
  })
  // @IsNumber()
  // @IsNotEmpty()
  parent_id?: number;

  @ApiProperty({
    type: String,
    format: 'binary',
    required: false,
  })
  @IsOptional()
  image?: Express.Multer.File;

  @ApiProperty({
      type: String,
      format: 'binary',
      required: false,
    })
    @IsOptional()
  icon?: Express.Multer.File;
}

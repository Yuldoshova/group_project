import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateBrandDto {
  @IsString()
  @IsOptional()
  @MaxLength(50)
  @ApiProperty({
    description: 'The name of the brand',
    example: 'Nike',
    required: false,
  })
  name?: string;
}

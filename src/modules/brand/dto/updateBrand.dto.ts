import { IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBrandDto {
  @IsString()
  @MaxLength(50)
  @ApiProperty({
    description: 'The name of the brand',
    example: 'Nike',
    required: false,
  })
  name?: string;
}

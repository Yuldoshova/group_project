import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateBrandDto {
  @ApiPropertyOptional({
    example: 'Nike',
    description: 'Name of the brand',
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  name?: string;

  @ApiPropertyOptional({
    example: 'A leading sportswear and equipment brand.',
    description: 'Description of the brand',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;

  @ApiPropertyOptional({
    example: 'https://example.com/logo.jpg',
    description: 'URL of the brand logo',
  })
  @IsOptional()
  @IsString()
  logo?: string;
}

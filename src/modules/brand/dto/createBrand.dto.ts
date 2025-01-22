import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateBrandDto {
  @ApiProperty({
    example: 'Nike',
    description: 'Name of the brand',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @ApiProperty({
    example: 'A leading sportswear and equipment brand.',
    description: 'Description of the brand',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  description: string;

  @ApiProperty({
    example: 'https://example.com/logo.jpg',
    description: 'URL of the brand logo',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  logo: string;
}


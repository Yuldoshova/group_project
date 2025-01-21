import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAddressDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'City of the address',
    example: 'Tashkent',
    required: false,
  })
  city?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Street name of the address',
    example: 'Navoi Street',
    required: false,
  })
  street?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'House number of the address',
    example: '15A',
    required: false,
  })
  house_number?: string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    description: 'District ID for the address',
    example: 5,
  })
  district_id: number;
}

import { IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDistrictDto {
  @ApiProperty({
    description: 'Distract nomi',
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Region (mintaqa) id',
    example: 1,
  })
  @IsInt()
  region_id: number;
}

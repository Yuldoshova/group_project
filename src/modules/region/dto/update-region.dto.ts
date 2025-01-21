import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRegionDto {
  @ApiProperty({
    description: 'Region nomi',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}

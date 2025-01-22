import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTypeDto {
  @ApiProperty({
    description: 'Type nomi',
    example: 'Updated Product',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;
}

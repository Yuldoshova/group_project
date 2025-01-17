import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTypeDto {
  @ApiProperty({
    description: 'Type nomi',
    example: 'Product',
  })
  @IsString()
  name: string;
}

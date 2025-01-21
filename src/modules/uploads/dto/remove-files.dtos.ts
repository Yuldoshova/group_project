import { IsNotEmpty, IsString } from 'class-validator';
import { RemoveFileRequest } from '../interfaces/remove-file.interfaces';
import { ApiProperty } from '@nestjs/swagger';

export class RemoveFileDto implements RemoveFileRequest {
  @ApiProperty({
    type: 'string',
    required: true,
    description: 'Name of the file to be removed',
  })
  @IsString()
  @IsNotEmpty()
  fileName: string;
}

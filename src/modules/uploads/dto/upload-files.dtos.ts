import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UploadFileRequest } from '../interfaces/upload-file.interfaces';

export class UploadFileDto implements Omit<UploadFileRequest, 'file'> {
  @ApiProperty({
    type: 'string',
    required: true,
    description: 'Destination directory for the uploaded file',
  })
  @IsString()
  @IsNotEmpty()
  destination: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: true,
    description: 'The file to be uploaded',
  })
  @IsNotEmpty()
  file: any;
}

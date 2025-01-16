import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-users.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserRoles } from 'utils/user-role.enum';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    
  @ApiPropertyOptional({
    example: 'John',
    description: 'First name of the user',
  })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiPropertyOptional({
    example: 'Doe',
    description: 'Last name of the user',
  })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email address of the user',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({
    example: UserRoles.ADMIN,
    description: 'Role of the user',
    enum: UserRoles,
    enumName: 'UserRoles',
  })
  @IsOptional()
  @IsEnum(UserRoles)
  role?: UserRoles;


}

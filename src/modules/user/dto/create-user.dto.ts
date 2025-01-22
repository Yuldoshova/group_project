import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserRoles } from 'utils/user-role.enum';

export class CreateUserDto {
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
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiPropertyOptional({
    example: 1,
    description: 'Address ID (optional during user creation)',
  })
  @IsOptional()
  address_id?: number

  @ApiPropertyOptional({
    example: 1,
    description: 'Review ID (optional during user creation)',
  })
  @IsOptional()
  review_id?: number

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

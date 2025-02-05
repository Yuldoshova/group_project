import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';
import { User } from 'src/modules/user';

export class CreateCardDto {
  @ApiProperty({
    example: 1,
    description: 'ID of the user associated with the card',
    required: true,
  })
  @IsInt()
  @IsNotEmpty()
  user_id: User;
}

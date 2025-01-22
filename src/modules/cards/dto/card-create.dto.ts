import { IsInt } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateCardDto {
    @ApiProperty({ description: 'User ID for the card', example: 1 })
    @IsInt()
    user_id: number;
}

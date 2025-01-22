import { IsInt } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCardDto {
    @ApiProperty({ description: 'User ID to update the card', example: 1 })
    @IsInt()
    user_id: number;
}

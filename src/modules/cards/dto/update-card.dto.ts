import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsOptional } from "class-validator";

export class UpdateCardDto{
    @ApiPropertyOptional({
        example: 1,
        description: 'ID of the user associated with the card',
    })
    @IsInt()
    @IsOptional()
    user_id: number
}




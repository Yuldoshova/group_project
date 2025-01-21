import { IsInt } from "class-validator";

export class UpdateCardDto{
    @IsInt()
    user_id: number
}
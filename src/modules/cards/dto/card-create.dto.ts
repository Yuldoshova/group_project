import { IsInt } from "class-validator";

export class CreateCardDto{
    @IsInt()
    user_id: number
}
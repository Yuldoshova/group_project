import { IsInt, IsOptional } from "class-validator";

export class CreateCartItemDto{
    @IsInt()
    @IsOptional()
    card_id?: number

    @IsInt()
    @IsOptional()
    product_item_id?: number

    @IsInt()
    quantity: number
}
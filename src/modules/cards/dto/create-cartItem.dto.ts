import { IsInt, IsOptional } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateCartItemDto {
    @ApiProperty({ description: 'Quantity of the product', example: 5 })
    @IsInt()
    quentity: number;

    @ApiProperty({ description: 'Product item ID', example: 2, required: false })
    @IsInt()
    @IsOptional()
    product_item_id: number;

    @ApiProperty({ description: 'Card ID', example: 1, required: false })
    @IsInt()
    @IsOptional()
    card_id: number;
}

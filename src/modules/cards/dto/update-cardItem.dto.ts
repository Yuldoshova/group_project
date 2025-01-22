import { IsInt, IsPositive, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCartItemDto {
  @ApiProperty({ description: 'Quantity of the product', example: 5, required: false })
  @IsInt()
  @IsPositive()
  @IsOptional() 
  quentity?: number;

  @ApiProperty({ description: 'Product item ID', example: 2, required: false })
  @IsInt()
  @IsPositive()
  @IsOptional()  
  product_item_id?: number;

  @ApiProperty({ description: 'Card ID', example: 1, required: false })
  @IsInt()
  @IsPositive()
  @IsOptional() 
  card_id?: number;
}

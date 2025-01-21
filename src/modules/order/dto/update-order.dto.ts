import { IsNotEmpty, IsNumber, IsDate, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '../entity/orderEnum.status';

export class UpdateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'ID of the user associated with the order' })
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'Total price of the order' })
  totalPrice: number;

  @IsNotEmpty()
  @IsEnum(OrderStatus)
  @ApiProperty({
    description: 'Status of the order',
    enum: OrderStatus,
  })
  status: OrderStatus;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty({
    description: 'Order creation date',
    type: String,
    format: 'date',
  })
  orderDate: Date;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'ID of the order item(s)' })
  orderItemsId: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'ID of the order address' })
  orderAddressId: number;
}

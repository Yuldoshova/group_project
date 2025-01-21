import { IsNotEmpty, IsArray, IsEnum, IsNumber, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '../entity/orderEnum.status';
import { CreateOrderItemDto } from './create-orderItem.dto';
export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'User ID' })
  userId: number;

  @IsEnum(OrderStatus)
  @ApiProperty({ description: 'Order status' })
  status: OrderStatus;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'Total Price' })
  totalPrice: number;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty({ description: 'Order Date' })
  orderDate: Date;

  @IsArray()
  @ApiProperty({ type: [CreateOrderItemDto], description: 'Order Items' })
  orderItems: CreateOrderItemDto[];

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  orderAddressId: number;
}

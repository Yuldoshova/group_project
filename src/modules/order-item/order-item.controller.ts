import { Controller, Post, Get, Delete, Body, Param } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateOrderItemDto } from './dto/create-order-item.dto';


@ApiTags('Order Items')
@Controller('order-items')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Post()
  @ApiOperation({ summary: 'Create an order item' })
  @ApiResponse({ status: 201, description: 'Order item created successfully.' })
  create(@Body() dto: CreateOrderItemDto) {
    return this.orderItemService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all order items' })
  @ApiResponse({ status: 200, description: 'List of all order items.' })
  findAll() {
    return this.orderItemService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order item by ID' })
  @ApiResponse({ status: 200, description: 'Order item details.' })
  findOne(@Param('id') id: number) {
    return this.orderItemService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an order item' })
  @ApiResponse({ status: 200, description: 'Order item deleted successfully.' })
  remove(@Param('id') id: number) {
    return this.orderItemService.delete(id);
  }
}

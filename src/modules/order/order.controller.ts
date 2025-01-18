import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dtor';
import { UpdateOrderDto } from './dto/update-order.dto';

@ApiTags('Orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({ summary: 'Create an order' })
  @ApiResponse({ status: 201, description: 'Order created successfully.' })
  create(@Body() dto: CreateOrderDto) {
    return this.orderService.createOrder(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({ status: 200, description: 'List of all orders.' })
  findAll() {
    return this.orderService.getAllOrders();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order by ID' })
  @ApiResponse({ status: 200, description: 'Order details.' })
  findOne(@Param('id') id: number) {
    return this.orderService.getOrderById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an order' })
  @ApiResponse({ status: 200, description: 'Order updated successfully.' })
  update(@Param('id') id: number, @Body() dto: UpdateOrderDto) {
    return this.orderService.updateOrder(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an order' })
  @ApiResponse({ status: 200, description: 'Order deleted successfully.' })
  remove(@Param('id') id: number) {
    return this.orderService.deleteOrder(id);
  }
}

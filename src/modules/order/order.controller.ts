// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Param,
//   Put,
//   Delete,
// } from '@nestjs/common';
// import { ApiTags } from '@nestjs/swagger';
// import { OrderService } from './order.service';
// import { CreateOrderDto } from './dto/create-order.dto';
// import { Order } from './entity/order.entity';

// @ApiTags('orders')
// @Controller('orders')
// export class OrderController {
//   constructor(private readonly orderService: OrderService) {}

//   @Post()
//   async create(@Body() createOrderDto: CreateOrderDto) {
//     return this.orderService.createOrder(createOrderDto);
//   }

//   @Get()
//   async findAll(): Promise<Order[]> {
//     return this.orderService.findAll();
//   }

//   @Get(':id')
//   async findOne(@Param('id') id: number): Promise<Order> {
//     return this.orderService.findOne(id);
//   }

//   @Put(':id')
//   async update(
//     @Param('id') id: number,
//     @Body() updateOrderDto: CreateOrderDto,
//   ): Promise<Order> {
//     return this.orderService.update(id, updateOrderDto);
//   }

//   @Delete(':id')
//   async remove(@Param('id') id: number): Promise<void> {
//     return this.orderService.remove(id);
//   }
// }

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entity/order.entity';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({
    status: 201,
    description: 'The order has been successfully created.',
    type: Order,
  })
  async create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(createOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({
    status: 200,
    description: 'Return a list of all orders.',
    type: [Order],
  })
  async findAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Order ID' })
  @ApiResponse({
    status: 200,
    description: 'Return the order with the given ID.',
    type: Order,
  })
  @ApiResponse({
    status: 404,
    description: 'Order not found.',
  })
  async findOne(@Param('id') id: number): Promise<Order> {
    return this.orderService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update order by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Order ID' })
  @ApiResponse({
    status: 200,
    description: 'The order has been successfully updated.',
    type: Order,
  })
  @ApiResponse({
    status: 404,
    description: 'Order not found.',
  })
  async update(
    @Param('id') id: number,
    @Body() updateOrderDto: CreateOrderDto,
  ): Promise<Order> {
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete order by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Order ID' })
  @ApiResponse({
    status: 204,
    description: 'The order has been successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Order not found.',
  })
  async remove(@Param('id') id: number): Promise<void> {
    return this.orderService.remove(id);
  }
}

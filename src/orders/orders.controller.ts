import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { CreateOrderDto, UpdateOrderDto } from 'src/dto/order.dto';
import { IsQuantityPositivePipe } from 'src/is-quantity-positive/is-quantity-positive.pipe';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(60000)
  getOrders(@Request() req) {
    return this.ordersService.getOrders(req.farmer.sub);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.Farmer)
  @UsePipes(ValidationPipe, new IsQuantityPositivePipe())
  createOrder(@Request() req, @Body() createOrder: CreateOrderDto) {
    return this.ordersService.createOrder(req.farmer.sub, createOrder);
  }

  @Patch()
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  updateOrder(@Body() createOrder: UpdateOrderDto) {
    return this.ordersService.updateOrder(createOrder);
  }
}

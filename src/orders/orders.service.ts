import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto } from 'src/dto/order.dto';
import { Farmer } from 'src/entities/farmer.entity';
import { Order } from 'src/entities/order.entity';
import { Role } from 'src/enums/role.enum';
import { FarmersService } from 'src/farmers/farmers.service';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(Farmer)
    private farmerRepository: Repository<Farmer>,
    private farmerService: FarmersService,
  ) {}

  async createOrder(farmerId: number, createOrder) {
    const farmer = await this.farmerRepository.findOneBy({ id: farmerId });
    const newOrder = this.ordersRepository.create({
      ...createOrder,
      farmer: farmer,
    });
    return this.ordersRepository.save(newOrder);
  }

  async getOrders(farmerId: number): Promise<Order[]> {
    const farmer = await this.farmerService.getFarmerByIdWithOrders(farmerId);

    if (farmer.roles.includes(Role.Admin)) {
      return this.ordersRepository.find();
    } else {
      return farmer.orders ?? [];
    }
  }

  async updateOrder(updateOrder: Partial<CreateOrderDto>) {
    const order = await this.ordersRepository.findOneBy({
      id: updateOrder.id,
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${updateOrder.id} not found`);
    }
    Object.assign(order, updateOrder);
    return this.ordersRepository.save(order);
  }
}

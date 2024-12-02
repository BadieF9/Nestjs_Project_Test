import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto } from 'src/dto/order.dto';
import { Farmer } from 'src/entities/farmer.entity';
import { Order } from 'src/entities/order.entity';
import { Role } from 'src/enums/role.enum';
import { FarmersService } from 'src/farmers/farmers.service';
import { SilosService } from 'src/silos/silos.service';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    private farmersService: FarmersService,
    private silosService: SilosService,
  ) {}

  async createOrder(farmerId: number, createOrder: CreateOrderDto) {
    const farmer = await this.farmersService.getFarmerById(farmerId);
    const silo = await this.silosService.getSiloById(createOrder.siloId);

    if (!silo) {
      throw new NotFoundException(
        `Order with ID ${createOrder.siloId} not found`,
      );
    }

    if (silo.currentStock < createOrder.quantity) {
      throw new HttpException(
        'There is not enough stock in the silo',
        HttpStatus.CONFLICT,
      );
    }

    const newOrder = this.ordersRepository.create({
      ...createOrder,
      farmer,
      silo,
    });
    return this.ordersRepository.save(newOrder);
  }

  async getOrdersWithPagination(
    farmerId: number,
    page: number,
    pageSize: number,
  ): Promise<Order[]> {
    const skip = (page - 1) * pageSize;
    const farmer =
      await this.farmersService.getFarmerByIdWithOrdersAndPagination(
        farmerId,
        page,
        pageSize,
      );

    if (farmer.roles.includes(Role.Admin)) {
      return this.ordersRepository.find({
        skip,
        take: pageSize,
      });
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

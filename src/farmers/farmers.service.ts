import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Farmer } from 'src/entities/farmer.entity';
import { Order } from 'src/entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FarmersService {
  constructor(
    @InjectRepository(Farmer)
    private farmersRepository: Repository<Farmer>,
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  async getFarmerById(id: number): Promise<Farmer> {
    return await this.farmersRepository.findOneBy({ id });
  }

  async getFarmerByIdWithOrdersAndPagination(
    id: number,
    page: number,
    pageSize: number,
  ): Promise<Farmer> {
    const skip = (page - 1) * pageSize;

    const farmer = await this.farmersRepository.findOne({
      where: { id },
      relations: ['orders'],
    });

    if (farmer) {
      const [orders, _total] = await this.ordersRepository.findAndCount({
        where: { farmer: farmer },
        skip,
        take: pageSize,
      });

      farmer.orders = orders;
    }
    return farmer;
  }
}

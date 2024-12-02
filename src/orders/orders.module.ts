import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/entities/order.entity';
import { Farmer } from 'src/entities/farmer.entity';
import { SilosService } from 'src/silos/silos.service';
import { Silo } from 'src/entities/silo.entity';
import { FarmersService } from 'src/farmers/farmers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Farmer, Silo])],
  providers: [OrdersService, SilosService, FarmersService],
  controllers: [OrdersController],
  exports: [OrdersService],
})
export class OrdersModule {}

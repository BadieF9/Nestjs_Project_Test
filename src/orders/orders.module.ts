import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/entities/order.entity';
import { Farmer } from 'src/entities/farmer.entity';
import { FarmersModule } from 'src/farmers/farmers.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Farmer]), FarmersModule],
  providers: [OrdersService],
  controllers: [OrdersController],
  exports: [OrdersService],
})
export class OrdersModule {}

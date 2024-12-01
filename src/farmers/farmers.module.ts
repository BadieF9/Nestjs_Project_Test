import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Farmer } from 'src/entities/farmer.entity';
import { FarmersService } from './farmers.service';
import { Order } from 'src/entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Farmer, Order])],
  providers: [FarmersService],
  exports: [FarmersService],
})
export class FarmersModule {}

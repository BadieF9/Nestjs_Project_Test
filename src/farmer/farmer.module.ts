import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Farmer } from 'src/entities/farmer.entity';
import { FarmerService } from './farmer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Farmer])],
  providers: [FarmerService],
  exports: [FarmerService],
})
export class FarmerModule {}

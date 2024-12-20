import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Farmer } from 'src/entities/farmer.entity';
import { FarmersService } from './farmers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Farmer])],
  providers: [FarmersService],
  exports: [FarmersService],
})
export class FarmersModule {}

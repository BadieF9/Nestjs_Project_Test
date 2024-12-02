import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Silo } from 'src/entities/silo.entity';
import { SilosService } from './silos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Silo])],
  providers: [SilosService],
  exports: [SilosService],
})
export class SilosModule {}

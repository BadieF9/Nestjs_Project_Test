import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Farmer } from 'src/entities/farmer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FarmerService {
  constructor(
    @InjectRepository(Farmer)
    private farmersRepository: Repository<Farmer>,
  ) {}

  getFarmerById(id: number): Promise<Farmer> {
    return this.farmersRepository.findOneBy({ id });
  }
}

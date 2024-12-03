import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Farmer } from 'src/entities/farmer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FarmersService {
  constructor(
    @InjectRepository(Farmer)
    private farmersRepository: Repository<Farmer>,
  ) {}

  async getFarmerById(id: number): Promise<Farmer> {
    return await this.farmersRepository.findOneBy({ id });
  }

  async getFarmerByEmail(email: string): Promise<Farmer> {
    return await this.farmersRepository.findOneBy({ email });
  }
}

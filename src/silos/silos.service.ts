import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Silo } from 'src/entities/silo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SilosService {
  constructor(
    @InjectRepository(Silo)
    private silosRepository: Repository<Silo>,
  ) {}

  async getSiloById(id: number): Promise<Silo> {
    return await this.silosRepository.findOneBy({ id });
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Farmer } from 'src/entities/farmer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Farmer)
    private farmersRepository: Repository<Farmer>,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const farmer = await this.farmersRepository.findOneBy({ email });
    
    if (!farmer || farmer?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: farmer.id, email: farmer.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}

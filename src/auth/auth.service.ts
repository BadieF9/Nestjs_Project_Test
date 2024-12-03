import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FarmersService } from 'src/farmers/farmers.service';

@Injectable()
export class AuthService {
  constructor(
    private farmersService: FarmersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const farmer = await this.farmersService.getFarmerByEmail(email);

    if (!farmer || farmer?.password !== pass) {
      throw new UnauthorizedException();
    }

    const payload = { sub: farmer.id, email: farmer.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}

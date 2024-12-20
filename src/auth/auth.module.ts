import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Farmer } from 'src/entities/farmer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { FarmersService } from 'src/farmers/farmers.service';
import { Order } from 'src/entities/order.entity';

@Global()
@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' },
    }),
    TypeOrmModule.forFeature([Farmer, Order]),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    FarmersService,
    AuthService,
  ],
})
export class AuthModule {}

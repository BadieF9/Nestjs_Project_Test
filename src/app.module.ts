import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Farmer } from './entities/farmer.entity';
import { Order } from './entities/order.entity';
import { Silo } from './entities/silo.entity';
import { AuthModule } from './auth/auth.module';
import { FarmerModule } from './farmer/farmer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env', // Specify the path to your .env file
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST || '127.0.0.1',
        port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432, // Default port for postgresql
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [Farmer, Order, Silo],
        synchronize: true,
      }),
    }),
    AuthModule,
    FarmerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

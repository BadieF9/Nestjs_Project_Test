import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsOptional()
  id: number;

  @IsNumber()
  siloId: number;

  @IsString()
  grainType: string;

  @IsNumber()
  quantity: number;

  @IsString()
  status: string;
}

export class UpdateOrderDto {
  @IsNumber()
  id: number;

  @IsNumber()
  @IsOptional()
  siloId: number;

  @IsString()
  @IsOptional()
  grainType: string;

  @IsNumber()
  @IsOptional()
  quantity: number;

  @IsString()
  @IsOptional()
  status: string;
}

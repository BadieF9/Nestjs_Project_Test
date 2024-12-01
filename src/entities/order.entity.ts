import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Farmer } from './farmer.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  grainType: string;

  @Column()
  quantity: number;

  @Column()
  status: string;

  @ManyToOne(() => Farmer, (farmer) => farmer.orders)
  farmer: Farmer;
}

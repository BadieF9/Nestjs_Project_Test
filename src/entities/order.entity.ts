import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Farmer } from './farmer.entity';
import { Silo } from './silo.entity';
import { OrderStatus } from 'src/enums/order-status.enum';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  grainType: string;

  @Column()
  quantity: number;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  @ManyToOne(() => Silo, (silo) => silo.orders)
  silo: Silo;

  @ManyToOne(() => Farmer, (farmer) => farmer.orders)
  farmer: Farmer;
}

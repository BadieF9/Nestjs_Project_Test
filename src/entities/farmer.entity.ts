import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';
import { Role } from 'src/enums/role.enum';

@Entity()
export class Farmer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: Role, array: true, default: [Role.Farmer] })
  roles: Role[];

  @OneToMany(() => Order, (order) => order.farmer)
  orders: Order[];
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Silo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  capacity: number;

  @Column()
  currentStock: number;
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { Viaje } from "./viaje.entity";

@Entity()
export class Factura {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idViaje: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  totalItbis: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  subTotal: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  total: number;

  @OneToOne(() => Viaje)
  @JoinColumn({ name: "idViaje" })
  viaje: Viaje;
}

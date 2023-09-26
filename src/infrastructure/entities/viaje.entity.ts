import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Conductor } from "./conductor.entity";
import { Pasajero } from "./pasajero.entity";

@Entity()
export class Viaje {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Conductor)
  @JoinColumn({ name: "idConductor" })
  conductor: Conductor;

  @ManyToOne(() => Pasajero)
  @JoinColumn({ name: "idPasajero" })
  pasajero: Pasajero;

  @Column({ type: "boolean", nullable: false })
  isActive: boolean;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  monto: number;
}

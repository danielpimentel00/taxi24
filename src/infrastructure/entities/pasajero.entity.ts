import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Pasajero {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 150, nullable: false })
  fullname: string;
}

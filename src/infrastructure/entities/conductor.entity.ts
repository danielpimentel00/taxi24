import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Conductor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 150, nullable: false })
  fullname: string;

  @Column({ type: "boolean", nullable: false })
  isAvailable: boolean;

  @Column({ type: "decimal", precision: 10, scale: 8, nullable: false })
  latitude: number;

  @Column({ type: "decimal", precision: 11, scale: 8, nullable: false })
  longitude: number;
}

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Conductor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 150, nullable: false })
  fullname: string;

  @Column({ type: "boolean", nullable: false })
  isAvailable: boolean;

  @Column({ type: "decimal", precision: 20, scale: 17, nullable: false })
  latitude: number;

  @Column({ type: "decimal", precision: 20, scale: 17, nullable: false })
  longitude: number;
}

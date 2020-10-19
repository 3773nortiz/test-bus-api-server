import { Entity, ObjectIdColumn, ObjectID, Column, OneToMany } from "typeorm";
import { BusSchedules } from './BusSchedules';

@Entity()
export class Buses {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  plateNumber: string;

  @Column()
  contactNumber: string;

  @Column({ type: 'float' })
  ping_latitude: number;

  @Column({ type: 'float' })
  ping_longitude: number;

}

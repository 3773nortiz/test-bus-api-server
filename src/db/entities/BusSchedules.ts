import { Entity, ObjectIdColumn, ObjectID, Column, OneToOne} from "typeorm";
import { Buses } from "./Buses";
import { BusStops } from "./BusStops";

@Entity()
export class BusSchedules {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  weekday: string;

  @Column()
  busId: ObjectID;

  @Column()
  busStopId: ObjectID;

  @Column()
  time: string;

  @OneToOne(type => Buses, { eager: true })
  bus: Buses;
}


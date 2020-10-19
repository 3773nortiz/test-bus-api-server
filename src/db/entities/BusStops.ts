import { Entity, ObjectIdColumn, ObjectID, Column, Index } from "typeorm";

@Entity()
export class BusStops {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  description: string;
  
  @Column("simple-array")
  location: string[];
}

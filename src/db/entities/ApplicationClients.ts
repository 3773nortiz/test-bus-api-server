import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";

@Entity()
export class ApplicationClients {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  key: string;

  @Column()
  platform: string;
}

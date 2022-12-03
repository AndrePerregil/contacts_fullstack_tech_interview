import { Column, Entity, PrimaryColumn, ManyToOne, JoinTable } from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "./users.entity";

@Entity("contacts")
export class Contact {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ length: 20 })
  name: string;

  @ManyToOne(() => User, { eager: true, cascade: true })
  @JoinTable()
  user: User;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

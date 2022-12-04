import {
  Column,
  Entity,
  PrimaryColumn,
  ManyToOne,
  JoinTable,
  ManyToMany,
} from "typeorm";
import { v4 as uuid } from "uuid";

import { User } from "./users.entity";
import { Phone } from "./phones.entity";
import { Email } from "./emails.entity";

@Entity("contacts")
export class Contact {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ length: 20 })
  name: string;

  @ManyToOne(() => User, { eager: true, cascade: true })
  @JoinTable()
  user: User;

  @ManyToMany(() => Phone, { eager: true, cascade: true })
  @JoinTable()
  phones: Phone[];

  @ManyToMany(() => Email, { eager: true, cascade: true })
  @JoinTable()
  emails: Email[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

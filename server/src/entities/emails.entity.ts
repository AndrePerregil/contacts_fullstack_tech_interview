import { Column, Entity, PrimaryColumn, ManyToMany, JoinTable } from "typeorm";
import { v4 as uuid } from "uuid";
import { Contact } from "./contacts.entity";
import { User } from "./users.entity";

@Entity("emails")
export class Email {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ length: 50 })
  content: string;

  @ManyToMany(() => User, { eager: true })
  @JoinTable()
  user: User | null;

  @ManyToMany(() => Contact, { eager: true })
  @JoinTable()
  contacts: Contact[] | null;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

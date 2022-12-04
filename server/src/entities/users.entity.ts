import { Column, Entity, PrimaryColumn, ManyToMany, JoinTable } from "typeorm";
import { v4 as uuid } from "uuid";
import { Exclude } from "class-transformer";

import { Phone } from "./phones.entity";
import { Email } from "./emails.entity";

@Entity("users")
export class User {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ length: 15, unique: true })
  username: string;

  @Column({ length: 500 })
  @Exclude()
  password: string;

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

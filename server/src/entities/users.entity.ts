import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Exclude } from "class-transformer";

@Entity("users")
export class User {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ length: 15 })
  username: string;

  @Column({ length: 500 })
  @Exclude()
  password: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
